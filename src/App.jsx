import React, { useState, useEffect, useRef, useMemo } from 'react';
import { marked } from 'marked';

/**
 * ========================================================
 * CONNECTUM PRO v21.26.3 - PLATINUM MASTER EDITION
 * ========================================================
 * * 🎨 ДИЗАЙН: "Premium AI Studio" 
 * - Цветовая схема: Deep Slate (#020617), Indigo Neon, Glassmorphism.
 * - Шрифты: Manrope (300-800).
 * - Оптимизация: Mobile-First, Safe Areas для Telegram.
 * * 🧠 ИНТЕЛЛЕКТ:
 * - Ядро: YandexGPT Pro (через REST Assistant).
 * - Контекст: RAG (Retrieval-Augmented Generation) поддержка.
 * - Супервизия: Интерактивные советы в режиме реального времени.
 * * 💎 ЭКОНОМИКА:
 * - Валюта: Diamonds (Бриллианты).
 * - Синхронизация: Firestore Transactional Sync.
 * * 🛠️ ТЕХНИЧЕСКИЙ СТЕК:
 * - React 18+, Tailwind CSS, Marked.js.
 * - Telegram WebApp SDK v6.1+.
 * * © 2026 Connectum Master Team. Все права защищены.
 * ========================================================
 */

// --- 1. СИСТЕМА ИКОНОК (ВЫСОКАЯ ТОЧНОСТЬ ЛИНИЙ) ---

/**
 * Набор SVG-иконок с градиентной заливкой Indigo-Purple.
 * Все иконки масштабируемы и поддерживают динамические классы Tailwind.
 */
const Icons = {
  Infinity: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="infGradMaster" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <path 
        d="M7 9C4.5 9 2.5 10.34 2.5 12C2.5 13.66 4.5 15 7 15C8.5 15 9.8 14.1 11 13L13 11C14.2 9.9 15.5 9 17 9C19.5 9 21.5 10.34 21.5 12C21.5 13.66 19.5 15 17 15C15.5 15 14.2 14.1 13 13L11 11C9.8 9.9 8.5 9 7 9Z" 
        stroke="url(#infGradMaster)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  ),
  Search: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  User: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z"/>
    </svg>
  ),
  Diamond: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="diamGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d="M6 4h12l4 5-10 11L2 9l4-5Z" fill="url(#diamGrad)" fillOpacity="0.2" stroke="url(#diamGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 4l1 5 1-5M2 9h20M7 4l5 5 5-5M12 20V9" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
    </svg>
  ),
  ChevronLeft: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  ),
  Send: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  ),
  Telegram: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5M9 13.5V19L12 15.5"/>
    </svg>
  ),
  Support: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <path d="M12 7v4"/><path d="M12 15h.01"/>
    </svg>
  ),
  Camera: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Check: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  )
};

// --- 2. ГЛОБАЛЬНАЯ БАЗА КЛИЕНТОВ (30 ДЕТАЛИЗИРОВАННЫХ КЕЙСОВ) ---

/**
 * Реестр клиентов для тренажера.
 * Каждый объект содержит ID, Имя, Возраст, Профессию, Аватар и Биографию (Bio).
 */
