import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

/**
 * CONNECTUM PRO v21.7 - ULTIMATE PLATINUM MONOLITH
 * ========================================================
 * 🎨 DESIGN: "AI Studio" Premium Style (Deep Slate, Neon Glow).
 * 🧠 LOGIC: 30 Clients Database, Difficulty Matrix, Hybrid AI Sync.
 * 🎙️ AUDIO: Native Audio Dialog Support (Auto-play base64).
 * 📱 UX: Haptics, No-Zoom Fix, 100dvh, Responsive Mesh BG.
 */

// --- 1. ICONS SYSTEM (INTERNAL SVG - NO EXTERNAL DEPS) ---
const Icons = {
  InfinityIcon: ({ className }) => (
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
    </svg>
  ),
  ChevronLeft: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
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
  Play: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
  )
};

// --- 2. FULL CLIENT DATABASE (30 ITEMS) ---
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
    { id: "c14", name: "Павел", age: 22, profession: "Курьер", familyStatus: "Живет с родителями", status: "Низкий", avatar: "👱🏻", bio: "Зависимость от мнения родителей. Не может принять решение." },
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

// --- 3. STYLES (AI STUDIO THEME) ---
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

    .btn-magnetic {
      background: linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.01) 100%);
      background-size: 200% 100%;
      animation: shimmer 6s infinite linear;
      position: relative; overflow: hidden; 
      border: 1px solid var(--card-border);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .btn-magnetic:active { transform: scale(0.96); }
    
    .outlined-text {
      position: absolute; bottom: -4px; right: 10px;
      font-size: clamp(1.5rem, 6vw, 2.5rem); 
      font-weight: 900;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.08);
      pointer-events: none;
      text-transform: uppercase;
      line-height: 1;
      letter-spacing: 0.05em;
      z-index: 0;
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

// --- 📊 COMPONENTS ---

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
          <path d={poly} fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" strokeWidth="3" strokeLinejoin="round"/>
        </svg>
      </div>
    );
};

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
      };
      mediaRecorder.current.start();
      setRecording(true);
    } catch (e) { alert("Камера недоступна"); }
  };

  return (
    <div className="glass-card rounded-3xl p-1 overflow-hidden relative group">
      <div className="aspect-video bg-black/50 rounded-2xl flex items-center justify-center">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover rounded-2xl" />
        {!recording && <div className="absolute inset-0 flex items-center justify-center"><Icons.Camera className="w-8 h-8 text-white/30"/></div>}
        {recording && <div className="absolute top-4 right-4 flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/> <span className="text-[10px] font-bold text-white uppercase">REC</span></div>}
      </div>
      <button onClick={() => recording ? mediaRecorder.current.stop() : startStream()} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-xs font-bold border border-white/10 active:scale-95 transition">
        {recording ? 'Остановить' : 'Записать визитку'}
      </button>
    </div>
  );
};

// --- 🚀 MAIN APP MONOLITH ---

