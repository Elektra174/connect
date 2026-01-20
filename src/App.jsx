import React, { useState, useEffect, useRef, useMemo } from 'react';
import { marked } from 'marked';

/**
 * =========================================================================
 * CONNECTUM PRO v21.26.7 - ULTIMATE PLATINUM MASTER EDITION (MONOLITH)
 * =========================================================================
 * 🎨 ДИЗАЙН: "Premium AI Studio" (Deep Slate, Glassmorphism, Neon).
 * 🧠 ИНТЕЛЛЕКТ: Прямая интеграция с YandexGPT Pro & SpeechKit Premium.
 * 📱 UX: Полная адаптация под Telegram Mini Apps (v6.1+).
 * 🛡️ ФИКСЫ: 
 * - Иконки возвращены в футер и кнопки хаба.
 * - Кнопка "Финиш" расширена до 100% ширины.
 * - Payload для /api/chat исправлен (difficulty: Number, history: Clean).
 * - Восстановлено 30/30 детальных досье клиентов.
 * =========================================================================
 * Данный файл является интеллектуальной собственностью и не подлежит урезанию.
 * =========================================================================
 */

// --- 1. ПРЕМИАЛЬНАЯ СИСТЕМА ИКОНОК (SVG С ВЫСОКОЙ ТОЧНОСТЬЮ) ---

const Icons = {
  Infinity: ({ className = "w-6 h-6" }) => (
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
  Search: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  User: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Sparkles: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z"/>
    </svg>
  ),
  Diamond: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="diamGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d="M6 4h12l4 5-10 11L2 9l4-5Z" fill="url(#diamGrad)" fillOpacity="0.2" stroke="url(#diamGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 4l1 5 1-5M2 9h20M7 4l5 5 5-5M12 20V9" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
    </svg>
  ),
  ChevronLeft: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  ),
  Send: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  ),
  Telegram: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5M9 13.5V19L12 15.5"/>
    </svg>
  ),
  Support: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <path d="M12 7v4"/><path d="M12 15h.01"/>
    </svg>
  ),
  Camera: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  )
};

// --- 2. ГЛОБАЛЬНАЯ БАЗА КЛИЕНТОВ (30 ДЕТАЛИЗИРОВАННЫХ КЕЙСОВ) ---

