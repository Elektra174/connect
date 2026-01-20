/**
 * SERVER.JS - v21.26 (ULTIMATE PLATINUM MASTER - EVOLUTION)
 * ========================================================
 * 🧠 AI ENGINE: Yandex Assistant REST API (через OpenAI SDK).
 * 🎙️ VOICE: Yandex SpeechKit Premium (Алёна/Филипп).
 * 🔐 SECURITY: Проверка подписки на Telegram-канал (@psy_connectum).
 * 📂 RAG: Yandex Embeddings + Supabase Vector (Поиск знаний).
 * 🔄 LOOP: Infinite Client Generation (Генерация новых + фильтр пройденных).
 * 📈 LEARNING: Полное логирование диалогов и советов (training_logs).
 * 📄 DOCS: PDFKit Golden Certificate (Сертификация мастеров).
 * 💰 ECONOMY: Транзакционные бриллианты (1 сессия = 1 💎).
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const admin = require('firebase-admin');
const OpenAI = require('openai');
const { createClient } = require('@supabase/supabase-js');
const PDFDocument = require('pdfkit');
const TelegramBot = require('node-telegram-bot-api');
const winston = require('winston');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
require('dotenv').config();

const app = express();

// --- 📝 ПРОФЕССИОНАЛЬНОЕ ЛОГИРОВАНИЕ (WINSTON) ---
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/training_data.log' }), // База для обучения ИИ
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

// --- 🛡️ ЗАЩИТА (RATE LIMITING) ---
const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 300, 
    message: { error: "Слишком много запросов. Система отдыхает 15 минут." }
});

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// --- ⚙️ КОНФИГУРАЦИЯ (YANDEX / FIREBASE / SUPABASE) ---
const APP_ID = process.env.APP_ID || 'connectum-platinum';
const ADMIN_ID = process.env.ADMIN_ID || '7830322013';
const CHANNEL_ID = '@psy_connectum'; // Канал для обязательной подписки
const WEB_APP_URL = process.env.WEB_APP_URL;

const YANDEX_API_KEY = process.env.YANDEX_API_KEY;
const FOLDER_ID = process.env.YANDEX_FOLDER_ID;

// Инициализация Yandex Assistant (через OpenAI SDK-совместимый интерфейс)
const yandexAi = new OpenAI({
    apiKey: YANDEX_API_KEY,
    baseURL: "https://rest-assistant.api.cloud.yandex.net/v1",
    defaultHeaders: { 
        "OpenAI-Project": FOLDER_ID 
    }
});

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

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
            logger.info("✅ Firebase Platinum Engine Active");
        }
    } catch (e) { logger.error("Firebase Error: " + e.message); }
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const PromptManager = require('./prompt_manager');

// --- 🤖 ТЕЛЕГРАМ БОТ: ФИКС WEBHOOK (ERROR 409) ---
(async () => {
    try {
        await bot.deleteWebHook();
        logger.info("📡 Бот активен. Режим Polling (конфликты исключены).");
    } catch (e) { logger.error("Bot conflict resolve error"); }
})();

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const welcome = `**Connectum | Platinum Evolution** 💫\n\nСистема профессионального развития и психологической помощи.\n\n🧠 ТРЕНАЖЕР\n🤝 ПОМОЩЬ`;
    try {
        await bot.sendMessage(chatId, welcome, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [[{ text: "🚀 Запустить Connectum", web_app: { url: WEB_APP_URL } }]]
            }
        });
    } catch (e) {}
});

async function adminLog(msg) {
    try { await bot.sendMessage(ADMIN_ID, `📡 **Log v21.26**\n${msg}`, { parse_mode: 'Markdown' }); } catch (e) {}
}

// --- 👥 ПОЛНАЯ БАЗА КЛИЕНТОВ (30 ДОСЬЕ - 100% ВОССТАНОВЛЕНО) ---
const CLIENT_DATABASE = {
    c1: { id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", gender: "female", bio: "Парализующий саботаж при записи видео. Страх проявления зашкаливает. В теле — зажим в горле." },
    c2: { id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", gender: "male", bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным. Тяжесть в плечах." },
    c3: { id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", gender: "female", bio: "Постоянное сжатие в груди и тревога. Не могу переключиться с работы на отдых." },
    c4: { id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", gender: "male", bio: "Сменил 5 профессий за 2 года. Нигде не находит признания, чувствует себя неудачником." },
    c5: { id: "c5", name: "Анна", age: 25, profession: "Студентка", gender: "female", bio: "Не может завершить разрушительные отношения. Боится одиночества до тошноты." },
    c6: { id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", gender: "male", bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе и холод." },
    c7: { id: "c7", name: "Ольга", age: 38, profession: "Врач", gender: "female", bio: "Ипохондрия. Паника при малейшем физическом дискомфорте." },
    c8: { id: "c8", name: "Дмитрий", age: 29, profession: "Продавец", gender: "male", bio: "Боится встреч. Напряжение в скулах и зажим речи." },
    c9: { id: "c9", name: "Мария", age: 33, profession: "Домохозяйка", gender: "female", bio: "Материнская вина. Ощущение, что она плохая мать. Не может вздохнуть." },
    c10: { id: "c10", name: "Сергей", age: 50, profession: "Предприниматель", gender: "male", bio: "Банкротство бизнеса. Колоссальный стыд перед семьей." },
    c11: { id: "c11", name: "Юлия", age: 27, profession: "Модель", gender: "female", bio: "РПП. Ненавидит свое отражение. Постоянный контроль веса." },
    c12: { id: "c12", name: "Андрей", age: 35, profession: "Архитектор", gender: "male", bio: "Вспышки неконтролируемого гнева. Ощущение кипятка в груди." },
    c13: { id: "c13", name: "Наталья", age: 40, profession: "Учитель", gender: "female", bio: "Одиночество в толпе. Живет как за толстым стеклом." },
    c14: { id: "c14", name: "Павел", age: 22, profession: "Курьер", gender: "male", bio: "Зависимость от мнения родителей. Не может принять решение." },
    c15: { id: "c15", name: "Екатерина", age: 36, profession: "HR-директор", gender: "female", bio: "Выгорание. Перфекционизм. Жжение в глазах от истощения." },
    c16: { id: "c16", name: "Александр", age: 44, profession: "Инженер", gender: "male", bio: "Застрял в горе. Чувствует вину перед ушедшим близким." },
    c17: { id: "c17", name: "Светлана", age: 30, profession: "Бьюти-мастер", gender: "female", bio: "Низкая самооценка. Считает себя 'недостаточной' для любви." },
    c18: { id: "c18", name: "Роман", age: 32, profession: "Аналитик", gender: "male", bio: "Игровая зависимость. Уход от реальности в виртуальный мир." },
    c19: { id: "c19", name: "Ирина", age: 48, profession: "Юрист", gender: "female", bio: "Синдром пустого гнезда. Смысл жизни пропал." },
    c20: { id: "c20", name: "Кирилл", age: 26, profession: "Дизайнер", gender: "male", bio: "Агорафобия. Боится выходить на открытые пространства." },
    c21: { id: "c21", name: "Татьяна", age: 55, profession: "Пенсионерка", gender: "female", bio: "Кризис старения. Ощущение, что время уходит впустую." },
    c22: { id: "c22", name: "Виктор", age: 39, profession: "Водитель", gender: "male", bio: "Переживает измену. Колючая проволока вокруг сердца." },
    c23: { id: "c23", name: "Алина", age: 24, profession: "Бариста", gender: "female", bio: "Не умеет говорить 'нет'. Чувствует, что все ею пользуются." },
    c24: { id: "c24", name: "Денис", age: 37, profession: "Охранник", gender: "male", bio: "Навязчивые мысли о здоровье. Постоянные проверки." },
    c25: { id: "c25", name: "Людмила", age: 60, profession: "Педагог", gender: "female", bio: "Конфликт с невесткой. Чувствует себя ненужной и лишней." },
    c26: { id: "c26", name: "Максим", age: 21, profession: "Блогер", gender: "male", bio: "Подростковый бунт против системы. Ничего не хочет делать." },
    c27: { id: "c27", name: "Валерия", age: 31, profession: "Стилист", gender: "female", bio: "Болезненная ревность. Постоянный поиск улик измены." },
    c28: { id: "c28", name: "Станислав", age: 43, profession: "Адвокат", gender: "male", bio: "Трудоголизм. Не умеет расслабляться без алкоголя." },
    c29: { id: "c29", name: "Евгения", age: 29, profession: "Копирайтер", gender: "female", bio: "Страх перемен. Боится менять работу, даже если там плохо." },
    c30: { id: "c30", name: "Константин", age: 35, profession: "Финансист", gender: "male", bio: "Эмоциональная холодность. Не понимает, что чувствует." }
};

// --- 🛠 ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

/**
 * ВЫЗОВ YANDEX ASSISTANT (ЧЕРЕЗ OPENAI SDK)
 */
