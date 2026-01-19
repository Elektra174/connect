/**
 * SERVER.JS - v20.8.3 (BUSINESS PLATINUM ENGINE)
 * ========================================================
 * 🧠 AI HYBRID: Llama 3.3 (Speed) + Gemma 3 (Analysis)
 * 🤝 B2B & B2C: Тренажер для профи + ИИ-терапия для клиентов.
 * 💰 ТАРИФЫ: Лист ожидания + Транзакции бриллиантов.
 * 🛡️ SECURITY: Rate Limiting + Joi Validation + Winston Logs.
 * 📂 RAG: Поиск по 300+ модулям в Supabase Vector.
 * 🛠️ RENDER PATH SYNC: Исправлены пути под структуру dist/public и MIME-типы.
 * 👥 DATABASE: 30 максимально детализированных досье клиентов.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const PDFDocument = require('pdfkit');
const TelegramBot = require('node-telegram-bot-api');
const winston = require('winston');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
require('dotenv').config();

const app = express();

// --- 📝 ПРОФЕССИОНАЛЬНОЕ ЛОГИРОВАНИЕ (Winston) ---
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

// --- 🛡️ ЗАЩИТА (Rate Limiting) ---
const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { error: "Слишком много запросов. Повторите через 15 минут." }
});

// --- 📂 ОБСЛУЖИВАНИЕ СТАТИКИ (ФИКС ДЛЯ RENDER v20.8.3) ---
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

const distPath = path.join(__dirname, 'dist');
const publicBuildPath = path.join(distPath, 'public');

// Принудительная установка MIME-типов для ассетов, чтобы избежать блокировки браузером
app.use('/assets', express.static(path.join(distPath, 'assets'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
        if (path.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
    }
}));

app.use(express.static(distPath));
app.use(express.static(publicBuildPath));

// --- ⚙️ КОНФИГУРАЦИЯ ---
const APP_ID = process.env.APP_ID || 'connectum-platinum';
const ADMIN_ID = process.env.ADMIN_ID || '7830322013';

// Инициализация ИИ (Ротация ключей Google)
const googleApiKeys = process.env.GOOGLE_API_KEYS ? process.env.GOOGLE_API_KEYS.split(',') : [];
let currentKeyIndex = 0;

const getCurrentGoogleGenAI = () => {
    if (googleApiKeys.length === 0) throw new Error("GOOGLE_API_KEYS not configured");
    return new GoogleGenerativeAI(googleApiKeys[currentKeyIndex]);
};

const rotateGoogleKey = () => {
    currentKeyIndex = (currentKeyIndex + 1) % googleApiKeys.length;
    logger.info(`🔄 Переключено на ключ Google #${currentKeyIndex + 1}`);
};


// Инициализация Supabase (RAG)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Инициализация Firebase
let db = null;
let bucket = null;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
            });
            db = admin.firestore();
            bucket = admin.storage().bucket();
            logger.info("✅ Firebase initialized successfully");
        }
    } catch (e) {
        logger.error("Firebase init error:", e.message);
    }
}

// Инициализация Bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const PromptManager = require('./prompt_manager');

// --- 👥 ПОЛНАЯ БАЗА КЛИЕНТОВ (30 ДЕТАЛИЗИРОВАННЫХ КЕЙСОВ v20.8.3) ---
const CLIENT_DATABASE = {
    c1: { id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", familyStatus: "В разводе", status: "Средний класс", gender: "female", bio: "Парализующий саботаж при записи видео. Страх проявления зашкаливает. В теле — зажим в горле." },
    c2: { id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", familyStatus: "Холост", status: "Высокий доход", gender: "male", bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным. Тяжесть в плечах." },
    c3: { id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", familyStatus: "Замужем, двое детей", status: "Стабильный доход", gender: "female", bio: "Постоянное сжатие в груди и тревога. Не могу переключиться с работы на отдых." },
    c4: { id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", familyStatus: "В поиске", status: "Нестабильный", gender: "male", bio: "Сменил 5 профессий за 2 года. Нигде не находит признания, чувствует себя неудачником." },
    c5: { id: "c5", name: "Анна", age: 25, profession: "Студентка", familyStatus: "В отношениях", status: "Студент", gender: "female", bio: "Не может завершить разрушительные отношения. Боится одиночества до ватных ног." },
    c6: { id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", familyStatus: "Карьерист", status: "VIP", gender: "male", bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе и холод." },
    c7: { id: "c7", name: "Ольга", age: 38, profession: "Врач", familyStatus: "Замужем", status: "Бюджетник", gender: "female", bio: "Ипохондрия. Паника при малейшем физическом дискомфорте." },
    c8: { id: "c8", name: "Дмитрий", age: 29, profession: "Продавец", familyStatus: "Холост", status: "Базовый", gender: "male", bio: "Боится встреч. Напряжение в скулах и зажим речи." },
    c9: { id: "c9", name: "Мария", age: 33, profession: "Домохозяйка", familyStatus: "Замужем, младенец", status: "Обеспеченная", gender: "female", bio: "Материнская вина. Ощущение, что она плохая мать. Не может вздохнуть." },
    c10: { id: "c10", name: "Сергей", age: 50, profession: "Предприниматель", familyStatus: "Женат", status: "Кризис капитала", gender: "male", bio: "Банкротство бизнеса. Колоссальный стыд перед семьей." },
    c11: { id: "c11", name: "Юлия", age: 27, profession: "Модель", familyStatus: "В отношениях", status: "Средний", gender: "female", bio: "РПП. Ненавидит свое отражение. Постоянный контроль веса." },
    c12: { id: "c12", name: "Андрей", age: 35, profession: "Архитектор", familyStatus: "Холост", status: "Средний+", gender: "male", bio: "Вспышки неконтролируемого гнева. Ощущение кипятка в груди." },
    c13: { id: "c13", name: "Наталья", age: 40, profession: "Учитель", familyStatus: "Разведена", status: "Базовый", gender: "female", bio: "Одиночество в толпе. Живет как за толстым стеклом." },
    c14: { id: "c14", name: "Павел", age: 22, profession: "Курьер", familyStatus: "Живет с родителями", status: "Низкий", gender: "male", bio: "Зависимость от мнения родителей в 22 года. Не может принять решение." },
    c15: { id: "c15", name: "Екатерина", age: 36, profession: "HR-директор", familyStatus: "Замужем", status: "Высокий", gender: "female", bio: "Выгорание. Перфекционизм. Жжение в глазах от истощения." },
    c16: { id: "c16", name: "Александр", age: 44, profession: "Инженер", familyStatus: "Вдовец", status: "Средний", gender: "male", bio: "Застрял в горе. Чувствует вину перед ушедшим близким." },
    c17: { id: "c17", name: "Светлана", age: 30, profession: "Бьюти-мастер", familyStatus: "В поиске", status: "Средний", gender: "female", bio: "Низкая самооценка. Считает себя 'недостаточной' для любви." },
    c18: { id: "c18", name: "Роман", age: 32, profession: "Аналитик", familyStatus: "Холост", status: "Средний", gender: "male", bio: "Игровая зависимость. Уход от реальности в виртуальный мир." },
    c19: { id: "c19", name: "Ирина", age: 48, profession: "Юрист", familyStatus: "Дети уехали", status: "Высокий", gender: "female", bio: "Синдром пустого гнезда. Смысл жизни пропал." },
    c20: { id: "c20", name: "Кирилл", age: 26, profession: "Дизайнер", familyStatus: "Холост", status: "Фриланс", gender: "male", bio: "Агорафобия. Боится выходить на открытые пространства." },
    c21: { id: "c21", name: "Татьяна", age: 55, profession: "Пенсионерка", familyStatus: "Замужем", status: "Базовый", gender: "female", bio: "Кризис старения. Ощущение, что время уходит впустую." },
    c22: { id: "c22", name: "Виктор", age: 39, profession: "Водитель", familyStatus: "Разведен", status: "Средний", gender: "male", bio: "Переживает измену. Колючая проволока вокруг сердца." },
    c23: { id: "c23", name: "Алина", age: 24, profession: "Бариста", familyStatus: "В отношениях", status: "Начинающий", gender: "female", bio: "Не умеет говорить 'нет'. Чувствует, что все ею пользуются." },
    c24: { id: "c24", name: "Денис", age: 37, profession: "Охранник", familyStatus: "Холост", status: "Базовый", gender: "male", bio: "Навязчивые мысли о здоровье. Постоянные проверки." },
    c25: { id: "c25", name: "Людмила", age: 60, profession: "Педагог", familyStatus: "Вдова", status: "Пенсия", gender: "female", bio: "Конфликт с невесткой. Чувствует себя ненужной и лишней." },
    c26: { id: "c26", name: "Максим", age: 21, profession: "Блогер", familyStatus: "Холост", status: "Нестабильный", gender: "male", bio: "Подростковый бунт против системы. Ничего не хочет делать." },
    c27: { id: "c27", name: "Валерия", age: 31, profession: "Стилист", familyStatus: "Замужем", status: "Средний", gender: "female", bio: "Болезненная ревность. Постоянный поиск улик измены." },
    c28: { id: "c28", name: "Станислав", age: 43, profession: "Адвокат", familyStatus: "Женат", status: "Высокий", gender: "male", bio: "Трудоголизм. Не умеет расслабляться без алкоголя." },
    c29: { id: "c29", name: "Евгения", age: 29, profession: "Копирайтер", familyStatus: "Холост", status: "Средний", gender: "female", bio: "Страх перемен. Боится менять работу, даже если там плохо." },
    c30: { id: "c30", name: "Константин", age: 35, profession: "Финансист", familyStatus: "Холост", status: "Высокий", gender: "male", bio: "Эмоциональная холодность. Не понимает, что чувствует." }
};

// --- 🛠 ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

async function adminLog(msg) {
    try { await bot.sendMessage(ADMIN_ID, `📡 **Connectum v20.8.3 Log**\n${msg}`, { parse_mode: 'Markdown' }); } catch (e) { logger.error("AdminLog fail:", e.message); }
}

async function getEmbedding(text) {
    const maxRetries = googleApiKeys.length;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const genAI = getCurrentGoogleGenAI();
            const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
            const result = await model.embedContent(text);
            return result.embedding.values;
        } catch (e) {
            if (e.message.includes('429') || e.message.includes('quota')) {
                rotateGoogleKey();
                continue;
            }
            return null;
        }
    }
    return null;
}

async function getRelevantKnowledge(userMessage, modalityId) {
    const vector = await getEmbedding(userMessage);
    if (!vector) return "";
    try {
        const { data: docs, error } = await supabase.rpc('match_knowledge', {
            query_embedding: vector,
            match_threshold: 0.65,
            match_count: 3,
            filter_modality: modalityId
        });
        if (error || !docs) return "";
        return docs.map(d => `СИТУАЦИЯ: ${d.context_trigger}\nИНТЕРВЕНЦИЯ: ${d.content}`).join('\n\n---\n\n');
    } catch (e) { return ""; }
}

async function generateSpeech(text, gender = 'female') {
    try {
        const tts = new MsEdgeTTS();
        const voiceName = gender === 'female' ? process.env.TTS_FEMALE_VOICE : process.env.TTS_MALE_VOICE;
        await tts.setMetadata(voiceName, OUTPUT_FORMAT.Audio24khz48kbitrateMonoMp3);
        const readable = await tts.toStream(text);
        let chunks = [];
        for await (let chunk of readable) { chunks.push(chunk); }
        return Buffer.concat(chunks).toString('base64');
    } catch (e) { logger.error("TTS fail:", e.message); return null; }
}

async function callAI(prompt, system) {
    const maxRetries = googleApiKeys.length;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const genAI = getCurrentGoogleGenAI();
            const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });
            const result = await model.generateContent([system, prompt]);
            return result.response.text();
        } catch (e) {
            if (e.message.includes('429')) {
                rotateGoogleKey();
                continue;
            }
            adminLog(`❌ AI Fail (Gemma): ${e.message}`);
            return "Простите, я немного задумался.";
        }
    }
}

// --- 💎 ЭКОНОМИКА СЕССИЙ ---

async function useSessionLimit(userId) {
    if (!db) return true; // Демо-режим
    const limitRef = db.collection('artifacts').doc(APP_ID).collection('users').doc(userId).collection('limits').doc('stats');
    try {
        return await db.runTransaction(async (t) => {
            const doc = await t.get(limitRef);
            let stats = doc.exists ? doc.data() : { gems: 5, activeTariff: null };
            if (stats.gems <= 0 && !stats.activeTariff) return false;
            if (!stats.activeTariff) stats.gems -= 1;
            t.set(limitRef, stats, { merge: true });
            return true;
        });
    } catch (e) { return true; } 
}

// --- 🌐 API ЭНДПОИНТЫ ---

/**
 * ГЛАВНЫЙ ЧАТ
 */
