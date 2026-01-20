import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

/**
 * CONNECTUM PRO v21.18 - ULTIMATE PLATINUM MONOLITH (STABLE)
 * ========================================================
 * 🎨 DESIGN: "Premium AI Studio" Style (Deep Slate, Glass, Neon).
 * 🧠 LOGIC: 30 Clients Database, Difficulty Matrix, Hybrid AI Sync.
 * 🎙️ AUDIO: MsEdge TTS Support (Auto-play data.voice).
 * 📱 UX: Premium Icons, Shine Effect, UI Optimization.
 */

// --- 1. PREMIUM ICONS SYSTEM ---
const Icons = {
  Infinity: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="infGrad" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <path d="M12 12c-2.5-3.5-7-3.5-9 0s6.5 10.5 9 0c2.5-3.5 7-3.5 9 0s-6.5 10.5-9 0Z" stroke="url(#infGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Search: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" stroke="currentColor" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  User: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20a6 6 0 0 0-12 0" />
      <circle cx="12" cy="10" r="4" />
      <circle cx="12" cy="12" r="10" strokeOpacity="0.1" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 8l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" fill="currentColor" />
    </svg>
  ),
  Diamond: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="diamGradPremium" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d="M6 4h12l4 5-10 11L2 9l4-5Z" stroke="url(#diamGradPremium)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 20V9M2 9h20M6 4l6 5 6-5" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
    </svg>
  ),
  ChevronLeft: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
  Send: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  ),
  Trophy: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  Camera: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  )
};

