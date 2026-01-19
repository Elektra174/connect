import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

/**
 * CONNECTUM PRO v20.8.3 - PLATINUM TOTAL MONOLITH
 * --------------------------------------------------------
 * 👑 АБСОЛЮТНЫЙ МОНОЛИТ: Фронтенд без сокращений.
 * 👥 DATABASE: Полный реестр из 30 детальных клиентов.
 * 📱 MOBILE: Фикс 100dvh, iOS Zoom Fix, Ultra-Compact.
 * 💎 UI: Платиновый Кристалл + Mesh-BG + Магнитные кнопки.
 */

// --- 🎨 PREMIUM SVG ICONS ---
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
  Diamond: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <path d="M6 4H18L22 9L12 21L2 9L6 4Z" stroke="url(#diamondGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 4L12 21L18 4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
      <path d="M2 9H22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
      <path d="M12 4V21" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2"/>
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>
    </svg>
  ),
  Trophy: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  )
};

// --- 👥 ПОЛНАЯ БАЗА КЛИЕНТОВ (30 ДЕТАЛЬНЫХ КЕЙСОВ) ---
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
  mpt: { id: "mpt", name: "МПТ (Мета-персональная)", color: "indigo" },
  cbt: { id: "cbt", name: "КПТ (Когнитивная)", color: "emerald" },
  gestalt: { id: "gestalt", name: "Гештальт", color: "purple" },
  eit: { id: "eit", name: "ЭОТ (Образная)", color: "amber" },
  psychoanalysis: { id: "psychoanalysis", name: "Психоанализ", color: "rose" },
  ta: { id: "ta", name: "ТА (Транзактный)", color: "cyan" }
};

