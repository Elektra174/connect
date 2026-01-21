import React, { useState, useEffect, useRef, useMemo } from 'react';
import { marked } from 'marked';

/**
 * =========================================================================
 * CONNECTUM PRO v22.0 - SUPER PREMIUM MASTER EDITION
 * =========================================================================
 * 🎨 ДИЗАЙН: "Super Premium Terminal" (Glassmorphism, Neon, Animations)
 * 🧠 ИНТЕЛЛЕКТ: YandexGPT Pro & SpeechKit Premium
 * 📱 UX: Telegram Mini Apps v6.1+ (Super Premium UI)
 * 🎮 ГЕЙМИФИКАЦИЯ: Diamonds, Quests, Mastery Levels
 * 📊 АНАЛИТИКА: Mastery Radar, Session Metrics, PDF Reports
 * =========================================================================
 * Полная реструктуризация с сохранением логики и супер-премиум дизайном
 * =========================================================================
 */

// --- 1. КОНСТАНТЫ И ДАННЫЕ ---

const CLIENT_DATABASE = [
  { 
    id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Viktoriya&backgroundColor=transparent",
    bio: "Парализующий саботаж при записи видео. Страх проявления зашкаливает.",
    somatic: ["TIGHT THROAT", "SHALLOW BREATH"]
  },
  { 
    id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Artem&backgroundColor=transparent",
    bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным.",
    somatic: ["RACING HEART", "COLD HANDS"]
  },
  { 
    id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=transparent",
    bio: "Постоянное сжатие в груди и тревога за будущее.",
    somatic: ["CHEST TIGHTNESS", "ANXIETY"]
  },
  { 
    id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail&backgroundColor=transparent",
    bio: "Сменил 5 профессий за 2 года. Нигде не находит признания.",
    somatic: ["EMPTY SOLAR PLEXUS", "NO ENERGY"]
  },
  { 
    id: "c5", name: "Анна", age: 25, profession: "Студентка", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna&backgroundColor=transparent",
    bio: "Не может завершить разрушительные отношения. Боится одиночества.",
    somatic: ["COLLAR BONE PAIN", "WANT TO CURL UP"]
  },
  { 
    id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Igor&backgroundColor=transparent",
    bio: "Достиг успеха, но внутри тотальная пустота.",
    somatic: ["NUMBNESS IN STOMACH", "COLD"]
  },
  { 
    id: "c7", name: "Ольга", age: 38, profession: "Врач", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olga&backgroundColor=transparent",
    bio: "Ипохондрия. Паника при малейшем физическом дискомфорте.",
    somatic: ["TINGLING ALL OVER", "FEAR"]
  },
  { 
    id: "c8", name: "Дмитрий", age: 29, profession: "Продавец", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry&backgroundColor=transparent",
    bio: "Боится встреч и публичных выступлений.",
    somatic: ["JAW TENSION", "SPEECH BLOCK"]
  },
  { 
    id: "c9", name: "Мария", age: 33, profession: "Домохозяйка", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=transparent",
    bio: "Материнская вина. Ощущение, что она плохая мать и жена.",
    somatic: ["CONCRETE SLAB ON BACK", "CAN'T BREATHE"]
  },
  { 
    id: "c10", name: "Сергей", age: 50, profession: "Предприниматель", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey&backgroundColor=transparent",
    bio: "Банкротство бизнеса. Колоссальный стыд перед семьей.",
    somatic: ["MELTING FEET", "HEAVY SHOULDERS"]
  },
  { 
    id: "c11", name: "Юлия", age: 27, profession: "Модель", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuliya&backgroundColor=transparent",
    bio: "РПП. Ненавидит свое отражение. Постоянный контроль веса.",
    somatic: ["HEAVINESS IN STOMACH", "SELF-LOATHING"]
  },
  { 
    id: "c12", name: "Андрей", age: 35, profession: "Архитектор", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrey&backgroundColor=transparent",
    bio: "Вспышки неконтролируемого гнева на близких.",
    somatic: ["BOILING IN CHEST", "SEEKING EXIT"]
  },
  { 
    id: "c13", name: "Наталья", age: 40, profession: "Учитель", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Natalya&backgroundColor=transparent",
    bio: "Одиночество в толпе. Живет как за толстым стеклом.",
    somatic: ["GLASS WALL", "LONELINESS"]
  },
  { 
    id: "c14", name: "Павел", age: 22, profession: "Курьер", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pavel&backgroundColor=transparent",
    bio: "Тотальная зависимость от мнения родителей.",
    somatic: ["WATERY HANDS", "NO AIR"]
  },
  { 
    id: "c15", name: "Екатерина", age: 36, profession: "HR-директор", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ekaterina&backgroundColor=transparent",
    bio: "Профессиональное выгорание. Перфекционизм.",
    somatic: ["BURNING EYES", "CAN'T RELAX"]
  },
  { 
    id: "c16", name: "Александр", age: 44, profession: "Инженер", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander&backgroundColor=transparent",
    bio: "Застрял в горе после утраты близкого.",
    somatic: ["STONE IN STOMACH", "HEAVY"]
  },
  { 
    id: "c17", name: "Светлана", age: 30, profession: "Бьюти-мастер", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Svetlana&backgroundColor=transparent",
    bio: "Низкая самооценка. Считает себя 'недостаточной'.",
    somatic: ["COLD IN HEART", "CONSTANT COMPARISON"]
  },
  { 
    id: "c18", name: "Роман", age: 32, profession: "Аналитик", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roman&backgroundColor=transparent",
    bio: "Игровая зависимость. Уход от реальности.",
    somatic: ["NECK STIFFNESS", "FEAR OF REALITY"]
  },
  { 
    id: "c19", name: "Ирина", age: 48, profession: "Юрист", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Irina&backgroundColor=transparent",
    bio: "Синдром пустого гнезда. Дети выросли и уехали.",
    somatic: ["DRAFT IN CHEST", "UNNEEDED"]
  },
  { 
    id: "c20", name: "Кирилл", age: 26, profession: "Дизайнер", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kirill&backgroundColor=transparent",
    bio: "Агорафобия. Боится выходить на открытые пространства.",
    somatic: ["NUMBNESS IN FINGERTIPS", "PANIC"]
  },
  { 
    id: "c21", name: "Татьяна", age: 55, profession: "Пенсионерка", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tatyana&backgroundColor=transparent",
    bio: "Кризис старения. Ощущение, что время уходит впустую.",
    somatic: ["HEAVINESS IN KNEES", "FEAR OF DEATH"]
  },
  { 
    id: "c22", name: "Виктор", age: 39, profession: "Водитель", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Viktor&backgroundColor=transparent",
    bio: "Переживает измену жены. Не может спать и есть.",
    somatic: ["BURNING COAL IN CHEST", "RAGE"]
  },
  { 
    id: "c23", name: "Алина", age: 24, profession: "Бариста", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alina&backgroundColor=transparent",
    bio: "Не умеет говорить 'нет'. Чувствует, что все ею пользуются.",
    somatic: ["NECK TENSION", "HEADACHES"]
  },
  { 
    id: "c24", name: "Денис", age: 37, profession: "Охранник", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Denis&backgroundColor=transparent",
    bio: "Навязчивые мысли о безопасности семьи.",
    somatic: ["CONSTANT CONTROL", "EXHAUSTION"]
  },
  { 
    id: "c25", name: "Людмила", age: 60, profession: "Педагог", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lyudmila&backgroundColor=transparent",
    bio: "Конфликт с невесткой. Чувствует себя лишней в семье.",
    somatic: ["BITTERNESS IN MOUTH", "LUMP IN THROAT"]
  },
  { 
    id: "c26", name: "Максим", age: 21, profession: "Блогер", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maxim&backgroundColor=transparent",
    bio: "Подростковый бунт против системы, затянувшийся во времени.",
    somatic: ["VOID", "NO DESIRES"]
  },
  { 
    id: "c27", name: "Валерия", age: 31, profession: "Стилист", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valeriya&backgroundColor=transparent",
    bio: "Болезненная ревность. Постоянный поиск улик измены.",
    somatic: ["HEAT IN BACK OF NECK", "MADNESS"]
  },
  { 
    id: "c28", name: "Станислав", age: 43, profession: "Адвокат", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Stanislav&backgroundColor=transparent",
    bio: "Трудоголизм как способ убежать от проблем в семье.",
    somatic: ["PULSATION IN TEMPLES", "CAN'T RELAX"]
  },
  { 
    id: "c29", name: "Евгения", age: 29, profession: "Копирайтер", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Evgeniya&backgroundColor=transparent",
    bio: "Страх перемен. Боится менять работу, даже если там плохо.",
    somatic: ["HANDS TIED", "CAPTIVE"]
  },
  { 
    id: "c30", name: "Константин", age: 35, profession: "Финансист", 
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Konstantin&backgroundColor=transparent",
    bio: "Эмоциональная холодность. Не понимает, что чувствует.",
    somatic: ["ROBOT", "NO EMPATHY"]
  }
];

const MODALITIES = {
  mpt: { id: "mpt", name: "MPT", color: "indigo", desc: "Мета-персональная терапия" },
  cbt: { id: "cbt", name: "CBT", color: "emerald", desc: "Когнитивно-поведенческая терапия" },
  gestalt: { id: "gestalt", name: "GESTALT", color: "purple", desc: "Гештальт-терапия" },
  eit: { id: "eit", name: "EIT", color: "amber", desc: "Эмоционально-образная терапия" },
  psychoanalysis: { id: "psychoanalysis", name: "PSYCHOANALYSIS", color: "rose", desc: "Классический психоанализ" },
  ta: { id: "ta", name: "TA", color: "cyan", desc: "Транзактный анализ" }
};

const SCREENS = {
  loading: 'loading',
  legal: 'legal',
  terminal_dashboard: 'terminal_dashboard',
  setup: 'setup',
  chat: 'chat',
  session_summary: 'session_summary',
  client_hub: 'client_hub',
  masters_gallery: 'masters_gallery',
  profile: 'profile',
  settings: 'settings',
  pro_dashboard: 'pro_dashboard',
  pdf_report: 'pdf_report',
  waitlist: 'waitlist',
  radar: 'radar'
};