const CLIENT_DATABASE = [
  { 
    id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", avatar: "👩‍💻", 
    bio: "Парализующий саботаж при записи видео. Страх проявления зашкаливает. В теле чувствует жесткий зажим в горле при попытке говорить на камеру." 
  },
  { 
    id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", avatar: "👨‍🎨", 
    bio: "Боится закончить масштабный заказ. Кажется, что результат будет бездарным. Ощущает свинцовую тяжесть в плечах и холод в кистях рук." 
  },
  { 
    id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", avatar: "👩‍💼", 
    bio: "Постоянное сжатие в груди и тревога за будущее. Не может переключиться с работы на отдых, чувствует себя 'функцией', а не человеком." 
  },
  { 
    id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", avatar: "👨🏻", 
    bio: "Сменил 5 профессий за 2 года. Нигде не находит признания, чувствует себя тотальным неудачником. В теле — пустота в районе солнечного сплетения." 
  },
  { 
    id: "c5", name: "Анна", age: 25, profession: "Студентка", avatar: "👩🏼", 
    bio: "Не может завершить разрушительные отношения. Боится одиночества до тошноты. Ощущает 'колючую проволоку' вокруг сердца." 
  },
  { 
    id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", avatar: "👨🏻‍💼", 
    bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе и холод. Чувство, что жизнь проходит мимо него за толстым стеклом." 
  },
  { 
    id: "c7", name: "Ольга", age: 38, profession: "Врач", avatar: "👩🏻", 
    bio: "Ипохондрия. Паника при малейшем физическом дискомфорте. Постоянно сканирует тело на наличие смертельных болезней." 
  },
  { 
    id: "c8", name: "Дмитрий", age: 29, profession: "Продавец", avatar: "🧔🏻", 
    bio: "Боится встреч и публичных выступлений. Напряжение в скулах и зажим речи. Кажется, что все на него смотрят с осуждением." 
  },
  { 
    id: "c9", name: "Мария", age: 33, profession: "Домохозяйка", avatar: "👩‍🍼", 
    bio: "Материнская вина. Ощущение, что она плохая мать. Не может вздохнуть полной грудью, чувствует 'плиту' на спине." 
  },
  { 
    id: "c10", name: "Сергей", age: 50, profession: "Предприниматель", avatar: "👨🏻‍🦳", 
    bio: "Банкротство бизнеса. Колоссальный стыд перед семьей. Чувствует себя раздавленным и старым, в теле — дрожь в ногах." 
  },
  { 
    id: "c11", name: "Юлия", age: 27, profession: "Модель", avatar: "👩🏻", 
    bio: "РПП. Ненавидит свое отражение. Постоянный контроль веса и страх еды. Ощущает себя 'грязной' изнутри." 
  },
  { 
    id: "c12", name: "Андрей", age: 35, profession: "Архитектор", avatar: "👨🏿", 
    bio: "Вспышки неконтролируемого гнева на близких. Ощущение кипятка в груди, который ищет выхода. Потом наступает тяжелый стыд." 
  },
  { 
    id: "c13", name: "Наталья", age: 40, profession: "Учитель", avatar: "👩‍💼", 
    bio: "Одиночество в толпе. Живет как за толстым стеклом. Постоянная потребность заслуживать любовь через помощь другим." 
  },
  { 
    id: "c14", name: "Павел", age: 22, profession: "Курьер", avatar: "👱🏻", 
    bio: "Тотальная зависимость от мнения родителей. Не может принять ни одного решения самостоятельно. В теле — ватные руки." 
  },
  { 
    id: "c15", name: "Екатерина", age: 36, profession: "HR-директор", avatar: "👩‍🏫", 
    bio: "Профессиональное выгорание. Перфекционизм. Жжение в глазах от истощения. Чувство, что она всем должна." 
  },
  { 
    id: "c16", name: "Александр", age: 44, profession: "Инженер", avatar: "👨🏻", 
    bio: "Застрял в горе после утраты. Чувствует вину перед ушедшим близким. Ощущение камня в животе, который тянет вниз." 
  },
  { 
    id: "c17", name: "Светлана", age: 30, profession: "Бьюти-мастер", avatar: "👩🏼", 
    bio: "Низкая самооценка. Считает себя 'недостаточной' для любви и успеха. Постоянно сравнивает себя с другими в соцсетях." 
  },
  { 
    id: "c18", name: "Роман", age: 32, profession: "Аналитик", avatar: "👨🏿‍💻", 
    bio: "Игровая зависимость. Уход от реальности в виртуальный мир. Страх перед реальными отношениями и ответственностью." 
  },
  { 
    id: "c19", name: "Ирина", age: 48, profession: "Юрист", avatar: "👵🏼", 
    bio: "Синдром пустого гнезда. Дети выросли, смысл жизни пропал. Ощущение сквозняка в груди и ненужности." 
  },
  { 
    id: "c20", name: "Кирилл", age: 26, profession: "Дизайнер", avatar: "👦🏻", 
    bio: "Агорафобия. Боится выходить на открытые пространства. Панические атаки при мысли о поездке в метро." 
  },
  { 
    id: "c21", name: "Татьяна", age: 55, profession: "Пенсионерка", avatar: "👩🏻‍🦱", 
    bio: "Кризис старения. Ощущение, что время уходит впустую. Страх смерти и одинокой старости." 
  },
  { 
    id: "c22", name: "Виктор", age: 39, profession: "Водитель", avatar: "🧔", 
    bio: "Переживает измену жены. Не может спать и есть. Чувство, что в груди раскаленный уголь." 
  },
  { 
    id: "c23", name: "Алина", age: 24, profession: "Бариста", avatar: "👩‍🎓", 
    bio: "Не умеет говорить 'нет'. Чувствует, что все ею пользуются. Постоянное напряжение в шее и плечах." 
  },
  { 
    id: "c24", name: "Денис", age: 37, profession: "Охранник", avatar: "👨🏻", 
    bio: "Навязчивые мысли о безопасности. Десятки раз проверяет замки и плиту. Жизнь в постоянном контроле." 
  },
  { 
    id: "c25", name: "Людмила", age: 60, profession: "Педагог", avatar: "👵", 
    bio: "Конфликт с невесткой. Чувствует себя лишней в семье сына. Ощущение горечи во рту и ком в горле." 
  },
  { 
    id: "c26", name: "Максим", age: 21, profession: "Блогер", avatar: "👦🏼", 
    bio: "Подростковый бунт против системы, затянувшийся во времени. Ничего не хочет делать, апатия, пустота." 
  },
  { 
    id: "c27", name: "Валерия", age: 31, profession: "Стилист", avatar: "👩🏻‍🦰", 
    bio: "Болезненная ревность. Постоянный поиск улик измены. Чувство, что она сходит с ума от подозрений." 
  },
  { 
    id: "c28", name: "Станислав", age: 43, profession: "Адвокат", avatar: "👨🏻‍💼", 
    bio: "Трудоголизм как способ убежать от проблем в семье. Не умеет расслабляться без алкоголя." 
  },
  { 
    id: "c29", name: "Евгения", age: 29, profession: "Копирайтер", avatar: "👩🏻", 
    bio: "Страх перемен. Боится менять работу, даже если там плохо. Ощущение, что она в капкане." 
  },
  { 
    id: "c30", name: "Константин", age: 35, profession: "Финансист", avatar: "👨🏻", 
    bio: "Эмоциональная холодность. Не понимает, что чувствует, не может сопереживать близким. Ощущение робота." 
  }
];

// --- 3. МОДАЛЬНОСТИ (МЕТОДОЛОГИЧЕСКОЕ ЯДРО) ---

const MODALITIES = {
  mpt: { id: "mpt", name: "МПТ", color: "indigo", desc: "Мета-персональная терапия" },
  cbt: { id: "cbt", name: "КПТ", color: "emerald", desc: "Когнитивно-поведенческая терапия" },
  gestalt: { id: "gestalt", name: "Гештальт", color: "purple", desc: "Гештальт-терапия" },
  eit: { id: "eit", name: "ЭОТ", color: "amber", desc: "Эмоционально-образная терапия" },
  psychoanalysis: { id: "psychoanalysis", name: "Психоанализ", color: "rose", desc: "Классический психоанализ" },
  ta: { id: "ta", name: "ТА", color: "cyan", desc: "Транзактный анализ" }
};