async function callYandexAi(prompt, instructions = "", temperature = 0.6) {
    try {
        const response = await yandexAi.chat.completions.create({
            model: "yandexgpt/latest",
            messages: [
                { role: "system", content: instructions },
                { role: "user", content: prompt }
            ],
            temperature: temperature,
            max_tokens: 2000
        });
        return response.choices[0].message.content;
    } catch (e) {
        logger.error("Yandex Assistant Error: " + e.message);
        return "Система временно задумалась. Пожалуйста, попробуйте еще раз.";
    }
}

/**
 * ПРОВЕРКА ПОДПИСКИ ЧЕРЕЗ BOT API
 */
async function checkTelegramSub(userId) {
    try {
        const member = await bot.getChatMember(CHANNEL_ID, userId);
        return ['creator', 'administrator', 'member'].includes(member.status);
    } catch (e) { 
        logger.warn(`Sub check fail for ${userId}: ${e.message}`);
        return true; 
    } 
}

/**
 * ОЗВУЧКА YANDEX SPEECHKIT
 */
async function generateYandexVoice(text, gender = 'female') {
    const url = 'https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize';
    const voice = gender === 'female' ? 'alena' : 'filipp';
    const params = new URLSearchParams();
    params.append('text', text);
    params.append('voice', voice);
    params.append('folderId', FOLDER_ID);
    params.append('format', 'mp3');

    try {
        const res = await axios.post(url, params, {
            headers: { 'Authorization': `Api-Key ${YANDEX_API_KEY}` },
            responseType: 'arraybuffer'
        });
        return Buffer.from(res.data).toString('base64');
    } catch (e) { 
        logger.error("SpeechKit Error: " + e.message);
        return null; 
    }
}

