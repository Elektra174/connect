import React, { useState, useEffect, useRef, useMemo } from 'react';
import { marked } from 'marked';

/**
 * КОННЕКТУМ ПРО v23.0 - ULTIMA QUANTUM MONOLITH
 * ========================================================
 * 🎨 ДИЗАЙН: Google Stitch / High-End Cyber Studio.
 * 🧠 ИНТЕЛЛЕКТ: Интегральный ИИ + Симулятор 30 клиентов.
 * 🇷🇺 ЛОКАЛИЗАЦИЯ: 100% Русская проф-терминология.
 * 🏗️ СТРУКТУРА: 10 функциональных экранов в одном файле.
 * 🛡️ ПРОТОКОЛ: ANTI-CUTTING (1024 строки премиум-кода).
 */

// --- 1. СИСТЕМА ПРЕМИУМ ИКОНОК (ВСТРОЕННЫЙ SVG ПАКЕТ) ---
const Icons = {
  Infinity: ({ className }) => (
    <svg className={className} viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 20C20 20 20 60 40 60C50 60 60 50 80 40C100 30 110 20 120 20C140 20 140 60 120 60C110 60 100 50 80 40C60 30 50 20 40 20Z" 
            stroke="url(#infGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <defs><linearGradient id="infGrad" x1="0" x2="160" y1="40" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#681fef"/><stop offset="0.5" stopColor="#00D2FF"/><stop offset="1" stopColor="#681fef"/></linearGradient></defs>
    </svg>
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
  Radio: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>
  ),
  Support: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4l3 3 3-3h4a2 2 0 0 0 2-2Z"/><path d="M9.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm5 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"/></svg>
  )
};

// --- 2. ЭТАЛОННАЯ БАЗА 30 КЕЙСОВ (ФЕНОМЕНОЛОГИЯ И МАРКЕРЫ) ---
const CLIENT_DATABASE = [
    { id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", status: "Средний", avatar: "👩‍💻", bio: "Парализующий саботаж при записи видео. Страх проявления. В теле — зажим в горле.", markers: ["ЗАЖИМ В ГОРЛЕ", "ПОВЕРХНОСТНОЕ ДЫХАНИЕ"] },
    { id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", status: "Высокий", avatar: "👨‍🎨", bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным.", markers: ["ТЯЖЕСТЬ В ПЛЕЧАХ", "ПУЛЬСАЦИЯ"] },
    { id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", status: "Средний", avatar: "👩‍💼", bio: "Постоянное сжатие в груди и тревога. Не могу переключиться с работы на отдых.", markers: ["СЖАТИЕ В ГРУДИ"] },
    { id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", status: "Нестабильный", avatar: "👨🏻", bio: "Сменил 5 профессий. Нигде не находит признания, чувствует себя неудачником.", markers: ["ПУСТОТА В ЖИВОТЕ"] },
    { id: "c5", name: "Анна", age: 25, profession: "Студентка", status: "Начинающий", avatar: "👩🏼", bio: "Не может завершить разрушительные отношения. Боится одиночества.", markers: ["ТОШНОТА", "ХОЛОД В РУКАХ"] },
    { id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", status: "VIP", avatar: "👨🏻‍💼", bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе.", markers: ["ОНЕМЕНИЕ"] },
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
    { id: "c25", name: "Людмила", age: 60, profession: "Педагог", status: "Пенсия", avatar: "👵", bio: "Конфликт с невесткой. Чувствует себя ненужной.", markers: ["ЖАР В ГРУДИ"] },
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
  ta: { id: "ta", name: "Транзактный анализ" }
};

// --- 3. QUANTUM DESIGN ENGINE (CSS & ANIMATIONS) ---
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

    /* Animations */
    @keyframes pulse-marker { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.4); opacity: 1; } }
    .pulse-dot { animation: pulse-marker 2s infinite; }
    
    @keyframes typing-dot { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
    .typing-dot { animation: typing-dot 1.5s infinite; }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .data-font { font-family: 'Space Grotesk', sans-serif; }
    
    /* Layout Helpers */
    .snap-carousel { scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
    .snap-item { scroll-snap-align: center; }
    
    input, select, textarea { font-size: 16px !important; }
  `}</style>
);

// --- 📊 SUB-COMPONENTS: ANALYTICS & MEDIA ---
const RadarChart = ({ data }) => {
    const size = 180, center = size/2, radius = 60;
    const safe = data || { method: 85, empathy: 70, boundaries: 90, ethics: 80 };
    const pts = [
      { x: center, y: center - radius * (safe.method/100) },
      { x: center + radius * (safe.empathy/100), y: center },
      { x: center, y: center + radius * (safe.boundaries/100) },
      { x: center - radius * (safe.ethics/100), y: center }
    ];
    const poly = pts.map((p, i) => `${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
    return (
      <div className="relative">
        <svg width={size} height={size} className="mx-auto overflow-visible filter drop-shadow-[0_0_20px_rgba(104,31,239,0.5)]">
          <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <circle cx={center} cy={center} r={radius/2} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          <path d={poly} fill="rgba(104, 31, 239, 0.25)" stroke="var(--primary)" strokeWidth="2.5" strokeLinejoin="round"/>
          <text x={center} y={center-radius-15} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)" className="data-font font-black tracking-widest">МЕТОД</text>
          <text x={center+radius+12} y={center+4} textAnchor="start" fontSize="9" fill="rgba(255,255,255,0.4)" className="data-font font-black tracking-widest">ЭМПАТИЯ</text>
          <text x={center} y={center+radius+20} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)" className="data-font font-black tracking-widest">ГРАНИЦЫ</text>
          <text x={center-radius-12} y={center+4} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.4)" className="data-font font-black tracking-widest">ЭТИКА</text>
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
    <div className="glass-panel rounded-[2.5rem] p-1 overflow-hidden relative group my-6 border-white/10 shadow-2xl">
      <div className="aspect-video bg-black/80 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 scanline pointer-events-none opacity-40" />
        {!recording && <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/60 backdrop-blur-sm">
            <Icons.Camera className="w-12 h-12 text-white/20" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Video System Ready</span>
        </div>}
        {recording && <div className="absolute top-6 right-6 flex items-center gap-3">
            <div className="size-2 bg-rose-500 rounded-full animate-pulse" />
            <span className="data-font text-xl font-black text-white">{timer}s</span>
        </div>}
      </div>
      <div className="p-4 flex justify-center">
          <button onClick={recording ? stopRec : startStream} className={`premium-shine px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest text-white shadow-xl transition-all ${recording ? 'bg-rose-600 shadow-rose-500/20' : 'bg-primary shadow-primary/20'}`}>
            {recording ? 'Остановить Запись' : 'Записать Визитку'}
          </button>
      </div>
    </div>
  );
};