app.post('/api/chat', chatLimiter, async (req, res) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        message: Joi.string().required(),
        modalityId: Joi.string().required(),
        action: Joi.string().optional(),
        selectedClientId: Joi.string().optional(),
        role: Joi.string().valid('psychologist', 'client').required(),
        flow: Joi.string().optional(),
        history: Joi.array().optional()
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { userId, message, modalityId, action, history = [], selectedClientId, role, flow } = value;
    const clientProfile = CLIENT_DATABASE[selectedClientId] || CLIENT_DATABASE['c1'];

    try {
        const knowledge = await getRelevantKnowledge(message, modalityId);
        
        if (action === 'get_hint') {
            const sys = PromptManager.generateSupervisorPrompt(modalityId, history, knowledge);
            const response = await callAI(`Дай методический совет: ${message}`, sys);
            return res.json({ hint: response });
        }

        // Проверка баланса только для психолога при старте
        if (history.length === 0 && role === 'psychologist') {
            const ok = await useSessionLimit(userId);
            if (!ok) return res.status(403).json({ error: "Недостаточно 💎. Обновите тариф." });
        }

        const sys = role === 'client' 
            ? PromptManager.generateAiTherapistPrompt(flow) 
            : PromptManager.generateClientPrompt(modalityId, 2, clientProfile, knowledge); 

        const response = await callAI(message, sys);
        const voice = await generateSpeech(response, role === 'client' ? 'female' : clientProfile.gender);

        res.json({ content: response, voice });
    } catch (e) { 
        logger.error("Chat API Error:", e.message);
        res.status(500).json({ error: "Ошибка связи с ИИ." }); 
    }
});