// --- 🛠 STYLES (v20.8.3 ULTRA-MOBILE) ---
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
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .chat-bubble-ai { border-radius: 18px 18px 18px 4px; background: rgba(30, 41, 59, 0.98); border: 1px solid rgba(255,255,255,0.05); }
    .chat-bubble-user { border-radius: 18px 18px 4px 18px; background: linear-gradient(135deg, #4f46e5, #7c3aed); }
    input, select, textarea { font-size: 16px !important; } /* Fix iOS Zoom */
  `}</style>
);

// --- 📹 VIDEO RECORDER (COMPACT) ---
const VideoRecorder = ({ onUpload, setErrorLog }) => {
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const startStream = async () => {
    try {
      if (!navigator.mediaDevices) throw new Error("API не поддерживается");
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (e) { setErrorLog(`Камера недоступна: ${e.message}`); }
  };

  const startRecording = () => {
    chunks.current = [];
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
  };

  return (
    <div className="bg-slate-900/80 rounded-3xl p-4 border border-white/10 text-center shadow-2xl">
      <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-4 border border-white/5">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
      </div>
      {!stream ? (
        <button onClick={startStream} className="w-full py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 active:scale-95 transition">Активировать камеру</button>
      ) : (
        <button onClick={recording ? () => mediaRecorder.current.stop() : startRecording} className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest ${recording ? 'bg-red-600' : 'bg-indigo-600'} active:scale-95 transition`}>
          {recording ? 'Завершить' : 'Начать запись'}
        </button>
      )}
    </div>
  );
};

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
  const fileInputRef = useRef(null);
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id?.toString() || 'dev_master';

  const unlockAudio = () => {
    const silent = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==");
    silent.play().catch(() => {});
  };

  useEffect(() => {
    if (tg) {
        tg.ready();
        tg.expand();
        tg.setHeaderColor('#020617');
    }
  }, []);

  useEffect(() => {
    if (screen === 'aggregator') {
      fetch('/api/aggregator').then(res => res.json()).then(setPsychologists).catch(() => {});
    }
  }, [screen]);

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isTyping]);

  const handleSend = async (text = inputText, isInitial = false, action = 'chat') => {
    if (isInitial) unlockAudio();
    if (!text && !isInitial) return;
    if (!isInitial && action === 'chat') setMessages(p => [...p, { role: 'user', content: text }]);
    
    setInputText(''); 
    setIsTyping(true);
    setErrorLog(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, message: text, modalityId: selectedModality, action, selectedClientId, role, history: messages.slice(-10) })
      });
      
      if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `Ошибка: ${res.status}`);
      }
      
      const data = await res.json();
      if (action === 'get_hint') setMessages(p => [...p, { role: 'hint', content: data.hint }]);
      else if (data.content) {
        setMessages(p => [...p, { role: 'ai', content: data.content, voice: data.voice }]);
        if (data.voice) {
            const audio = new Audio(`data:audio/mp3;base64,${data.voice}`);
            audio.play().catch(e => console.error("Audio block:", e));
        }
      }
    } catch (e) { setErrorLog(e.message); }
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
      setMessages(p => [...p, { role: 'report', data: data.analytics || data.data, cert: data.certificateUrl }]);
    } catch (e) { setErrorLog("Ошибка завершения."); }
    setIsTyping(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setUserProfile({...userProfile, photoUrl: reader.result});
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    await fetch('/api/profile', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ userId, profile: userProfile })
    });
    setScreen('hub');
  };

  const requestWaitlist = async (tariff, amount) => {
    await fetch('/api/waitlist', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId, role, tariff, amount })
    });
    tg?.showPopup({ title: 'Заявка принята', message: 'С вами свяжутся для подтверждения оплаты.' });
  };

  const currentClient = CLIENT_DATABASE.find(c => c.id === selectedClientId) || CLIENT_DATABASE[0];

  return (
    <div className="flex flex-col h-[100dvh] bg-[#020617] text-slate-100 overflow-hidden relative font-sans text-left selection:bg-indigo-500/30">
      <GlobalStyles />
      <div className="mesh-bg" />

      {/* HEADER */}
      {screen !== 'hub' && (
        <header className="flex-shrink-0 h-14 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 z-50">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen('hub')} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition">
                <Icons.ChevronLeft className="w-4 h-4 text-slate-400" />
            </button>
            <div className="flex flex-col">
                <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest leading-none">Connectum</span>
                <span className="text-[6px] font-bold text-slate-600 uppercase">Platinum v20.8.3</span>
            </div>
          </div>
          <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
            <span className="text-[8px] font-black text-indigo-300">{gems}/5</span>
            <Icons.Diamond className="w-3.5 h-3.5 text-indigo-400" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden relative flex flex-col z-10">
        
        {/* HUB (Entry) */}
        {screen === 'hub' && (
          <div className="h-full flex flex-col items-center justify-center p-4 text-center space-y-6 animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[2rem] flex items-center justify-center shadow-2xl animate-pulse">
                <Icons.Infinity className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tighter">Connectum</h1>
              <p className="text-slate-500 text-[8px] font-bold uppercase tracking-[0.5em]">Эволюция Психологии</p>
            </div>
            <div className="w-full grid gap-3 max-w-[280px]">
              <button onClick={() => { unlockAudio(); setScreen('setup'); setRole('psychologist'); }} className="btn-magnetic w-full p-4 glass-card rounded-[24px] flex items-center gap-4 active:scale-95 text-left relative overflow-hidden shadow-xl">
                <div className="outlined-text">МАСТЕР</div>
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-xl relative z-10">🧠</div>
                <div className="relative z-10">
                    <h3 className="text-base font-black uppercase text-white leading-none">Я Психолог</h3>
                    <p className="text-[7px] text-slate-500 font-bold uppercase tracking-wider mt-1">Тренажер • Рост • Рейтинг</p>
                </div>
              </button>
              <button onClick={() => { unlockAudio(); setScreen('client_hub'); setRole('client'); }} className="btn-magnetic w-full p-4 glass-card rounded-[24px] flex items-center gap-4 active:scale-95 text-left relative overflow-hidden shadow-xl">
                <div className="outlined-text">ДОВЕРИЕ</div>
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-xl relative z-10">🤝</div>
                <div className="relative z-10">
                    <h3 className="text-base font-black uppercase text-white leading-none">Я Клиент</h3>
                    <p className="text-[7px] text-slate-500 font-bold uppercase tracking-wider mt-1">ИИ-Помощь • Подбор</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* CLIENT HUB */}
        {screen === 'client_hub' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar animate-in slide-in-from-left duration-300 text-left">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Клиентский центр</h2>
            
            <div onClick={() => requestWaitlist('client_premium', 1990)} className="p-5 bg-gradient-to-br from-indigo-600/20 to-indigo-900/40 rounded-[2rem] border border-indigo-500/30 flex justify-between items-center relative overflow-hidden group shadow-xl">
              <div className="absolute -bottom-3 -right-3 opacity-5 group-hover:scale-150 transition-all duration-1000"><Icons.Diamond className="w-24 h-24" /></div>
              <div>
                <h4 className="text-xs font-black uppercase text-indigo-300 tracking-widest">Client Premium</h4>
                <p className="text-[8px] text-indigo-100/60 font-bold uppercase mt-1">ИИ-терапия 24/7 + Подбор</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black">1990₽</span>
                <button className="block bg-indigo-600 text-[8px] font-black uppercase px-4 py-2 rounded-full mt-2 shadow-lg tracking-widest active:scale-90 transition">Купить</button>
              </div>
            </div>

            <div className="grid gap-3">
               <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Начать диагностику", true, 'diagnostics'); }} className="p-5 glass-card rounded-[2.5rem] flex items-center gap-4 active:scale-95 text-left border-l-4 border-l-indigo-500 shadow-xl">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl shadow-inner text-indigo-400">🔍</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-white uppercase tracking-tight leading-none">ИИ-Диагностика</h4>
                    <p className="text-[8px] text-slate-500 font-bold uppercase mt-1">Найти причину состояния</p>
                  </div>
               </button>
               <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Начать терапию", true, 'ai_therapy'); }} className="p-5 glass-card rounded-[2.5rem] flex items-center gap-4 active:scale-95 text-left border-l-4 border-l-emerald-500 shadow-xl">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl shadow-inner text-emerald-400">✨</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-white uppercase tracking-tight leading-none">ИИ-Терапевт</h4>
                    <p className="text-[8px] text-slate-500 font-bold uppercase mt-1">Немедленная поддержка</p>
                  </div>
               </button>
               <button onClick={() => setScreen('aggregator')} className="p-5 glass-card rounded-[2.5rem] flex items-center gap-4 active:scale-95 text-left border-l-4 border-l-purple-500 shadow-xl">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-2xl shadow-inner text-purple-400">👥</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-white uppercase tracking-tight leading-none">Витрина Мастеров</h4>
                    <p className="text-[8px] text-slate-500 font-bold uppercase mt-1">Твой личный специалист</p>
                  </div>
               </button>
            </div>
          </div>
        )}

        {/* SETUP (Psychologist) */}
        {screen === 'setup' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar pb-10 text-left">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Мастерская</h2>
            
            <div className="flex gap-3">
               <div onClick={() => requestWaitlist('test_drive', 490)} className="flex-1 p-4 glass-card rounded-[2rem] border-l-4 border-l-orange-500 relative overflow-hidden group active:scale-95 transition-transform">
                  <h5 className="text-[8px] font-black uppercase text-orange-400 leading-none">Тест-драйв</h5>
                  <p className="text-xl font-black mt-1 leading-none">490₽</p>
                  <p className="text-[7px] text-slate-500 font-bold uppercase mt-2">3 дня практики</p>
               </div>
               <div onClick={() => requestWaitlist('pro_access', 2990)} className="flex-1 p-4 bg-indigo-600/10 border border-white/5 rounded-[2rem] border-l-4 border-l-indigo-600 relative overflow-hidden group active:scale-95 transition-transform">
                  <h5 className="text-[8px] font-black uppercase text-indigo-400 leading-none">PRO Доступ</h5>
                  <p className="text-xl font-black mt-1 leading-none">2990₽</p>
                  <p className="text-[7px] text-slate-500 font-bold uppercase mt-2">Месяц + Рейтинг</p>
               </div>
            </div>

            <div className="space-y-3">
                <div className="grid gap-2">
                  <div className="space-y-1"><label className="text-[7px] font-black text-slate-600 uppercase ml-2 tracking-widest">Школа (Модальность)</label><select value={selectedModality} onChange={(e) => setSelectedModality(e.target.value)} className="w-full p-3 glass-card rounded-xl text-[11px] font-bold appearance-none text-white outline-none shadow-lg">{Object.keys(MODALITIES).map(k => <option key={k} value={k} className="bg-slate-900">{MODALITIES[k].name}</option>)}</select></div>
                  <div className="space-y-1"><label className="text-[7px] font-black text-slate-600 uppercase ml-2 tracking-widest">Кейс клиента</label><select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="w-full p-3 glass-card rounded-xl text-[11px] font-bold appearance-none text-white outline-none shadow-lg">{CLIENT_DATABASE.map(c => <option key={c.id} value={c.id} className="bg-slate-900">{c.avatar} {c.name}</option>)}</select></div>
                </div>

                <div className="glass-card rounded-[2.5rem] p-5 relative overflow-hidden group shadow-xl">
                  <div className="absolute -top-4 -right-4 text-[100px] opacity-[0.03] pointer-events-none leading-none">{currentClient.avatar}</div>
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <span className="text-4xl drop-shadow-xl">{currentClient.avatar}</span>
                    <div>
                      <h4 className="text-lg font-black text-white leading-none">{currentClient.name}, {currentClient.age} л.</h4>
                      <p className="text-[8px] font-black uppercase text-indigo-400 mt-1.5 tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-full w-fit">Verified Case</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 relative z-10 border-b border-white/5 pb-4">
                     <div className="space-y-0.5"><span className="text-[6px] font-black text-slate-500 uppercase">Профессия</span><p className="text-[10px] font-bold text-white truncate">{currentClient.profession}</p></div>
                     <div className="space-y-0.5 text-right"><span className="text-[6px] font-black text-slate-500 uppercase">Статус</span><p className="text-[10px] font-bold text-white truncate">{currentClient.status}</p></div>
                     <div className="space-y-0.5"><span className="text-[6px] font-black text-slate-500 uppercase">Семья</span><p className="text-[10px] font-bold text-white truncate">{currentClient.familyStatus}</p></div>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Запрос клиента:</span>
                    <p className="text-[12px] text-slate-300 italic leading-snug border-l-2 border-indigo-500/30 pl-3">"{currentClient.bio}"</p>
                  </div>
                </div>

                <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Здравствуйте", true); }} className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 py-4 rounded-[2rem] font-black uppercase text-[9px] tracking-[0.2em] shadow-xl active:scale-95 transition-all text-white">Начать сессию</button>
            </div>
          </div>
        )}

        {/* CHAT */}
        {screen === 'chat' && (
          <div className="flex-1 flex flex-col relative">
            <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar pb-32">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom duration-200`}>
                  {m.role === 'hint' ? (
                    <div className="w-full bg-orange-600/10 border border-orange-500/20 rounded-[16px] p-4 my-1 flex gap-3 shadow-md text-left">
                      <div className="w-8 h-8 bg-orange-600 rounded-lg flex-shrink-0 flex items-center justify-center text-lg">🎓</div>
                      <div className="flex-1"><h5 className="text-[8px] font-black uppercase text-orange-400 tracking-widest">Супервизор</h5><p className="text-[12px] font-bold text-orange-50/90 italic">"{m.content}"</p></div>
                    </div>
                  ) : m.role === 'report' ? (
                    <div className="w-full bg-slate-950/80 backdrop-blur-2xl border border-indigo-500/30 rounded-[3rem] p-6 text-center text-white">
                        <Icons.Trophy className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-indigo-300">Аудит завершен</h3>
                        <p className="bg-white/5 p-4 rounded-2xl my-4 text-xs italic text-slate-300">"{m.data?.expert_comment || 'Анализ готов.'}"</p>
                        <button onClick={() => setScreen('hub')} className="w-full py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase shadow-xl">Вернуться в Хаб</button>
                    </div>
                  ) : (
                    <div className={`max-w-[90%] p-3.5 text-[14px] shadow-md leading-snug text-left text-white ${m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`} dangerouslySetInnerHTML={{ __html: marked.parse(m.content || "") }} />
                  )}
                </div>
              ))}
              {isTyping && <div className="flex gap-2 p-3 bg-slate-900/50 rounded-2xl w-fit animate-pulse"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-75" /></div>}
              {errorLog && <div className="w-full text-center py-2 text-[9px] font-black uppercase text-red-500 bg-red-500/10 rounded-xl px-4">{errorLog}</div>}
              <div ref={chatEndRef} />
            </div>
            
            <footer className="absolute bottom-0 w-full p-4 bg-slate-950/98 backdrop-blur-2xl border-t border-white/5 z-50">
              <div className="flex gap-2 mb-3">
                {role === 'psychologist' && <button onClick={() => handleSend("Дай совет", false, 'get_hint')} className="flex-1 bg-orange-600/10 border border-orange-500/20 py-2.5 rounded-lg text-[8px] font-black uppercase text-orange-400 active:scale-95 transition-all">💡 Совет</button>}
                <button onClick={finishSession} className="flex-1 bg-emerald-600/10 border border-emerald-500/20 py-2.5 rounded-lg text-[8px] font-black uppercase text-emerald-400 active:scale-95 transition-all">🏁 Финиш</button>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-1 shadow-inner focus-within:ring-1 focus-within:ring-indigo-500/30 overflow-hidden">
                <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Ответ..." rows={1} className="flex-1 bg-transparent border-none outline-none text-xs py-2.5 px-3 text-white resize-none" />
                <button onClick={() => handleSend()} className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0 active:scale-90 transition-all shadow-lg"><Icons.Send className="w-4 h-4 text-white" /></button>
              </div>
            </footer>
          </div>
        )}

        {/* AGGREGATOR */}
        {screen === 'aggregator' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar animate-in slide-in-from-right duration-500 pb-28 text-left">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Витрина Мастеров</h2>
            <div className="grid gap-4">
              {psychologists.length > 0 ? psychologists.map((p, idx) => (
                <div key={idx} className={`p-5 rounded-[2.5rem] border glass-card shadow-2xl relative overflow-hidden transition-all active:scale-[0.98] ${p.isVip ? 'border-indigo-500/40' : 'border-white/5'}`}>
                  {p.isVip && <div className="absolute top-0 right-0 bg-indigo-600 text-white px-5 py-2 rounded-bl-[1.5rem] text-[8px] font-black uppercase flex items-center gap-1 shadow-xl tracking-widest leading-none">VIP</div>}
                  <div className="flex gap-4 items-start text-white">
                    <div className="w-16 h-16 bg-slate-800 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center text-3xl border border-white/5 relative shadow-inner overflow-hidden">
                      {p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover" /> : '👤'}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-lg font-black leading-none">{p.name}</h4>
                      <div className="flex gap-1.5 items-center flex-wrap">
                        <span className="bg-white/5 px-2 py-0.5 rounded-lg text-[7px] font-bold uppercase text-slate-400">Стаж {p.experience} л.</span>
                        <span className="bg-indigo-500/10 px-2 py-0.5 rounded-lg text-[7px] font-black uppercase text-indigo-300">Rating {p.skillRating}%</span>
                      </div>
                      <p className="text-[11px] text-slate-400 italic line-clamp-2 mt-2 leading-relaxed opacity-80">"{p.methods}"</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex flex-col">
                      <span className="text-[7px] text-slate-500 font-black uppercase tracking-widest">Цена сессии</span>
                      <span className="text-xl font-black tracking-tighter mt-1">{p.price}₽</span>
                    </div>
                    <button className="bg-indigo-600 px-6 py-2.5 rounded-[1.2rem] text-[8px] font-black uppercase tracking-[0.1em] shadow-xl active:scale-95 transition-all">Записаться</button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 opacity-30 italic text-xs">Загружаем список специалистов...</div>
              )}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {screen === 'profile' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-28 text-left text-white animate-in slide-in-from-bottom duration-500">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Личный Кабинет</h2>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-3 block">Фото профиля</label>
                <div onClick={() => fileInputRef.current.click()} className="w-full h-32 glass-card rounded-[2.5rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all relative overflow-hidden group shadow-2xl">
                  {userProfile.photoUrl ? <img src={userProfile.photoUrl} className="w-full h-full object-cover" /> : <><Icons.Camera className="w-8 h-8 text-slate-600 mb-2" /><span className="text-[10px] font-bold text-slate-500">Загрузить портрет</span></>}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-3 block">Видео-визитка (Premium)</label>
                <VideoRecorder onUpload={(v) => setUserProfile({...userProfile, videoUrl: v})} setErrorLog={setErrorLog} />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5 px-3">
                  <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block">Имя Специалиста</label>
                  <input type="text" className="w-full p-4 glass-card border-none rounded-xl text-sm font-bold outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xl transition-all text-white bg-transparent" value={userProfile.name} onChange={(e) => setUserProfile({...userProfile, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3 px-3">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block">Стаж (лет)</label>
                    <input type="number" className="w-full p-4 glass-card border-none rounded-xl text-sm font-bold outline-none shadow-2xl text-white bg-transparent" value={userProfile.experience} onChange={(e) => setUserProfile({...userProfile, experience: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block">Цена ₽</label>
                    <input type="number" className="w-full p-4 glass-card border-none rounded-xl text-sm font-bold outline-none shadow-2xl text-white bg-transparent" value={userProfile.price} onChange={(e) => setUserProfile({...userProfile, price: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-1.5 px-3">
                  <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block">Методы работы</label>
                  <textarea rows={4} className="w-full p-4 glass-card border-none rounded-xl text-sm font-bold outline-none resize-none shadow-2xl text-white bg-transparent" value={userProfile.methods} onChange={(e) => setUserProfile({...userProfile, methods: e.target.value})} />
                </div>
              </div>

              <button onClick={saveProfile} className="w-full bg-indigo-600 py-6 rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl active:scale-95 transition hover:bg-indigo-500 border border-white/10 text-white">Сохранить Профиль</button>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER NAV (Fixed) */}
      {(screen === 'hub' || screen === 'setup' || screen === 'client_hub' || screen === 'aggregator' || screen === 'profile') && (
        <nav className="h-16 bg-slate-950/95 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-2 pb-2 shadow-2xl z-50 text-white">
           <button onClick={() => setScreen('hub')} className={`flex flex-col items-center gap-1 transition-all ${screen === 'hub' ? 'text-indigo-400' : 'text-slate-600'}`}>
             <Icons.Infinity className="w-5 h-5" /><span className="text-[7px] font-black uppercase tracking-widest leading-none">Главная</span>
           </button>
           <button onClick={() => { setScreen('setup'); setRole('psychologist'); }} className={`flex flex-col items-center gap-1 transition-all ${screen === 'setup' ? 'text-emerald-400' : 'text-slate-600'}`}>
             <Icons.Sparkles className="w-5 h-5" /><span className="text-[7px] font-black uppercase tracking-widest leading-none">Мастерская</span>
           </button>
           <button onClick={() => setScreen('aggregator')} className={`flex flex-col items-center gap-1 transition-all ${screen === 'aggregator' ? 'text-purple-400' : 'text-slate-600'}`}>
             <Icons.Search className="w-5 h-5" /><span className="text-[7px] font-black uppercase tracking-widest leading-none">Мастера</span>
           </button>
           <button onClick={() => setScreen('profile')} className={`flex flex-col items-center gap-1 transition-all ${screen === 'profile' ? 'text-indigo-400' : 'text-slate-600'}`}>
             <Icons.User className="w-5 h-5" /><span className="text-[7px] font-black uppercase tracking-widest leading-none">Профиль</span>
           </button>
        </nav>
      )}

    </div>
  );
}
