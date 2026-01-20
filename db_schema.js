/**
 * DB_SCHEMA.JS - Архитектура Firestore v21.25 Platinum Evolution.
 * =========================================================================
 * ⚖️ ПОЛНАЯ СИНХРОНИЗАЦИЯ: App.jsx, server.js и YandexGPT Pro.
 * 🏗️ ПРАВИЛО №1 (СТРОГИЕ ПУТИ): 
 * - Публичные: /artifacts/{appId}/public/data/{collectionName}/{docId}
 * - Приватные: /artifacts/{appId}/users/{userId}/{collectionName}/{docId}
 */

const appId = "connectum-platinum";

// =========================================================================
// I. ПУБЛИЧНЫЙ СЛОЙ (GLOBAL DATA & ANALYTICS)
// =========================================================================

/**
 * КОЛЛЕКЦИЯ: psychologists
 * Путь: /artifacts/{appId}/public/data/psychologists/{userId}
 * Назначение: Глобальная витрина специалистов.
 */
const psychologistPublicSchema = {
    userId: "string",           // Telegram UID
    name: "string",             // Публичное имя
    experience: "number",       // Стаж
    price: "number",            // Стоимость сессии
    methods: "string",          // Перечень модальностей
    about: "string",            // "О себе" для клиентов
    skillRating: "number",      // Индекс мастерства (расчет ИИ)
    photoUrl: "string | null",  // Ссылка на аватар
    isPremium: "boolean",       // Доступ к PRO
    isVip: "boolean",           // Приоритет в выдаче
    updatedAt: "timestamp"      // Время последней активности
};

/**
 * КОЛЛЕКЦИЯ: training_logs (Logging 2.0)
 * Путь: /artifacts/{appId}/public/data/training_logs/{logId}
 * Назначение: Сбор данных для самообучения ИИ.
 */
const trainingLogsSchema = {
    userId: "string",           // Кто тренировался
    role: "psychologist | client",
    modalityId: "string",       // Метод
    userMessage: "string",      // Реплика пользователя
    aiResponse: "string",       // Ответ ИИ
    supervisorHint: "string",   // Данный совет (если был)
    metadata: {
        difficulty: "number",
        timestamp: "timestamp"
    }
};

/**
 * КОЛЛЕКЦИЯ: waitlist
 * Путь: /artifacts/{appId}/public/data/waitlist/{docId}
 */
const waitlistSchema = {
    userId: "string",
    role: "string",
    tariff: "string",
    status: "pending | processed",
    timestamp: "serverTimestamp"
};

// =========================================================================
// II. ПРИВАТНЫЙ СЛОЙ (USER-SPECIFIC DATA)
// =========================================================================

/**
 * КОЛЛЕКЦИЯ: profile
 * Путь: /artifacts/{appId}/users/{userId}/profile/data
 * Назначение: Расширенные настройки мастера.
 */
const userProfileSchema = {
    name: "string",
    experience: "number",
    price: "number",
    about: "string",            // Философия и опыт
    methods: "string",          // Методы работы
    photoUrl: "string | null",
    diamonds: "number",         // Текущий баланс бриллиантов
    updatedAt: "timestamp"
};

/**
 * КОЛЛЕКЦИЯ: progress
 * Путь: /artifacts/{appId}/users/{userId}/profile/progress
 * Назначение: Фильтрация для бесконечного цикла.
 */
const userProgressSchema = {
    passedClients: ["string"],  // Массив ID (c1, c2, ai_xxx), которые больше не показываются
    totalSessions: "number",
    masteryLevel: "number"
};

/**
 * КОЛЛЕКЦИЯ: custom_clients
 * Путь: /artifacts/{appId}/users/{userId}/custom_clients/{clientId}
 * Назначение: Уникальные клиенты, сгенерированные YandexGPT специально для юзера.
 */
const customClientSchema = {
    id: "string",               // Генерируется Firestore
    name: "string",
    age: "number",
    profession: "string",
    gender: "male | female",
    avatar: "string (emoji)",
    bio: "string",              // Психологический портрет + зажимы
    isAi: true,                 // Пометка, что это не статический кейс
    createdAt: "timestamp"
};

/**
 * КОЛЛЕКЦИЯ: sessions
 * Путь: /artifacts/{appId}/users/{userId}/sessions/{sessionId}
 * Назначение: История сессий и PDF сертификаты.
 */
const sessionSchema = {
    modalityId: "string",
    selectedClientId: "string",
    transcript: "array",        // История чата
    analysis: {
        method: "number",
        empathy: "number",
        boundaries: "number",
        ethics: "number",
        expert_comment: "string"
    },
    certificateUrl: "string",   // Путь к PDF в Storage
    timestamp: "serverTimestamp"
};

/**
 * КОЛЛЕКЦИЯ: limits
 * Путь: /artifacts/{appId}/users/{userId}/limits/stats
 */
const limitsSchema = {
    diamonds: "number",         // Актуальный баланс для транзакций
    activeTariff: "string",
    lastRefill: "timestamp"
};

if (typeof module !== 'undefined') {
    module.exports = { 
        appId, 
        psychologistPublicSchema, 
        userProfileSchema, 
        customClientSchema,
        trainingLogsSchema 
    };
}
