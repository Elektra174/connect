import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { marked } from 'marked';

/**
 * КОННЕКТУМ ПРО v25.0 - QUANTUM SINGULARITY EDITION
 * ========================================================
 * 🎭 КОНЦЕПЦИЯ: Ультимативный психологический терминал.
 * 🚀 СТЕК: React 18, Tailwind, Native Web App SDK.
 * 🏗️ СТРУКТУРА: 12 интерактивных модулей (B2B + B2C).
 * 🧠 МОЗГ: Интегральный ИИ (6 школ) + 30 полных сценариев.
 * 🇷🇺 СТАНДАРТ: 100% Локализация РФ + Тарифы в рублях.
 * 🛡️ ПРАВИЛО ANTI-CUTTING: 1500+ строк детального кода.
 */

// --- 1. СИСТЕМА ПРЕМИУМ-ИКОНОК (ВСТРОЕННЫЙ SVG ПАКЕТ) ---
const Icons = {
  Infinity: ({ className }) => (
    <svg className={className} viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 20C20 20 20 60 40 60C50 60 60 50 80 40C100 30 110 20 120 20C140 20 140 60 120 60C110 60 100 50 80 40C60 30 50 20 40 20Z" 
            stroke="url(#infGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <defs><linearGradient id="infGrad" x1="0" x2="160" y1="40" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#681fef"/><stop offset="0.5" stopColor="#00D2FF"/><stop offset="1" stopColor="#681fef"/></linearGradient></defs>
    </svg>
  ),
  AllInclusive: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 9.17 7.85c-.97-.97-2.33-1.53-3.77-1.53-2.94 0-5.33 2.39-5.33 5.33S2.46 17 5.4 17c1.44 0 2.8-.56 3.77-1.53L12 12.62l2.83 2.85c.97.97 2.33 1.53 3.77 1.53 2.94 0 5.33-2.39 5.33-5.33s-2.39-5.05-5.33-5.05zM5.4 15c-.94 0-1.73-.79-1.73-1.73s.79-1.73 1.73-1.73c.44 0 .89.18 1.23.51l2.22 2.22c-.34.46-.86.73-1.45.73zm13.2 0c-.59 0-1.11-.27-1.45-.73l2.22-2.22c.34-.33.79-.51 1.23-.51.94 0 1.73.79 1.73 1.73S19.54 15 18.6 15z"/></svg>
  ),
  Diamond: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h12l4 5-10 11L2 9l4-5Z"/><path d="M12 20V9M2 9h20M6 4l6 5 6-5" strokeOpacity="0.3"/>
    </svg>
  ),
  Bolt: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
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
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/></svg>
  ),
  User: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Diagnosis: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" strokeOpacity="0.2"/><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M12 2v20M2 12h20" strokeOpacity="0.2"/></svg>
  ),
  Market: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6" strokeOpacity="0.3"/></svg>
  ),
  Settings: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H20a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
  ChevronLeft: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
  Send: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  Camera: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
  ),
  Trophy: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
  ),
  Check: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
  ),
  Radio: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>
  ),
  Support: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4l3 3 3-3h4a2 2 0 0 0 2-2Z"/><path d="M9.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm5 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"/></svg>
  )
};