const CLIENT_DATABASE = [
  { 
    id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", avatar: "👩‍💻", 
    bio: "Парализующий саботаж при записи видео. Страх проявления зашкаливает. В теле чувствует жесткий зажим в горле при попытке говорить на камеру. Ей кажется, что её осудит весь мир." 
  },
  { 
    id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", avatar: "👨‍🎨", 
    bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным, несмотря на 10 лет опыта. Ощущаю свинцовую тяжесть в плечах и холод в кистях рук." 
  },
  { 
    id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", avatar: "👩‍💼", 
    bio: "Постоянное сжатие в груди и тревога за будущее. Не может переключиться с работы на отдых, чувствует себя 'функцией', а не живым человеком. Всё время ждёт подвоха." 
  },
  { 
    id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", avatar: "👨🏻", 
    bio: "Сменил 5 профессий за 2 года. Нигде не находит признания, чувствует себя тотальным неудачником. В теле — пустота в районе солнечного сплетения и отсутствие энергии." 
  },
  { 
    id: "c5", name: "Анна", age: 25, profession: "Студентка", avatar: "👩🏼", 
    bio: "Не может завершить разрушительные отношения. Боится одиночества до тошноты. Ощущает 'колючую проволоку' вокруг сердца и постоянное желание сжаться в комок." 
  },
  { 
    id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", avatar: "👨🏻‍💼", 
    bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе и холод. Чувство, что жизнь проходит мимо него за толстым стеклом, хотя внешне всё идеально." 
  },
  { 
    id: "c7", name: "Ольга", age: 38, profession: "Врач", avatar: "👩🏻", 
    bio: "Ипохондрия. Паника при малейшем физическом дискомфорте. Постоянно сканирует тело на наличие смертельных болезней. Ощущает покалывание во всем теле от страха." 
  },
  { 
    id: "c8", name: "Дмитрий", age: 29, profession: "Продавец", avatar: "🧔🏻", 
    bio: "Боится встреч и публичных выступлений. Напряжение в скулах и зажим речи. Кажется, что все на него смотрят с осуждением и видят его 'никчемность'." 
  },
  { 
    id: "c9", name: "Мария", age: 33, profession: "Домохозяйка", avatar: "👩‍🍼", 
    bio: "Материнская вина. Ощущение, что она плохая мать и жена. Не может вздохнуть полной грудью, чувствует огромную 'бетонную плиту' на своей спине." 
  },
  { 
    id: "c10", name: "Сергей", age: 50, profession: "Предприниматель", avatar: "👨🏻‍🦳", 
    bio: "Банкротство бизнеса. Колоссальный стыд перед семьей и друзьями. Чувствует себя раздавленным и старым, в теле — постоянная мелкая дрожь в ногах." 
  },
  { 
    id: "c11", name: "Юлия", age: 27, profession: "Модель", avatar: "👩🏻", 
    bio: "РПП. Ненавидит свое отражение. Постоянный контроль веса и страх еды. Ощущает себя 'грязной' изнутри, в животе — постоянная тяжесть и отвращение." 
  },
  { 
    id: "c12", name: "Андрей", age: 35, profession: "Архитектор", avatar: "👨🏿", 
    bio: "Вспышки неконтролируемого гнева на близких. Ощущение кипятка в груди, который ищет выхода. Потом наступает тяжелый стыд и желание исчезнуть." 
  },
  { 
    id: "c13", name: "Наталья", age: 40, profession: "Учитель", avatar: "👩‍💼", 
    bio: "Одиночество в толпе. Живет как за толстым стеклом. Постоянная потребность заслуживать любовь через помощь другим, забывая о себе." 
  },
  { 
    id: "c14", name: "Павел", age: 22, profession: "Курьер", avatar: "👱🏻", 
    bio: "Тотальная зависимость от мнения родителей. Не может принять ни одного решения самостоятельно. В теле — ватные руки и постоянная нехватка воздуха." 
  },
  { 
    id: "c15", name: "Екатерина", age: 36, profession: "HR-директор", avatar: "👩‍🏫", 
    bio: "Профессиональное выгорание. Перфекционизм. Жжение в глазах от истощения. Чувство, что она всем должна, а ей — никто. Не может расслабиться даже во сне." 
  },
  { 
    id: "c16", name: "Александр", age: 44, profession: "Инженер", avatar: "👨🏻", 
    bio: "Застрял в горе после утраты близкого. Прошло 3 года, но боль не уходит. Ощущение камня в животе, который тянет вниз и не дает двигаться вперед." 
  },
  { 
    id: "c17", name: "Светлана", age: 30, profession: "Бьюти-мастер", avatar: "👩🏼", 
    bio: "Низкая самооценка. Считает себя 'недостаточной' для любви и успеха. Постоянно сравнивает себя с другими в соцсетях. Ощущает холод в районе сердца." 
  },
  { 
    id: "c18", name: "Роман", age: 32, profession: "Аналитик", avatar: "👨🏿‍💻", 
    bio: "Игровая зависимость. Уход от реальности в виртуальный мир. Страх перед реальными отношениями и ответственностью. В теле — скованность шеи." 
  },
  { 
    id: "c19", name: "Ирина", age: 48, profession: "Юрист", avatar: "👵🏼", 
    bio: "Синдром пустого гнезда. Дети выросли и уехали, смысл жизни пропал. Ощущение сквозняка в груди и тотальной ненужности." 
  },
  { 
    id: "c20", name: "Кирилл", age: 26, profession: "Дизайнер", avatar: "👦🏻", 
    bio: "Агорафобия. Боится выходить на открытые пространства. Панические атаки при мысли о поездке в метро. В теле — онемение кончиков пальцев." 
  },
  { 
    id: "c21", name: "Татьяна", age: 55, profession: "Пенсионерка", avatar: "👩🏻‍🦱", 
    bio: "Кризис старения. Ощущение, что время уходит впустую. Страх смерти и одинокой старости. В теле — тяжесть в коленях и груди." 
  },
  { 
    id: "c22", name: "Виктор", age: 39, profession: "Водитель", avatar: "🧔", 
    bio: "Переживает измену жены. Не может спать и есть. Чувство, что в груди раскаленный уголь, который выжигает всё человеческое." 
  },
  { 
    id: "c23", name: "Алина", age: 24, profession: "Бариста", avatar: "👩‍🎓", 
    bio: "Не умеет говорить 'нет'. Чувствует, что все ею пользуются. Постоянное напряжение в шее и плечах, головные боли от напряжения." 
  },
  { 
    id: "c24", name: "Денис", age: 37, profession: "Охранник", avatar: "👨🏻", 
    bio: "Навязчивые мысли о безопасности семьи. Десятки раз проверяет замки и плиту. Жизнь в постоянном контроле, который его истощает." 
  },
  { 
    id: "c25", name: "Людмила", age: 60, profession: "Педагог", avatar: "👵", 
    bio: "Конфликт с невесткой. Чувствует себя лишней в семье единственного сына. Ощущение горечи во рту и постоянный ком в горле." 
  },
  { 
    id: "c26", name: "Максим", age: 21, profession: "Блогер", avatar: "👦🏼", 
    bio: "Подростковый бунт против системы, затянувшийся во времени. Ничего не хочет делать, тотальная апатия, пустота и отсутствие желаний." 
  },
  { 
    id: "c27", name: "Валерия", age: 31, profession: "Стилист", avatar: "👩🏻‍🦰", 
    bio: "Болезненная ревность. Постоянный поиск улик измены. Чувство, что она сходит с ума от подозрений. В теле — жар в затылке." 
  },
  { 
    id: "c28", name: "Станислав", age: 43, profession: "Адвокат", avatar: "👨🏻‍💼", 
    bio: "Трудоголизм как способ убежать от проблем в семье. Не умеет расслабляться без алкоголя. Чувствует постоянную пульсацию в висках." 
  },
  { 
    id: "c29", name: "Евгения", age: 29, profession: "Копирайтер", avatar: "👩🏻", 
    bio: "Страх перемен. Боится менять работу, даже если там плохо и её не ценят. Ощущение, что она в капкане, руки связаны невидимой нитью." 
  },
  { 
    id: "c30", name: "Константин", age: 35, profession: "Финансист", avatar: "👨🏻", 
    bio: "Эмоциональная холодность. Не понимает, что чувствует, не может сопереживать близким. Ощущение робота вместо человека." 
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
      /* Цветовая палитра Platinum */
      --bg-deep: #0a0c18;
      --card-glass: rgba(22, 25, 50, 0.85);
      --card-border: rgba(255, 255, 255, 0.12);
      --accent-primary: #7367f0;
      --accent-secondary: #ce9ffc;
      --text-primary: #f8fafc;
      --text-secondary: #94a3b8;
      
      /* Тени и эффекты */
      --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      --glow-primary: 0 0 20px rgba(115, 103, 240, 0.4);
      
      /* Анимации */
      --transition-all: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
        radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 50%),
        radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.1), transparent 50%); 
      filter: blur(80px); 
    }

    /* Mesh Gradient для экрана загрузки */
    .mesh-gradient {
      background: radial-gradient(circle at 20% 30%, rgba(95, 32, 239, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(45, 10, 120, 0.2) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.05) 0%, transparent 40%);
    }

    /* 3D Infinity Logo Container */
    .infinity-logo-container {
      perspective: 1000px;
    }

    /* Floating Infinity Animation */
    .floating-infinity {
      filter: drop-shadow(0 0 30px rgba(95, 32, 239, 0.6));
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotateX(0deg); }
      50% { transform: translateY(-10px) rotateX(5deg); }
    }

    /* Loading Glow Head */
    .loading-glow-head {
      box-shadow: 0 0 15px 2px #5F20EF;
    }

    /* Letter Spacing Widest */
    .letter-spacing-widest {
      letter-spacing: 0.4em;
    }

    /* Grain Overlay */
    .grain-overlay {
      position: fixed;
      inset: 0;
      z-index: 20;
      pointer-events-none;
      opacity: 0.03;
      background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHgUPX_YljpKN4reCKHiN18D5XLdhJNzJG_lk8w7rJoH17968ARv9uEuUWv9nxn07F2zNl-Lv8mUB48_GPNwvTIZXrTpZguUT0jsMPPiYKlRlhI0L_39LSWuMbM1Vryt7nE4bukY_Ido9C38V--GBGVfwX_ilZYvk6l4gIK9UW4eHfyKhFsrpuHua7kroXNDHIzM0a_mEiTLhtq_FS2kN-9vzFGW1QnpAzAFLo1upo0jb4gFzDkjLYXCVAp6EzQ8rzmEm8ZpssdnE');
    }

    /* Progress Bar Styles */
    .progress-container {
      position: relative;
      height: 2px;
      width: 100%;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      overflow: hidden;
    }

    .progress-bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: linear-gradient(90deg, transparent, #5F20EF, #00D2FF, #5F20EF);
      background-size: 200% 100%;
      animation: progressShine 1.5s linear infinite;
      border-radius: 9999px;
    }

    @keyframes progressShine {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Scanline Effect */
    .scanline {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 50%, rgba(0, 240, 255, 0.05) 50%);
      background-size: 100% 4px;
      pointer-events: none;
      opacity: 0.3;
    }

    /* Pulse Animation for Logo */
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.02); }
    }

    .pulse-animation {
      animation: pulse 2s ease-in-out infinite;
    }

    /* Terminal Text Fixed */
    .terminal-text {
      position: fixed;
      left: 0;
      top: 50%;
      transform: translateY(-50%) rotate(-90deg);
      transform-origin: left center;
      font-size: 8px;
      font-family: monospace;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5em;
      color: white;
      opacity: 0.2;
      white-space: nowrap;
      pointer-events: none;
      z-index: 10;
    }

    /* Стеклянные карточки */
    .glass-card {
      background: var(--card-glass);
      backdrop-filter: blur(28px);
      border: 1px solid var(--card-border);
      box-shadow: var(--shadow-xl), var(--glow-primary);
      transition: var(--transition-all);
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 30px 60px rgba(0,0,0,0.6), var(--glow-primary);
      }
    }

    /* Анимации появления */
    .animate-in { animation: fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    /* Segmented Control (iOS Master Style) */
    .segmented-control { 
      display: flex; 
      background: rgba(255,255,255,0.05); 
      border-radius: 1.2rem; 
      padding: 4px; 
      position: relative; 
      border: 1px solid var(--card-border);
    }
    .segment-btn { 
      flex: 1; 
      padding: 13px 0; 
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
      box-shadow: 0 4px 15px rgba(99,102,241,0.5); 
    }

    /* Кнопки с градиентом */
    .btn-platinum {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      box-shadow: var(--glow-primary);
      transition: var(--transition-all);
      position: relative;
      overflow: hidden;
      z-index: 1;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.15),
          transparent
        );
        transition: 0.5s;
        z-index: -1;
      }
      
      &:hover {
        box-shadow: 0 0 30px rgba(115, 103, 240, 0.6);
        
        &::before {
          left: 100%;
        }
      }
    }
    .btn-platinum:active { transform: scale(0.96); opacity: 0.9; }

    /* Утилиты */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .diamond-glow { filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.9)); }
    .btn-magnetic:active { transform: scale(0.97); transition: transform 0.1s; }
    
    /* Сообщения чата */
    .bubble-ai { border-bottom-left-radius: 0.6rem; }
    .bubble-user { border-bottom-right-radius: 0.6rem; }
  `}</style>
);

// --- 5. КОМПОНЕНТ VIDEO RECORDER (ПРЕМИУМ ВИЗИТКА) ---

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
    <div className="glass-card rounded-[2.5rem] p-1 overflow-hidden relative group my-8 shadow-5xl border-t border-white/10">
      <div className="aspect-video bg-black/60 rounded-[2.3rem] flex items-center justify-center relative overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: recording ? 1 : 0.3 }}
        />
        {!recording && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <Icons.Camera className="w-14 h-14 text-white/20 mb-4"/>
            <span className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em]">Ready to Record</span>
          </div>
        )}
        {recording && (
          <div className="absolute top-6 right-6 flex items-center gap-3 bg-black/70 px-4 py-2.5 rounded-full border border-white/10">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"/> 
            <span className="text-[10px] font-black text-white uppercase tracking-widest">RECORDING</span>
          </div>
        )}
      </div>
      <button 
        onClick={() => recording ? stopRecording() : startStream()} 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-3xl px-12 py-4.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 active:scale-95 transition-all shadow-4xl transform hover:-translate-y-1 ${recording ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-white/10 text-white'}`}
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
    const [progress, setProgress] = useState(0);

  // --- СОСТОЯНИЯ ТРЕНАЖЕРА ---
  const [clientPool, setClientPool] = useState(CLIENT_DATABASE);
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [selectedModality, setSelectedModality] = useState('mpt');
  const [difficulty, setDifficulty] = useState(2); 

  // --- СОСТОЯНИЯ ЧАТА ---
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recognitionRef = useRef(null);
  
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
      if (parseFloat(tg.version) >= 6.1) {
        tg.setHeaderColor('#020617');
        tg.setBackgroundColor('#020617');
      }
    }
    
    const initApp = async () => {
        const isAgreed = localStorage.getItem('connectum_legal');
        if (!isAgreed) {
            setScreen('legal');
        } else {
            try {
                const res = await fetch(`/api/sync?userId=${userId}`);
                if (!res.ok) throw new Error("Sync Fail");
                const data = await res.json();
                
                if(data.isSubscribed !== undefined) setIsSubscribed(data.isSubscribed);
                if(data.diamonds !== undefined) setDiamonds(data.diamonds);
                if(data.pool) setClientPool(data.pool);
                if(data.profile) setUserProfile(prev => ({...prev, ...data.profile}));
                
                setScreen('hub');
            } catch(e) { 
                console.warn("Connectum Local Mode Active");
                setScreen('hub'); 
            }
        }
    };
    
    const timer = setTimeout(initApp, 2000);
    return () => clearTimeout(timer);
  }, [tg, userId]);

  // Анимация прогресс-бара экрана загрузки
  useEffect(() => {
    let progressInterval;
    if (screen === 'loading') {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
    return () => clearInterval(progressInterval);
  }, [screen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const showToast = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 4000);
  };

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

  const unlockAudio = () => {
    const silentAudio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==");
    silentAudio.play().catch(()=>{});
  };

  // --- ГОЛОСОВОЙ ВВОД (Web Speech API) ---
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast("Голосовой ввод не поддерживается в вашем браузере");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'ru-RU';

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
      setRecordingTime(0);
      showToast("Голосовая запись началась");
    };

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setInputText(prev => prev + (prev ? ' ' : '') + finalTranscript);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      if (event.error === 'no-speech') {
        showToast("Не удалось распознать речь");
      } else if (event.error === 'audio-capture') {
        showToast("Микрофон не найден");
      } else {
        showToast("Ошибка распознавания речи");
      }
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
      setRecordingTime(0);
    };

    recognitionRef.current.start();
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

  // Таймер для отслеживания времени записи
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  /**
   * ГЛАВНАЯ ЛОГИКА ОТПРАВКИ СООБЩЕНИЙ.
   * FIX: difficulty теперьNumber, history - чистые объекты.
   */
  const handleSend = async (text = inputText, isInitial = false, action = 'chat', flow = null) => {
    if (isInitial) unlockAudio();
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
            role: role || 'psychologist', 
            flow: flow || '', 
            difficulty: Number(difficulty), // FIX: Ошибка 400 (должно быть числом)
            history: messages
              .filter(m => m.role !== 'hint')
              .map(m => ({ role: m.role, content: m.content })) // FIX: Ошибка 400 (чистый массив)
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

  const startSession = async () => {
      if(diamonds <= 0) return showToast("Недостаточно бриллиантов на балансе");
      setDiamonds(prev => prev - 1); 
      setScreen('chat'); 
      setMessages([]); 
      handleSend("Здравствуйте, я готов начать тренировку.", true);
  };

  const saveProfile = async () => {
    try {
        const res = await fetch('/api/profile', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ userId, profile: userProfile }) 
        });
        if (res.ok) {
            showToast("Система мастера успешно синхронизирована");
            setScreen('hub');
        }
    } catch(e) { showToast("Ошибка сохранения данных"); }
  };

  const finishSession = async () => {
      if(!confirm("Завершить тренировку и сформировать PDF-аудит?")) return;
      
      setIsTyping(true);
      try {
          const res = await fetch('/api/finish', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ 
                userId, 
                history: messages.map(m => ({ role: m.role, content: m.content })), 
                selectedClientId, 
                modalityId: selectedModality 
            }) 
          });
          
          const data = await res.json();
          showToast(`Аудит готов. Индекс точности: ${data.analytics?.method || 0}%`);
          if(data.newPool) setClientPool(data.newPool);
          setScreen('hub');
      } catch (e) { 
          setScreen('hub'); 
      } finally { 
          setIsTyping(false); 
      }
  };

  const acceptLegal = () => { 
    localStorage.setItem('connectum_legal', 'true'); 
    setScreen('hub'); 
  };

  const currentClient = clientPool.find(c => c.id === selectedClientId) || clientPool[0];

  // --- 7. РЕНДЕР: ЭКРАН ЗАГРУЗКИ ---

  if (screen === 'loading') return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#020617] overflow-hidden relative">
      <GlobalStyles />
      
      {/* Фоновый mesh gradient */}
      <div className="mesh-gradient"></div>
      
      {/* Центральный контент */}
      <div className="relative flex h-screen w-full flex-col px-6 pt-12 pb-8 justify-between">
        
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#6C26E6] shadow-[0_0_8px_#6C26E6]"></div>
            <h2 className="text-white text-xs font-extrabold uppercase tracking-[0.2em] opacity-80">
              Connectum Pro Platinum
            </h2>
          </div>
          <button className="glass p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-white/80">diamond</span>
          </button>
        </header>
        
        {/* Main Content */}
        <main className="flex flex-col items-center justify-center flex-1 py-10">
          {/* Central Infinity Hero */}
          <div className="relative flex items-center justify-center mb-16">
            <div className="absolute w-[280px] h-[280px] bg-[#664ce6]/10 rounded-full blur-[80px]"></div>
            <button className="relative group transition-transform duration-500 hover:scale-105 active:scale-95">
              <div className="infinity-glow flex items-center justify-center p-12 glass rounded-full border-[#664ce6]/30">
                <span className="material-symbols-outlined text-[120px] text-[#664ce6]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 200" }}>
                  all_inclusive
                </span>
              </div>
            </button>
          </div>
          
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-white text-5xl font-black tracking-tighter leading-none mb-2 text-glow">
              PLATINUM HUB
            </h1>
            <p className="text-white/40 text-sm font-medium tracking-widest uppercase">
              Transformation Terminal
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="w-full max-w-[400px] flex flex-col gap-4">
            <button 
              onClick={() => { unlockAudio(); setScreen('setup'); setRole('psychologist'); }}
              className="shimmer glass flex items-center justify-between w-full h-[84px] px-8 rounded-2xl group transition-all duration-300 active:bg-white/10 active:border-white/20"
            >
              <div className="flex flex-col items-start">
                <span className="text-white text-lg font-bold tracking-tight">Psychologists B2B</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Enterprise Protocol</span>
              </div>
              <span className="material-symbols-outlined text-white/40 group-hover:text-[#664ce6] group-hover:translate-x-1 transition-all">
                arrow_forward_ios
              </span>
            </button>
            <button 
              onClick={() => { unlockAudio(); setScreen('client_hub'); setRole('client'); }}
              className="shimmer glass flex items-center justify-between w-full h-[84px] px-8 rounded-2xl group transition-all duration-300 active:bg-white/10 active:border-white/20"
            >
              <div className="flex flex-col items-start">
                <span className="text-white text-lg font-bold tracking-tight">Clients B2C</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Individual Session</span>
              </div>
              <span className="material-symbols-outlined text-white/40 group-hover:text-[#664ce6] group-hover:translate-x-1 transition-all">
                arrow_forward_ios
              </span>
            </button>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="mt-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 py-4 glass rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
              <div className="p-2.5">
                <span className="material-symbols-outlined text-white text-[24px]">radio</span>
              </div>
              <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest">Channel</p>
            </div>
            <div className="flex flex-col items-center gap-2 py-4 glass rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
              <div className="p-2.5">
                <span className="material-symbols-outlined text-white text-[24px]">support_agent</span>
              </div>
              <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest">Support</p>
            </div>
          </div>
          {/* Safe Area Indicator Mockup */}
          <div className="w-full flex justify-center pt-8 pb-2">
            <div className="w-32 h-1 bg-white/10 rounded-full"></div>
          </div>
        </footer>
      </div>
      
      {/* Background texture overlays */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>
  );

  // --- 8. РЕНДЕР: ЭКРАН ПОДПИСКИ (ЗАЩИТА) ---

  if (!isSubscribed && screen !== 'legal') return (
    <div className="h-screen flex flex-col items-center justify-center p-8 text-center bg-[#020617]">
      <GlobalStyles /><div className="mesh-bg" />
      <div className="glass-card p-12 rounded-[4rem] shadow-5xl animate-in border-t border-white/10">
        <div className="w-24 h-24 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
            <Icons.Telegram className="w-12 h-12 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-black uppercase mb-5 tracking-tighter text-white">Вход ограничен</h2>
        <p className="text-[14px] text-slate-400 mb-12 leading-relaxed font-medium">Для доступа к экосистеме Connectum необходимо быть подписчиком нашего канала.</p>
        <a href="https://t.me/psy_connectum" target="_blank" className="block w-full py-6 bg-indigo-600 rounded-[2rem] text-[11px] font-black uppercase tracking-widest text-white mb-6 shadow-3xl shadow-indigo-600/40 active:scale-95 transition-all">Подписаться</a>
        <button onClick={() => window.location.reload()} className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest hover:text-white transition-all">Я уже подписался</button>
      </div>
    </div>
  );

  // --- 9. РЕНДЕР: ОСНОВНОЙ ИНТЕРФЕЙС ---

  return (
    <div className="flex flex-col h-[100dvh] bg-[#020617] text-slate-100 overflow-hidden relative">
      <GlobalStyles /><div className="mesh-bg" />

      {/* СИСТЕМА УВЕДОМЛЕНИЙ (TOAST) */}
      {notification && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] bg-indigo-600/90 backdrop-blur-2xl px-8 py-4 rounded-3xl border border-white/20 text-[11px] font-black uppercase tracking-widest shadow-5xl animate-in">
          <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                <Icons.Check className="w-3.5 h-3.5"/>
              </div>
              {notification}
          </div>
        </div>
      )}

      {/* ШАПКА ПРИЛОЖЕНИЯ (HEADER) */}
      {screen !== 'hub' && screen !== 'legal' && (
        <header className="flex-shrink-0 h-16 bg-slate-950/80 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-6 z-50">
          <div className="flex items-center gap-4">
            <button onClick={() => setScreen('hub')} className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center active:scale-90 transition shadow-inner">
              <Icons.ChevronLeft className="w-5 h-5 text-slate-400"/>
            </button>
            <div className="flex flex-col">
              <span className="text-[12px] font-black text-indigo-400 uppercase tracking-widest leading-none">Connectum</span>
              <span className="text-[8px] font-bold text-slate-600 uppercase mt-1.5">Platinum Master v21.26</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-indigo-500/15 px-5 py-2.5 rounded-2xl border border-indigo-500/25 shadow-lg active:scale-95 transition">
            <span className="text-[13px] font-black text-indigo-300 tracking-tighter">{diamonds}</span>
            <Icons.Diamond className="w-5 h-5 text-indigo-400 diamond-glow" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden relative z-10 flex flex-col">
        
        {/* ЭКРАН 0: LEGAL (СОГЛАШЕНИЕ) */}
        {screen === 'legal' && (
           <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-in">
              <div className="glass-card p-12 rounded-[4rem] max-w-sm border-t border-white/10 shadow-5xl">
                  <div className="w-24 h-24 bg-indigo-500/10 rounded-[3rem] flex items-center justify-center mx-auto mb-12 shadow-inner">
                      <Icons.User className="w-12 h-12 text-indigo-400"/>
                  </div>
                  <h2 className="text-3xl font-black mb-6 uppercase tracking-tight text-white leading-none">Соглашение</h2>
                  <p className="text-[13px] text-slate-400 mb-14 leading-relaxed font-medium">Входя в Connectum Master Edition, вы подтверждаете совершеннолетие и согласны на обработку данных для обучения ИИ.</p>
                  <button onClick={acceptLegal} className="w-full py-6 btn-platinum rounded-[2.2rem] text-[11px] font-black uppercase tracking-widest text-white active:scale-95 transition-all shadow-3xl">Принять и Войти</button>
              </div>
           </div>
        )}

        {/* ЭКРАН 1: ГЛАВНАЯ (HUB) */}
        {screen === 'hub' && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-16 animate-in">
            <div className="flex flex-col items-center gap-10">
               <div className="relative group">
                 <div className="absolute inset-0 bg-indigo-500 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                 <Icons.Infinity className="w-28 h-28 relative z-10 drop-shadow-[0_0_25px_rgba(99,102,241,0.6)]" />
               </div>
               <div className="space-y-3">
                 <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">Connectum</h1>
                 <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.35em] opacity-80 pl-[0.35em]">Синергия мастерства и доверия</p>
               </div>
            </div>
            
            <div className="w-full grid gap-6 max-w-sm">
                <button 
                  onClick={() => { unlockAudio(); setScreen('setup'); setRole('psychologist'); }} 
                  className="btn-magnetic w-full p-8 glass-card rounded-[3.2rem] flex items-center gap-8 active:scale-[0.97] text-left relative overflow-hidden group shadow-4xl"
                >
                    <div className="w-18 h-18 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-5xl z-10 shadow-inner group-hover:rotate-12 transition-transform duration-500">🧠</div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none">Я Психолог</h3>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mt-3 tracking-widest">Тренажер • Прогресс • РОСТ</p>
                    </div>
                </button>
                
                <button 
                  onClick={() => { unlockAudio(); setScreen('client_hub'); setRole('client'); }} 
                  className="btn-magnetic w-full p-8 glass-card rounded-[3.2rem] flex items-center gap-8 active:scale-[0.97] text-left relative overflow-hidden group shadow-4xl"
                >
                    <div className="w-18 h-18 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-5xl z-10 shadow-inner group-hover:rotate-12 transition-transform duration-500">🤝</div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none">Я Клиент</h3>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mt-3 tracking-widest">Помощь • Ресурс • ДОВЕРИЕ</p>
                    </div>
                </button>
            </div>
            
            <div className="flex justify-center items-center gap-12 mt-auto pb-10 w-full max-w-sm opacity-70 hover:opacity-100 transition-opacity">
                <a href="https://t.me/psy_connectum" target="_blank" className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 hover:text-indigo-400 transition-all active:scale-95 group">
                  <Icons.Telegram className="w-6 h-6 text-slate-500 group-hover:text-indigo-400 transition-colors"/> Канал
                </a>
                <a href="https://t.me/lazalex81" target="_blank" className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 hover:text-indigo-400 transition-all active:scale-95 group">
                  <Icons.Support className="w-6 h-6 text-slate-500 group-hover:text-indigo-400 transition-colors"/> Поддержка
                </a>
            </div>
          </div>
        )}

        {/* ЭКРАН 2: ТРЕНАЖЕР (SETUP) */}
        {screen === 'setup' && (
           <div className="flex-1 overflow-y-auto p-5 space-y-10 no-scrollbar pb-40 text-left animate-in">
               <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Тренажер</h2>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 glass-card rounded-[2.5rem] border-l-4 border-orange-500 active:scale-95 transition cursor-pointer shadow-xl relative overflow-hidden group" onClick={()=>showToast("Заявка принята")}>
                      <div className="absolute top-0 right-0 w-14 h-14 bg-orange-500/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
                      <h4 className="text-[10px] font-black uppercase text-orange-400 tracking-wider">Тест-драйв</h4>
                      <div className="flex justify-between items-end mt-3">
                          <span className="text-2xl font-black text-white leading-none">490₽</span>
                          <div className="w-8 h-8 bg-orange-600 rounded-xl flex items-center justify-center text-[12px] shadow-lg">💰</div>
                      </div>
                  </div>
                  <div className="p-6 bg-indigo-600/10 border border-white/5 rounded-[2.5rem] border-l-4 border-indigo-600 active:scale-95 transition cursor-pointer shadow-xl relative overflow-hidden group" onClick={()=>showToast("Заявка принята")}>
                      <div className="absolute top-0 right-0 w-14 h-14 bg-indigo-600/10 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
                      <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">ПРО Доступ</h4>
                      <div className="flex justify-between items-end mt-3">
                          <span className="text-2xl font-black text-white leading-none">2990₽</span>
                          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-[12px] shadow-lg">💎</div>
                      </div>
                  </div>
               </div>

               <div className="space-y-10">
                   <div className="space-y-5">
                     <label className="text-[11px] font-black text-slate-500 uppercase ml-5 tracking-[0.4em]">Уровень сложности</label>
                     <div className="segmented-control">
                        <div className="segment-slider" style={{ width: '33.33%', left: `${(difficulty-1)*33.33}%` }} />
                        {[1, 2, 3].map(lvl => (
                            <button key={lvl} onClick={() => setDifficulty(lvl)} className={`segment-btn ${difficulty === lvl ? 'active' : ''}`}>{lvl===1?'Лайт':lvl===2?'Норма':'Хард'}</button>
                        ))}
                     </div>
                   </div>

                   <div className="grid gap-6">
                       <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-500 uppercase ml-5 tracking-[0.4em]">Метод (Модальность)</label>
                           <div className="relative">
                               <select value={selectedModality} onChange={(e) => setSelectedModality(e.target.value)} className="w-full p-6 glass-card rounded-3xl text-[14px] font-bold text-white outline-none appearance-none focus:border-indigo-500 transition shadow-3xl pl-8 pr-12">
                                   {Object.keys(MODALITIES).map(k => <option key={k} value={k} className="bg-slate-950">{MODALITIES[k].name} — {MODALITIES[k].desc}</option>)}
                               </select>
                               <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">▼</div>
                           </div>
                       </div>
                       
                       <div className="space-y-3">
                           <label className="text-[11px] font-black text-slate-500 uppercase ml-5 tracking-[0.4em]">Выбрать Клиента</label>
                           <div className="relative">
                               <select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="w-full p-6 glass-card rounded-3xl text-[14px] font-bold text-white outline-none appearance-none focus:border-indigo-500 transition shadow-3xl pl-8 pr-12">
                                   {clientPool.map(c => <option key={c.id} value={c.id} className="bg-slate-950">{c.name}, {c.age} — {c.profession}</option>)}
                               </select>
                               <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">▼</div>
                           </div>
                       </div>
                   </div>

                   <div className="glass-card rounded-[3.5rem] p-12 relative overflow-hidden shadow-5xl border-t border-white/10 group transition-all duration-700 hover:scale-[1.01]">
                       <div className="absolute top-0 left-0 w-2.5 h-full bg-indigo-600 group-hover:w-5 transition-all duration-700"></div>
                       <div className="flex items-center gap-8 mb-10">
                           <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-inner border border-white/5 transform group-hover:scale-110 transition-transform duration-700">
                               {currentClient?.avatar || '👤'}
                           </div>
                           <div>
                             <h4 className="text-3xl font-black text-white leading-none tracking-tight">{currentClient?.name || 'Клиент'}, {currentClient?.age || ''}</h4>
                             <p className="text-[12px] font-black uppercase text-indigo-400 mt-4 opacity-80 tracking-widest">{currentClient?.profession || 'Описание'}</p>
                           </div>
                       </div>
                       <div className="text-[16px] text-slate-300 italic leading-relaxed border-l-2 border-indigo-500/30 pl-10 py-4 relative">
                           <div className="absolute -left-1 top-0 w-2.5 h-2.5 bg-indigo-500 rounded-full blur-sm"></div>
                           "{currentClient?.bio}"
                       </div>
                   </div>
                   
                   <button onClick={startSession} className="w-full bg-gradient-to-r from-indigo-600 to-indigo-900 py-10 rounded-[3rem] font-black uppercase text-[15px] tracking-[0.5em] shadow-5xl active:scale-95 text-white flex items-center justify-center gap-6 transition-all transform hover:-translate-y-2 border border-white/5">
                       НАЧАТЬ СЕССИЮ — 1 <Icons.Diamond className="w-7 h-7 diamond-glow"/>
                   </button>
               </div>
           </div>
        )}

        {/* ЭКРАН 3: ХАБ ПОМОЩИ (B2C) - НОВЫЙ ПРЕМИУМ ДИЗАЙН */}
        {screen === 'client_hub' && (
           <div className="flex-1 overflow-y-auto p-6 space-y-10 no-scrollbar pb-32 text-left animate-in">
              
              {/* Hero Section */}
              <div className="relative overflow-hidden rounded-[3.5rem] border border-white/10 shadow-5xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-emerald-900/30 backdrop-blur-xl"></div>
                <div className="absolute inset-0 mesh-gradient opacity-30"></div>
                
                <div className="relative p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em]">Premium Service</span>
                    </div>
                    <h2 className="text-4xl font-black text-white leading-tight mb-3">ИИ-Терапия 24/7</h2>
                    <p className="text-[14px] text-white/70 font-medium leading-relaxed">Глубокая диагностика и бережная поддержка от продвинутых нейросетей</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-5xl font-black text-white">1990₽</span>
                    <button 
                      onClick={()=>showToast("Заявка принята")}
                      className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/30 active:scale-95 transition-all hover:shadow-emerald-500/50"
                    >
                      Активировать
                    </button>
                  </div>
                </div>
              </div>

              {/* Mode Selection Grid */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.6em]">Выбор режима</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                <div className="grid gap-5">
                  {/* ИИ-Диагностика */}
                  <button 
                    onClick={() => { setScreen('chat'); setMessages([]); handleSend("Мне нужна глубокая диагностика моего текущего состояния", true, 'chat', 'diagnostics'); }} 
                    className="group relative overflow-hidden rounded-[3rem] p-1 active:scale-[0.98] transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem]"></div>
                    
                    <div className="relative flex items-center gap-6 p-8">
                      <div className="w-20 h-20 rounded-3xl bg-indigo-500/20 flex items-center justify-center text-5xl border border-indigo-400/30 shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        🔍
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-2">ИИ-Диагностика</h3>
                        <p className="text-[12px] text-white/60 font-bold uppercase tracking-widest">Поиск корня проблемы • Глубокий анализ</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <span className="material-symbols-outlined text-white text-[24px]">arrow_forward</span>
                      </div>
                    </div>
                  </button>

                  {/* ИИ-Психолог */}
                  <button 
                    onClick={() => { setScreen('chat'); setMessages([]); handleSend("Мне нужна срочная психологическая помощь", true, 'chat', 'therapy'); }} 
                    className="group relative overflow-hidden rounded-[3rem] p-1 active:scale-[0.98] transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem]"></div>
                    
                    <div className="relative flex items-center gap-6 p-8">
                      <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 flex items-center justify-center text-5xl border border-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        ✨
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-2">ИИ-Психолог</h3>
                        <p className="text-[12px] text-white/60 font-bold uppercase tracking-widest">Бережная поддержка • Эмпатия 24/7</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <span className="material-symbols-outlined text-white text-[24px]">arrow_forward</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 px-2">
                <button 
                  onClick={()=>showToast("Ваша ссылка скопирована")}
                  className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-indigo-400 text-[20px]">share</span>
                    </div>
                    <span className="text-[11px] font-black text-white/70 uppercase tracking-widest">Поделиться</span>
                    <span className="text-[10px] text-emerald-400 font-bold">+3 💎</span>
                  </div>
                </button>
                
                <button 
                  onClick={()=>showToast("Поддержка: @lazalex81")}
                  className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-emerald-400 text-[20px]">support_agent</span>
                    </div>
                    <span className="text-[11px] font-black text-white/70 uppercase tracking-widest">Помощь</span>
                    <span className="text-[10px] text-white/40 font-bold">24/7</span>
                  </div>
                </button>
              </div>

              {/* Info Badge */}
              <div className="mx-2 p-4 rounded-2xl bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-white/5 flex items-center gap-3">
                <span className="material-symbols-outlined text-indigo-400 text-[20px]">info</span>
                <p className="text-[11px] text-white/70 font-medium flex-1">
                  Все сессии конфиденциальны и защищены шифрованием Platinum Level
                </p>
              </div>
           </div>
        )}

        {/* ЭКРАН 4: ЧАТ СЕССИИ (ИНТЕРФЕЙС ВЗАИМОДЕЙСТВИЯ) */}
        {screen === 'chat' && (
           <div className="flex-1 flex flex-col relative h-full animate-in">
               <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-64 text-left">
                   {messages.map((m, i) => (
                       <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in`}>
                           <div 
                             className={`max-w-[88%] p-7 text-[16px] leading-relaxed font-medium shadow-5xl ${
                               m.role === 'user' 
                                 ? 'bg-indigo-600 text-white rounded-[2.2rem_2.2rem_0.8rem_2.2rem] bubble-user' 
                                 : m.role === 'hint'
                                 ? 'bg-orange-500/15 border-2 border-dashed border-orange-500/40 text-orange-200 rounded-[2.2rem] text-xs italic text-center w-full max-w-full'
                                 : 'bg-slate-800/85 backdrop-blur-3xl border border-white/8 text-slate-50 rounded-[2.2rem_2.2rem_2.2rem_0.8rem] bubble-ai shadow-inner'
                             }`} 
                             dangerouslySetInnerHTML={{__html: marked.parse(m.content || "")}}
                           />
                       </div>
                   ))}
                   
                   {isTyping && (
                    <div className="flex gap-2.5 p-6 bg-slate-800/70 rounded-[2.5rem] w-fit border border-white/5 shadow-3xl bubble-ai">
                      <div className="loader-dots flex gap-2.5">
                          <div/><div/><div/>
                      </div>
                    </div>
                   )}
                   <div ref={chatEndRef} />
               </div>

               <footer className="absolute bottom-0 w-full p-6 bg-slate-950/98 backdrop-blur-4xl border-t border-white/5 z-50">
                   <div className="flex flex-col gap-4 mb-8">
                       {role === 'psychologist' && (
                         <button 
                            onClick={() => handleSend("Проанализируй ситуацию и дай профессиональный совет супервизора", false, 'get_hint')} 
                            className="w-full py-5 bg-orange-600/20 border border-orange-500/25 rounded-[1.8rem] text-[12px] font-black uppercase text-orange-400 active:scale-95 transition-all flex items-center justify-center gap-4 tracking-widest shadow-2xl transform hover:-translate-y-1"
                         >
                            <Icons.Sparkles className="w-5 h-5"/> СОВЕТ ИИ-СУПЕРВИЗОРА
                         </button>
                       )}
                       <button 
                        onClick={finishSession} 
                        className="w-full py-5 bg-emerald-600/20 border border-emerald-500/25 rounded-[1.8rem] text-[12px] font-black uppercase text-emerald-400 active:scale-95 transition-all tracking-widest shadow-2xl transform hover:-translate-y-1 text-center"
                       >
                        🏁 ЗАВЕРШИТЬ СЕССИЮ И ПОЛУЧИТЬ АУДИТ
                       </button>
                   </div>
                   
                   <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-[2.5rem] p-2 pr-2 focus-within:ring-2 ring-indigo-500/30 transition-all shadow-inner">
                       <button 
                        onClick={isRecording ? stopVoiceInput : startVoiceInput}
                        className={`w-12 h-12 flex items-center justify-center rounded-[1.6rem] transition-all shadow-4xl active:scale-95 ${
                          isRecording 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' 
                            : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                        }`}
                       >
                        <span className="material-symbols-outlined text-[22px]">mic</span>
                       </button>
                       <textarea 
                          value={inputText} 
                          onChange={e => setInputText(e.target.value)} 
                          rows={1} 
                          className="flex-1 bg-transparent border-none outline-none text-[17px] px-4 py-4.5 text-white placeholder:text-slate-600 resize-none font-medium no-scrollbar leading-tight" 
                          placeholder={isRecording ? `Запись... ${recordingTime}с` : "Ваша интервенция..."} 
                          onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}} 
                       />
                       <button 
                        onClick={() => handleSend()} 
                        className="w-14 h-14 bg-indigo-600 rounded-[1.8rem] flex items-center justify-center active:scale-90 transition-all shadow-4xl shadow-indigo-600/50 transform hover:scale-105"
                       >
                        <Icons.Send className="w-7 h-7 text-white ml-0.5"/>
                       </button>
                   </div>
                   {isRecording && (
                     <div className="flex items-center gap-2 justify-center mt-2">
                       <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                       <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Запись: {recordingTime}с</span>
                     </div>
                   )}
               </footer>
           </div>
        )}

        {/* ЭКРАН 5: ВИТРИНА МАСТЕРОВ (AGGREGATOR) */}
        {screen === 'aggregator' && (
           <div className="flex-1 overflow-y-auto p-8 space-y-12 no-scrollbar pb-40 text-left animate-in">
               <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Витрина</h2>
               <div className="space-y-8">
                   {psychologists.length === 0 ? (
                    <div className="p-20 text-center glass-card rounded-[4rem] border-dashed border-white/15">
                        <Icons.Search className="w-20 h-20 text-slate-800 mx-auto mb-8 animate-pulse"/>
                        <p className="text-[13px] font-black text-slate-600 uppercase tracking-[0.3em] pl-[0.3em]">Поиск мастеров Platinum...</p>
                    </div>
                   ) : psychologists.map((p, i) => (
                       <div key={i} className="p-12 rounded-[4.5rem] bg-slate-900/50 border border-indigo-500/20 shadow-5xl animate-in relative overflow-hidden group">
                           <div className="absolute -top-12 -left-12 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                           <div className="flex gap-10 items-center relative z-10">
                               <div className="w-28 h-28 bg-slate-800 rounded-[3rem] flex items-center justify-center text-6xl overflow-hidden border border-white/5 shadow-inner">
                                   {p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover" alt={p.name}/> : '👤'}
                               </div>
                               <div className="flex-1">
                                   <h4 className="text-3xl font-black text-white leading-tight tracking-tight">{p.name}</h4>
                                   <p className="text-[11px] font-black uppercase text-indigo-400 mt-4 tracking-widest leading-relaxed">Стаж {p.experience} лет • {p.methods}</p>
                               </div>
                           </div>
                           <div className="mt-12 flex justify-between items-center border-t border-white/5 pt-10 relative z-10">
                               <div>
                                   <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Сессия 60 мин</span>
                                   <p className="text-4xl font-black text-white leading-none mt-4">{p.price}₽</p>
                               </div>
                               <button onClick={()=>showToast("Заявка на сессию принята")} className="bg-indigo-600 px-14 py-6 rounded-[2rem] text-[12px] font-black uppercase tracking-widest text-white shadow-3xl active:scale-95 transition-all transform hover:-translate-y-2 border border-white/10">Записаться</button>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
        )}

        {/* ЭКРАН 6: ПРОФИЛЬ МАСТЕРА (EXTENDED PROFILE) */}
        {screen === 'profile' && (
           <div className="flex-1 overflow-y-auto p-7 space-y-16 no-scrollbar pb-52 text-left animate-in">
               <div className="flex justify-between items-end px-2">
                 <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Профиль</h2>
                 <span className="text-[11px] font-black uppercase text-indigo-500 tracking-[0.7em] opacity-80">Evolution</span>
               </div>
               
               <div className="space-y-16">
                   <div className="flex gap-10 items-center">
                       <div className="w-36 h-36 bg-white/5 rounded-[3.5rem] flex items-center justify-center border-2 border-dashed border-white/10 overflow-hidden relative shadow-5xl group transition-all cursor-pointer" onClick={()=>fileInputRef.current.click()}>
                           {userProfile.photoUrl 
                             ? <img src={userProfile.photoUrl} className="w-full h-full object-cover shadow-2xl" alt="Profile"/> 
                             : <Icons.User className="w-16 h-16 text-slate-800 group-hover:text-indigo-500 transition-colors duration-500"/>
                           }
                           <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload}/>
                           <div className="absolute inset-0 bg-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                               <span className="text-[11px] font-black text-white uppercase tracking-widest">Change Photo</span>
                           </div>
                       </div>
                       <div className="flex-1">
                           <button onClick={()=>showToast("Реферальная ссылка скопирована")} className="w-full py-7 bg-indigo-600/15 border border-indigo-500/25 rounded-[2.2rem] text-[11px] font-black uppercase text-indigo-300 shadow-xl active:scale-95 transition-all flex items-center justify-center gap-4 tracking-tighter transform hover:scale-[1.02] duration-500">
                             ПРИГЛАСИ КОЛЛЕГУ +3 <Icons.Diamond className="w-5 h-5 diamond-glow"/>
                           </button>
                       </div>
                   </div>
                   
                   <VideoRecorder onUpload={(url) => {
                       setUserProfile(prev => ({...prev, videoUrl: url}));
                       showToast("Видеовизитка успешно сохранена");
                   }}/>
                   
                   <div className="space-y-12 pt-4">
                       <div className="space-y-5">
                           <label className="text-[12px] font-black text-slate-600 uppercase ml-6 tracking-[0.4em]">Публичное Имя</label>
                           <input type="text" className="w-full p-8 glass-card rounded-[2.5rem] text-[18px] font-bold text-white outline-none focus:border-indigo-500 transition-all shadow-4xl border-white/5" value={userProfile.name} onChange={e => setUserProfile({...userProfile, name:e.target.value})} placeholder="Как вас увидят клиенты..."/>
                       </div>
                       
                       <div className="flex gap-8">
                           <div className="space-y-5 flex-1">
                               <label className="text-[12px] font-black text-slate-600 uppercase ml-6 tracking-[0.4em]">Стаж (лет)</label>
                               <input type="number" className="w-full p-8 glass-card rounded-[2.5rem] text-[18px] font-bold text-white outline-none focus:border-indigo-500 transition-all border-white/5" value={userProfile.experience} onChange={e => setUserProfile({...userProfile, experience:e.target.value})}/>
                           </div>
                           <div className="space-y-5 flex-1">
                               <label className="text-[12px] font-black text-slate-600 uppercase ml-6 tracking-[0.4em]">Цена (₽)</label>
                               <input type="number" className="w-full p-8 glass-card rounded-[2.5rem] text-[18px] font-bold text-white outline-none focus:border-indigo-500 transition-all border-white/5" value={userProfile.price} onChange={e => setUserProfile({...userProfile, price:e.target.value})}/>
                           </div>
                       </div>
                       
                       <div className="space-y-5">
                           <label className="text-[12px] font-black text-slate-600 uppercase ml-6 tracking-[0.4em]">Ваша философия (О себе)</label>
                           <textarea className="w-full p-10 glass-card rounded-[3rem] text-[16px] font-medium text-white outline-none focus:border-indigo-500 transition shadow-4xl min-h-[220px] no-scrollbar leading-relaxed border-white/5" placeholder="Опишите ваш подход, ценности и специализацию..." value={userProfile.about} onChange={e => setUserProfile({...userProfile, about:e.target.value})}/>
                       </div>
                       
                       <div className="space-y-5">
                           <label className="text-[12px] font-black text-slate-600 uppercase ml-6 tracking-[0.4em]">Методы работы (модальности)</label>
                           <input type="text" className="w-full p-8 glass-card rounded-[2.5rem] text-[16px] font-bold text-white outline-none focus:border-indigo-500 transition shadow-4xl border-white/5" placeholder="МПТ, КПТ, Гештальт..." value={userProfile.methods} onChange={e => setUserProfile({...userProfile, methods:e.target.value})}/>
                       </div>
                   </div>
                   
                   <button onClick={saveProfile} className="w-full py-11 bg-gradient-to-r from-indigo-600 to-indigo-900 rounded-[3rem] text-[15px] font-black uppercase tracking-[0.7em] text-white shadow-5xl active:scale-95 transition-all mt-14 transform hover:-translate-y-2 border border-white/10 shadow-indigo-500/20">
                    СОХРАНИТЬ МАСТЕРА
                   </button>
               </div>
           </div>
        )}

      </main>

      {/* 10. НИЖНЯЯ СИСТЕМА НАВИГАЦИИ (DYNAMIC FOOTER) */}
      {(role !== null && screen !== 'chat' && screen !== 'legal' && screen !== 'loading') && (
        <nav className="h-[105px] bg-slate-950/98 backdrop-blur-4xl border-t border-white/5 flex justify-around items-center px-10 pb-10 z-50 shadow-[0_-30px_70px_rgba(0,0,0,1)]">
            {[
                {id: 'hub', icon: Icons.Infinity, label: 'Главная'},
                {id: 'setup', icon: Icons.Sparkles, label: 'Тренажер'},
                {id: 'aggregator', icon: Icons.Search, label: 'Витрина'},
                {id: 'profile', icon: Icons.User, label: 'Профиль'}
            ].map(item => (
                <button 
                  key={item.id} 
                  onClick={() => setScreen(item.id)} 
                  className={`flex flex-col items-center gap-4 w-22 transition-all duration-700 ${screen === item.id ? 'text-indigo-400 -translate-y-5' : 'text-slate-700 hover:text-slate-500'}`}
                >
                    <div className="relative">
                      <item.icon className={`w-8.5 h-8.5 ${screen === item.id ? 'drop-shadow-[0_0_18px_rgba(99,102,241,1)]' : ''}`}/>
                      {screen === item.id && (
                        <div className="absolute -inset-6 bg-indigo-500/15 rounded-full blur-3xl animate-pulse -z-10"/>
                      )}
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 pl-[0.2em] ${screen === item.id ? 'opacity-100' : 'opacity-40'}`}>
                      {item.label}
                    </span>
                </button>
            ))}
        </nav>
      )}

    </div>
  );
}