// --- 4. ПРЕМИАЛЬНЫЕ СТИЛИ (STYLING LAYER) ---

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
    :root { 
      --bg-deep: #020617; 
      --card-glass: rgba(15, 23, 42, 0.7); 
      --card-border: rgba(255, 255, 255, 0.08); 
      --accent-primary: #6366f1; 
      --accent-secondary: #a855f7;
    }
    
    body { 
      font-family: 'Manrope', sans-serif; 
      background-color: var(--bg-deep); 
      color: #f8fafc; 
      overflow: hidden; 
      margin: 0; 
      -webkit-tap-highlight-color: transparent;
    }

    /* Фоновый меш-градиент */
    .mesh-bg { 
      position: fixed; 
      inset: 0; 
      z-index: -1; 
      background: 
        radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.12), transparent 50%),
        radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.08), transparent 50%); 
      filter: blur(80px); 
    }

    /* Стеклянные карточки */
    .glass-card { 
      background: var(--card-glass); 
      backdrop-filter: blur(24px); 
      border: 1px solid var(--card-border); 
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    }

    /* Анимации появления */
    .animate-in { animation: fadeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

    /* Segmented Control (iOS Style) */
    .segmented-control { 
      display: flex; 
      background: rgba(255,255,255,0.04); 
      border-radius: 1.2rem; 
      padding: 4px; 
      position: relative; 
      border: 1px solid var(--card-border);
    }
    .segment-btn { 
      flex: 1; 
      padding: 12px 0; 
      font-size: 10px; 
      font-weight: 800; 
      text-transform: uppercase; 
      z-index: 10; 
      transition: color 0.3s; 
      color: #64748b; 
      border: none; 
      background: none;
      cursor: pointer;
    }
    .segment-btn.active { color: #fff; }
    .segment-slider { 
      position: absolute; 
      top: 4px; 
      bottom: 4px; 
      background: var(--accent-primary); 
      border-radius: 1rem; 
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.5); 
    }

    /* Утилиты */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .diamond-glow { filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.8)); }
    .btn-magnetic:active { transform: scale(0.97); transition: transform 0.1s; }
  `}</style>
);

// --- 5. КОМПОНЕНТ VIDEO RECORDER (ПРЕМИУМ ВИЗИТКА) ---

/**
 * VideoRecorder - компонент для записи видео-визитки психолога.
 * @param {function} onUpload - Callback при завершении записи.
 */
const VideoRecorder = ({ onUpload }) => {
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'video/webm' });
        const reader = new FileReader();
        reader.onloadend = () => onUpload(reader.result);
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorder.current.start();
      setRecording(true);
    } catch (e) { 
      console.error("Camera access denied or device not found"); 
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="glass-card rounded-[2.2rem] p-1 overflow-hidden relative group my-6 shadow-5xl border-t border-white/10">
      <div className="aspect-video bg-black/60 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: recording ? 1 : 0.4 }}
        />
        {!recording && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <Icons.Camera className="w-12 h-12 text-white/20"/>
          </div>
        )}
        {recording && (
          <div className="absolute top-5 right-5 flex items-center gap-2.5 bg-black/70 px-4 py-2 rounded-full border border-white/10">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]"/> 
            <span className="text-[10px] font-black text-white uppercase tracking-widest">RECORDING</span>
          </div>
        )}
      </div>
      <button 
        onClick={() => recording ? stopRecording() : startStream()} 
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-2xl px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 active:scale-95 transition-all shadow-4xl transform hover:-translate-y-0.5 ${recording ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'}`}
      >
        {recording ? 'Завершить запись' : 'Записать визитку'}
      </button>
    </div>
  );
};

// --- 6. ОСНОВНОЙ МОНОЛИТНЫЙ КОМПОНЕНТ APP ---