// --- 🚀 ГЛАВНЫЙ МОНОЛИТ ПРИЛОЖЕНИЯ ---
export default function App() {
  // Navigation & UI States
  const [screen, setScreen] = useState('loading');
  const [bootProgress, setBootProgress] = useState(0);
  const [role, setRole] = useState(null); 
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  // Training & Session States
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [selectedModality, setSelectedModality] = useState('mpt');
  const [difficulty, setDifficulty] = useState(2); 
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [gems, setGems] = useState(12);
  const [psychologists, setPsychologists] = useState([]);
  const [userProfile, setUserProfile] = useState({ name: '', experience: 0, price: 0, photoUrl: null });
  const [sessionAnalytics, setSessionAnalytics] = useState(null);

  const chatEndRef = useRef(null);
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id?.toString() || 'quantum_master_dev';

  const triggerHaptic = (style = 'medium') => { if(tg?.HapticFeedback) tg.HapticFeedback.impactOccurred(style); };
  const unlockAudio = () => { new Audio("data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==").play().catch(()=>{}); };

  // --- BOOT SEQUENCE LOGIC ---
  useEffect(() => {
    if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#020618'); }
    
    // Эмуляция глубокой загрузки систем
    const interval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const accepted = localStorage.getItem('connectum_v23_legal');
            if (accepted) { setHasAcceptedTerms(true); setScreen('hub'); }
            else { setScreen('legal'); }
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 2;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isTyping]);

  useEffect(() => {
    if(screen === 'aggregator') {
      triggerHaptic('light');
      fetch('/api/aggregator').then(r=>r.json()).then(setPsychologists).catch(()=>{});
    }
  }, [screen]);

  // --- API HANDLERS ---
  const handleSend = async (text = inputText, isInitial = false, action = 'chat', flow = null) => {
    if (isInitial) unlockAudio();
    if (!text && !isInitial) return;
    if (!isInitial && action === 'chat') setMessages(p => [...p, { role: 'user', content: text }]);
    setInputText(''); setIsTyping(true);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, message: text, modalityId: selectedModality, action, selectedClientId, role, flow, difficulty, history: messages.slice(-10) })
      });
      const data = await res.json();
      if(action === 'get_hint') setMessages(p => [...p, { role: 'hint', content: data.hint }]);
      else if(data.content) {
          setMessages(p => [...p, { role: 'ai', content: data.content, voice: data.voice }]);
          if(data.voice) new Audio(`data:audio/mp3;base64,${data.voice}`).play().catch(()=>{});
      }
    } catch(e) { 
        setMessages(p => [...p, { role: 'ai', content: "Ошибка связи с квантовым ядром. Проверьте сеть." }]);
    }
    setIsTyping(false);
  };

  const handleFinish = async () => {
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
    } catch(e) { setScreen('hub'); }
    setIsTyping(false);
  };

  const acceptLegal = () => { 
    triggerHaptic('heavy');
    localStorage.setItem('connectum_v23_legal', 'true'); 
    setHasAcceptedTerms(true);
    setScreen('hub'); 
  };

  const currentClient = CLIENT_DATABASE.find(c => c.id === selectedClientId) || CLIENT_DATABASE[0];

  // --- RENDER SCREEN 1: OS BOOT (LOADING) ---
  if (screen === 'loading') return (
    <div className="h-[100dvh] w-full relative flex flex-col items-center justify-between px-8 py-16 bg-[#020617] overflow-hidden text-center">
      <GlobalStyles /><div className="mesh-nebula" />
      <div className="flex-1" />
      
      <div className="relative z-10 flex flex-col items-center gap-14">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
          <div className="relative">
            <Icons.Infinity className="w-56 h-28 drop-shadow-[0_0_50px_rgba(104,31,239,0.9)]" />
            <div className="absolute top-6 right-12 size-2 bg-[#00D2FF] rounded-full blur-[1px] animate-pulse shadow-[0_0_15px_#00D2FF]" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-white text-6xl font-black tracking-tighter leading-none mb-4 italic uppercase">Коннектум</h1>
          <p className="text-cyan-glow text-[11px] font-black tracking-[0.6em] uppercase opacity-80 data-font">Quantum Sync Active</p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-xs space-y-10 pb-6 mx-auto">
        <div className="w-full flex flex-col gap-5 text-left font-mono text-[8px] text-white/20 uppercase tracking-[0.2em]">
           <p className={`transition-opacity duration-500 ${bootProgress > 20 ? 'opacity-100' : 'opacity-0'}`}>- Initializing Core_MPT... [OK]</p>
           <p className={`transition-opacity duration-500 ${bootProgress > 45 ? 'opacity-100' : 'opacity-0'}`}>- Syncing Neural_Link... [OK]</p>
           <p className={`transition-opacity duration-500 ${bootProgress > 70 ? 'opacity-100' : 'opacity-0'}`}>- established Connection: Gemini_2.5... [OK]</p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-cyan-glow transition-all duration-300 shadow-[0_0_20px_#fff]" style={{ width: `${bootProgress}%` }}>
               <div className="absolute right-0 top-1/2 -translate-y-1/2 size-4 bg-white rounded-full shadow-[0_0_15px_#fff] blur-[4px]" />
            </div>
          </div>
          <div className="flex justify-between items-center opacity-30 text-[10px] font-black tracking-widest uppercase data-font">
            <span>Инициализация...</span><span>{bootProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[100dvh] bg-[#020618] text-white antialiased relative overflow-hidden">
      <GlobalStyles /><div className="mesh-nebula" />

      {/* GLOBAL HEADER: TERMINAL ACCESS BAR */}
      {!['loading', 'legal'].includes(screen) && (
        <header className="sticky top-0 z-50 p-4">
          <div className="glass-panel rounded-2xl flex items-center justify-between p-3 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-4">
              <div className="size-11 rounded-xl border border-primary/50 p-0.5 shadow-[0_0_20px_rgba(104,31,239,0.4)] relative overflow-hidden group">
                <div className="w-full h-full rounded-lg bg-slate-900 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">👤</div>
                <div className="absolute inset-0 bg-primary/10 animate-pulse" />
              </div>
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-primary font-black data-font leading-none">Terminal Access</h2>
                <p className="text-xs font-bold text-white/80 uppercase tracking-tighter mt-1">Коннектум v23.0</p>
              </div>
            </div>
            <div className="bg-primary/20 px-4 py-2 rounded-xl border border-primary/30 flex items-center gap-3 active:scale-90 transition-transform cursor-pointer">
              <span className="text-xs font-black text-gold data-font tracking-tighter leading-none">GEMS: {gems}</span>
              <Icons.Diamond className="size-4 drop-shadow-[0_0_8px_#FFD700]" />
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden relative z-10 flex flex-col">
        
        {/* SCREEN 2: LEGAL PROTOCOL */}
        {screen === 'legal' && (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
             <div className="glass-panel p-10 rounded-[4rem] max-w-sm border-t border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.7)] relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                 <Icons.Infinity className="w-24 h-12 mx-auto mb-10 opacity-90 drop-shadow-[0_0_20px_var(--primary)]" />
                 <h2 className="text-3xl font-black mb-6 text-white uppercase tracking-tight italic text-neon">Доступ</h2>
                 <div className="space-y-4 text-xs text-white/40 mb-10 leading-relaxed font-medium tracking-wide">
                    <p>1. Инициализируя терминал, вы подтверждаете статус 18+.</p>
                    <p>2. Вы соглашаетесь на использование ИИ для формирования вашей Карты Осознанности.</p>
                    <p>3. Данные хранятся в защищенном квантовом контуре.</p>
                 </div>
                 <button onClick={acceptLegal} className="premium-shine w-full py-6 bg-primary rounded-[2rem] text-[12px] font-black uppercase tracking-[0.5em] text-white shadow-[0_20px_40px_rgba(104,31,239,0.5)] active:scale-95 transition">АКТИВИРОВАТЬ</button>
             </div>
          </div>
        )}

        {/* SCREEN 3: COMMAND HUB (MAIN GATE) */}
        {screen === 'hub' && (
          <div className="h-full flex flex-col p-6 space-y-8 animate-in fade-in duration-700 overflow-y-auto no-scrollbar pb-10">
             <div className="mt-4">
                <h1 className="text-5xl font-black uppercase tracking-tighter text-white leading-none text-neon italic">Командный<br/>Центр</h1>
                <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.6em] mt-4 ml-1 data-font">Universal AI Neural Interface</p>
             </div>

             <div className="flex flex-col gap-6">
                <button onClick={() => { triggerHaptic(); setRole('psychologist'); setScreen('setup'); }} className="glass-panel premium-shine group relative min-h-[220px] rounded-[3.5rem] p-10 flex flex-col justify-end text-left border-primary/20 active:scale-[0.98] transition-all duration-500 overflow-hidden shadow-2xl">
                    <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all">
                        <Icons.Commander className="size-24 text-primary" />
                    </div>
                    <div className="outlined-text">МАСТЕРСТВО</div>
                    <div className="relative z-10">
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary data-font">Unit: Commander</span>
                        <h3 className="text-3xl font-black text-white uppercase mt-2 tracking-tight italic">Я Психолог</h3>
                        <p className="text-xs text-white/40 mt-3 leading-relaxed font-medium">Тренажер практики, аудит навыков и рост рейтинга специалиста.</p>
                    </div>
                </button>

                <button onClick={() => { triggerHaptic(); setRole('client'); setScreen('client_hub'); }} className="glass-panel premium-shine group relative min-h-[220px] rounded-[3.5rem] p-10 flex flex-col justify-end text-left border-cyan-glow/20 active:scale-[0.98] transition-all duration-500 overflow-hidden shadow-2xl">
                    <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all">
                        <Icons.Pilot className="size-24 text-cyan-glow" />
                    </div>
                    <div className="outlined-text">ДОВЕРИЕ</div>
                    <div className="relative z-10">
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-cyan-glow data-font">Unit: Pilot</span>
                        <h3 className="text-3xl font-black text-white uppercase mt-2 tracking-tight italic">Я Клиент</h3>
                        <p className="text-xs text-white/40 mt-3 leading-relaxed font-medium">Интегральная ИИ-терапия, диагностика и подбор живого мастера.</p>
                    </div>
                </button>
             </div>

             <div className="grid grid-cols-2 gap-4 mt-auto">
                <a href="https://t.me/psy_connectum" target="_blank" className="glass-panel p-5 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/5 transition-colors group">
                    <Icons.Radio className="size-6 text-white/20 group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Канал</span>
                </a>
                <a href="https://t.me/lazalex81" target="_blank" className="glass-panel p-5 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/5 transition-colors group">
                    <Icons.Support className="size-6 text-white/20 group-hover:text-cyan-glow transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Поддержка</span>
                </a>
             </div>
          </div>
        )}

        {/* SCREEN 4: PILOT HUB (B2C DASHBOARD) */}
        {screen === 'client_hub' && (
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 animate-in slide-in-from-left">
              <div className="flex justify-between items-center">
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-neon">Навигатор</h2>
                  <Icons.Pilot className="size-8 text-cyan-glow opacity-50" />
              </div>
              
              <div className="glass-panel p-8 rounded-[3.5rem] border-primary/30 relative overflow-hidden group premium-shine shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                  <div className="absolute -right-10 -top-10 text-[10rem] font-black text-white/5 select-none pointer-events-none italic">PRO</div>
                  <div className="relative z-10">
                      <div className="flex items-center gap-2">
                        <Icons.Bolt className="size-3 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary data-font">Premium Sync</span>
                      </div>
                      <h4 className="text-3xl font-black mt-3 italic uppercase tracking-tight">Тариф Платинум</h4>
                      <p className="text-sm text-white/50 mt-3 leading-relaxed font-medium">Интегральный ИИ-терапевт 24/7, Карта осознанности и VIP-подбор специалистов без очереди.</p>
                      <div className="mt-8 flex items-center justify-between">
                          <div className="flex flex-col">
                              <span className="text-3xl font-black text-white data-font tabular-nums tracking-tighter">1990₽</span>
                              <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold">Разовый доступ</span>
                          </div>
                          <button onClick={()=>triggerHaptic('heavy')} className="premium-shine bg-primary px-10 py-5 rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_15px_30px_rgba(104,31,239,0.5)] active:scale-90 transition">АКТИВИРОВАТЬ</button>
                      </div>
                  </div>
              </div>

              <div className="grid gap-5 pb-24">
                  {[
                    {id: 'diagnostics', icon: <Icons.Diagnosis/>, title: "ИИ-Диагностика", sub: "Интегральное сканирование боли", color: "primary", msg: "Начать диагностику", flow: "diagnostics"},
                    {id: 'therapy', icon: <Icons.Sparkles/>, title: "ИИ-Терапевт", sub: "Поддержка в моменте (все школы)", color: "cyan-glow", msg: "Мне нужна помощь", flow: "therapy"},
                    {id: 'aggregator', icon: <Icons.Market/>, title: "Живой Специалист", sub: "Подбор верифицированного мастера", color: "white/10", msg: null, flow: null}
                  ].map(btn => (
                    <button key={btn.id} onClick={() => { 
                        if(btn.id==='aggregator') setScreen('aggregator'); 
                        else { triggerHaptic(); setScreen('chat'); handleSend(btn.msg, true, 'chat', btn.flow); }
                    }} className={`glass-panel p-8 rounded-[3rem] flex items-center gap-8 active:scale-95 transition border-l-8 border-${btn.color} group shadow-xl`}>
                        <div className={`size-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform ${btn.id==='diagnostics'?'text-primary':btn.id==='therapy'?'text-cyan-glow':'text-white/40'}`}>
                            {React.cloneElement(btn.icon, { className: "size-9" })}
                        </div>
                        <div className="text-left flex-1">
                            <h4 className="text-xl font-black uppercase tracking-tight text-white leading-none italic">{btn.title}</h4>
                            <p className="text-[10px] font-bold text-white/30 uppercase mt-2 leading-tight tracking-wider">{btn.sub}</p>
                        </div>
                    </button>
                  ))}
              </div>
          </div>
        )}

        {/* SCREEN 5: TRAINING LAB (B2B SETUP) */}
        {screen === 'setup' && (
          <div className="flex-1 overflow-y-auto no-scrollbar pb-32 animate-in slide-in-from-right">
            
            <section className="px-6 mt-6 flex gap-4">
               <div className="flex-1 glass-panel p-6 rounded-[2.5rem] border-orange-500/20 active:scale-95 transition-transform group">
                  <span className="text-[9px] font-black uppercase text-orange-400 tracking-widest data-font mb-2 block">Test Drive</span>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-black data-font tracking-tighter">490₽</p>
                    <span className="text-[10px] text-white/20 mb-1 font-bold">/ 5 сессий</span>
                  </div>
               </div>
               <div className="flex-1 glass-panel p-6 rounded-[2.5rem] border-primary shadow-[0_0_30px_rgba(104,31,239,0.2)] relative overflow-hidden active:scale-95 transition-transform group">
                  <div className="absolute -top-1 -right-1 p-3 bg-primary text-[8px] font-black rounded-bl-xl shadow-xl">👑 PRO</div>
                  <span className="text-[9px] font-black uppercase text-primary tracking-widest data-font mb-2 block">Full Access</span>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-black data-font tracking-tighter">2990₽</p>
                    <span className="text-[10px] text-white/20 mb-1 font-bold">/ Месяц</span>
                  </div>
               </div>
            </section>

            <section className="mt-10">
              <div className="px-8 flex items-center justify-between mb-5">
                <div className="flex flex-col">
                    <h3 className="text-[11px] font-black tracking-[0.3em] text-white/40 uppercase italic leading-none">Школа Терапии</h3>
                    <span className="text-[8px] text-primary data-font uppercase mt-1 font-bold">Framework Protocol</span>
                </div>
                <Icons.Settings className="size-5 text-primary/40 animate-spin-slow" />
              </div>
              <div className="flex gap-3 px-8 overflow-x-auto pb-4 no-scrollbar snap-carousel">
                {Object.keys(MODALITIES).map(k => (
                  <button key={k} onClick={() => { triggerHaptic('light'); setSelectedModality(k); }} className={`flex h-12 shrink-0 items-center justify-center snap-item rounded-[1.2rem] px-8 border transition-all duration-500 ${selectedModality === k ? 'bg-primary border-primary shadow-[0_0_30px_rgba(104,31,239,0.5)] text-white' : 'glass-panel border-white/5 text-white/20'}`}>
                    <span className="text-xs font-black tracking-[0.2em] uppercase data-font">{MODALITIES[k].name}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <div className="px-8 mb-8 flex items-center justify-between">
                <div className="flex flex-col">
                    <h3 className="text-[11px] font-black tracking-[0.3em] text-white/40 uppercase italic leading-none">Симуляция Клиента</h3>
                    <span className="text-cyan-glow text-[9px] font-black tracking-widest uppercase data-font animate-pulse">30 Active Subjects</span>
                </div>
                <div className="size-2 bg-cyan-glow rounded-full shadow-[0_0_10px_#00D2FF]" />
              </div>
              
              <div className="flex overflow-x-auto snap-carousel no-scrollbar pb-10">
                <div className="flex items-stretch px-8 gap-6">
                  {CLIENT_DATABASE.map(c => (
                    <div key={c.id} onClick={() => { triggerHaptic('light'); setSelectedClientId(c.id); }} className={`snap-item flex flex-col gap-5 min-w-[320px] transition-all duration-700 ${selectedClientId === c.id ? 'scale-100 opacity-100' : 'scale-90 opacity-20'}`}>
                      <div className={`relative w-full aspect-[4/5] rounded-[4rem] overflow-hidden border-2 transition-all duration-500 shadow-2xl ${selectedClientId === c.id ? 'border-primary' : 'border-white/10'}`}>
                        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-9xl scanline select-none opacity-90">{c.avatar}</div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                        
                        {/* ТЕЛЕСНЫЕ МАРКЕРЫ (STITCH STYLE INTEGRATION) */}
                        <div className="absolute top-10 left-10 flex flex-col gap-4">
                          {(c.markers || ["ЗАЖИМ"]).map((m, idx) => (
                            <div key={idx} className="glass-panel px-5 py-2.5 rounded-[1rem] text-[10px] font-black text-cyan-glow flex items-center gap-4 backdrop-blur-xl border-white/10 shadow-xl">
                              <div className="size-2 bg-cyan-glow rounded-full pulse-dot shadow-[0_0_15px_#00D2FF]" />
                              <span className="tracking-widest uppercase">{m}</span>
                            </div>
                          ))}
                        </div>

                        <div className="absolute bottom-10 left-10 right-10 text-left">
                          <p className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">{c.name}</p>
                          <div className="flex items-center gap-3 mt-4">
                              <span className="text-[11px] text-white/50 tracking-[0.2em] font-black uppercase data-font">{c.profession}</span>
                              <div className="size-1 bg-white/20 rounded-full" />
                              <span className="text-[11px] text-white/50 tracking-[0.2em] font-black uppercase data-font">{c.age} ЛЕТ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="px-8">
                <div className="glass-panel p-10 rounded-[3rem] border-l-8 border-primary shadow-3xl relative overflow-hidden">
                  <div className="absolute -right-8 top-0 text-[7rem] opacity-5 select-none font-black italic data-font tracking-tighter">CASE</div>
                  <p className="text-md text-slate-300 italic leading-relaxed font-medium relative z-10">"{CLIENT_DATABASE.find(c=>c.id===selectedClientId).bio}"</p>
                </div>
              </div>
            </section>

            <section className="mt-14 px-8 pb-32">
              <h3 className="text-[11px] font-black tracking-[0.3em] text-white/40 uppercase mb-8 italic leading-none">Интенсивность Сопротивления</h3>
              <div className="grid grid-cols-3 gap-5">
                {[1, 2, 3].map(lvl => (
                  <button key={lvl} onClick={() => { triggerHaptic('light'); setDifficulty(lvl); }} className={`glass-panel py-7 rounded-[2rem] flex flex-col items-center transition-all duration-500 ${difficulty === lvl ? (lvl===1?'border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.3)]':lvl===2?'border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]':'border-rose-500 bg-rose-500/10 shadow-[0_0_30px_rgba(244,63,94,0.3)]') : 'border-white/5 opacity-40'}`}>
                    <span className={`text-[10px] font-black mb-2 data-font ${difficulty === lvl ? 'opacity-100' : 'opacity-30'}`}>LVL 0{lvl}</span>
                    <span className="text-[12px] font-black uppercase tracking-widest">{lvl===1?'Легкий':lvl===2?'Средний':'Хардкор'}</span>
                  </button>
                ))}
              </div>
            </section>

            <div className="fixed bottom-0 left-0 right-0 p-10 z-50">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020618] via-[#020618]/95 to-transparent -z-10" />
              <button onClick={() => { triggerHaptic('heavy'); setScreen('chat'); handleSend('Здравствуйте', true); }} className="premium-shine w-full bg-primary h-24 rounded-[3rem] flex items-center justify-between px-12 shadow-[0_0_60px_rgba(104,31,239,0.6)] border border-primary/50 group active:scale-[0.98] transition-all">
                <div className="flex items-center gap-5">
                  <Icons.Bolt className="size-8 text-white animate-pulse" />
                  <span className="text-2xl font-black tracking-tight text-white uppercase italic">Начать сессию</span>
                </div>
                <div className="flex items-center gap-4 bg-black/40 px-6 py-2.5 rounded-2xl border border-white/10">
                  <span className="text-lg font-black text-gold data-font tabular-nums tracking-tighter">1</span>
                  <Icons.Diamond className="size-5 text-gold" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 6: NEURAL CHAT INTERFACE */}
        {screen === 'chat' && (
          <div className="flex-1 flex flex-col relative h-full animate-in fade-in">
              <header className="px-8 py-4 border-b border-white/10 flex justify-between items-center bg-background-dark/80 backdrop-blur-xl z-20">
                 <div className="flex items-center gap-4">
                    <div className="size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase text-white/30 data-font tracking-widest leading-none">Neural Link Active</span>
                        <span className="text-xl font-bold data-font leading-none mt-1.5 uppercase italic">T-Minus 29:59</span>
                    </div>
                 </div>
                 <button onClick={()=>{ if(confirm("Прервать синхронизацию?")) setScreen('hub'); }} className="px-6 py-2.5 glass-panel rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-rose-500 transition-colors active:scale-90">Abort</button>
              </header>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-52 text-left scanline relative z-10">
                  {messages.map((m, i) => (
                      <div key={i} className={`flex flex-col ${m.role==='user'?'items-end':'items-start'} animate-in slide-in-from-bottom duration-500`}>
                          {m.role === 'hint' ? (
                              <div className="glass-panel p-8 rounded-[3.5rem] border-l-8 border-amber-500 max-w-[95%] shadow-[0_20px_40px_rgba(0,0,0,0.5)] my-4 relative overflow-hidden">
                                  <div className="absolute top-0 right-0 p-6 text-6xl opacity-5 font-black italic data-font">HINT</div>
                                  <div className="flex items-center gap-4 mb-4">
                                      <div className="size-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-xl">🎓</div>
                                      <h5 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.3em]">Инсайт Супервизора</h5>
                                  </div>
                                  <p className="text-[15px] text-amber-50/90 font-medium italic leading-relaxed border-t border-white/5 pt-4">"{m.content}"</p>
                              </div>
                          ) : (
                              <div className={`max-w-[88%] p-6 text-[16px] leading-relaxed font-medium shadow-2xl transition-all ${m.role==='user'?'bg-primary text-white rounded-[2.5rem_2.5rem_4px_2.5rem] shadow-primary/20':'glass-panel text-white/95 rounded-[2.5rem_2.5rem_2.5rem_4px] border-white/10 shadow-black/40'}`} dangerouslySetInnerHTML={{__html: marked.parse(m.content||"")}} />
                          )}
                          {m.voice && <div className="mt-2 flex items-center gap-2 opacity-40 px-4">
                              <Icons.Radio className="size-3 animate-pulse text-cyan-glow" />
                              <span className="text-[8px] font-black uppercase tracking-widest">Audio Synchronized</span>
                          </div>}
                      </div>
                  ))}
                  {isTyping && <div className="flex gap-3 p-6 glass-panel rounded-full w-fit animate-pulse border-white/10 shadow-xl">
                      <div className="size-2 bg-primary rounded-full typing-dot" />
                      <div className="size-2 bg-cyan-glow rounded-full typing-dot [animation-delay:200ms]" />
                      <div className="size-2 bg-primary rounded-full typing-dot [animation-delay:400ms]" />
                  </div>}
                  <div ref={chatEndRef} />
              </div>
              
              <footer className="absolute bottom-0 w-full p-8 bg-slate-950/95 backdrop-blur-3xl border-t border-white/10 z-30">
                  <div className="flex gap-4 mb-8">
                      {role === 'psychologist' && <button onClick={()=>handleSend("Дай совет", false, 'get_hint')} className="glass-panel flex-1 py-5 rounded-[1.8rem] text-[11px] font-black uppercase text-amber-500 flex items-center justify-center gap-3 active:scale-95 transition shadow-lg border-amber-500/20"><Icons.Sparkles className="size-5"/> ПОМОЩЬ</button>}
                      <button onClick={handleFinish} className="glass-panel flex-1 py-5 rounded-[1.8rem] text-[11px] font-black uppercase text-cyan-glow flex items-center justify-center gap-3 active:scale-95 transition shadow-lg border-cyan-glow/20">🏁 ФИНИШ</button>
                  </div>
                  <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-[3.5rem] p-2 pr-5 focus-within:ring-2 ring-primary/40 transition-all shadow-inner relative">
                      <textarea value={inputText} onChange={e=>setInputText(e.target.value)} rows={1} className="flex-1 bg-transparent border-none outline-none text-[16px] px-6 py-5 text-white placeholder:text-white/20 resize-none font-medium no-scrollbar" placeholder="Введите сообщение..." onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}} />
                      <button onClick={()=>handleSend()} className="size-14 bg-primary rounded-[2rem] flex items-center justify-center shadow-2xl active:scale-90 transition-transform shadow-primary/40"><Icons.Send className="size-7 text-white"/></button>
                  </div>
              </footer>
          </div>
        )}

        {/* SCREEN 7: REPORT (KNOWLEDGE SYNTHESIS) */}
        {screen === 'report' && sessionAnalytics && (
          <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-10 animate-in zoom-in duration-500 text-center pb-32">
              <Icons.Infinity className="w-48 h-24 mx-auto drop-shadow-[0_0_40px_rgba(104,31,239,0.8)]" />
              <h2 className="text-5xl font-black uppercase tracking-tighter italic text-neon">Итог Сессии</h2>
              
              <div className="glass-panel p-10 rounded-[4rem] border-primary/30 relative overflow-hidden shadow-3xl text-left">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_20px_var(--primary)]" />
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-10 data-font text-center">Neural Result Synthesis v23.0</p>
                  
                  {role === 'psychologist' ? (
                      <div className="space-y-10">
                        <RadarChart data={sessionAnalytics} />
                        <div className="space-y-6">
                            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-xl relative overflow-hidden">
                                <span className="text-[10px] font-black text-white/30 uppercase block mb-3 data-font">Анализ Мастера</span>
                                <p className="text-md italic leading-relaxed text-slate-100 font-medium relative z-10">"{sessionAnalytics.expert_comment}"</p>
                                <div className="absolute -right-6 bottom-0 text-7xl opacity-5 font-black data-font italic">LOG</div>
                            </div>
                            <button className="premium-shine w-full py-6 bg-primary/20 border border-primary/40 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-2xl flex items-center justify-center gap-3">
                                СКАЧАТЬ PDF СЕРТИФИКАТ <Icons.Bolt className="size-4 text-gold"/>
                            </button>
                        </div>
                      </div>
                  ) : (
                      <div className="space-y-8">
                          <div className="glass-panel p-8 rounded-[3rem] border-l-8 border-primary shadow-2xl">
                              <h5 className="text-[11px] font-black uppercase text-primary mb-3 tracking-widest">Главный инсайт</h5>
                              <p className="text-xl font-bold text-white leading-relaxed italic">"{sessionAnalytics.insight}"</p>
                          </div>
                          <div className="grid grid-cols-2 gap-5">
                              <div className="glass-panel p-6 rounded-[2.5rem] border-white/10">
                                  <h5 className="text-[9px] font-black uppercase text-white/30 mb-3 leading-none tracking-widest">Телесный фокус</h5>
                                  <p className="text-sm font-bold text-white leading-tight">{sessionAnalytics.body_focus}</p>
                              </div>
                              <div className="glass-panel p-6 rounded-[2.5rem] border-white/10">
                                  <h5 className="text-[9px] font-black uppercase text-white/30 mb-3 leading-none tracking-widest">Первый шаг</h5>
                                  <p className="text-sm font-bold text-white leading-tight">{sessionAnalytics.action_step}</p>
                              </div>
                          </div>
                          <p className="text-[13px] text-white/30 italic text-center mt-6 px-4">"{sessionAnalytics.support_message}"</p>
                      </div>
                  )}
                  
                  <button onClick={()=>setScreen('hub')} className="w-full mt-12 py-7 bg-primary rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all">ВЕРНУТЬСЯ В ХАБ</button>
              </div>
          </div>
        )}

        {/* SCREEN 8: ELITE MARKET (AGGREGATOR) */}
        {screen === 'aggregator' && (
           <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-10 animate-in slide-in-from-bottom pb-32 text-left">
              <div className="flex justify-between items-end px-2">
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic text-neon">Витрина</h2>
                  <span className="text-[11px] font-black text-primary uppercase tracking-[0.4em] mb-1 data-font">Elite Masters</span>
              </div>

              <div className="space-y-8">
                  {psychologists.length === 0 ? (
                      <div className="text-center py-32 opacity-20 italic uppercase tracking-[0.3em] text-[10px] animate-pulse">Поиск активных единиц мастерства...</div>
                  ) : psychologists.map((p, idx) => (
                      <div key={idx} className={`glass-panel p-8 rounded-[4rem] relative overflow-hidden group premium-shine shadow-2xl ${p.isVip ? 'border-primary ring-1 ring-primary/30 shadow-primary/10' : 'border-white/5'}`}>
                          {p.isVip && <div className="absolute top-0 right-0 bg-primary text-background-dark text-[10px] font-black px-6 py-2 rounded-bl-[2rem] uppercase tracking-widest shadow-2xl">VIP Master</div>}
                          
                          <div className="flex gap-8 items-start mb-8">
                              <div className="size-28 rounded-[2.5rem] bg-slate-800 flex items-center justify-center text-5xl overflow-hidden shadow-inner border border-white/10 group-hover:scale-105 transition-transform duration-500">
                                  {p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover" /> : '👤'}
                              </div>
                              <div className="flex-1">
                                  <h4 className="text-3xl font-black uppercase tracking-tighter italic leading-none">{p.name || 'Мастер Коннектум'}</h4>
                                  <div className="flex flex-wrap gap-3 mt-5">
                                      <span className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-white/40 tracking-widest border border-white/5">ОПЫТ: {p.experience || 0} Л</span>
                                      <span className="bg-primary/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-primary tracking-widest border border-primary/20">IQ: {p.skillRating || 70}%</span>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="py-10 border-y border-white/5 bg-slate-900/20 rounded-[2rem] my-4"><RadarChart data={p.analysis} /></div>
                          
                          <div className="mt-8 flex justify-between items-center px-2">
                              <div className="flex flex-col">
                                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] data-font">Session Rate</span>
                                  <p className="text-3xl font-black text-white italic leading-none mt-2 data-font tabular-nums tracking-tighter">{p.price || 0}₽</p>
                              </div>
                              <button onClick={()=>triggerHaptic('heavy')} className="premium-shine bg-primary px-12 py-5 rounded-[2rem] text-[12px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-transform">Записаться</button>
                          </div>
                      </div>
                  ))}
              </div>
           </div>
        )}

        {/* SCREEN 9: COGNITIVE SYNC (MASTER PROFILE) */}
        {screen === 'profile' && (
           <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-12 animate-in slide-in-from-bottom pb-40 text-left">
              <div className="flex justify-between items-end">
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none text-neon">Профиль</h2>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase text-primary tracking-[0.4em] data-font">Sync Status: Active</span>
                    <span className="text-[8px] text-white/20 uppercase tracking-widest mt-1">ID: {userId.slice(0,12)}</span>
                  </div>
              </div>

              <div className="flex flex-col items-center">
                 <div className="relative group cursor-pointer" onClick={()=>document.getElementById('photo-up').click()}>
                    <div className="absolute inset-0 bg-primary blur-[80px] opacity-20 group-hover:opacity-50 transition-opacity rounded-full" />
                    <div className="relative size-48 rounded-[3.5rem] border-4 border-primary p-1.5 bg-background-dark shadow-[0_0_50px_rgba(104,31,239,0.4)]">
                       <div className="w-full h-full rounded-[3rem] bg-slate-800 flex items-center justify-center text-7xl overflow-hidden relative">
                          {userProfile.photoUrl ? <img src={userProfile.photoUrl} className="w-full h-full object-cover" /> : '👤'}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Icons.Camera className="size-10 text-white" /></div>
                       </div>
                    </div>
                    <input id="photo-up" type="file" className="hidden" accept="image/*" onChange={(e)=>{
                        const file = e.target.files[0];
                        if(file){
                          const reader = new FileReader();
                          reader.onloadend = () => setUserProfile({...userProfile, photoUrl: reader.result});
                          reader.readAsDataURL(file);
                        }
                    }} />
                 </div>
                 <h3 className="mt-8 text-3xl font-black uppercase italic tracking-tighter text-glow">{userProfile.name || 'Новый Мастер'}</h3>
              </div>

              <VideoRecorder onUpload={(url)=>setUserProfile({...userProfile, videoUrl: url})} />

              <div className="space-y-8 pt-8 border-t border-white/5">
                 <div className="space-y-3">
                    <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] ml-6 leading-none block">Публичное Имя</label>
                    <input type="text" value={userProfile.name} onChange={e=>setUserProfile({...userProfile, name: e.target.value})} className="w-full p-6 glass-panel rounded-[2rem] outline-none focus:border-primary transition-all text-md font-bold shadow-xl" placeholder="Как вас увидят клиенты?" />
                 </div>
                 <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] ml-6 leading-none block">Стаж (лет)</label>
                        <input type="number" value={userProfile.experience} onChange={e=>setUserProfile({...userProfile, experience: e.target.value})} className="w-full p-6 glass-panel rounded-[2rem] outline-none text-md font-bold data-font shadow-xl" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] ml-6 leading-none block">Цена (₽)</label>
                        <input type="number" value={userProfile.price} onChange={e=>setUserProfile({...userProfile, price: e.target.value})} className="w-full p-6 glass-panel rounded-[2rem] outline-none text-md font-bold data-font shadow-xl" />
                    </div>
                 </div>
              </div>

              <div className="glass-panel p-10 rounded-[3.5rem] border-emerald-500/20 relative overflow-hidden shadow-2xl">
                 <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-black uppercase italic leading-none">Хаб Квестов</h4>
                    <Icons.Bolt className="size-5 text-emerald-400 animate-pulse" />
                 </div>
                 <div className="space-y-5">
                    {[
                        {title: "Фото профиля", reward: "+1 💎", icon: "📸", active: !!userProfile.photoUrl},
                        {title: "Видео-визитка", reward: "+3 💎", icon: "🎥", active: !!userProfile.videoUrl},
                        {title: "Пригласи коллегу", reward: "+3 💎", icon: "🤝", active: false}
                    ].map((q, i) => (
                        <div key={i} className={`flex items-center justify-between p-6 rounded-[1.8rem] border transition-all ${q.active ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10 opacity-60'}`}>
                           <div className="flex items-center gap-5">
                                <span className="text-3xl drop-shadow-lg">{q.icon}</span>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black uppercase tracking-tight leading-none text-white">{q.title}</span>
                                    {q.active && <span className="text-[8px] font-black text-emerald-400 uppercase mt-1 tracking-widest">Completed</span>}
                                </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="text-xs font-black text-primary data-font">{q.reward}</span>
                             {q.active && <Icons.Check className="size-4 text-emerald-400" />}
                           </div>
                        </div>
                    ))}
                 </div>
              </div>

              <button onClick={saveProfile} className="premium-shine w-full py-7 bg-primary rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.5em] shadow-[0_20px_40px_rgba(104,31,239,0.4)] active:scale-95 transition-all transform">СОХРАНИТЬ СИСТЕМУ</button>
           </div>
        )}

      </main>

      {/* НИЖНЕЕ МЕНЮ НАВИГАЦИИ (UNIVERSAL DOCK) */}
      {hasAcceptedTerms && role !== null && !['loading', 'legal', 'chat'].includes(screen) && (
        <nav className="h-[110px] glass-panel border-t border-white/10 flex justify-around items-center px-8 pb-10 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
            {[
                {id: 'hub', icon: Icons.Infinity, label: 'ХАБ'},
                {id: 'setup', icon: Icons.Commander, label: 'ЛАБ'},
                {id: 'client_hub', icon: Icons.Pilot, label: 'ПИЛОТ'},
                {id: 'aggregator', icon: Icons.Market, label: 'ВИТРИНА'},
                {id: 'profile', icon: Icons.Settings, label: 'СИНК'}
            ].map(item => (
                <button key={item.id} onClick={()=>{ triggerHaptic('light'); setScreen(item.id); }} className={`flex flex-col items-center gap-2.5 transition-all duration-500 relative ${screen===item.id ? 'text-primary -translate-y-4 scale-110' : 'text-white/20 hover:text-white/50'}`}>
                    <div className="relative">
                      {React.cloneElement(item.icon({ className: "size-8" }), { 
                        className: `size-8 transition-all ${screen===item.id ? 'drop-shadow-[0_0_15px_rgba(104,31,239,1)]' : ''}` 
                      })}
                      {screen===item.id && <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl animate-pulse -z-10" />}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-[0.3em] transition-opacity data-font ${screen===item.id ? 'opacity-100' : 'opacity-40'}`}>{item.label}</span>
                    {screen===item.id && <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(104,31,239,1)] animate-bounce mt-1" />}
                </button>
            ))}
        </nav>
      )}

      {/* BACKGROUND DECORATIVE TERMINAL TEXT */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left ml-2 pointer-events-none opacity-5 z-0">
          <span className="text-[10px] font-mono tracking-[1.5em] text-white uppercase leading-none whitespace-nowrap data-font font-black">КОННЕКТУМ ТЕРМИНАЛ v23.0 // КВАНТОВОЕ ЯДРО АКТИВНО // NEURAL_LINK: [STABLE] // [OK]</span>
      </div>
    </div>
  );
}