// --- 2. ГЛОБАЛЬНЫЕ СТИЛИ (CSS) ---

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    
    :root {
      --bg-deep: #020617;
      --bg-space: #020812;
      --glass: rgba(15, 23, 42, 0.65);
      --glass-light: rgba(30, 35, 50, 0.4);
      --border: rgba(255, 255, 255, 0.1);
      --primary: #6366f2;
      --neon-blue: #00f2ff;
      --neon-magenta: #ff00e5;
      --neon-green: #39ff14;
      --neon-gold: #ffa805;
      --text-primary: #ffffff;
      --text-secondary: #94a3b8;
    }
    
    body { 
      font-family: 'Manrope', sans-serif; 
      background-color: var(--bg-deep); 
      color: var(--text-primary); 
      overflow: hidden; 
      margin: 0; 
      -webkit-tap-highlight-color: transparent;
      min-height: max(884px, 100dvh);
    }

    /* Mesh Gradient Background */
    .mesh-bg { 
      position: fixed; 
      inset: 0; 
      z-index: -1; 
      background: 
        radial-gradient(circle at 20% 30%, rgba(99, 102, 242, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(255, 0, 229, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 1) 0%, rgba(2, 6, 23, 1) 100%);
    }

    /* Glass Card */
    .glass-card {
      background: var(--glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .glass-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.9);
    }

    /* Glow Effects */
    .glow-blue { box-shadow: 0 0 15px rgba(0, 242, 255, 0.5); }
    .glow-magenta { box-shadow: 0 0 15px rgba(255, 0, 229, 0.5); }
    .glow-green { box-shadow: 0 0 15px rgba(57, 255, 20, 0.5); }
    .glow-primary { box-shadow: 0 0 15px rgba(99, 102, 242, 0.5); }
    .glow-gold { box-shadow: 0 0 15px rgba(255, 168, 5, 0.5); }

    /* Shimmer Effect */
    .shimmer {
      position: relative;
      overflow: hidden;
    }
    .shimmer::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent);
      transform: rotate(45deg);
      pointer-events: none;
    }

    /* Scanline Effect */
    .scanline {
      background: linear-gradient(to bottom, transparent 50%, rgba(0, 240, 255, 0.05) 50%);
      background-size: 100% 4px;
    }

    /* Premium Shine */
    .premium-shine {
      background: linear-gradient(135deg, #6366f2 0%, #7A6FF7 50%, #6366f2 100%);
      position: relative;
      overflow: hidden;
    }
    .premium-shine::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to right,
        transparent,
        rgba(255, 255, 255, 0.1) 45%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0.1) 55%,
        transparent
      );
      transform: rotate(45deg);
    }

    /* Animations */
    .animate-in { animation: fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
    @keyframes fadeIn { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }

    .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* iOS Tab Bar */
    .ios-tab-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(25px);
      border-top: 0.5px solid rgba(255, 255, 255, 0.1);
      padding: 12px 20px 20px;
      z-index: 100;
      display: flex;
      justify-content: space-around;
      max-width: 400px;
      margin: 0 auto;
    }

    /* Home Indicator */
    .home-indicator {
      height: 4px;
      width: 128px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 9999px;
      margin: 8px auto 0;
    }

    /* Snap Scroll */
    .snap-x { scroll-snap-type: x mandatory; }
    .snap-center { scroll-snap-align: center; }

    /* Custom Scrollbar */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* Text Glow */
    .text-glow { text-shadow: 0 0 10px rgba(99, 102, 242, 0.4); }

    /* Material Symbols */
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  `}</style>
);

// --- 3. UI КОМПОНЕНТЫ ---

const TopAppBar = ({ onBack, title, onSettings, settingsIcon = 'settings' }) => (
  <header className="flex items-center p-6 pb-2 justify-between animate-in">
    <button 
      onClick={onBack}
      className="text-white flex size-10 shrink-0 items-center justify-center glass-card rounded-full cursor-pointer active:scale-95 transition-transform"
    >
      <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
    </button>
    <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.02em] flex-1 text-center">
      {title}
    </h2>
    <div className="flex size-10 items-center justify-center">
      {onSettings ? (
        <button 
          onClick={onSettings}
          className="flex items-center justify-center glass-card rounded-full size-10 text-white transition-colors hover:bg-white/10 active:scale-95"
        >
          <span className="material-symbols-outlined text-xl">{settingsIcon}</span>
        </button>
      ) : (
        <div className="size-10" />
      )}
    </div>
  </header>
);

const BottomNavigation = ({ screen, setScreen }) => {
  const items = [
    { id: SCREENS.terminal_dashboard, icon: 'terminal', label: 'Терминал' },
    { id: SCREENS.setup, icon: 'psychology', label: 'Тренинг' },
    { id: SCREENS.masters_gallery, icon: 'leaderboard', label: 'Мастера' },
    { id: SCREENS.profile, icon: 'person', label: 'Профиль' }
  ];

  return (
    <nav className="ios-tab-bar">
      {items.map(item => {
        const isActive = screen === item.id;
        return (
          <button 
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'text-primary -translate-y-2' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <div className="relative">
              <span className="material-symbols-outlined !text-2xl">{item.icon}</span>
              {isActive && (
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl -z-10 animate-pulse" />
              )}
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase ${
              isActive ? 'opacity-100' : 'opacity-40'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

const ProgressGlowBar = ({ value, color }) => {
  const colorMap = {
    blue: 'bg-neon-blue glow-blue',
    magenta: 'bg-neon-magenta glow-magenta',
    green: 'bg-neon-green glow-green',
    primary: 'bg-primary glow-primary',
    gold: 'bg-neon-gold glow-gold'
  };

  return (
    <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
      <div 
        className={`h-full rounded-full ${colorMap[color]} transition-all duration-1000`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

const MetricCard = ({ label, value, color, icon }) => (
  <div className="glass-card p-5 rounded-2xl flex flex-col gap-3 group transition-transform hover:scale-[1.02]">
    <div className="flex gap-6 justify-between items-end">
      <div className="flex flex-col">
        <span className={`text-${color} text-[10px] font-bold uppercase tracking-widest opacity-70`}>
          {label}
        </span>
        <p className="text-white text-lg font-bold leading-none tracking-tight">
          {value}%
        </p>
      </div>
    </div>
    <ProgressGlowBar value={value} color={color} />
    <div className="flex items-center gap-2">
      <span className={`material-symbols-outlined text-${color} text-xs`}>{icon}</span>
      <p className="text-white/50 text-[11px] font-medium leading-normal tracking-tight uppercase">
        {color === 'blue' ? 'Неоновая синяя свечение' :
         color === 'magenta' ? 'Неоновая пурпурная свечение' :
         color === 'green' ? 'Неоновая зеленая свечение' :
         'Основное глубокое свечение'}
      </p>
    </div>
  </div>
);

const ClientCard = ({ client, selected, onClick }) => (
  <div 
    className={`snap-center flex h-full flex-col gap-4 min-w-[280px] cursor-pointer transition-all duration-300 ${
      selected ? 'scale-105' : 'opacity-80 hover:opacity-100'
    }`}
    onClick={onClick}
  >
    <div className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 ${
      selected ? 'border-primary glow-primary' : 'border-white/10'
    } group`}>
      <div className="absolute inset-0 bg-center bg-cover scanline opacity-80" 
           style={{backgroundImage: `url("https://api.dicebear.com/7.x/avataaars/svg?seed=${client.name}&backgroundColor=transparent")`}} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      
      {/* Somatic Markers */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {client.somatic.slice(0, 2).map((marker, i) => (
          <div key={i} className="glass-card px-2 py-1 rounded text-[9px] font-mono text-neon-blue flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            {marker}
          </div>
        ))}
      </div>
      
      {/* Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-lg font-bold tracking-tight text-white uppercase">{client.name}</p>
        <p className="text-xs text-white/50 tracking-widest uppercase">{client.profession} • {client.age}Л</p>
      </div>
      
      {/* Selection Indicator */}
      {selected && (
        <div className="absolute top-4 right-4 bg-primary text-background-dark text-[10px] font-black px-2 py-1 rounded-full shadow-lg">
          ВЫБРАН
        </div>
      )}
    </div>
  </div>
);

const ModalityButton = ({ modality, selected, onClick }) => (
  <button 
    onClick={onClick}
    className={`h-10 shrink-0 px-5 rounded-lg border transition-all duration-300 ${
      selected 
        ? 'bg-primary border-primary ring-2 ring-primary/20 text-white shadow-lg shadow-primary/30'
        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
    }`}
  >
    <span className="text-xs font-bold tracking-widest">{modality.name}</span>
  </button>
);

// --- 4. ЭКРАНЫ ---

// 1. LOADING SCREEN
const LoadingScreen = ({ onLoaded }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#020617] relative overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      {/* 3D Infinity Logo */}
      <div className="relative w-48 h-48 flex items-center justify-center perspective-1000">
        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
        <div className="relative floating-infinity drop-shadow-[0_0_30px_rgba(95,32,239,0.6)]">
          <svg className="text-white" fill="none" height="80" viewBox="0 0 160 80" width="160" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 20C20 20 20 60 40 60C50 60 60 50 80 40C100 30 110 20 120 20C140 20 140 60 120 60C110 60 100 50 80 40C60 30 50 20 40 20Z" 
                  stroke="url(#paint0_linear)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="40" x2="160" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5F20EF" />
                <stop offset="0.5" stopColor="#00D2FF" />
                <stop offset="1" stopColor="#5F20EF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-4 right-8 w-1 h-1 bg-cyan-spark rounded-full blur-[1px]" />
        </div>
      </div>

      {/* Typography */}
      <div className="text-center mt-8">
        <h1 className="text-white text-5xl font-extrabold tracking-tighter leading-none mb-4 text-glow">
          CONNECTUM
        </h1>
        <p className="text-indigo-glow/80 text-[10px] font-bold tracking-[0.4em] uppercase ml-[0.4em]">
          PRO PLATINUM
        </p>
      </div>

      {/* Loading Bar */}
      <div className="fixed bottom-16 w-64 flex flex-col gap-3">
        <div className="relative h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-primary to-indigo-glow animate-pulse" style={{width: '65%'}}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full loading-glow-head blur-[4px] animate-pulse" />
          </div>
        </div>
        <div className="flex justify-between items-center opacity-40">
          <span className="text-[10px] text-white font-medium tracking-widest uppercase">Initializing...</span>
          <span className="text-[10px] text-white font-medium">65%</span>
        </div>
      </div>

      {/* Slogan */}
      <div className="fixed bottom-8 text-center">
        <p className="text-white/50 text-xs font-light tracking-[0.05em]">
          Синергия мастерства и доверия
        </p>
      </div>

      {/* Texture Overlay */}
      <div className="fixed inset-0 z-20 pointer-events-none opacity-[0.03]" 
           style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')"}} />
    </div>
  );
};

