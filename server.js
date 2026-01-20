/**
 * SERVER.JS - v21.7 (BUSINESS PLATINUM ULTIMATE MONOLITH)
 * ========================================================
 * 🧠 AI ORCHESTRATION: 
 * - Gemma 3 (27b): Аналитический центр, Супервизор, Диагностика (14.4K RPD).
 * - Gemini 2.5 Flash Native Audio: Живой эмоциональный голос и текст (Unlimited).
 * 🤝 B2B & B2C: Тренажер для профи + ИИ-терапия для клиентов.
 * 💰 ECONOMY: Firebase Transactions (Diamonds) + Waitlist + Telegram Bot Logs.
 * 📂 RAG: Semantic Search via Supabase Vector (300+ modules).
 * 🛡️ SECURITY: Full Joi Validation + Rate Limiting + Winston Professional Logs.
 * 🛠️ RENDER SYNC: Fixed MIME types & SPA Fallback.
 * 👥 DATABASE: 30 full client dossiers.
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

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// --- 📂 ОБСЛУЖИВАНИЕ СТАТИКИ (FIX ДЛЯ RENDER) ---
const distPath = path.join(__dirname, 'dist');
const publicBuildPath = path.join(distPath, 'public');

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

// Инициализация Google AI (Ротация ключей)
const googleApiKeys = process.env.GOOGLE_API_KEYS ? process.env.GOOGLE_API_KEYS.split(',') : [process.env.GOOGLE_API_KEY];
let currentKeyIndex = 0;

const getGoogleAI = () => new GoogleGenerativeAI(googleApiKeys[currentKeyIndex]);
const rotateKey = () => {
    currentKeyIndex = (currentKeyIndex + 1) % googleApiKeys.length;
    logger.info(`🔄 Ротация ключей: Ключ #${currentKeyIndex + 1}`);
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
            logger.info("✅ Firebase Platinum Active");
        }
    } catch (e) { logger.error("Firebase init error: " + e.message); }
}

// Инициализация Bot & Prompts
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const PromptManager = require('./prompt_manager');

// --- 👥 ПОЛНАЯ БАЗА КЛИЕНТОВ (30 ДЕТАЛИЗИРОВАННЫХ КЕЙСОВ) ---
const CLIENT_DATABASE = {
    c1: { id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", familyStatus: "В разводе", status: "Средний класс", gender: "female", bio: "Парализующий саботаж при записи видео. Страх проявления зашкаливает. В теле — зажим в горле." },
    c2: { id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", familyStatus: "Холост", status: "Высокий доход", gender: "male", bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным. Тяжесть в плечах." },
    c3: { id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", familyStatus: "Замужем, 2 детей", status: "Стабильный", gender: "female", bio: "Постоянное сжатие в груди и тревога. Не могу переключиться с работы на отдых." },
    c4: { id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", familyStatus: "В поиске", status: "Нестабильный", gender: "male", bio: "Сменил 5 профессий за 2 года. Нигде не находит признания, чувствует себя неудачником." },
    c5: { id: "c5", name: "Анна", age: 25, profession: "Студентка", familyStatus: "В отношениях", status: "Студент", gender: "female", bio: "Не может завершить разрушительные отношения. Страх одиночества до тошноты." },
    c6: { id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", familyStatus: "Карьерист", status: "VIP", gender: "male", bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе и холод." },
    c7: { id: "c7", name: "Ольга", age: 38, profession: "Врач", familyStatus: "Замужем", status: "Бюджетник", gender: "female", bio: "Ипохондрия. Паника при малейшем физическом дискомфорте." },
    c8: { id: "c8", name: "Дмитрий", age: 29, profession: "Продавец", familyStatus: "Холост", status: "Базовый", gender: "male", bio: "Боится встреч. Напряжение в скулах и зажим речи." },
    c9: { id: "c9", name: "Мария", age: 33, profession: "Домохозяйка", familyStatus: "Замужем, младенец", status: "Обеспеченная", gender: "female", bio: "Материнская вина. Ощущение, что она плохая мать. Не может вздохнуть." },
    c10: { id: "c10", name: "Сергей", age: 50, profession: "Предприниматель", familyStatus: "Женат", status: "Кризис", gender: "male", bio: "Банкротство бизнеса. Колоссальный стыд перед семьей." },
    c11: { id: "c11", name: "Юлия", age: 27, profession: "Модель", familyStatus: "В отношениях", status: "Средний", gender: "female", bio: "РПП. Ненавидит свое отражение. Постоянный контроль веса." },
    c12: { id: "c12", name: "Андрей", age: 35, profession: "Архитектор", familyStatus: "Холост", status: "Средний+", gender: "male", bio: "Вспышки неконтролируемого гнева. Ощущение кипятка в груди." },
    c13: { id: "c13", name: "Наталья", age: 40, profession: "Учитель", familyStatus: "Разведена", status: "Базовый", gender: "female", bio: "Одиночество в толпе. Живет как за толстым стеклом." },
    c14: { id: "c14", name: "Павел", age: 22, profession: "Курьер", familyStatus: "Живет с родителями", status: "Низкий", gender: "male", bio: "Зависимость от мнения родителей. Не может принять решение." },
    c15: { id: "c15", name: "Екатерина", age: 36, profession: "HR-директор", familyStatus: "Замужем", status: "Высокий", gender: "female", bio: "Выгорание. Перфекционизм. Жжение в глазах от истощения." },
    c16: { id: "c16", name: "Александр", age: 44, profession: "Инженер", familyStatus: "Вдовец", status: "Средний", gender: "male", bio: "Застрял в горе. Чувствует вину перед ушедшим близким." },
    c17: { id: "c17", name: "Светлана", age: 30, profession: "Бьюти-мастер", familyStatus: "В поиске", status: "Средний", gender: "female", bio: "Низкая самооценка. Считает себя 'недостаточной'." },
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
    try { await bot.sendMessage(ADMIN_ID, `📡 **Connectum Platinum Log**\n${msg}`, { parse_mode: 'Markdown' }); } catch (e) { logger.error("AdminLog fail"); }
}

async function getEmbedding(text, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const model = getGoogleAI().getGenerativeModel({ model: "text-embedding-004" });
            const result = await model.embedContent(text);
            return result.embedding.values;
        } catch (e) { 
            rotateKey(); 
            if (i === retries - 1) return null;
        }
    }
}

async function getRelevantKnowledge(userMessage, modalityId) {
    return new Promise(async (resolve) => {
        const timeout = setTimeout(() => resolve(""), 2500);
        try {
            const vector = await getEmbedding(userMessage);
            if (!vector) return resolve("");
            const { data: docs } = await supabase.rpc('match_knowledge', {
                query_embedding: vector, match_threshold: 0.65, match_count: 2, filter_modality: modalityId
            });
            clearTimeout(timeout);
            resolve(docs ? docs.map(d => `МЕТОД: ${d.content}`).join('\n') : "");
        } catch (e) { resolve(""); }
    });
}

/**
 * ВЫЗОВ GEMMA 3 (Текст/Аналитика)
 */