/**
 * YANDEX EMBEDDINGS (ДЛЯ RAG)
 */
async function getYandexEmbed(text) {
    const url = 'https://llm.api.cloud.yandex.net/foundationModels/v1/textEmbedding';
    try {
        const res = await axios.post(url, {
            modelUri: `emb://${FOLDER_ID}/text-search-query/latest`,
            text: text
        }, { headers: { 'Authorization': `Api-Key ${YANDEX_API_KEY}`, 'x-folder-id': FOLDER_ID } });
        return res.data.embedding;
    } catch (e) { return null; }
}

async function getRAGContext(message, modalityId) {
    const vector = await getYandexEmbed(message);
    if (!vector) return "";
    try {
        const { data: docs } = await supabase.rpc('match_knowledge', {
            query_embedding: vector, match_threshold: 0.7, match_count: 2, filter_modality: modalityId
        });
        return docs ? docs.map(d => `МЕТОДИЧКА: ${d.content}`).join('\n') : "";
    } catch (e) { return ""; }
}

/**
 * СПИСАНИЕ БРИЛЛИАНТОВ
 */
async function spendDiamond(userId) {
    if (!db) return true;
    const ref = db.doc(`artifacts/${APP_ID}/users/${userId}/limits/stats`);
    try {
        return await db.runTransaction(async (t) => {
            const doc = await t.get(ref);
            let stats = doc.exists ? doc.data() : { diamonds: 5 };
            if (stats.diamonds <= 0) return false;
            stats.diamonds -= 1;
            t.set(ref, stats, { merge: true });
            return true;
        });
    } catch (e) { return true; }
}

// --- 🌐 API ENDPOINTS ---

/**
 * СИНХРОНИЗАЦИЯ (Подписка + Баланс + Фильтр клиентов)
 */
