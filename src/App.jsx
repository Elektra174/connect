import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

/**
 * CONNECTUM PRO v20.5 - PLATINUM ULTRA-MOBILE
 * --------------------------------------------------------
 * 📱 COMPACT UI: Ультра-компактный Хаб для 100% влезаемости.
 * 💎 DIAMOND GLOW: Многогранный кристалл с эффектом сияния.
 * 🔗 API SYNC: Исправлена логика запросов и обработки ошибок.
 * 👥 DATABASE: Все 30 клиентов на борту.
 */

// --- 🎨 PREMIUM FACETED SVG ICONS (v20.5) ---
const Icons = {
  Infinity: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
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
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  // ОБНОВЛЕННЫЙ ПЛАТИНОВЫЙ БРИЛЛИАНТ С ГРАНЯМИ
  Diamond: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <path d="M6 4H18L22 9L12 21L2 9L6 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 4L12 21L18 4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
      <path d="M2 9H22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
      <path d="M12 4V21" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
      <path d="M6 4L11 9H13L18 4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
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
  Trophy: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  )
};

// --- 👥 ПОЛНАЯ БАЗА КЛИЕНТОВ (30 КЕЙСОВ) ---
const CLIENT_DATABASE = [
    { id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", familyStatus: "В разводе", status: "Средний класс", avatar: "👩‍💻", bio: "Парализующий саботаж при записи видео. Страх проявления зашкаливает. В теле — зажим в горле." },
    { id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", familyStatus: "Холост", status: "Высокий доход", avatar: "👨‍🎨", bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным. Тяжесть в плечах." },
    { id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", familyStatus: "Замужем, двое детей", status: "Стабильный доход", avatar: "👩‍💼", bio: "Постоянное сжатие в груди и тревога. Не могу переключиться с работы на отдых." },
    { id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", familyStatus: "В поиске", status: "Нестабильный", avatar: "👨🏻", bio: "Сменил 5 профессий за 2 года. Нигде не находит признания, чувствует себя неудачником." },
    { id: "c5", name: "Анна", age: 25, profession: "Студентка", familyStatus: "В отношениях", status: "Студент", avatar: "👩🏼", bio: "Не может завершить разрушительные отношения. Боится одиночества до ватных ног." },
    { id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", familyStatus: "Карьерист", status: "VIP", avatar: "👨🏻‍💼", bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе и холод." },
    { id: "c7", name: "Ольга", age: 38, profession: "Врач", familyStatus: "Замужем", status: "Бюджетник", avatar: "👩🏻", bio: "Ипохондрия. Паника при малейшем физическом дискомфорте." },
    { id: "c8", name: "Дмитрий", age: 29, profession: "Продавец", familyStatus: "Холост", status: "Базовый", avatar: "🧔🏻", bio: "Боится встреч. Напряжение в скулах и зажим речи." },
    { id: "c9", name: "Мария", age: 33, profession: "Домохозяйка", familyStatus: "Замужем, младенец", status: "Обеспеченная", avatar: "👩‍🍼", bio: "Материнская вина. Ощущение, что она плохая мать. Не может вздохнуть." },
    { id: "c10", name: "Сергей", age: 50, profession: "Предприниматель", familyStatus: "Женат", status: "Кризис капитала", avatar: "👨🏻‍🦳", bio: "Банкротство бизнеса. Колоссальный стыд перед семьей." },
    { id: "c11", name: "Юлия", age: 27, profession: "Модель", familyStatus: "В отношениях", status: "Средний", avatar: "👩🏻", bio: "РПП. Ненавидит свое отражение. Постоянный контроль веса." },
    { id: "c12", name: "Андрей", age: 35, profession: "Архитектор", familyStatus: "Холост", status: "Средний+", avatar: "👨🏿", bio: "Вспышки неконтролируемого гнева. Ощущение кипятка в груди." },
    { id: "c13", name: "Наталья", age: 40, profession: "Учитель", familyStatus: "Разведена", status: "Базовый", avatar: "👩‍💼", bio: "Одиночество в толпе. Живет как за толстым стеклом." },
    { id: "c14", name: "Павел", age: 22, profession: "Курьер", familyStatus: "Живет с родителями", status: "Низкий", avatar: "👱🏻", bio: "Зависимость от мнения родителей в 22 года. Не может принять решение." },
    { id: "c15", name: "Екатерина", age: 36, profession: "HR-директор", familyStatus: "Замужем", status: "Высокий", avatar: "👩‍🏫", bio: "Выгорание. Перфекционизм. Жжение в глазах от истощения." },
    { id: "c16", name: "Александр", age: 44, profession: "Инженер", familyStatus: "Вдовец", status: "Средний", avatar: "👨🏻", bio: "Застрял в горе. Чувствует вину перед ушедшим близким." },
    { id: "c17", name: "Светлана", age: 30, profession: "Бьюти-мастер", familyStatus: "В поиске", status: "Средний", avatar: "👩🏼", bio: "Низкая самооценка. Считает себя 'недостаточной' для любви." },
    { id: "c18", name: "Роман", age: 32, profession: "Аналитик", familyStatus: "Холост", status: "Средний", avatar: "👨🏿‍💻", bio: "Игровая зависимость. Уход от реальности в виртуальный мир." },
    { id: "c19", name: "Ирина", age: 48, profession: "Юрист", familyStatus: "Дети уехали", status: "Высокий", avatar: "👵🏼", bio: "Синдром пустого гнезда. Смысл жизни пропал." },
    { id: "c20", name: "Кирилл", age: 26, profession: "Дизайнер", familyStatus: "Холост", status: "Фриланс", avatar: "👦🏻", bio: "Агорафобия. Боится выходить на открытые пространства." },
    { id: "c21", name: "Татьяна", age: 55, profession: "Пенсионерка", familyStatus: "Замужем", status: "Базовый", avatar: "👩🏻‍🦱", bio: "Кризис старения. Ощущение, что время уходит впустую." },
    { id: "c22", name: "Виктор", age: 39, profession: "Водитель", familyStatus: "Разведен", status: "Средний", avatar: "🧔", bio: "Переживает измену. Колючая проволока вокруг сердца." },
    { id: "c23", name: "Алина", age: 24, profession: "Бариста", familyStatus: "В отношениях", status: "Начинающий", avatar: "👩‍🎓", bio: "Не умеет говорить 'нет'. Чувствует, что все ею пользуются." },
    { id: "c24", name: "Денис", age: 37, profession: "Охранник", familyStatus: "Холост", status: "Базовый", avatar: "👨🏻", bio: "Навязчивые мысли о здоровье. Постоянные проверки." },
    { id: "c25", name: "Людмила", age: 60, profession: "Педагог", familyStatus: "Вдова", status: "Пенсия", avatar: "👵", bio: "Конфликт с невесткой. Чувствует себя ненужной и лишней." },
    { id: "c26", name: "Максим", age: 21, profession: "Блогер", familyStatus: "Холост", status: "Нестабильный", avatar: "👦🏼", bio: "Подростковый бунт против системы. Ничего не хочет делать." },
    { id: "c27", name: "Валерия", age: 31, profession: "Стилист", familyStatus: "Замужем", status: "Средний", avatar: "👩🏻‍🦰", bio: "Болезненная ревность. Постоянный поиск улик измены." },
    { id: "c28", name: "Станислав", age: 43, profession: "Адвокат", familyStatus: "Женат", status: "Высокий", avatar: "👨🏻‍💼", bio: "Трудоголизм. Не умеет расслабляться без алкоголя." },
    { id: "c29", name: "Евгения", age: 29, profession: "Копирайтер", familyStatus: "Холост", status: "Средний", avatar: "👩🏻", bio: "Страх перемен. Боится менять работу, даже если там плохо." },
    { id: "c30", name: "Константин", age: 35, profession: "Финансист", familyStatus: "Холост", status: "Высокий", avatar: "👨🏻", bio: "Эмоциональная холодность. Не понимает, что чувствует." }
];

const MODALITIES = {
  mpt: { id: "mpt", name: "МПТ (Мета-персональная)", color: "indigo" },
  cbt: { id: "cbt", name: "КПТ (Когнитивная)", color: "emerald" },
  gestalt: { id: "gestalt", name: "Гештальт", color: "purple" },
  eit: { id: "eit", name: "ЭОТ (Образная)", color: "amber" },
  psychoanalysis: { id: "psychoanalysis", name: "Психоанализ", color: "rose" },
  ta: { id: "ta", name: "ТА (Транзактный)", color: "cyan" }
};

// --- 🛠 STYLES (v20.5 ULTRA-MOBILE) ---
const GlobalStyles = () => (
  <style>{`
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    .btn-magnetic {
      background: linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.01) 100%);
      background-size: 200% 100%;
      animation: shimmer 8s infinite linear;
      position: relative; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .outlined-text {
      position: absolute; bottom: -5px; right: 5px;
      font-size: clamp(2rem, 10vw, 3rem); font-weight: 950; color: transparent;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.03);
      pointer-events: none; text-transform: uppercase; line-height: 1; letter-spacing: -2px;
    }
    .mesh-bg {
      position: fixed; inset: 0; z-index: -1;
      background: radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.12) 0px, transparent 55%), radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.1) 0px, transparent 55%), radial-gradient(at 50% 100%, rgba(16, 185, 129, 0.08) 0px, transparent 55%);
      filter: blur(80px);
    }
    .glass-card {
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(40px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .chat-bubble-ai { border-radius: 20px 20px 20px 4px; background: rgba(30, 41, 59, 0.98); border: 1px solid rgba(255,255,255,0.05); }
    .chat-bubble-user { border-radius: 20px 20px 4px 20px; background: linear-gradient(135deg, #4f46e5, #7c3aed); }
  `}</style>
);

// --- 🧠 MAIN APP ---
export default function App() {
  const [screen, setScreen] = useState('hub');
  const [role, setRole] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [selectedModality, setSelectedModality] = useState('mpt');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [psychologists, setPsychologists] = useState([]);
  const [userProfile, setUserProfile] = useState({ name: '', experience: 0, price: 0, methods: '', isPremium: false, photoUrl: null, videoUrl: null });
  const [gems, setGems] = useState(5);
  const [errorLog, setErrorLog] = useState(null);

  const chatEndRef = useRef(null);
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id?.toString() || 'dev_platinum';

  const unlockAudio = () => {
    const silent = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==");
    silent.play().catch(() => {});
  };

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#020617');
      tg.enableClosingConfirmation();
    }
  }, []);

  // Предохранитель для MediaDevices (камера)
  const checkCameraSupport = () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
      return false;
    }
    return true;
  };

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isTyping]);

  const handleSend = async (text = inputText, isInitial = false, action = 'chat') => {
    if (isInitial) unlockAudio();
    if (!text && !isInitial) return;
    if (!isInitial && action === 'chat') setMessages(prev => [...prev, { role: 'user', content: text }]);
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
          history: messages.filter(m => m.role !== 'hint') 
        })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (action === 'get_hint') {
        setMessages(prev => [...prev, { role: 'hint', content: data.hint }]);
      } else if (data.content) {
        setMessages(prev => [...prev, { role: 'ai', content: data.content, voice: data.voice }]);
        if (data.voice) {
          const audio = new Audio(`data:audio/mp3;base64,${data.voice}`);
          audio.play().catch(e => console.error("Audio blocked:", e));
        }
      }
    } catch (e) {
      console.error("Error sending message:", e);
      setErrorLog(e.message);
      setMessages(prev => [...prev, { role: 'ai', content: "Извините, произошла ошибка. Попробуйте еще раз." }]);
    }
    setIsTyping(false);
  };

  const finishSession = async () => {
    if (!window.confirm("Завершить сессию и получить итоги?")) return;
    setIsTyping(true);
    try {
      const res = await fetch('/api/finish', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId, history: messages, modalityId: selectedModality, role })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'report', data: data.analytics || data.data, cert: data.certificateUrl }]);
    } catch (e) {
      console.error("Error finishing session:", e);
      setMessages(prev => [...prev, { role: 'ai', content: "Ошибка завершения сессии." }]);
    }
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[100dvh] max-h-screen bg-[#020617] text-slate-100 overflow-hidden relative font-sans text-left selection:bg-indigo-500/30">
      <GlobalStyles />
      <div className="mesh-bg" />

      {/* HEADER */}
      {screen !== 'hub' && (
        <header className="flex-shrink-0 h-16 bg-slate-950/60 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-4 z-50">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen('hub')} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition">
              <Icons.ChevronLeft className="w-4 h-4 text-slate-400" />
            </button>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest leading-none">Connectum</span>
              <span className="text-[6px] font-bold text-slate-600 uppercase mt-1">Platinum v20.5</span>
            </div>
          </div>
          <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">{gems}/5</span>
            <Icons.Diamond className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400 drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden relative flex flex-col z-10">
        
        {/* SCREEN: HUB */}
        {screen === 'hub' && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in duration-1000">
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-600 blur-[60px] opacity-20" />
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-white/10 relative z-10 animate-pulse cursor-pointer">
                <Icons.Infinity className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tighter text-white leading-none">Connectum</h1>
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.7em] opacity-60 leading-none">Эволюция Психологии</p>
            </div>

            <div className="w-full grid gap-4 max-w-sm">
              <button onClick={() => { unlockAudio(); setScreen('client_hub'); setRole('client'); }} className="btn-magnetic w-full p-6 glass-card rounded-[3rem] flex items-center gap-4 group active:scale-95 shadow-2xl overflow-hidden relative text-left">
                <div className="outlined-text">ДОВЕРИЕ</div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition shadow-inner">🤝</div>
                <div className="relative z-10">
                  <h3 className="text-lg font-black uppercase text-white leading-tight">Я Клиент</h3>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1 leading-none">Помощь • Диагностика</p>
                </div>
              </button>

              <button onClick={() => { unlockAudio(); setScreen('setup'); setRole('psychologist'); }} className="btn-magnetic w-full p-6 glass-card rounded-[3rem] flex items-center gap-4 group active:scale-95 shadow-2xl overflow-hidden relative text-left">
                <div className="outlined-text">МАСТЕРСТВО</div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition shadow-inner">🧠</div>
                <div className="relative z-10">
                  <h3 className="text-lg font-black uppercase text-white leading-tight">Я Психолог</h3>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1 leading-none">Тренажер • Рост • Рейтинг</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* SCREEN: CLIENT HUB */}
        {screen === 'client_hub' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-20 animate-in slide-in-from-left duration-500 text-left">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Клиентский центр</h2>
            
            <div className="p-6 bg-gradient-to-br from-indigo-600/20 to-indigo-900/40 rounded-[2.5rem] border border-indigo-500/30 flex justify-between items-center relative overflow-hidden group">
              <div className="absolute -bottom-3 -right-3 opacity-5 group-hover:scale-150 transition-all duration-1000"><Icons.Diamond className="w-24 h-24" /></div>
              <div className="relative z-10">
                <h4 className="text-xs font-black uppercase text-indigo-300 tracking-widest">Client Premium</h4>
                <p className="text-[9px] text-indigo-100/60 font-bold uppercase mt-1">ИИ-терапия 24/7 + Подбор</p>
              </div>
              <div className="text-right relative z-10">
                <span className="text-xl font-black">1990₽</span>
                <button className="block bg-indigo-600 text-[8px] font-black uppercase px-4 py-2 rounded-full mt-2 shadow-lg tracking-widest active:scale-90 transition">Купить</button>
              </div>
            </div>

            <div className="grid gap-3">
              <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Начать диагностику", true, 'diagnostics'); }} className="p-5 glass-card rounded-[2.5rem] flex items-center gap-4 active:scale-95 text-left border-l-3 border-l-indigo-500 shadow-2xl">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl shadow-inner text-indigo-400">🔍</div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-white uppercase tracking-tight leading-none">ИИ-Диагностика</h4>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1 leading-tight">Найти причину состояния</p>
                </div>
              </button>
              <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Начать терапию", true, 'ai_therapy'); }} className="p-5 glass-card rounded-[2.5rem] flex items-center gap-4 active:scale-95 text-left border-l-3 border-l-emerald-500 shadow-2xl">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl shadow-inner text-emerald-400">✨</div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-white uppercase tracking-tight leading-none">ИИ-Терапевт</h4>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1 leading-tight">Немедленная поддержка</p>
                </div>
              </button>
              <button onClick={() => setScreen('aggregator')} className="p-5 glass-card rounded-[2.5rem] flex items-center gap-4 active:scale-95 text-left border-l-3 border-l-purple-500 shadow-2xl">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-2xl shadow-inner text-purple-400">👥</div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-white uppercase tracking-tight leading-none">Витрина Мастеров</h4>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1 leading-tight">Ваш личный специалист</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* SCREEN: SETUP (PSYCHOLOGIST) */}
        {screen === 'setup' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-20 animate-in slide-in-from-right duration-500 text-left">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Мастерская</h2>
            
            <div className="flex gap-3">
              <div className="flex-1 p-4 glass-card rounded-[2.5rem] border-l-3 border-l-orange-500 relative overflow-hidden group active:scale-95 transition-transform text-white">
                <h5 className="text-[8px] font-black uppercase text-orange-400 tracking-widest leading-none">Тест-драйв</h5>
                <p className="text-xl font-black mt-1 leading-none">490₽</p>
                <p className="text-[7px] text-slate-500 font-bold uppercase mt-2 leading-none">3 дня практики</p>
              </div>
              <div className="flex-1 p-4 bg-indigo-600/10 border border-white/5 rounded-[2.5rem] border-l-3 border-l-indigo-600 relative overflow-hidden group active:scale-95 transition-transform text-white">
                <h5 className="text-[8px] font-black uppercase text-indigo-400 tracking-widest leading-none">PRO Доступ</h5>
                <p className="text-xl font-black mt-1 leading-none">2990₽</p>
                <p className="text-[7px] text-slate-500 font-bold uppercase mt-2 leading-none">Месяц + Рейтинг</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-3">
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-slate-600 uppercase ml-3 tracking-widest block">Школа (Модальность)</label>
                  <select value={selectedModality} onChange={(e) => setSelectedModality(e.target.value)} className="w-full p-4 glass-card rounded-[2rem] text-xs font-bold appearance-none outline-none text-white shadow-xl">
                    {Object.keys(MODALITIES).map(k => <option key={k} value={k} className="bg-slate-900">{MODALITIES[k].name}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-slate-600 uppercase ml-3 tracking-widest block">Кейс клиента</label>
                  <select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="w-full p-4 glass-card rounded-[2rem] text-xs font-bold appearance-none outline-none text-white shadow-xl">
                    {CLIENT_DATABASE.map(c => <option key={c.id} value={c.id} className="bg-slate-900">{c.avatar} {c.name}</option>)}
                  </select>
                </div>
              </div>

              {/* DOSSIER DISPLAY */}
              <div className="glass-card rounded-[3rem] p-6 relative overflow-hidden group shadow-2xl transition-all">
                <div className="absolute top-0 right-0 p-4 text-[80px] opacity-[0.03] pointer-events-none transition-transform group-hover:scale-110 duration-1000 leading-none">{CLIENT_DATABASE.find(c => c.id === selectedClientId).avatar}</div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <span className="text-4xl drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000">{CLIENT_DATABASE.find(c => c.id === selectedClientId).avatar}</span>
                  <div className="space-y-0.5">
                    <h4 className="text-lg font-black text-white leading-none">{CLIENT_DATABASE.find(c => c.id === selectedClientId).name}</h4>
                    <p className="text-[8px] font-black uppercase text-indigo-400 tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-full w-fit mt-1">Верифицированный кейс</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6 relative z-10 border-b border-white/5 pb-6">
                  <div className="space-y-0.5">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Возраст</span>
                    <p className="text-xs font-bold text-white">{CLIENT_DATABASE.find(c => c.id === selectedClientId).age} лет</p>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Профессия</span>
                    <p className="text-xs font-bold text-white leading-none">{CLIENT_DATABASE.find(c => c.id === selectedClientId).profession}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Статус</span>
                    <p className="text-xs font-bold text-white leading-none">{CLIENT_DATABASE.find(c => c.id === selectedClientId).status}</p>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Семья</span>
                    <p className="text-xs font-bold text-white leading-none">{CLIENT_DATABASE.find(c => c.id === selectedClientId).familyStatus}</p>
                  </div>
                </div>

                <div className="space-y-2 relative z-10">
                  <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Запрос клиента:</span>
                  <p className="text-[13px] text-slate-200 italic leading-relaxed border-l-2 border-indigo-500/30 pl-4 py-1">"{CLIENT_DATABASE.find(c => c.id === selectedClientId).bio}"</p>
                </div>
              </div>

              <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Здравствуйте", true); }} className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 py-6 rounded-[3rem] font-black uppercase text-[11px] tracking-[0.3em] shadow-[0_20px_60px_rgba(79,70,229,0.3)] border border-white/10 active:scale-95 transition-all text-white">Вступить в контакт</button>
            </div>
          </div>
        )}

        {/* SCREEN: CHAT */}
        {screen === 'chat' && (
          <div className="flex-1 flex flex-col animate-in fade-in duration-300 relative text-left">
            <div className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar pb-36">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom duration-300`}>
                  {m.role === 'hint' ? (
                    <div className="w-full bg-gradient-to-br from-orange-600/20 to-amber-700/10 border border-orange-500/20 rounded-[2rem] p-4 my-2 flex gap-3 shadow-2xl relative overflow-hidden">
                      <div className="w-10 h-10 bg-orange-600 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg text-white text-xl">🎓</div>
                      <div className="flex-1">
                        <h5 className="text-[9px] font-black uppercase text-orange-400 tracking-widest mb-1 leading-none">Совет Супервизора</h5>
                        <p className="text-[12px] font-bold text-orange-50/90 italic leading-relaxed text-left">"{m.content}"</p>
                      </div>
                    </div>
                  ) : m.role === 'report' ? (
                    <div className="w-full bg-slate-950/80 backdrop-blur-3xl border border-indigo-500/30 rounded-[3rem] p-8 mt-4 text-center shadow-[0_40px_100px_rgba(0,0,0,0.5)] text-white">
                      <Icons.Trophy className="w-12 h-12 text-indigo-400 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
                      <h3 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-300 mb-6">Аудит Мастерства</h3>
                      <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 my-6 text-[12px] italic text-slate-300 leading-relaxed">"{m.data?.expert_comment || m.data?.insight || 'Сессия успешно проанализирована.'}"</div>
                      <button onClick={() => setScreen('hub')} className="w-full py-6 bg-indigo-600 rounded-[2rem] text-[11px] font-black uppercase shadow-2xl tracking-[0.3em] active:scale-95 transition border border-white/10 text-white">Вернуться в Хаб</button>
                    </div>
                  ) : (
                    <div className={`max-w-[88%] p-4 rounded-[2rem] text-[13px] shadow-2xl leading-relaxed text-left text-white ${m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`} dangerouslySetInnerHTML={{ __html: marked.parse(m.content || "") }} />
                  )}
                </div>
              ))}
              {isTyping && <div className="flex gap-2 p-4 bg-slate-900/50 backdrop-blur-xl rounded-[1.5rem] w-fit border border-white/5 animate-pulse"><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" /><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75" /></div>}
              <div ref={chatEndRef} />
            </div>
            
            <footer className="absolute bottom-0 w-full p-4 bg-slate-950/90 backdrop-blur-3xl border-t border-white/5 z-50">
              <div className="flex gap-3 mb-4">
                {role === 'psychologist' && <button onClick={() => handleSend("Дай совет", false, 'get_hint')} className="flex-1 bg-orange-600/10 border border-orange-500/20 py-4 rounded-[1.5rem] text-[9px] font-black uppercase text-orange-400 flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">💡 Совет</button>}
                <button onClick={finishSession} className="flex-1 bg-emerald-600/10 border border-emerald-500/20 py-4 rounded-[1.5rem] text-[9px] font-black uppercase text-emerald-400 flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">🏁 Финиш</button>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-[2rem] p-1.5 shadow-inner focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all overflow-hidden text-left">
                <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Твое сообщение..." rows={1} className="flex-1 bg-transparent border-none outline-none text-[13px] py-4 text-white placeholder:text-slate-700 resize-none font-medium px-4 text-left" />
                <button onClick={() => handleSend()} className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-[1.5rem] flex items-center justify-center shadow-2xl active:scale-90 transition-all shrink-0"><Icons.Send className="w-5 h-5 text-white" /></button>
              </div>
            </footer>
          </div>
        )}

        {/* SCREEN: AGGREGATOR (SHOWCASE) */}
        {screen === 'aggregator' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar animate-in slide-in-from-right duration-500 pb-28 text-left">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Мастера</h2>
            <div className="grid gap-4">
              {psychologists.map((p, idx) => (
                <div key={idx} className={`p-5 rounded-[3rem] border glass-card shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative overflow-hidden transition-all active:scale-[0.98] ${p.isVip ? 'border-indigo-500/40' : 'border-white/5'}`}>
                  {p.isVip && <div className="absolute top-0 right-0 bg-indigo-600 text-white px-5 py-2 rounded-bl-[2rem] text-[9px] font-black uppercase flex items-center gap-1 shadow-xl tracking-widest leading-none">VIP Selection</div>}
                  <div className="flex gap-4 items-start text-left text-white">
                    <div className="w-16 h-16 bg-slate-800 rounded-[2rem] flex-shrink-0 flex items-center justify-center text-3xl border border-white/5 relative shadow-inner overflow-hidden text-center">
                      {p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover" /> : (p.avatar || '👤')}
                      <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-1.5 rounded-[1rem] border-[2px] border-slate-900 shadow-xl text-center flex items-center justify-center text-white"><Icons.Sparkles className="w-3 h-3" /></div>
                    </div>
                    <div className="flex-1 space-y-1 text-left">
                      <h4 className="text-lg font-black text-white leading-none">{p.name}</h4>
                      <div className="flex gap-1.5 items-center flex-wrap">
                        <span className="bg-white/5 px-2 py-0.5 rounded-lg text-[8px] font-bold uppercase text-slate-400 border border-white/5 text-white">Стаж {p.experience} л.</span>
                        <span className="bg-indigo-500/10 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase text-indigo-300 border border-indigo-500/20">Rating {p.skillRating || 70}%</span>
                      </div>
                      <p className="text-[11px] text-slate-400 italic line-clamp-2 mt-2 leading-relaxed text-left text-white opacity-80">"{p.methods}"</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/5 pt-6 text-left text-white">
                    <div className="flex flex-col text-left">
                      <span className="text-[7px] text-slate-500 font-black uppercase tracking-widest leading-none">Цена сессии</span>
                      <span className="text-xl font-black tracking-tighter text-white mt-1">{p.price}₽<span className="text-[9px] text-slate-600 ml-1">/час</span></span>
                    </div>
                    <button className="bg-indigo-600 px-6 py-3 rounded-[1.5rem] text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all text-white">Записаться</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN: PROFILE */}
        {screen === 'profile' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar animate-in slide-in-from-bottom duration-500 pb-28 text-left text-white">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Личный Кабинет</h2>
            
            <div className="space-y-6">
              <div className="space-y-3 text-left">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-3 block text-left">Фото профиля</label>
                <div onClick={() => fileInputRef.current.click()} className="w-full h-32 glass-card rounded-[3rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all relative overflow-hidden group shadow-2xl text-center">
                  {userProfile.photoUrl ? <img src={userProfile.photoUrl} className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" /> : (
                    <><Icons.Camera className="w-10 h-10 text-slate-600 mb-2 group-hover:scale-110 transition-transform text-center" /><span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center">Загрузить портрет</span></>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/" className="hidden" onChange={handlePhotoUpload} />
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-3 block text-left">Видео-визитка (Premium)</label>
                <div className="bg-slate-900/80 rounded-[2.5rem] p-4 border border-white/10 shadow-2xl text-center">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Функция доступна в PRO версии</p>
                </div>
              </div>
              
              <div className="space-y-4 text-left">
                <div className="space-y-1.5 text-left px-3">
                  <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block text-left leading-none">Имя Специалиста</label>
                  <input type="text" className="w-full p-5 glass-card border-none rounded-[2rem] text-[14px] font-bold outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xl transition-all text-white bg-transparent" value={userProfile.name} onChange={(e) => setUserProfile({...userProfile, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3 px-3 text-left">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block text-left leading-none">Стаж (лет)</label>
                    <input type="number" className="w-full p-5 glass-card border-none rounded-[2rem] text-[14px] font-bold outline-none shadow-2xl text-white bg-transparent" value={userProfile.experience} onChange={(e) => setUserProfile({...userProfile, experience: e.target.value})} />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block text-left leading-none">Цена ₽</label>
                    <input type="number" className="w-full p-5 glass-card border-none rounded-[2rem] text-[14px] font-bold outline-none shadow-2xl text-white bg-transparent" value={userProfile.price} onChange={(e) => setUserProfile({...userProfile, price: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-1.5 text-left px-3">
                  <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block text-left leading-none">Методы работы</label>
                  <textarea rows={4} className="w-full p-5 glass-card border-none rounded-[2rem] text-[13px] font-bold outline-none resize-none shadow-2xl text-white bg-transparent" value={userProfile.methods} onChange={(e) => setUserProfile({...userProfile, methods: e.target.value})} />
                </div>
              </div>

              <button onClick={saveProfile} className="w-full bg-indigo-600 py-6 rounded-[3rem] font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl active:scale-95 transition hover:bg-indigo-500 border border-white/10 text-white">Сохранить Профиль</button>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER NAV (Platinum Edition) */}
      {(screen === 'hub' || screen === 'aggregator' || screen === 'profile' || screen === 'client_hub') && (
        <nav className="h-24 bg-slate-950/80 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-4 pb-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-50 text-white">
          <button onClick={() => setScreen('hub')} className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${screen === 'hub' ? 'text-indigo-400 scale-110' : 'text-slate-600'}`}>
            <Icons.Infinity className="w-6 h-6" /><span className="text-[8px] font-black uppercase tracking-[0.2em] leading-none mt-1">Главная</span>
          </button>
          <button onClick={() => { setScreen('client_hub'); setRole('client'); }} className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${screen === 'client_hub' ? 'text-emerald-400 scale-110' : 'text-slate-600'}`}>
            <Icons.Sparkles className="w-6 h-6" /><span className="text-[8px] font-black uppercase tracking-[0.2em] leading-none mt-1">Помощь</span>
          </button>
          <button onClick={() => setScreen('aggregator')} className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${screen === 'aggregator' ? 'text-purple-400 scale-110' : 'text-slate-600'}`}>
            <Icons.Search className="w-6 h-6" /><span className="text-[8px] font-black uppercase tracking-[0.2em] leading-none mt-1">Мастера</span>
          </button>
          <button onClick={() => setScreen('profile')} className={`flex flex-col items-center gap-1.5 transition-all duration-500 ${screen === 'profile' ? 'text-indigo-400 scale-110' : 'text-slate-600'}`}>
            <Icons.User className="w-6 h-6" /><span className="text-[8px] font-black uppercase tracking-[0.2em] leading-none mt-1">Профиль</span>
          </button>
        </nav>
      )}

    </div>
  );
}
