import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { marked } from 'marked';

/**
 * =========================================================================
 * КОННЕКТУМ ПРО v25.0 - QUANTUM SINGULARITY (АБСОЛЮТНЫЙ МОНОЛИТ)
 * =========================================================================
 * * 📄 ФАЙЛ: src/App.jsx
 * ⚖️ СТАТУС: FINAL PRODUCTION MASTER
 * 🛡️ ПРОТОКОЛ: ANTI-CUTTING ACTIVE (1550+ СТРОК ПРЕМИУМ-КОДА)
 * * 🏗️ ПОЭКРАННАЯ АРХИТЕКТУРА:
 * 1.  OS_BOOT_SEQUENCE (Эмуляция загрузки ядра)
 * 2.  ACCESS_PROTOCOL_LEGAL (Юридический фильтр)
 * 3.  COMMAND_HUB (Главный навигационный пульт)
 * 4.  TRAINING_LAB_SETUP (Мастерская Психолога)
 * 5.  PILOT_SERVICE_HUB (Клиентский центр)
 * 6.  NEURAL_INTERVENTION_CHAT (Интегральная сессия)
 * 7.  MASTERY_AUDIT_REPORT (Отчет для специалиста)
 * 8.  AWARENESS_MAP_REPORT (Отчет для клиента)
 * 9.  ELITE_MARKETPLACE (Витрина лучших мастеров)
 * 10. COGNITIVE_SYNC_PROFILE (Личный кабинет и Квесты)
 * 11. QUANTUM_PAY_STORE (Магазин тарифов)
 * 12. WAITLIST_TERMINAL (Обратная связь)
 * =========================================================================
 */

// --- 1. СИСТЕМА ПРЕМИУМ-ИКОНОК (CUSTOM SVG ENGINE) ---
const Icons = {
  Infinity: ({ className }) => (
    <svg className={className} viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 20C20 20 20 60 40 60C50 60 60 50 80 40C100 30 110 20 120 20C140 20 140 60 120 60C110 60 100 50 80 40C60 30 50 20 40 20Z" 
            stroke="url(#infGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <defs><linearGradient id="infGrad" x1="0" x2="160" y1="40" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#681fef"/><stop offset="0.5" stopColor="#00D2FF"/><stop offset="1" stopColor="#681fef"/></linearGradient></defs>
    </svg>
  ),
  AllInclusive: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 9.17 7.85c-.97-.97-2.33-1.53-3.77-1.53-2.94 0-5.33 2.39-5.33 5.33S2.46 17 5.4 17c1.44 0 2.8-.56 3.77-1.53L12 12.62l2.83 2.85c.97.97 2.33 1.53 3.77 1.53 2.94 0 5.33-2.39 5.33-5.33s-2.39-5.05-5.33-5.05zM5.4 15c-.94 0-1.73-.79-1.73-1.73s.79-1.73 1.73-1.73c.44 0 .89.18 1.23.51l2.22 2.22c-.34.46-.86.73-1.45.73zm13.2 0c-.59 0-1.11-.27-1.45-.73l2.22-2.22c.34-.33.79-.51 1.23-.51.94 0 1.73.79 1.73 1.73S19.54 15 18.6 15z"/>
    </svg>
  ),
  Diamond: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h12l4 5-10 11L2 9l4-5Z"/><path d="M12 20V9M2 9h20M6 4l6 5 6-5" strokeOpacity="0.3"/>
    </svg>
  ),
  Bolt: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  Commander: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeOpacity="0.2"/><path d="M12 8v8M8 12h8" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 3a9 9 0 0 1 9 9" stroke="#681fef" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Pilot: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M18 8l2 2 4-4" stroke="#00D2FF" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Search: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>
    </svg>
  ),
  User: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Diagnosis: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" strokeOpacity="0.2"/><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M12 2v20M2 12h20" strokeOpacity="0.2"/>
    </svg>
  ),
  Market: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6" strokeOpacity="0.3"/>
    </svg>
  ),
  Settings: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H20a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  ChevronLeft: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  ),
  Send: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  ),
  Camera: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Trophy: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  Check: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  Radio: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>
  ),
  Support: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4l3 3 3-3h4a2 2 0 0 0 2-2Z"/><path d="M9.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm5 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"/>
    </svg>
  )
};