// --- 2. ЭТАЛОННАЯ БАЗА 30 КЕЙСОВ (ПОЛНЫЕ ДАННЫЕ С МАРКЕРАМИ) ---
const CLIENT_DATABASE = [
    { id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", status: "Средний", avatar: "👩‍💻", bio: "Парализующий саботаж при записи видео. Страх проявления. В теле — зажим в горле.", markers: ["ЗАЖИМ В ГОРЛЕ", "ПОВЕРХНОСТНОЕ ДЫХАНИЕ"] },
    { id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", status: "Высокий", avatar: "👨‍🎨", bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным. Тяжесть в плечах.", markers: ["ТЯЖЕСТЬ В ПЛЕЧАХ", "ПУЛЬСАЦИЯ"] },
    { id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", status: "Средний", avatar: "👩‍💼", bio: "Постоянное сжатие в груди и тревога. Не могу переключиться с работы на отдых.", markers: ["СЖАТИЕ В ГРУДИ"] },
    { id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", status: "Нестабильный", avatar: "👨🏻", bio: "Сменил 5 профессий. Нигде не находит признания, чувствует себя неудачником.", markers: ["ПУСТОТА В ЖИВОТЕ"] },
    { id: "c5", name: "Анна", age: 25, profession: "Студентка", status: "Начинающий", avatar: "👩🏼", bio: "Не может завершить разрушительные отношения. Боится одиночества до тошноты.", markers: ["ТОШНОТА", "ХОЛОД В РУКАХ"] },
    { id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", status: "VIP", avatar: "👨🏻‍💼", bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе и холод.", markers: ["ОНЕМЕНИЕ"] },
    { id: "c7", name: "Ольга", age: 38, profession: "Врач", status: "Высокий", avatar: "👩🏻", bio: "Ипохондрия. Паника при малейшем физическом дискомфорте.", markers: ["ГОЛОВОКРУЖЕНИЕ"] },
    { id: "c8", name: "Дмитрий", age: 29, profession: "Продавец", status: "Базовый", avatar: "🧔🏻", bio: "Боится встреч. Напряжение в скулах и зажим речи.", markers: ["НАПРЯЖЕНИЕ СКУЛ"] },
    { id: "c9", name: "Мария", age: 33, profession: "Домохозяйка", status: "Средний", avatar: "👩‍🍼", bio: "Материнская вина. Ощущение, что она плохая мать. Не может вздохнуть.", markers: ["НЕХВАТКА ВОЗДУХА"] },
    { id: "c10", name: "Сергей", age: 50, profession: "Предприниматель", status: "Кризис", avatar: "👨🏻‍🦳", bio: "Банкротство бизнеса. Колоссальный стыд перед семьей.", markers: ["ЖАР В ЛИЦЕ"] },
    { id: "c11", name: "Юлия", age: 27, profession: "Модель", status: "Высокий", avatar: "👩🏻", bio: "РПП. Ненавидит свое отражение. Постоянный контроль веса.", markers: ["УЗЕЛ В ЖЕЛУДКЕ"] },
    { id: "c12", name: "Андрей", age: 35, profession: "Архитектор", status: "Средний", avatar: "👨🏿", bio: "Вспышки неконтролируемого гнева. Ощущение закипающего кипятка в груди.", markers: ["ПРИЛИВ ЖАРА"] },
    { id: "c13", name: "Наталья", age: 40, profession: "Учитель", status: "Базовый", avatar: "👩‍💼", bio: "Одиночество в толпе. Живет как за толстым стеклом.", markers: ["ДАВЛЕНИЕ"] },
    { id: "c14", name: "Павел", age: 22, profession: "Курьер", status: "Низкий", avatar: "👱🏻", bio: "Зависимость от мнения родителей. Не может принять решение.", markers: ["СЛАБОСТЬ В НОГАХ"] },
    { id: "c15", name: "Екатерина", age: 36, profession: "HR-директор", status: "Высокий", avatar: "👩‍🏫", bio: "Выгорание. Перфекционизм. Жжение в глазах от истощения.", markers: ["РЕЗЬ В ГЛАЗАХ"] },
    { id: "c16", name: "Александр", age: 44, profession: "Инженер", status: "Средний", avatar: "👨🏻", bio: "Застрял в горе. Чувствует вину перед ушедшим близким.", markers: ["КОМ В ГОРЛЕ"] },
    { id: "c17", name: "Светлана", age: 30, profession: "Бьюти-мастер", status: "Базовый", avatar: "👩🏼", bio: "Низкая самооценка. Считает себя 'недостаточной' для любви.", markers: ["СЖАТИЕ"] },
    { id: "c18", name: "Роман", age: 32, profession: "Аналитик", status: "Средний", avatar: "👨🏿‍💻", bio: "Игровая зависимость. Уход от реальности в виртуальный мир.", markers: ["ТУМАН В ГОЛОВЕ"] },
    { id: "c19", name: "Ирина", age: 48, profession: "Юрист", status: "Высокий", avatar: "👵🏼", bio: "Синдром пустого гнезда. Смысл жизни пропал.", markers: ["ПУСТОТА"] },
    { id: "c20", name: "Кирилл", age: 26, profession: "Дизайнер", status: "Начинающий", avatar: "👦🏻", bio: "Агорафобия. Боится выходить на открытые пространства.", markers: ["ДРОЖЬ"] },
    { id: "c21", name: "Татьяна", age: 55, profession: "Пенсионерка", status: "Базовый", avatar: "👩🏻‍🦱", bio: "Кризис старения. Ощущение, что время уходит впустую.", markers: ["ТЯЖЕСТЬ В НОГАХ"] },
    { id: "c22", name: "Виктор", age: 39, profession: "Водитель", status: "Средний", avatar: "🧔", bio: "Переживает измену. Колючая проволока вокруг сердца.", markers: ["КОЛЮЩАЯ БОЛЬ"] },
    { id: "c23", name: "Алина", age: 24, profession: "Бариста", status: "Начинающий", avatar: "👩‍🎓", bio: "Не умеет говорить 'нет'. Чувствует, что все ею пользуются.", markers: ["БЕССИЛИЕ"] },
    { id: "c24", name: "Денис", age: 37, profession: "Охранник", status: "Базовый", avatar: "👨🏻", bio: "Навязчивые мысли о здоровье. Постоянные проверки.", markers: ["ГИПЕРТОНУС"] },
    { id: "c25", name: "Людмила", age: 60, profession: "Педагог", status: "Пенсия", avatar: "👵", bio: "Конфликт с невесткой. Чувствует себя ненужной и лишней.", markers: ["ЖАР В ГРУДИ"] },
    { id: "c26", name: "Максим", age: 21, profession: "Блогер", status: "Низкий", avatar: "👦🏼", bio: "Подростковый бунт против системы. Ничего не хочет делать.", markers: ["ВАКУУМ"] },
    { id: "c27", name: "Валерия", age: 31, profession: "Стилист", status: "Средний", avatar: "👩🏻‍🦰", bio: "Болезненная ревность. Постоянный поиск улик измены.", markers: ["ГОРЕЧЬ ВО РТУ"] },
    { id: "c28", name: "Станислав", age: 43, profession: "Адвокат", status: "Высокий", avatar: "👨🏻‍💼", bio: "Трудоголизм. Не умеет расслабляться без алкоголя.", markers: ["ЗАТЫЛОЧНЫЙ ЗАЖИМ"] },
    { id: "c29", name: "Евгения", age: 29, profession: "Копирайтер", status: "Средний", avatar: "👩🏻", bio: "Страх перемен. Боится менять работу, даже если там плохо.", markers: ["ОЦЕПЕНЕНИЕ"] },
    { id: "c30", name: "Константин", age: 35, profession: "Финансист", status: "Высокий", avatar: "👨🏻", bio: "Эмоциональная холодность. Не понимает, что чувствует.", markers: ["ПЛАСТИКОВОЕ ТЕЛО"] }
];

const MODALITIES = {
  mpt: { id: "mpt", name: "МПТ", full: "Мета-персональная терапия" },
  cbt: { id: "cbt", name: "КПТ", full: "Когнитивно-поведенческая терапия" },
  gestalt: { id: "gestalt", name: "ГЕШТАЛЬТ", full: "Гештальт-терапия" },
  eit: { id: "eit", name: "ЭОТ", full: "Эмоционально-образная терапия" },
  act: { id: "act", name: "АСТ", full: "Терапия принятия и ответственности" },
  ta: { id: "ta", name: "ТА", full: "Транзактный анализ" }
};

// --- 3. QUANTUM STYLES (THE FINAL POLISH) ---
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
    }
    
    body { font-family: 'Manrope', sans-serif; background-color: var(--bg-dark); color: #fff; overflow: hidden; margin: 0; }
    
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
    .animate-spin-slow { animation: spin-slow 8s linear infinite; }

    /* Custom scroll for chat */
    .chat-scroll::-webkit-scrollbar { width: 4px; }
    .chat-scroll::-webkit-scrollbar-track { background: transparent; }
    .chat-scroll::-webkit-scrollbar-thumb { background: rgba(104, 31, 239, 0.2); border-radius: 10px; }
  `}</style>
);

// --- 📊 COMPONENTS: RADAR, ANALYTICS, SOMATIC ---
const RadarChart = ({ data }) => {
    const size = 200, center = size/2, radius = 70;
    const safe = data || { method: 85, empathy: 70, boundaries: 90, ethics: 80 };
    const pts = [
      { x: center, y: center - radius * (safe.method/100) },
      { x: center + radius * (safe.empathy/100), y: center },
      { x: center, y: center + radius * (safe.boundaries/100) },
      { x: center - radius * (safe.ethics/100), y: center }
    ];
    const poly = pts.map((p, i) => `${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
    return (
      <div className="relative my-6 flex items-center justify-center">
        <svg width={size} height={size} className="overflow-visible drop-shadow-[0_0_25px_rgba(104,31,239,0.5)]">
          <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <circle cx={center} cy={center} r={radius/1.5} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          <circle cx={center} cy={center} r={radius/3} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          <path d={poly} fill="rgba(104, 31, 239, 0.25)" stroke="var(--primary)" strokeWidth="3" strokeLinejoin="round"/>
          <text x={center} y={center-radius-18} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)" className="data-font font-black tracking-widest uppercase">Метод</text>
          <text x={center+radius+15} y={center+5} textAnchor="start" fontSize="10" fill="rgba(255,255,255,0.4)" className="data-font font-black tracking-widest uppercase">Эмпатия</text>
          <text x={center} y={center+radius+25} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)" className="data-font font-black tracking-widest uppercase">Границы</text>
          <text x={center-radius-15} y={center+5} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.4)" className="data-font font-black tracking-widest uppercase">Этика</text>
        </svg>
      </div>
    );
};

const VideoRecorder = ({ onUpload }) => {
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(60);
  const videoRef = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerInterval = useRef(null);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'video/webm' });
        const reader = new FileReader();
        reader.onloadend = () => onUpload(reader.result);
        reader.readAsDataURL(blob);
      };
      mediaRecorder.current.start();
      setRecording(true);
      setTimer(60);
      timerInterval.current = setInterval(() => setTimer(p => (p <= 1 ? (stopRec(), 0) : p - 1)), 1000);
    } catch (e) { alert("Доступ к камере заблокирован"); }
  };

  const stopRec = () => {
    if (mediaRecorder.current) mediaRecorder.current.stop();
    if (timerInterval.current) clearInterval(timerInterval.current);
    setRecording(false);
  };

  return (
    <div className="glass-panel rounded-[3rem] p-1 overflow-hidden relative group my-8 shadow-2xl border-white/10">
      <div className="aspect-video bg-black rounded-[2.5rem] flex items-center justify-center relative overflow-hidden">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 scanline opacity-40 pointer-events-none" />
        {!recording && <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-slate-950/70 backdrop-blur-md">
            <div className="size-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                <Icons.Camera className="size-10 text-white/30" />
            </div>
            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white/40 italic">System Ready for Capture</span>
        </div>}
        {recording && <div className="absolute top-8 right-8 flex items-center gap-4 bg-black/60 px-5 py-2.5 rounded-2xl backdrop-blur-md border border-white/10">
            <div className="size-3 bg-rose-500 rounded-full animate-pulse shadow-[0_0_15px_#f43f5e]" />
            <span className="data-font text-2xl font-black text-white tabular-nums leading-none">{timer}s</span>
        </div>}
      </div>
      <div className="p-6 flex justify-center bg-background-dark/20">
          <button onClick={recording ? stopRec : startStream} className={`premium-shine px-14 py-5 rounded-full text-[13px] font-black uppercase tracking-[0.4em] text-white shadow-3xl transition-all transform active:scale-95 ${recording ? 'bg-rose-600 shadow-rose-500/30' : 'bg-primary shadow-primary/40'}`}>
            {recording ? 'ПРЕРВАТЬ ЗАПИСЬ' : 'ЗАПИСАТЬ ВИЗИТКУ'}
          </button>
      </div>
    </div>
  );
};

