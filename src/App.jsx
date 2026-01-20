import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

/**
 * CONNECTUM PRO v21.26 - PLATINUM MOBILE EVOLUTION (YANDEX EDITION)
 * ========================================================
 * 🎨 DESIGN: "Premium AI Studio" (Deep Slate, Glass, Neon).
 * 🧠 AI CORE: YandexGPT Pro (REST Assistant Ready).
 * 📱 UX: Компактный дизайн, Segmented Control, 30 Клиентов.
 * 🔐 SECURITY: Проверка подписки на канал.
 * 💎 ECONOMY: Diamonds Online Sync (1 Session = 1 💎).
 */

// --- 1. ПРЕМИАЛЬНАЯ СИСТЕМА ИКОНОК ---
const Icons = {
  Infinity: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="infGradMaster" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <path d="M7 9C4.5 9 2.5 10.34 2.5 12C2.5 13.66 4.5 15 7 15C8.5 15 9.8 14.1 11 13L13 11C14.2 9.9 15.5 9 17 9C19.5 9 21.5 10.34 21.5 12C21.5 13.66 19.5 15 17 15C15.5 15 14.2 14.1 13 13L11 11C9.8 9.9 8.5 9 7 9Z" stroke="url(#infGradMaster)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Search: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  User: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z"/></svg>
  ),
  Diamond: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="#c084fc" /></linearGradient></defs>
      <path d="M6 4h12l4 5-10 11L2 9l4-5Z" fill="url(#dg)" fillOpacity="0.2" stroke="url(#dg)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 4l1 5 1-5M2 9h20M7 4l5 5 5-5M12 20V9" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
    </svg>
  ),
  ChevronLeft: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
  Send: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  Telegram: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5M9 13.5V19L12 15.5"/></svg>
  ),
  Support: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v4"/><path d="M12 15h.01"/></svg>
  ),
  Camera: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  )
};