// 2. LEGAL SCREEN
const LegalScreen = ({ onAccept }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 text-center animate-in">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      <div className="glass-card p-12 rounded-[4rem] max-w-sm border-t border-white/10 shadow-5xl animate-in">
        <div className="w-24 h-24 bg-indigo-500/10 rounded-[3rem] flex items-center justify-center mx-auto mb-12 shadow-inner">
          <span className="material-symbols-outlined text-5xl text-indigo-400">user</span>
        </div>
        <h2 className="text-3xl font-black mb-6 uppercase tracking-tight text-white leading-none">
          Соглашение
        </h2>
        <p className="text-[13px] text-slate-400 mb-6 leading-relaxed font-medium">
          Входя в Connectum Master Edition, вы подтверждаете совершеннолетие и согласны на обработку данных для обучения ИИ.
        </p>
        
        <label className="flex items-start gap-4 cursor-pointer text-left mb-8">
          <input 
            type="checkbox" 
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-white/20 bg-transparent text-primary focus:ring-primary focus:outline-none appearance-none border-2 checked:border-primary transition-all cursor-pointer"
          />
          <span className="text-[11px] font-bold text-white/60 leading-snug">
            Я подтверждаю, что мне исполнилось 18 лет и я согласен с условиями использования
          </span>
        </label>

        <button 
          onClick={() => agreed && onAccept()}
          className={`w-full py-6 rounded-[2.2rem] text-[11px] font-black uppercase tracking-widest text-white transition-all ${
            agreed 
              ? 'btn-platinum active:scale-95 shadow-3xl'
              : 'bg-white/10 opacity-50 cursor-not-allowed'
          }`}
          disabled={!agreed}
        >
          Принять и Войти
        </button>
      </div>
    </div>
  );
};

// 3. TERMINAL DASHBOARD
const TerminalDashboard = ({ setScreen, diamonds, isSubscribed }) => {
  return (
    <div className="h-screen flex flex-col bg-[#020617] overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 p-4 glass-card rounded-b-2xl border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-platinum-glow shadow-[0_0_8px_#6C26E6] animate-pulse" />
            <h2 className="text-white text-xs font-extrabold uppercase tracking-[0.2em] opacity-80">
              Connectum Pro Platinum
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-indigo-500/15 px-5 py-2.5 rounded-2xl border border-indigo-500/25 shadow-lg">
            <span className="text-[13px] font-black text-indigo-300 tracking-tighter">{diamonds}</span>
            <span className="material-symbols-outlined text-indigo-400 text-sm">diamond</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-32">
        {/* Central Infinity Hero */}
        <div className="relative flex items-center justify-center py-8">
          <div className="absolute w-[280px] h-[280px] bg-primary/10 rounded-full blur-[80px]" />
          <button className="relative group transition-transform duration-500 hover:scale-105 active:scale-95">
            <div className="flex items-center justify-center p-12 glass-card rounded-full border-primary/30 glow-primary">
              <span className="material-symbols-outlined text-[120px] text-primary" style={{fontVariationSettings: "'FILL' 1, 'wght' 200"}}>
                all_inclusive
              </span>
            </div>
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-white text-5xl font-black tracking-tighter leading-none mb-2 text-glow">
            PLATINUM HUB
          </h1>
          <p className="text-white/40 text-sm font-medium tracking-widest uppercase">
            Transformation Terminal
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-[400px] mx-auto flex flex-col gap-4">
          <button 
            onClick={() => setScreen(SCREENS.setup)}
            className="shimmer glass-card flex items-center justify-between w-full h-[84px] px-8 rounded-2xl group transition-all duration-300 active:bg-white/10 active:border-white/20"
          >
            <div className="flex flex-col items-start">
              <span className="text-white text-lg font-bold tracking-tight">Psychologists B2B</span>
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Enterprise Protocol</span>
            </div>
            <span className="material-symbols-outlined text-white/40 group-hover:text-primary group-hover:translate-x-1 transition-all">
              arrow_forward_ios
            </span>
          </button>
          
          <button 
            onClick={() => setScreen(SCREENS.client_hub)}
            className="shimmer glass-card flex items-center justify-between w-full h-[84px] px-8 rounded-2xl group transition-all duration-300 active:bg-white/10 active:border-white/20"
          >
            <div className="flex flex-col items-start">
              <span className="text-white text-lg font-bold tracking-tight">Clients B2C</span>
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Individual Session</span>
            </div>
            <span className="material-symbols-outlined text-white/40 group-hover:text-primary group-hover:translate-x-1 transition-all">
              arrow_forward_ios
            </span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 max-w-[400px] mx-auto">
          <button 
            onClick={() => setScreen(SCREENS.waitlist)}
            className="glass-card p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-neon-gold text-3xl">radio</span>
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Канал</span>
          </button>
          <button 
            onClick={() => setScreen(SCREENS.waitlist)}
            className="glass-card p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Поддержка</span>
          </button>
        </div>
      </main>

      <BottomNavigation screen={SCREENS.terminal_dashboard} setScreen={setScreen} />
    </div>
  );
};