app.get('/api/sync', async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).send("UID required");

    const isSub = await checkTelegramSub(userId);
    if (!db) return res.json({ isSubscribed: isSub, diamonds: 5, pool: Object.values(CLIENT_DATABASE).slice(0, 10) });

    try {
        const userDoc = await db.doc(`artifacts/${APP_ID}/users/${userId}/profile/data`).get();
        const progressDoc = await db.doc(`artifacts/${APP_ID}/users/${userId}/profile/progress`).get();
        const limitsDoc = await db.doc(`artifacts/${APP_ID}/users/${userId}/limits/stats`).get();

        const passedIds = progressDoc.exists ? progressDoc.data().passedClients || [] : [];
        const customSnap = await db.collection(`artifacts/${APP_ID}/users/${userId}/custom_clients`).get();
        const customClients = customSnap.docs.map(d => ({ ...d.data(), id: d.id }));

        const fullPool = [...Object.values(CLIENT_DATABASE), ...customClients];
        const filteredPool = fullPool.filter(c => !passedIds.includes(c.id));

        res.json({
            isSubscribed: isSub,
            diamonds: limitsDoc.exists ? limitsDoc.data().diamonds : 5,
            profile: userDoc.exists ? userDoc.data() : null,
            pool: filteredPool.slice(0, 15)
        });
    } catch (e) { res.status(500).send("Sync Error"); }
});

/**
 * ГЛАВНЫЙ ЧАТ
 */
app.post('/api/chat', chatLimiter, async (req, res) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        message: Joi.string().required(),
        modalityId: Joi.string().required(),
        action: Joi.string().optional().allow(''),
        selectedClientId: Joi.string().optional().allow(''),
        role: Joi.string().valid('psychologist', 'client').required(),
        flow: Joi.string().optional().allow(''),
        difficulty: Joi.number().min(1).max(3).optional(),
        history: Joi.array().items(Joi.object().unknown()).optional()
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { userId, message, modalityId, action, selectedClientId, role, flow, difficulty, history = [] } = value;
    
    try {
        const knowledge = await getRAGContext(message, modalityId);
        const clientProfile = CLIENT_DATABASE[selectedClientId] || CLIENT_DATABASE['c1'];

        // 1. СОВЕТ СУПЕРВИЗОРА (Logging 2.0)
        if (action === 'get_hint') {
            const sys = PromptManager.generateSupervisorPrompt(modalityId, history, knowledge);
            const hint = await callYandexAi(`Психолог написал: ${message}. Дай совет.`, sys, 0.3);
            if(db) await db.collection('training_logs').add({ 
                userId, type: 'supervisor_hint', context: message, hint, timestamp: admin.firestore.FieldValue.serverTimestamp() 
            });
            return res.json({ hint });
        }

        // 2. СПИСАНИЕ ЗА СТАРТ (Первое сообщение)
        if (history.length === 0 && role === 'psychologist') {
            const success = await spendDiamond(userId);
            if (!success) return res.status(403).json({ error: "Недостаточно бриллиантов" });
        }

        // 3. ОТВЕТ ИИ
        const systemPrompt = role === 'client' 
            ? PromptManager.generateAiTherapistPrompt(flow) 
            : PromptManager.generateClientPrompt(modalityId, difficulty, clientProfile, knowledge);

        const historyText = history.map(m => `${m.role}: ${m.content}`).join('\n');
        const content = await callYandexAi(`${historyText}\nuser: ${message}`, systemPrompt);
        const voice = await generateYandexVoice(content, clientProfile.gender);

        // Логирование диалога для будущего Fine-tuning
        if(db) await db.collection('training_logs').add({ 
            userId, role, message, response: content, modalityId, timestamp: admin.firestore.FieldValue.serverTimestamp() 
        });

        res.json({ content, voice });
    } catch (e) { res.status(500).json({ error: "AI Processing Error" }); }
});

/**
 * ФИНАЛИЗАЦИЯ (Аудит, PDF, Бесконечный цикл)
 */