/**
 * ФИНАЛИЗАЦИЯ (АУДИТ)
 */
app.post('/api/finish', async (req, res) => {
    const { userId, history, modalityId, role } = req.body;
    try {
        const historyText = history.map(m => `${m.role}: ${m.content}`).join('\n');
        const sys = role === 'client'
            ? PromptManager.generateClientSummaryPrompt(historyText)
            : PromptManager.generateDeepAnalysisPrompt(modalityId, historyText);

        const analysisRaw = await callAI("Сделай аудит", sys);
        const analysis = JSON.parse(analysisRaw.replace(/```json|```/g, '').trim());

        let certificateUrl = null;
        if (role === 'psychologist' && db) {
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const filename = `certificates/${userId}_${Date.now()}.pdf`;
            const file = bucket.file(filename);
            const stream = file.createWriteStream({ metadata: { contentType: 'application/pdf' } });

            doc.pipe(stream);
            doc.rect(0, 0, 595, 842).fill('#020617');
            doc.fillColor('#6366f1').fontSize(40).text('CONNECTUM', 50, 50);
            doc.fillColor('#f8fafc').fontSize(14).text('GOLDEN CERTIFICATE OF MASTERY', 50, 105);
            doc.moveDown(4).fontSize(18).text(`Master ID: ${userId}`);
            doc.text(`Method: ${modalityId.toUpperCase()}`);
            doc.moveDown().text(`Skill Score: ${analysis.method || 0}%`);
            doc.moveDown(2).fontSize(12).text(`Expert Analysis: ${analysis.expert_comment}`, { width: 500 });
            doc.end();

            certificateUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
        }

        if (db) {
            await db.collection('artifacts').doc(APP_ID).collection('users').doc(userId).collection('sessions').add({
                modalityId, role, analysis, certificateUrl, timestamp: admin.firestore.FieldValue.serverTimestamp()
            });
        }

        res.json({ analytics: analysis, certificateUrl });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

/**
 * АГРЕГАТОР
 */
app.get('/api/aggregator', async (req, res) => {
    try {
        if (!db) return res.json([]);
        const snap = await db.collection('artifacts').doc(APP_ID).collection('public').doc('data').collection('psychologists').get();
        let list = snap.docs.map(d => d.data());
        list.sort((a, b) => (a.isVip ? -1 : 1) || (a.isPremium ? -1 : 1) || (b.skillRating - a.skillRating));
        res.json(list);
    } catch (e) { res.status(500).send("Aggregator Error"); }
});

/**
 * ПРОФИЛЬ
 */
app.post('/api/profile', async (req, res) => {
    const { userId, profile } = req.body;
    try {
        if (!db) return res.json({ status: 'demo' });
        const commission = profile.isPremium ? 0.2 : 0.4;
        const data = { ...profile, commission, updatedAt: admin.firestore.FieldValue.serverTimestamp() };
        
        await db.doc(`artifacts/${APP_ID}/users/${userId}/profile/data`).set(data, { merge: true });
        await db.doc(`artifacts/${APP_ID}/public/data/psychologists/${userId}`).set({
            ...profile, userId, skillRating: profile.skillRating || 70, updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        res.json({ status: 'success' });
    } catch (e) { res.status(500).send("Profile Error"); }
});

/**
 * WAITLIST (ЗАЯВКИ НА ОПЛАТУ)
 */
app.post('/api/waitlist', async (req, res) => {
    const { userId, role, tariff, amount } = req.body;
    try {
        if (!db) return res.json({ status: 'demo' });
        const entry = { userId, role, tariff, amount, status: 'pending', timestamp: admin.firestore.FieldValue.serverTimestamp() };
        await db.collection('artifacts').doc(APP_ID).collection('public').doc('data').collection('waitlist').add(entry);
        await adminLog(`💰 Новая заявка на тариф: ${tariff} (${amount}₽). Юзер: ${userId}`);
        res.json({ status: 'success' });
    } catch (e) { res.status(500).send("Waitlist Error"); }
});

/**
 * ЗАГРУЗКА ВИДЕО
 */
app.post('/api/upload-video', async (req, res) => {
    const { userId, videoBase64 } = req.body;
    try {
        if (!db) return res.json({ url: '#' });
        const fileName = `videos/${userId}/intro.webm`;
        const file = bucket.file(fileName);
        await file.save(Buffer.from(videoBase64.split(',')[1], 'base64'), {
            metadata: { contentType: 'video/webm' }, public: true
        });
        const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        await db.doc(`artifacts/${APP_ID}/users/${userId}/profile/data`).update({ videoUrl: url });
        await db.doc(`artifacts/${APP_ID}/public/data/psychologists/${userId}`).update({ videoUrl: url });
        res.json({ url });
    } catch (e) { res.status(500).send("Upload Error"); }
});

// SPA Fallback: Защита ассетов и принудительная отдача index.html
app.get('*', (req, res) => {
    if (req.url.includes('.')) {
        return res.status(404).send('Not found');
    }
    const indexPath = path.join(distPath, 'index.html');

    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(500).send("Build error: index.html not found. Check dist folder.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`🚀 Connectum v20.8.3 Online on port ${PORT}`);
    adminLog("🚀 Сервер успешно обновлен до v20.8.3 (Full Detailed Sync)!");
});