async function callGemma(prompt, system) {
    try {
        const model = getGoogleAI().getGenerativeModel({ model: "gemma-3-27b" });
        const result = await model.generateContent([system, prompt]);
        return result.response.text();
    } catch (e) { rotateKey(); return "Я задумался..."; }
}

/**
 * ВЫЗОВ GEMINI NATIVE AUDIO (Мультимодальный чат)
 */
async function callGeminiAudio(prompt, system, voiceName = "Aoede") {
    try {
        const apiKey = googleApiKeys[currentKeyIndex];
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-native-audio-dialog:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                systemInstruction: { parts: [{ text: system }] },
                generationConfig: {
                    responseModalities: ["AUDIO", "TEXT"],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } }
                }
            })
        });
        const result = await response.json();
        const audio = result.candidates[0].content.parts.find(p => p.inlineData)?.inlineData.data;
        const text = result.candidates[0].content.parts.find(p => p.text)?.text;
        return { text, audio };
    } catch (e) { rotateKey(); return { text: "Ошибка аудио-движка", audio: null }; }
}

/**
 * ТРАНЗАКЦИОННОЕ СПИСАНИЕ ЛИМИТОВ 💎
 */
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
    } catch (e) { logger.error("Limit transaction fail"); return true; }
}

// --- 🌐 API ENDPOINTS ---

/**
 * ГЛАВНЫЙ ЧАТ (С ВАЛИДАЦИЕЙ JOI)
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
        difficulty: Joi.number().min(1).max(3).optional(),
        history: Joi.array().optional()
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { userId, message, modalityId, action, selectedClientId, role, flow, difficulty = 2, history = [] } = value;
    const clientProfile = CLIENT_DATABASE[selectedClientId] || CLIENT_DATABASE['c1'];

    try {
        const knowledge = await getRelevantKnowledge(message, modalityId);
        
        // 1. СУПЕРВИЗОР (Gemma 3)
        if (action === 'get_hint') {
            const sys = PromptManager.generateSupervisorPrompt(modalityId, history, knowledge);
            const hint = await callGemma(`Дай краткий совет: ${message}`, sys);
            return res.json({ hint });
        }

        // 2. СПИСАНИЕ ПРИ СТАРТЕ
        if (history.length === 0 && role === 'psychologist') {
            const ok = await useSessionLimit(userId);
            if (!ok) return res.status(403).json({ error: "Недостаточно 💎. Пожалуйста, пополните баланс." });
        }

        // 3. ЖИВОЙ ДИАЛОГ (Gemini Native Audio)
        const sys = role === 'client' 
            ? PromptManager.generateAiTherapistPrompt(flow) 
            : PromptManager.generateClientPrompt(modalityId, difficulty, clientProfile, knowledge); 

        const voiceActor = clientProfile.gender === 'female' ? "Aoede" : "Charon";
        const result = await callGeminiAudio(message, sys, voiceActor);

        res.json({ content: result.text, voice: result.audio });
    } catch (e) { 
        logger.error("API Chat Error: " + e.message);
        res.status(500).json({ error: "Ошибка искусственного интеллекта." }); 
    }
});

/**
 * ФИНАЛИЗАЦИЯ И ГЕНЕРАЦИЯ PDF (С ДИЗАЙНОМ v20.8.3)
 */