export default function App() {
  // --- СОСТОЯНИЯ ЭКРАНОВ И НАВИГАЦИИ ---
  const [screen, setScreen] = useState('loading');
  const [role, setRole] = useState(null); 
  const [isSubscribed, setIsSubscribed] = useState(true); 

  // --- СОСТОЯНИЯ ТРЕНАЖЕРА ---
  const [clientPool, setClientPool] = useState(CLIENT_DATABASE);
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [selectedModality, setSelectedModality] = useState('mpt');
  const [difficulty, setDifficulty] = useState(2); 

  // --- СОСТОЯНИЯ ЧАТА ---
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // --- СОСТОЯНИЯ ПОЛЬЗОВАТЕЛЯ ---
  const [psychologists, setPsychologists] = useState([]);
  const [userProfile, setUserProfile] = useState({ 
    name: '', experience: 0, price: 0, about: '', methods: '', photoUrl: null 
  });
  const [diamonds, setDiamonds] = useState(5);
  const [notification, setNotification] = useState(null);

  // --- ССЫЛКИ И SDK ---
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const tg = window.Telegram?.WebApp;
  const userId = useMemo(() => tg?.initDataUnsafe?.user?.id?.toString() || 'dev_platinum_master', [tg]);

  /**
   * Инициализация Telegram WebApp и синхронизация с сервером.
   */
  useEffect(() => {
    if (tg) { 
      tg.ready(); 
      tg.expand(); 
      // Применяем цвета только для версий поддерживающих это
      if (parseFloat(tg.version) >= 6.1) {
        tg.setHeaderColor('#020617');
        tg.setBackgroundColor('#020617');
      }
    }
    
    const initApp = async () => {
        // Проверка локального соглашения (храним локально, чтобы не дергать базу лишний раз)
        const isAgreed = localStorage.getItem('connectum_legal');
        
        if (!isAgreed) {
            setScreen('legal');
        } else {
            // Глубокая синхронизация данных
            try {
                const res = await fetch(`/api/sync?userId=${userId}`);
                if (!res.ok) throw new Error("Sync Fail");
                const data = await res.json();
                
                // Обновляем глобальные состояния системы
                if(data.isSubscribed !== undefined) setIsSubscribed(data.isSubscribed);
                if(data.diamonds !== undefined) setDiamonds(data.diamonds);
                if(data.pool) setClientPool(data.pool);
                if(data.profile) setUserProfile(prev => ({...prev, ...data.profile}));
                
                setScreen('hub');
            } catch(e) { 
                console.warn("Connectum: Working in isolated local mode");
                setScreen('hub'); 
            }
        }
    };
    
    // Эмуляция загрузки для премиум-эффекта
    const timer = setTimeout(initApp, 1800);
    return () => clearTimeout(timer);
  }, [tg, userId]);

  /**
   * Автоматический скролл чата к последнему сообщению.
   */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /**
   * Показ всплывающего уведомления (Toast).
   * @param {string} text - Текст уведомления.
   */
  const showToast = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 3500);
  };

  /**
   * Загрузка и обработка фото профиля.
   */
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile(prev => ({...prev, photoUrl: reader.result}));
        showToast("Фото подготовлено к сохранению");
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * "Разблокировка" аудио-контекста для iOS/Safari.
   */
  const unlockAudio = () => {
    const silentAudio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==");
    silentAudio.play().catch(()=>{});
  };

  /**
   * ГЛАВНАЯ ЛОГИКА ОТПРАВКИ СООБЩЕНИЙ.
   * Поддерживает чат, получение подсказок и инициализацию сессии.
   */
  const handleSend = async (text = inputText, isInitial = false, action = 'chat', flow = null) => {
    if (isInitial) unlockAudio();
    if (!text && !isInitial) return;
    
    // Локальное обновление для отзывчивости интерфейса
    if (!isInitial && action === 'chat') {
        setMessages(p => [...p, { role: 'user', content: text }]);
    }
    
    setInputText(''); 
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userId, 
            message: text, 
            modalityId: selectedModality, 
            action, 
            selectedClientId, 
            role, 
            flow, 
            difficulty, 
            history: messages.filter(m => m.role !== 'hint').slice(-10) 
        })
      });
      
      const data = await res.json();
      
      if(action === 'get_hint') {
          // Добавляем подсказку супервизора как специальное сообщение
          setMessages(p => [...p, { role: 'hint', content: data.hint }]);
      } else if(data.content) {
          // Добавляем ответ ИИ и воспроизводим голос
          setMessages(p => [...p, { role: 'ai', content: data.content, voice: data.voice }]);
          if(data.voice) {
              const audio = new Audio(`data:audio/mp3;base64,${data.voice}`);
              audio.play().catch(e => console.error("Auto-play blocked by OS policy", e));
          }
      }
    } catch(e) { 
        showToast("Сбой связи с ИИ-сервером Connectum"); 
    } finally { 
        setIsTyping(false); 
    }
  };

  /**
   * Старт психологической сессии (списание 1 бриллианта).
   */
  const startSession = async () => {
      if(diamonds <= 0) return showToast("Недостаточно бриллиантов на балансе");
      
      // Визуальное списание для мгновенного отклика
      setDiamonds(prev => prev - 1); 
      setScreen('chat'); 
      setMessages([]); 
      handleSend("Здравствуйте, я готов начать сессию.", true);
  };

  /**
   * Сохранение расширенного профиля мастера.
   */
  const saveProfile = async () => {
    try {
        const res = await fetch('/api/profile', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ userId, profile: userProfile }) 
        });
        if (res.ok) {
            showToast("Система мастера успешно обновлена");
            setScreen('hub');
        }
    } catch(e) { showToast("Ошибка сохранения профиля"); }
  };

  /**
   * Завершение сессии и получение глубокого ИИ-аудита.
   */
  const finishSession = async () => {
      if(!confirm("Завершить тренировку и сформировать PDF-аудит?")) return;
      
      setIsTyping(true);
      try {
          const res = await fetch('/api/finish', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ 
                userId, 
                history: messages, 
                selectedClientId, 
                modalityId: selectedModality 
            }) 
          });
          
          const data = await res.json();
          showToast(`Аудит готов. Индекс мастерства: ${data.analytics?.method || 0}%`);
          
          // Обновляем пул (пройденный клиент уйдет в фильтр)
          if(data.newPool) setClientPool(data.newPool);
          setScreen('hub');
      } catch (e) { 
          setScreen('hub'); 
      } finally { 
          setIsTyping(false); 
      }
  };

  /**
   * Принятие юридического соглашения.
   */
  const acceptLegal = () => { 
    localStorage.setItem('connectum_legal', 'true'); 
    setScreen('hub'); 
  };

  // Вычисление текущего клиента для превью
  const currentClient = clientPool.find(c => c.id === selectedClientId) || clientPool[0];

  // --- 7. РЕНДЕР: ЭКРАН ЗАГРУЗКИ ---

  if (screen === 'loading') return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#020617]">
      <GlobalStyles /><div className="mesh-bg" />
      <div className="relative group">
        <Icons.Infinity className="w-16 h-16 animate-pulse text-indigo-500 drop-shadow-[0_0_15px_#6366f1]" />
        <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full animate-pulse"></div>
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-500 mt-10 animate-pulse">Connectum Pro Platinum</span>
      <div className="absolute bottom-10 text-[8px] font-bold text-slate-700 uppercase tracking-widest">Initialising Yandex Assistant Engine...</div>
    </div>
  );

  // --- 8. РЕНДЕР: ЭКРАН ПОДПИСКИ (ЗАЩИТА) ---

  if (!isSubscribed && screen !== 'legal') return (
    <div className="h-screen flex flex-col items-center justify-center p-8 text-center bg-[#020617]">
      <GlobalStyles /><div className="mesh-bg" />
      <div className="glass-card p-12 rounded-[3.5rem] shadow-5xl animate-in border-t border-white/10">
        <div className="w-20 h-20 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Icons.Telegram className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-black uppercase mb-4 tracking-tighter text-white">Вход ограничен</h2>
        <p className="text-[13px] text-slate-400 mb-10 leading-relaxed font-medium">Для доступа к ИИ-системе Connectum Platinum необходимо быть подписчиком нашего канала.</p>
        <a href="https://t.me/psy_connectum" target="_blank" className="block w-full py-5 bg-indigo-600 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest text-white mb-5 shadow-3xl shadow-indigo-600/30 active:scale-95 transition-all">Подписаться</a>
        <button onClick={() => window.location.reload()} className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-white transition-colors">Я уже подписался</button>
      </div>
    </div>
  );

  // --- 9. РЕНДЕР: ОСНОВНОЙ ИНТЕРФЕЙС ---

  return (
    <div className="flex flex-col h-[100dvh] bg-[#020617] text-slate-100 overflow-hidden relative">
      <GlobalStyles /><div className="mesh-bg" />

      {/* СИСТЕМА УВЕДОМЛЕНИЙ (TOAST) */}
      {notification && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] bg-indigo-600/90 backdrop-blur-xl px-7 py-3.5 rounded-2xl border border-white/20 text-[10px] font-black uppercase tracking-widest shadow-5xl animate-in">
          <div className="flex items-center gap-3">
              <Icons.Check className="w-3 h-3"/> {notification}
          </div>
        </div>
      )}

      {/* ШАПКА ПРИЛОЖЕНИЯ (HEADER) */}
      {screen !== 'hub' && screen !== 'legal' && (
        <header className="flex-shrink-0 h-14 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-5 z-50">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen('hub')} className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center active:scale-90 transition shadow-inner">
              <Icons.ChevronLeft className="w-4 h-4 text-slate-400"/>
            </button>
            <div className="flex flex-col">
              <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest leading-none">Connectum</span>
              <span className="text-[7px] font-bold text-slate-600 uppercase mt-1">Platinum v21.26.3</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20 shadow-lg active:scale-95 transition">
            <span className="text-[12px] font-black text-indigo-300 tracking-tighter">{diamonds}</span>
            <Icons.Diamond className="w-4.5 h-4.5 text-indigo-400 diamond-glow" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden relative z-10 flex flex-col">
        
        {/* ЭКРАН 0: LEGAL (СОГЛАШЕНИЕ) */}
        {screen === 'legal' && (
           <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-in">
              <div className="glass-card p-12 rounded-[3.5rem] max-w-sm border-t border-white/10 shadow-5xl">
                  <div className="w-20 h-20 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                      <Icons.User className="w-10 h-10 text-indigo-400"/>
                  </div>
                  <h2 className="text-2xl font-black mb-5 uppercase tracking-tight text-white">Соглашение</h2>
                  <p className="text-[12px] text-slate-400 mb-12 leading-relaxed font-medium">Входя в Connectum, вы подтверждаете совершеннолетие и согласны на обработку данных нейросетью YandexGPT Pro.</p>
                  <button onClick={acceptLegal} className="w-full py-5.5 bg-indigo-600 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-white active:scale-95 transition-all shadow-3xl shadow-indigo-600/30">Принять и Войти</button>
              </div>
           </div>
        )}

        {/* ЭКРАН 1: ГЛАВНАЯ (HUB) */}
        {screen === 'hub' && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-12 animate-in">
            <div className="flex flex-col items-center gap-8">
               <div className="relative group">
                 <div className="absolute inset-0 bg-indigo-500 blur-[70px] opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                 <Icons.Infinity className="w-24 h-24 relative z-10 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]" />
               </div>
               <div className="space-y-2">
                 <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Connectum</h1>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] opacity-80">Синергия мастерства и доверия</p>
               </div>
            </div>
            
            <div className="w-full grid gap-5 max-w-sm">
                <button 
                  onClick={() => { unlockAudio(); setScreen('setup'); setRole('psychologist'); }} 
                  className="btn-magnetic w-full p-7 glass-card rounded-[2.8rem] flex items-center gap-7 active:scale-[0.97] text-left relative overflow-hidden group shadow-4xl"
                >
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-4xl z-10 shadow-inner group-hover:rotate-12 transition-transform duration-500">🧠</div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">Я Психолог</h3>
                      <p className="text-[9px] font-bold text-slate-500 uppercase mt-2.5 tracking-widest">Тренажер • Прогресс • РОСТ</p>
                    </div>
                </button>
                
                <button 
                  onClick={() => { unlockAudio(); setScreen('client_hub'); setRole('client'); }} 
                  className="btn-magnetic w-full p-7 glass-card rounded-[2.8rem] flex items-center gap-7 active:scale-[0.97] text-left relative overflow-hidden group shadow-4xl"
                >
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-4xl z-10 shadow-inner group-hover:rotate-12 transition-transform duration-500">🤝</div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">Я Клиент</h3>
                      <p className="text-[9px] font-bold text-slate-500 uppercase mt-2.5 tracking-widest">Помощь • Ресурс • ДОВЕРИЕ</p>
                    </div>
                </button>
            </div>
            
            <div className="flex justify-center gap-14 mt-auto pb-6 opacity-60 hover:opacity-100 transition-opacity">
                <a href="https://t.me/psy_connectum" target="_blank" className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-all"><Icons.Telegram className="w-4.5 h-4.5"/> Канал</a>
                <a href="https://t.me/lazalex81" target="_blank" className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-all"><Icons.Support className="w-4.5 h-4.5"/> Поддержка</a>
            </div>
          </div>
        )}

        {/* ЭКРАН 2: ТРЕНАЖЕР (SETUP) */}
        {screen === 'setup' && (
           <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar pb-36 text-left animate-in">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">Тренажер</h2>
               
               {/* ТАРИФЫ (ГОРЯЧИЕ КАРТОЧКИ) */}
               <div className="grid grid-cols-2 gap-3.5">
                  <div 
                    className="p-5 glass-card rounded-[2.2rem] border-l-4 border-orange-500 active:scale-95 transition cursor-pointer shadow-xl relative overflow-hidden group" 
                    onClick={()=>showToast("Заявка в обработке")}
                  >
                      <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
                      <h4 className="text-[9px] font-black uppercase text-orange-400 tracking-wider">Тест-драйв</h4>
                      <div className="flex justify-between items-end mt-2.5">
                          <span className="text-xl font-black text-white leading-none">490₽</span>
                          <div className="w-7 h-7 bg-orange-600 rounded-xl flex items-center justify-center text-[11px] shadow-lg">💰</div>
                      </div>
                  </div>
                  <div 
                    className="p-5 bg-indigo-600/10 border border-white/5 rounded-[2.2rem] border-l-4 border-indigo-600 active:scale-95 transition cursor-pointer shadow-xl relative overflow-hidden group" 
                    onClick={()=>showToast("Заявка в обработке")}
                  >
                      <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-600/10 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
                      <h4 className="text-[9px] font-black uppercase text-indigo-400 tracking-wider">ПРО Доступ</h4>
                      <div className="flex justify-between items-end mt-2.5">
                          <span className="text-xl font-black text-white leading-none">2990₽</span>
                          <div className="w-7 h-7 bg-indigo-600 rounded-xl flex items-center justify-center text-[11px] shadow-lg">💎</div>
                      </div>
                  </div>
               </div>

               <div className="space-y-8">
                   {/* ВЫБОР СЛОЖНОСТИ (SEGMENTED) */}
                   <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-[0.35em]">Уровень сложности</label>
                     <div className="segmented-control">
                        <div 
                            className="segment-slider" 
                            style={{ width: '33.33%', left: `${(difficulty-1)*33.33}%` }} 
                        />
                        {[1, 2, 3].map(lvl => (
                            <button 
                                key={lvl} 
                                onClick={() => setDifficulty(lvl)} 
                                className={`segment-btn ${difficulty === lvl ? 'active' : ''}`}
                            >
                                {lvl === 1 ? 'Лайт' : lvl === 2 ? 'Норма' : 'Хард'}
                            </button>
                        ))}
                     </div>
                   </div>

                   {/* ВЫБОР МОДАЛЬНОСТИ И КЛИЕНТА */}
                   <div className="grid gap-5">
                       <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-[0.35em]">Метод (Модальность)</label>
                           <div className="relative">
                               <select 
                                   value={selectedModality} 
                                   onChange={(e) => setSelectedModality(e.target.value)} 
                                   className="w-full p-5 glass-card rounded-2xl text-xs font-bold text-white outline-none appearance-none focus:border-indigo-500 transition shadow-3xl pl-6"
                               >
                                   {Object.keys(MODALITIES).map(k => (
                                       <option key={k} value={k} className="bg-slate-950">{MODALITIES[k].name} — {MODALITIES[k].desc}</option>
                                   ))}
                               </select>
                               <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">▼</div>
                           </div>
                       </div>
                       
                       <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-[0.35em]">Выбрать Клиента</label>
                           <div className="relative">
                               <select 
                                   value={selectedClientId} 
                                   onChange={(e) => setSelectedClientId(e.target.value)} 
                                   className="w-full p-5 glass-card rounded-2xl text-xs font-bold text-white outline-none appearance-none focus:border-indigo-500 transition shadow-3xl pl-6"
                               >
                                   {clientPool.map(c => (
                                       <option key={c.id} value={c.id} className="bg-slate-950">{c.name}, {c.age} — {c.profession}</option>
                                   ))}
                               </select>
                               <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">▼</div>
                           </div>
                       </div>
                   </div>

                   {/* ПРЕВЬЮ КЕЙСА */}
                   <div className="glass-card rounded-[3rem] p-10 relative overflow-hidden shadow-5xl border-t border-white/10 group transition-all duration-500 hover:scale-[1.01]">
                       <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 group-hover:w-4 transition-all duration-700"></div>
                       <div className="flex items-center gap-7 mb-8">
                           <div className="w-20 h-20 bg-white/5 rounded-[1.8rem] flex items-center justify-center text-5xl shadow-inner border border-white/5 transform group-hover:scale-110 transition-transform">
                               {currentClient?.avatar || '👤'}
                           </div>
                           <div>
                             <h4 className="text-2xl font-black text-white leading-none tracking-tight">{currentClient?.name || 'Загрузка...'}, {currentClient?.age || ''}</h4>
                             <p className="text-[11px] font-black uppercase text-indigo-400 mt-3 opacity-80 tracking-widest">{currentClient?.profession || 'Профессия'}</p>
                           </div>
                       </div>
                       <div className="text-[15px] text-slate-300 italic leading-relaxed border-l-2 border-indigo-500/30 pl-8 py-3 relative">
                           <div className="absolute -left-1 top-0 w-2 h-2 bg-indigo-500 rounded-full blur-sm"></div>
                           "{currentClient?.bio}"
                       </div>
                   </div>
                   
                   {/* КНОПКА СТАРТА */}
                   <button 
                     onClick={startSession} 
                     className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 py-8 rounded-[2.5rem] font-black uppercase text-[13px] tracking-[0.45em] shadow-5xl active:scale-95 text-white flex items-center justify-center gap-4 transition-all transform hover:-translate-y-1.5"
                   >
                       НАЧАТЬ СЕССИЮ — 1 <Icons.Diamond className="w-6 h-6 diamond-glow"/>
                   </button>
               </div>
           </div>
        )}

        {/* ЭКРАН 3: ХАБ ПОМОЩИ (B2C) */}
        {screen === 'client_hub' && (
           <div className="flex-1 overflow-y-auto p-6 space-y-7 no-scrollbar pb-36 text-left animate-in">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Хаб Помощи</h2>
              
              <div className="p-10 bg-gradient-to-br from-indigo-600/30 to-indigo-900/50 rounded-[3rem] border border-indigo-500/20 flex justify-between items-center relative overflow-hidden group active:scale-95 transition shadow-5xl">
                  <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000 rotate-12">
                      <Icons.Diamond className="w-48 h-48"/>
                  </div>
                  <div className="relative z-10">
                      <h4 className="text-[11px] font-black uppercase text-indigo-300 tracking-[0.4em]">Client Premium</h4>
                      <p className="text-[12px] font-bold text-indigo-100/60 mt-2 uppercase tracking-tight leading-none">ИИ-терапия 24/7</p>
                  </div>
                  <div className="relative z-10 text-right">
                      <span className="text-3xl font-black text-white">1990₽</span>
                      <button onClick={()=>showToast("Заявка принята")} className="block bg-indigo-500 hover:bg-indigo-400 text-[10px] font-black uppercase px-8 py-3.5 rounded-2xl mt-4 shadow-3xl active:scale-95 transition-all">Купить</button>
                  </div>
              </div>

              <div className="grid gap-5">
                  <button 
                    onClick={() => { setScreen('chat'); setMessages([]); handleSend("Мне нужна глубокая диагностика моего состояния", true, 'chat', 'diagnostics'); }} 
                    className="p-8 glass-card rounded-[2.5rem] flex items-center gap-8 active:scale-95 text-left border-l-4 border-indigo-500 shadow-4xl group transition-all"
                  >
                      <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500">🔍</div>
                      <div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight leading-tight">ИИ-Диагностика</h4>
                        <p className="text-[12px] font-bold text-slate-500 uppercase mt-1.5">Найти корень проблемы</p>
                      </div>
                  </button>
                  
                  <button 
                    onClick={() => { setScreen('chat'); setMessages([]); handleSend("Мне нужна психологическая поддержка", true, 'chat', 'therapy'); }} 
                    className="p-8 glass-card rounded-[2.5rem] flex items-center gap-8 active:scale-95 text-left border-l-4 border-emerald-500 shadow-4xl group transition-all"
                  >
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500">✨</div>
                      <div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight leading-tight">ИИ-Психолог</h4>
                        <p className="text-[12px] font-bold text-slate-500 uppercase mt-1.5">Бережная поддержка 24/7</p>
                      </div>
                  </button>
              </div>

              {/* РЕФЕРАЛЬНАЯ ПРОГРАММА */}
              <button 
                onClick={()=>showToast("Ваша ссылка скопирована")} 
                className="w-full text-center text-[11px] font-black text-indigo-400 uppercase tracking-[0.45em] bg-indigo-500/5 p-7 rounded-[2.8rem] border border-indigo-500/10 shadow-xl mt-8 transition-all flex items-center justify-center gap-3 transform hover:scale-[1.02]"
              >
                  Приведи друга = +3 <Icons.Diamond className="w-4.5 h-4.5"/> к балансу
              </button>
           </div>
        )}

        {/* ЭКРАН 4: ЧАТ СЕССИИ (ИНТЕРФЕЙС ВЗАИМОДЕЙСТВИЯ) */}
        {screen === 'chat' && (
           <div className="flex-1 flex flex-col relative h-full animate-in">
               {/* ОБЛАСТЬ СООБЩЕНИЙ */}
               <div className="flex-1 overflow-y-auto p-6 space-y-7 no-scrollbar pb-52 text-left">
                   {messages.map((m, i) => (
                       <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in`}>
                           {/* Рендеринг разных типов сообщений (Юзер / ИИ / Подсказка) */}
                           <div 
                             className={`max-w-[90%] p-6 text-[15px] leading-relaxed font-medium shadow-5xl ${
                               m.role === 'user' 
                                 ? 'bg-indigo-600 text-white rounded-[2rem_2rem_0.6rem_2rem]' 
                                 : m.role === 'hint'
                                 ? 'bg-orange-500/10 border-2 border-dashed border-orange-500/30 text-orange-200 rounded-[2rem] text-xs italic'
                                 : 'bg-slate-800/80 backdrop-blur-md border border-white/5 text-slate-50 rounded-[2rem_2rem_2rem_0.6rem]'
                             }`} 
                             dangerouslySetInnerHTML={{__html: marked.parse(m.content || "")}}
                           />
                       </div>
                   ))}
                   
                   {/* ИНДИКАТОР ПЕЧАТИ */}
                   {isTyping && (
                    <div className="flex gap-2 p-5 bg-slate-800/60 rounded-[2rem] w-fit border border-white/5 shadow-3xl">
                      <div className="loader-dots flex gap-2">
                          <div/><div/><div/>
                      </div>
                    </div>
                   )}
                   <div ref={chatEndRef} />
               </div>

               {/* ПАНЕЛЬ УПРАВЛЕНИЯ ЧАТОМ (FOOTER) */}
               <footer className="absolute bottom-0 w-full p-6 bg-slate-950/95 backdrop-blur-3xl border-t border-white/5 z-50">
                   <div className="flex gap-3.5 mb-7">
                       {role === 'psychologist' && (
                         <button 
                            onClick={() => handleSend("Проанализируй ситуацию и дай совет супервизора", false, 'get_hint')} 
                            className="flex-1 py-4.5 bg-orange-600/15 border border-orange-500/20 rounded-2xl text-[11px] font-black uppercase text-orange-400 active:scale-95 transition flex items-center justify-center gap-3 tracking-widest shadow-xl transform hover:-translate-y-0.5"
                         >
                            <Icons.Sparkles className="w-4 h-4"/> Совет ИИ
                         </button>
                       )}
                       <button 
                        onClick={finishSession} 
                        className="flex-1 py-4.5 bg-emerald-600/15 border border-emerald-500/20 rounded-2xl text-[11px] font-black uppercase text-emerald-400 active:scale-95 transition tracking-widest shadow-xl transform hover:-translate-y-0.5"
                       >
                        🏁 Финиш
                       </button>
                   </div>
                   
                   <div className="flex items-center gap-3.5 bg-white/5 border border-white/10 rounded-[2.2rem] p-1.5 pr-4 focus-within:ring-2 ring-indigo-500/30 transition-all shadow-inner">
                       <textarea 
                          value={inputText} 
                          onChange={e => setInputText(e.target.value)} 
                          rows={1} 
                          className="flex-1 bg-transparent border-none outline-none text-[16px] px-6 py-4 text-white placeholder:text-slate-600 resize-none font-medium no-scrollbar leading-tight" 
                          placeholder="Ваша интервенция..." 
                          onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}} 
                       />
                       <button 
                        onClick={() => handleSend()} 
                        className="w-12 h-12 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center active:scale-90 transition shadow-4xl shadow-indigo-600/50 transform hover:scale-105"
                       >
                        <Icons.Send className="w-6.5 h-6.5 text-white"/>
                       </button>
                   </div>
               </footer>
           </div>
        )}

        {/* ЭКРАН 5: ВИТРИНА МАСТЕРОВ (AGGREGATOR) */}
        {screen === 'aggregator' && (
           <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar pb-36 text-left animate-in">
               <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Витрина</h2>
               <div className="space-y-7">
                   {psychologists.length === 0 ? (
                    <div className="p-16 text-center glass-card rounded-[3rem] border-dashed border-white/15">
                        <Icons.Search className="w-16 h-16 text-slate-700 mx-auto mb-6 animate-pulse"/>
                        <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.2em]">Поиск активных мастеров Platinum...</p>
                    </div>
                   ) : psychologists.map((p, i) => (
                       <div 
                        key={i} 
                        className="p-10 rounded-[3.5rem] bg-slate-900/60 border border-indigo-500/20 shadow-5xl animate-in relative overflow-hidden group"
                       >
                           <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <div className="flex gap-8 items-center relative z-10">
                               <div className="w-24 h-24 bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-5xl overflow-hidden border border-white/5 shadow-inner">
                                   {p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover" alt={p.name}/> : '👤'}
                               </div>
                               <div className="flex-1">
                                   <h4 className="text-2xl font-black text-white leading-tight tracking-tight">{p.name}</h4>
                                   <p className="text-[10px] font-black uppercase text-indigo-400 mt-2.5 tracking-widest leading-relaxed">Стаж {p.experience} лет • {p.methods}</p>
                               </div>
                           </div>
                           <div className="mt-10 flex justify-between items-center border-t border-white/5 pt-8 relative z-10">
                               <div>
                                   <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Стоимость сессии</span>
                                   <p className="text-3xl font-black text-white leading-none mt-2.5">{p.price}₽</p>
                               </div>
                               <button 
                                onClick={()=>showToast("Заявка на сессию принята")} 
                                className="bg-indigo-600 px-12 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest text-white shadow-3xl active:scale-95 transition-all transform hover:-translate-y-1"
                               >
                                Записаться
                               </button>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
        )}

        {/* ЭКРАН 6: ПРОФИЛЬ МАСТЕРА (EXTENDED PROFILE) */}
        {screen === 'profile' && (
           <div className="flex-1 overflow-y-auto p-7 space-y-12 no-scrollbar pb-44 text-left animate-in">
               <div className="flex justify-between items-end px-1">
                 <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Профиль</h2>
                 <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.6em] opacity-80">Master Evolution</span>
               </div>
               
               <div className="space-y-12">
                   {/* БЛОК АВАТАРА И ПРИГЛАШЕНИЙ */}
                   <div className="flex gap-8 items-center">
                       <div 
                         className="w-32 h-32 bg-white/5 rounded-[2.8rem] flex items-center justify-center border-2 border-dashed border-white/10 overflow-hidden relative shadow-5xl group transition-all cursor-pointer" 
                         onClick={()=>fileInputRef.current.click()}
                       >
                           {userProfile.photoUrl 
                             ? <img src={userProfile.photoUrl} className="w-full h-full object-cover" alt="Profile"/> 
                             : <Icons.User className="w-12 h-12 text-slate-700 group-hover:text-indigo-500 transition-colors"/>
                           }
                           <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload}/>
                           <div className="absolute inset-0 bg-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                               <span className="text-[10px] font-black text-white uppercase tracking-widest">Сменить</span>
                           </div>
                       </div>
                       <div className="flex-1">
                           <button 
                            onClick={()=>showToast("Ваша ссылка для коллег скопирована")} 
                            className="w-full py-6 bg-indigo-600/15 border border-indigo-500/20 rounded-[1.8rem] text-[10px] font-black uppercase text-indigo-300 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 tracking-tighter transform hover:scale-[1.02]"
                           >
                             Пригласи коллегу +3 <Icons.Diamond className="w-4.5 h-4.5"/>
                           </button>
                       </div>
                   </div>
                   
                   {/* КОМПОНЕНТ ЗАПИСИ ВИДЕО-ВИЗИТКИ */}
                   <VideoRecorder onUpload={(url) => {
                       setUserProfile(prev => ({...prev, videoUrl: url}));
                       showToast("Видеовизитка успешно сохранена в профиль");
                   }}/>
                   
                   {/* ПОЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */}
                   <div className="space-y-10 pt-4">
                       <div className="space-y-3.5">
                           <label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.4em]">Публичное Имя</label>
                           <input 
                            type="text" 
                            className="w-full p-6 glass-card rounded-[2rem] text-[17px] font-bold text-white outline-none focus:border-indigo-500 transition shadow-4xl" 
                            value={userProfile.name} 
                            onChange={e => setUserProfile({...userProfile, name:e.target.value})}
                           />
                       </div>
                       
                       <div className="flex gap-6">
                           <div className="space-y-3.5 flex-1">
                               <label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.4em]">Стаж (лет)</label>
                               <input 
                                type="number" 
                                className="w-full p-6 glass-card rounded-[2rem] text-[17px] font-bold text-white outline-none focus:border-indigo-500 transition" 
                                value={userProfile.experience} 
                                onChange={e => setUserProfile({...userProfile, experience:e.target.value})}
                               />
                           </div>
                           <div className="space-y-3.5 flex-1">
                               <label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.4em]">Цена (₽)</label>
                               <input 
                                type="number" 
                                className="w-full p-6 glass-card rounded-[2rem] text-[17px] font-bold text-white outline-none focus:border-indigo-500 transition" 
                                value={userProfile.price} 
                                onChange={e => setUserProfile({...userProfile, price:e.target.value})}
                               />
                           </div>
                       </div>
                       
                       <div className="space-y-3.5">
                           <label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.4em]">Ваша философия (О себе)</label>
                           <textarea 
                             className="w-full p-7 glass-card rounded-[2.2rem] text-[15px] font-medium text-white outline-none focus:border-indigo-500 transition shadow-4xl min-h-[160px] no-scrollbar leading-relaxed" 
                             placeholder="Расскажите о своем подходе, опыте и ценностях..." 
                             value={userProfile.about} 
                             onChange={e => setUserProfile({...userProfile, about:e.target.value})}
                           />
                       </div>
                       
                       <div className="space-y-3.5">
                           <label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.4em]">Методы работы (модальности)</label>
                           <input 
                            type="text" 
                            className="w-full p-6 glass-card rounded-[2rem] text-[15px] font-bold text-white outline-none focus:border-indigo-500 transition shadow-4xl" 
                            placeholder="Напр: МПТ, КПТ, Гештальт, ТА" 
                            value={userProfile.methods} 
                            onChange={e => setUserProfile({...userProfile, methods:e.target.value})}
                           />
                       </div>
                   </div>
                   
                   {/* ФИНАЛЬНАЯ КНОПКА СОХРАНЕНИЯ */}
                   <button 
                    onClick={saveProfile} 
                    className="w-full py-9 bg-gradient-to-r from-indigo-600 to-indigo-900 rounded-[2.8rem] text-[14px] font-black uppercase tracking-[0.6em] text-white shadow-5xl active:scale-95 transition-all mt-10 transform hover:-translate-y-2 border border-white/5"
                   >
                    СОХРАНИТЬ МАСТЕРА
                   </button>
               </div>
           </div>
        )}

      </main>

      {/* 10. НИЖНЯЯ СИСТЕМА НАВИГАЦИИ (DYNAMIC FOOTER) */}
      {(role !== null && screen !== 'chat' && screen !== 'legal' && screen !== 'loading') && (
        <nav className="h-[105px] bg-slate-950/98 backdrop-blur-4xl border-t border-white/5 flex justify-around items-center px-8 pb-8 z-50 shadow-[0_-25px_60px_rgba(0,0,0,0.95)]">
            {[
                {id: 'hub', icon: Icons.Infinity, label: 'Главная'},
                {id: 'setup', icon: Icons.Sparkles, label: 'Тренажер'},
                {id: 'aggregator', icon: Icons.Search, label: 'Витрина'},
                {id: 'profile', icon: Icons.User, label: 'Профиль'}
            ].map(item => (
                <button 
                  key={item.id} 
                  onClick={() => setScreen(item.id)} 
                  className={`flex flex-col items-center gap-3 w-20 transition-all duration-500 ${screen === item.id ? 'text-indigo-400 -translate-y-4' : 'text-slate-600 hover:text-slate-400'}`}
                >
                    <div className="relative">
                      <item.icon className={`w-7.5 h-7.5 ${screen === item.id ? 'drop-shadow-[0_0_15px_rgba(99,102,241,0.9)]' : ''}`}/>
                      {screen === item.id && (
                        <div className="absolute -inset-4 bg-indigo-500/15 rounded-full blur-2xl animate-pulse -z-10"/>
                      )}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 ${screen === item.id ? 'opacity-100' : 'opacity-40'}`}>
                      {item.label}
                    </span>
                </button>
            ))}
        </nav>
      )}

    </div>
  );
}