// --- 2. FULL CLIENT DATABASE (30 ITEMS) ---
const CLIENT_DATABASE = [
  { id: "c1", name: "Виктория", age: 34, profession: "Маркетолог", status: "Средний класс", avatar: "👩‍💻", bio: "Парализующий саботаж при записи видео. Страх проявления зашкаливает. В теле — зажим в горле." },
  { id: "c2", name: "Артем", age: 28, profession: "IT-разработчик", status: "Высокий доход", avatar: "👨‍🎨", bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным. Тяжесть в плечах." },
  { id: "c3", name: "Елена", age: 42, profession: "Бухгалтер", status: "Стабильный доход", avatar: "👩‍💼", bio: "Постоянное сжатие в груди и тревога. Не могу переключиться с работы на отдых." },
  { id: "c4", name: "Михаил", age: 31, profession: "Фрилансер", status: "Нестабильный", avatar: "👨🏻", bio: "Сменил 5 профессий за 2 года. Нигде не находит признания, чувствует себя неудачником." },
  { id: "c5", name: "Анна", age: 25, profession: "Студентка", status: "Студент", avatar: "👩🏼", bio: "Не может завершить разрушительные отношения. Боится одиночества до тошноты." },
  { id: "c6", name: "Игорь", age: 45, profession: "Топ-менеджер", status: "VIP", avatar: "👨🏻‍💼", bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе и холод." },
  { id: "c7", name: "Ольга", age: 38, profession: "Врач", status: "Бюджетник", avatar: "👩🏻", bio: "Ипохондрия. Паника при малейшем физическом дискомфорте." },
  { id: "c8", name: "Дмитрий", age: 29, profession: "Продавец", status: "Базовый", avatar: "🧔🏻", bio: "Боится встреч. Напряжение в скулах и зажим речи." },
  { id: "c9", name: "Мария", age: 33, profession: "Домохозяйка", status: "Обеспеченная", avatar: "👩‍🍼", bio: "Материнская вина. Ощущение, что она плохая мать. Не может вздохнуть." },
  { id: "c10", name: "Сергей", age: 50, profession: "Предприниматель", status: "Кризис капитала", avatar: "👨🏻‍🦳", bio: "Банкротство бизнеса. Колоссальный стыд перед семьей." },
  { id: "c11", name: "Юлия", age: 27, profession: "Модель", status: "Средний", avatar: "👩🏻", bio: "РПП. Ненавидит свое отражение. Постоянный контроль веса." },
  { id: "c12", name: "Андрей", age: 35, profession: "Архитектор", status: "Средний+", avatar: "👨🏿", bio: "Вспышки неконтролируемого гнева. Ощущение кипятка в груди." },
  { id: "c13", name: "Наталья", age: 40, profession: "Учитель", status: "Базовый", avatar: "👩‍💼", bio: "Одиночество в толпе. Живет как за толстым стеклом." },
  { id: "c14", name: "Павел", age: 22, profession: "Курьер", status: "Низкий", avatar: "👱🏻", bio: "Зависимость от мнения родителей. Не может принять решение." },
  { id: "c15", name: "Екатерина", age: 36, profession: "HR-директор", status: "Высокий", avatar: "👩‍🏫", bio: "Выгорание. Перфекционизм. Жжение в глазах от истощения." },
  { id: "c16", name: "Александр", age: 44, profession: "Инженер", status: "Средний", avatar: "👨🏻", bio: "Застрял в горе. Чувствует вину перед ушедшим близким." },
  { id: "c17", name: "Светлана", age: 30, profession: "Бьюти-мастер", status: "Средний", avatar: "👩🏼", bio: "Низкая самооценка. Считает себя 'недостаточной' для любви." },
  { id: "c18", name: "Роман", age: 32, profession: "Аналитик", status: "Средний", avatar: "👨🏿‍💻", bio: "Игровая зависимость. Уход от реальности в виртуальный мир." },
  { id: "c19", name: "Ирина", age: 48, profession: "Юрист", status: "Высокий", avatar: "👵🏼", bio: "Синдром пустого гнезда. Смысл жизни пропал." },
  { id: "c20", name: "Кирилл", age: 26, profession: "Дизайнер", status: "Фриланс", avatar: "👦🏻", bio: "Агорафобия. Боится выходить на открытые пространства." },
  { id: "c21", name: "Татьяна", age: 55, profession: "Пенсионерка", status: "Базовый", avatar: "👩🏻‍🦱", bio: "Кризис старения. Ощущение, что время уходит впустую." },
  { id: "c22", name: "Виктор", age: 39, profession: "Водитель", status: "Средний", avatar: "🧔", bio: "Переживает измену. Колючая проволока вокруг сердца." },
  { id: "c23", name: "Алина", age: 24, profession: "Бариста", status: "Начинающий", avatar: "👩‍🎓", bio: "Не умеет говорить 'нет'. Чувствует, что все ею пользуются." },
  { id: "c24", name: "Денис", age: 37, profession: "Охранник", status: "Базовый", avatar: "👨🏻", bio: "Навязчивые мысли о здоровье. Постоянные проверки." },
  { id: "c25", name: "Людмила", age: 60, profession: "Педагог", status: "Пенсия", avatar: "👵", bio: "Конфликт с невесткой. Чувствует себя ненужной и лишней." },
  { id: "c26", name: "Максим", age: 21, profession: "Блогер", status: "Нестабильный", avatar: "👦🏼", bio: "Подростковый бунт против системы. Ничего не хочет делать." },
  { id: "c27", name: "Валерия", age: 31, profession: "Стилист", status: "Средний", avatar: "👩🏻‍🦰", bio: "Болезненная ревность. Постоянный поиск улик измены." },
  { id: "c28", name: "Станислав", age: 43, profession: "Адвокат", status: "Высокий", avatar: "👨🏻‍💼", bio: "Трудоголизм. Не умеет расслабляться без алкоголя." },
  { id: "c29", name: "Евгения", age: 29, profession: "Копирайтер", status: "Средний", avatar: "👩🏻", bio: "Страх перемен. Боится менять работу, даже если там плохо." },
  { id: "c30", name: "Константин", age: 35, profession: "Финансист", status: "Высокий", avatar: "👨🏻", bio: "Эмоциональная холодность. Не понимает, что чувствует." }
];

const MODALITIES = {
  mpt: { id: "mpt", name: "МПТ (Мета-персональная терапия)", color: "indigo" },
  cbt: { id: "cbt", name: "КПТ (Когнитивно-поведенческая терапия)", color: "emerald" },
  gestalt: { id: "gestalt", name: "Гештальт-терапия", color: "purple" },
  eit: { id: "eit", name: "ЭОТ (Эмоционально-образная терапия)", color: "amber" },
  ta: { id: "ta", name: "Транзактный анализ", color: "cyan" }
};

// --- 3. STYLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
    :root { --bg-deep: #020617; --card-glass: rgba(15, 23, 42, 0.6); --card-border: rgba(255, 255, 255, 0.08); }
    body { font-family: 'Manrope', sans-serif; background-color: var(--bg-deep); color: #f8fafc; overflow: hidden; margin: 0; }
    .btn-magnetic { position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
    .btn-magnetic::after { content: ""; position: absolute; top: -50%; left: -60%; width: 20%; height: 200%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent); transform: rotate(35deg); transition: all 0.6s ease; }
    .btn-magnetic:hover::after { left: 120%; }
    .mesh-bg { position: fixed; inset: 0; z-index: -1; background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.12), transparent 50%), radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.08), transparent 50%); filter: blur(80px); }
    .glass-card { background: var(--card-glass); backdrop-filter: blur(24px); border: 1px solid var(--card-border); }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .animate-in { animation: fadeIn 0.5s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .loader-dots div { width: 8px; height: 8px; background: #6366f1; border-radius: 50%; animation: bounce 0.6s infinite alternate; }
    .loader-dots div:nth-child(2) { animation-delay: 0.2s; }
    .loader-dots div:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce { to { transform: translateY(-8px); opacity: 0.3; } }
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
    <div className="glass-card rounded-3xl p-1 overflow-hidden relative group my-4 shadow-2xl">
      <div className="aspect-video bg-black/50 rounded-2xl flex items-center justify-center">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover rounded-2xl" />
        {!recording && <div className="absolute inset-0 flex items-center justify-center bg-black/20"><Icons.Camera className="w-8 h-8 text-white/30"/></div>}
        {recording && <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full"><div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"/> <span className="text-[10px] font-black text-white uppercase tracking-widest">REC</span></div>}
      </div>
      <button onClick={() => recording ? mediaRecorder.current.stop() : startStream()} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 active:scale-95 transition-all shadow-xl">
        {recording ? 'Завершить' : 'Записать визитку'}
      </button>
    </div>
  );
};