export default function App() {
  const [screen, setScreen] = useState('loading');
  const [role, setRole] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [selectedModality, setSelectedModality] = useState('mpt');
  const [difficulty, setDifficulty] = useState(2); 
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
    setTimeout(() => {
      setScreen(localStorage.getItem('connectum_legal') ? 'hub' : 'legal');
    }, 1500);
  }, []);

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isTyping]);
  
  useEffect(() => {
    if(screen === 'aggregator') {
      fetch('/api/aggregator').then(r=>r.json()).then(setPsychologists).catch(()=>{});
    }
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
          if(data.voice) {
            const audio = new Audio(`data:audio/mp3;base64,${data.voice}`);
            audio.play().catch(e => console.error("Audio play failed", e));
          }
      }
    } catch(e) { setErrorLog("Ошибка связи"); }
    setIsTyping(false);
  };

  const acceptLegal = () => { localStorage.setItem('connectum_legal', 'true'); setScreen('hub'); };
  const currentClient = CLIENT_DATABASE.find(c => c.id === selectedClientId) || CLIENT_DATABASE[0];

  const requestWaitlist = async (tariff) => {
     await fetch('/api/waitlist', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userId, role, tariff}) });
     tg?.showPopup({ title: 'Заявка принята', message: 'Мы свяжемся с вами в Telegram для активации доступа.' });
  };

  if (screen === 'loading') return (
    <div className="h-[100dvh] flex flex-col items-center justify-center bg-[#020617]">
      <GlobalStyles />
      <div className="mesh-bg" />
      <Icons.InfinityIcon className="w-12 h-12 text-indigo-500 animate-pulse" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mt-6 animate-pulse">Connectum Intelligence</span>
    </div>
  );

  return (
    <div className="flex flex-col h-[100dvh] bg-[#020617] text-slate-100 font-sans text-left overflow-hidden">
      <GlobalStyles />
      <div className="mesh-bg" />

      {/* HEADER */}
      {screen !== 'hub' && screen !== 'legal' && (
        <header className="flex-shrink-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-5 z-50">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen('hub')} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center active:scale-90 transition"><Icons.ChevronLeft className="w-5 h-5 text-slate-400"/></button>
            <div className="flex flex-col"><span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">Connectum</span><span className="text-[6px] font-bold text-slate-500 uppercase mt-1">Platinum v21.7</span></div>
          </div>
          <div className="flex items-center gap-1.5 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <span className="text-[10px] font-black text-indigo-300 tracking-tighter">{gems}/5</span>
            <Icons.Diamond className="w-3.5 h-3.5 text-indigo-400" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden relative z-10 flex flex-col">
        
        {/* 0. LEGAL SCREEN */}
        {screen === 'legal' && (
           <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
              <div className="glass-card p-8 rounded-[2.5rem] max-w-sm border-t border-white/10 shadow-2xl">
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6"><Icons.User className="w-8 h-8 text-indigo-400"/></div>
                  <h2 className="text-xl font-black mb-4 text-white">Соглашение</h2>
                  <p className="text-xs text-slate-400 mb-8 leading-relaxed font-medium">Подтверждаю, что мне исполнилось 18 лет и я принимаю условия обработки данных для обучения ИИ-моделей.</p>
                  <button onClick={acceptLegal} className="w-full py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-500/20 active:scale-95 transition">Принять и войти</button>
              </div>
           </div>
        )}

        {/* 1. HUB SCREEN */}
        {screen === 'hub' && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col items-center gap-5">
               <div className="relative">
                 <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse"></div>
                 <Icons.InfinityIcon className="w-14 h-14 text-white relative z-10" />
               </div>
               <div className="space-y-1">
                 <h1 className="text-3xl font-black text-white tracking-tighter">Connectum</h1>
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.5em]">Эволюция Психологии</p>
               </div>
            </div>
            
            <div className="w-full grid gap-4 max-w-sm">
                <button onClick={() => { unlockAudio(); setScreen('client_hub'); setRole('client'); }} className="btn-magnetic w-full p-8 glass-card rounded-[2.5rem] flex items-center gap-6 active:scale-95 text-left relative group overflow-hidden">
                    <div className="outlined-text">ДОВЕРИЕ</div>
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-3xl relative z-10 shadow-inner">🤝</div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-black text-white uppercase leading-tight">Я Клиент</h3>
                      <p className="text-[8px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Помощь • Диагностика</p>
                    </div>
                </button>
                
                <button onClick={() => { unlockAudio(); setScreen('setup'); setRole('psychologist'); }} className="btn-magnetic w-full p-8 glass-card rounded-[2.5rem] flex items-center gap-6 active:scale-95 text-left relative group overflow-hidden">
                    <div className="outlined-text">МАСТЕРСТВО</div>
                    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-3xl relative z-10 shadow-inner">🧠</div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-black text-white uppercase leading-tight">Я Психолог</h3>
                      <p className="text-[8px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Тренажер • Рост</p>
                    </div>
                </button>
            </div>
            
            <div className="flex justify-center gap-10 mt-auto pb-4 opacity-40 hover:opacity-100 transition-opacity">
                <a href="https://t.me/psy_connectum" target="_blank" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition"><Icons.Telegram className="w-3.5 h-3.5"/> Канал</a>
                <a href="https://t.me/lazalex81" target="_blank" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition"><Icons.User className="w-3.5 h-3.5"/> Поддержка</a>
            </div>
          </div>
        )}

        {/* 2. CLIENT HUB (B2C) */}
        {screen === 'client_hub' && (
           <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-24 text-left animate-in slide-in-from-left duration-500">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Клиентский Хаб</h2>
              
              <div className="p-7 bg-gradient-to-br from-indigo-600/20 to-indigo-900/40 rounded-[2.5rem] border border-indigo-500/20 flex justify-between items-center relative overflow-hidden group active:scale-[0.98] transition">
                  <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform"><Icons.Diamond className="w-40 h-40"/></div>
                  <div className="relative z-10"><h4 className="text-xs font-black uppercase text-indigo-300 tracking-widest">Client Premium</h4><p className="text-[9px] font-bold text-indigo-100/60 mt-1 uppercase tracking-tight">ИИ-терапия 24/7 • План</p></div>
                  <div className="relative z-10 text-right"><span className="text-2xl font-black text-white">1990₽</span><button onClick={()=>requestWaitlist('client_premium')} className="block bg-indigo-600 hover:bg-indigo-500 text-[8px] font-black uppercase px-6 py-2 rounded-full mt-2 shadow-xl active:scale-90 transition">Оформить</button></div>
              </div>

              <div className="grid gap-3">
                  {[
                    {id: 'diagnostics', icon: "🔍", title: "ИИ-Диагностика", sub: "Найти корень проблемы", color: "indigo", msg: "Начать диагностику"},
                    {id: 'therapy', icon: "✨", title: "ИИ-Терапевт", sub: "Поддержка здесь и сейчас", color: "emerald", msg: "Мне нужна помощь"},
                    {id: 'aggregator', icon: "👥", title: "Витрина Мастеров", sub: "Живой специалист", color: "purple", msg: null}
                  ].map(btn => (
                    <button key={btn.id} onClick={() => { if(btn.id==='aggregator') setScreen('aggregator'); else { setScreen('chat'); setMessages([]); handleSend(btn.msg, true, 'chat', btn.id); }}} className={`p-6 glass-card rounded-[2rem] flex items-center gap-5 active:scale-95 text-left border-l-4 border-${btn.color}-500 group transition`}>
                        <div className={`w-12 h-12 bg-${btn.color}-500/10 rounded-2xl flex items-center justify-center text-2xl text-${btn.color}-400 group-hover:scale-110 transition`}>{btn.icon}</div>
                        <div><h4 className="text-sm font-black text-white uppercase tracking-tight">{btn.title}</h4><p className="text-[9px] font-bold text-slate-500 uppercase mt-0.5">{btn.sub}</p></div>
                    </button>
                  ))}
              </div>
              
              <div className="text-center text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10 shadow-lg">Пригласи друга = +3 💎 к балансу</div>
           </div>
        )}

        {/* 3. SETUP SCREEN (Psychologist) */}
        {screen === 'setup' && (
           <div className="flex-1 overflow-y-auto p-6 space-y-7 no-scrollbar pb-24 text-left animate-in slide-in-from-right duration-500">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Мастерская</h2>
               
               <div className="flex gap-4">
                   <div onClick={()=>requestWaitlist('test_drive')} className="flex-1 p-5 glass-card rounded-[2rem] border-l-4 border-orange-500 active:scale-95 transition cursor-pointer"><h5 className="text-[9px] font-black uppercase text-orange-400 tracking-widest leading-none">Тест-драйв</h5><p className="text-xl font-black mt-2">490₽</p></div>
                   <div onClick={()=>requestWaitlist('pro')} className="flex-1 p-5 bg-indigo-600/10 border border-white/5 rounded-[2rem] border-l-4 border-indigo-600 active:scale-95 transition cursor-pointer"><h5 className="text-[9px] font-black uppercase text-indigo-400 tracking-widest leading-none">PRO Доступ</h5><p className="text-xl font-black mt-2">2990₽</p></div>
               </div>

               <div className="space-y-5">
                   <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-600 uppercase ml-3 tracking-[0.2em]">Сложность сессии</label>
                     <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
                        {[1, 2, 3].map(lvl => (
                            <button key={lvl} onClick={() => setDifficulty(lvl)} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase transition-all duration-300 ${difficulty === lvl ? (lvl===1?'bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]':lvl===2?'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]':'bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.3)]') : 'text-slate-500 hover:text-slate-300'}`}>{lvl===1?'Легкий':lvl===2?'Средний':'Трудный'}</button>
                        ))}
                     </div>
                   </div>
                   
                   <div className="grid gap-4">
                       <div className="space-y-1"><label className="text-[9px] font-black text-slate-600 uppercase ml-3 tracking-widest">Модальность</label><select value={selectedModality} onChange={(e) => setSelectedModality(e.target.value)} className="w-full p-5 glass-card rounded-[1.5rem] text-xs font-bold text-white outline-none appearance-none cursor-pointer focus:border-indigo-500 transition shadow-xl">{Object.keys(MODALITIES).map(k => <option key={k} value={k} className="bg-slate-950">{MODALITIES[k].name}</option>)}</select></div>
                       <div className="space-y-1"><label className="text-[9px] font-black text-slate-600 uppercase ml-3 tracking-widest">Кейс клиента</label><select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="w-full p-5 glass-card rounded-[1.5rem] text-xs font-bold text-white outline-none appearance-none cursor-pointer focus:border-indigo-500 transition shadow-xl">{CLIENT_DATABASE.map(c => <option key={c.id} value={c.id} className="bg-slate-950">{c.name} ({c.profession})</option>)}</select></div>
                   </div>

                   <div className="glass-card rounded-[2.5rem] p-7 relative overflow-hidden shadow-2xl border-t border-white/10">
                       <div className="flex items-center gap-5 mb-5">
                           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl shadow-inner">{currentClient.avatar}</div>
                           <div><h4 className="text-xl font-black text-white leading-none tracking-tight">{currentClient.name}, {currentClient.age}</h4><p className="text-[9px] font-black uppercase text-indigo-400 mt-1.5 opacity-80">{currentClient.status} • {currentClient.familyStatus}</p></div>
                       </div>
                       <div className="text-[13px] text-slate-300 italic leading-relaxed border-l-2 border-indigo-500/40 pl-4 py-1">"{currentClient.bio}"</div>
                   </div>
                   
                   <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Здравствуйте", true); }} className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 py-6 rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.3em] shadow-2xl shadow-indigo-500/20 active:scale-95 text-white transition-all transform">НАЧАТЬ СЕССИЮ</button>
               </div>
           </div>
        )}

        {/* 4. CHAT SCREEN */}
        {screen === 'chat' && (
           <div className="flex-1 flex flex-col relative h-full">
               <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar pb-40">
                   {messages.map((m, i) => (
                       <div key={i} className={`flex flex-col ${m.role==='user'?'items-end':'items-start'} animate-in slide-in-from-bottom duration-400`}>
                           {m.role === 'hint' ? (
                               <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-[24px] flex gap-4 max-w-[90%] backdrop-blur-md shadow-xl border-l-4 border-l-orange-500">
                                 <div className="text-2xl">🎓</div>
                                 <div><h5 className="text-[9px] font-black uppercase text-orange-400 mb-1 tracking-widest leading-none">ИИ-Супервизор</h5><p className="text-[13px] text-orange-50/90 font-medium leading-relaxed italic">"{m.content}"</p></div>
                               </div>
                           ) : m.role === 'report' ? (
                               <div className="w-full bg-slate-900/90 border border-indigo-500/30 p-8 rounded-[3rem] text-center shadow-2xl border-t-indigo-500/50">
                                  <Icons.Trophy className="w-14 h-14 text-indigo-400 mx-auto mb-5 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"/>
                                  <h3 className="text-md font-black uppercase tracking-[0.3em] text-indigo-300 mb-6">Аудит Мастерства</h3>
                                  {role === 'psychologist' && <RadarChart data={m.data} />}
                                  <div className="bg-white/5 p-5 rounded-2xl text-left border border-white/5 mb-8"><p className="text-[13px] italic text-slate-300 leading-relaxed">"{m.data?.expert_comment || m.data?.insight}"</p></div>
                                  <button onClick={()=>setScreen('hub')} className="w-full py-5 bg-indigo-600 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest shadow-xl">Вернуться в Хаб</button>
                               </div>
                           ) : (
                               <div className={`max-w-[88%] p-4 text-[15px] leading-relaxed font-medium shadow-xl ${m.role==='user'?'bg-indigo-600 text-white rounded-[24px_24px_4px_24px]':'bg-slate-800/80 backdrop-blur-sm border border-white/5 text-slate-50 rounded-[24px_24px_24px_4px]'}`} dangerouslySetInnerHTML={{__html: marked.parse(m.content||"")}}/>
                           )}
                       </div>
                   ))}
                   {isTyping && <div className="flex gap-2 p-4 bg-slate-800/50 rounded-[24px] w-fit animate-pulse border border-white/5"><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"/><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"/><div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"/></div>}
                   <div ref={chatEndRef} />
               </div>
               
               <footer className="absolute bottom-0 w-full p-5 bg-slate-950/90 backdrop-blur-2xl border-t border-white/5 z-50">
                   <div className="flex gap-3 mb-4">
                       {role === 'psychologist' && <button onClick={() => handleSend("Дай совет по методике", false, 'get_hint')} className="flex-1 py-4 bg-orange-600/15 border border-orange-500/20 rounded-2xl text-[10px] font-black uppercase text-orange-400 active:scale-95 transition shadow-lg flex items-center justify-center gap-2 tracking-widest"><Icons.Sparkles className="w-3.5 h-3.5"/> Помощь</button>}
                       <button onClick={() => { if(confirm("Завершить тренировку?")) handleSend("Завершить", false, 'finish'); }} className="flex-1 py-4 bg-emerald-600/15 border border-emerald-500/20 rounded-2xl text-[10px] font-black uppercase text-emerald-400 active:scale-95 transition shadow-lg tracking-widest">🏁 Финиш</button>
                   </div>
                   <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-[2rem] p-2 pr-2.5 transition-all focus-within:ring-2 ring-indigo-500/30">
                       <textarea value={inputText} onChange={e=>setInputText(e.target.value)} rows={1} className="flex-1 bg-transparent border-none outline-none text-[15px] px-4 py-2 text-white placeholder:text-slate-600 resize-none font-medium no-scrollbar" placeholder="Ваша интервенция..." onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}} />
                       <button onClick={()=>handleSend()} className="w-11 h-11 bg-indigo-600 rounded-[1.2rem] flex items-center justify-center active:scale-90 transition shadow-xl shadow-indigo-600/20"><Icons.Send className="w-5 h-5 text-white"/></button>
                   </div>
               </footer>
           </div>
        )}

        {/* 5. AGGREGATOR (Marketplace) */}
        {screen === 'aggregator' && (
           <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-32 text-left animate-in slide-in-from-right">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Витрина Мастеров</h2>
               <div className="grid gap-5">
                   {psychologists.length === 0 ? <div className="text-slate-500 italic text-sm text-center py-20">Поиск специалистов...</div> : psychologists.map((p, i) => (
                       <div key={i} className={`p-6 rounded-[2.5rem] border bg-slate-900/60 backdrop-blur-xl ${p.isVip ? 'border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.15)]' : 'border-white/5'}`}>
                           <div className="flex gap-5 items-start">
                               <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center text-4xl overflow-hidden relative shadow-inner border border-white/5">{p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover"/> : (p.avatar || '👤')}</div>
                               <div className="flex-1">
                                   <h4 className="text-xl font-black text-white leading-tight tracking-tight">{p.name}</h4>
                                   <div className="flex gap-2 mt-2.5">
                                      <span className="text-[9px] font-black uppercase bg-white/5 px-2.5 py-1 rounded-lg text-slate-400 tracking-widest border border-white/5">Стаж {p.experience} лет</span>
                                      <span className="text-[9px] font-black uppercase bg-indigo-500/15 text-indigo-300 px-2.5 py-1 rounded-lg tracking-widest border border-indigo-500/20">IQ: {p.skillRating || 70}%</span>
                                   </div>
                               </div>
                           </div>
                           <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-5">
                               <div><span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Консультация</span><p className="text-2xl font-black text-white leading-none mt-1">{p.price}₽</p></div>
                               <button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl active:scale-95 transition">Записаться</button>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
        )}

        {/* 6. PROFILE SCREEN */}
        {screen === 'profile' && (
           <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-32 text-left animate-in slide-in-from-bottom">
               <div className="flex justify-between items-end px-1">
                 <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Мой Профиль</h2>
                 <span className="text-[8px] font-black uppercase text-slate-500 tracking-[0.3em]">Status: Master</span>
               </div>
               
               <div className="space-y-6">
                   <div className="flex gap-6 items-center">
                       <div className="w-28 h-28 bg-white/5 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-white/10 cursor-pointer overflow-hidden relative shadow-2xl group transition" onClick={()=>fileInputRef.current.click()}>
                           {userProfile.photoUrl ? <img src={userProfile.photoUrl} className="w-full h-full object-cover"/> : <Icons.Camera className="w-10 h-10 text-slate-600 group-hover:text-indigo-400 transition-colors"/>}
                           <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload}/>
                           <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="text-[8px] font-black text-white uppercase tracking-widest">Обновить</span></div>
                       </div>
                       <div className="flex-1 space-y-3">
                           <button className="w-full py-4 bg-emerald-900/10 border border-emerald-500/20 rounded-2xl text-[10px] font-black uppercase text-emerald-400 hover:bg-emerald-500/10 transition shadow-lg shadow-emerald-500/5">Анкета = +3 💎</button>
                           <button className="w-full py-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-[10px] font-black uppercase text-indigo-300 hover:bg-indigo-500/10 transition shadow-lg shadow-indigo-500/5">Пригласить коллегу</button>
                       </div>
                   </div>
                   
                   <VideoRecorder onUpload={(url)=>setUserProfile({...userProfile, videoUrl: url})}/>
                   
                   <div className="space-y-5 pt-4 border-t border-white/5">
                       <div className="space-y-2"><label className="text-[9px] font-black text-slate-500 uppercase ml-4 tracking-[0.2em]">Публичное Имя</label><input type="text" className="w-full p-5 glass-card rounded-[1.5rem] text-[15px] font-bold text-white border border-white/5 outline-none focus:border-indigo-500 transition shadow-xl" value={userProfile.name} onChange={e=>setUserProfile({...userProfile, name:e.target.value})}/></div>
                       <div className="flex gap-4">
                           <div className="space-y-2 flex-1"><label className="text-[9px] font-black text-slate-500 uppercase ml-4 tracking-[0.2em]">Стаж (лет)</label><input type="number" className="w-full p-5 glass-card rounded-[1.5rem] text-[15px] font-bold text-white border border-white/5" value={userProfile.experience} onChange={e=>setUserProfile({...userProfile, experience:e.target.value})}/></div>
                           <div className="space-y-2 flex-1"><label className="text-[9px] font-black text-slate-500 uppercase ml-4 tracking-[0.2em]">Цена (₽)</label><input type="number" className="w-full p-5 glass-card rounded-[1.5rem] text-[15px] font-bold text-white border border-white/5" value={userProfile.price} onChange={e=>setUserProfile({...userProfile, price:e.target.value})}/></div>
                       </div>
                   </div>
                   
                   <button onClick={saveProfile} className="w-full py-6 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.4em] text-white shadow-2xl shadow-indigo-500/30 active:scale-95 transition-all mt-6 transform hover:-translate-y-1">Сохранить систему</button>
               </div>
           </div>
        )}

      </main>

      {/* 🧭 FOOTER NAVIGATION SYSTEM */}
      {(screen !== 'chat' && screen !== 'legal' && screen !== 'loading') && (
        <nav className="h-[90px] bg-slate-950/90 backdrop-blur-3xl border-t border-white/5 flex justify-around items-center px-4 pb-6 z-50">
            {[
                {id: 'hub', icon: Icons.InfinityIcon, label: 'Главная'},
                {id: 'setup', icon: Icons.Sparkles, label: 'Мастерская'},
                {id: 'aggregator', icon: Icons.Search, label: 'Мастера'},
                {id: 'profile', icon: Icons.User, label: 'Профиль'}
            ].map(item => (
                <button key={item.id} onClick={()=>setScreen(item.id)} className={`flex flex-col items-center gap-2 w-16 transition-all duration-300 ${screen===item.id ? 'text-indigo-400 -translate-y-1' : 'text-slate-600 hover:text-slate-400'}`}>
                    <item.icon className={`w-6 h-6 ${screen===item.id ? 'drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]' : ''}`}/>
                    <span className={`text-[8px] font-black uppercase tracking-widest transition-opacity ${screen===item.id ? 'opacity-100' : 'opacity-60'}`}>{item.label}</span>
                    {screen===item.id && <div className="w-1 h-1 bg-indigo-500 rounded-full animate-ping"/>}
                </button>
            ))}
        </nav>
      )}

    </div>
  );
}