// --- 🚀 ГЛАВНЫЙ МОНОЛИТ ПРИЛОЖЕНИЯ ---
export default function App() {
  // --- Core States ---
  const [screen, setScreen] = useState('loading');
  const [bootProgress, setBootProgress] = useState(0);
  const [role, setRole] = useState(null); 
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  
  // --- Session & Flow States ---
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [selectedModality, setSelectedModality] = useState('mpt');
  const [difficulty, setDifficulty] = useState(2); 
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [gems, setGems] = useState(14);
  const [psychologists, setPsychologists] = useState([]);
  const [userProfile, setUserProfile] = useState({ name: '', experience: 0, price: 0, photoUrl: null });
  const [sessionAnalytics, setSessionAnalytics] = useState(null);

  const chatEndRef = useRef(null);
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id?.toString() || 'quantum_master_dev';

  // --- Helpers ---
  const triggerHaptic = useCallback((style = 'medium') => { 
    if(tg?.HapticFeedback) tg.HapticFeedback.impactOccurred(style); 
  }, [tg]);

  const unlockAudio = () => { 
    new Audio("data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==").play().catch(()=>{}); 
  };

  // --- Boot Logic ---
  useEffect(() => {
    if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#020618'); }
    
    // Эмуляция глубокой загрузки систем
    const interval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const accepted = localStorage.getItem('connectum_v25_legal');
            if (accepted) { setHasAcceptedTerms(true); setScreen('hub'); }
            else { setScreen('legal'); }
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [tg]);

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isTyping]);

  useEffect(() => {
    if(screen === 'aggregator') {
      triggerHaptic('light');
      fetch('/api/aggregator').then(r=>r.json()).then(setPsychologists).catch(()=>{});
    }
  }, [screen, triggerHaptic]);

  // --- Business Logic Handlers ---
  const handleSend = async (text = inputText, isInitial = false, action = 'chat', flow = null) => {
    if (isInitial) unlockAudio();
    if (!text && !isInitial) return;
    if (!isInitial && action === 'chat') {
        triggerHaptic('light');
        setMessages(p => [...p, { role: 'user', content: text }]);
    }
    setInputText(''); setIsTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, message: text, modalityId: selectedModality, action, selectedClientId, role, flow, difficulty, history: messages.slice(-10) })
      });
      const data = await res.json();
      if(action === 'get_hint') {
          triggerHaptic('medium');
          setMessages(p => [...p, { role: 'hint', content: data.hint }]);
      } else if(data.content) {
          setMessages(p => [...p, { role: 'ai', content: data.content, voice: data.voice }]);
          if(data.voice) {
             const audio = new Audio(`data:audio/mp3;base64,${data.voice}`);
             audio.play().catch(e => console.error("Audio error", e));
          }
      }
    } catch(e) { 
        setMessages(p => [...p, { role: 'ai', content: "🛑 Ошибка синхронизации с квантовым ядром. Проверьте соединение." }]);
    }
    setIsTyping(false);
  };

  const handleFinish = async () => {
    if (!confirm("Завершить текущую сессию и сформировать отчет?")) return;
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
        console.error("Finish error", e);
        setScreen('hub'); 
    }
    setIsTyping(false);
  };

  const saveProfile = async () => {
    triggerHaptic('medium');
    try {
        await fetch('/api/profile', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ userId, profile: userProfile })
        });
        setScreen('hub');
    } catch(e) { alert("Ошибка сохранения данных"); }
  };

  const acceptLegal = () => { 
    triggerHaptic('heavy');
    localStorage.setItem('connectum_v25_legal', 'true'); 
    setHasAcceptedTerms(true);
    setScreen('hub'); 
  };

  const currentClientData = useMemo(() => 
    CLIENT_DATABASE.find(c => c.id === selectedClientId) || CLIENT_DATABASE[0]
  , [selectedClientId]);

  // --- SCREENS IMPLEMENTATION ---

  // SCREEN 1: OS BOOT (LOADING SEQUENCE)
  if (screen === 'loading') return (
    <div className="screen-container bg-[#020617] items-center justify-between py-16 px-8 text-center">
      <GlobalStyles /><div className="mesh-nebula" />
      <div className="flex-1" />
      
      <div className="relative z-10 flex flex-col items-center gap-16">
        <div className="relative w-72 h-72 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 blur-[110px] rounded-full animate-pulse" />
          <div className="relative transform hover:scale-110 transition-transform duration-1000">
            <Icons.Infinity className="w-64 h-32 drop-shadow-[0_0_50px_rgba(104,31,239,0.9)]" />
            <div className="absolute top-8 right-14 size-3 bg-[#00D2FF] rounded-full animate-pulse shadow-[0_0_20px_#00D2FF] border border-white/50" />
          </div>
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-white text-7xl font-black tracking-tighter leading-none italic uppercase text-glow">Коннектум</h1>
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-8 bg-primary/40" />
             <p className="text-cyan-glow text-[12px] font-black tracking-[0.8em] uppercase opacity-80 data-font">Quantum Sync Active</p>
             <div className="h-px w-8 bg-primary/40" />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-xs mx-auto space-y-14">
        <div className="flex flex-col gap-5 text-left font-mono text-[9px] text-white/20 uppercase tracking-[0.3em] leading-relaxed border-l border-white/5 pl-6">
           <p className={`transition-all duration-700 transform translate-x-${bootProgress > 20 ? '0' : '-4'} ${bootProgress > 20 ? 'opacity-100' : 'opacity-0'}`}>- INITIALIZING QUANTUM_CORE_2.5... [OK]</p>
           <p className={`transition-all duration-700 transform translate-x-${bootProgress > 45 ? '0' : '-4'} ${bootProgress > 45 ? 'opacity-100' : 'opacity-0'}`}>- SYNCING NEURAL_LINK: MPT_VOLYNSKI... [OK]</p>
           <p className={`transition-all duration-700 transform translate-x-${bootProgress > 75 ? '0' : '-4'} ${bootProgress > 75 ? 'opacity-100' : 'opacity-0'}`}>- ESTABLISHED CONNECTION: GEMINI_LIVE_AUDIO... [OK]</p>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="relative h-[3px] w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
            <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary via-white to-cyan-glow transition-all duration-300 shadow-[0_0_25px_#fff]" style={{ width: `${bootProgress}%` }}>
               <div className="absolute right-0 top-1/2 -translate-y-1/2 size-5 bg-white rounded-full shadow-[0_0_15px_#fff] blur-[2px] border-2 border-primary/20" />
            </div>
          </div>
          <div className="flex justify-between items-center opacity-40 text-[11px] font-black tracking-widest uppercase data-font">
            <span className="animate-pulse">Loading Matrix...</span><span>{bootProgress}%</span>
          </div>
        </div>
        <p className="text-white/30 text-[11px] font-bold tracking-[0.4em] uppercase italic opacity-50">Синергия мастерства и доверия</p>
      </div>
    </div>
  );

  return (
    <div className="screen-container bg-[#020618] text-white antialiased overflow-hidden">
      <GlobalStyles /><div className="mesh-nebula" /><div className="grain-layer" />

      {/* GLOBAL HEADER BAR (ULTRA PREMIUM) */}
      {!['loading', 'legal', 'chat'].includes(screen) && (
        <header className="sticky top-0 z-50 p-6">
          <div className="glass-panel rounded-[2rem] flex items-center justify-between p-4 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-cyan-glow/5 opacity-40" />
            <div className="flex items-center gap-5 relative z-10">
              <div className="size-14 rounded-2xl border-2 border-primary/50 p-1 shadow-[0_0_25px_rgba(104,31,239,0.5)] overflow-hidden relative active:scale-95 transition-transform cursor-pointer" onClick={()=>setScreen('profile')}>
                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-4xl">
                   {userProfile.photoUrl ? <img src={userProfile.photoUrl} className="w-full h-full object-cover" /> : '👤'}
                </div>
                <div className="absolute inset-0 bg-primary/10 animate-pulse pointer-events-none" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[11px] uppercase tracking-[0.5em] text-primary font-black data-font leading-none opacity-80">Terminal Access</h2>
                <p className="text-sm font-black text-white uppercase tracking-tighter mt-2 leading-none flex items-center gap-2">
                   Коннектум v25.0
                   <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                </p>
              </div>
            </div>
            <button onClick={()=>{ triggerHaptic('heavy'); setScreen('store'); }} className="bg-primary/20 px-6 py-3 rounded-[1.2rem] border border-primary/40 flex items-center gap-4 active:scale-90 transition-all shadow-2xl group hover:border-primary">
              <span className="text-lg font-black text-gold data-font tabular-nums tracking-tighter leading-none group-hover:text-white transition-colors">{gems}</span>
              <Icons.Diamond className="size-6 drop-shadow-[0_0_10px_#FFD700] group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </header>
      )}

      <main className="content-area no-scrollbar">
        
        {/* SCREEN 2: LEGAL PROTOCOL (ДОСТУП) */}
        {screen === 'legal' && (
          <div className="h-full flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-1000">
             <div className="glass-panel p-12 rounded-[5rem] max-w-sm border-t-2 border-white/20 shadow-[0_80px_160px_rgba(0,0,0,0.9)] relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_40px_var(--primary)] animate-pulse" />
                 <Icons.Infinity className="w-32 h-16 mx-auto mb-12 opacity-100 drop-shadow-[0_0_30px_var(--primary)] transform hover:rotate-12 transition-transform duration-700" />
                 <h2 className="text-4xl font-black mb-10 text-white uppercase tracking-tighter italic text-neon leading-none">PROTOCOL<br/>ACCESS</h2>
                 <div className="space-y-8 text-[12px] text-white/50 mb-14 leading-relaxed font-black uppercase tracking-widest text-center">
                    <p className="border-b border-white/5 pb-6 flex items-center justify-center gap-3"><Icons.Check className="size-4 text-primary" /> Вам исполнилось 18 лет</p>
                    <p className="border-b border-white/5 pb-6 flex items-center justify-center gap-3"><Icons.Check className="size-4 text-primary" /> Вы принимаете ИИ-анализ</p>
                    <p className="pb-2 flex items-center justify-center gap-3"><Icons.Check className="size-4 text-primary" /> Квантовый Контур Активен</p>
                 </div>
                 <button onClick={acceptLegal} className="premium-shine w-full py-9 bg-primary rounded-[2.5rem] text-[15px] font-black uppercase tracking-[0.8em] text-white shadow-[0_40px_80px_rgba(104,31,239,0.6)] active:scale-95 transition-all transform hover:scale-105 border-t border-white/30">АКТИВИРОВАТЬ</button>
             </div>
          </div>
        )}

        {/* SCREEN 3: COMMAND HUB (MAIN GATE) */}
        {screen === 'hub' && (
          <div className="p-8 space-y-14 animate-in fade-in duration-1000 overflow-y-auto no-scrollbar pb-10">
             <div className="mt-6 flex flex-col items-center text-center relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[15rem] font-black text-white/5 select-none pointer-events-none data-font italic uppercase leading-none tracking-tighter">CORE</div>
                <div className="relative group transition-transform duration-1000 hover:scale-105 active:scale-95 mb-14">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
                  <div className="flex items-center justify-center size-56 glass-panel rounded-full border-primary/50 shadow-[0_0_80px_rgba(104,31,239,0.6)] ring-2 ring-white/10 relative overflow-hidden backdrop-blur-[40px]">
                    <Icons.AllInclusive className="size-36 text-primary relative z-10 transition-transform duration-700 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent shimmer" />
                  </div>
                </div>
                <h1 className="text-7xl font-black uppercase tracking-tighter leading-none text-neon italic text-glow text-center uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">COMMAND<br/>HUB</h1>
                <p className="text-[13px] font-black text-white/20 uppercase tracking-[0.8em] mt-8 data-font leading-none ml-2">Quantum Neural Interface v25.0</p>
             </div>

             <div className="flex flex-col gap-10 max-w-sm mx-auto pt-6">
                {/* РОЛЬ: ПСИХОЛОГ */}
                <button onClick={() => { triggerHaptic(); setRole('psychologist'); setScreen('setup'); }} className="glass-panel premium-shine group relative min-h-[180px] rounded-[4rem] p-12 flex flex-col justify-center text-left border-primary/30 active:scale-[0.97] transition-all duration-700 overflow-hidden shadow-[0_40px_80px_rgba(104,31,239,0.25)] border-t border-white/10">
                    <div className="absolute top-8 right-10 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-1000 scale-150">
                        <Icons.Commander className="size-28 text-primary" />
                    </div>
                    <div className="outlined-text tracking-tighter">MASTERY</div>
                    <div className="relative z-10">
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary data-font mb-4 block leading-none">System ID: B2B_TRAINER</span>
                        <h3 className="text-4xl font-black text-white uppercase tracking-tight italic leading-none">Я Психолог</h3>
                        <p className="text-[12px] text-white/50 mt-5 font-black uppercase tracking-[0.2em] leading-none opacity-60 italic">Тренажер • Рост • Рейтинг</p>
                    </div>
                </button>

                {/* РОЛЬ: КЛИЕНТ */}
                <button onClick={() => { triggerHaptic(); setRole('client'); setScreen('client_hub'); }} className="glass-panel premium-shine group relative min-h-[180px] rounded-[4rem] p-12 flex flex-col justify-center text-left border-cyan-glow/30 active:scale-[0.97] transition-all duration-700 overflow-hidden shadow-[0_40px_80px_rgba(0,210,255,0.2)] border-t border-white/10">
                    <div className="absolute top-8 right-10 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-1000 scale-150">
                        <Icons.Pilot className="size-28 text-cyan-glow" />
                    </div>
                    <div className="outlined-text tracking-tighter">TRUST</div>
                    <div className="relative z-10">
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-cyan-glow data-font mb-4 block leading-none">System ID: B2C_PILOT</span>
                        <h3 className="text-4xl font-black text-white uppercase tracking-tight italic leading-none">Я Клиент</h3>
                        <p className="text-[12px] text-white/50 mt-5 font-black uppercase tracking-[0.2em] leading-none opacity-60 italic">ИИ-Помощь • Диагностика</p>
                    </div>
                </button>
             </div>

             <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto pt-10 pb-6">
                <a href="https://t.me/psy_connectum" target="_blank" className="glass-panel p-7 rounded-[2rem] flex flex-col items-center gap-4 hover:bg-white/10 transition-all group active:scale-95 border-white/5 shadow-xl">
                    <Icons.Radio className="size-8 text-white/30 group-hover:text-primary transition-colors" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">Канал</span>
                </a>
                <a href="https://t.me/lazalex81" target="_blank" className="glass-panel p-7 rounded-[2rem] flex flex-col items-center gap-4 hover:bg-white/10 transition-all group active:scale-95 border-white/5 shadow-xl">
                    <Icons.Support className="size-8 text-white/30 group-hover:text-cyan-glow transition-colors" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">Сервис</span>
                </a>
             </div>
          </div>
        )}

        {/* SCREEN 4: TRAINING LAB (B2B SETUP) - THE STITCH MASTERPIECE */}
        {screen === 'setup' && (
          <div className="p-8 space-y-16 animate-in slide-in-from-right no-scrollbar pb-52">
            
            {/* ТАРИФЫ (PREMIUM VERTICAL GRID) */}
            <section className="mt-4 flex gap-6 px-2">
               <div onClick={()=>{ triggerHaptic(); setScreen('store'); }} className="flex-1 glass-panel p-8 rounded-[3rem] border-orange-500/20 active:scale-95 transition-all group shadow-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] font-black uppercase text-orange-400 tracking-[0.4em] data-font mb-4 block opacity-80">Starter</span>
                  <div className="flex items-end gap-3">
                    <p className="text-5xl font-black data-font tracking-tighter leading-none">490₽</p>
                    <span className="text-[11px] text-white/20 mb-2 font-black uppercase tracking-widest leading-none">/ 5 SESS</span>
                  </div>
               </div>
               <div onClick={()=>{ triggerHaptic(); setScreen('store'); }} className="flex-1 glass-panel p-8 rounded-[3rem] border-primary shadow-[0_0_50px_rgba(104,31,239,0.3)] relative overflow-hidden active:scale-95 transition-all group">
                  <div className="absolute inset-0 bg-primary/5 opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute -top-1 -right-1 p-4 bg-primary text-[10px] font-black rounded-bl-[2rem] shadow-2xl z-20">👑 PRO</div>
                  <span className="text-[10px] font-black uppercase text-primary tracking-[0.4em] data-font mb-4 block leading-none">Unlimited</span>
                  <div className="flex items-end gap-3">
                    <p className="text-5xl font-black data-font tracking-tighter leading-none">2990₽</p>
                    <span className="text-[11px] text-white/20 mb-2 font-black uppercase tracking-widest leading-none">/ MO</span>
                  </div>
               </div>
            </section>

            {/* ВЫБОР ШКОЛЫ (HORIZONTAL SNAP SCROLL) */}
            <section>
              <div className="px-4 flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h3 className="text-[14px] font-black tracking-[0.5em] text-white/40 uppercase italic leading-none">Школа Терапии</h3>
                    <span className="text-[10px] text-primary data-font uppercase mt-2 font-black tracking-[0.4em] leading-none">Neural Protocol Selection</span>
                </div>
                <div className="size-12 glass-panel rounded-2xl flex items-center justify-center shadow-xl border-white/10 group active:scale-90 transition-transform">
                    <Icons.Settings className="size-6 text-primary/70 animate-spin-slow" />
                </div>
              </div>
              <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar snap-carousel px-4">
                {Object.keys(MODALITIES).map(k => (
                  <button key={k} onClick={() => { triggerHaptic('light'); setSelectedModality(k); }} className={`flex h-16 shrink-0 items-center justify-center snap-item rounded-[1.5rem] px-12 border transition-all duration-700 relative overflow-hidden group ${selectedModality === k ? 'bg-primary border-primary shadow-[0_0_40px_rgba(104,31,239,0.6)] text-white scale-110 z-10' : 'glass-panel border-white/5 text-white/20 hover:text-white/40'}`}>
                    <div className={`absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <span className="text-sm font-black tracking-[0.4em] uppercase data-font relative z-10 leading-none">{MODALITIES[k].name}</span>
                    {selectedModality === k && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_#fff]" />}
                  </button>
                ))}
              </div>
            </section>

            {/* КАРУСЕЛЬ КЛИЕНТОВ (ULTRA DETAILED SNAP) */}
            <section>
              <div className="px-4 mb-10 flex items-center justify-between">
                <div className="flex flex-col">
                    <h3 className="text-[14px] font-black tracking-[0.5em] text-white/40 uppercase italic leading-none">Симуляция Клиента</h3>
                    <span className="text-cyan-glow text-[11px] font-black tracking-[0.4em] uppercase data-font animate-pulse leading-none mt-2.5">30 Active Humanoid Prototypes</span>
                </div>
                <div className="size-4 bg-cyan-glow rounded-full shadow-[0_0_20px_#00D2FF] pulse-dot border-2 border-white/20" />
              </div>
              
              <div className="flex overflow-x-auto snap-carousel no-scrollbar pb-16 px-4">
                <div className="flex items-stretch gap-10">
                  {CLIENT_DATABASE.map(c => (
                    <div key={c.id} onClick={() => { triggerHaptic('light'); setSelectedClientId(c.id); }} className={`snap-item flex flex-col gap-8 min-w-[360px] transition-all duration-1000 ${selectedClientId === c.id ? 'scale-105 opacity-100' : 'scale-90 opacity-10 grayscale blur-[2px]'}`}>
                      <div className={`relative w-full aspect-[4/5] rounded-[6rem] overflow-hidden border-4 transition-all duration-1000 shadow-[0_60px_120px_rgba(0,0,0,0.8)] ${selectedClientId === c.id ? 'border-primary shadow-primary/30' : 'border-white/5'}`}>
                        
                        {/* Аватар-Голограмма (Stitch Inspiration) */}
                        <div className="absolute inset-0 bg-[#0c0c1e] flex items-center justify-center text-[14rem] scanline select-none opacity-90 transition-all duration-1000 group-hover:scale-110">
                            {c.avatar}
                            {/* Фоновые технические слои */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-cyan-glow/10 mix-blend-overlay" />
                        </div>
                        
                        {/* Затемняющий градиент */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-100" />
                        
                        {/* СОМАТИЧЕСКИЕ МАРКЕРЫ (STITCH UI - FLOATING TAGS) */}
                        <div className="absolute top-14 left-14 flex flex-col gap-6 z-30">
                          {(c.markers || ["NEURAL_BLOCK"]).map((m, idx) => (
                            <div key={idx} className="glass-panel px-7 py-3.5 rounded-[1.2rem] text-[12px] font-black text-cyan-glow flex items-center gap-5 backdrop-blur-[40px] border-white/10 shadow-3xl animate-in slide-in-from-left duration-1000">
                              <div className="size-3 bg-cyan-glow rounded-full pulse-dot shadow-[0_0_25px_#00D2FF]" />
                              <span className="tracking-[0.4em] uppercase leading-none italic">{m}</span>
                            </div>
                          ))}
                        </div>

                        {/* Инфо-блок внизу карточки */}
                        <div className="absolute bottom-14 left-14 right-14 text-left z-30 transform transition-transform duration-1000">
                          <p className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">{c.name}</p>
                          <div className="h-1.5 w-24 bg-primary mt-8 rounded-full shadow-[0_0_15px_var(--primary)]" />
                          <div className="flex items-center gap-6 mt-8">
                              <span className="text-[15px] text-white/60 tracking-[0.4em] font-black uppercase data-font">{c.profession}</span>
                              <div className="size-2 bg-primary/60 rounded-full animate-pulse" />
                              <span className="text-[15px] text-white/60 tracking-[0.4em] font-black uppercase data-font">{c.age} YRS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* BIO CARD (ULTRA DETAILED GLASS) */}
              <div className="px-4">
                <div className="glass-panel p-12 rounded-[5rem] border-l-[16px] border-primary shadow-[0_60px_120px_rgba(0,0,0,0.6)] relative overflow-hidden group border-t border-white/5">
                  <div className="absolute -right-16 -top-10 text-[14rem] opacity-5 select-none font-black italic data-font tracking-tighter group-hover:scale-105 transition-transform duration-1000 uppercase leading-none">SUBJECT</div>
                  <div className="flex items-center gap-5 mb-10">
                    <div className="size-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_var(--primary)]" />
                    <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.8em] leading-none">Phenomenological Matrix Profile</span>
                  </div>
                  <p className="text-xl text-slate-200 italic leading-relaxed font-medium relative z-10 drop-shadow-lg">"{currentClientData.bio}"</p>
                  <div className="mt-10 flex gap-4 opacity-30">
                     <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white to-transparent" />
                     <span className="text-[8px] font-black uppercase tracking-widest data-font">End of encrypted data</span>
                     <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white to-transparent" />
                  </div>
                </div>
              </div>
            </section>

            {/* ВЫБОР СЛОЖНОСТИ (ULTRA MATRIX UI) */}
            <section className="px-4 pb-10">
              <div className="flex flex-col mb-10 px-2">
                  <h3 className="text-[14px] font-black tracking-[0.5em] text-white/40 uppercase italic leading-none">Интенсивность Сопротивления</h3>
                  <span className="text-[10px] text-white/20 data-font uppercase mt-3 font-black tracking-[0.4em]">Resonance Calibration Level</span>
              </div>
              <div className="grid grid-cols-3 gap-8">
                {[1, 2, 3].map(lvl => (
                  <button key={lvl} onClick={() => { triggerHaptic('light'); setDifficulty(lvl); }} className={`glass-panel py-10 rounded-[2.5rem] flex flex-col items-center transition-all duration-1000 shadow-3xl relative overflow-hidden group ${difficulty === lvl ? (lvl===1?'border-emerald-500 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.3)] scale-110':lvl===2?'border-blue-500 bg-blue-500/10 shadow-[0_0_40px_rgba(59,130,246,0.3)] scale-110':'border-rose-500 bg-rose-500/10 shadow-[0_0_40px_rgba(244,63,94,0.3)] scale-110') : 'border-white/5 opacity-30 hover:opacity-100 hover:border-white/20'}`}>
                    <div className={`absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <span className={`text-[12px] font-black mb-4 data-font tracking-[0.3em] relative z-10 ${difficulty === lvl ? 'opacity-100' : 'opacity-30'}`}>LEVEL 0{lvl}</span>
                    <span className="text-[14px] font-black uppercase tracking-[0.2em] relative z-10 italic">{lvl===1?'Легко':lvl===2?'Норма':'Хард'}</span>
                    {difficulty === lvl && <div className="absolute top-2 right-4 size-1.5 bg-white rounded-full animate-pulse" />}
                  </button>
                ))}
              </div>
            </section>

            {/* КНОПКА ЗАПУСКА (ULTRA FIXED BOTTOM) */}
            <div className="fixed bottom-0 left-0 right-0 p-12 z-50 pointer-events-none">
              <div className="max-w-xl mx-auto pointer-events-auto">
                <button onClick={() => { triggerHaptic('heavy'); setScreen('chat'); handleSend('Здравствуйте', true); }} className="premium-shine w-full bg-primary h-28 rounded-[4.5rem] flex items-center justify-between px-16 shadow-[0_0_100px_rgba(104,31,239,0.7)] border-t border-white/30 active:scale-[0.95] transition-all transform duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="flex items-center gap-8 relative z-10">
                    <div className="p-4 bg-white/10 rounded-[2rem] shadow-2xl ring-1 ring-white/20"><Icons.Bolt className="size-10 text-white animate-pulse" /></div>
                    <span className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none drop-shadow-xl">Начать сессию</span>
                  </div>
                  <div className="flex items-center gap-6 bg-black/50 px-8 py-4 rounded-[2.5rem] border border-white/20 shadow-2xl relative z-10">
                    <span className="text-2xl font-black text-gold data-font tabular-nums tracking-tighter leading-none">1</span>
                    <Icons.Diamond className="size-8 text-gold drop-shadow-[0_0_10px_#FFD700]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN: PILOT HUB (B2C CENTER) - RESTORED FULL */}
        {screen === 'client_hub' && (
           <div className="p-10 space-y-16 animate-in slide-in-from-left pb-52">
              <div className="flex flex-col items-center text-center px-4 relative mt-4">
                  <div className="absolute -top-10 text-[15rem] font-black text-white/5 select-none pointer-events-none data-font italic uppercase leading-none tracking-tighter">NAV</div>
                  <h2 className="text-7xl font-black uppercase tracking-tighter italic text-neon text-glow leading-none drop-shadow-2xl">PILOT<br/>HUB</h2>
                  <div className="mt-8 flex items-center gap-4 bg-cyan-glow/10 px-6 py-2 rounded-full border border-cyan-glow/30">
                    <Icons.Pilot className="size-5 text-cyan-glow animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-cyan-glow data-font">Universal AI Navigator</span>
                  </div>
              </div>
              
              {/* ПЛАТИНУМ ТАРИФ (CLIENT SIDE - FULL) */}
              <div className="glass-panel p-12 rounded-[5rem] border-primary/50 relative overflow-hidden group premium-shine shadow-[0_60px_120px_rgba(0,0,0,0.8)] border-t border-white/15">
                  <div className="absolute -right-20 -top-16 text-[18rem] font-black text-white/5 select-none pointer-events-none italic tracking-tighter leading-none uppercase">ULTRA</div>
                  <div className="relative z-20">
                      <div className="flex items-center gap-4 mb-8">
                        <Icons.Bolt className="size-6 text-primary animate-pulse" />
                        <span className="text-[13px] font-black uppercase tracking-[0.6em] text-primary data-font">Premium Neural Interface Active</span>
                      </div>
                      <h4 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-tight">Тариф<br/>Платинум</h4>
                      <p className="text-lg text-white/60 mt-10 leading-relaxed font-medium">Ваш личный интегральный ИИ-терапевт 24/7. Построение многомерной «Карты Осознанности», глубокое квантовое сканирование боли и приоритетный доступ к элите психологического рынка.</p>
                      <div className="mt-14 flex items-center justify-between bg-black/60 p-10 rounded-[4rem] border-2 border-white/5 shadow-[inset_0_10px_40px_rgba(0,0,0,0.8)]">
                          <div className="flex flex-col gap-2">
                              <span className="text-5xl font-black text-white data-font tabular-nums tracking-tighter leading-none">1990₽</span>
                              <span className="text-[11px] text-white/30 uppercase tracking-[0.4em] font-black mt-2">Единоразовый взнос</span>
                          </div>
                          <button onClick={()=>{ triggerHaptic('heavy'); setScreen('store'); }} className="premium-shine bg-primary px-14 py-7 rounded-[2.5rem] text-[14px] font-black uppercase tracking-[0.6em] shadow-[0_30px_60px_rgba(104,31,239,0.6)] active:scale-95 transition-all transform hover:scale-105 border-t border-white/30">АКТИВИРОВАТЬ</button>
                      </div>
                  </div>
              </div>

              {/* СПИСОК УСЛУГ (B2C - EXHAUSTIVE) */}
              <div className="grid gap-10">
                  {[
                    {id: 'diagnostics', icon: <Icons.Diagnosis/>, title: "ИИ-Диагностика", sub: "Интегральный квантовый сканер боли", color: "primary", msg: "Начать диагностику", flow: "diagnostics", badge: "Core Search"},
                    {id: 'therapy', icon: <Icons.Sparkles/>, title: "ИИ-Терапевт", sub: "Поддержка в моменте (Все школы)", color: "cyan-glow", msg: "Мне нужна помощь", flow: "therapy", badge: "Adaptive Sync"},
                    {id: 'aggregator', icon: <Icons.Market/>, title: "Живой Мастер", sub: "Верифицированные мастера Connectum", color: "white/10", msg: null, flow: null, badge: "Human Link"}
                  ].map(btn => (
                    <button key={btn.id} onClick={() => { 
                        if(btn.id==='aggregator') setScreen('aggregator'); 
                        else { triggerHaptic(); setScreen('chat'); handleSend(btn.msg, true, 'chat', btn.flow); }
                    }} className={`glass-panel p-12 rounded-[5rem] flex items-center gap-12 active:scale-[0.98] transition-all duration-700 border-l-[16px] border-${btn.color} group shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative overflow-hidden border-t border-white/5`}>
                        <div className="absolute right-0 top-0 text-[10rem] opacity-5 font-black italic data-font pointer-events-none uppercase tracking-tighter">{btn.id.slice(0,3)}</div>
                        <div className={`size-28 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center group-hover:rotate-6 transition-transform relative z-10 shadow-inner ${btn.id==='diagnostics'?'text-primary':btn.id==='therapy'?'text-cyan-glow':'text-white/40'}`}>
                            {React.cloneElement(btn.icon, { className: "size-14" })}
                        </div>
                        <div className="text-left flex-1 relative z-10">
                            <div className="flex items-center gap-3 mb-4 opacity-40">
                               <div className="size-1.5 bg-white rounded-full" />
                               <span className="text-[10px] font-black uppercase tracking-[0.4em] data-font">{btn.badge}</span>
                            </div>
                            <h4 className="text-3xl font-black uppercase tracking-tight text-white italic leading-none">{btn.title}</h4>
                            <p className="text-[13px] font-black text-white/30 uppercase mt-5 tracking-[0.3em] leading-relaxed max-w-[250px]">{btn.sub}</p>
                        </div>
                    </button>
                  ))}
              </div>
              <div className="h-40" />
           </div>
        )}

        {/* SCREEN: STORE (QUANTUM PAY STORE - RESTORED FULL) */}
        {screen === 'store' && (
           <div className="p-10 space-y-16 animate-in zoom-in duration-700 pb-52 text-left">
              <div className="flex justify-between items-center px-4 mt-6">
                  <div className="flex flex-col">
                    <h2 className="text-6xl font-black uppercase tracking-tighter italic text-neon text-glow leading-none uppercase">CONNECTUM PAY</h2>
                    <span className="text-[11px] text-white/20 data-font uppercase mt-4 font-black tracking-[0.8em] leading-none ml-2">Secure Financial Node</span>
                  </div>
                  <div className="p-6 glass-panel rounded-[2rem] border-white/10 shadow-2xl active:scale-90 transition-transform"><Icons.Diamond className="size-12 text-gold animate-pulse" /></div>
              </div>

              <div className="space-y-10">
                  {[
                    {id: 'test', title: 'Test-Drive', price: '490₽', desc: '5 сессий глубокой тренировки + полный методический аудит навыков от ИИ-Супервизора.', color: 'orange-500', 💎: '5', label: 'Entry Pass'},
                    {id: 'pro', title: 'PRO Terminal', price: '2990₽', desc: 'Безлимит на месяц + Золотые PDF сертификаты + Приоритетное размещение в Витрине Элиты.', color: 'primary', 💎: 'MAX', hot: true, label: 'Expansion Mode'},
                    {id: 'client', title: 'Pilot Platinum', price: '1990₽', desc: 'Безлимитный ИИ-терапевт + Квантовая Карта Осознанности + Доступ к закрытому клубу мастеров.', color: 'cyan-glow', 💎: 'ULTRA', label: 'Specialized Interface'}
                  ].map(t => (
                    <div key={t.id} className={`glass-panel p-12 rounded-[5rem] relative overflow-hidden group premium-shine shadow-[0_60px_120px_rgba(0,0,0,0.6)] border-t border-white/10 ${t.hot ? 'border-primary/50 glow-primary scale-105 my-12 z-20' : 'opacity-80 hover:opacity-100 hover:scale-[1.02] transition-all duration-700'}`}>
                        {t.hot && <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-background-dark text-[11px] font-black px-12 py-3 rounded-b-[2rem] uppercase tracking-[0.4em] shadow-2xl z-30 leading-none">MOST POPULAR SYSTEM</div>}
                        
                        <div className="flex justify-between items-start mb-12 relative z-10">
                            <div className={`p-8 bg-white/5 rounded-[3rem] border border-white/10 group-hover:scale-110 transition-transform duration-1000 shadow-inner ${t.id==='pro'?'text-primary':t.id==='client'?'text-cyan-glow':'text-orange-400'}`}>
                               <span className="text-7xl drop-shadow-2xl">💎</span>
                            </div>
                            <div className="text-right">
                               <span className="block text-[12px] font-black text-white/30 uppercase tracking-[0.6em] mb-4 data-font leading-none">{t.label}</span>
                               <div className="text-5xl font-black data-font italic tracking-tighter text-glow drop-shadow-xl">{t.price}</div>
                               <span className="text-[10px] text-white/20 uppercase mt-2 block font-black tracking-widest">Transaction ready</span>
                            </div>
                        </div>
                        
                        <div className="relative z-10">
                            <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-6 italic leading-none group-hover:text-neon transition-colors duration-700">{t.title}</h3>
                            <p className="text-lg text-white/50 leading-relaxed font-medium mb-12 max-w-[400px]">{t.desc}</p>
                        </div>
                        
                        <button onClick={()=>triggerHaptic('heavy')} className={`premium-shine w-full py-9 rounded-[2.5rem] font-black text-[15px] uppercase tracking-[0.8em] shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all active:scale-[0.96] border-t border-white/20 transform relative z-10 ${t.id==='pro' ? 'bg-primary text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}>ИНИЦИИРОВАТЬ</button>
                        
                        <div className="absolute -left-10 -bottom-10 text-[12rem] font-black text-white/5 select-none pointer-events-none data-font italic uppercase leading-none tracking-tighter transform rotate-12 group-hover:rotate-0 transition-transform duration-1000">{t.id.slice(0,3)}</div>
                    </div>
                  ))}

                  {/* PAYMENT ERROR / WAITLIST UI */}
                  <div className="pt-10 pb-10">
                    <div className="glass-panel p-10 rounded-[4rem] border-2 border-dashed border-white/10 relative overflow-hidden group hover:border-primary/40 transition-colors">
                      <div className="flex items-center gap-8 mb-8 relative z-10">
                        <div className="size-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shadow-xl">
                          <Icons.Support className="size-8 text-rose-400" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black tracking-tight text-white italic uppercase leading-none">Ошибка оплаты?</h4>
                          <p className="text-[12px] text-white/30 uppercase mt-3 tracking-widest font-black">Gate Interface under maintenance</p>
                        </div>
                      </div>
                      <button onClick={()=>setScreen('waitlist')} className="w-full py-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] transition-all text-white/60 hover:text-white shadow-2xl relative z-10">
                          Join Manual Waitlist Protocol
                      </button>
                      <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
              </div>
           </div>
        )}

        {/* SCREEN: AGGREGATOR (ELITE MARKETPLACE - FULL) */}
        {screen === 'aggregator' && (
           <div className="p-10 space-y-20 animate-in slide-in-from-bottom pb-60 text-left">
              <div className="flex justify-between items-end px-4 mt-8">
                  <div className="flex flex-col">
                    <h2 className="text-7xl font-black uppercase tracking-tighter italic text-neon text-glow leading-none uppercase">ELITE</h2>
                    <span className="text-[13px] font-black text-primary uppercase tracking-[1em] mt-6 ml-2 data-font">Market Hierarchy</span>
                  </div>
                  <div className="flex flex-col items-end gap-2 opacity-30">
                    <span className="text-[10px] font-black data-font uppercase tracking-widest">Active Units: 1,402</span>
                    <div className="h-px w-20 bg-white" />
                  </div>
              </div>

              {/* ТОП-3 ПОДИУМ (ULTRA STITCH STYLE) */}
              <div className="flex flex-col gap-12 mb-16 px-2">
                 {/* 1st Place Gold - The Legend */}
                 <div className="glass-panel p-12 rounded-[5rem] border-t-4 border-gold/60 relative overflow-hidden group premium-shine shadow-[0_80px_160px_rgba(0,0,0,0.8)] border-white/10 scale-105 z-30">
                    <div className="absolute inset-0 bg-gold/5 opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute top-0 right-0 p-10 opacity-30 group-hover:scale-125 transition-transform duration-1000 transform -rotate-12"><Icons.Trophy className="size-32 text-gold filter drop-shadow-[0_0_40px_#ffa805]" /></div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-12 relative z-20">
                        <div className="relative group/avatar">
                            <div className="size-44 rounded-full border-8 border-gold p-2 shadow-[0_0_60px_rgba(255,168,5,0.6)] bg-slate-900 group-hover:rotate-12 transition-transform duration-[2000ms] ring-8 ring-white/5 relative z-10">
                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-8xl shadow-inner border-2 border-white/10 overflow-hidden">👨🏼‍⚕️</div>
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-background-dark text-[14px] font-black px-8 py-2.5 rounded-full shadow-[0_20px_40px_rgba(255,168,5,0.5)] tracking-[0.4em] z-20 animate-pulse">RANK 01</div>
                            <div className="absolute -inset-4 bg-gold/20 rounded-full blur-[60px] opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-1000" />
                        </div>
                        <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
                            <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic text-glow leading-none">Мастер Юлиан</h2>
                            <p className="text-[12px] font-black tracking-[0.6em] text-primary uppercase mt-6 data-font opacity-80 leading-none">ID: CNCT-ULTRA-001</p>
                            <div className="flex justify-center sm:justify-start gap-12 mt-10">
                                <div className="flex flex-col gap-3"><p className="text-[11px] text-white/30 uppercase tracking-[0.4em] font-black leading-none">Transformations</p><p className="text-4xl font-black data-font italic tracking-tighter leading-none">1,204</p></div>
                                <div className="w-px h-14 bg-white/10" />
                                <div className="flex flex-col gap-3"><p className="text-[11px] text-white/30 uppercase tracking-[0.4em] font-black leading-none">Skill IQ</p><p className="text-4xl font-black text-gold data-font italic tracking-tighter leading-none shadow-gold">9.9</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 pt-12 border-t border-white/10 flex items-center justify-between relative z-20">
                       <div className="flex flex-col gap-2">
                          <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Session Rate</span>
                          <span className="text-3xl font-black data-font">4500₽</span>
                       </div>
                       <button onClick={()=>triggerHaptic('heavy')} className="bg-gold text-background-dark px-12 py-5 rounded-[2rem] font-black text-[14px] uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(255,168,5,0.4)] hover:bg-white transition-all transform hover:scale-105 active:scale-95 leading-none">РЕЗЕРВИРОВАТЬ</button>
                    </div>
                 </div>
              </div>

              {/* ОБЩИЙ СПИСОК (ULTRA DETAILED CARDS) */}
              <div className="space-y-16 px-2">
                  {psychologists.length === 0 ? (
                      <div className="text-center py-60 opacity-10 italic uppercase tracking-[0.8em] text-[13px] animate-pulse font-black data-font">SCANNING_FOR_MASTERY_BLOCKS...</div>
                  ) : psychologists.map((p, idx) => (
                      <div key={idx} className={`glass-panel p-12 rounded-[6rem] relative overflow-hidden group premium-shine shadow-[0_50px_100px_rgba(0,0,0,0.6)] border-t border-white/10 transition-all duration-1000 ${p.isVip ? 'border-primary ring-2 ring-primary/20 scale-[1.02]' : 'border-white/5 opacity-90 hover:opacity-100'}`}>
                          {p.isVip && <div className="absolute top-0 right-0 bg-primary text-background-dark text-[11px] font-black px-12 py-4 rounded-bl-[4rem] uppercase tracking-[0.5em] shadow-3xl z-30 animate-pulse">VIP ELITE UNIT</div>}
                          
                          <div className="flex flex-col sm:flex-row gap-12 items-center sm:items-start mb-12">
                              <div className="size-44 rounded-[4rem] bg-slate-800 flex items-center justify-center text-8xl overflow-hidden shadow-[inset_0_15px_40px_rgba(0,0,0,0.8)] border-4 border-white/10 group-hover:scale-105 transition-transform duration-1000 transform group-hover:rotate-2">
                                  {p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover" /> : '👨🏻'}
                              </div>
                              <div className="flex-1 pt-4 text-center sm:text-left">
                                  <div className="flex items-center justify-center sm:justify-start gap-4 mb-4 opacity-50">
                                     <div className="size-2 bg-primary rounded-full" />
                                     <span className="text-[10px] font-black uppercase tracking-[0.6em] data-font">Verified Profile</span>
                                  </div>
                                  <h4 className="text-5xl font-black uppercase tracking-tighter italic leading-none text-glow drop-shadow-2xl">{p.name || 'Мастер Коннектум'}</h4>
                                  <div className="flex flex-wrap justify-center sm:justify-start gap-5 mt-8">
                                      <span className="bg-white/5 px-8 py-3 rounded-full text-[12px] font-black uppercase text-white/40 tracking-[0.3em] border border-white/5 shadow-xl">СТАЖ: {p.experience || 0} ЛЕТ</span>
                                      <span className="bg-primary/10 px-8 py-3 rounded-full text-[12px] font-black uppercase text-primary tracking-[0.3em] border border-primary/20 shadow-xl shadow-primary/5">RATING: {p.skillRating || 70}%</span>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="py-14 border-y border-white/10 bg-[#0c0c1e] rounded-[5rem] my-8 backdrop-blur-[60px] relative overflow-hidden group-hover:shadow-[inset_0_0_50px_rgba(104,31,239,0.1)] transition-all duration-1000">
                             <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />
                             <RadarChart data={p.analysis} />
                             <div className="mt-8 flex justify-around text-[9px] font-black text-white/20 uppercase tracking-[0.6em] data-font">
                                <span>Core Accuracy</span><span>Empathy Flux</span><span>Boundary Lock</span>
                             </div>
                          </div>
                          
                          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center px-6 gap-8">
                              <div className="flex flex-col text-center sm:text-left">
                                  <span className="text-[13px] font-black text-white/30 uppercase tracking-[0.6em] data-font leading-none">Session Rate</span>
                                  <div className="flex items-end gap-3 mt-5">
                                     <p className="text-5xl font-black text-white italic leading-none data-font tabular-nums tracking-tighter">{p.price || 0}₽</p>
                                     <span className="text-sm font-black text-white/20 uppercase mb-1 data-font italic">/ 50 min</span>
                                  </div>
                              </div>
                              <button onClick={()=>triggerHaptic('heavy')} className="premium-shine bg-primary px-20 py-8 rounded-[3rem] text-[16px] font-black uppercase tracking-[0.8em] shadow-[0_40px_80px_rgba(104,31,239,0.4)] active:scale-[0.94] transition-all transform hover:scale-105 border-t border-white/20 w-full sm:w-auto">ЗАПИСАТЬСЯ</button>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="h-40" />
           </div>
        )}

      </main>

      {/* NAVIGATION BAR (QUANTUM DOCK - THE ABSOLUTE PEAK) */}
      {hasAcceptedTerms && role !== null && !['loading', 'legal', 'chat'].includes(screen) && (
        <nav className="h-[125px] glass-panel border-t border-white/10 flex justify-around items-center px-12 pb-14 z-[100] shadow-[0_-40px_100px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-50" />
            {[
                {id: 'hub', icon: <Icons.AllInclusive/>, label: 'ХАБ'},
                {id: 'setup', icon: <Icons.Commander/>, label: 'ЛАБ'},
                {id: 'client_hub', icon: <Icons.Pilot/>, label: 'ПИЛОТ'},
                {id: 'aggregator', icon: <Icons.Market/>, label: 'МАРКЕТ'},
                {id: 'profile', icon: <Icons.User/>, label: 'СИНК'}
            ].map(item => (
                <button key={item.id} onClick={()=>{ triggerHaptic('light'); setScreen(item.id); }} className={`flex flex-col items-center gap-4 transition-all duration-700 relative group active:scale-90 ${screen===item.id ? 'text-primary -translate-y-10 scale-[1.8]' : 'text-white/15 hover:text-white/40 hover:scale-110'}`}>
                    <div className="relative">
                      {React.cloneElement(item.icon, { className: `size-7 transition-all duration-700 ${screen===item.id ? 'drop-shadow-[0_0_20px_rgba(104,31,239,1)]' : ''}` })}
                      {screen===item.id && <div className="absolute -inset-8 bg-primary/20 rounded-full blur-[50px] animate-pulse -z-10" />}
                    </div>
                    {screen === item.id && (
                        <span className="text-[6px] font-black uppercase tracking-[0.4em] transition-opacity data-font opacity-100 absolute -bottom-6 whitespace-nowrap shadow-2xl bg-background-dark/80 px-2 py-0.5 rounded-full border border-white/5">{item.label}</span>
                    )}
                    {screen===item.id && <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_15px_rgba(104,31,239,1)] animate-bounce mt-2 border-2 border-white/40" />}
                </button>
            ))}
        </nav>
      )}

      {/* BACKGROUND DECORATIVE TERMINAL TEXT (ULTRA DETAIL) */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left ml-4 pointer-events-none opacity-5 z-0 select-none">
          <span className="text-[16px] font-mono tracking-[4em] text-white uppercase leading-none whitespace-nowrap data-font font-black italic opacity-60">CONNECTUM TERMINAL v25.0 // QUANTUM CORE INITIALIZED // [OK] // NEURAL_LINK: [ULTRA_STABLE] // PSY_SYNC_CORE: 9.999 // ENCRYPTION: AES_QUANTUM_256</span>
      </div>
    </div>
  );
}
