/**
 * DB_SCHEMA.JS - Актуальная архитектура Firestore v20.3 Platinum.
 * =========================================================================
 * ⚖️ СИНХРОНИЗИРОВАНО С App.jsx и server.js v20.3.
 * 🏗 ПРАВИЛО №1 (СТРОГИЕ ПУТИ): 
 * - Публичные: /artifacts/{appId}/public/data/{collectionName}/{docId}
 * - Приватные: /artifacts/{appId}/users/{userId}/{collectionName}/{docId}
 */

const appId = "connectum-platinum";

// =========================================================================
// I. ПУБЛИЧНЫЙ СЛОЙ (MARKETPLACE / ВИТРИНА)
// =========================================================================

/**
 * КОЛЛЕКЦИЯ: psychologists
 * Путь: /artifacts/{appId}/public/data/psychologists/{userId}
 * Назначение: Витрина специалистов для клиентов.
 */
const psychologistPublicSchema = {
    userId: "string",           // Telegram UID
    name: "string",             // ФИО специалиста
    experience: "number",       // Стаж (лет)
    price: "number",            // Цена за сессию (₽)
    methods: "string",          // Описание подходов (полные названия из modalities.js)
    skillRating: "number",      // Итоговый балл (0-100) из ИИ-аудитов
    photoUrl: "string | null",  // Ссылка на фото (Firebase Storage)
    videoUrl: "string | null",  // Ссылка на видео-визитку (.webm)
    isPremium: "boolean",       // Статус PRO (2990₽)
    isVip: "boolean",           // VIP-размещение в ТОП выдачи
    verified: "boolean",        // Подтверждение дипломов администрацией
    updatedAt: "timestamp"      // Время последнего обновления
};

/**
 * КОЛЛЕКЦИЯ: waitlist
 * Путь: /artifacts/{appId}/public/data/waitlist/{docId}
 */
const waitlistSchema = {
    userId: "string",
    role: "psychologist" | "client",
    tariff: "psych_test_drive" | "psych_pro" | "client_premium",
    amount: "number",
    status: "pending" | "paid",
    timestamp: "serverTimestamp"
};

// =========================================================================
// II. ПРИВАТНЫЙ СЛОЙ (USER-SPECIFIC DATA)
// =========================================================================

/**
 * КОЛЛЕКЦИЯ: profile
 * Путь: /artifacts/{appId}/users/{userId}/profile/data
 * Назначение: Личная анкета и бизнес-настройки.
 */
const userProfileSchema = {
    name: "string",
    experience: "number",
    price: "number",
    methods: "string",
    photoUrl: "string | null",
    videoUrl: "string | null",
    commission: 0.2 | 0.4,      // PRO (20%), Basic (40%)
    isPremium: "boolean",
    gems: "number",             // Баланс сессий
    updatedAt: "timestamp"
};

/**
 * КОЛЛЕКЦИЯ: sessions
 * Путь: /artifacts/{appId}/users/{userId}/sessions/{sessionId}
 * Назначение: Логи диалогов и аналитика трансформации.
 */
const sessionSchema = {
    modalityId: "string",       // mpt, cbt, gestalt и т.д.
    role: "psychologist" | "client",
    transcript: [               // Полный лог для последующего обучения
        { role: "user" | "ai" | "hint", content: "string", timestamp: "number" }
    ],
    analysis: {                 // Результат обработки Gemma 3
        method: "number",       // 0-100 (для психолога)
        empathy: "number",      // 0-100 (для психолога)
        expert_comment: "string",
        insight: "string",      // Главный инсайт (для клиента)
        body_focus: "string",   // Фокус на ощущениях (для клиента)
        action_step: "string"   // Шаг в реальности
    },
    certificateUrl: "string",   // Ссылка на PDF для PRO-мастеров
    timestamp: "serverTimestamp"
};

/**
 * КОЛЛЕКЦИЯ: limits
 * Путь: /artifacts/{appId}/users/{userId}/limits/stats
 */
const limitsSchema = {
    gems: "number",             // Доступные тренировки
    activeTariff: "string",     // Текущий уровень доступа
    expiresAt: "timestamp"      // Дата окончания подписки
};

if (typeof module !== 'undefined') {
    module.exports = { appId, psychologistPublicSchema, userProfileSchema, sessionSchema };
}