// --- 2. ПОЛНАЯ БАЗА КЛИЕНТОВ (30 КЕЙСОВ) ---
const CLIENT_DATABASE = [
    { id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", avatar: "👩‍💻", bio: "Парализующий саботаж при записи видео. Страх проявления зашкаливает. В теле — зажим в горле." },
    { id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", avatar: "👨‍🎨", bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным. Тяжесть в плечах." },
    { id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", avatar: "👩‍💼", bio: "Постоянное сжатие в груди и тревога. Не могу переключиться с работы на отдых." },
    { id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", avatar: "👨🏻", bio: "Сменил 5 профессий за 2 года. Нигде не находит признания, чувствует себя неудачником." },
    { id: "c5", name: "Анна", age: 25, profession: "Студентка", avatar: "👩🏼", bio: "Не может завершить разрушительные отношения. Боится одиночества до тошноты." },
    { id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", avatar: "👨🏻‍💼", bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе и холод." },
    { id: "c7", name: "Ольга", age: 38, profession: "Врач", avatar: "👩🏻", bio: "Ипохондрия. Паника при малейшем физическом дискомфорте." },
    { id: "c8", name: "Дмитрий", age: 29, profession: "Продавец", avatar: "🧔🏻", bio: "Боится встреч. Напряжение в скулах и зажим речи." },
    { id: "c9", name: "Мария", age: 33, profession: "Домохозяйка", avatar: "👩‍🍼", bio: "Материнская вина. Ощущение, что она плохая мать. Не может вздохнуть." },
    { id: "c10", name: "Сергей", age: 50, profession: "Предприниматель", avatar: "👨🏻‍🦳", bio: "Банкротство бизнеса. Колоссальный стыд перед семьей." },
    { id: "c11", name: "Юлия", age: 27, profession: "Модель", avatar: "👩🏻", bio: "РПП. Ненавидит свое отражение. Постоянный контроль веса." },
    { id: "c12", name: "Андрей", age: 35, profession: "Архитектор", avatar: "👨🏿", bio: "Вспышки неконтролируемого гнева. Ощущение кипятка в груди." },
    { id: "c13", name: "Наталья", age: 40, profession: "Учитель", avatar: "👩‍💼", bio: "Одиночество в толпе. Живет как за толстым стеклом." },
    { id: "c14", name: "Павел", age: 22, profession: "Курьер", avatar: "👱🏻", bio: "Зависимость от мнения родителей. Не может принять решение." },
    { id: "c15", name: "Екатерина", age: 36, profession: "HR-директор", avatar: "👩‍🏫", bio: "Выгорание. Перфекционизм. Жжение в глазах от истощения." },
    { id: "c16", name: "Александр", age: 44, profession: "Инженер", avatar: "👨🏻", bio: "Застрял в горе. Чувствует вину перед ушедшим близким." },
    { id: "c17", name: "Светлана", age: 30, profession: "Бьюти-мастер", avatar: "👩🏼", bio: "Низкая самооценка. Считает себя 'недостаточной' для любви." },
    { id: "c18", name: "Роман", age: 32, profession: "Аналитик", avatar: "👨🏿‍💻", bio: "Игровая зависимость. Уход от реальности в виртуальный мир." },
    { id: "c19", name: "Ирина", age: 48, profession: "Юрист", avatar: "👵🏼", bio: "Синдром пустого гнезда. Смысл жизни пропал." },
    { id: "c20", name: "Кирилл", age: 26, profession: "Дизайнер", avatar: "👦🏻", bio: "Агорафобия. Боится выходить на открытые пространства." },
    { id: "c21", name: "Татьяна", age: 55, profession: "Пенсионерка", avatar: "👩🏻‍🦱", bio: "Кризис старения. Ощущение, что время уходит впустую." },
    { id: "c22", name: "Виктор", age: 39, profession: "Водитель", avatar: "🧔", bio: "Переживает измену. Колючая проволока вокруг сердца." },
    { id: "c23", name: "Алина", age: 24, profession: "Бариста", avatar: "👩‍🎓", bio: "Не умеет говорить 'нет'. Чувствует, что все ею пользуются." },
    { id: "c24", name: "Денис", age: 37, profession: "Охранник", avatar: "👨🏻", bio: "Навязчивые мысли о здоровье. Постоянные проверки." },
    { id: "c25", name: "Людмила", age: 60, profession: "Педагог", avatar: "👵", bio: "Конфликт с невесткой. Чувствует себя ненужной и лишней." },
    { id: "c26", name: "Максим", age: 21, profession: "Блогер", avatar: "👦🏼", bio: "Подростковый бунт против системы. Ничего не хочет делать." },
    { id: "c27", name: "Валерия", age: 31, profession: "Стилист", avatar: "👩🏻‍🦰", bio: "Болезненная ревность. Постоянный поиск улик измены." },
    { id: "c28", name: "Станислав", age: 43, profession: "Адвокат", avatar: "👨🏻‍💼", bio: "Трудоголизм. Не умеет расслабляться без алкоголя." },
    { id: "c29", name: "Евгения", age: 29, profession: "Копирайтер", avatar: "👩🏻", bio: "Страх перемен. Боится менять работу, даже если там плохо." },
    { id: "c30", name: "Константин", age: 35, profession: "Финансист", avatar: "👨🏻", bio: "Эмоциональная холодность. Не понимает, что чувствует." }
];

const MODALITIES = {
  mpt: { id: "mpt", name: "МПТ", color: "indigo" },
  cbt: { id: "cbt", name: "КПТ", color: "emerald" },
  gestalt: { id: "gestalt", name: "Гештальт", color: "purple" },
  eit: { id: "eit", name: "ЭОТ", color: "amber" },
  psychoanalysis: { id: "psychoanalysis", name: "Психоанализ", color: "rose" },
  ta: { id: "ta", name: "ТА", color: "cyan" }
};

// --- 3. PREMIUM STYLES (MOBILE COMPACT) ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
    :root { --bg: #020617; --glass: rgba(15, 23, 42, 0.7); --border: rgba(255, 255, 255, 0.08); --accent: #6366f1; }
    body { font-family: 'Manrope', sans-serif; background: var(--bg); color: #f8fafc; overflow: hidden; margin: 0; }
    .btn-magnetic { position: relative; overflow: hidden; transition: all 0.3s ease; cursor: pointer; }
    .btn-magnetic:active { transform: scale(0.96); }
    .mesh-bg { position: fixed; inset: 0; z-index: -1; background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.12), transparent 50%), radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.08), transparent 50%); filter: blur(80px); }
    .glass-card { background: var(--glass); backdrop-filter: blur(20px); border: 1px solid var(--border); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
    .animate-in { animation: fadeIn 0.4s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    
    /* Segmented Control for Difficulty */
    .segmented-control { display: flex; background: rgba(255,255,255,0.04); border-radius: 1rem; padding: 4px; position: relative; border: 1px solid var(--border); }
    .segment-btn { flex: 1; padding: 12px 0; font-size: 10px; font-weight: 800; text-transform: uppercase; z-index: 10; transition: color 0.3s; color: #64748b; border: none; background: none; }
    .segment-btn.active { color: #fff; }
    .segment-slider { position: absolute; top: 4px; bottom: 4px; background: var(--accent); border-radius: 0.8rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 15px rgba(99,102,241,0.5); }
    
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .diamond-glow { filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.8)); }
    .loader-dots div { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: bounce 0.6s infinite alternate; }
    .loader-dots div:nth-child(2) { animation-delay: 0.2s; }
    .loader-dots div:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce { to { transform: translateY(-6px); opacity: 0.3; } }
  `}</style>
);

// --- 4. COMPONENTS ---

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
    } catch (e) { console.error("Camera access denied"); }
  };

  return (
    <div className="glass-card rounded-[2rem] p-1 overflow-hidden relative group my-4 shadow-4xl border-t border-white/10">
      <div className="aspect-video bg-black/50 rounded-[1.8rem] flex items-center justify-center relative overflow-hidden">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        {!recording && <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"><Icons.Camera className="w-10 h-10 text-white/30"/></div>}
        {recording && <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/> <span className="text-[9px] font-black text-white uppercase tracking-widest">REC</span></div>}
      </div>
      <button onClick={() => recording ? mediaRecorder.current.stop() : startStream()} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 active:scale-95 transition-all">
        {recording ? 'Стоп' : 'Записать визитку'}
      </button>
    </div>
  );
};

// --- 5. MAIN APP MONOLITH ---

export default function App() {
  const [screen, setScreen] = useState('loading');
  const [isSubscribed, setIsSubscribed] = useState(true); 
  const [role, setRole] = useState(null); 
  const [clientPool, setClientPool] = useState(CLIENT_DATABASE);
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [selectedModality, setSelectedModality] = useState('mpt');
  const [difficulty, setDifficulty] = useState(2); 
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [psychologists, setPsychologists] = useState([]);
  const [userProfile, setUserProfile] = useState({ name: '', experience: 0, price: 0, about: '', methods: '', photoUrl: null });
  const [diamonds, setDiamonds] = useState(5);
  const [notification, setNotification] = useState(null);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id?.toString() || 'dev_platinum_master';

  const unlockAudio = () => {
    new Audio("data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==").play().catch(()=>{});
  };

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
                const data = await res.json();
                if(data.isSubscribed !== undefined) setIsSubscribed(data.isSubscribed);
                if(data.diamonds !== undefined) setDiamonds(data.diamonds);
                if(data.pool) setClientPool(data.pool);
                if(data.profile) setUserProfile(prev => ({...prev, ...data.profile}));
                setScreen('hub');
            } catch(e) { setScreen('hub'); }
        }
    };
    setTimeout(initApp, 1500);
  }, []);

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isTyping]);

  const showToast = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSend = async (text = inputText, isInitial = false, action = 'chat', flow = null) => {
    if (isInitial) unlockAudio();
    if (!text && !isInitial) return;
    if (!isInitial && action === 'chat') setMessages(p => [...p, { role: 'user', content: text }]);
    setInputText(''); setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, message: text, modalityId: selectedModality, action, selectedClientId, role, flow, difficulty, history: messages.filter(m => m.role !== 'hint').slice(-8) })
      });
      const data = await res.json();
      if(action === 'get_hint') setMessages(p => [...p, { role: 'hint', content: data.hint }]);
      else if(data.content) {
          setMessages(p => [...p, { role: 'ai', content: data.content, voice: data.voice }]);
          if(data.voice) new Audio(`data:audio/mp3;base64,${data.voice}`).play().catch(()=>{});
      }
    } catch(e) { showToast("Сбой связи с ИИ"); } finally { setIsTyping(false); }
  };

  const startSession = async () => {
      if(diamonds <= 0) return showToast("Недостаточно бриллиантов");
      setDiamonds(prev => prev - 1); 
      setScreen('chat'); 
      setMessages([]); 
      handleSend("Здравствуйте", true);
  };

  const saveProfile = async () => {
    try {
        await fetch('/api/profile', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, profile: userProfile })
        });
        showToast("Система сохранена");
        setScreen('hub');
    } catch(e) { showToast("Ошибка сохранения"); }
  };

  const finishSession = async () => {
      if(!confirm("Завершить тренировку и получить аудит?")) return;
      setIsTyping(true);
      try {
          const res = await fetch('/api/finish', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ userId, history: messages, selectedClientId, modalityId: selectedModality })
          });
          const data = await res.json();
          showToast(`Аудит готов: ${data.analytics?.method || 0}%`);
          if(data.newPool) setClientPool(data.newPool);
          setScreen('hub');
      } catch (e) { setScreen('hub'); } finally { setIsTyping(false); }
  };

  const acceptLegal = () => { localStorage.setItem('connectum_legal', 'true'); setScreen('hub'); };

  const currentClient = clientPool.find(c => c.id === selectedClientId) || clientPool[0];

  // --- RENDERING LOGIC ---

  if (screen === 'loading') return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#020617]">
      <GlobalStyles /><div className="mesh-bg" />
      <Icons.Infinity className="w-16 h-16 animate-pulse text-indigo-500" />
      <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 mt-12 animate-pulse">Connectum Pro Platinum</span>
    </div>
  );

  if (!isSubscribed && screen !== 'legal') return (
    <div className="h-screen flex flex-col items-center justify-center p-8 text-center bg-[#020617]">
      <GlobalStyles /><div className="mesh-bg" />
      <div className="glass-card p-10 rounded-[3rem] shadow-5xl animate-in">
        <Icons.Telegram className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
        <h2 className="text-xl font-black uppercase mb-4 tracking-tighter">Вход ограничен</h2>
        <p className="text-xs text-slate-400 mb-8 leading-relaxed">Для доступа к экосистеме необходимо быть подписчиком нашего официального канала.</p>
        <a href="https://t.me/psy_connectum" target="_blank" className="block w-full py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white mb-4">Подписаться</a>
        <button onClick={() => window.location.reload()} className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Я подписался</button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[100dvh] bg-[#020617] text-slate-100 overflow-hidden relative">
      <GlobalStyles /><div className="mesh-bg" />

      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] bg-indigo-600/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20 text-[10px] font-black uppercase tracking-widest shadow-4xl animate-in">
          {notification}
        </div>
      )}

      {/* HEADER SYSTEM */}
      {screen !== 'hub' && screen !== 'legal' && (
        <header className="flex-shrink-0 h-14 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-5 z-50">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen('hub')} className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center active:scale-90 transition shadow-inner">
              <Icons.ChevronLeft className="w-4 h-4 text-slate-400"/>
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">Connectum</span>
              <span className="text-[7px] font-bold text-slate-600 uppercase mt-1">Platinum v21.26</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20 shadow-lg active:scale-95 transition">
            <span className="text-[11px] font-black text-indigo-300 tracking-tighter">{diamonds}</span>
            <Icons.Diamond className="w-4 h-4 text-indigo-400 diamond-glow" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden relative z-10 flex flex-col">
        
        {/* 0. LEGAL SCREEN */}
        {screen === 'legal' && (
           <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-in">
              <div className="glass-card p-10 rounded-[3rem] max-w-sm border-t border-white/10 shadow-5xl">
                  <div className="w-20 h-20 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner"><Icons.User className="w-10 h-10 text-indigo-400"/></div>
                  <h2 className="text-xl font-black mb-4 uppercase tracking-tight">Соглашение</h2>
                  <p className="text-[11px] text-slate-400 mb-10 leading-relaxed font-medium">Вы подтверждаете совершеннолетие и согласны на обработку данных для улучшения ИИ-систем.</p>
                  <button onClick={acceptLegal} className="w-full py-5 bg-indigo-600 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-white active:scale-95 transition-all shadow-3xl">Принять и Войти</button>
              </div>
           </div>
        )}

        {/* 1. ГЛАВНАЯ (HUB) */}
        {screen === 'hub' && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-10 animate-in">
            <div className="flex flex-col items-center gap-8">
               <div className="relative group">
                 <div className="absolute inset-0 bg-indigo-500 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                 <Icons.Infinity className="w-24 h-24 relative z-10 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]" />
               </div>
               <div className="space-y-2">
                 <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Connectum</h1>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] opacity-80">Синергия мастерства и доверия</p>
               </div>
            </div>
            
            <div className="w-full grid gap-4 max-w-sm">
                <button onClick={() => { unlockAudio(); setScreen('setup'); setRole('psychologist'); }} className="btn-magnetic w-full p-6 glass-card rounded-[2.5rem] flex items-center gap-6 active:scale-[0.97] text-left relative overflow-hidden group shadow-4xl">
                    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-4xl z-10 shadow-inner group-hover:scale-110 transition-transform">🧠</div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-black text-white uppercase tracking-tight">Я Психолог</h3>
                      <p className="text-[9px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Тренажер • Рост</p>
                    </div>
                </button>
                <button onClick={() => { unlockAudio(); setScreen('client_hub'); setRole('client'); }} className="btn-magnetic w-full p-6 glass-card rounded-[2.5rem] flex items-center gap-6 active:scale-[0.97] text-left relative overflow-hidden group shadow-4xl">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-4xl z-10 shadow-inner group-hover:scale-110 transition-transform">🤝</div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-black text-white uppercase tracking-tight">Я Клиент</h3>
                      <p className="text-[9px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Помощь • Доверие</p>
                    </div>
                </button>
            </div>
            
            <div className="flex justify-center gap-12 mt-auto pb-6 opacity-60 hover:opacity-100 transition-opacity">
                <a href="https://t.me/psy_connectum" target="_blank" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors"><Icons.Telegram className="w-4 h-4"/> Канал</a>
                <a href="https://t.me/lazalex81" target="_blank" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors"><Icons.Support className="w-4 h-4"/> Поддержка</a>
            </div>
          </div>
        )}

        {/* 2. ТРЕНАЖЕР (SETUP) */}
        {screen === 'setup' && (
           <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar pb-32 text-left animate-in">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Тренажер</h2>
               
               {/* ТАРИФЫ (COMPACT CARDS) */}
               <div className="grid grid-cols-2 gap-3">
                  <div className="p-5 glass-card rounded-[2rem] border-l-4 border-orange-500 active:scale-95 transition cursor-pointer shadow-xl" onClick={()=>showToast("Заявка принята")}>
                      <h4 className="text-[9px] font-black uppercase text-orange-400">Тест-драйв</h4>
                      <div className="flex justify-between items-end mt-2"><span className="text-lg font-black text-white">490₽</span><div className="w-6 h-6 bg-orange-600 rounded-lg flex items-center justify-center text-[10px]">💰</div></div>
                  </div>
                  <div className="p-5 bg-indigo-600/10 border border-white/5 rounded-[2rem] border-l-4 border-indigo-600 active:scale-95 transition cursor-pointer shadow-xl" onClick={()=>showToast("Заявка принята")}>
                      <h4 className="text-[9px] font-black uppercase text-indigo-400">ПРО Доступ</h4>
                      <div className="flex justify-between items-end mt-2"><span className="text-lg font-black text-white">2990₽</span><div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center text-[10px]">💎</div></div>
                  </div>
               </div>

               <div className="space-y-8">
                   <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-[0.3em]">Уровень сложности</label>
                     <div className="segmented-control">
                        <div className="segment-slider" style={{ width: '33.33%', left: `${(difficulty-1)*33.33}%` }} />
                        {[1, 2, 3].map(lvl => (
                            <button key={lvl} onClick={() => setDifficulty(lvl)} className={`segment-btn ${difficulty === lvl ? 'active' : ''}`}>{lvl===1?'Лайт':lvl===2?'Норма':'Хард'}</button>
                        ))}
                     </div>
                   </div>

                   <div className="grid gap-4">
                       <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-[0.3em]">Метод (Модальность)</label><select value={selectedModality} onChange={(e) => setSelectedModality(e.target.value)} className="w-full p-4 glass-card rounded-2xl text-xs font-bold text-white outline-none appearance-none focus:border-indigo-500 transition shadow-3xl">{Object.keys(MODALITIES).map(k => <option key={k} value={k} className="bg-slate-950">{MODALITIES[k].name}</option>)}</select></div>
                       <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-[0.3em]">Выберите Клиента</label><select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="w-full p-4 glass-card rounded-2xl text-xs font-bold text-white outline-none appearance-none focus:border-indigo-500 transition shadow-3xl">{clientPool.map(c => <option key={c.id} value={c.id} className="bg-slate-950">{c.name}, {c.age} — {c.profession}</option>)}</select></div>
                   </div>

                   <div className="glass-card rounded-[3rem] p-10 relative overflow-hidden shadow-5xl border-t border-white/10 group">
                       <div className="flex items-center gap-6 mb-8">
                           <div className="w-20 h-20 bg-white/5 rounded-[1.8rem] flex items-center justify-center text-5xl shadow-inner border border-white/5">{currentClient?.avatar || '👤'}</div>
                           <div><h4 className="text-2xl font-black text-white leading-none tracking-tight">{currentClient?.name || 'Клиент'}, {currentClient?.age || ''}</h4><p className="text-[11px] font-black uppercase text-indigo-400 mt-3 opacity-80 tracking-widest">{currentClient?.profession || 'Описание'}</p></div>
                       </div>
                       <div className="text-[15px] text-slate-300 italic leading-relaxed border-l-2 border-indigo-500/30 pl-8 py-3">"{currentClient?.bio}"</div>
                   </div>
                   
                   <button onClick={startSession} className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 py-8 rounded-[2.5rem] font-black uppercase text-[13px] tracking-[0.4em] shadow-5xl active:scale-95 text-white flex items-center justify-center gap-4 transition-all transform hover:-translate-y-1">
                       НАЧАТЬ СЕССИЮ — 1 <Icons.Diamond className="w-6 h-6 diamond-glow"/>
                   </button>
               </div>
           </div>
        )}

        {/* 3. КЛИЕНТСКИЙ ХАБ */}
        {screen === 'client_hub' && (
           <div className="flex-1 overflow-y-auto p-6 space-y-7 no-scrollbar pb-32 text-left animate-in">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Хаб Помощи</h2>
              <div className="p-10 bg-gradient-to-br from-indigo-600/30 to-indigo-900/50 rounded-[3rem] border border-indigo-500/20 flex justify-between items-center relative overflow-hidden group active:scale-95 transition shadow-5xl">
                  <div className="relative z-10"><h4 className="text-xs font-black uppercase text-indigo-300 tracking-[0.3em]">Client Premium</h4><p className="text-[12px] font-bold text-indigo-100/60 mt-2 uppercase tracking-tight leading-none">ИИ-терапия 24/7</p></div>
                  <div className="relative z-10 text-right"><span className="text-3xl font-black text-white">1990₽</span><button onClick={()=>showToast("Заявка принята")} className="block bg-indigo-500 hover:bg-indigo-400 text-[10px] font-black uppercase px-8 py-3.5 rounded-2xl mt-4 shadow-3xl active:scale-95 transition">Купить</button></div>
              </div>
              <div className="grid gap-5">
                  <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Мне нужна диагностика", true, 'chat', 'diagnostics'); }} className="p-8 glass-card rounded-[2.5rem] flex items-center gap-8 active:scale-95 text-left border-l-4 border-indigo-500 shadow-4xl group transition-all">
                      <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-4xl group-hover:rotate-6 transition-transform">🔍</div>
                      <div><h4 className="text-xl font-black text-white uppercase tracking-tight leading-tight">ИИ-Диагностика</h4><p className="text-[12px] font-bold text-slate-500 uppercase mt-1">Поиск корня проблемы</p></div>
                  </button>
                  <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Мне нужна помощь", true, 'chat', 'therapy'); }} className="p-8 glass-card rounded-[2.5rem] flex items-center gap-8 active:scale-95 text-left border-l-4 border-emerald-500 shadow-4xl group transition-all">
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-4xl group-hover:rotate-6 transition-transform">✨</div>
                      <div><h4 className="text-xl font-black text-white uppercase tracking-tight leading-tight">ИИ-Психолог</h4><p className="text-[12px] font-bold text-slate-500 uppercase mt-1">Поддержка здесь и сейчас</p></div>
                  </button>
              </div>
              <button onClick={()=>showToast("Ссылка скопирована")} className="w-full text-center text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] bg-indigo-500/5 p-7 rounded-[2.8rem] border border-indigo-500/10 shadow-xl mt-8 transition-all flex items-center justify-center gap-3">Приведи друга = +3 <Icons.Diamond className="w-4 h-4"/></button>
           </div>
        )}

        {/* 4. CHAT INTERFACE */}
        {screen === 'chat' && (
           <div className="flex-1 flex flex-col relative h-full animate-in">
               <div className="flex-1 overflow-y-auto p-6 space-y-7 no-scrollbar pb-48 text-left">
                   {messages.map((m, i) => (
                       <div key={i} className={`flex flex-col ${m.role==='user'?'items-end':'items-start'} animate-in`}>
                           <div className={`max-w-[90%] p-6 text-[15px] leading-relaxed font-medium shadow-5xl ${m.role==='user'?'bg-indigo-600 text-white rounded-[2rem_2rem_0.5rem_2rem]':'bg-slate-800/80 backdrop-blur-md border border-white/5 text-slate-50 rounded-[2rem_2rem_2rem_0.5rem]'}`} dangerouslySetInnerHTML={{__html: marked.parse(m.content||"")}}/>
                       </div>
                   ))}
                   {isTyping && (
                    <div className="flex gap-2 p-5 bg-slate-800/60 rounded-[2rem] w-fit border border-white/5 shadow-3xl">
                      <div className="loader-dots flex gap-2"><div></div><div></div><div></div></div>
                    </div>
                   )}
                   <div ref={chatEndRef} />
               </div>
               <footer className="absolute bottom-0 w-full p-6 bg-slate-950/95 backdrop-blur-3xl border-t border-white/5 z-50">
                   <div className="flex gap-3 mb-6">
                       {role === 'psychologist' && <button onClick={() => handleSend("Дай совет", false, 'get_hint')} className="flex-1 py-4.5 bg-orange-600/15 border border-orange-500/20 rounded-2xl text-[11px] font-black uppercase text-orange-400 active:scale-95 transition flex items-center justify-center gap-3 tracking-widest shadow-xl transform hover:-translate-y-0.5"><Icons.Sparkles className="w-4 h-4"/> Совет ИИ</button>}
                       <button onClick={finishSession} className="flex-1 py-4.5 bg-emerald-600/15 border border-emerald-500/20 rounded-2xl text-[11px] font-black uppercase text-emerald-400 active:scale-95 transition tracking-widest shadow-xl transform hover:-translate-y-0.5">🏁 Финиш</button>
                   </div>
                   <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-[2rem] p-1.5 pr-4 focus-within:ring-2 ring-indigo-500/30 transition-all shadow-inner">
                       <textarea value={inputText} onChange={e=>setInputText(e.target.value)} rows={1} className="flex-1 bg-transparent border-none outline-none text-[16px] px-5 py-3 text-white placeholder:text-slate-600 resize-none font-medium no-scrollbar" placeholder="Ваша интервенция..." onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}} />
                       <button onClick={()=>handleSend()} className="w-12 h-12 bg-indigo-600 rounded-[1.4rem] flex items-center justify-center active:scale-90 transition shadow-4xl shadow-indigo-600/50 transform hover:scale-105"><Icons.Send className="w-6 h-6 text-white"/></button>
                   </div>
               </footer>
           </div>
        )}

        {/* 5. ВИТРИНА (MARKETPLACE) */}
        {screen === 'aggregator' && (
           <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar pb-32 text-left animate-in">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Витрина</h2>
               <div className="space-y-6">
                   {psychologists.length === 0 ? (
                    <div className="p-12 text-center glass-card rounded-[2.5rem] border-dashed border-white/10">
                        <Icons.Search className="w-14 h-14 text-slate-700 mx-auto mb-4 animate-pulse"/>
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Поиск активных мастеров...</p>
                    </div>
                   ) : psychologists.map((p, i) => (
                       <div key={i} className={`p-10 rounded-[3.5rem] bg-slate-900/60 border border-indigo-500/20 shadow-5xl animate-in delay-[${i*100}ms]`}>
                           <div className="flex gap-8 items-center">
                               <div className="w-24 h-24 bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-5xl overflow-hidden border border-white/5 shadow-inner">
                                   {p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover"/> : '👤'}
                               </div>
                               <div className="flex-1">
                                   <h4 className="text-2xl font-black text-white leading-tight">{p.name}</h4>
                                   <p className="text-[11px] font-black uppercase text-indigo-400 mt-2 tracking-widest">Стаж {p.experience} лет • {p.methods}</p>
                               </div>
                           </div>
                           <div className="mt-10 flex justify-between items-center border-t border-white/5 pt-8">
                               <div><span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Сессия</span><p className="text-3xl font-black text-white leading-none mt-2">{p.price}₽</p></div>
                               <button onClick={()=>showToast("Заявка принята")} className="bg-indigo-600 px-10 py-4.5 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest text-white shadow-3xl active:scale-95 transition-all transform hover:-translate-y-1">Записаться</button>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
        )}

        {/* 6. ПРОФИЛЬ (EXTENDED) */}
        {screen === 'profile' && (
           <div className="flex-1 overflow-y-auto p-7 space-y-10 no-scrollbar pb-36 text-left animate-in">
               <div className="flex justify-between items-end px-1">
                 <h2 className="text-3xl font-black text-white uppercase leading-none">Профиль</h2>
                 <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.5em] opacity-80">Master Evolution</span>
               </div>
               
               <div className="space-y-10">
                   <div className="flex gap-8 items-center">
                       <div className="w-28 h-28 bg-white/5 rounded-[2.2rem] flex items-center justify-center border-2 border-dashed border-white/10 overflow-hidden relative shadow-5xl group transition-all" onClick={()=>fileInputRef.current.click()}>
                           {userProfile.photoUrl ? <img src={userProfile.photoUrl} className="w-full h-full object-cover"/> : <Icons.User className="w-12 h-12 text-slate-700 group-hover:text-indigo-500 transition-colors"/>}
                           <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload}/>
                           <div className="absolute inset-0 bg-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm cursor-pointer"><span className="text-[10px] font-black text-white uppercase tracking-widest">Сменить</span></div>
                       </div>
                       <div className="flex-1">
                           <button onClick={()=>showToast("Ссылка скопирована")} className="w-full py-6 bg-indigo-600/15 border border-indigo-500/20 rounded-[1.5rem] text-[10px] font-black uppercase text-indigo-300 shadow-xl active:scale-95 transition flex items-center justify-center gap-3 tracking-tighter">Пригласи коллегу +3 <Icons.Diamond className="w-4 h-4"/></button>
                       </div>
                   </div>
                   
                   <VideoRecorder onUpload={(url)=>setUserProfile(prev => ({...prev, videoUrl: url}))}/>
                   
                   <div className="space-y-7 pt-6">
                       <div className="space-y-3"><label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.3em]">Публичное Имя</label><input type="text" className="w-full p-6 glass-card rounded-[1.8rem] text-[17px] font-bold text-white outline-none focus:border-indigo-500 transition shadow-4xl" value={userProfile.name} onChange={e=>setUserProfile({...userProfile, name:e.target.value})}/></div>
                       <div className="flex gap-5">
                           <div className="space-y-3 flex-1"><label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.3em]">Стаж (лет)</label><input type="number" className="w-full p-6 glass-card rounded-[1.8rem] text-[17px] font-bold text-white outline-none focus:border-indigo-500 transition" value={userProfile.experience} onChange={e=>setUserProfile({...userProfile, experience:e.target.value})}/></div>
                           <div className="space-y-3 flex-1"><label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.3em]">Цена (₽)</label><input type="number" className="w-full p-6 glass-card rounded-[1.8rem] text-[17px] font-bold text-white outline-none focus:border-indigo-500 transition" value={userProfile.price} onChange={e=>setUserProfile({...userProfile, price:e.target.value})}/></div>
                       </div>
                       
                       {/* НОВЫЕ ПОЛЯ ПРОФИЛЯ */}
                       <div className="space-y-3"><label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.3em]">О себе</label><textarea className="w-full p-6 glass-card rounded-[1.8rem] text-[15px] font-medium text-white outline-none focus:border-indigo-500 transition shadow-4xl min-h-[140px] no-scrollbar leading-relaxed" placeholder="Ваша философия работы, опыт и личный подход..." value={userProfile.about} onChange={e=>setUserProfile({...userProfile, about:e.target.value})}/></div>
                       <div className="space-y-3"><label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.3em]">Методы работы (модальности)</label><input type="text" className="w-full p-6 glass-card rounded-[1.8rem] text-[15px] font-bold text-white outline-none focus:border-indigo-500 transition shadow-4xl" placeholder="Напр: МПТ, КПТ, ТА, ЭОТ" value={userProfile.methods} onChange={e=>setUserProfile({...userProfile, methods:e.target.value})}/></div>
                   </div>
                   
                   <button onClick={saveProfile} className="w-full py-8 bg-gradient-to-r from-indigo-600 to-indigo-900 rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.5em] text-white shadow-5xl active:scale-95 transition-all mt-10 transform hover:-translate-y-2">СОХРАНИТЬ МАСТЕРА</button>
               </div>
           </div>
        )}

      </main>

      {/* FOOTER NAVIGATION SYSTEM (RUSSIAN) */}
      {(screen !== 'chat' && screen !== 'legal' && screen !== 'loading') && (
        <nav className="h-[105px] bg-slate-950/98 backdrop-blur-4xl border-t border-white/5 flex justify-around items-center px-6 pb-8 z-50 shadow-[0_-25px_60px_rgba(0,0,0,0.9)]">
            {[
                {id: 'hub', icon: Icons.Infinity, label: 'Главная'},
                {id: 'setup', icon: Icons.Sparkles, label: 'Тренажер'},
                {id: 'aggregator', icon: Icons.Search, label: 'Витрина'},
                {id: 'profile', icon: Icons.User, label: 'Профиль'}
            ].map(item => (
                <button key={item.id} onClick={()=>setScreen(item.id)} className={`flex flex-col items-center gap-3 w-18 transition-all duration-500 ${screen===item.id ? 'text-indigo-400 -translate-y-3' : 'text-slate-600 hover:text-slate-400'}`}>
                    <div className="relative">
                      <item.icon className={`w-7 h-7 ${screen===item.id ? 'drop-shadow(0 0 12px rgba(99,102,241,0.8))' : ''}`}/>
                      {screen===item.id && <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-2xl animate-pulse -z-10"/>}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest transition-opacity ${screen===item.id ? 'opacity-100' : 'opacity-40'}`}>{item.label}</span>
                </button>
            ))}
        </nav>
      )}

    </div>
  );
}
