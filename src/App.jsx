import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

/**
 * CONNECTUM PRO v21.1 - ULTIMATE PLATINUM
 * ========================================================
 * 🎨 DESIGN: "AI Studio" / Linear Style (Deep Dark, Subtle Glow, Glass).
 * 🧠 LOGIC: 30 Clients, Difficulty Matrix, Waitlist, Gamification.
 * 📱 UX: Haptics, No-Zoom, 100dvh, Smooth Transitions.
 */

// --- 1. ICONS (INTERNAL SVG SYSTEM) ---
const Icons = {
  Infinity: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/></svg>
  ),
  Search: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  User: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  ),
  Diamond: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="diamGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#4f46e5"/></linearGradient></defs>
      <path d="M6 4H18L22 9L12 21L2 9L6 4Z" stroke="url(#diamGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 4L12 9L18 4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
      <path d="M2 9H22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
      <path d="M12 21V9" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
    </svg>
  ),
  ChevronLeft: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
  Send: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  Camera: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  ),
  Trophy: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
  ),
  Telegram: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>
  ),
  Crown: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
  ),
  Play: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
  )
};

// --- 👥 ПОЛНАЯ БАЗА КЛИЕНТОВ (30 КЕЙСОВ) ---
const CLIENT_DATABASE = [
    { id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", familyStatus: "В разводе", status: "Средний класс", avatar: "👩‍💻", bio: "Парализующий саботаж при записи видео. Страх проявления зашкаливает. В теле — зажим в горле." },
    { id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", familyStatus: "Холост", status: "Высокий доход", avatar: "👨‍🎨", bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным. Тяжесть в плечах." },
    { id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", familyStatus: "Замужем, двое детей", status: "Стабильный доход", avatar: "👩‍💼", bio: "Постоянное сжатие в груди и тревога. Не могу переключиться с работы на отдых." },
    { id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", familyStatus: "В поиске", status: "Нестабильный", avatar: "👨🏻", bio: "Сменил 5 профессий за 2 года. Нигде не находит признания, чувствует себя неудачником." },
    { id: "c5", name: "Анна", age: 25, profession: "Студентка", familyStatus: "В отношениях", status: "Студент", avatar: "👩🏼", bio: "Не может завершить разрушительные отношения. Боится одиночества до тошноты." },
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
  mpt: { id: "mpt", name: "МПТ (Мета-персональная терапия)", color: "indigo" },
  cbt: { id: "cbt", name: "КПТ (Когнитивно-поведенческая терапия)", color: "emerald" },
  gestalt: { id: "gestalt", name: "Гештальт-терапия", color: "purple" },
  eit: { id: "eit", name: "ЭОТ (Эмоционально-образная терапия)", color: "amber" },
  psychoanalysis: { id: "psychoanalysis", name: "Психоаналитическая терапия", color: "rose" },
  ta: { id: "ta", name: "Транзактный анализ", color: "cyan" }
};

// --- 🛠 STYLES (AI STUDIO THEME) ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
    
    :root {
      --bg-deep: #020617;
      --card-glass: rgba(15, 23, 42, 0.6);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent-glow: 0 0 20px rgba(99, 102, 241, 0.15);
    }

    body { font-family: 'Manrope', sans-serif; background-color: var(--bg-deep); color: #f8fafc; overflow: hidden; }
    
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
    @keyframes pulse-glow { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }

    .btn-magnetic {
      background: linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.01) 100%);
      background-size: 200% 100%;
      animation: shimmer 6s infinite linear;
      position: relative; overflow: hidden; 
      border: 1px solid var(--card-border);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .btn-magnetic:active { transform: scale(0.96); }
    
    /* Outlined Text with Clamp */
    .outlined-text {
      position: absolute; bottom: -8px; right: 8px;
      font-size: clamp(1.8rem, 8vw, 3.5rem);
      font-weight: 800; color: transparent;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.04);
      pointer-events: none; text-transform: uppercase; line-height: 1; letter-spacing: -0.02em;
    }

    .mesh-bg {
      position: fixed; inset: 0; z-index: -1;
      background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
      filter: blur(80px);
    }

    .glass-card {
      background: var(--card-glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--card-border);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    
    .chat-bubble-ai { border-radius: 20px 20px 20px 4px; background: rgba(30, 41, 59, 0.5); border: 1px solid var(--card-border); }
    .chat-bubble-user { border-radius: 20px 20px 4px 20px; background: linear-gradient(135deg, #4f46e5, #7c3aed); box-shadow: var(--accent-glow); }
    
    input, select, textarea { font-size: 16px !important; }
  `}</style>
);

// --- 📹 VIDEO RECORDER ---
const VideoRecorder = ({ onUpload }) => {
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  // Simplified logic for UI demo
  return (
    <div className="glass-card rounded-3xl p-1 overflow-hidden relative group">
      <div className="aspect-video bg-black/50 rounded-2xl flex items-center justify-center">
        {recording ? <div className="animate-pulse text-red-500">● REC</div> : <Icons.Camera className="w-8 h-8 text-slate-600"/>}
      </div>
      <button onClick={() => setRecording(!recording)} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-xs font-bold border border-white/10 active:scale-95 transition">
        {recording ? 'Стоп' : 'Записать визитку'}
      </button>
    </div>
  );
};

// --- 📊 RADAR CHART ---
const RadarChart = ({ data }) => {
    const size = 180, center = size/2, radius = 60;
    const safe = data || { method: 75, empathy: 80, boundaries: 70, ethics: 90 };
    const pts = [
      { x: center, y: center - radius * (safe.method/100) },
      { x: center + radius * (safe.empathy/100), y: center },
      { x: center, y: center + radius * (safe.boundaries/100) },
      { x: center - radius * (safe.ethics/100), y: center }
    ];
    const poly = pts.map((p, i) => `${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
    return (
      <div className="flex justify-center my-6">
        <svg width={size} height={size} className="overflow-visible drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]">
          <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <path d={poly} fill="rgba(99,102,241,0.3)" stroke="#6366f1" strokeWidth="3" strokeLinejoin="round"/>
        </svg>
      </div>
    );
};

export default function App() {
  const [screen, setScreen] = useState('hub');
  const [role, setRole] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [selectedModality, setSelectedModality] = useState('mpt');
  const [difficulty, setDifficulty] = useState(2); // 1=Easy, 2=Medium, 3=Hard
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [psychologists, setPsychologists] = useState([]);
  const [userProfile, setUserProfile] = useState({ name: '', experience: 0, price: 0, methods: '', photoUrl: null });
  const [gems, setGems] = useState(5);
  const [errorLog, setErrorLog] = useState(null);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id?.toString() || 'dev_platinum';

  const unlockAudio = () => {
    const s = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==");
    s.play().catch(()=>{});
  };

  useEffect(() => {
    if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#020617'); }
    if(localStorage.getItem('connectum_legal')) setScreen('hub');
  }, []);

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isTyping]);
  
  useEffect(() => {
    if(screen === 'aggregator') fetch('/api/aggregator').then(r=>r.json()).then(setPsychologists).catch(()=>{});
  }, [screen]);

  const handleSend = async (text = inputText, isInitial = false, action = 'chat', flow = null) => {
    if (isInitial) unlockAudio();
    if (!text && !isInitial) return;
    if (!isInitial && action === 'chat') setMessages(p => [...p, { role: 'user', content: text }]);
    setInputText(''); setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userId, message: text, modalityId: selectedModality, action, 
            selectedClientId, role, flow, difficulty,
            history: messages.filter(m => m.role !== 'hint').slice(-10) 
        })
      });
      const data = await res.json();
      if(action === 'get_hint') setMessages(p => [...p, { role: 'hint', content: data.hint }]);
      else if(data.content) {
          setMessages(p => [...p, { role: 'ai', content: data.content, voice: data.voice }]);
          if(data.voice) new Audio(`data:audio/mp3;base64,${data.voice}`).play().catch(()=>{});
      }
    } catch(e) { setErrorLog("Ошибка связи"); }
    setIsTyping(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setUserProfile({...userProfile, photoUrl: reader.result});
        reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    await fetch('/api/profile', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ userId, profile: userProfile })
    });
    setScreen('hub');
  };

  const requestWaitlist = async (tariff) => {
     await fetch('/api/waitlist', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userId, role, tariff}) });
     tg?.showPopup({ title: 'Заявка принята', message: 'Мы свяжемся с вами для оплаты.' });
  };
  
  const finishSession = async () => {
    if (!window.confirm("Завершить сессию?")) return;
    setIsTyping(true);
    try {
      const res = await fetch('/api/finish', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId, history: messages, modalityId: selectedModality, role })
      });
      const data = await res.json();
      setMessages(p => [...p, { role: 'report', data: data.analytics || data.data, cert: data.certificateUrl }]);
    } catch (e) { setErrorLog("Ошибка завершения."); }
    setIsTyping(false);
  };

  const acceptLegal = () => { localStorage.setItem('connectum_legal', 'true'); setScreen('hub'); };
  const currentClient = CLIENT_DATABASE.find(c => c.id === selectedClientId) || CLIENT_DATABASE[0];

  return (
    <div className="flex flex-col h-[100dvh] bg-[#020617] text-slate-100 font-sans text-left overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />

      {/* HEADER */}
      {screen !== 'hub' && screen !== 'legal' && (
        <header className="flex-shrink-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-5 z-50">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen('hub')} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center active:scale-90 transition"><Icons.ChevronLeft className="w-5 h-5 text-slate-400"/></button>
            <div className="flex flex-col"><span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Connectum</span><span className="text-[6px] font-bold text-slate-500 uppercase">Platinum v21.0</span></div>
          </div>
          <div className="flex items-center gap-1.5 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
            <span className="text-[10px] font-black text-indigo-300">{gems}/5</span>
            <Icons.Diamond className="w-3.5 h-3.5 text-indigo-400" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden relative z-10 flex flex-col">
        
        {/* 0. LEGAL */}
        {screen === 'legal' && (
           <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
              <div className="glass-card p-8 rounded-3xl max-w-sm">
                  <h2 className="text-xl font-black mb-4 text-white">Соглашение</h2>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">Нажимая кнопку, вы подтверждаете, что вам исполнилось 18 лет и вы даете согласие на обработку данных для улучшения качества ИИ-сервиса.</p>
                  <button onClick={acceptLegal} className="w-full py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl">Принять и войти</button>
              </div>
           </div>
        )}

        {/* 1. HUB */}
        {screen === 'hub' && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in duration-700">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[2rem] flex items-center justify-center shadow-2xl animate-pulse">
                <Icons.Infinity className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-1">
                <h1 className="text-3xl font-black text-white tracking-tighter">Connectum</h1>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.6em]">Эволюция Психологии</p>
            </div>
            <div className="w-full grid gap-4 max-w-sm">
                <button onClick={() => { unlockAudio(); setScreen('client_hub'); setRole('client'); }} className="btn-magnetic w-full p-6 glass-card rounded-[32px] flex items-center gap-5 active:scale-95 text-left relative group">
                    <div className="outlined-text">ДОВЕРИЕ</div>
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-2xl relative z-10">🤝</div>
                    <div className="relative z-10"><h3 className="text-lg font-black text-white uppercase">Я Клиент</h3><p className="text-[8px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Помощь • Диагностика</p></div>
                </button>
                <button onClick={() => { unlockAudio(); setScreen('setup'); setRole('psychologist'); }} className="btn-magnetic w-full p-6 glass-card rounded-[32px] flex items-center gap-5 active:scale-95 text-left relative group">
                    <div className="outlined-text">МАСТЕРСТВО</div>
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-2xl relative z-10">🧠</div>
                    <div className="relative z-10"><h3 className="text-lg font-black text-white uppercase">Я Психолог</h3><p className="text-[8px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Тренажер • Рост</p></div>
                </button>
            </div>
            {/* КНОПКИ КАНАЛ И ПОДДЕРЖКА */}
            <div className="flex justify-center gap-8 mt-auto pb-4 opacity-50">
                <a href="https://t.me/psy_connectum" target="_blank" className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition"><Icons.Send className="w-3 h-3"/> Канал</a>
                <a href="https://t.me/lazalex81" target="_blank" className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition"><Icons.User className="w-3 h-3"/> Поддержка</a>
            </div>
          </div>
        )}

        {/* 2. CLIENT HUB */}
        {screen === 'client_hub' && (
           <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar pb-24 text-left animate-in slide-in-from-left duration-500">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Клиентский Центр</h2>
              <div className="p-6 bg-gradient-to-br from-indigo-600/20 to-indigo-900/40 rounded-[32px] border border-indigo-500/30 flex justify-between items-center relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 opacity-10"><Icons.Diamond className="w-32 h-32"/></div>
                  <div className="relative z-10"><h4 className="text-xs font-black uppercase text-indigo-300 tracking-widest">Client Premium</h4><p className="text-[9px] font-bold text-indigo-100/60 mt-1">ИИ-терапия 24/7</p></div>
                  <div className="relative z-10 text-right"><span className="text-xl font-black">1990₽</span><button onClick={()=>requestWaitlist('client_premium')} className="block bg-indigo-600 text-[8px] font-black uppercase px-4 py-1.5 rounded-full mt-2 shadow-lg active:scale-95">Купить</button></div>
              </div>
              <div className="grid gap-3">
                  <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Начать диагностику", true, 'chat', 'diagnostics'); }} className="p-5 glass-card rounded-[28px] flex items-center gap-4 active:scale-95 text-left border-l-4 border-indigo-500"><div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-xl text-indigo-400">🔍</div><div><h4 className="text-sm font-black text-white uppercase">ИИ-Диагностика</h4><p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">Поиск корня проблемы</p></div></button>
                  <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Мне нужна помощь", true, 'chat', 'therapy'); }} className="p-5 glass-card rounded-[28px] flex items-center gap-4 active:scale-95 text-left border-l-4 border-emerald-500"><div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-xl text-emerald-400">✨</div><div><h4 className="text-sm font-black text-white uppercase">ИИ-Терапевт</h4><p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">Поддержка здесь и сейчас</p></div></button>
                  <button onClick={() => setScreen('aggregator')} className="p-5 glass-card rounded-[28px] flex items-center gap-4 active:scale-95 text-left border-l-4 border-purple-500"><div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-xl text-purple-400">👥</div><div><h4 className="text-sm font-black text-white uppercase">Витрина Мастеров</h4><p className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">Живой специалист</p></div></button>
              </div>
              <div className="text-center text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10">Пригласи друга = +3 💎</div>
           </div>
        )}

        {/* 3. SETUP (Psychologist) */}
        {screen === 'setup' && (
           <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar pb-24 text-left animate-in slide-in-from-right duration-500">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Мастерская</h2>
               
               <div className="flex gap-3">
                   <div onClick={()=>requestWaitlist('test_drive')} className="flex-1 p-4 glass-card rounded-[24px] border-l-4 border-orange-500 active:scale-95 transition"><h5 className="text-[8px] font-black uppercase text-orange-400">Тест-драйв</h5><p className="text-lg font-black mt-1">490₽</p></div>
                   <div onClick={()=>requestWaitlist('pro')} className="flex-1 p-4 bg-indigo-600/10 border border-white/5 rounded-[24px] border-l-4 border-indigo-600 active:scale-95 transition"><h5 className="text-[8px] font-black uppercase text-indigo-400">PRO Доступ</h5><p className="text-lg font-black mt-1">2990₽</p></div>
               </div>

               <div className="space-y-4">
                   <div className="space-y-1"><label className="text-[8px] font-black text-slate-600 uppercase ml-2">Сложность клиента</label>
                   <div className="flex gap-2">
                       {[1, 2, 3].map(lvl => (
                           <button key={lvl} onClick={() => setDifficulty(lvl)} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${difficulty === lvl ? (lvl===1?'bg-emerald-600':lvl===2?'bg-blue-600':'bg-red-600') : 'bg-white/5 text-slate-500 border border-white/5'}`}>{lvl===1?'Легкий':lvl===2?'Средний':'Трудный'}</button>
                       ))}
                   </div></div>
                   
                   <div className="grid gap-3">
                       <div className="space-y-1"><label className="text-[8px] font-black text-slate-600 uppercase ml-2">Школа</label><select value={selectedModality} onChange={(e) => setSelectedModality(e.target.value)} className="w-full p-4 glass-card rounded-2xl text-xs font-bold text-white outline-none appearance-none">{Object.keys(MODALITIES).map(k => <option key={k} value={k} className="bg-slate-900">{MODALITIES[k].name}</option>)}</select></div>
                       <div className="space-y-1"><label className="text-[8px] font-black text-slate-600 uppercase ml-2">Клиент</label><select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="w-full p-4 glass-card rounded-2xl text-xs font-bold text-white outline-none appearance-none">{CLIENT_DATABASE.map(c => <option key={c.id} value={c.id} className="bg-slate-900">{c.name} ({c.profession})</option>)}</select></div>
                   </div>

                   <div className="glass-card rounded-[32px] p-6 relative overflow-hidden">
                       <div className="flex items-center gap-4 mb-4">
                           <span className="text-4xl">{currentClient.avatar}</span>
                           <div><h4 className="text-lg font-black text-white leading-none">{currentClient.name}, {currentClient.age}</h4><p className="text-[8px] font-black uppercase text-indigo-400 mt-1">{currentClient.status} • {currentClient.familyStatus}</p></div>
                       </div>
                       <p className="text-[12px] text-slate-300 italic leading-snug border-l-2 border-indigo-500/30 pl-3">"{currentClient.bio}"</p>
                   </div>
                   
                   <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Здравствуйте", true); }} className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-xl active:scale-95 text-white transition-all">НАЧАТЬ СЕССИЮ</button>
               </div>
           </div>
        )}

        {/* 4. CHAT */}
        {screen === 'chat' && (
           <div className="flex-1 flex flex-col relative">
               <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar pb-32">
                   {messages.map((m, i) => (
                       <div key={i} className={`flex flex-col ${m.role==='user'?'items-end':'items-start'} animate-in slide-in-from-bottom duration-300`}>
                           {m.role === 'hint' ? (
                               <div className="bg-orange-600/10 border border-orange-500/20 p-4 rounded-[20px] flex gap-3 max-w-[90%]"><div className="text-xl">🎓</div><div><h5 className="text-[8px] font-black uppercase text-orange-400 mb-1">Супервизор</h5><p className="text-xs text-orange-50/90 italic">"{m.content}"</p></div></div>
                           ) : m.role === 'report' ? (
                               <div className="bg-slate-900/90 border border-indigo-500/30 p-8 rounded-[32px] text-center"><Icons.Trophy className="w-12 h-12 text-indigo-400 mx-auto mb-4"/><h3 className="text-sm font-black uppercase tracking-widest text-indigo-300 mb-6">Аудит</h3>{role === 'psychologist' && <RadarChart data={m.data} />}<p className="text-xs italic text-slate-300 mb-6">"{m.data?.expert_comment || m.data?.insight}"</p><button onClick={()=>setScreen('hub')} className="w-full py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase">В меню</button></div>
                           ) : (
                               <div className={`max-w-[85%] p-3.5 text-[14px] leading-snug text-white ${m.role==='user'?'bg-indigo-600 rounded-[20px_20px_4px_20px]':'bg-slate-800 rounded-[20px_20px_20px_4px] border border-white/5'}`} dangerouslySetInnerHTML={{__html: marked.parse(m.content||"")}}/>
                           )}
                       </div>
                   ))}
                   {isTyping && <div className="flex gap-2 p-3 bg-slate-800 rounded-2xl w-fit animate-pulse"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"/><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-75"/></div>}
                   <div ref={chatEndRef} />
               </div>
               <footer className="absolute bottom-0 w-full p-4 bg-slate-950/90 backdrop-blur-xl border-t border-white/5 z-50">
                   <div className="flex gap-2 mb-3">
                       {role === 'psychologist' && <button onClick={() => handleSend("Дай совет", false, 'get_hint')} className="flex-1 py-3 bg-orange-600/10 border border-orange-500/20 rounded-xl text-[9px] font-black uppercase text-orange-400 active:scale-95">💡 Подсказка</button>}
                       <button onClick={() => { if(confirm("Завершить?")) handleSend("Стоп", false, 'finish'); }} className="flex-1 py-3 bg-emerald-600/10 border border-emerald-500/20 rounded-xl text-[9px] font-black uppercase text-emerald-400 active:scale-95">🏁 Финиш</button>
                   </div>
                   <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-[24px] p-1.5">
                       <textarea value={inputText} onChange={e=>setInputText(e.target.value)} rows={1} className="flex-1 bg-transparent border-none outline-none text-sm px-3 text-white placeholder:text-slate-600 resize-none" placeholder="Сообщение..." />
                       <button onClick={()=>handleSend()} className="w-10 h-10 bg-indigo-600 rounded-[18px] flex items-center justify-center active:scale-90 transition"><Icons.Send className="w-5 h-5 text-white"/></button>
                   </div>
               </footer>
           </div>
        )}

        {/* 5. AGGREGATOR */}
        {screen === 'aggregator' && (
           <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar pb-24 text-left animate-in slide-in-from-right">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Мастера</h2>
               {psychologists.map((p, i) => (
                   <div key={i} className={`p-5 rounded-[32px] border bg-slate-900/60 backdrop-blur-xl ${p.isVip ? 'border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.1)]' : 'border-white/5'}`}>
                       <div className="flex gap-4 items-start">
                           <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl overflow-hidden relative">{p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover"/> : (p.avatar || '👤')}</div>
                           <div className="flex-1">
                               <h4 className="text-lg font-black text-white leading-none">{p.name}</h4>
                               <div className="flex gap-2 mt-2"><span className="text-[8px] font-bold uppercase bg-white/5 px-2 py-0.5 rounded text-slate-400">Стаж {p.experience}</span><span className="text-[8px] font-black uppercase bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded">Top {p.skillRating}%</span></div>
                           </div>
                       </div>
                       <div className="mt-5 flex justify-between items-center border-t border-white/5 pt-4">
                           <div><span className="text-[8px] font-black text-slate-500 uppercase">Сессия</span><p className="text-xl font-black text-white leading-none">{p.price}₽</p></div>
                           <button className="bg-indigo-600 px-6 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white shadow-lg">Записаться</button>
                       </div>
                   </div>
               ))}
           </div>
        )}

        {/* 6. PROFILE */}
        {screen === 'profile' && (
           <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar pb-24 text-left animate-in slide-in-from-bottom">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Личный кабинет</h2>
               <div className="space-y-4">
                   <div className="flex gap-4">
                       <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border-2 border-dashed border-white/10 cursor-pointer overflow-hidden relative" onClick={()=>fileInputRef.current.click()}>
                           {userProfile.photoUrl ? <img src={userProfile.photoUrl} className="w-full h-full object-cover"/> : <Icons.Camera className="w-8 h-8 text-slate-600"/>}
                           <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={(e)=>{const f=e.target.files[0]; if(f){const r=new FileReader(); r.onload=()=>setUserProfile({...userProfile, photoUrl:r.result}); r.readAsDataURL(f);}}}/>
                       </div>
                       <div className="flex-1 space-y-2 pt-2">
                           <button className="w-full py-3 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase text-slate-400">Заполнить анкету (+3 💎)</button>
                           <button className="w-full py-3 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-[9px] font-black uppercase text-indigo-400">Пригласить коллегу</button>
                       </div>
                   </div>
                   <button className="w-full py-4 bg-slate-800 rounded-2xl text-[10px] font-black uppercase border border-white/5 text-slate-300">📹 Записать видео-визитку</button>
                   
                   <div className="space-y-4 pt-4 border-t border-white/5">
                       <div className="space-y-1"><label className="text-[8px] font-black text-slate-500 uppercase ml-2">Имя</label><input type="text" className="w-full p-4 bg-slate-900/50 rounded-2xl text-sm font-bold text-white border border-white/10 outline-none focus:border-indigo-500 transition" value={userProfile.name} onChange={e=>setUserProfile({...userProfile, name:e.target.value})}/></div>
                       <div className="flex gap-3">
                           <div className="space-y-1 flex-1"><label className="text-[8px] font-black text-slate-500 uppercase ml-2">Стаж</label><input type="number" className="w-full p-4 bg-slate-900/50 rounded-2xl text-sm font-bold text-white border border-white/10" value={userProfile.experience} onChange={e=>setUserProfile({...userProfile, experience:e.target.value})}/></div>
                           <div className="space-y-1 flex-1"><label className="text-[8px] font-black text-slate-500 uppercase ml-2">Цена</label><input type="number" className="w-full p-4 bg-slate-900/50 rounded-2xl text-sm font-bold text-white border border-white/10" value={userProfile.price} onChange={e=>setUserProfile({...userProfile, price:e.target.value})}/></div>
                       </div>
                   </div>
                   <button onClick={()=>{fetch('/api/profile', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userId, profile:userProfile})}); setScreen('hub');}} className="w-full py-5 bg-indigo-600 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-white shadow-xl mt-4">Сохранить изменения</button>
               </div>
           </div>
        )}

      </main>

      {/* FOOTER NAVIGATION */}
      {(screen !== 'chat' && screen !== 'legal') && (
        <nav className="h-20 bg-slate-950/90 backdrop-blur-xl border-t border-white/5 flex justify-around items-center px-2 z-50">
            {[
                {id: 'hub', icon: Icons.Infinity, label: 'Главная'},
                {id: 'setup', icon: Icons.Sparkles, label: 'Мастерская'},
                {id: 'aggregator', icon: Icons.Search, label: 'Мастера'},
                {id: 'profile', icon: Icons.User, label: 'Профиль'}
            ].map(item => (
                <button key={item.id} onClick={()=>setScreen(item.id)} className={`flex flex-col items-center gap-1 w-16 transition-all ${screen===item.id ? 'text-indigo-400 scale-110' : 'text-slate-600'}`}>
                    <item.icon className="w-6 h-6"/>
                    <span className="text-[8px] font-black uppercase tracking-wider">{item.label}</span>
                </button>
            ))}
        </nav>
      )}

    </div>
  );
}