app.post('/api/finish', async (req, res) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        history: Joi.array().required(),
        modalityId: Joi.string().required(),
        selectedClientId: Joi.string().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: "Invalid finish payload" });

    const { userId, history, modalityId, selectedClientId } = value;
    try {
        const historyText = history.map(m => `${m.role}: ${m.content}`).join('\n');
        const auditPrompt = PromptManager.generateDeepAnalysisPrompt(modalityId, historyText);
        
        const analysisRaw = await callYandexAi("Проведи полный аудит сессии и выдай JSON.", auditPrompt, 0.2);
        const analysis = JSON.parse(analysisRaw.replace(/```json|```/g, '').trim());

        let certificateUrl = null;
        if (db && userId) {
            // 1. Генерация PDF Сертификата
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const filename = `certificates/${userId}_${Date.now()}.pdf`;
            const file = bucket.file(filename);
            const stream = file.createWriteStream({ metadata: { contentType: 'application/pdf' } });
            
            doc.pipe(stream);
            doc.fillColor('#020617').rect(0, 0, 595, 842).fill();
            doc.fillColor('#6366f1').fontSize(30).text('CONNECTUM PRO CERTIFICATE', 50, 80);
            doc.fillColor('#ffffff').fontSize(15).text(`Master ID: ${userId}`, 50, 150);
            doc.text(`Modality: ${modalityId.toUpperCase()}`, 50, 175);
            doc.text(`Score: ${analysis.method}%`, 50, 200);
            doc.moveDown();
            doc.fontSize(12).fillColor('#94a3b8').text(analysis.expert_comment || "Сессия успешно проанализирована.", { width: 500 });
            doc.end();
            certificateUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

            // 2. Помечаем клиента пройденным (Фильтрация для бесконечного цикла)
            await db.doc(`artifacts/${APP_ID}/users/${userId}/profile/progress`).set({
                passedClients: admin.firestore.FieldValue.arrayUnion(selectedClientId)
            }, { merge: true });

            // 3. ГЕНЕРИРУЕМ НОВОГО КЛИЕНТА (Infinite Loop Logic)
            const genPrompt = PromptManager.generateNewClientScenarioPrompt();
            const newClientRaw = await callYandexAi("Создай нового уникального клиента", genPrompt);
            const newClient = JSON.parse(newClientRaw.replace(/```json|```/g, '').trim());
            await db.collection(`artifacts/${APP_ID}/users/${userId}/custom_clients`).add({ 
                ...newClient, createdAt: admin.firestore.FieldValue.serverTimestamp() 
            });

            // 4. Сохраняем сессию в историю
            await db.collection(`artifacts/${APP_ID}/users/${userId}/sessions`).add({ 
                modalityId, analysis, certificateUrl, timestamp: admin.firestore.FieldValue.serverTimestamp() 
            });
            
            await adminLog(`🏆 Юзер ${userId} завершил сессию ${modalityId} на ${analysis.method}%`);
        }

        res.json({ analytics: analysis, certificateUrl });
    } catch (e) { 
        logger.error("Audit Fail: " + e.message);
        res.status(500).json({ error: "Ошибка формирования аудита." }); 
    }
});

/**
 * ПРОФИЛЬ (О СЕБЕ + МОДАЛЬНОСТИ + ВИТРИНА)
 */
app.post('/api/profile', async (req, res) => {
    const { userId, profile } = req.body;
    if (!db || !userId) return res.json({ status: 'error' });
    try {
        const data = { 
            ...profile, 
            updatedAt: admin.firestore.FieldValue.serverTimestamp() 
        };
        // Личный профиль
        await db.doc(`artifacts/${APP_ID}/users/${userId.toString()}/profile/data`).set(data, { merge: true });
        
        // Публичная витрина агрегатора
        await db.doc(`artifacts/${APP_ID}/public/data/psychologists/${userId.toString()}`).set({ 
            ...data, 
            skillRating: 85, 
            verified: true 
        }, { merge: true });
        
        res.json({ status: 'success' });
    } catch (e) { 
        logger.error("Profile Save Fail: " + e.message);
        res.status(500).send("Profile Save Fail"); 
    }
} );

app.get('*', (req, res) => { res.sendFile(path.join(distPath, 'index.html')); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`🚀 Connectum v21.26 MASTER Online on port ${PORT}`);
    adminLog("🚀 Система v21.26 запущенна на Yandex Assistant API.");
});