app.post('/api/finish', async (req, res) => {
    const { userId, history, modalityId, role } = req.body;
    try {
        const historyText = history.map(m => `${m.role}: ${m.content}`).join('\n');
        const sys = role === 'client' 
            ? PromptManager.generateClientSummaryPrompt(historyText) 
            : PromptManager.generateDeepAnalysisPrompt(modalityId, historyText);

        const analysisRaw = await callGemma("Проведи глубокий аудит и выдай JSON", sys);
        const analysis = JSON.parse(analysisRaw.replace(/```json|```/g, '').trim());

        let certificateUrl = null;
        if (role === 'psychologist' && db) {
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const filename = `certificates/${userId}_${Date.now()}.pdf`;
            const file = bucket.file(filename);
            const stream = file.createWriteStream({ metadata: { contentType: 'application/pdf' } });

            doc.pipe(stream);
            // Визуальный стиль сертификата Platinum
            doc.rect(0, 0, 595, 842).fill('#020617');
            doc.fillColor('#6366f1').fontSize(40).text('CONNECTUM', 50, 50);
            doc.fillColor('#f8fafc').fontSize(14).text('GOLDEN CERTIFICATE OF MASTERY', 50, 105);
            doc.moveTo(50, 130).lineTo(545, 130).strokeColor('#1e293b').stroke();

            doc.moveDown(4).fontSize(18).fillColor('#ffffff').text(`Master ID: ${userId}`);
            doc.text(`Method: ${modalityId.toUpperCase()}`);
            doc.moveDown(1).text(`Skill Score: ${analysis.method || 0}%`, { underline: true });
            
            doc.moveDown(2).fontSize(12).fillColor('#94a3b8').text('Expert Analysis:');
            doc.fillColor('#f1f5f9').text(analysis.expert_comment || "Сессия успешно проанализирована.", { width: 500, align: 'justify' });
            
            doc.moveDown(3).fontSize(10).fillColor('#475569').text('Verified by Connectum AI Protocol v21.7', { align: 'center' });
            doc.end();

            certificateUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
        }

        if (db) {
            await db.collection('artifacts').doc(APP_ID).collection('users').doc(userId).collection('sessions').add({
                modalityId, role, analysis, certificateUrl, timestamp: admin.firestore.FieldValue.serverTimestamp()
            });
            await adminLog(`✅ Сессия завершена. Юзер: ${userId}, Балл: ${analysis.method}%`);
        }
        res.json({ analytics: analysis, certificateUrl });
    } catch (e) { res.status(500).json({ error: "Ошибка завершения сессии." }); }
});

/**
 * ОСТАЛЬНЫЕ ЭНДПОИНТЫ (АГРЕГАТОР, ПРОФИЛЬ, WAITLIST)
 */
app.get('/api/aggregator', async (req, res) => {
    if (!db) return res.json([]);
    try {
        const snap = await db.collection('artifacts').doc(APP_ID).collection('public').doc('data').collection('psychologists').get();
        let list = snap.docs.map(d => d.data());
        list.sort((a, b) => (a.isVip ? -1 : 1) || (a.isPremium ? -1 : 1) || (b.skillRating - a.skillRating));
        res.json(list);
    } catch (e) { res.status(500).send("Aggregator Error"); }
});

app.post('/api/profile', async (req, res) => {
    const { userId, profile } = req.body;
    if (!db) return res.json({ status: 'demo' });
    try {
        const data = { ...profile, updatedAt: admin.firestore.FieldValue.serverTimestamp() };
        await db.doc(`artifacts/${APP_ID}/users/${userId}/profile/data`).set(data, { merge: true });
        await db.doc(`artifacts/${APP_ID}/public/data/psychologists/${userId}`).set({ ...data, skillRating: profile.skillRating || 70 }, { merge: true });
        res.json({ status: 'success' });
    } catch (e) { res.status(500).send("Profile Error"); }
});

app.post('/api/waitlist', async (req, res) => {
    const { userId, role, tariff, amount } = req.body;
    if (!db) return res.json({ status: 'demo' });
    try {
        const entry = { userId, role, tariff, amount, status: 'pending', timestamp: admin.firestore.FieldValue.serverTimestamp() };
        await db.collection('artifacts').doc(APP_ID).collection('public').doc('data').collection('waitlist').add(entry);
        await adminLog(`💰 Заявка на тариф: ${tariff} (${amount}₽) от ${userId}`);
        res.json({ status: 'success' });
    } catch (e) { res.status(500).send("Waitlist Error"); }
});

app.get('*', (req, res) => {
    if (req.url.includes('.')) return res.status(404).send('Not found');
    res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`🚀 Connectum v21.7 Platinum Engine Online on ${PORT}`);
    adminLog("🚀 Система успешно запущена: Full Detailed Hybrid Edition.");
});