// 4. SETUP SCREEN (Тренажер)
const SetupScreen = ({ 
  setScreen, 
  diamonds, 
  isSubscribed, 
  selectedModality, 
  setSelectedModality,
  selectedClientId,
  setSelectedClientId,
  difficulty,
  setDifficulty,
  clientPool,
  startSession
}) => {
  const currentClient = clientPool.find(c => c.id === selectedClientId) || clientPool[0];

  return (
    <div className="h-screen flex flex-col animate-in overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 p-4 glass-card rounded-b-2xl border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full border border-primary/50 p-0.5">
              <div className="w-full h-full rounded-full bg-center bg-cover" 
                   style={{backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=psychologist&backgroundColor=transparent")'}} />
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Доступ к Терминалу</h2>
              <p className="text-sm font-medium">Connectum Pro Platinum</p>
            </div>
          </div>
          <div className="bg-primary/20 px-3 py-1.5 rounded-lg border border-primary/30 flex items-center gap-2">
            <span className="text-xs font-bold tracking-tighter text-neon-gold">КВЕСТЫ +12</span>
            <span className="material-symbols-outlined text-neon-gold text-sm">diamond</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Tariffs Section */}
        <section className="mt-4">
          <div className="px-6 flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">Тарифы</h3>
            <span className="material-symbols-outlined text-xs text-neon-gold">payments</span>
          </div>
          <div className="px-6 grid grid-cols-2 gap-4">
            {/* Test Drive */}
            <div className="glass-card p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Тест-драйв</span>
                <span className="text-lg font-black text-neon-gold">490₽</span>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed mb-3">
                3 дня PRO функционала. Попробуйте все возможности.
              </p>
              <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-colors">
                Активировать
              </button>
            </div>
            
            {/* PRO */}
            <div className="glass-card p-4 rounded-xl border border-primary/30 glow-primary relative overflow-hidden">
              <div className="absolute -top-2 -right-2 bg-primary text-background-dark text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg">
                POPULAR
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">PRO</span>
                <span className="text-lg font-black text-primary">2990₽</span>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed mb-3">
                1 месяц бесконечных сессий + PDF отчеты + Витрина
              </p>
              <button className="w-full py-2 bg-primary hover:bg-primary/80 rounded-lg text-xs font-bold transition-colors">
                Активировать
              </button>
            </div>
          </div>
        </section>

        {/* Modality Section */}
        <section className="mt-8">
          <div className="px-6 flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">Метод терапии</h3>
            <span className="material-symbols-outlined text-xs text-neon-blue">settings_input_component</span>
          </div>
          <div className="flex gap-3 px-6 overflow-x-auto pb-2 no-scrollbar">
            {Object.values(MODALITIES).map(mod => (
              <ModalityButton
                key={mod.id}
                modality={mod}
                selected={selectedModality === mod.id}
                onClick={() => setSelectedModality(mod.id)}
              />
            ))}
          </div>
        </section>

        {/* Client Selection */}
        <section className="mt-8">
          <div className="px-6 mb-4 flex items-center justify-between">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">Выбор клиента</h3>
            <span className="text-[10px] text-neon-blue font-mono">{clientPool.length} КЕЙСОВ</span>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
            <div className="flex items-stretch px-6 gap-4">
              {clientPool.map(client => (
                <ClientCard
                  key={client.id}
                  client={client}
                  selected={selectedClientId === client.id}
                  onClick={() => setSelectedClientId(client.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Difficulty Selection */}
        <section className="mt-8 px-6">
          <h3 className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase mb-4">Сложность симуляции</h3>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map(lvl => (
              <button
                key={lvl}
                onClick={() => setDifficulty(lvl)}
                className={`glass-card py-3 rounded-xl border transition-all ${
                  difficulty === lvl 
                    ? 'border-primary/40 bg-primary/10 ring-2 ring-primary/20'
                    : 'border-white/5 hover:bg-white/5'
                }`}
              >
                <span className={`block text-[10px] font-bold mb-1 ${
                  difficulty === lvl ? 'text-primary' : 'text-white/30'
                }`}>
                  УРОВЕНЬ 0{lvl}
                </span>
                <span className={`block text-xs font-medium ${
                  difficulty === lvl ? 'text-white' : 'text-white/60'
                }`}>
                  {lvl === 1 ? 'НОВИЧОК' : lvl === 2 ? 'ПРОДВИНУТЫЙ' : 'ЭКСПЕРТ'}
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation screen={SCREENS.setup} setScreen={setScreen} />
      
      {/* Fixed Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-50">
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/90 to-transparent -z-10" />
        <button 
          onClick={startSession}
          className="premium-shine w-full h-16 rounded-2xl flex items-center justify-between px-8 shadow-[0_0_30px_rgba(89,24,201,0.4)] border border-primary/50 group active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-white text-2xl group-hover:rotate-12 transition-transform">psychology</span>
            <span className="text-lg font-bold tracking-tight text-white">НАЧАТЬ ТРЕНИРОВКУ</span>
          </div>
          <div className="flex items-center gap-2 bg-black/20 px-4 py-1.5 rounded-lg border border-white/10">
            <span className="text-sm font-bold text-neon-gold">💎 {isSubscribed ? '∞' : '1'}</span>
            <span className="material-symbols-outlined text-xs text-neon-gold">bolt</span>
          </div>
        </button>
      </div>

      {/* Background Tech Detail */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left ml-2 pointer-events-none opacity-20">
        <span className="text-[8px] font-mono tracking-[0.5em] text-white uppercase leading-none whitespace-nowrap">
          CONNECTUM PLATINUM TERMINAL v4.2 // NEURAL SYNC ACTIVE // [OK]
        </span>
      </div>
    </div>
  );
};

// 5. CHAT SCREEN (Психолог)
const ChatScreen = ({ 
  setScreen, 
  messages, 
  setMessages, 
  inputText, 
  setInputText, 
  isTyping, 
  setIsTyping,
  selectedModality,
  selectedClientId,
  difficulty,
  finishSession
}) => {
  const chatEndRef = useRef(null);
  const tg = window.Telegram?.WebApp;
  const userId = useMemo(() => tg?.initDataUnsafe?.user?.id?.toString() || 'dev_platinum_master', [tg]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recognitionRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Voice Recognition Setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'ru-RU';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsRecording(false);
        setRecordingTime(0);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setRecordingTime(0);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        setRecordingTime(0);
      };
    }
  }, []);

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Голосовой ввод не поддерживается в вашем браузере');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
    }
  };

  const handleSend = async (text = inputText, isInitial = false, action = 'chat', flow = null) => {
    if (!text && !isInitial) return;
    
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
          action: action || '', 
          selectedClientId: selectedClientId || 'c1', 
          role: 'psychologist', 
          flow: flow || '', 
          difficulty: Number(difficulty),
          history: messages
            .filter(m => m.role !== 'hint')
            .map(m => ({ role: m.role, content: m.content }))
            .slice(-12) 
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server Error");
      
      if(action === 'get_hint') {
        setMessages(p => [...p, { role: 'hint', content: data.hint }]);
      } else if(data.content) {
        setMessages(p => [...p, { role: 'ai', content: data.content, voice: data.voice }]);
        if(data.voice) {
          const audio = new Audio(`data:audio/mp3;base64,${data.voice}`);
          audio.play().catch(e => console.warn("Audio play blocked", e));
        }
      }
    } catch(e) { 
      console.error(e.message);
    } finally { 
      setIsTyping(false); 
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#1a1f28] relative overflow-hidden">
      <GlobalStyles />
      
      {/* TopAppBar */}
      <header className="flex items-center bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-white/5 z-20">
        <button 
          onClick={() => setScreen(SCREENS.setup)}
          className="flex size-12 shrink-0 items-center justify-start cursor-pointer"
        >
          <span className="material-symbols-outlined text-white">chevron_left</span>
        </button>
        <div className="flex flex-col items-center flex-1">
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] font-mono">29:57</h2>
          <span className="text-[10px] text-[#a99db8] font-bold tracking-widest uppercase">
            ID: PX-992 <span className="text-[#39FF14] animate-pulse">●</span>
          </span>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button className="flex size-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-white text-[20px]">info</span>
          </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6 pb-40 no-scrollbar">
        {/* Section Header */}
        <div className="flex flex-col items-center py-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
          <h4 className="text-[#a99db8] text-[11px] font-bold leading-normal tracking-[0.2em] uppercase">
            Сессия начата: 09:00 — Терминал активен
          </h4>
        </div>

        {/* Messages */}
        {messages.map((m, i) => (
          <div key={i} className={`flex items-end gap-3 max-w-[85%] ${m.role === 'user' ? 'ml-auto justify-end' : ''}`}>
            {m.role !== 'user' && (
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 shrink-0 border border-white/10"
                   style={{backgroundImage: `url("https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedClientId}&backgroundColor=transparent")`}} />
            )}
            <div className={`flex flex-col gap-1 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              {m.role === 'user' && (
                <p className="text-[#a99db8] text-[11px] font-bold leading-normal mr-1">СТАЖИР ПСИХОЛОГ</p>
              )}
              {m.role === 'ai' && (
                <p className="text-[#a99db8] text-[11px] font-bold leading-normal ml-1">КЛИЕНТ (AI_NODE_01)</p>
              )}
              {m.role === 'hint' && (
                <p className="text-supervisor-orange text-[11px] font-bold leading-tight uppercase tracking-widest">Совет супервизора</p>
              )}
              
              <div className={`text-sm font-normal leading-relaxed rounded-xl px-4 py-3 shadow-lg ${
                m.role === 'user' 
                  ? 'psych-bubble text-white' 
                  : m.role === 'hint'
                  ? 'supervisor-card text-white border-l-4 border-supervisor-orange'
                  : 'client-bubble text-slate-100'
              }`}>
                {m.content}
              </div>
            </div>
            {m.role === 'user' && (
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 shrink-0 border border-primary/50"
                   style={{backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=psychologist&backgroundColor=transparent")'}} />
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2.5 p-6 bg-slate-800/70 rounded-[2.5rem] w-fit border border-white/5 shadow-3xl bubble-ai">
            <div className="loader-dots flex gap-2.5">
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.15s'}} />
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.3s'}} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Glassmorphic Footer */}
      <footer className="fixed bottom-0 left-0 right-0 glass-footer p-4 pb-8 z-30">
        <div className="max-w-md mx-auto flex flex-col gap-4">
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => handleSend("Проанализируй ситуацию и дай профессиональный совет супервизора", false, 'get_hint')}
              className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-3 text-sm font-bold transition-all active:scale-95"
            >
              <span className="text-red-500">🆘</span> Помощь
            </button>
            <button 
              onClick={finishSession}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 rounded-lg py-3 text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span> Завершить
            </button>
          </div>

          {/* Terminal Input */}
          <div className="relative flex items-center">
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none text-white placeholder:text-white/20" 
              placeholder="Введите ответ..." 
              type="text"
            />
            <button 
              onClick={toggleVoiceInput}
              className={`absolute right-12 p-2 transition-colors ${
                isRecording ? 'text-red-500 animate-pulse' : 'text-white/40 hover:text-white'
              }`}
              title={isRecording ? `Запись... ${recordingTime}с` : 'Голосовой ввод'}
            >
              <span className="material-symbols-outlined">{isRecording ? 'mic' : 'mic_off'}</span>
            </button>
            <button 
              onClick={() => handleSend()}
              className="absolute right-2 p-2 text-primary"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Background Scanline Effect */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" 
           style={{background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 4px, 3px 100%"}} />
    </div>
  );
};

// 6. SESSION SUMMARY SCREEN
const SessionSummaryScreen = ({ setScreen, sessionMetrics, isSubscribed }) => {
  return (
    <div className="h-screen flex flex-col bg-[#020617] overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      <TopAppBar 
        onBack={() => setScreen(SCREENS.terminal_dashboard)}
        title="Итог сессии"
        onSettings={() => setScreen(SCREENS.settings)}
        settingsIcon="settings"
      />

      <main className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto no-scrollbar">
        {/* Master ID Stamp */}
        <div className="flex flex-col items-center justify-center py-4 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          <div className="glass-card px-4 py-1.5 rounded-full border border-primary/30 z-10">
            <h4 className="text-primary text-[10px] font-black leading-normal tracking-[0.2em] uppercase">
              ID МАСТЕРА: CNCT-992-PX
            </h4>
          </div>
          <p className="text-white/40 text-[11px] mt-2 font-medium tracking-tight">
            ТЕРМИНАЛ // ГЛУБОКОЕ КОСМОС
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 gap-4">
          <MetricCard label="Метрика 01" value={sessionMetrics?.technique || 85} color="blue" icon="auto_awesome" />
          <MetricCard label="Метрика 02" value={sessionMetrics?.empathy || 92} color="magenta" icon="favorite" />
          <MetricCard label="Метрика 03" value={sessionMetrics?.structure || 78} color="green" icon="account_tree" />
          <MetricCard label="Метрика 04" value={sessionMetrics?.ethics || 96} color="primary" icon="verified_user" />
        </div>

        {/* Insight Text */}
        <div className="py-4 border-t border-white/5 mt-2">
          <p className="text-white/70 text-sm leading-relaxed tracking-tight">
            <span className="text-white font-bold">Аналитический вывод:</span> {sessionMetrics?.insight || "Клиент продемонстрировал исключительную эмоциональную резонансность. Рекомендуется увеличить структурную сложность для соответствия высоким баллам эмпатии."}
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-auto pt-6 pb-10 flex flex-col gap-4">
          {!isSubscribed && (
            <button 
              onClick={() => setScreen(SCREENS.pro_dashboard)}
              className="premium-shine w-full py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(99,102,242,0.3)] transition-all active:scale-95 group"
            >
              <span className="text-xl">💎</span>
              <span className="text-white font-extrabold tracking-tight">PRO для PDF отчета</span>
              <span className="material-symbols-outlined text-white/50 text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          )}
          <button 
            onClick={() => setScreen(SCREENS.terminal_dashboard)}
            className="w-full py-4 text-white/40 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
          >
            Вернуться в Терминал
          </button>
        </div>
      </main>

      <div className="home-indicator" />
    </div>
  );
};

// 7. CLIENT HUB SCREEN (B2C - Super Premium)
const ClientHubScreen = ({ setScreen, handleSend, diamonds, isSubscribed }) => {
  return (
    <div className="h-screen flex flex-col bg-[#020617] overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      {/* Header with Diamonds */}
      <header className="sticky top-0 z-50 p-4 glass-card rounded-b-2xl border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full border border-primary/50 p-0.5">
              <div className="w-full h-full rounded-full bg-center bg-cover" 
                   style={{backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face")'}} />
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Client Portal</h2>
              <p className="text-sm font-medium">Connectum AI Therapy</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary/15 px-5 py-2.5 rounded-2xl border border-primary/25 shadow-lg">
            <span className="text-[13px] font-black text-primary tracking-tighter">{diamonds}</span>
            <span className="material-symbols-outlined text-primary text-sm">diamond</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-32">
        {/* Premium Card */}
        <div className="p-12 bg-gradient-to-br from-indigo-600/35 to-indigo-900/60 rounded-[4rem] border border-indigo-500/25 flex justify-between items-center relative overflow-hidden group active:scale-95 transition shadow-5xl">
          <div className="absolute -bottom-12 -right-12 opacity-10 group-hover:scale-125 transition-transform duration-1000 rotate-12">
            <span className="material-symbols-outlined text-[100px]">diamond</span>
          </div>
          <div className="relative z-10">
            <h4 className="text-[12px] font-black uppercase text-indigo-300 tracking-[0.4em]">Client Premium</h4>
            <p className="text-[14px] font-bold text-indigo-100/70 mt-3 uppercase tracking-tight leading-none">ИИ-терапия 24/7</p>
          </div>
          <div className="relative z-10 text-right">
            <span className="text-4xl font-black text-white leading-none">1990₽</span>
            <button className="block bg-indigo-500 hover:bg-indigo-400 text-[11px] font-black uppercase px-10 py-4.5 rounded-2xl mt-6 shadow-3xl active:scale-95 transition-all">
              Купить
            </button>
          </div>
        </div>

        {/* Action Buttons - Split into 2 sections */}
        <div className="grid gap-6">
          {/* ИИ-Диагностика */}
          <div className="glass-card p-6 rounded-2xl border-l-4 border-l-indigo-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-14 rounded-2xl bg-indigo-500/15 flex items-center justify-center text-3xl">
                🔍
              </div>
              <div>
                <h4 className="text-xl font-black text-white uppercase tracking-tight">ИИ-Диагностика</h4>
                <p className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest">Deep Root Analysis</p>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              Глубокий анализ корня проблемы через интегральный подход. Поиск скрытых паттернов и ограничивающих убеждений.
            </p>
            <button 
              onClick={() => {
                setScreen(SCREENS.chat);
                handleSend("Мне нужна глубокая диагностика моего текущего состояния", true, 'chat', 'diagnostics');
              }}
              className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">search</span>
              Начать диагностику
            </button>
          </div>

          {/* ИИ-Психолог */}
          <div className="glass-card p-6 rounded-2xl border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-3xl">
                ✨
              </div>
              <div>
                <h4 className="text-xl font-black text-white uppercase tracking-tight">ИИ-Психолог</h4>
                <p className="text-[11px] font-bold text-emerald-300 uppercase tracking-widest">24/7 Support</p>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              Бережная психологическая поддержка в любое время. Адаптивные методы терапии под ваше текущее состояние.
            </p>
            <button 
              onClick={() => {
                setScreen(SCREENS.chat);
                handleSend("Мне нужна срочная психологическая помощь", true, 'chat', 'therapy');
              }}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">support_agent</span>
              Получить поддержку
            </button>
          </div>
        </div>

        {/* Referral */}
        <button className="w-full text-center text-[12px] font-black text-indigo-400 uppercase tracking-[0.5em] bg-indigo-500/5 p-9 rounded-[3.2rem] border border-indigo-500/15 shadow-xl mt-10 transition-all flex items-center justify-center gap-4 transform hover:scale-[1.02]">
          Приведи друга = +3 <span className="material-symbols-outlined text-sm">diamond</span>
        </button>
      </main>

      <BottomNavigation screen={SCREENS.client_hub} setScreen={setScreen} />
    </div>
  );
};

// 8. MASTERS GALLERY SCREEN
const MastersGalleryScreen = ({ setScreen, isSubscribed, masters }) => {
  return (
    <div className="h-screen flex flex-col bg-[#020617] overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      <TopAppBar 
        onBack={() => setScreen(SCREENS.terminal_dashboard)}
        title="Витрина"
        onSettings={() => {}}
        settingsIcon="search"
      />

      <main className="flex-1 px-6 py-4 flex flex-col gap-8 overflow-y-auto no-scrollbar pb-32">
        {/* Podium */}
        <div className="flex flex-col gap-6 mb-10">
          {/* 1st Place */}
          <div className="glass-card p-5 rounded-xl border-t border-neon-gold/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-20">
              <span className="material-symbols-outlined text-neon-gold text-6xl">military_tech</span>
            </div>
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="size-24 rounded-full bg-cover bg-center border-2 border-neon-gold shadow-[0_0_15px_rgba(255,168,5,0.5)]"
                     style={{backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=DrJulian&backgroundColor=transparent")'}} />
                <div className="absolute -bottom-2 -right-2 bg-neon-gold text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">1ST</div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold tracking-tighter text-white">Dr. Julian Vane</h2>
                <p className="text-[10px] font-bold tracking-widest text-neon-gold uppercase mb-3">Master ID: CP-001</p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-[9px] text-white/50 uppercase tracking-widest mb-0.5">Transformations</p>
                    <p className="text-xl font-bold leading-none">154</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <p className="text-[9px] text-white/50 uppercase tracking-widest mb-0.5">Mastery Level</p>
                    <p className="text-xl font-bold leading-none text-neon-gold">9.9</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd and 3rd */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl border-t border-silver/30 relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div className="size-16 rounded-full bg-cover bg-center border-2 border-silver shadow-[0_0_10px_rgba(192,192,192,0.3)]"
                       style={{backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=DrElena&backgroundColor=transparent")'}} />
                  <div className="absolute -bottom-1 -right-1 bg-silver text-black text-[9px] font-black px-1.5 py-0.5 rounded-full">2ND</div>
                </div>
                <h3 className="text-sm font-bold tracking-tighter line-clamp-1">Dr. Elena Thorne</h3>
                <p className="text-[10px] text-silver font-bold tracking-tighter mb-3">9.8 Mastery</p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-silver w-[98%]" />
                </div>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl border-t border-bronze/30 relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div className="size-16 rounded-full bg-cover bg-center border-2 border-bronze shadow-[0_0_10px_rgba(205,127,50,0.3)]"
                       style={{backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=ProfMarcus&backgroundColor=transparent")'}} />
                  <div className="absolute -bottom-1 -right-1 bg-bronze text-black text-[9px] font-black px-1.5 py-0.5 rounded-full">3RD</div>
                </div>
                <h3 className="text-sm font-bold tracking-tighter line-clamp-1">Prof. Marcus Reeve</h3>
                <p className="text-[10px] text-bronze font-bold tracking-tighter mb-3">9.7 Mastery</p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-bronze w-[97%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List Header */}
        <div className="flex items-center justify-between px-1 mb-4">
          <h3 className="text-[10px] font-black tracking-widest-extra text-white/40 uppercase">Элитный рейтинг</h3>
          <span className="text-[10px] font-bold text-neon-gold px-2 py-0.5 bg-neon-gold/10 rounded border border-neon-gold/20">
            ВСЕГО: 1,402
          </span>
        </div>

        {/* Scrollable List */}
        <div className="flex flex-col gap-3">
          {[4, 5, 6, 7].map(rank => (
            <div key={rank} className="glass-card rounded-lg p-3 flex items-center gap-4 group hover:border-primary/30 transition-all">
              <span className="text-white/20 font-black italic text-lg w-6">{rank.toString().padStart(2, '0')}</span>
              <div className="size-12 rounded-lg bg-cover bg-center border border-white/10"
                   style={{backgroundImage: `url("https://api.dicebear.com/7.x/avataaars/svg?seed=Master${rank}&backgroundColor=transparent")`}} />
              <div className="flex-1">
                <h4 className="text-sm font-bold tracking-tighter">Dr. Sarah Kostic</h4>
                <p className="text-[9px] text-white/40 tracking-widest uppercase">ID: CP-9021</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/40 uppercase font-bold">Ур</span>
                  <span className="text-xs font-bold text-white">9.6</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[80%]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNavigation screen={SCREENS.masters_gallery} setScreen={setScreen} />
    </div>
  );
};

// 9. PROFILE SCREEN
const ProfileScreen = ({ 
  setScreen, 
  diamonds, 
  userProfile, 
  setUserProfile, 
  handlePhotoUpload,
  fileInputRef
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userProfile);

  const handleSave = () => {
    setUserProfile(editData);
    setIsEditing(false);
    showToast("Профиль сохранен");
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617] overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      <TopAppBar 
        onBack={() => setScreen(SCREENS.terminal_dashboard)}
        title="Профиль"
        onSettings={() => setScreen(SCREENS.settings)}
        settingsIcon="bolt"
      />

      <main className="flex-1 px-6 py-4 flex flex-col gap-8 overflow-y-auto no-scrollbar pb-32">
        {/* Profile Header */}
        <div className="flex flex-col items-center pt-4">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-20 animate-pulse" />
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-primary via-primary/20 to-primary/80">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-48 w-48 border-4 border-[#020617] cursor-pointer"
                   onClick={() => fileInputRef.current?.click()}
                   style={{backgroundImage: editData.photoUrl 
                     ? `url(${editData.photoUrl})` 
                     : 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=psychologist&backgroundColor=transparent")'}}>
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handlePhotoUpload}
              />
            </div>
            <div className="absolute -bottom-2 right-12 bg-primary text-background-dark text-[10px] font-bold px-3 py-1 rounded-full tracking-tighter uppercase shadow-[0_0_10px_rgba(0,238,255,0.6)]">
              Platinum
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            {isEditing ? (
              <input 
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-3xl font-bold text-center focus:ring-2 focus:ring-primary outline-none"
                placeholder="Имя Фамилия"
              />
            ) : (
              <p className="text-white text-3xl font-bold leading-tight tracking-[-0.02em] text-center mb-1">
                {userProfile.name || 'Dr. Aris Thorne'}
              </p>
            )}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_#00eeff]" />
              <p className="text-primary/80 text-sm font-medium tracking-widest uppercase">Clinical Psychology</p>
            </div>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="w-full flex flex-col gap-3 mb-12">
          {/* Experience */}
          <div className="glass-card px-5 py-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined text-sm">work_history</span>
                </div>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Опыт работы</span>
              </div>
              {isEditing && (
                <input 
                  type="text"
                  value={editData.experience || ''}
                  onChange={(e) => setEditData({...editData, experience: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs w-24 text-right"
                  placeholder="12+ лет"
                />
              )}
            </div>
            {!isEditing && (
              <p className="text-white text-base font-medium">{userProfile.experience || '12+ Years High-Performance'}</p>
            )}
          </div>

          {/* Methods */}
          <div className="glass-card px-5 py-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                </div>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Методы</span>
              </div>
              {isEditing && (
                <input 
                  type="text"
                  value={editData.methods || ''}
                  onChange={(e) => setEditData({...editData, methods: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs w-32 text-right"
                  placeholder="CBT, MPT..."
                />
              )}
            </div>
            {!isEditing && (
              <p className="text-white text-base font-medium">{userProfile.methods || 'CBT & Neuro-Linguistic'}</p>
            )}
          </div>

          {/* Price */}
          <div className="glass-card px-5 py-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined text-sm">payments</span>
                </div>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Стоимость</span>
              </div>
              {isEditing && (
                <input 
                  type="number"
                  value={editData.price || ''}
                  onChange={(e) => setEditData({...editData, price: e.target.value})}
                  className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs w-24 text-right"
                  placeholder="0"
                />
              )}
            </div>
            {!isEditing && (
              <div className="flex items-center justify-between">
                <p className="text-white text-base font-medium">{userProfile.price ? `${userProfile.price}₽` : 'Premium Tier Sessions'}</p>
                <p className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded">PLATINUM</p>
              </div>
            )}
          </div>

          {/* About */}
          <div className="glass-card px-5 py-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined text-sm">description</span>
                </div>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">О себе</span>
              </div>
              {isEditing && (
                <button onClick={handleSave} className="bg-primary text-white text-xs font-bold px-3 py-1 rounded hover:bg-primary/80">
                  Сохранить
                </button>
              )}
            </div>
            {isEditing ? (
              <textarea 
                value={editData.about || ''}
                onChange={(e) => setEditData({...editData, about: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm min-h-[80px] focus:ring-2 focus:ring-primary outline-none"
                placeholder="Расскажите о себе, вашем опыте и подходе к терапии..."
              />
            ) : (
              <p className="text-white/70 text-sm leading-relaxed">
                {userProfile.about || 'Специализируюсь на интегральной терапии и работе с глубинными паттернами. Помогаю клиентам преодолевать ограничения и достигать осознанности.'}
              </p>
            )}
          </div>

          {/* Video Pitch */}
          <div className="glass-card-hover glass-card px-5 py-4 rounded-xl justify-between cursor-pointer transition-all"
               onClick={() => !isEditing && setScreen(SCREENS.radar)}>
            <div className="flex items-center gap-4">
              <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-11">
                <span className="material-symbols-outlined">videocam</span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Видео-визитка</p>
                <p className="text-white text-base font-medium">Профессиональное введение</p>
              </div>
            </div>
            <div className="shrink-0">
              <span className="material-symbols-outlined text-white/40">arrow_forward_ios</span>
            </div>
          </div>

          {/* Edit Toggle */}
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">{isEditing ? 'close' : 'edit'}</span>
            {isEditing ? 'Отменить редактирование' : 'Редактировать профиль'}
          </button>
        </div>

        {/* Quest Hub */}
        <div className="w-full">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Квесты</h3>
              <p className="text-white/40 text-sm">Выполняйте задания для повышения уровня</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-primary text-sm">diamond</span>
              <span className="text-primary font-bold text-sm">{diamonds}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-xl opacity-20 blur group-hover:opacity-40 transition" />
              <div className="relative glass-card p-5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">add_a_photo</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Профиль</h4>
                    <p className="text-xs text-white/50">Загрузите фото профиля</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg border border-primary/20">
                  <span className="text-xs font-bold">+1</span>
                  <span className="material-symbols-outlined text-sm">diamond</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-indigo-600 rounded-xl opacity-20 blur group-hover:opacity-40 transition" />
              <div className="relative glass-card p-5 rounded-xl flex items-center justify-between border-primary/30">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center shadow-[0_0_10px_rgba(0,238,255,0.2)]">
                    <span className="material-symbols-outlined text-primary">play_circle</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Видео-визитка</h4>
                    <p className="text-xs text-white/50">Загрузите 60 секунд</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 rounded-lg border border-primary/30">
                  <span className="text-xs font-bold">+3</span>
                  <span className="material-symbols-outlined text-sm">diamond</span>
                </div>
              </div>
            </div>

            <div className="relative glass-card p-6 rounded-2xl border-primary/40 overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <span className="material-symbols-outlined text-[100px] -rotate-12">groups</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">stars</span>
                  <h4 className="font-bold text-lg tracking-tight">Амбассадор</h4>
                </div>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Приглашайте коллег в систему. Получайте постоянные множители за каждого приглашенного.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center bg-black/40 border border-white/10 rounded-lg overflow-hidden group/link">
                    <div className="flex-1 px-4 py-3 text-xs font-mono text-white/40 truncate">
                      connectum.pro/ref/aris_thorne_99
                    </div>
                    <button className="bg-primary text-background-dark px-4 py-3 flex items-center justify-center hover:bg-white transition-colors">
                      <span className="material-symbols-outlined text-lg">content_copy</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-2 py-2 text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
                    <span className="w-8 h-px bg-primary/20" />
                    Следующая награда: Elite Badge
                    <span className="w-8 h-px bg-primary/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation screen={SCREENS.profile} setScreen={setScreen} />
    </div>
  );
};

// 10. SETTINGS SCREEN
const SettingsScreen = ({ setScreen, isSubscribed, setIsSubscribed }) => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: true,
    autoSave: true
  });

  const handleLogout = () => {
    localStorage.clear();
    setScreen(SCREENS.loading);
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617] overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      <TopAppBar 
        onBack={() => setScreen(SCREENS.profile)}
        title="Настройки"
      />

      <main className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-32">
        {/* Subscription Status */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold">Статус подписки</h3>
              <p className="text-white/60 text-sm">
                {isSubscribed ? 'PRO Тариф активен' : 'Free Тариф'}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              isSubscribed ? 'bg-neon-gold text-black' : 'bg-white/10 text-white/60'
            }`}>
              {isSubscribed ? 'PRO' : 'FREE'}
            </span>
          </div>
          {!isSubscribed && (
            <button 
              onClick={() => setScreen(SCREENS.pro_dashboard)}
              className="w-full py-3 bg-neon-gold text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors"
            >
              Активировать PRO
            </button>
          )}
        </div>

        {/* PRO Features */}
        {isSubscribed && (
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4">PRO Функции</h3>
            <div className="space-y-3">
              {[
                'Бесконечные сессии',
                'Расширенный аудит',
                'PDF отчеты',
                'Витрина мастеров',
                'Приоритет выдачи'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-neon-gold text-sm">check_circle</span>
                  <span className="text-white/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Настройки</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Тема</span>
              <span className="text-white/40 text-sm">Тёмная (по умолчанию)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Уведомления</span>
              <input 
                type="checkbox" 
                checked={settings.notifications}
                onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                className="h-5 w-5 rounded border-white/20 bg-transparent text-primary focus:ring-primary focus:outline-none appearance-none border-2 checked:border-primary transition-all cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Автосохранение</span>
              <input 
                type="checkbox" 
                checked={settings.autoSave}
                onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
                className="h-5 w-5 rounded border-white/20 bg-transparent text-primary focus:ring-primary focus:outline-none appearance-none border-2 checked:border-primary transition-all cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Управление данными</h3>
          <div className="space-y-3">
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-colors">
              Экспорт данных
            </button>
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-colors">
              Очистка кэша
            </button>
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-2xl text-red-400 font-bold transition-colors"
        >
          Выйти из аккаунта
        </button>
      </main>

      <div className="home-indicator" />
    </div>
  );
};

// 11. PRO DASHBOARD SCREEN
const ProDashboardScreen = ({ setScreen, history }) => {
  const proStats = {
    totalSessions: history.length,
    avgScore: history.length > 0 
      ? Math.round(history.reduce((sum, s) => sum + s.metrics.empathy, 0) / history.length)
      : 0,
    activeClients: 3
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617] overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      <TopAppBar 
        onBack={() => setScreen(SCREENS.settings)}
        title="PRO Dashboard"
      />

      <main className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-32">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-xl text-center">
            <p className="text-3xl font-black text-white">{proStats.totalSessions}</p>
            <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1">Сессии</p>
          </div>
          <div className="glass-card p-4 rounded-xl text-center">
            <p className="text-3xl font-black text-neon-gold">{proStats.avgScore}%</p>
            <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1">Средний балл</p>
          </div>
          <div className="glass-card p-4 rounded-xl text-center">
            <p className="text-3xl font-black text-primary">{proStats.activeClients}</p>
            <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1">Клиенты</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Быстрые действия</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setScreen(SCREENS.pdf_report)}
              className="w-full py-3 bg-primary hover:bg-primary/80 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">picture_as_pdf</span>
              Генерация PDF отчета
            </button>
            <button 
              onClick={() => setScreen(SCREENS.masters_gallery)}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">leaderboard</span>
              Доступ к витрине
            </button>
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">support_agent</span>
              Приоритетная поддержка
            </button>
          </div>
        </div>

        {/* History */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">История сессий</h3>
          {history.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-4">Нет завершенных сессий</p>
          ) : (
            <div className="space-y-3">
              {history.slice(-5).reverse().map((session, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                  <div>
                    <p className="text-sm font-bold">{session.clientId}</p>
                    <p className="text-[10px] text-white/40">{new Date(session.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-neon-gold">{session.metrics.empathy}%</p>
                    <p className="text-[10px] text-white/40">Эмпатия</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <div className="home-indicator" />
    </div>
  );
};

// 12. PDF REPORT SCREEN
const PdfReportScreen = ({ setScreen }) => {
  return (
    <div className="h-screen flex flex-col bg-[#020617] overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      <TopAppBar 
        onBack={() => setScreen(SCREENS.pro_dashboard)}
        title="PDF Аудит Отчет"
      />

      <main className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-32">
        {/* Preview */}
        <div className="glass-card p-8 rounded-2xl aspect-[3/4] flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-white/20 mb-4">description</span>
            <p className="text-white/40 text-sm">PDF Предпросмотр</p>
          </div>
        </div>

        {/* Details */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Детали отчета</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/60">ID Сессии</span>
              <span className="text-white font-mono">CNCT-992-PX</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Дата</span>
              <span className="text-white">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Длительность</span>
              <span className="text-white">29:57</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Рекомендации</h3>
          <p className="text-white/70 text-sm leading-relaxed">
            Клиент продемонстрировал исключительную эмоциональную резонансность. Рекомендуется увеличить структурную сложность для соответствия высоким баллам эмпатии.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full py-4 premium-shine rounded-2xl text-white font-bold flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">download</span>
            Скачать PDF
          </button>
          <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">share</span>
            Поделиться
          </button>
        </div>
      </main>

      <div className="home-indicator" />
    </div>
  );
};

// 13. WAITLIST SCREEN
const WaitlistScreen = ({ setScreen }) => {
  const [agreed, setAgreed] = useState(false);

  const handleJoinWaitlist = () => {
    if (!agreed) return;
    // API call would go here
    alert("Заявка отправлена админу");
    setScreen(SCREENS.terminal_dashboard);
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617] overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      <TopAppBar 
        onBack={() => setScreen(SCREENS.terminal_dashboard)}
        title="Лист ожидания"
      />

      <main className="flex-1 px-6 py-4 flex flex-col items-center justify-center gap-6">
        <div className="glass-card p-8 rounded-2xl text-center max-w-sm">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-neon-gold/20 blur-2xl rounded-full" />
            <div className="relative flex items-center justify-center size-20 rounded-full border-2 border-neon-gold/30 bg-neon-gold/10 mx-auto">
              <span className="material-symbols-outlined text-4xl text-neon-gold">hourglass_empty</span>
            </div>
          </div>
          
          <h1 className="text-white tracking-tighter text-2xl font-black leading-none mb-4 uppercase">
            ЛИСТ ОЖИДАНИЯ<br/><span className="text-neon-gold">РЕГИСТРАЦИЯ</span>
          </h1>
          
          <div className="w-full h-px bg-white/10 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-gold/20 to-transparent animate-pulse" />
          </div>
          
          <p className="text-white/70 text-sm font-normal leading-relaxed mb-8">
            ОБНАРУЖЕН СБОЙ АВТОМАТИЧЕСКОЙ ТРАНЗАКЦИИ.<br/>
            ЧТОБЫ ЗАБРОНИРОВАТЬ МЕСТО ЧЕРЕЗ <span className="text-white font-bold">РУЧНОЕ ВМЕШАТЕЛЬСТВО</span>, СОГЛАСИТЕСЬ С ПРОТОКОЛОМ НИЖЕ.
          </p>
          
          <label className="flex items-start gap-4 cursor-pointer text-left mb-8">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-6 w-6 rounded border-white/20 bg-transparent text-neon-gold focus:ring-neon-gold focus:outline-none appearance-none border-2 checked:border-neon-gold transition-all cursor-pointer"
            />
            <span className="text-[11px] font-bold text-white/60 peer-checked:text-white uppercase tracking-wider leading-snug transition-colors">
              Я СОГЛАСЕН НА <span className="text-neon-gold">20% КОМИССИЮ</span> ЗА РУЧНУЮ ОБРАБОТКУ
            </span>
          </label>
          
          <button 
            onClick={handleJoinWaitlist}
            className={`w-full py-4 rounded-lg font-black text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(255,173,10,0.4)] transition-all active:scale-[0.98] ${
              agreed 
                ? 'bg-neon-gold text-background-dark hover:bg-yellow-400'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
            disabled={!agreed}
          >
            ПОДТВЕРДИТЬ И УВЕДОМИТЬ АДМИНА
          </button>
        </div>

        <div className="flex items-center gap-3 mt-8">
          <div className="size-1.5 rounded-full bg-neon-gold animate-pulse" />
          <p className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
            АДМИН_ID 7830322013 УВЕДОМЛЕН
          </p>
        </div>
      </main>

      <div className="home-indicator" />
    </div>
  );
};

// 14. MASTERY RADAR SCREEN
const MasteryRadarScreen = ({ setScreen }) => {
  const radarData = {
    technique: 85,
    empathy: 92,
    structure: 74,
    ethics: 68,
    intuition: 81
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617] overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />
      
      <TopAppBar 
        onBack={() => setScreen(SCREENS.profile)}
        title="Радар Мастерства"
        onSettings={() => {}}
        settingsIcon="settings_input_antenna"
      />

      <main className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-32">
        {/* Radar SVG */}
        <div className="relative flex flex-col items-center justify-center px-4 py-8">
          <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
            <svg className="w-full h-full drop-shadow-[0_0_20px_rgba(166,0,255,0.3)]" viewBox="0 0 100 100">
              <polygon fill="none" points="50,5 95,35 78,90 22,90 5,35" stroke="rgba(166,0,255,0.1)" strokeWidth="0.5" />
              <polygon fill="none" points="50,15 85,40 70,80 30,80 15,40" stroke="rgba(166,0,255,0.1)" strokeWidth="0.5" />
              <polygon fill="none" points="50,25 75,45 65,70 35,70 25,45" stroke="rgba(166,0,255,0.1)" strokeWidth="0.5" />
              <line stroke="rgba(166,0,255,0.2)" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="5" />
              <line stroke="rgba(166,0,255,0.2)" strokeWidth="0.5" x1="50" x2="95" y1="50" y2="35" />
              <line stroke="rgba(166,0,255,0.2)" strokeWidth="0.5" x1="50" x2="78" y1="50" y2="90" />
              <line stroke="rgba(166,0,255,0.2)" strokeWidth="0.5" x1="50" x2="22" y1="50" y2="90" />
              <line stroke="rgba(166,0,255,0.2)" strokeWidth="0.5" x1="50" x2="5" y1="50" y2="35" />
              <polygon fill="rgba(166,0,255,0.25)" points="50,15 88,38 72,82 32,75 12,42" stroke="#a600ff" strokeWidth="1.5" />
              <circle className="neon-glow-primary" cx="50" cy="15" fill="#a600ff" r="2.5" />
              <circle className="neon-glow-primary" cx="88" cy="38" fill="#a600ff" r="2.5" />
              <circle className="neon-glow-primary" cx="72" cy="82" fill="#a600ff" r="2.5" />
              <circle className="neon-glow-primary" cx="32" cy="75" fill="#a600ff" r="2.5" />
              <circle className="neon-glow-primary" cx="12" cy="42" fill="#a600ff" r="2.5" />
            </svg>
            
            {/* Tooltips */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 glass-card px-3 py-1 rounded-full border border-primary/40">
              <span className="text-[10px] font-black tracking-widest text-primary">ТЕХ: {radarData.technique}</span>
            </div>
            <div className="absolute top-1/4 -right-2 glass-card px-3 py-1 rounded-full border border-primary/40">
              <span className="text-[10px] font-black tracking-widest text-primary">ЭМП: {radarData.empathy}</span>
            </div>
            <div className="absolute bottom-4 right-4 glass-card px-3 py-1 rounded-full border border-primary/40">
              <span className="text-[10px] font-black tracking-widest text-primary">СТР: {radarData.structure}</span>
            </div>
            <div className="absolute bottom-4 left-4 glass-card px-3 py-1 rounded-full border border-primary/40">
              <span className="text-[10px] font-black tracking-widest text-primary">ЭТИ: {radarData.ethics}</span>
            </div>
            <div className="absolute top-1/3 -left-2 glass-card px-3 py-1 rounded-full border border-primary/40">
              <span className="text-[10px] font-black tracking-widest text-primary">ИНТ: {radarData.intuition}</span>
            </div>
          </div>
          
          <div className="w-full flex justify-between px-6 mt-4 text-[9px] font-bold tracking-[0.25em] uppercase text-white/50">
            <span>Калибровка ядра активна</span>
            <span className="text-neon-green">Матрица синхронизирована</span>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div>
          <h3 className="text-white text-xs font-black leading-tight tracking-[0.3em] uppercase px-2 pb-4">
            Диагностический разбор
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-neon-green">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-neon-green/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-neon-green">favorite</span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold tracking-tight uppercase">Резонанс эмпатии</h4>
                  <p className="text-white/40 text-[10px] tracking-wider uppercase">Высокая стабильность репорта</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-1">
                  <div className="size-1.5 rounded-full bg-neon-green glow-green" />
                  <span className="text-neon-green text-lg font-black leading-none">{radarData.empathy}</span>
                </div>
                <span className="text-[9px] text-neon-green/60 tracking-widest uppercase">Элитный уровень</span>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-primary">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold tracking-tight uppercase">Клиническая техника</h4>
                  <p className="text-white/40 text-[10px] tracking-wider uppercase">Точность модальности</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-1">
                  <span className="text-white text-lg font-black leading-none">{radarData.technique}</span>
                </div>
                <span className="text-[9px] text-white/40 tracking-widest uppercase">Оптимально</span>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-primary/40">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">visibility</span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold tracking-tight uppercase">Скорость инсайта</h4>
                  <p className="text-white/40 text-[10px] tracking-wider uppercase">Скорость подсознания</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-1">
                  <span className="text-white text-lg font-black leading-none">{radarData.intuition}</span>
                </div>
                <span className="text-[9px] text-white/40 tracking-widest uppercase">Целевая мета</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-20 pointer-events-none">
        <div className="max-w-md mx-auto flex flex-col gap-4 pointer-events-auto">
          <div className="glass-card h-16 rounded-full flex items-center justify-around px-6 border-white/5">
            <button className="text-primary"><span className="material-symbols-outlined !text-3xl">radar</span></button>
            <button className="text-white/30"><span className="material-symbols-outlined !text-3xl">database</span></button>
            <div className="size-12 rounded-full premium-shine flex items-center justify-center glow-primary -mt-10 border-4 border-background-dark">
              <span className="material-symbols-outlined text-white">add</span>
            </div>
            <button className="text-white/30"><span className="material-symbols-outlined !text-3xl">analytics</span></button>
            <button className="text-white/30"><span className="material-symbols-outlined !text-3xl">person_search</span></button>
          </div>
          <button className="premium-shine w-full py-4 rounded-xl text-[11px] font-black tracking-[0.4em] uppercase text-white shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            Финализировать диагностический профиль
          </button>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="fixed top-1/4 -right-20 size-64 bg-primary/20 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/4 -left-20 size-64 bg-neon-green/10 blur-[100px] pointer-events-none" />
    </div>
  );
};

// --- 5. MAIN APP COMPONENT ---

export default function App() {
  // State
  const [screen, setScreen] = useState(SCREENS.loading);
  const [previousScreen, setPreviousScreen] = useState(null);
  
  // User
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [diamonds, setDiamonds] = useState(5);
  
  // Session
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [selectedModality, setSelectedModality] = useState('mpt');
  const [difficulty, setDifficulty] = useState(2);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionMetrics, setSessionMetrics] = useState(null);
  
  // Profile
  const [userProfile, setUserProfile] = useState({ 
    name: '', 
    experience: 0, 
    price: 0, 
    about: '', 
    methods: '', 
    photoUrl: null, 
    videoUrl: null 
  });
  
  // Data
  const [clientPool, setClientPool] = useState(CLIENT_DATABASE);
  const [psychologists, setPsychologists] = useState([]);
  const [masters, setMasters] = useState([]);
  const [history, setHistory] = useState([]);
  
  // UI
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);
  const tg = window.Telegram?.WebApp;
  const userIdMemo = useMemo(() => tg?.initDataUnsafe?.user?.id?.toString() || 'dev_platinum_master', [tg]);

  // Telegram Init
  useEffect(() => {
    if (tg) { 
      tg.ready(); 
      tg.expand(); 
      if (parseFloat(tg.version) >= 6.1) {
        tg.setHeaderColor('#020617');
        tg.setBackgroundColor('#020617');
      }
    }
    
    const initApp = async () => {
      const isAgreed = localStorage.getItem('connectum_legal');
      if (!isAgreed) {
        setScreen(SCREENS.legal);
      } else {
        try {
          const res = await fetch(`http://localhost:3001/api/sync?userId=${userIdMemo}`);
          if (!res.ok) throw new Error("Sync Fail");
          const data = await res.json();
          
          if(data.isSubscribed !== undefined) setIsSubscribed(data.isSubscribed);
          if(data.diamonds !== undefined) setDiamonds(data.diamonds);
          if(data.pool) setClientPool(data.pool);
          if(data.profile) setUserProfile(prev => ({...prev, ...data.profile}));
          if(data.history) setHistory(data.history);
          
          setScreen(SCREENS.terminal_dashboard);
        } catch(e) { 
          console.warn("Connectum Local Mode Active");
          setScreen(SCREENS.terminal_dashboard); 
        }
      }
    };
    
    const timer = setTimeout(initApp, 2000);
    return () => clearTimeout(timer);
  }, [tg, userIdMemo]);

  // Notifications
  const showToast = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 4000);
  };

  // Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile(prev => ({...prev, photoUrl: reader.result}));
        showToast("Фото профиля готово к сохранению");
      };
      reader.readAsDataURL(file);
    }
  };

  // Start Session
  const startSession = async () => {
    if(diamonds <= 0 && !isSubscribed) {
      showToast("Недостаточно бриллиантов на балансе");
      return;
    }
    if(!isSubscribed) setDiamonds(prev => prev - 1); 
    setScreen(SCREENS.chat); 
    setMessages([]); 
    handleSend("Здравствуйте, я готов начать тренировку.", true);
  };

  // Chat Send
  const handleSend = async (text = inputText, isInitial = false, action = 'chat', flow = null) => {
    if (!text && !isInitial) return;
    
    if (!isInitial && action === 'chat') {
      setMessages(p => [...p, { role: 'user', content: text }]);
    }
    
    setInputText(''); 
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: userIdMemo, 
          message: text, 
          modalityId: selectedModality, 
          action: action || '', 
          selectedClientId: selectedClientId || 'c1', 
          role: role || 'psychologist', 
          flow: flow || '', 
          difficulty: Number(difficulty),
          history: messages
            .filter(m => m.role !== 'hint')
            .map(m => ({ role: m.role, content: m.content }))
            .slice(-12) 
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server Error");
      
      if(action === 'get_hint') {
        setMessages(p => [...p, { role: 'hint', content: data.hint }]);
      } else if(data.content) {
        setMessages(p => [...p, { role: 'ai', content: data.content, voice: data.voice }]);
        if(data.voice) {
          const audio = new Audio(`data:audio/mp3;base64,${data.voice}`);
          audio.play().catch(e => console.warn("Audio play blocked", e));
        }
      }
    } catch(e) { 
      showToast(e.message || "Сбой связи с ИИ"); 
    } finally { 
      setIsTyping(false); 
    }
  };

  // Finish Session
  const finishSession = async () => {
    if(!confirm("Завершить тренировку и сформировать PDF-аудит?")) return;
    
    setIsTyping(true);
    try {
      const res = await fetch('http://localhost:3001/api/finish', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({ 
          userId: userIdMemo, 
          history: messages.map(m => ({ role: m.role, content: m.content })), 
          selectedClientId, 
          modalityId: selectedModality 
        }) 
      });
      
      const data = await res.json();
      
      // Generate metrics
      const metrics = {
        technique: Math.floor(Math.random() * 30) + 70,
        empathy: Math.floor(Math.random() * 20) + 80,
        structure: Math.floor(Math.random() * 40) + 60,
        ethics: Math.floor(Math.random() * 10) + 90,
        insight: 'The subject demonstrated exceptional emotional resonance. Recommended trajectory involves increasing structural complexity to match high empathy scores.'
      };
      
      setSessionMetrics(metrics);
      
      // Save to history
      setHistory(prev => [...prev, {
        date: new Date().toISOString(),
        metrics,
        clientId: selectedClientId,
        modality: selectedModality
      }]);
      
      showToast(`Аудит готов. Индекс точности: ${data.analytics?.method || 0}%`);
      if(data.newPool) setClientPool(data.newPool);
      setScreen(SCREENS.session_summary);
    } catch (e) { 
      setScreen(SCREENS.terminal_dashboard); 
    } finally { 
      setIsTyping(false); 
    }
  };

  // Accept Legal
  const acceptLegal = () => { 
    localStorage.setItem('connectum_legal', 'true'); 
    setScreen(SCREENS.terminal_dashboard); 
  };

  // Render Screens
  if (screen === SCREENS.loading) return <LoadingScreen onLoaded={() => setScreen(SCREENS.legal)} />;
  if (screen === SCREENS.legal) return <LegalScreen onAccept={acceptLegal} />;
  if (screen === SCREENS.terminal_dashboard) return <TerminalDashboard setScreen={setScreen} diamonds={diamonds} isSubscribed={isSubscribed} />;
  if (screen === SCREENS.setup) return (
    <SetupScreen 
      setScreen={setScreen}
      diamonds={diamonds}
      isSubscribed={isSubscribed}
      selectedModality={selectedModality}
      setSelectedModality={setSelectedModality}
      selectedClientId={selectedClientId}
      setSelectedClientId={setSelectedClientId}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      clientPool={clientPool}
      startSession={startSession}
    />
  );
  if (screen === SCREENS.chat) return (
    <ChatScreen 
      setScreen={setScreen}
      messages={messages}
      setMessages={setMessages}
      inputText={inputText}
      setInputText={setInputText}
      isTyping={isTyping}
      setIsTyping={setIsTyping}
      selectedModality={selectedModality}
      selectedClientId={selectedClientId}
      difficulty={difficulty}
      finishSession={finishSession}
    />
  );
  if (screen === SCREENS.session_summary) return (
    <SessionSummaryScreen 
      setScreen={setScreen}
      sessionMetrics={sessionMetrics}
      isSubscribed={isSubscribed}
    />
  );
  if (screen === SCREENS.client_hub) return (
    <ClientHubScreen 
      setScreen={setScreen}
      handleSend={handleSend}
      diamonds={diamonds}
      isSubscribed={isSubscribed}
    />
  );
  if (screen === SCREENS.masters_gallery) return (
    <MastersGalleryScreen 
      setScreen={setScreen}
      isSubscribed={isSubscribed}
      masters={masters}
    />
  );
  if (screen === SCREENS.profile) return (
    <ProfileScreen 
      setScreen={setScreen}
      diamonds={diamonds}
      userProfile={userProfile}
      setUserProfile={setUserProfile}
      handlePhotoUpload={handlePhotoUpload}
      fileInputRef={fileInputRef}
    />
  );
  if (screen === SCREENS.settings) return (
    <SettingsScreen 
      setScreen={setScreen}
      isSubscribed={isSubscribed}
      setIsSubscribed={setIsSubscribed}
    />
  );
  if (screen === SCREENS.pro_dashboard) return (
    <ProDashboardScreen 
      setScreen={setScreen}
      history={history}
    />
  );
  if (screen === SCREENS.pdf_report) return <PdfReportScreen setScreen={setScreen} />;
  if (screen === SCREENS.waitlist) return <WaitlistScreen setScreen={setScreen} />;
  if (screen === SCREENS.radar) return <MasteryRadarScreen setScreen={setScreen} />;

  // Default (shouldn't reach here)
  return <LoadingScreen onLoaded={() => setScreen(SCREENS.legal)} />;
}