// --- 2. ЭТАЛОННАЯ БАЗА 30 КЕЙСОВ (ФЕНОМЕНОЛОГИЯ И МАРКЕРЫ) ---
// Каждый кейс содержит уникальные BIO и соматические подсказки для Stitch UI
const CLIENT_DATABASE = [
    { id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", status: "Средний", avatar: "👩‍💻", bio: "Парализующий саботаж при записи видео. Страх проявления. В теле — зажим в горле. Считает себя 'недостаточной' для больших охватов.", markers: ["ЗАЖИМ В ГОРЛЕ", "ПОВЕРХНОСТНОЕ ДЫХАНИЕ", "ХОЛОД В РУКАХ"] },
    { id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", status: "Высокий", avatar: "👨‍🎨", bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным. Скрытый перфекционизм через прокрастинацию.", markers: ["ТЯЖЕСТЬ В ПЛЕЧАХ", "ПУЛЬСАЦИЯ В ВИСКАХ", "СЖАТИЕ ЧЕЛЮСТИ"] },
    { id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", status: "Средний", avatar: "👩‍💼", bio: "Постоянное сжатие в груди и тревога. Не могу переключиться с работы на отдых. Ощущение, что за углом ждет катастрофа.", markers: ["СЖАТИЕ В ГРУДИ", "ТРЕМОР ПАЛЬЦЕВ", "ПОВЫШЕННЫЙ ПУЛЬС"] },
    { id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", status: "Нестабильный", avatar: "👨🏻", bio: "Сменил 5 профессий за 2 года. Нигде не находит признания, чувствует себя неудачником и вечным новичком.", markers: ["ПУСТОТА В ЖИВОТЕ", "СУТУЛОСТЬ", "ТИХИЙ ГОЛОС"] },
    { id: "c5", name: "Анна", age: 25, profession: "Студентка", status: "Начинающий", avatar: "👩🏼", bio: "Не может завершить разрушительные отношения. Боится одиночества до тошноты. Полное слияние с партнером.", markers: ["ТОШНОТА", "ХОЛОД В ЖИВОТЕ", "КОМ В ГОРЛЕ"] },
    { id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", status: "VIP", avatar: "👨🏻‍💼", bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе и холод. Чувствует себя роботом без эмоций.", markers: ["ОНЕМЕНИЕ ТЕЛА", "ОТСУТСТВИЕ ВЗДОХА", "ТЯЖЕСТЬ В НОГАХ"] },
    { id: "c7", name: "Ольга", age: 38, profession: "Врач", status: "Высокий", avatar: "👩🏻", bio: "Ипохондрия. Паника при малейшем физическом дискомфорте. Пытается контролировать биение сердца мыслью.", markers: ["ГОЛОВОКРУЖЕНИЕ", "ВАТНЫЕ НОГИ", "ЖАР В ЛИЦЕ"] },
    { id: "c8", name: "Дмитрий", age: 29, profession: "Продавец", status: "Базовый", avatar: "🧔🏻", bio: "Боится встреч. Напряжение в скулах и зажим речи. Постоянно прокручивает в голове 'что обо мне подумают'.", markers: ["НАПРЯЖЕНИЕ СКУЛ", "ПОТЛИВОСТЬ", "БЕГАЮЩИЙ ВЗГЛЯД"] },
    { id: "c9", name: "Мария", age: 33, profession: "Домохозяйка", status: "Средний", avatar: "👩‍🍼", bio: "Материнская вина. Ощущение, что она плохая мать. Не может вздохнуть от груза ожиданий общества.", markers: ["НЕХВАТКА ВОЗДУХА", "БОЛЬ В ПОЯСНИЦЕ", "ВЯЛОСТЬ"] },
    { id: "c10", name: "Сергей", age: 50, profession: "Предприниматель", status: "Кризис", avatar: "👨🏻‍🦳", bio: "Банкротство бизнеса. Колоссальный стыд перед семьей. Чувствует себя 'старым и ненужным львом'.", markers: ["ЖАР В ЛИЦЕ", "ТЯЖЕСТЬ В ГРУДИ", "КАМЕННЫЙ ЖИВОТ"] },
    { id: "c11", name: "Юлия", age: 27, profession: "Модель", status: "Высокий", avatar: "👩🏻", bio: "РПП. Ненавидит свое отражение. Постоянный контроль веса. Тело воспринимается как враждебный объект.", markers: ["УЗЕЛ В ЖЕЛУДКЕ", "ХОЛОД В РУКАХ", "СУХОСТЬ ВО РТУ"] },
    { id: "c12", name: "Андрей", age: 35, profession: "Архитектор", status: "Средний", avatar: "👨🏿", bio: "Вспышки неконтролируемого гнева. Ощущение закипающего кипятка в груди. Боится разрушить всё вокруг.", markers: ["ПРИЛИВ ЖАРА", "СЖАТИЕ КУЛАКОВ", "КРАСНЫЕ ПЯТНА"] },
    { id: "c13", name: "Наталья", age: 40, profession: "Учитель", status: "Базовый", avatar: "👩‍💼", bio: "Одиночество в толпе. Живет как за толстым стеклом. Потеря способности к глубокому контакту.", markers: ["ДАВЛЕНИЕ В УШАХ", "ТУМАН В ГЛАЗАХ", "ОТСТРАНЕННОСТЬ"] },
    { id: "c14", name: "Павел", age: 22, profession: "Курьер", status: "Низкий", avatar: "👱🏻", bio: "Зависимость от мнения родителей. Не может принять решение. Ощущение, что за ним всегда следят.", markers: ["СЛАБОСТЬ В НОГАХ", "КОЛЮЧКИ В СПИНЕ", "ЗАЖИМ В ТАЗУ"] },
    { id: "c15", name: "Екатерина", age: 36, profession: "HR-директор", status: "Высокий", avatar: "👩‍🏫", bio: "Выгорание. Перфекционизм. Жжение в глазах от истощения. Пытается 'выжать из себя остатки'.", markers: ["РЕЗЬ В ГЛАЗАХ", "ТЯЖЕЛЫЙ ЗАТЫЛОК", "СПАЗМ ДИАФРАГМЫ"] },
    { id: "c16", name: "Александр", age: 44, profession: "Инженер", status: "Средний", avatar: "👨🏻", bio: "Застрял в горе. Чувствует вину перед ушедшим близким. Жизнь остановилась 3 года назад.", markers: ["КОМ В ГОРЛЕ", "СВИНЦОВАЯ ГРУДЬ", "ЗАМЕРЗАНИЕ"] },
    { id: "c17", name: "Светлана", age: 30, profession: "Бьюти-мастер", status: "Базовый", avatar: "👩🏼", bio: "Низкая самооценка. Считает себя 'недостаточной' для любви. Постоянно извиняется за свое существование.", markers: ["СЖАТИЕ ТЕЛА", "ТИХИЙ СМЕХ", "ОПУЩЕННЫЕ ПЛЕЧИ"] },
    { id: "c18", name: "Роман", age: 32, profession: "Аналитик", status: "Средний", avatar: "👨🏿‍💻", bio: "Игровая зависимость. Уход от реальности в виртуальный мир. Боится реальных чувств.", markers: ["ТУМАН В ГОЛОВЕ", "ОНЕМЕНИЕ ПАЛЬЦЕВ", "СУХОСТЬ ГЛАЗ"] },
    { id: "c19", name: "Ирина", age: 48, profession: "Юрист", status: "Высокий", avatar: "👵🏼", bio: "Синдром пустого гнезда. Дети уехали, смысл жизни пропал. Ощущение ненужности.", markers: ["ПУСТОТА В ГРУДИ", "ХОЛОД В ДОМЕ", "КОМ В ГОРЛЕ"] },
    { id: "c20", name: "Кирилл", age: 26, profession: "Дизайнер", status: "Начинающий", avatar: "👦🏻", bio: "Агорафобия. Боится выходить на открытые пространства. Мир кажется опасным и ярким.", markers: ["ДРОЖЬ В КОЛЕНЯХ", "ПОТЛИВОСТЬ", "РАШИРЕННЫЕ ЗРАЧКИ"] },
    { id: "c21", name: "Татьяна", age: 55, profession: "Пенсионерка", status: "Базовый", avatar: "👩🏻‍🦱", bio: "Кризис старения. Ощущение, что время уходит впустую. Сожаления о несделанном.", markers: ["ТЯЖЕСТЬ В НОГАХ", "БОЛЬ В СЕРДЦЕ", "ВЯЛОСТЬ РУК"] },
    { id: "c22", name: "Виктор", age: 39, profession: "Водитель", status: "Средний", avatar: "🧔", bio: "Переживает измену. Колючая проволока вокруг сердца. Не может больше доверять людям.", markers: ["КОЛЮЩАЯ БОЛЬ", "ЗАЖИМ В ГРУДИ", "ГНЕВ В ЧЕЛЮСТИ"] },
    { id: "c23", name: "Алина", age: 24, profession: "Бариста", status: "Начинающий", avatar: "👩‍🎓", bio: "Не умеет говорить 'нет'. Чувствует, что все ею пользуются. Потеря собственного 'Я'.", markers: ["БЕССИЛИЕ", "МЯГКИЙ ПОЗВОНОЧНИК", "ТИХИЙ ГОЛОС"] },
    { id: "c24", name: "Денис", age: 37, profession: "Охранник", status: "Базовый", avatar: "👨🏻", bio: "Навязчивые мысли о здоровье. Постоянные проверки. Страх внезапной смерти.", markers: ["ГИПЕРТОНУС", "РВАНЫЙ ПУЛЬС", "ЖАР В ШЕЕ"] },
    { id: "c25", name: "Людмила", age: 60, profession: "Педагог", status: "Пенсия", avatar: "👵", bio: "Конфликт с невесткой. Чувствует себя ненужной и лишней в собственной семье.", markers: ["ЖАР В ГРУДИ", "ГОРЕЧЬ", "НАПРЯЖЕННАЯ СПИНА"] },
    { id: "c26", name: "Максим", age: 21, profession: "Блогер", status: "Низкий", avatar: "👦🏼", bio: "Подростковый бунт против системы. Ничего не хочет делать. Скрытая депрессия под маской лени.", markers: ["ВАКУУМ", "ОТСУТСТВИЕ ФОКУСА", "ОПУЩЕННЫЙ ВЗГЛЯД"] },
    { id: "c27", name: "Валерия", age: 31, profession: "Стилист", status: "Средний", avatar: "👩🏻‍🦰", bio: "Болезненная ревность. Постоянный поиск улик измены. Тотальный контроль партнера.", markers: ["ГОРЕЧЬ ВО РТУ", "КОЛЮЧКИ В ГЛАЗАХ", "СПАЗМ ЖИВОТА"] },
    { id: "c28", name: "Станислав", age: 43, profession: "Адвокат", status: "Высокий", avatar: "👨🏻‍💼", bio: "Трудоголизм. Не умеет расслабляться без алкоголя. Тело воспринимается как инструмент.", markers: ["ЗАТЫЛОЧНЫЙ ЗАЖИМ", "КАМЕННЫЕ ПЛЕЧИ", "СУХОСТЬ В ГОРЛЕ"] },
    { id: "c29", name: "Евгения", age: 29, profession: "Копирайтер", status: "Средний", avatar: "👩🏻", bio: "Страх перемен. Боится менять работу, даже если там плохо. Оцепенение перед выбором.", markers: ["ОЦЕПЕНЕНИЕ", "ХОЛОД В СТОПАХ", "СЖАТИЕ В СОЛНЕЧНОМ"] },
    { id: "c30", name: "Константин", age: 35, profession: "Финансист", status: "Высокий", avatar: "👨🏻", bio: "Эмоциональная холодность. Не понимает, что чувствует. Мир кажется серым и плоским.", markers: ["ПЛАСТИКОВОЕ ТЕЛО", "ОТСУТСТВИЕ ОТКЛИКА", "ТИШИНА"] }
];

const MODALITIES = {
  mpt: { id: "mpt", name: "МПТ", full: "Мета-персональная терапия", desc: "Смена самоописания через возврат авторства (А. Волынский)." },
  cbt: { id: "cbt", name: "КПТ", full: "Когнитивно-поведенческая терапия", desc: "Работа с автоматическими мыслями и убеждениями (А. Бек)." },
  gestalt: { id: "gestalt", name: "ГЕШТАЛЬТ", full: "Гештальт-терапия", desc: "Осознавание на границе контакта 'Здесь и Сейчас' (Ф. Перлз)." },
  eit: { id: "eit", name: "ЭОТ", full: "Эмоционально-образная терапия", desc: "Трансформация состояний через работу с образами (Н. Линде)." },
  act: { id: "act", name: "АСТ", full: "Терапия принятия и ответственности", desc: "Психологическая гибкость и жизнь согласно ценностям." },
  ta: { id: "ta", name: "ТА", full: "Транзактный анализ", desc: "Анализ эго-состояний Р-В-Д и сценариев (Э. Берн)." }
};

// --- 3. QUANTUM STYLES ENGINE (CSS & ANIMATIONS) ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    
    :root { 
      --bg-dark: #020618;
      --primary: #681fef;
      --indigo-glow: #5F20EF;
      --cyan-glow: #00D2FF;
      --gold: #FFD700;
      --glass: rgba(18, 16, 24, 0.85);
      --slate-glass: rgba(30, 41, 59, 0.7);
      --neon-shadow: 0 0 20px rgba(104, 31, 239, 0.5);
    }
    
    body { font-family: 'Manrope', sans-serif; background-color: var(--bg-dark); color: #fff; overflow: hidden; margin: 0; -webkit-tap-highlight-color: transparent; }
    
    /* Mesh Nebula Background */
    .mesh-nebula {
      position: fixed; inset: 0; z-index: -1;
      background: radial-gradient(circle at 10% 20%, rgba(104, 31, 239, 0.12) 0%, transparent 40%),
                  radial-gradient(circle at 90% 80%, rgba(0, 210, 255, 0.1) 0%, transparent 40%),
                  radial-gradient(circle at 50% 50%, rgba(10, 10, 30, 1) 0%, rgba(2, 6, 23, 1) 100%);
    }

    /* Panels & Glassmorphism */
    .glass-panel { background: var(--glass); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.08); }
    .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }

    /* Scanline Terminal Effect */
    .scanline {
      background: linear-gradient(to bottom, transparent 50%, rgba(0, 210, 255, 0.03) 50%);
      background-size: 100% 4px;
    }

    /* Premium Shimmer Button */
    .premium-shine {
      position: relative; overflow: hidden;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .premium-shine::after {
      content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255,255,255,0.06), transparent);
      transform: rotate(45deg); transition: 0.7s; pointer-events: none;
    }
    .premium-shine:active::after { left: 120%; }
    .premium-shine:active { transform: scale(0.96); }

    /* Outlined Text Typography */
    .outlined-text { 
      position: absolute; bottom: -4px; right: 10px; 
      font-size: clamp(2rem, 8vw, 3rem); 
      font-weight: 900; 
      color: transparent; 
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06); 
      pointer-events: none; text-transform: uppercase; line-height: 1; z-index: 0; 
    }

    .text-neon { text-shadow: 0 0 10px rgba(104, 31, 239, 0.6); }
    .data-font { font-family: 'Space Grotesk', sans-serif; }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    @keyframes pulse-marker { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.4); opacity: 1; } }
    .pulse-dot { animation: pulse-marker 2s infinite; }
    
    @keyframes typing-dot { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
    .typing-dot { animation: typing-dot 1.5s infinite; }

    .snap-carousel { scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
    .snap-item { scroll-snap-align: center; }

    .grain-layer {
      position: fixed; inset: 0; pointer-events: none; z-index: 50; opacity: 0.02;
      background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
    }
    
    .screen-container { height: 100dvh; display: flex; flex-direction: column; overflow: hidden; position: relative; }
    .content-area { flex: 1; overflow-y: auto; overflow-x: hidden; padding-bottom: 120px; }
    
    .user-bubble { background: linear-gradient(135deg, #4F1AAB 0%, #7F38E2 100%); }
    .ai-bubble { background: #2f2938; border: 1px solid rgba(255, 255, 255, 0.05); }
    .supervisor-card { background: rgba(245, 158, 11, 0.05); backdrop-filter: blur(12px); border: 1px solid #f59e0b; }
    
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .animate-spin-slow { animation: spin-slow 12s linear infinite; }

    /* Custom scroll for chat */
    .chat-scroll::-webkit-scrollbar { width: 4px; }
    .chat-scroll::-webkit-scrollbar-track { background: transparent; }
    .chat-scroll::-webkit-scrollbar-thumb { background: rgba(104, 31, 239, 0.2); border-radius: 10px; }
    
    /* Radar Chart Animation */
    .radar-svg { filter: drop-shadow(0 0 20px rgba(104, 31, 239, 0.5)); transition: all 1s ease; }
    
    /* Mobile-First Layout Adjustments */
    @media (max-width: 480px) {
       .text-6xl { font-size: 3.5rem; }
       .p-10 { padding: 1.5rem; }
       .rounded-[5rem] { border-radius: 3.5rem; }
    }
  `}</style>
);

// --- 📊 COMPONENTS: RADAR, ANALYTICS, SOMATIC ---
const RadarChart = ({ data }) => {
    const size = 220, center = size/2, radius = 80;
    const safe = data || { method: 85, empathy: 70, boundaries: 90, ethics: 80 };
    const pts = [
      { x: center, y: center - radius * (safe.method/100) },
      { x: center + radius * (safe.empathy/100), y: center },
      { x: center, y: center + radius * (safe.boundaries/100) },
      { x: center - radius * (safe.ethics/100), y: center }
    ];
    const poly = pts.map((p, i) => `${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
    return (
      <div className="relative my-8 flex items-center justify-center group">
        <div className="absolute inset-0 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <svg width={size} height={size} className="overflow-visible radar-svg relative z-10">
          <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
          <circle cx={center} cy={center} r={radius/1.5} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <circle cx={center} cy={center} r={radius/3} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          {/* Оси */}
          <line x1={center} y1={center-radius} x2={center} y2={center+radius} stroke="rgba(255,255,255,0.1)" />
          <line x1={center-radius} y1={center} x2={center+radius} y2={center} stroke="rgba(255,255,255,0.1)" />
          
          <path d={poly} fill="rgba(104, 31, 239, 0.35)" stroke="var(--primary)" strokeWidth="4" strokeLinejoin="round" className="transition-all duration-1000"/>
          
          <text x={center} y={center-radius-20} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" className="data-font font-black tracking-widest uppercase">Метод</text>
          <text x={center+radius+18} y={center+5} textAnchor="start" fontSize="11" fill="rgba(255,255,255,0.6)" className="data-font font-black tracking-widest uppercase">Эмпатия</text>
          <text x={center} y={center+radius+30} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" className="data-font font-black tracking-widest uppercase">Границы</text>
          <text x={center-radius-18} y={center+5} textAnchor="end" fontSize="11" fill="rgba(255,255,255,0.6)" className="data-font font-black tracking-widest uppercase">Этика</text>
        </svg>
      </div>
    );
};

// --- 🚀 ГЛАВНЫЙ МОНОЛИТ ПРИЛОЖЕНИЯ ---
export default function App() {
  // --- CORE UI STATES ---
  const [screen, setScreen] = useState('loading');
  const [bootProgress, setBootProgress] = useState(0);
  const [role, setRole] = useState(null); 
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  
  // --- SESSION FLOW STATES ---
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [selectedModality, setSelectedModality] = useState('mpt');
  const [difficulty, setDifficulty] = useState(2); 
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [gems, setGems] = useState(14);
  const [psychologists, setPsychologists] = useState([]);
  const [userProfile, setUserProfile] = useState({ 
    name: '', experience: 0, price: 0, photoUrl: null, videoUrl: null, methods: '' 
  });
  const [sessionAnalytics, setSessionAnalytics] = useState(null);

  const chatEndRef = useRef(null);
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id?.toString() || 'master_operator_x';

  // --- REUSABLE HELPERS ---
  const triggerHaptic = useCallback((style = 'medium') => { 
    if(tg?.HapticFeedback) tg.HapticFeedback.impactOccurred(style); 
  }, [tg]);

  const unlockAudio = () => { 
    const audio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==");
    audio.play().catch(()=>{}); 
  };

  // --- SYSTEM BOOT SEQUENCE ---
  useEffect(() => {
    if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#020618'); }
    
    const interval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const accepted = localStorage.getItem('connectum_v25_legal');
            if (accepted) { setHasAcceptedTerms(true); setScreen('hub'); }
            else { setScreen('legal'); }
          }, 800);
          return 100;
        }
        // Нелинейная загрузка для реалистичности
        const jump = prev < 30 ? 5 : prev < 70 ? 12 : 3;
        return prev + Math.floor(Math.random() * jump) + 1;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [tg]);

  // Скролл чата
  useEffect(() => {
    if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Загрузка витрины
  useEffect(() => {
    if(screen === 'aggregator') {
      triggerHaptic('light');
      fetch('/api/aggregator').then(r=>r.json()).then(setPsychologists).catch(()=>{});
    }
  }, [screen, triggerHaptic]);

  // --- API HANDLERS ---
  const handleSend = async (text = inputText, isInitial = false, action = 'chat', flow = null) => {
    if (isInitial) unlockAudio();
    if (!text && !isInitial) return;
    
    if (!isInitial && action === 'chat') {
        triggerHaptic('light');
        setMessages(p => [...p, { role: 'user', content: text, timestamp: Date.now() }]);
    }
    
    setInputText(''); 
    setIsTyping(true);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, message: text, modalityId: selectedModality, action, 
          selectedClientId, role, flow, difficulty, 
          history: messages.slice(-12) 
        })
      });
      
      const data = await res.json();
      
      if(action === 'get_hint') {
          triggerHaptic('heavy');
          setMessages(p => [...p, { role: 'hint', content: data.hint, data: data.analysis }]);
      } else if(data.content) {
          setMessages(p => [...p, { role: 'ai', content: data.content, voice: data.voice }]);
          if(data.voice) {
             const audio = new Audio(`data:audio/mp3;base64,${data.voice}`);
             audio.play().catch(e => console.error("Voice playback error", e));
          }
      }
    } catch(e) { 
        setMessages(p => [...p, { role: 'ai', content: "🛑 **КРИТИЧЕСКАЯ ОШИБКА:** Потеряна связь с Квантовым Ядром. Попробуйте снова." }]);
    }
    setIsTyping(false);
  };

  const handleFinish = async () => {
    if (!confirm("Завершить квантовую синхронизацию и сформировать финальный отчет?")) return;
    triggerHaptic('heavy');
    setIsTyping(true);
    try {
        const res = await fetch('/api/finish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, history: messages, role, modalityId: selectedModality })
        });
        const data = await res.json();
        setSessionAnalytics(data.analytics);
        setScreen('report');
    } catch(e) { 
        console.error("Analysis formation failed", e);
        setScreen('hub'); 
    }
    setIsTyping(false);
  };

  const handleProfileUpdate = async () => {
    triggerHaptic('medium');
    try {
        await fetch('/api/profile', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ userId, profile: userProfile })
        });
        tg?.showPopup({ title: "Успех", message: "Ваша нейронная карта обновлена в системе." });
        setScreen('hub');
    } catch(e) { alert("Ошибка сохранения данных"); }
  };

  const currentClientData = useMemo(() => 
    CLIENT_DATABASE.find(c => c.id === selectedClientId) || CLIENT_DATABASE[0]
  , [selectedClientId]);

  // --- RENDER SCREEN 1: OS BOOT (LOADING) ---
  if (screen === 'loading') return (
    <div className="screen-container bg-[#020617] items-center justify-between py-20 px-10 text-center">
      <GlobalStyles /><div className="mesh-nebula" />
      <div className="flex-1" />
      
      <div className="relative z-10 flex flex-col items-center gap-16">
        <div className="relative w-80 h-80 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 blur-[130px] rounded-full animate-pulse" />
          <div className="relative transform hover:scale-105 transition-transform duration-[3000ms]">
            <Icons.Infinity className="w-64 h-32 drop-shadow-[0_0_60px_rgba(104,31,239,1)]" />
            <div className="absolute top-10 right-16 size-4 bg-[#00D2FF] rounded-full animate-pulse shadow-[0_0_30px_#00D2FF] border-2 border-white/40" />
          </div>
        </div>
        <div className="text-center space-y-6">
          <h1 className="text-white text-7xl font-black tracking-tighter leading-none italic uppercase text-glow drop-shadow-2xl">Коннектум</h1>
          <div className="flex items-center justify-center gap-6">
             <div className="h-[1.5px] w-12 bg-gradient-to-r from-transparent to-primary" />
             <p className="text-cyan-glow text-[14px] font-black tracking-[0.8em] uppercase opacity-90 data-font">Quantum Sync v25</p>
             <div className="h-[1.5px] w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto space-y-16">
        <div className="flex flex-col gap-6 text-left font-mono text-[10px] text-white/20 uppercase tracking-[0.3em] leading-relaxed border-l-2 border-white/5 pl-8 italic">
           <p className={`transition-all duration-1000 transform translate-x-${bootProgress > 20 ? '0' : '-6'} ${bootProgress > 20 ? 'opacity-100' : 'opacity-0'}`}>- INITIALIZING QUANTUM_CORE_2.5... [DONE]</p>
           <p className={`transition-all duration-1000 transform translate-x-${bootProgress > 45 ? '0' : '-6'} ${bootProgress > 45 ? 'opacity-100' : 'opacity-0'}`}>- SYNCING NEURAL_LINK: MPT_VOLYNSKI... [DONE]</p>
           <p className={`transition-all duration-1000 transform translate-x-${bootProgress > 75 ? '0' : '-6'} ${bootProgress > 75 ? 'opacity-100' : 'opacity-0'}`}>- ESTABLISHED CONNECTION: GEMINI_LIVE_AUDIO... [ACTIVE]</p>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="relative h-[4px] w-full bg-white/5 rounded-full overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
            <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary via-white to-cyan-glow transition-all duration-500 shadow-[0_0_30px_#fff]" style={{ width: `${bootProgress}%` }}>
               <div className="absolute right-0 top-1/2 -translate-y-1/2 size-7 bg-white rounded-full shadow-[0_0_20px_#fff] blur-[4px] border-4 border-primary/20" />
            </div>
          </div>
          <div className="flex justify-between items-center opacity-40 text-[12px] font-black tracking-widest uppercase data-font">
            <span className="animate-pulse">Loading Neuro-Matrix...</span><span className="tabular-nums">{bootProgress}%</span>
          </div>
        </div>
        <p className="text-white/20 text-[12px] font-bold tracking-[0.5em] uppercase italic opacity-40">Синергия мастерства и доверия</p>
      </div>
    </div>
  );

  return (
    <div className="screen-container bg-[#020618] text-white antialiased overflow-hidden">
      <GlobalStyles /><div className="mesh-nebula" /><div className="grain-layer" />

      {/* HEADER: TERMINAL ACCESS BAR (ULTRA PREMIUM STITCH) */}
      {!['loading', 'legal', 'chat'].includes(screen) && (
        <header className="sticky top-0 z-50 p-6">
          <div className="glass-panel rounded-[2.5rem] flex items-center justify-between p-4 border-white/15 shadow-[0_30px_60px_rgba(0,0,0,0.9)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-cyan-glow/10 opacity-40" />
            <div className="flex items-center gap-6 relative z-10">
              <div className="size-16 rounded-3xl border-2 border-primary/50 p-1.5 shadow-[0_0_30px_rgba(104,31,239,0.6)] overflow-hidden relative active:scale-95 transition-transform cursor-pointer group/avatar" onClick={()=>setScreen('profile')}>
                <div className="w-full h-full rounded-[1.2rem] bg-slate-900 flex items-center justify-center text-4xl group-hover/avatar:scale-110 transition-transform duration-500">
                   {userProfile.photoUrl ? <img src={userProfile.photoUrl} className="w-full h-full object-cover" /> : '👤'}
                </div>
                <div className="absolute inset-0 bg-primary/10 animate-pulse pointer-events-none" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[12px] uppercase tracking-[0.5em] text-primary font-black data-font leading-none opacity-80">Terminal Access</h2>
                <p className="text-md font-black text-white uppercase tracking-tighter mt-2.5 leading-none flex items-center gap-3">
                   Коннектум v25.0
                   <span className="size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_#10b981]" />
                </p>
              </div>
            </div>
            <button onClick={()=>{ triggerHaptic(); setScreen('store'); }} className="bg-primary/20 px-8 py-3.5 rounded-[1.5rem] border border-primary/40 flex items-center gap-5 active:scale-90 transition-all shadow-3xl group hover:border-primary">
              <span className="text-xl font-black text-gold data-font tabular-nums tracking-tighter leading-none group-hover:text-white transition-colors">{gems}</span>
              <Icons.Diamond className="size-7 drop-shadow-[0_0_12px_#FFD700] group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </header>
      )}

      <main className="content-area no-scrollbar">
        
        {/* SCREEN 2: ACCESS PROTOCOL (LEGAL LOCK) */}
        {screen === 'legal' && (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-1000">
             <div className="glass-panel p-14 rounded-[6rem] max-w-sm border-t-2 border-white/20 shadow-[0_100px_200px_rgba(0,0,0,1)] relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_50px_var(--primary)] animate-pulse" />
                 <Icons.Infinity className="w-40 h-20 mx-auto mb-14 opacity-100 drop-shadow-[0_0_40px_var(--primary)] transform hover:rotate-12 transition-transform duration-1000" />
                 <h2 className="text-5xl font-black mb-12 text-white uppercase tracking-tighter italic text-neon leading-none drop-shadow-2xl text-center">PROTOCOL<br/>ACCESS</h2>
                 <div className="space-y-10 text-[14px] text-white/50 mb-16 leading-relaxed font-black uppercase tracking-widest text-center">
                    <p className="border-b border-white/5 pb-8 flex items-center justify-center gap-4 transition-colors hover:text-white group">
                        <Icons.Check className="size-5 text-primary group-hover:scale-125 transition-transform" /> 
                        Вам исполнилось 18 лет
                    </p>
                    <p className="border-b border-white/5 pb-8 flex items-center justify-center gap-4 transition-colors hover:text-white group">
                        <Icons.Check className="size-5 text-primary group-hover:scale-125 transition-transform" /> 
                        Вы принимаете ИИ-анализ
                    </p>
                    <p className="pb-4 flex items-center justify-center gap-4 transition-colors hover:text-white group">
                        <Icons.Check className="size-5 text-primary group-hover:scale-125 transition-transform" /> 
                        Контур Безопасности Активен
                    </p>
                 </div>
                 <button onClick={acceptLegal} className="premium-shine w-full py-10 bg-primary rounded-[3rem] text-[17px] font-black uppercase tracking-[1em] text-white shadow-[0_50px_100px_rgba(104,31,239,0.7)] active:scale-95 transition-all transform hover:scale-105 border-t border-white/40">АКТИВИРОВАТЬ</button>
             </div>
          </div>
        )}

        {/* SCREEN 3: COMMAND HUB (MAIN GATE) - THE HERO SCREEN */}
        {screen === 'hub' && (
          <div className="p-10 space-y-16 animate-in fade-in duration-1000 overflow-y-auto no-scrollbar pb-20">
             <div className="mt-8 flex flex-col items-center text-center relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-[18rem] font-black text-white/5 select-none pointer-events-none data-font italic uppercase leading-none tracking-tighter opacity-10">CORE</div>
                <div className="relative group transition-transform duration-1000 hover:scale-105 active:scale-95 mb-16">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-[140px] animate-pulse" />
                  <div className="flex items-center justify-center size-64 glass-panel rounded-full border-primary/50 shadow-[0_0_100px_rgba(104,31,239,0.7)] ring-4 ring-white/5 relative overflow-hidden backdrop-blur-[60px]">
                    <Icons.AllInclusive className="size-40 text-primary relative z-10 transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent shimmer" />
                  </div>
                  {/* Floating Particles Around Hero */}
                  <div className="absolute -top-4 -right-4 size-4 bg-cyan-glow rounded-full blur-sm animate-bounce shadow-[0_0_15px_#00D2FF]" />
                  <div className="absolute -bottom-6 -left-4 size-3 bg-primary rounded-full blur-sm animate-pulse shadow-[0_0_15px_#681fef]" />
                </div>
                <h1 className="text-7xl font-black uppercase tracking-tighter leading-none text-neon italic text-glow text-center uppercase drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">COMMAND<br/>HUB</h1>
                <p className="text-[14px] font-black text-white/30 uppercase tracking-[1em] mt-10 data-font leading-none ml-4">Universal AI Neural Link v25.0</p>
             </div>

             <div className="flex flex-col gap-12 max-w-sm mx-auto pt-10">
                {/* ROLE: PSYCHOLOGIST (B2B) */}
                <button onClick={() => { triggerHaptic(); setRole('psychologist'); setScreen('setup'); }} className="glass-panel premium-shine group relative min-h-[220px] rounded-[5rem] p-14 flex flex-col justify-center text-left border-primary/40 active:scale-[0.97] transition-all duration-1000 overflow-hidden shadow-[0_60px_100px_rgba(104,31,239,0.3)] border-t border-white/15">
                    <div className="absolute top-10 right-12 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-1000 scale-[1.8]">
                        <Icons.Commander className="size-28 text-primary" />
                    </div>
                    <div className="outlined-text tracking-tighter opacity-10">MASTERY</div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="size-2 bg-primary rounded-full animate-pulse" />
                           <span className="text-[12px] font-black uppercase tracking-[0.6em] text-primary data-font leading-none">B2B_TRAINER_CORE</span>
                        </div>
                        <h3 className="text-5xl font-black text-white uppercase tracking-tight italic leading-none text-glow">Я Психолог</h3>
                        <p className="text-[14px] text-white/50 mt-6 font-black uppercase tracking-[0.3em] leading-none opacity-60 italic">Тренажер • Рост • Рейтинг</p>
                    </div>
                </button>

                {/* ROLE: CLIENT (B2C) */}
                <button onClick={() => { triggerHaptic(); setRole('client'); setScreen('client_hub'); }} className="glass-panel premium-shine group relative min-h-[220px] rounded-[5rem] p-14 flex flex-col justify-center text-left border-cyan-glow/40 active:scale-[0.97] transition-all duration-1000 overflow-hidden shadow-[0_60px_100px_rgba(0,210,255,0.25)] border-t border-white/15">
                    <div className="absolute top-10 right-12 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-1000 scale-[1.8]">
                        <Icons.Pilot className="size-28 text-cyan-glow" />
                    </div>
                    <div className="outlined-text tracking-tighter opacity-10">TRUST</div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="size-2 bg-cyan-glow rounded-full animate-pulse" />
                           <span className="text-[12px] font-black uppercase tracking-[0.6em] text-cyan-glow data-font leading-none">B2C_PILOT_NAV</span>
                        </div>
                        <h3 className="text-5xl font-black text-white uppercase tracking-tight italic leading-none text-glow">Я Клиент</h3>
                        <p className="text-[14px] text-white/50 mt-6 font-black uppercase tracking-[0.3em] leading-none opacity-60 italic">ИИ-Помощь • Диагностика</p>
                    </div>
                </button>
             </div>

             {/* Footer Tertiary Links */}
             <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto pt-16 pb-12">
                <a href="https://t.me/psy_connectum" target="_blank" className="glass-panel p-10 rounded-[2.5rem] flex flex-col items-center gap-5 hover:bg-white/10 transition-all group active:scale-95 border-white/10 shadow-3xl">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors">
                       <Icons.Radio className="size-10 text-white/40 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">Канал</span>
                </a>
                <a href="https://t.me/lazalex81" target="_blank" className="glass-panel p-10 rounded-[2.5rem] flex flex-col items-center gap-5 hover:bg-white/10 transition-all group active:scale-95 border-white/10 shadow-3xl">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-cyan-glow/20 transition-colors">
                       <Icons.Support className="size-10 text-white/40 group-hover:text-cyan-glow transition-colors" />
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">Сервис</span>
                </a>
             </div>
          </div>
        )}

        {/* SCREEN 4: TRAINING LAB (B2B SETUP) - THE STITCH MASTERPIECE */}
        {screen === 'setup' && (
          <div className="p-8 space-y-20 animate-in slide-in-from-right no-scrollbar pb-60">
            
            {/* ТАРИФЫ (PREMIUM VERTICAL GRID) */}
            <section className="mt-6 flex gap-8 px-2">
               <div onClick={()=>{ triggerHaptic(); setScreen('store'); }} className="flex-1 glass-panel p-10 rounded-[4rem] border-orange-500/30 active:scale-95 transition-all group shadow-4xl relative overflow-hidden border-t border-white/10">
                  <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-1.5 bg-orange-400 rounded-full animate-pulse" />
                    <span className="text-[11px] font-black uppercase text-orange-400 tracking-[0.5em] data-font block leading-none">Starter</span>
                  </div>
                  <div className="flex items-end gap-4">
                    <p className="text-6xl font-black data-font tracking-tighter leading-none text-glow">490₽</p>
                    <span className="text-[12px] text-white/20 mb-2 font-black uppercase tracking-widest leading-none">/ 5 SESS</span>
                  </div>
               </div>
               <div onClick={()=>{ triggerHaptic(); setScreen('store'); }} className="flex-1 glass-panel p-10 rounded-[4rem] border-primary shadow-[0_0_80px_rgba(104,31,239,0.4)] relative overflow-hidden active:scale-95 transition-all group border-t border-white/20">
                  <div className="absolute inset-0 bg-primary/10 opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute -top-1 -right-1 p-5 bg-primary text-[12px] font-black rounded-bl-[2.5rem] shadow-3xl z-20 flex items-center gap-2">👑 PRO</div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--primary)]" />
                    <span className="text-[11px] font-black uppercase text-primary tracking-[0.5em] data-font block leading-none">Unlimited</span>
                  </div>
                  <div className="flex items-end gap-4">
                    <p className="text-6xl font-black data-font tracking-tighter leading-none text-glow">2990₽</p>
                    <span className="text-[12px] text-white/20 mb-2 font-black uppercase tracking-widest leading-none">/ MO</span>
                  </div>
               </div>
            </section>

            {/* ВЫБОР ШКОЛЫ (HORIZONTAL SNAP SCROLL) */}
            <section>
              <div className="px-4 flex items-center justify-between mb-10">
                <div className="flex flex-col">
                    <h3 className="text-[16px] font-black tracking-[0.6em] text-white/40 uppercase italic leading-none">Школа Терапии</h3>
                    <span className="text-[11px] text-primary data-font uppercase mt-3 font-black tracking-[0.5em] leading-none">Framework Selector Module</span>
                </div>
                <div className="size-16 glass-panel rounded-3xl flex items-center justify-center shadow-3xl border-white/10 group active:scale-90 transition-transform cursor-pointer">
                    <Icons.Settings className="size-8 text-primary/80 animate-spin-slow" />
                </div>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-carousel px-4">
                {Object.keys(MODALITIES).map(k => (
                  <button key={k} onClick={() => { triggerHaptic('light'); setSelectedModality(k); }} className={`flex h-20 shrink-0 items-center justify-center snap-item rounded-[2rem] px-14 border-2 transition-all duration-1000 relative overflow-hidden group ${selectedModality === k ? 'bg-primary border-primary shadow-[0_0_60px_rgba(104,31,239,0.7)] text-white scale-110 z-10' : 'glass-panel border-white/10 text-white/30 hover:text-white/60 hover:border-white/20'}`}>
                    <div className={`absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="flex flex-col items-center gap-2 relative z-10">
                        <span className="text-lg font-black tracking-[0.5em] uppercase data-font leading-none">{MODALITIES[k].name}</span>
                        {selectedModality === k && <span className="text-[8px] font-black text-white/40 uppercase tracking-widest animate-pulse">Sync Active</span>}
                    </div>
                    {selectedModality === k && <div className="absolute top-2 right-4 size-2 bg-white rounded-full animate-pulse shadow-[0_0_15px_#fff]" />}
                  </button>
                ))}
              </div>
            </section>

            {/* КАРУСЕЛЬ КЛИЕНТОВ (STITCH UI - FULL SCALE) */}
            <section>
              <div className="px-4 mb-12 flex items-center justify-between">
                <div className="flex flex-col">
                    <h3 className="text-[16px] font-black tracking-[0.6em] text-white/40 uppercase italic leading-none">Симуляция Клиента</h3>
                    <span className="text-cyan-glow text-[12px] font-black tracking-[0.5em] uppercase data-font animate-pulse leading-none mt-3.5">30 Active Humanoid Prototypes Ready</span>
                </div>
                <div className="size-5 bg-cyan-glow rounded-full shadow-[0_0_30px_#00D2FF] pulse-dot border-4 border-white/10" />
              </div>
              
              <div className="flex overflow-x-auto snap-carousel no-scrollbar pb-20 px-4">
                <div className="flex items-stretch gap-12">
                  {CLIENT_DATABASE.map(c => (
                    <div key={c.id} onClick={() => { triggerHaptic('light'); setSelectedClientId(c.id); }} className={`snap-item flex flex-col gap-10 min-w-[380px] transition-all duration-1000 ${selectedClientId === c.id ? 'scale-105 opacity-100' : 'scale-90 opacity-10 grayscale blur-[4px]'}`}>
                      <div className={`relative w-full aspect-[4/5] rounded-[7rem] overflow-hidden border-[6px] transition-all duration-1000 shadow-[0_80px_160px_rgba(0,0,0,1)] ${selectedClientId === c.id ? 'border-primary shadow-primary/40' : 'border-white/5'}`}>
                        
                        {/* Аватар-Голограмма (High Detail) */}
                        <div className="absolute inset-0 bg-[#0c0c1e] flex items-center justify-center text-[18rem] scanline select-none opacity-95 transition-all duration-1000 group-hover:scale-110">
                            {c.avatar}
                            {/* Фоновые технические слои */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-cyan-glow/20 mix-blend-overlay animate-pulse" />
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                        </div>
                        
                        {/* Затемняющий градиент (Слоистый) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020618] to-transparent" />
                        
                        {/* СОМАТИЧЕСКИЕ МАРКЕРЫ (STITCH UI - FLOATING NEON TAGS) */}
                        <div className="absolute top-16 left-16 flex flex-col gap-8 z-30">
                          {(c.markers || ["NEURAL_BLOCK"]).map((m, idx) => (
                            <div key={idx} className="glass-panel px-9 py-4 rounded-[1.5rem] text-[14px] font-black text-cyan-glow flex items-center gap-6 backdrop-blur-[60px] border-white/20 shadow-4xl animate-in slide-in-from-left duration-1000 border-t border-white/30">
                              <div className="size-4 bg-cyan-glow rounded-full pulse-dot shadow-[0_0_35px_#00D2FF]" />
                              <span className="tracking-[0.5em] uppercase leading-none italic text-glow">{m}</span>
                            </div>
                          ))}
                        </div>

                        {/* Инфо-блок внизу карточки (Premium Typography) */}
                        <div className="absolute bottom-16 left-16 right-16 text-left z-30 transform transition-transform duration-1000">
                          <p className="text-7xl font-black tracking-tighter text-white uppercase italic leading-none drop-shadow-[0_20px_40px_rgba(0,0,0,1)] text-glow">{c.name}</p>
                          <div className="h-2 w-32 bg-primary mt-10 rounded-full shadow-[0_0_25px_var(--primary)] animate-pulse" />
                          <div className="flex items-center gap-8 mt-10">
                              <div className="flex flex-col">
                                 <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-2 data-font">Profession</span>
                                 <span className="text-[18px] text-white/80 tracking-[0.4em] font-black uppercase data-font leading-none">{c.profession}</span>
                              </div>
                              <div className="w-px h-10 bg-white/10" />
                              <div className="flex flex-col">
                                 <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-2 data-font">Sync_Age</span>
                                 <span className="text-[18px] text-white/80 tracking-[0.4em] font-black uppercase data-font leading-none">{c.age} YRS</span>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* BIO CARD (DETAILED QUANTUM PANEL) */}
              <div className="px-4">
                <div className="glass-panel p-16 rounded-[6rem] border-l-[20px] border-primary shadow-[0_80px_160px_rgba(0,0,0,0.8)] relative overflow-hidden group border-t border-white/10">
                  <div className="absolute -right-24 -top-16 text-[22rem] opacity-5 select-none font-black italic data-font tracking-tighter group-hover:scale-105 transition-transform duration-[3000ms] uppercase leading-none pointer-events-none">SUBJECT</div>
                  <div className="flex items-center justify-between mb-12 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="size-4 bg-primary rounded-full animate-pulse shadow-[0_0_20px_var(--primary)] border-2 border-white/40" />
                        <span className="text-[14px] font-black text-white/40 uppercase tracking-[1em] leading-none">Phenomenological Profile Matrix</span>
                    </div>
                    <span className="text-[10px] text-primary font-black data-font uppercase tracking-widest opacity-40">Encrypted_v2.5</span>
                  </div>
                  <p className="text-2xl text-slate-100 italic leading-relaxed font-medium relative z-10 drop-shadow-2xl">"{currentClientData.bio}"</p>
                  <div className="mt-14 flex flex-col gap-6 opacity-30">
                     <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] data-font">End of Session Input Data</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white to-transparent" />
                     </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ВЫБОР СЛОЖНОСТИ (MATRIX UI - QUANTUM SCALE) */}
            <section className="px-4 pb-20">
              <div className="flex flex-col mb-12 px-4">
                  <h3 className="text-[16px] font-black tracking-[0.6em] text-white/40 uppercase italic leading-none text-center">Интенсивность Сопротивления</h3>
                  <div className="flex items-center justify-center gap-4 mt-6">
                     <div className="h-px w-20 bg-white/5" />
                     <span className="text-[11px] text-white/20 data-font uppercase font-black tracking-[0.6em]">Resonance Calibration Level</span>
                     <div className="h-px w-20 bg-white/5" />
                  </div>
              </div>
              <div className="grid grid-cols-3 gap-10 px-4">
                {[1, 2, 3].map(lvl => (
                  <button key={lvl} onClick={() => { triggerHaptic('light'); setDifficulty(lvl); }} className={`glass-panel py-12 rounded-[3.5rem] flex flex-col items-center transition-all duration-1000 shadow-4xl relative overflow-hidden group ${difficulty === lvl ? (lvl===1?'border-emerald-500 bg-emerald-500/10 shadow-[0_0_60px_rgba(16,185,129,0.4)] scale-110':lvl===2?'border-blue-500 bg-blue-500/10 shadow-[0_0_60px_rgba(59,130,246,0.4)] scale-110':'border-rose-500 bg-rose-500/10 shadow-[0_0_60px_rgba(244,63,94,0.4)] scale-110') : 'border-white/5 opacity-20 hover:opacity-100 hover:border-white/20 hover:scale-105'}`}>
                    <div className={`absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <span className={`text-[14px] font-black mb-6 data-font tracking-[0.5em] relative z-10 leading-none ${difficulty === lvl ? 'opacity-100' : 'opacity-30'}`}>LVL 0{lvl}</span>
                    <span className="text-[18px] font-black uppercase tracking-[0.3em] relative z-10 italic leading-none">{lvl===1?'Легко':lvl===2?'Норма':'Хард'}</span>
                    {difficulty === lvl && <div className="absolute top-4 right-6 size-2.5 bg-white rounded-full animate-pulse shadow-[0_0_20px_#fff] border border-white/50" />}
                    <div className={`absolute bottom-0 left-0 h-1.5 bg-current transition-all duration-1000 ${difficulty === lvl ? 'w-full' : 'w-0'}`} />
                  </button>
                ))}
              </div>
            </section>

            {/* КНОПКА ЗАПУСКА (THE ULTIMATE ACTION) */}
            <div className="fixed bottom-0 left-0 right-0 p-14 z-50 pointer-events-none">
              <div className="max-w-2xl mx-auto pointer-events-auto">
                <button onClick={() => { triggerHaptic('heavy'); setScreen('chat'); handleSend('Здравствуйте', true); }} className="premium-shine w-full bg-primary h-32 rounded-[5rem] flex items-center justify-between px-20 shadow-[0_0_120px_rgba(104,31,239,0.8)] border-t-2 border-white/40 active:scale-[0.94] transition-all transform duration-700 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="flex items-center gap-10 relative z-10">
                    <div className="p-6 bg-white/15 rounded-[2.5rem] shadow-3xl ring-2 ring-white/30 group-hover:scale-110 transition-transform duration-700"><Icons.Bolt className="size-12 text-white animate-pulse" /></div>
                    <div className="flex flex-col items-start">
                        <span className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none drop-shadow-2xl">Начать сессию</span>
                        <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.5em] mt-3 leading-none">Initiate Neural Link</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 bg-black/60 px-10 py-5 rounded-[3rem] border-2 border-white/20 shadow-4xl relative z-10 transform group-hover:translate-x-2 transition-transform duration-700">
                    <span className="text-3xl font-black text-gold data-font tabular-nums tracking-tighter leading-none shadow-gold">1</span>
                    <Icons.Diamond className="size-10 text-gold drop-shadow-[0_0_15px_#FFD700] animate-pulse" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN: CLIENT HUB (PILOT B2C) - THE SUPREME NAVIGATOR */}
        {screen === 'client_hub' && (
           <div className="p-10 space-y-20 animate-in slide-in-from-left pb-60">
              <div className="flex flex-col items-center text-center px-4 relative mt-8">
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-[20rem] font-black text-white/5 select-none pointer-events-none data-font italic uppercase leading-none tracking-tighter opacity-10">NAV</div>
                  <h2 className="text-8xl font-black uppercase tracking-tighter italic text-neon text-glow leading-none drop-shadow-[0_20px_60px_rgba(0,0,0,1)] text-center">PILOT<br/>HUB</h2>
                  <div className="mt-12 flex items-center gap-6 bg-cyan-glow/10 px-10 py-3 rounded-full border-2 border-cyan-glow/40 shadow-[0_0_30px_rgba(0,210,255,0.2)]">
                    <Icons.Pilot className="size-7 text-cyan-glow animate-pulse" />
                    <span className="text-[14px] font-black uppercase tracking-[0.8em] text-cyan-glow data-font ml-2">Universal AI Navigator</span>
                  </div>
              </div>
              
              {/* ПЛАТИНУМ ТАРИФ (PILOT SIDE - ULTIMATE DETAIL) */}
              <div className="glass-panel p-16 rounded-[6rem] border-primary/50 relative overflow-hidden group premium-shine shadow-[0_80px_160px_rgba(0,0,0,1)] border-t border-white/20 transform hover:scale-[1.02] transition-all duration-1000">
                  <div className="absolute -right-24 -top-20 text-[22rem] font-black text-white/5 select-none pointer-events-none italic tracking-tighter leading-none uppercase transform -rotate-12 group-hover:rotate-0 transition-transform duration-[2000ms]">ULTRA</div>
                  <div className="relative z-20">
                      <div className="flex items-center gap-5 mb-10">
                        <Icons.Bolt className="size-8 text-primary animate-pulse shadow-[0_0_20px_var(--primary)]" />
                        <span className="text-[14px] font-black uppercase tracking-[0.8em] text-primary data-font">Premium Sync Active</span>
                      </div>
                      <h4 className="text-6xl font-black italic uppercase tracking-tighter text-white leading-tight drop-shadow-2xl">Тариф<br/>Платинум</h4>
                      <p className="text-xl text-white/50 mt-12 leading-relaxed font-medium max-w-[500px]">Ваш личный интегральный ИИ-терапевт 24/7. Построение многомерной «Карты Осознанности», глубокое квантовое сканирование боли и моментальный доступ к ТОП-1% мастеров системы.</p>
                      <div className="mt-16 flex items-center justify-between bg-black/80 p-12 rounded-[5rem] border-4 border-white/5 shadow-[inset_0_20px_60px_rgba(0,0,0,1)]">
                          <div className="flex flex-col gap-4">
                              <span className="text-6xl font-black text-white data-font tabular-nums tracking-tighter leading-none text-glow shadow-white">1990₽</span>
                              <span className="text-[13px] text-white/30 uppercase tracking-[0.5em] font-black mt-2 ml-1">Единоразовый взнос</span>
                          </div>
                          <button onClick={()=>{ triggerHaptic('heavy'); setScreen('store'); }} className="premium-shine bg-primary px-16 py-9 rounded-[3rem] text-[16px] font-black uppercase tracking-[1em] shadow-[0_40px_80px_rgba(104,31,239,0.8)] active:scale-95 transition-all transform hover:scale-110 border-t-2 border-white/40">АКТИВИРОВАТЬ</button>
                      </div>
                  </div>
              </div>

              {/* СПИСОК УСЛУГ (PILOT CENTER - THE TRIAD) */}
              <div className="grid gap-12">
                  {[
                    {id: 'diagnostics', icon: <Icons.Diagnosis/>, title: "ИИ-Диагностика", sub: "Интегральный квантовый сканер боли", color: "primary", msg: "Начать диагностику", flow: "diagnostics", badge: "CORE_SCAN"},
                    {id: 'therapy', icon: <Icons.Sparkles/>, title: "ИИ-Терапевт", sub: "Поддержка в моменте (Все школы)", color: "cyan-glow", msg: "Мне нужна помощь", flow: "therapy", badge: "ADAPTIVE_LINK"},
                    {id: 'aggregator', icon: <Icons.Market/>, title: "Живой Мастер", sub: "Верифицированные мастера системы", color: "white/10", msg: null, flow: null, badge: "HUMAN_SYNC"}
                  ].map(btn => (
                    <button key={btn.id} onClick={() => { 
                        if(btn.id==='aggregator') setScreen('aggregator'); 
                        else { triggerHaptic(); setScreen('chat'); handleSend(btn.msg, true, 'chat', btn.flow); }
                    }} className={`glass-panel p-14 rounded-[5rem] flex items-center gap-14 active:scale-[0.98] transition-all duration-1000 border-l-[20px] border-${btn.color} group shadow-[0_60px_100px_rgba(0,0,0,0.6)] relative overflow-hidden border-t border-white/10 hover:translate-x-4`}>
                        <div className="absolute right-0 top-0 text-[12rem] opacity-5 font-black italic data-font pointer-events-none uppercase tracking-tighter transform rotate-12 group-hover:rotate-0 transition-transform duration-1000">{btn.id.slice(0,3)}</div>
                        <div className={`size-32 bg-white/5 rounded-[4rem] border-2 border-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform relative z-10 shadow-inner group-hover:scale-110 duration-700 ${btn.id==='diagnostics'?'text-primary shadow-primary/20':btn.id==='therapy'?'text-cyan-glow shadow-cyan-glow/20':'text-white/40'}`}>
                            {React.cloneElement(btn.icon, { className: "size-16" })}
                        </div>
                        <div className="text-left flex-1 relative z-10">
                            <div className="flex items-center gap-4 mb-6 opacity-40">
                               <div className="size-2 bg-white rounded-full animate-pulse" />
                               <span className="text-[12px] font-black uppercase tracking-[0.6em] data-font">{btn.badge}</span>
                            </div>
                            <h4 className="text-4xl font-black uppercase tracking-tighter text-white italic leading-none group-hover:text-neon transition-colors duration-700">{btn.title}</h4>
                            <p className="text-[15px] font-black text-white/30 uppercase mt-6 tracking-[0.3em] leading-relaxed max-w-[300px]">{btn.sub}</p>
                        </div>
                    </button>
                  ))}
              </div>
              <div className="h-60" />
           </div>
        )}

        {/* SCREEN: STORE (QUANTUM PAY TERMINAL - THE ULTIMATE SHOP) */}
        {screen === 'store' && (
           <div className="p-12 space-y-20 animate-in zoom-in duration-1000 pb-60 text-left">
              <div className="flex flex-col sm:flex-row justify-between items-center px-6 mt-10 gap-10 relative">
                  <div className="absolute -top-20 left-0 text-[15rem] font-black text-white/5 select-none pointer-events-none data-font italic uppercase leading-none tracking-tighter opacity-10">PAY</div>
                  <div className="flex flex-col text-center sm:text-left relative z-10">
                    <h2 className="text-7xl font-black uppercase tracking-tighter italic text-neon text-glow leading-none uppercase drop-shadow-2xl">CONNECTUM<br/>PAY</h2>
                    <span className="text-[14px] text-white/20 data-font uppercase mt-8 font-black tracking-[1em] leading-none ml-2">Verified Financial Protocol v.S2</span>
                  </div>
                  <div className="p-12 glass-panel rounded-[4rem] border-white/20 shadow-[0_0_100px_rgba(255,215,0,0.2)] active:scale-90 transition-all transform hover:rotate-6 duration-1000 relative z-10">
                    <Icons.Diamond className="size-20 text-gold animate-pulse drop-shadow-[0_0_20px_#FFD700]" />
                  </div>
              </div>

              <div className="space-y-16 max-w-2xl mx-auto">
                  {[
                    {id: 'test', title: 'Test-Drive', price: '490₽', desc: '5 сессий глубокой тренировки мастерства + полный методический аудит каждого ответа от ИИ-Супервизора.', color: 'orange-500', gemsVal: '5', label: 'Initial Entry Pass', icon: '🔋'},
                    {id: 'pro', title: 'PRO Terminal', price: '2990₽', desc: 'Безлимит на месяц + Золотые PDF сертификаты + Приоритетное размещение в Витрине Элиты (Rank Boost).', color: 'primary', gemsVal: 'UNLIMITED', hot: true, label: 'Expansion Mode 2.0', icon: '⚡'},
                    {id: 'client', title: 'Pilot Platinum', price: '1990₽', desc: 'Безлимитный ИИ-терапевт + Квантовая Карта Осознанности + Доступ к закрытому клубу мастеров.', color: 'cyan-glow', gemsVal: 'ULTRA_VOICE', label: 'B2C Navigator', icon: '🚀'}
                  ].map(t => (
                    <div key={t.id} className={`glass-panel p-16 rounded-[6rem] relative overflow-hidden group premium-shine shadow-[0_100px_200px_rgba(0,0,0,0.8)] border-t-2 border-white/10 transition-all duration-1000 ${t.hot ? 'border-primary/60 glow-primary scale-105 my-20 z-20 ring-4 ring-primary/10' : 'opacity-80 hover:opacity-100 hover:scale-[1.03]'}`}>
                        {t.hot && <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-background-dark text-[14px] font-black px-16 py-4 rounded-b-[3rem] uppercase tracking-[0.6em] shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-30 leading-none animate-pulse">MOST POPULAR CHOICE</div>}
                        
                        <div className="flex justify-between items-start mb-16 relative z-10">
                            <div className={`size-32 bg-white/5 rounded-[4rem] border-2 border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-1000 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] ${t.id==='pro'?'text-primary':t.id==='client'?'text-cyan-glow':'text-orange-400'}`}>
                               <span className="text-[5rem] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">{t.icon}</span>
                            </div>
                            <div className="text-right">
                               <span className="block text-[15px] font-black text-white/20 uppercase tracking-[0.8em] mb-6 data-font leading-none">{t.label}</span>
                               <div className="text-7xl font-black data-font italic tracking-tighter text-glow drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">{t.price}</div>
                               <span className="text-[12px] text-white/30 uppercase mt-4 block font-black tracking-[0.4em] italic">Ready for instant sync</span>
                            </div>
                        </div>
                        
                        <div className="relative z-10 border-b border-white/5 pb-16 mb-16">
                            <h3 className="text-5xl font-black uppercase tracking-tighter text-white mb-8 italic leading-none group-hover:text-neon transition-colors duration-1000 text-glow">{t.title}</h3>
                            <p className="text-2xl text-white/50 leading-relaxed font-medium max-w-[500px] italic">"{t.desc}"</p>
                        </div>
                        
                        <div className="flex flex-col gap-6 relative z-10">
                           <button onClick={()=>triggerHaptic('heavy')} className={`premium-shine w-full py-12 rounded-[3.5rem] font-black text-[20px] uppercase tracking-[1em] shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all active:scale-[0.94] border-t-2 border-white/30 transform relative group/btn ${t.id==='pro' ? 'bg-primary text-white shadow-primary/40' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}>
                              <span className="relative z-10 drop-shadow-2xl">АКТИВИРОВАТЬ</span>
                              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                           </button>
                           <div className="flex items-center justify-center gap-5 opacity-30 mt-4">
                              <div className="h-px w-10 bg-white" />
                              <span className="text-[10px] font-black uppercase tracking-[0.6em] data-font">End of tier data</span>
                              <div className="h-px w-10 bg-white" />
                           </div>
                        </div>
                        
                        <div className="absolute -left-16 -bottom-16 text-[20rem] font-black text-white/5 select-none pointer-events-none data-font italic uppercase leading-none tracking-tighter transform rotate-12 group-hover:rotate-0 transition-transform duration-[2000ms]">{t.id.slice(0,3)}</div>
                    </div>
                  ))}

                  {/* WAITLIST IN-STORE CTA */}
                  <div className="pt-20 pb-20 px-4">
                    <div className="glass-panel p-16 rounded-[6rem] border-4 border-dashed border-white/10 relative overflow-hidden group hover:border-primary/50 transition-all duration-1000 shadow-4xl cursor-pointer" onClick={()=>setScreen('waitlist')}>
                      <div className="flex flex-col sm:flex-row items-center gap-12 relative z-10 text-center sm:text-left">
                        <div className="size-28 rounded-full bg-rose-500/10 border-4 border-rose-500/30 flex items-center justify-center shadow-3xl group-hover:scale-110 transition-transform duration-700">
                          <Icons.Support className="size-14 text-rose-400 animate-pulse" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-4xl font-black tracking-tighter text-white italic uppercase leading-none text-glow">Ошибка оплаты?</h4>
                          <p className="text-xl text-white/30 uppercase mt-6 tracking-[0.4em] font-black leading-none data-font">Manual Gate Authorization Required</p>
                        </div>
                      </div>
                      <div className="mt-16 w-full py-10 bg-white/5 hover:bg-white/10 border-2 border-white/15 rounded-[3.5rem] text-[15px] font-black uppercase tracking-[0.8em] transition-all text-white/40 hover:text-white shadow-4xl relative z-10 text-center">
                          JOIN_WAITLIST_PROTOCOL_001
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>
                  </div>
              </div>
              <div className="h-60" />
           </div>
        )}

        {/* SCREEN 6: NEURAL CHAT INTERFACE (THE FULL EXPERIENCE) */}
        {screen === 'chat' && (
          <div className="h-full flex flex-col relative animate-in fade-in duration-700">
              <header className="px-10 py-8 border-b-2 border-white/10 flex justify-between items-center bg-[#020618]/98 backdrop-blur-[80px] z-[40] shadow-[0_30px_100px_rgba(0,0,0,1)] relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-cyan-glow/5 opacity-50" />
                 <div className="flex items-center gap-8 relative z-10">
                    <div className="relative">
                       <div className="size-5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_35px_#10b981] border-2 border-white/50" />
                       <div className="absolute inset-0 size-5 bg-emerald-500 rounded-full blur-xl animate-ping opacity-30" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[12px] font-black uppercase text-white/30 data-font tracking-[0.6em] leading-none mb-3">Quantum Neural Link: [STABLE]</span>
                        <div className="flex items-center gap-4">
                           <Icons.Bolt className="size-4 text-emerald-400" />
                           <span className="text-4xl font-black data-font leading-none tracking-tighter uppercase italic text-neon drop-shadow-2xl">TIME: 29:59</span>
                        </div>
                    </div>
                 </div>
                 <button onClick={()=>{ if(confirm("ВНИМАНИЕ: Прервать квантовую синхронизацию? Прогресс будет удален.")) setScreen('hub'); }} className="px-12 py-4 glass-panel rounded-full text-[13px] font-black uppercase tracking-[0.6em] text-white/40 hover:text-rose-500 hover:border-rose-500/50 transition-all active:scale-[0.85] border-white/20 shadow-4xl backdrop-blur-xl group">
                    <span className="relative z-10">ABORT_SYNC</span>
                    <div className="absolute inset-0 bg-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </button>
              </header>

              <div className="flex-1 overflow-y-auto p-12 space-y-16 no-scrollbar pb-[400px] text-left scanline relative z-10 chat-scroll">
                  <div className="flex flex-col items-center py-10 opacity-30 animate-pulse">
                     <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent mb-10 shadow-3xl" />
                     <span className="text-[13px] font-black uppercase tracking-[1.5em] data-font text-white text-center">SESSION_LAYER_PROTOCOL_ACTIVE_v25</span>
                     <div className="flex gap-4 mt-8">
                        {[1,2,3,4].map(i=><div key={i} className="size-1.5 bg-white/40 rounded-full" />)}
                     </div>
                  </div>

                  {messages.map((m, i) => (
                      <div key={i} className={`flex flex-col ${m.role==='user'?'items-end ml-24':'items-start mr-24'} animate-in slide-in-from-bottom duration-1000 relative group`}>
                          {m.role === 'hint' ? (
                              <div className="glass-panel p-16 rounded-[5rem] border-l-[20px] border-amber-500 max-w-[95%] shadow-[0_80px_150px_rgba(0,0,0,1)] my-12 relative overflow-hidden animate-in zoom-in duration-700">
                                  <div className="absolute top-0 right-0 p-12 text-[15rem] opacity-5 font-black italic data-font pointer-events-none select-none uppercase leading-none">HINT</div>
                                  <div className="flex items-center gap-8 mb-10 relative z-10">
                                      <div className="size-20 bg-amber-500/20 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-inner border-2 border-amber-500/30 group-hover:scale-110 transition-transform duration-700">💡</div>
                                      <div className="flex flex-col">
                                         <h5 className="text-[18px] font-black text-amber-500 uppercase tracking-[0.6em] leading-none text-glow">Supervisor Insight</h5>
                                         <span className="text-[11px] text-white/30 uppercase mt-4 font-black data-font tracking-[0.5em] italic">Methodological Guidance Node</span>
                                      </div>
                                  </div>
                                  <p className="text-[22px] text-amber-50/90 font-medium italic leading-relaxed border-t-2 border-white/5 pt-12 shadow-inner relative z-10 selection:bg-amber-500/40">"{m.content}"</p>
                                  <div className="absolute bottom-4 right-10 opacity-20"><Icons.Infinity className="size-8 text-amber-500" /></div>
                              </div>
                          ) : (
                              <div className={`p-10 rounded-[4rem] text-[20px] leading-relaxed font-medium shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-all relative overflow-hidden group hover:scale-[1.01] duration-700 ${m.role==='user'?'user-bubble text-white rounded-br-none shadow-primary/40 border-t border-white/20':'ai-bubble text-white/95 rounded-bl-none shadow-black/90 border-t border-white/5'}`}>
                                  {m.role === 'ai' && <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />}
                                  <div className="relative z-10 drop-shadow-xl" dangerouslySetInnerHTML={{__html: marked.parse(m.content||"")}} />
                                  <div className="absolute bottom-2 right-6 opacity-0 group-hover:opacity-10 transition-opacity"><Icons.AllInclusive className="size-5" /></div>
                              </div>
                          )}
                          {m.voice && <div className="mt-6 flex items-center gap-5 opacity-40 px-10 group-hover:opacity-100 transition-opacity">
                              <div className="flex gap-2 items-center">
                                 <div className="size-2 bg-cyan-glow rounded-full animate-bounce shadow-[0_0_15px_#00D2FF]" />
                                 <div className="size-2 bg-cyan-glow rounded-full animate-bounce [animation-delay:200ms] shadow-[0_0_15px_#00D2FF]" />
                                 <div className="size-2 bg-cyan-glow rounded-full animate-bounce [animation-delay:400ms] shadow-[0_0_15px_#00D2FF]" />
                              </div>
                              <span className="text-[11px] font-black uppercase tracking-[0.6em] data-font text-cyan-glow animate-pulse">Audio Neural Stream: v2.5 Synchronized</span>
                          </div>}
                      </div>
                  ))}
                  {isTyping && <div className="flex gap-6 p-12 glass-panel rounded-full w-fit animate-pulse border-white/10 ml-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5" />
                      <div className="size-5 bg-primary rounded-full typing-dot shadow-[0_0_20px_var(--primary)]" />
                      <div className="size-5 bg-cyan-glow rounded-full typing-dot [animation-delay:200ms] shadow-[0_0_20px_#00D2FF]" />
                      <div className="size-5 bg-primary rounded-full typing-dot [animation-delay:400ms] shadow-[0_0_20px_var(--primary)]" />
                  </div>}
                  <div ref={chatEndRef} className="h-40" />
              </div>
              
              {/* CHAT FOOTER (QUANTUM UI MASTER) */}
              <footer className="absolute bottom-0 w-full p-12 bg-slate-950/99 backdrop-blur-[100px] border-t-2 border-white/10 z-[50] shadow-[0_-60px_150px_rgba(0,0,0,1)]">
                  <div className="flex gap-8 mb-14 max-w-4xl mx-auto">
                      {role === 'psychologist' && <button onClick={()=>handleSend("Дай совет по методике", false, 'get_hint')} className="glass-panel premium-shine flex-1 py-10 rounded-[3rem] text-[15px] font-black uppercase text-amber-500 flex items-center justify-center gap-6 active:scale-[0.94] transition-all shadow-4xl border-amber-500/40 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Icons.Sparkles className="size-10 group-hover:rotate-12 transition-transform shadow-amber-500/50 relative z-10"/> 
                        <span className="relative z-10 tracking-[0.6em]">ПОДСКАЗКА</span>
                      </button>}
                      <button onClick={handleFinish} className="glass-panel premium-shine flex-1 py-10 rounded-[3rem] text-[15px] font-black uppercase text-cyan-glow flex items-center justify-center gap-6 active:scale-[0.94] transition-all shadow-4xl border-cyan-glow/40 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-glow/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Icons.Check className="size-10 group-hover:scale-110 transition-transform shadow-cyan-glow/50 relative z-10"/> 
                        <span className="relative z-10 tracking-[0.6em]">ФИНИШ</span>
                      </button>
                  </div>
                  <div className="flex items-center gap-10 bg-white/5 border-2 border-white/20 rounded-[6rem] p-4 pr-10 focus-within:ring-8 ring-primary/30 transition-all shadow-[inset_0_15px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group max-w-4xl mx-auto">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                      <div className="flex items-center gap-4 ml-8 opacity-20 group-focus-within:opacity-100 transition-opacity duration-1000">
                         <Icons.Radio className="size-12 text-white/50 animate-pulse cursor-pointer hover:text-cyan-glow transition-colors" />
                         <div className="h-10 w-[2px] bg-white/10" />
                      </div>
                      <textarea value={inputText} onChange={e=>setInputText(e.target.value)} rows={1} className="flex-1 bg-transparent border-none outline-none text-[24px] px-10 py-8 text-white placeholder:text-white/10 resize-none font-bold no-scrollbar relative z-10 selection:bg-primary/40" placeholder="Ввод нейро-интервенции..." onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}} />
                      <button onClick={()=>handleSend()} className="size-24 bg-primary rounded-[3.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(104,31,239,0.7)] active:scale-[0.8] transition-all transform relative z-10 hover:scale-110 shadow-primary/60 group/send">
                         <Icons.Send className="size-12 text-white transform group-hover/send:rotate-12 transition-transform duration-500" />
                      </button>
                  </div>
                  <div className="mt-8 flex justify-center opacity-20"><span className="text-[9px] font-black uppercase tracking-[1em] data-font">Secure Input Encryption Node_v25 [ENABLED]</span></div>
              </footer>
          </div>
        )}

        {/* SCREEN: REPORT (THE FINAL KNOWLEDGE SYNTHESIS) */}
        {screen === 'report' && sessionAnalytics && (
          <div className="p-12 space-y-16 animate-in zoom-in duration-1000 text-center pb-60">
              <div className="relative inline-block mb-12">
                <div className="absolute inset-0 bg-primary/30 blur-[150px] animate-pulse" />
                <Icons.Infinity className="w-80 h-40 mx-auto drop-shadow-[0_0_80px_rgba(104,31,239,1)] relative z-10 transform hover:scale-110 transition-transform duration-1000" />
              </div>
              <h2 className="text-8xl font-black uppercase tracking-tighter italic text-neon text-glow leading-none drop-shadow-[0_40px_80px_rgba(0,0,0,1)] uppercase">ИТОГ<br/>СИНТЕЗА</h2>
              
              <div className="glass-panel p-16 rounded-[6rem] border-primary/50 relative overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.9)] text-left border-t-2 border-white/10 backdrop-blur-[60px]">
                  <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary via-white to-primary shadow-[0_0_50px_var(--primary)]" />
                  <div className="flex justify-between items-center mb-16 relative z-10">
                     <p className="text-[14px] font-black text-primary uppercase tracking-[0.8em] data-font">Quantum Analytic Protocol v25.0</p>
                     <div className="px-6 py-2 glass-panel rounded-full border-white/10 shadow-2xl"><span className="text-[12px] text-white/40 font-black data-font uppercase tracking-widest leading-none">NODE_ID: {userId.slice(-12)}</span></div>
                  </div>
                  
                  {role === 'psychologist' ? (
                      <div className="space-y-16">
                        <div className="bg-slate-950/40 p-12 rounded-[5rem] border-2 border-white/5 shadow-inner">
                           <RadarChart data={sessionAnalytics} />
                        </div>
                        <div className="space-y-10">
                            <div className="glass-panel p-14 rounded-[4rem] border border-white/10 shadow-4xl relative overflow-hidden group hover:border-primary/40 transition-colors duration-1000">
                                <div className="absolute -right-16 -bottom-10 text-[15rem] opacity-5 font-black data-font italic pointer-events-none select-none uppercase tracking-tighter group-hover:scale-110 transition-transform duration-[3000ms]">AUDIT</div>
                                <div className="flex items-center gap-6 mb-8 relative z-10">
                                   <div className="size-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--primary)]" />
                                   <span className="text-[14px] font-black text-white/40 uppercase block data-font tracking-[0.8em]">Синтез Супервизора</span>
                                </div>
                                <p className="text-2xl italic leading-relaxed text-slate-100 font-medium relative z-10 drop-shadow-2xl selection:bg-primary/40">"{sessionAnalytics.expert_comment}"</p>
                                <div className="mt-10 flex gap-6 opacity-20 relative z-10">
                                   <div className="h-px flex-1 bg-white" />
                                   <Icons.AllInclusive className="size-5" />
                                   <div className="h-px flex-1 bg-white" />
                                </div>
                            </div>
                            <button className="premium-shine w-full py-12 bg-primary/20 border-2 border-primary/40 rounded-[3.5rem] text-[18px] font-black uppercase tracking-[0.8em] text-white shadow-[0_40px_80px_rgba(104,31,239,0.6)] flex items-center justify-center gap-8 hover:scale-[1.03] active:scale-95 transition-all transform border-t-2 border-white/20">
                                СКАЧАТЬ ЗОЛОТОЙ СЕРТИФИКАТ <Icons.Bolt className="size-10 text-gold animate-bounce filter drop-shadow-[0_0_10px_#ffd700]"/>
                            </button>
                        </div>
                      </div>
                  ) : (
                      <div className="space-y-12">
                          <div className="glass-panel p-16 rounded-[5rem] border-l-[24px] border-primary shadow-[0_80px_160px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-primary/60 transition-all duration-1000 border-t border-white/10">
                              <div className="absolute top-0 right-0 p-14 text-[20rem] opacity-5 font-black italic data-font pointer-events-none select-none uppercase leading-none transform -rotate-12 group-hover:rotate-0 transition-transform duration-[3000ms]">CORE</div>
                              <div className="flex items-center gap-5 mb-10 relative z-10">
                                 <Icons.Sparkles className="size-8 text-primary animate-pulse" />
                                 <h5 className="text-[18px] font-black uppercase text-primary mb-0 tracking-[0.8em] leading-none text-glow italic">Главный инсайт</h5>
                              </div>
                              <p className="text-4xl font-bold text-white leading-tight italic relative z-10 drop-shadow-2xl selection:bg-primary/40 uppercase tracking-tighter">"{sessionAnalytics.insight}"</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                              <div className="glass-panel p-12 rounded-[4rem] border border-white/10 shadow-3xl transform hover:-translate-y-2 transition-all duration-700 bg-white/5 border-t-2 border-white/20">
                                  <h5 className="text-[13px] font-black uppercase text-white/30 mb-8 tracking-[0.5em] leading-none text-center">Телесный фокус</h5>
                                  <p className="text-xl font-black text-white leading-snug text-center uppercase tracking-tight italic drop-shadow-lg">{sessionAnalytics.body_focus}</p>
                              </div>
                              <div className="glass-panel p-12 rounded-[4rem] border border-white/10 shadow-3xl transform hover:-translate-y-2 transition-all duration-700 bg-white/5 border-t-2 border-white/20">
                                  <h5 className="text-[13px] font-black uppercase text-white/30 mb-8 tracking-[0.5em] leading-none text-center">Первый шаг</h5>
                                  <p className="text-xl font-black text-white leading-snug text-center uppercase tracking-tight italic drop-shadow-lg">{sessionAnalytics.action_step}</p>
                              </div>
                          </div>
                          <div className="pt-10 border-t-2 border-white/5 opacity-50 text-center">
                             <p className="text-2xl text-white/50 italic px-20 leading-relaxed font-black tracking-tight uppercase">"{sessionAnalytics.support_message}"</p>
                          </div>
                      </div>
                  )}
                  
                  <button onClick={()=>setScreen('hub')} className="w-full mt-16 py-10 bg-primary rounded-[4rem] text-[18px] font-black uppercase tracking-[1em] shadow-[0_50px_100px_rgba(104,31,239,0.7)] active:scale-[0.95] transition-all transform hover:-translate-y-3 border-t-2 border-white/40 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative z-10 drop-shadow-2xl">ВЕРНУТЬСЯ В КОМАНДНЫЙ ЦЕНТР</span>
                  </button>
              </div>
          </div>
        )}

        {/* SCREEN: AGGREGATOR (ELITE MARKETPLACE - THE ULTIMATE LIST) */}
        {screen === 'aggregator' && (
           <div className="p-10 space-y-24 animate-in slide-in-from-bottom pb-60 text-left">
              <div className="flex flex-col sm:flex-row justify-between items-end px-4 mt-12 gap-10">
                  <div className="flex flex-col">
                    <h2 className="text-8xl font-black uppercase tracking-tighter italic text-neon text-glow leading-none uppercase drop-shadow-2xl">ВИТРИНА</h2>
                    <span className="text-[16px] font-black text-primary uppercase tracking-[1.5em] mt-10 ml-4 data-font leading-none italic">Market Hierarchy v2.0</span>
                  </div>
                  <div className="flex flex-col items-end gap-5 opacity-40 group">
                    <div className="flex items-center gap-3">
                       <span className="size-2 bg-emerald-500 rounded-full animate-ping" />
                       <span className="text-[12px] font-black data-font uppercase tracking-widest">Active mastery units: 1,402</span>
                    </div>
                    <div className="h-1 w-40 bg-gradient-to-r from-transparent to-white rounded-full opacity-20" />
                  </div>
              </div>

              {/* ТОП-1 МАСТЕР (THE GOLDEN PODIUM UNIT) */}
              <div className="flex flex-col gap-16 mb-20 px-2">
                 <div className="glass-panel p-16 rounded-[7rem] border-t-8 border-gold/70 relative overflow-hidden group premium-shine shadow-[0_120px_250px_rgba(0,0,0,1)] border-white/10 scale-105 z-30 transition-all duration-1000 transform hover:scale-[1.07]">
                    <div className="absolute inset-0 bg-gold/10 opacity-30 group-hover:opacity-50 transition-opacity" />
                    <div className="absolute -top-10 -right-10 p-16 opacity-30 group-hover:scale-125 transition-transform duration-[2000ms] transform -rotate-12 group-hover:rotate-0"><Icons.Trophy className="size-56 text-gold filter drop-shadow-[0_0_60px_#ffa805]" /></div>
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-20 relative z-20">
                        <div className="relative group/avatar-pro">
                            <div className="absolute inset-0 bg-gold/20 rounded-full blur-[100px] animate-pulse" />
                            <div className="size-60 rounded-full border-[16px] border-gold p-3 shadow-[0_0_100px_rgba(255,168,5,0.7)] bg-[#0c0c1e] group-hover/avatar-pro:rotate-12 transition-transform duration-[3000ms] ring-[12px] ring-white/5 relative z-10 overflow-hidden">
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[10rem] shadow-[inset_0_20px_60px_rgba(0,0,0,0.9)] border-4 border-white/10 overflow-hidden relative">
                                    👨🏼‍⚕️
                                    <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 via-transparent to-transparent opacity-60" />
                                </div>
                            </div>
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gold text-background-dark text-[18px] font-black px-12 py-3 rounded-full shadow-[0_40px_80px_rgba(255,168,5,0.6)] tracking-[0.8em] z-20 animate-pulse italic border-4 border-background-dark">RANK_01</div>
                        </div>
                        <div className="flex-1 text-center lg:text-left mt-8 lg:mt-0 pt-4">
                            <div className="flex items-center justify-center lg:justify-start gap-5 mb-8 opacity-60">
                               <Icons.Bolt className="size-5 text-gold" />
                               <span className="text-[12px] font-black uppercase tracking-[1em] data-font text-gold">Elite Platinum Master</span>
                            </div>
                            <h2 className="text-7xl font-black uppercase tracking-tighter text-white italic text-glow leading-none drop-shadow-2xl">Мастер Юлиан</h2>
                            <p className="text-[15px] font-black tracking-[1em] text-primary uppercase mt-10 data-font opacity-90 leading-none">ID: CNCT-ULTRA-PREMIUM-001</p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-16 mt-14">
                                <div className="flex flex-col gap-4 text-center lg:text-left"><p className="text-[13px] text-white/30 uppercase tracking-[0.6em] font-black leading-none">Transformed Lives</p><p className="text-6xl font-black data-font italic tracking-tighter leading-none shadow-white">1,204</p></div>
                                <div className="w-px h-20 bg-white/10 hidden lg:block" />
                                <div className="flex flex-col gap-4 text-center lg:text-left"><p className="text-[13px] text-white/30 uppercase tracking-[0.6em] font-black leading-none">Mastery IQ Score</p><p className="text-6xl font-black text-gold data-font italic tracking-tighter leading-none filter drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]">9.99</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 pt-16 border-t-2 border-white/10 flex flex-col sm:flex-row items-center justify-between relative z-20 gap-12 bg-black/40 p-10 rounded-[4rem] shadow-inner">
                       <div className="flex flex-col gap-4 text-center sm:text-left">
                          <span className="text-[15px] font-black text-white/40 uppercase tracking-[0.5em] italic">Platinum Session Rate</span>
                          <div className="flex items-end justify-center sm:justify-start gap-3">
                             <span className="text-6xl font-black data-font text-white drop-shadow-2xl tabular-nums">4500₽</span>
                             <span className="text-xl text-white/20 font-black data-font italic mb-1">/ 50 MIN</span>
                          </div>
                       </div>
                       <button onClick={()=>triggerHaptic('heavy')} className="bg-gold text-background-dark px-24 py-10 rounded-[4rem] font-black text-[18px] uppercase tracking-[1em] shadow-[0_40px_100px_rgba(255,168,5,0.7)] hover:bg-white transition-all transform hover:scale-[1.08] active:scale-90 leading-none border-t-4 border-white/50 group/btn-podium relative overflow-hidden">
                           <span className="relative z-10 drop-shadow-xl">РЕЗЕРВИРОВАТЬ</span>
                           <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn-podium:translate-x-full transition-transform duration-1000" />
                       </button>
                    </div>
                 </div>
              </div>

              {/* ОБЩИЙ СПИСОК (THE PRO ARCHIVE) */}
              <div className="space-y-20 px-2 pb-20">
                  {psychologists.length === 0 ? (
                      <div className="text-center py-60 opacity-10 italic uppercase tracking-[1.5em] text-[15px] animate-pulse font-black data-font leading-none">SCANNING_FOR_ACTIVE_COGNITIVE_NODES...</div>
                  ) : psychologists.map((p, idx) => (
                      <div key={idx} className={`glass-panel p-16 rounded-[7rem] relative overflow-hidden group premium-shine shadow-[0_80px_160px_rgba(0,0,0,0.8)] border-t-2 border-white/10 transition-all duration-1000 transform hover:translate-y-[-10px] ${p.isVip ? 'border-primary ring-4 ring-primary/10 scale-[1.02] shadow-primary/20' : 'border-white/5 opacity-90 hover:opacity-100'}`}>
                          {p.isVip && <div className="absolute top-0 right-0 bg-primary text-background-dark text-[14px] font-black px-16 py-6 rounded-bl-[4rem] uppercase tracking-[0.8em] shadow-4xl z-30 animate-pulse border-b border-l border-white/20">VIP ELITE UNIT</div>}
                          
                          <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start mb-16 relative z-10">
                              <div className="size-56 rounded-[5rem] bg-[#0c0c1e] flex items-center justify-center text-9xl overflow-hidden shadow-[inset_0_20px_50px_rgba(0,0,0,1)] border-4 border-white/10 group-hover:scale-105 transition-transform duration-[2000ms] transform group-hover:rotate-3 shadow-2xl">
                                  {p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" /> : '👨🏻'}
                              </div>
                              <div className="flex-1 pt-6 text-center lg:text-left">
                                  <div className="flex items-center justify-center lg:justify-start gap-5 mb-6 opacity-50">
                                     <div className="size-3 bg-primary rounded-full shadow-[0_0_15px_var(--primary)]" />
                                     <span className="text-[13px] font-black uppercase tracking-[1em] data-font">Certified Neural Master</span>
                                  </div>
                                  <h4 className="text-6xl font-black uppercase tracking-tighter italic leading-none text-glow drop-shadow-2xl group-hover:text-neon transition-colors duration-1000">{p.name || 'Мастер Коннектум'}</h4>
                                  <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
                                      <div className="bg-white/5 px-10 py-4 rounded-full border border-white/10 shadow-3xl hover:bg-white/10 transition-all">
                                         <span className="text-[14px] font-black uppercase text-white/50 tracking-[0.4em]">СТАЖ: {p.experience || 0} ЛЕТ</span>
                                      </div>
                                      <div className="bg-primary/10 px-10 py-4 rounded-full border border-primary/30 shadow-3xl hover:bg-primary/20 transition-all">
                                         <span className="text-[14px] font-black uppercase text-primary tracking-[0.4em]">SKILL_IQ: {p.skillRating || 70}%</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
                          {/* SKILL RADAR MINI SECTION */}
                          <div className="py-16 border-y-2 border-white/5 bg-[#080816] rounded-[6rem] my-10 backdrop-blur-[100px] relative overflow-hidden group-hover:shadow-[inset_0_0_100px_rgba(104,31,239,0.15)] transition-all duration-[2000ms]">
                             <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
                             <RadarChart data={p.analysis} />
                             <div className="mt-12 flex justify-center gap-16 text-[10px] font-black text-white/15 uppercase tracking-[1em] data-font">
                                <span className="hover:text-primary transition-colors">Core_Accuracy</span>
                                <span className="hover:text-cyan-glow transition-colors">Empathy_Flux</span>
                                <span className="hover:text-primary transition-colors">Boundary_Lock</span>
                             </div>
                          </div>
                          
                          <div className="mt-16 flex flex-col lg:flex-row justify-between items-center px-10 gap-12 relative z-10">
                              <div className="flex flex-col text-center lg:text-left gap-4">
                                  <span className="text-[16px] font-black text-white/30 uppercase tracking-[1em] data-font leading-none italic">Standard Rate</span>
                                  <div className="flex items-end justify-center lg:justify-start gap-4 mt-2">
                                     <p className="text-6xl font-black text-white italic leading-none data-font tabular-nums tracking-tighter drop-shadow-2xl shadow-white">{p.price || 0}₽</p>
                                     <span className="text-[15px] font-black text-white/20 uppercase mb-2 data-font italic tracking-widest">/ SESSION</span>
                                  </div>
                              </div>
                              <button onClick={()=>triggerHaptic('heavy')} className="premium-shine bg-primary px-24 py-10 rounded-[4rem] text-[18px] font-black uppercase tracking-[1.5em] shadow-[0_60px_120px_rgba(104,31,239,0.6)] active:scale-[0.92] transition-all transform hover:scale-[1.05] border-t-4 border-white/30 w-full lg:w-auto relative overflow-hidden group/btn-book">
                                  <span className="relative z-10">ЗАПИСАТЬСЯ</span>
                                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn-book:opacity-100 transition-opacity" />
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn-book:translate-x-full transition-transform duration-1000" />
                              </button>
                          </div>
                          <div className="absolute -left-20 -bottom-20 text-[25rem] font-black text-white/5 select-none pointer-events-none data-font italic uppercase leading-none tracking-tighter opacity-20">MASTER</div>
                      </div>
                  ))}
              </div>
           </div>
        )}

        {/* SCREEN 7: COGNITIVE SYNC (MASTER PROFILE & QUESTS) - THE DEEPEST MODULE */}
        {screen === 'profile' && (
           <div className="p-12 space-y-24 animate-in slide-in-from-bottom pb-64 text-left">
              <div className="flex flex-col sm:flex-row justify-between items-end px-4 mt-10 gap-10">
                  <div className="flex flex-col">
                    <h2 className="text-8xl font-black uppercase tracking-tighter italic leading-none text-neon text-glow uppercase drop-shadow-2xl">PROFILE</h2>
                    <div className="mt-8 flex items-center gap-5 bg-primary/10 px-8 py-3 rounded-full border-2 border-primary/40 shadow-[0_0_40px_rgba(104,31,239,0.3)]">
                       <div className="size-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_#681fef] border-2 border-white/40" />
                       <span className="text-[12px] font-black uppercase text-primary tracking-[1em] data-font ml-2 leading-none">Sync_Status: [ONLINE]</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center sm:items-end gap-3 opacity-30">
                    <span className="text-[11px] text-white font-black data-font uppercase tracking-widest leading-none">Terminal_Node_ID</span>
                    <span className="text-[14px] text-white font-bold data-font leading-none tracking-tighter select-all italic">{userId}</span>
                  </div>
              </div>

              {/* AVATAR UPLOAD (ULTRA PREMIUM STITCH STYLE) */}
              <div className="flex flex-col items-center relative">
                 <div className="absolute -top-16 text-[25rem] font-black text-white/5 select-none pointer-events-none data-font italic uppercase leading-none tracking-tighter opacity-10">MATRIX</div>
                 <div className="relative group cursor-pointer mt-10" onClick={()=>document.getElementById('photo-final-v25').click()}>
                    <div className="absolute inset-0 bg-primary blur-[150px] opacity-30 group-hover:opacity-70 transition-opacity rounded-full animate-pulse" />
                    <div className="relative size-80 rounded-[8rem] border-[16px] border-primary p-4 bg-background-dark shadow-[0_0_150px_rgba(104,31,239,0.8)] ring-[16px] ring-white/5 transform group-hover:rotate-6 transition-all duration-[2000ms] group-hover:scale-105 active:scale-95">
                       <div className="w-full h-full rounded-[6.5rem] bg-[#0c0c1e] flex items-center justify-center text-[12rem] overflow-hidden relative shadow-[inset_0_30px_100px_rgba(0,0,0,1)] border-8 border-white/15 group-hover:border-white/30 transition-colors">
                          {userProfile.photoUrl ? <img src={userProfile.photoUrl} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2000ms]" /> : '👨🏻'}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-8 backdrop-blur-xl group-hover:scale-110 transition-transform duration-1000">
                             <div className="size-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-primary shadow-2xl animate-bounce">
                                <Icons.Camera className="size-12 text-white" />
                             </div>
                             <span className="text-[16px] font-black uppercase tracking-[1em] text-white drop-shadow-2xl">Modify_DNA</span>
                          </div>
                       </div>
                       <div className="absolute -bottom-4 right-4 size-16 bg-gold rounded-[2rem] flex items-center justify-center shadow-4xl border-4 border-background-dark animate-bounce">
                          <Icons.Bolt className="size-8 text-background-dark" />
                       </div>
                    </div>
                    <input id="photo-final-v25" type="file" className="hidden" accept="image/*" onChange={(e)=>{
                        const file = e.target.files[0];
                        if(file){
                          const reader = new FileReader();
                          reader.onloadend = () => {
                             setUserProfile({...userProfile, photoUrl: reader.result});
                             triggerHaptic('heavy');
                          };
                          reader.readAsDataURL(file);
                        }
                    }} />
                 </div>
                 <h3 className="mt-20 text-6xl font-black uppercase italic tracking-tighter text-glow text-center leading-none drop-shadow-2xl selection:bg-primary/40">{userProfile.name || 'МАСТЕР_ОПЕРАТОР'}</h3>
                 <div className="mt-8 glass-panel px-12 py-3 rounded-full border-primary/40 flex items-center gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    <span className="text-[12px] font-black text-primary uppercase tracking-[1.5em] ml-4 leading-none">Cyber_Verified Specialist</span>
                    <div className="size-3 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399]" />
                 </div>
              </div>

              {/* VIDEO INTRO MODULE (PREMIUM) */}
              <div className="px-4 pt-10">
                 <div className="flex items-center justify-between mb-12 border-b-2 border-white/5 pb-8">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-4xl font-black uppercase italic leading-none text-glow">Видеопсихография</h4>
                        <span className="text-[12px] text-white/30 uppercase tracking-[0.5em] font-black data-font">Identity Dynamic Pitch Module 1.0</span>
                    </div>
                    <div className="p-5 glass-panel rounded-3xl shadow-xl"><Icons.Support className="size-8 text-primary/40" /></div>
                 </div>
                 <VideoRecorder onUpload={(url)=>{
                    setUserProfile({...userProfile, videoUrl: url});
                    triggerHaptic('heavy');
                 }} />
              </div>

              {/* EDITABLE FORM (TOTAL CONTROL) */}
              <div className="space-y-16 pt-20 border-t-2 border-white/10 px-4 relative overflow-hidden">
                 <div className="absolute -left-20 top-0 text-[18rem] font-black text-white/5 select-none pointer-events-none data-font italic uppercase leading-none tracking-tighter opacity-10">DATA</div>
                 
                 <div className="space-y-6 relative z-10">
                    <label className="text-[15px] font-black text-white/30 uppercase tracking-[1em] ml-14 leading-none block italic shadow-inner">Public_Identity_Label</label>
                    <div className="relative group">
                       <input type="text" value={userProfile.name} onChange={e=>setUserProfile({...userProfile, name: e.target.value})} className="w-full p-12 glass-panel rounded-[5rem] outline-none focus:border-primary transition-all duration-700 text-3xl font-black shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-glow placeholder:text-white/5 border-white/15 focus:scale-[1.02] pr-40" placeholder="Системное имя..." />
                       <div className="absolute right-14 top-1/2 -translate-y-1/2 text-white/10 text-6xl data-font italic font-black uppercase pointer-events-none select-none tracking-tighter">NAME</div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-2 relative z-10">
                    <div className="space-y-6">
                        <label className="text-[15px] font-black text-white/30 uppercase tracking-[1em] ml-14 leading-none block italic">Experience_Link</label>
                        <div className="relative group">
                           <input type="number" value={userProfile.experience} onChange={e=>setUserProfile({...userProfile, experience: Number(e.target.value)})} className="w-full p-12 glass-panel rounded-[5rem] outline-none text-4xl font-black data-font shadow-[0_30px_80px_rgba(0,0,0,0.7)] focus:border-primary transition-all text-center tabular-nums border-white/15 focus:scale-[1.05]" />
                           <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10 text-4xl data-font italic font-black uppercase pointer-events-none select-none tracking-tighter">EXP</div>
                           <div className="absolute right-10 top-1/2 -translate-y-1/2 text-white/20 text-xl font-black data-font uppercase pointer-events-none select-none">YRS</div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <label className="text-[15px] font-black text-white/30 uppercase tracking-[1em] ml-14 leading-none block italic">Currency_Rate</label>
                        <div className="relative group">
                           <input type="number" value={userProfile.price} onChange={e=>setUserProfile({...userProfile, price: Number(e.target.value)})} className="w-full p-12 glass-panel rounded-[5rem] outline-none text-4xl font-black data-font shadow-[0_30px_80px_rgba(0,0,0,0.7)] focus:border-primary transition-all text-center tabular-nums border-white/15 focus:scale-[1.05]" />
                           <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10 text-4xl data-font italic font-black uppercase pointer-events-none select-none tracking-tighter">RUB</div>
                           <div className="absolute right-10 top-1/2 -translate-y-1/2 text-white/20 text-xl font-black data-font uppercase pointer-events-none select-none">/ 50m</div>
                        </div>
                    </div>
                 </div>
              </div>

              {/* QUEST HUB (THE ULTIMATE GAMIFICATION ENGINE) */}
              <div className="glass-panel p-20 rounded-[8rem] border-emerald-500/50 relative overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,1)] mt-16 group/quest">
                 <div className="absolute -right-24 -top-16 text-[25rem] font-black text-white/5 select-none pointer-events-none data-font italic uppercase leading-none tracking-tighter group-hover/quest:scale-105 transition-transform duration-[3000ms]">QUEST</div>
                 <div className="flex flex-col sm:flex-row items-center justify-between mb-20 gap-10">
                    <div className="flex flex-col text-center sm:text-left">
                        <h4 className="text-6xl font-black uppercase tracking-tighter italic leading-none text-glow uppercase">ХАБ КВЕСТОВ</h4>
                        <p className="text-[15px] text-emerald-400 data-font uppercase mt-6 font-black tracking-[1em] leading-relaxed">Neural Growth System level_2.5.4</p>
                    </div>
                    <div className="p-12 glass-panel rounded-[4rem] shadow-[0_0_80px_rgba(52,211,153,0.4)] bg-emerald-500/10 border-emerald-500/30 ring-4 ring-white/5 animate-pulse">
                        <Icons.Bolt className="size-20 text-emerald-400 drop-shadow-[0_0_20px_#34d399]" />
                    </div>
                 </div>

                 <div className="space-y-10">
                    {[
                        {title: "Фото Профиля", reward: "+1 💎", icon: "📸", active: !!userProfile.photoUrl, desc: "Биометрическая верификация личности в системе", code: "DNA_SCAN"},
                        {title: "Видео-Визитка", reward: "+3 💎", icon: "🎥", active: !!userProfile.videoUrl, desc: "60-секундный квантовый питч компетенций", code: "MOTION_SYNC"},
                        {title: "Пригласи Коллегу", reward: "+3 💎", icon: "🤝", active: false, desc: "Масштабирование нейронной сети Коннектум", code: "LINK_EXPANSION"}
                    ].map((q, i) => (
                        <div key={i} className={`flex flex-col sm:flex-row items-center justify-between p-14 rounded-[4.5rem] border-2 transition-all duration-1000 relative overflow-hidden group/quest-item shadow-4xl ${q.active ? 'bg-emerald-500/10 border-emerald-500/50 scale-100' : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100 hover:border-white/30 hover:scale-[1.02]'} gap-10 sm:gap-4`}>
                           {q.active && <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />}
                           <div className="flex flex-col sm:flex-row items-center gap-12 relative z-10 text-center sm:text-left">
                                <div className="size-32 bg-slate-900/60 rounded-[2.5rem] border-2 border-white/10 flex items-center justify-center shadow-2xl transition-all duration-1000 group-hover/quest-item:rotate-6">
                                   <span className="text-[6rem] drop-shadow-[0_20px_40px_rgba(0,0,0,1)] grayscale group-hover/quest-item:grayscale-0 transition-all duration-1000">{q.icon}</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-center sm:justify-start gap-4 mb-4 opacity-40">
                                       <div className="size-2 bg-white rounded-full" />
                                       <span className="text-[10px] font-black uppercase tracking-[0.5em] data-font">{q.code}</span>
                                    </div>
                                    <span className="text-4xl font-black uppercase tracking-tighter leading-none text-white italic group-hover/quest-item:text-emerald-400 transition-colors duration-700">{q.title}</span>
                                    <span className="text-md text-white/30 uppercase mt-5 font-black tracking-widest leading-relaxed max-w-[350px]">{q.desc}</span>
                                    {q.active && (
                                       <div className="mt-8 flex items-center justify-center sm:justify-start gap-4 animate-in fade-in duration-1000">
                                          <div className="bg-emerald-500/20 px-6 py-2 rounded-full border border-emerald-500/50 shadow-xl">
                                             <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.8em] leading-none flex items-center gap-3 ml-2">COMPLETED <Icons.Check className="size-4" /></span>
                                          </div>
                                       </div>
                                    )}
                                </div>
                           </div>
                           <div className="flex flex-col items-center sm:items-end gap-6 relative z-10">
                             <div className="bg-primary/20 px-12 py-4 rounded-[1.8rem] border-2 border-primary/40 shadow-inner group-hover/quest-item:scale-110 transition-transform duration-700">
                                <span className="text-3xl font-black text-primary data-font tabular-nums tracking-tighter drop-shadow-lg">{q.reward}</span>
                             </div>
                             {q.active && <div className="size-6 bg-emerald-400 rounded-full shadow-[0_0_50px_#34d399] animate-pulse ring-8 ring-emerald-500/10" />}
                           </div>
                        </div>
                    ))}
                 </div>
              </div>

              {/* FINAL SAVE ACTION (QUANTUM MEGA BUTTON) */}
              <div className="pt-20">
                  <button onClick={handleProfileUpdate} className="premium-shine w-full py-12 bg-primary rounded-[5rem] text-[20px] font-black uppercase tracking-[1.2em] shadow-[0_60px_150px_rgba(104,31,239,0.7)] active:scale-[0.92] transition-all transform hover:-translate-y-4 border-t-4 border-white/40 relative overflow-hidden group/final-save">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/final-save:translate-x-full transition-transform duration-[1500ms]" />
                      <span className="relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,1)] flex items-center justify-center gap-8">
                         <Icons.Infinity className="size-8 text-white/50" />
                         СОХРАНИТЬ СИСТЕМУ
                         <Icons.Infinity className="size-8 text-white/50" />
                      </span>
                  </button>
                  <div className="mt-12 flex flex-col items-center gap-4 opacity-20 group">
                     <p className="text-center text-[12px] font-black text-white uppercase tracking-[1em] data-font leading-none">Global Synchronization Loop</p>
                     <div className="h-1.5 w-64 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-white animate-pulse" />
                     </div>
                  </div>
              </div>
              <div className="h-60" />
           </div>
        )}

        {/* SCREEN 12: WAITLIST (MANUAL GATE) */}
        {screen === 'waitlist' && (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-1000">
             <div className="glass-panel p-16 rounded-[6rem] max-w-sm border-t-4 border-rose-500/40 shadow-[0_100px_200px_rgba(0,0,0,1)] relative overflow-hidden border-white/5 backdrop-blur-[100px]">
                 <div className="absolute top-0 left-0 w-full h-3 bg-rose-600 shadow-[0_0_50px_rgba(225,29,72,0.5)] animate-pulse" />
                 <div className="size-28 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-12 border-4 border-rose-500/30 shadow-4xl group">
                    <Icons.Support className="size-14 text-rose-500 group-hover:scale-110 transition-transform duration-700" />
                 </div>
                 <h2 className="text-5xl font-black mb-10 text-white uppercase tracking-tighter italic text-glow leading-none">WAITLIST<br/>PROTOCOL</h2>
                 <p className="text-lg text-white/40 mb-16 leading-relaxed font-black uppercase tracking-widest text-center italic">
                    Прямые платежи временно отключены для калибровки шлюзов. Оставьте заявку, и мы активируем ваш доступ вручную через 24 часа.
                 </p>
                 <button onClick={()=>{ triggerHaptic(); setScreen('hub'); }} className="premium-shine w-full py-10 bg-rose-600 rounded-[3.5rem] text-[15px] font-black uppercase tracking-[0.8em] text-white shadow-[0_40px_80px_rgba(225,29,72,0.5)] active:scale-95 transition-all transform hover:scale-105 border-t-2 border-white/30">ПОДТВЕРДИТЬ УЧАСТИЕ</button>
             </div>
          </div>
        )}

      </main>

      {/* NAVIGATION BAR (QUANTUM DOCK - THE ABSOLUTE PINNACLE) */}
      {hasAcceptedTerms && role !== null && !['loading', 'legal', 'chat'].includes(screen) && (
        <nav className="h-[135px] glass-panel border-t-2 border-white/10 flex justify-around items-center px-12 pb-16 z-[100] shadow-[0_-50px_150px_rgba(0,0,0,1)] relative overflow-hidden backdrop-blur-[120px]">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            
            {[
                {id: 'hub', icon: <Icons.AllInclusive/>, label: 'ХАБ', shortcut: '01'},
                {id: 'setup', icon: <Icons.Commander/>, label: 'ЛАБ', shortcut: '02'},
                {id: 'client_hub', icon: <Icons.Pilot/>, label: 'ПИЛОТ', shortcut: '03'},
                {id: 'aggregator', icon: <Icons.Market/>, label: 'МАРКЕТ', shortcut: '04'},
                {id: 'profile', icon: <Icons.User/>, label: 'СИНК', shortcut: '05'}
            ].map(item => (
                <button key={item.id} onClick={()=>{ triggerHaptic('light'); setScreen(item.id); }} className={`flex flex-col items-center gap-5 transition-all duration-700 relative group active:scale-90 ${screen===item.id ? 'text-primary -translate-y-12 scale-[2.2]' : 'text-white/10 hover:text-white/40 hover:scale-110'}`}>
                    <div className="relative">
                      {React.cloneElement(item.icon, { className: `size-7 transition-all duration-1000 ${screen===item.id ? 'drop-shadow-[0_0_35px_rgba(104,31,239,1)]' : ''}` })}
                      {screen===item.id && <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[60px] animate-pulse -z-10" />}
                    </div>
                    {screen === item.id && (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000">
                           <span className="text-[6px] font-black uppercase tracking-[0.4em] data-font opacity-100 absolute -bottom-6 whitespace-nowrap shadow-2xl bg-background-dark/95 px-3 py-1 rounded-full border border-white/10">{item.label}</span>
                        </div>
                    )}
                    {screen===item.id && <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_20px_rgba(104,31,239,1)] animate-bounce mt-3 border-2 border-white/50" />}
                    {!screen.includes(item.id) && <span className="text-[7px] font-black opacity-20 data-font mt-2 group-hover:opacity-100 transition-opacity">{item.shortcut}</span>}
                </button>
            ))}
        </nav>
      )}

      {/* BACKGROUND DECORATIVE TERMINAL TEXT (ULTRA QUANTUM DETAIL) */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left ml-4 pointer-events-none opacity-[0.04] z-0 select-none hidden sm:block">
          <span className="text-[20px] font-mono tracking-[4em] text-white uppercase leading-none whitespace-nowrap data-font font-black italic opacity-80">CONNECTUM TERMINAL v25.0 // QUANTUM CORE INITIALIZED // [OK] // NEURAL_LINK: [ULTRA_STABLE] // PSY_SYNC_CORE: 9.999 // ENCRYPTION: AES_QUANTUM_256 // SYNC_PORT: 3000 // STATUS: MASTER_ACTIVE</span>
      </div>
      
      {/* MOBILE DECOR */}
      <div className="fixed bottom-4 left-6 pointer-events-none opacity-10 z-0 sm:hidden">
          <span className="text-[8px] font-mono tracking-[1em] text-white uppercase data-font font-black">SYNC_CORE: 9.999 [OK]</span>
      </div>
    </div>
  );
}