// --- 5. MAIN APP ---

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
  const [userProfile, setUserProfile] = useState({ name: '', experience: 0, price: 0, photoUrl: null });
  const [gems, setGems] = useState(5);
  const [notification, setNotification] = useState(null);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const tg = window.Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id?.toString() || 'dev_platinum';

  // Разблокировка аудио для iOS
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

  const showToast = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserProfile(prev => ({...prev, photoUrl: reader.result}));
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (text = inputText, isInitial = false, action = 'chat', flow = null) => {
    if (isInitial) unlockAudio();
    if (!text && !isInitial) return;
    if (!isInitial && action === 'chat') setMessages(p => [...p, { role: 'user', content: text }]);
    setInputText(''); 
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userId, message: text, modalityId: selectedModality, action, 
            selectedClientId, role, flow, difficulty,
            history: messages.filter(m => m.role !== 'hint').slice(-8) 
        })
      });
      const data = await res.json();
      if(action === 'get_hint') setMessages(p => [...p, { role: 'hint', content: data.hint }]);
      else if(data.content) {
          setMessages(p => [...p, { role: 'ai', content: data.content, voice: data.voice }]);
          if(data.voice) {
            const audio = new Audio(`data:audio/mp3;base64,${data.voice}`);
            audio.play().catch(e => console.error("Voice play blocked", e));
          }
      }
    } catch(e) { 
      showToast("Сбой связи с ИИ");
    } finally {
      setIsTyping(false);
    }
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

  const requestWaitlist = (tariff) => {
    fetch('/api/waitlist', { 
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body:JSON.stringify({userId, role: role || 'psychologist', tariff}) 
    }).then(() => {
        if (tg?.showPopup) {
            tg.showPopup({ title: 'Заявка принята', message: 'Мы свяжемся с вами для активации доступа.' });
        } else {
            showToast("Заявка принята!");
        }
    }).catch(() => showToast("Ошибка сервера"));
  };

  const acceptLegal = () => { localStorage.setItem('connectum_legal', 'true'); setScreen('hub'); };
  const currentClient = CLIENT_DATABASE.find(c => c.id === selectedClientId) || CLIENT_DATABASE[0];

  if (screen === 'loading') return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#020617]">
      <GlobalStyles /><div className="mesh-bg" />
      <div className="relative">
        <Icons.Infinity className="w-20 h-20 animate-[pulse_2s_infinite]" />
        <div className="absolute inset-0 bg-indigo-500/20 blur-2xl animate-pulse rounded-full"></div>
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 mt-12 animate-pulse">Connectum Pro Platinum</span>
    </div>
  );

  return (
    <div className="flex flex-col h-[100dvh] bg-[#020617] text-slate-100 overflow-hidden relative">
      <GlobalStyles /><div className="mesh-bg" />

      {/* TOAST NOTIFICATION */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-indigo-600/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 text-[10px] font-black uppercase tracking-widest shadow-2xl animate-in">
          {notification}
        </div>
      )}

      {/* HEADER */}
      {screen !== 'hub' && screen !== 'legal' && (
        <header className="flex-shrink-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-5 z-50">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen('hub')} className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center active:scale-90 transition shadow-inner">
              <Icons.ChevronLeft className="w-5 h-5 text-slate-400"/>
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">Connectum</span>
              <span className="text-[7px] font-bold text-slate-600 uppercase mt-1 tracking-tighter">Platinum v21.18</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-2xl border border-indigo-500/20 shadow-lg shadow-indigo-500/5 active:scale-95 transition">
            <span className="text-[11px] font-black text-indigo-300 tracking-tighter">{gems}/5</span>
            <Icons.Diamond className="w-4 h-4 text-indigo-400" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden relative z-10 flex flex-col">
        
        {/* 0. LEGAL */}
        {screen === 'legal' && (
           <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-in">
              <div className="glass-card p-10 rounded-[3rem] max-w-sm border-t border-white/10 shadow-3xl">
                  <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"><Icons.User className="w-10 h-10 text-indigo-400"/></div>
                  <h2 className="text-2xl font-black mb-4 text-white tracking-tight uppercase">Соглашение</h2>
                  <p className="text-xs text-slate-400 mb-10 leading-relaxed font-medium">Для доступа к экосистеме Connectum вы должны быть старше 18 лет и согласны с обработкой данных нейросетями.</p>
                  <button onClick={acceptLegal} className="w-full py-5 bg-indigo-600 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-600/30 active:scale-95 transition">Начать практику</button>
              </div>
           </div>
        )}

        {/* 1. HUB */}
        {screen === 'hub' && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-12 animate-in">
            <div className="flex flex-col items-center gap-8">
               <div className="relative group">
                 <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                 <Icons.Infinity className="w-24 h-24 relative z-10 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
               </div>
               <div className="space-y-2">
                 <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Connectum</h1>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.8em] opacity-80">Evolution of Mind</p>
               </div>
            </div>
            
            <div className="w-full grid gap-6 max-w-sm">
                <button onClick={() => { unlockAudio(); setScreen('client_hub'); setRole('client'); }} className="btn-magnetic w-full p-9 glass-card rounded-[2.8rem] flex items-center gap-8 active:scale-[0.97] text-left relative overflow-hidden group shadow-3xl">
                    <div className="absolute -bottom-2 -right-2 font-black text-6xl text-white opacity-[0.03] uppercase pointer-events-none tracking-tighter">Client</div>
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-4xl z-10 shadow-inner group-hover:scale-110 transition-transform">🤝</div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">Я Клиент</h3>
                      <p className="text-[9px] font-bold text-slate-500 uppercase mt-1.5 tracking-widest">Диагностика • Помощь</p>
                    </div>
                </button>
                
                <button onClick={() => { unlockAudio(); setScreen('setup'); setRole('psychologist'); }} className="btn-magnetic w-full p-9 glass-card rounded-[2.8rem] flex items-center gap-8 active:scale-[0.97] text-left relative overflow-hidden group shadow-3xl">
                    <div className="absolute -bottom-2 -right-2 font-black text-6xl text-white opacity-[0.03] uppercase pointer-events-none tracking-tighter">Pro</div>
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-4xl z-10 shadow-inner group-hover:scale-110 transition-transform">🧠</div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">Я Психолог</h3>
                      <p className="text-[9px] font-bold text-slate-500 uppercase mt-1.5 tracking-widest">Тренажер • Обучение</p>
                    </div>
                </button>
            </div>
            
            <div className="flex justify-center gap-14 mt-auto pb-6 opacity-50 hover:opacity-100 transition-opacity">
                <a href="https://t.me/psy_connectum" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors">Канал</a>
                <a href="https://t.me/lazalex81" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors">Support</a>
            </div>
          </div>
        )}

        {/* 2. CLIENT HUB */}
        {screen === 'client_hub' && (
           <div className="flex-1 overflow-y-auto p-6 space-y-7 no-scrollbar pb-28 text-left animate-in">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Хаб Помощи</h2>
              
              <div className="p-10 bg-gradient-to-br from-indigo-600/30 to-indigo-900/50 rounded-[3rem] border border-indigo-500/20 flex justify-between items-center relative overflow-hidden group active:scale-[0.98] transition shadow-4xl">
                  <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-1000"><Icons.Diamond className="w-56 h-56"/></div>
                  <div className="relative z-10"><h4 className="text-xs font-black uppercase text-indigo-300 tracking-[0.3em]">Client Premium</h4><p className="text-[11px] font-bold text-indigo-100/60 mt-2 uppercase tracking-tight leading-none">ИИ-терапия 24/7 • Приоритет</p></div>
                  <div className="relative z-10 text-right"><span className="text-3xl font-black text-white">1990₽</span><button onClick={()=>requestWaitlist('client_premium')} className="block bg-indigo-500 hover:bg-indigo-400 text-[10px] font-black uppercase px-8 py-3.5 rounded-2xl mt-4 shadow-2xl active:scale-95 transition">Купить</button></div>
              </div>

              <div className="grid gap-5">
                  {[
                    {id: 'diagnostics', icon: "🔍", title: "ИИ-Диагностика", sub: "Найти корень боли", color: "indigo", msg: "Начать диагностику"},
                    {id: 'therapy', icon: "✨", title: "ИИ-Психолог", sub: "Поддержка в моменте", color: "emerald", msg: "Мне нужна помощь"},
                    {id: 'aggregator', icon: "👥", title: "Витрина Мастеров", sub: "Выбрать специалиста", color: "purple", msg: null}
                  ].map(btn => (
                    <button key={btn.id} onClick={() => { if(btn.id==='aggregator') setScreen('aggregator'); else { setScreen('chat'); setMessages([]); handleSend(btn.msg, true, 'chat', btn.id); }}} className={`p-8 glass-card rounded-[2.5rem] flex items-center gap-7 active:scale-95 text-left border-l-4 border-${btn.color}-500 group transition-all shadow-2xl`}>
                        <div className={`w-16 h-16 bg-${btn.color}-500/10 rounded-2xl flex items-center justify-center text-4xl text-${btn.color}-400 group-hover:rotate-12 transition-transform shadow-inner`}>{btn.icon}</div>
                        <div><h4 className="text-lg font-black text-white uppercase tracking-tight">{btn.title}</h4><p className="text-[11px] font-bold text-slate-500 uppercase mt-1 tracking-tight opacity-70">{btn.sub}</p></div>
                    </button>
                  ))}
              </div>
              
              <div className="text-center text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] bg-indigo-500/5 p-6 rounded-3xl border border-indigo-500/10 shadow-xl mt-6">Приведи друга = +3 💎 к балансу</div>
           </div>
        )}

        {/* 3. SETUP (Psychologist) */}
        {screen === 'setup' && (
           <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-28 text-left animate-in">
               <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Мастерская</h2>
               
               <div className="flex gap-4">
                   <div onClick={()=>requestWaitlist('test_drive')} className="flex-1 p-6 glass-card rounded-[2.5rem] border-l-4 border-orange-500 active:scale-95 transition cursor-pointer shadow-2xl"><h5 className="text-[10px] font-black uppercase text-orange-400 tracking-widest leading-none">Тест-драйв</h5><p className="text-2xl font-black mt-3 text-white">490₽</p></div>
                   <div onClick={()=>requestWaitlist('pro')} className="flex-1 p-6 bg-indigo-600/10 border border-white/5 rounded-[2.5rem] border-l-4 border-indigo-600 active:scale-95 transition cursor-pointer shadow-2xl"><h5 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest leading-none">PRO Доступ</h5><p className="text-2xl font-black mt-3 text-white">2990₽</p></div>
               </div>

               <div className="space-y-7">
                   <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-[0.3em]">Сложность сессии</label>
                     <div className="flex p-1.5 bg-white/5 rounded-3xl border border-white/5 shadow-inner">
                        {[1, 2, 3].map(lvl => (
                            <button key={lvl} onClick={() => setDifficulty(lvl)} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase transition-all duration-300 ${difficulty === lvl ? (lvl===1?'bg-emerald-600 shadow-xl':lvl===2?'bg-indigo-600 shadow-xl':'bg-rose-600 shadow-xl') : 'text-slate-500 hover:text-slate-300'}`}>{lvl===1?'Лайт':lvl===2?'Норма':'Хард'}</button>
                        ))}
                     </div>
                   </div>
                   
                   <div className="grid gap-6">
                       <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-[0.3em]">Модальность</label><select value={selectedModality} onChange={(e) => setSelectedModality(e.target.value)} className="w-full p-6 glass-card rounded-[2rem] text-sm font-bold text-white outline-none appearance-none focus:border-indigo-500 transition shadow-2xl">{Object.keys(MODALITIES).map(k => <option key={k} value={k} className="bg-slate-950">{MODALITIES[k].name}</option>)}</select></div>
                       <div className="space-y-2"><label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-[0.3em]">Клиент (30 досье)</label><select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="w-full p-6 glass-card rounded-[2rem] text-sm font-bold text-white outline-none appearance-none focus:border-indigo-500 transition shadow-2xl">{CLIENT_DATABASE.map(c => <option key={c.id} value={c.id} className="bg-slate-950">{c.name} ({c.profession})</option>)}</select></div>
                   </div>

                   <div className="glass-card rounded-[3rem] p-10 relative overflow-hidden shadow-4xl border-t border-white/10 group">
                       <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:w-2 transition-all"></div>
                       <div className="flex items-center gap-6 mb-8">
                           <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-5xl shadow-inner border border-white/5">{currentClient.avatar}</div>
                           <div><h4 className="text-2xl font-black text-white leading-none tracking-tight">{currentClient.name}, {currentClient.age}</h4><p className="text-[11px] font-black uppercase text-indigo-400 mt-3 opacity-80 tracking-widest">{currentClient.status}</p></div>
                       </div>
                       <div className="text-[15px] text-slate-300 italic leading-relaxed border-l-2 border-indigo-500/30 pl-6 py-2">"{currentClient.bio}"</div>
                   </div>
                   
                   <button onClick={() => { setScreen('chat'); setMessages([]); handleSend("Здравствуйте", true); }} className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 py-7 rounded-[2.5rem] font-black uppercase text-[12px] tracking-[0.5em] shadow-3xl active:scale-95 text-white transition-all transform hover:-translate-y-1">НАЧАТЬ СЕССИЮ</button>
               </div>
           </div>
        )}

        {/* 4. CHAT */}
        {screen === 'chat' && (
           <div className="flex-1 flex flex-col relative h-full animate-in">
               <div className="flex-1 overflow-y-auto p-6 space-y-7 no-scrollbar pb-44 text-left">
                   {messages.map((m, i) => (
                       <div key={i} className={`flex flex-col ${m.role==='user'?'items-end':'items-start'} animate-in`}>
                           {m.role === 'hint' ? (
                               <div className="bg-orange-500/10 border border-orange-500/20 p-7 rounded-[2rem] flex gap-6 max-w-[95%] backdrop-blur-md border-l-4 border-l-orange-500 shadow-2xl">
                                 <div className="text-3xl pt-1">🎓</div><div><h5 className="text-[10px] font-black uppercase text-orange-400 mb-2 tracking-[0.2em]">Супервизор</h5><p className="text-[14px] text-orange-50/90 font-medium italic leading-relaxed">"{m.content}"</p></div></div>
                           ) : (
                               <div className={`max-w-[90%] p-6 text-[15px] leading-relaxed font-medium shadow-2xl ${m.role==='user'?'bg-indigo-600 text-white rounded-[2rem_2rem_0.5rem_2rem]':'bg-slate-800/80 backdrop-blur-sm border border-white/5 text-slate-50 rounded-[2rem_2rem_2rem_0.5rem]'}`} dangerouslySetInnerHTML={{__html: marked.parse(m.content||"")}}/>
                           )}
                       </div>
                   ))}
                   {isTyping && (
                    <div className="flex gap-3 p-5 bg-slate-800/50 rounded-[2rem] w-fit border border-white/5 shadow-xl">
                      <div className="loader-dots flex gap-1.5"><div></div><div></div><div></div></div>
                    </div>
                   )}
                   <div ref={chatEndRef} />
               </div>
               
               <footer className="absolute bottom-0 w-full p-6 bg-slate-950/90 backdrop-blur-3xl border-t border-white/5 z-50">
                   <div className="flex gap-4 mb-6">
                       {role === 'psychologist' && <button onClick={() => handleSend("Дай совет", false, 'get_hint')} className="flex-1 py-5 bg-orange-600/15 border border-orange-500/20 rounded-2xl text-[11px] font-black uppercase text-orange-400 active:scale-95 transition flex items-center justify-center gap-3 tracking-widest shadow-xl"><Icons.Sparkles className="w-4 h-4"/> Совет</button>}
                       <button onClick={() => { if(confirm("Завершить тренировку?")) setScreen('hub'); }} className="flex-1 py-5 bg-emerald-600/15 border border-emerald-500/20 rounded-2xl text-[11px] font-black uppercase text-emerald-400 active:scale-95 transition tracking-widest shadow-xl">🏁 Финиш</button>
                   </div>
                   <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-[2.5rem] p-2 pr-4 focus-within:ring-2 ring-indigo-500/30 transition-all shadow-inner">
                       <textarea value={inputText} onChange={e=>setInputText(e.target.value)} rows={1} className="flex-1 bg-transparent border-none outline-none text-[15px] px-5 py-4 text-white placeholder:text-slate-600 resize-none font-medium no-scrollbar" placeholder="Ваша интервенция..." onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}} />
                       <button onClick={()=>handleSend()} className="w-12 h-12 bg-indigo-600 rounded-[1.4rem] flex items-center justify-center active:scale-90 transition shadow-2xl shadow-indigo-600/40"><Icons.Send className="w-6 h-6 text-white"/></button>
                   </div>
               </footer>
           </div>
        )}

        {/* 5. AGGREGATOR */}
        {screen === 'aggregator' && (
           <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-32 text-left animate-in">
               <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Мастера</h2>
               <div className="grid gap-7">
                   {psychologists.length === 0 ? (
                    <div className="space-y-6">
                      {[1,2,3].map(i => <div key={i} className="h-44 glass-card rounded-[3rem] animate-pulse opacity-40"></div>)}
                      <p className="text-center text-[10px] font-black text-slate-600 uppercase tracking-widest">Синхронизация мастеров...</p>
                    </div>
                   ) : psychologists.map((p, i) => (
                       <div key={i} className={`p-8 rounded-[3rem] border bg-slate-900/60 backdrop-blur-2xl ${p.isVip ? 'border-indigo-500/50 shadow-2xl' : 'border-white/5'}`}>
                           <div className="flex gap-7 items-start">
                               <div className="w-24 h-24 bg-slate-800 rounded-[2.2rem] flex items-center justify-center text-5xl overflow-hidden border border-white/5 shadow-inner">{p.photoUrl ? <img src={p.photoUrl} className="w-full h-full object-cover"/> : '👤'}</div>
                               <div className="flex-1"><h4 className="text-2xl font-black text-white leading-tight tracking-tight">{p.name}</h4><div className="flex flex-wrap gap-2 mt-4"><span className="text-[10px] font-black uppercase bg-white/5 px-3 py-2 rounded-xl text-slate-400">Стаж {p.experience} лет</span><span className="text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-300 px-3 py-2 rounded-xl">IQ: {p.skillRating}%</span></div></div>
                           </div>
                           <div className="mt-8 flex justify-between items-center border-t border-white/5 pt-8">
                               <div><span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Сессия</span><p className="text-3xl font-black text-white leading-none mt-2">{p.price}₽</p></div>
                               <button onClick={()=>requestWaitlist('booking')} className="bg-indigo-600 hover:bg-indigo-500 px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white shadow-2xl active:scale-95 transition-all">Записаться</button>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
        )}

        {/* 6. PROFILE */}
        {screen === 'profile' && (
           <div className="flex-1 overflow-y-auto p-6 space-y-10 no-scrollbar pb-36 text-left animate-in">
               <div className="flex justify-between items-end">
                 <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Профиль</h2>
                 <span className="text-[9px] font-black uppercase text-indigo-500 tracking-[0.5em] opacity-80">Platinum Member</span>
               </div>
               
               <div className="space-y-10">
                   <div className="flex gap-8 items-center">
                       <div className="w-32 h-32 bg-white/5 rounded-[2.8rem] flex items-center justify-center border-2 border-dashed border-white/10 cursor-pointer overflow-hidden relative shadow-3xl group transition" onClick={()=>fileInputRef.current.click()}>
                           {userProfile.photoUrl ? <img src={userProfile.photoUrl} className="w-full h-full object-cover"/> : <Icons.Camera className="w-12 h-12 text-slate-700 group-hover:text-indigo-500 transition-colors"/>}
                           <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload}/>
                           <div className="absolute inset-0 bg-indigo-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"><span className="text-[10px] font-black text-white uppercase tracking-widest">Change</span></div>
                       </div>
                       <div className="flex-1 space-y-4">
                           <button onClick={()=>requestWaitlist('gems_bundle')} className="w-full py-5 bg-emerald-900/10 border border-emerald-500/20 rounded-2xl text-[10px] font-black uppercase text-emerald-400 hover:bg-emerald-500/20 transition shadow-xl shadow-emerald-500/5">Анкета = +3 💎</button>
                           <button onClick={()=>requestWaitlist('referral')} className="w-full py-5 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-[10px] font-black uppercase text-indigo-300 hover:bg-indigo-500/20 transition shadow-xl shadow-indigo-500/5">Партнерка</button>
                       </div>
                   </div>
                   
                   <VideoRecorder onUpload={(url)=>setUserProfile(prev => ({...prev, videoUrl: url}))}/>
                   
                   <div className="space-y-7 pt-8 border-t border-white/5">
                       <div className="space-y-3"><label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.3em]">Публичное Имя</label><input type="text" className="w-full p-6 glass-card rounded-[2rem] text-[16px] font-bold text-white outline-none focus:border-indigo-500 transition shadow-2xl" value={userProfile.name} onChange={e=>setUserProfile({...userProfile, name:e.target.value})}/></div>
                       <div className="flex gap-6">
                           <div className="space-y-3 flex-1"><label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.3em]">Стаж</label><input type="number" className="w-full p-6 glass-card rounded-[2rem] text-[16px] font-bold text-white outline-none focus:border-indigo-500 transition" value={userProfile.experience} onChange={e=>setUserProfile({...userProfile, experience:e.target.value})}/></div>
                           <div className="space-y-3 flex-1"><label className="text-[11px] font-black text-slate-600 uppercase ml-5 tracking-[0.3em]">Цена ₽</label><input type="number" className="w-full p-6 glass-card rounded-[2rem] text-[16px] font-bold text-white outline-none focus:border-indigo-500 transition" value={userProfile.price} onChange={e=>setUserProfile({...userProfile, price:e.target.value})}/></div>
                       </div>
                   </div>
                   
                   <button onClick={saveProfile} className="w-full py-8 bg-gradient-to-r from-indigo-600 to-indigo-900 rounded-[2.8rem] text-[13px] font-black uppercase tracking-[0.6em] text-white shadow-4xl active:scale-95 transition-all mt-6 transform hover:-translate-y-1">СОХРАНИТЬ МАСТЕРА</button>
               </div>
           </div>
        )}

      </main>

      {/* FOOTER NAVIGATION */}
      {(role !== null && screen !== 'chat' && screen !== 'legal' && screen !== 'loading') && (
        <nav className="h-[105px] bg-slate-950/95 backdrop-blur-4xl border-t border-white/5 flex justify-around items-center px-6 pb-9 z-50 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
            {[
                {id: 'hub', icon: Icons.Infinity, label: 'Хаб'},
                {id: 'setup', icon: Icons.Sparkles, label: 'PRO'},
                {id: 'aggregator', icon: Icons.Search, label: 'Поиск'},
                {id: 'profile', icon: Icons.User, label: 'Мой'}
            ].map(item => (
                <button key={item.id} onClick={()=>setScreen(item.id)} className={`flex flex-col items-center gap-3 w-16 transition-all duration-500 ${screen===item.id ? 'text-indigo-400 -translate-y-3' : 'text-slate-600 hover:text-slate-400'}`}>
                    <div className="relative">
                      <item.icon className={`w-7 h-7 ${screen===item.id ? 'drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]' : ''}`}/>
                      {screen===item.id && <div className="absolute -inset-3 bg-indigo-500/10 rounded-full blur-xl animate-pulse -z-10"/>}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest transition-opacity ${screen===item.id ? 'opacity-100' : 'opacity-40'}`}>{item.label}</span>
                </button>
            ))}
        </nav>
      )}

    </div>
  );
}
