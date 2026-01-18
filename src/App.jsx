import React, { useState, useEffect, useRef } from 'react';
import { 
  BrainCircuit, 
  MessageCircle, 
  User, 
  Zap, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Mic, 
  Send, 
  Infinity as InfinityIcon, 
  Award, 
  Target,
  Activity,
  Heart,
  Eye,
  Video,
  ExternalLink,
  Settings,
  Scale
} from 'lucide-react';
import { marked } from 'marked';

/**
 * App.jsx - Главный файл фронтенда Connectum v18.0 (React Monolith)
 * Путь: /src/App.jsx
 * --------------------------------------------------------
 * ✅ Восстановлен оригинальный текст Hub
 * ✅ Удалены лишние описания из Legal Screen
 * ✅ Ссылка на оферту над кнопкой входа
 * ✅ Адаптивный премиум-дизайн
 */

// --- БАЗА ДАННЫХ ШКОЛ ---
const MODALITIES = {
  mpt: { id: "mpt", name: "МПТ", full: "Мета-персональная терапия", icon: <Target className="w-5 h-5"/> },
  cbt: { id: "cbt", name: "КПТ", full: "Когнитивно-поведенческая", icon: <Activity className="w-5 h-5"/> },
  gestalt: { id: "gestalt", name: "Гештальт", full: "Гештальт-терапия", icon: <Eye className="w-5 h-5"/> },
  eit: { id: "eit", name: "ЭОТ", full: "Эмоционально-образная", icon: <Zap className="w-5 h-5"/> },
  psychoanalysis: { id: "psychoanalysis", name: "Психоанализ", full: "Психоанализ", icon: <Heart className="w-5 h-5"/> },
  ta: { id: "ta", name: "ТА", full: "Транзактный анализ", icon: <User className="w-5 h-5"/> }
};

// --- ПОЛНАЯ БАЗА КЛИЕНТОВ (30 КЕЙСОВ) ---
const CLIENT_DATABASE = [
    { id: "c1", name: "Виктория", age: 34, avatar: "👩‍💻", gender: "female", bio: "Чувствую парализующий саботаж при записи видео. Страх проявления зашкаливает. В теле ощущаю сильный зажим в области горла и тяжелое давление в центре груди." },
    { id: "c2", name: "Артем", age: 28, avatar: "👨‍🎨", gender: "male", bio: "Боюсь закончить масштабный заказ. Кажется, что результат будет бездарным. Свинцовая тяжесть в плечах и шее." },
    { id: "c3", name: "Елена", age: 42, avatar: "👩‍💼", gender: "female", bio: "Постоянное сжатие в груди и тревога. Не могу переключиться с работы на семью. Боюсь совершить фатальную ошибку." },
    { id: "c4", name: "Михаил", age: 31, avatar: "👨🏻", gender: "male", bio: "Сменил 5 профессий за 2 года. Нигде не находит признания, чувствует себя неудачником." },
    { id: "c5", name: "Анна", age: 25, avatar: "👩🏼", gender: "female", bio: "Не может завершить разрушительные отношения. Боится одиночества до тошноты и ватных ног." },
    { id: "c6", name: "Игорь", age: 45, avatar: "👨🏻‍💼", gender: "male", bio: "Достиг успеха, но внутри тотальная пустота. Онемение в животе, холод." },
    { id: "c7", name: "Ольга", age: 38, avatar: "👩🏻", gender: "female", bio: "Ипохондрия. Паника при малейшем покалывании. Ощущение 'дырки' в защите тела." },
    { id: "c8", name: "Дмитрий", age: 29, avatar: "🧔🏻", gender: "male", bio: "Боится звонков и встреч. Напряжение в скулах. Кажется, что все его осуждают." },
    { id: "c9", name: "Мария", age: 33, avatar: "👩‍🍼", gender: "female", bio: "Материнская вина. Не может глубоко вздохнуть рядом с ребенком." },
    { id: "c10", name: "Сергей", age: 50, avatar: "👨🏻‍🦳", gender: "male", bio: "Банкротство. Стыд перед семьей. Ощущение, что стал бесполезным." },
    { id: "c11", name: "Юлия", age: 27, avatar: "👩🏻", gender: "female", bio: "РПП. Ненавидит зеркала. Чувство раздутости и 'грязи' внутри." },
    { id: "c12", name: "Андрей", age: 35, avatar: "👨🏿", gender: "male", bio: "Вспышки гневa разрушают карьеру. Ощущение закипающей лавы в позвоночнике." },
    { id: "c13", name: "Наталья", age: 40, avatar: "👩‍💼", gender: "female", bio: "Живет в толпе, но чувствует себя 'за стеклом'. Пустота в груди." },
    { id: "c14", name: "Павел", age: 22, avatar: "👱🏻", gender: "male", bio: "Незавершенная сепарация. Боится принимать решения без родителей." },
    { id: "c15", name: "Екатерина", age: 36, avatar: "👩‍🏫", gender: "female", bio: "Перфекционизм. Боится ошибки. Жжение в глазах от истощения." },
    { id: "c16", name: "Александр", age: 44, avatar: "👨🏻", gender: "male", bio: "Патологическое горе. Застрял в вине. Ощущение свинца в руках." },
    { id: "c17", name: "Светлана", age: 30, avatar: "👩🏼", gender: "female", bio: "Низкая самооценка. Сжимается в комок при взгляде на успешных." },
    { id: "c18", name: "Роман", age: 32, avatar: "👨🏿‍💻", gender: "male", bio: "Игромания. Туман в голове, не чувствует веса своего тела." },
    { id: "c19", name: "Ирина", age: 48, avatar: "👵🏼", gender: "female", bio: "Синдром пустого гнезда. Дети уехали. Жизнь лишилась цели." },
    { id: "c20", name: "Кирилл", age: 26, avatar: "👦🏻", gender: "male", bio: "Агорафобия. Паника на открытых пространствах. Трясучка в коленях." },
    { id: "c21", name: "Татьяна", age: 55, avatar: "👩🏻‍🦱", gender: "female", bio: "Страх старения. Время 'съедает' её изнутри." },
    { id: "c22", name: "Виктор", age: 39, avatar: "🧔", gender: "male", bio: "Измена партнера. Жажда мести. Колючая проволока вокруг сердца." },
    { id: "c23", name: "Алина", age: 24, avatar: "👩‍🎓", gender: "female", bio: "Размытые границы. Ощущение, что по ней 'ходят ногами'." },
    { id: "c24", name: "Денис", age: 37, avatar: "👨🏻", gender: "male", bio: "Навязчивые мысли о смерти. Ледяное дыхание в затылок." },
    { id: "c25", name: "Людмила", age: 60, avatar: "👵", gender: "female", bio: "Конфликт поколений. Жар в лице, когда её игнорируют." },
    { id: "c26", name: "Максим", age: 21, avatar: "👦🏼", gender: "male", bio: "Потеря вектора. Вакуум в голове и слабость в кистях." },
    { id: "c27", name: "Валерия", age: 31, avatar: "👩🏻‍🦰", gender: "female", bio: "Ревность. Желчь во рту и спазм в желудке." },
    { id: "c28", name: "Станислав", age: 43, avatar: "👨🏻‍💼", gender: "male", bio: "Трудоголизм. Тело — просто инструмент. Игнорирует боль." },
    { id: "c29", name: "Евгения", age: 29, avatar: "👩🏻", gender: "female", bio: "Страх перемен. Боится сменить работу. Ком в горле." },
    { id: "c30", name: "Константин", age: 35, avatar: "👨🏻", gender: "male", bio: "Алекситимия. Ощущение, что он сделан из пластмассы." }
];

// --- ВСПОМОГАТЕЛЬНЫЙ КОМПОНЕНТ: РАДАР (Skill Radar) ---
const RadarChart = ({ data }) => {
  const size = 220;
  const center = size / 2;
  const radius = 75;
  const metrics = [
    { x: center, y: center - radius * (data.method / 100) },
    { x: center + radius * (data.empathy / 100), y: center },
    { x: center, y: center + radius * (data.boundaries / 100) },
    { x: center - radius * (data.ethics / 100), y: center }
  ];
  const poly = metrics.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center my-6 animate-in zoom-in duration-700">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="rgba(255,255,255,0.1)" />
        <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="rgba(255,255,255,0.1)" />
        <path d={poly} fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" />
        <text x={center} y={center - radius - 15} textAnchor="middle" fontSize="9" fill="#6366f1" fontWeight="900" className="uppercase tracking-widest">Метод</text>
        <text x={center + radius + 30} y={center + 4} textAnchor="start" fontSize="9" fill="#a855f7" fontWeight="900" className="uppercase tracking-widest">Эмпатия</text>
        <text x={center} y={center + radius + 20} textAnchor="middle" fontSize="9" fill="#ec4899" fontWeight="900" className="uppercase tracking-widest">Структура</text>
        <text x={center - radius - 30} y={center + 4} textAnchor="end" fontSize="9" fill="#10b981" fontWeight="900" className="uppercase tracking-widest">Этика</text>
      </svg>
    </div>
  );
};

// --- ОСНОВНОЙ КОМПОНЕНТ ---
export default function App() {
  const [screen, setScreen] = useState('hub'); // hub, setup, chat, profile, tariffs
  const [role, setRole] = useState(null);
  const [selectedModality, setSelectedModality] = useState('mpt');
  const [selectedClientId, setSelectedClientId] = useState('c1');
  const [difficulty, setDifficulty] = useState(2);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [diamonds, setDiamonds] = useState(5);
  const [isLegalAccepted, setIsLegalAccepted] = useState(!!localStorage.getItem('connectum_consent'));

  const [profile, setProfile] = useState({ name: '', experience: '', price: '', methods: '', video: '' });

  const chatEndRef = useRef(null);
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#020617');
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // --- ЛОГИКА ---

  const handleSend = async (text = inputText, isInitial = false) => {
    if (!text.trim() && !isInitial) return;
    if (!isInitial) setMessages(prev => [...prev, { role: 'user', content: text }]);
    
    setInputText('');
    setIsTyping(true);

    try {
      const clientData = CLIENT_DATABASE.find(c => c.id === selectedClientId);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: tg?.initDataUnsafe?.user?.id || 'dev_master',
          message: text,
          role: role,
          selectedClientId: selectedClientId,
          modalityId: selectedModality,
          difficulty: difficulty,
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
          isVoice: true,
          clientProfile: JSON.stringify({ base: clientData })
        })
      });

      const data = await res.json();
      setIsTyping(false);
      
      if (data.content) {
        setMessages(prev => [...prev, { role: 'ai', content: data.content, voice: data.voice }]);
        if (data.voice) {
          const audio = new Audio(`data:audio/mp3;base64,${data.voice}`);
          audio.play().catch(e => console.warn("Audio play blocked"));
        }
      }
    } catch (e) {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'system', content: "⚠️ Ошибка связи с ИИ." }]);
    }
  };

  const finishSession = async () => {
    if (!window.confirm("Завершить сессию и получить аудит?")) return;
    setIsTyping(true);
    try {
      const res = await fetch('/api/finish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: tg?.initDataUnsafe?.user?.id || 'dev_master',
          role: role,
          history: messages,
          modalityId: selectedModality,
          clientName: selectedClientId
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'report', data: data }]);
    } catch (e) { console.error(e); } finally { setIsTyping(false); }
  };

  const toggleSpeech = () => {
    if (!('webkitSpeechRecognition' in window)) return alert("Голос не поддерживается.");
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (e) => setInputText(prev => prev + " " + e.results[0][0].transcript);
    recognition.start();
  };

  // --- ЭКРАН 0: ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ (LEGAL SCREEN) ---
  if (!isLegalAccepted) return (
    <div className="flex items-center justify-center h-screen bg-[#020617] p-6 text-center">
      <div className="bg-[#0f172a] border-4 border-indigo-500/20 rounded-[48px] p-10 max-w-sm animate-in fade-in zoom-in duration-500 shadow-2xl">
        <div className="w-20 h-20 bg-indigo-600/20 border border-indigo-500/30 rounded-3xl mx-auto flex items-center justify-center mb-8">
            <ShieldCheck className="text-indigo-400 w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black uppercase mb-4 tracking-tighter text-white">Connectum</h2>
        <div className="text-slate-400 text-xs mb-10 leading-relaxed text-left h-48 overflow-y-auto pr-2 no-scrollbar">
            <p className="mb-4 font-bold text-white uppercase tracking-widest text-[10px]">Эволюция психологической практики</p>
            <p className="mb-4">Мы создали это пространство, где мастерство психологов — гарантия результата. Это среда, где профессионалы растут, а клиенты находят реальную помощь.</p>
            <p className="mb-4">Использование Telegram-бота и Mini App "Connectum" означает полное согласие Пользователя с условиями оферты.</p>
        </div>

        {/* Ссылка на файл над кнопкой */}
        <a 
          href="https://docs.google.com/document/d/19G-OM4PXciNa9W69IhR53l39HYTZAJmOnwuSkfbHp70/edit?usp=sharing" 
          target="_blank" 
          className="flex items-center justify-center gap-2 mb-8 text-indigo-400 hover:text-indigo-300 transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
        >
          Пользовательское соглашение <ExternalLink className="w-3 h-3" />
        </a>

        <button 
          onClick={() => { localStorage.setItem('connectum_consent', 'true'); setIsLegalAccepted(true); }}
          className="w-full bg-indigo-600 py-5 rounded-[2rem] font-bold uppercase text-xs tracking-widest shadow-2xl active:scale-95 transition text-white"
        >
          Принять и Войти
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-slate-100 overflow-hidden relative selection:bg-indigo-500/30">
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0" style={{ background: "radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.2) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.15) 0px, transparent 50%)" }} />

      {/* HEADER */}
      {screen !== 'hub' && (
        <header className="flex-shrink-0 h-20 bg-slate-900/60 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 z-50">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen('hub')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center active:scale-90 transition">
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </button>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 leading-none">Connectum</span>
              <span className="text-xs font-bold font-mono mt-1">29:59</span>
            </div>
          </div>
          <button onClick={() => setScreen('tariffs')} className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-[10px] font-black text-indigo-300 uppercase">
            {diamonds}/5 💎
          </button>
        </header>
      )}

      {/* MAIN */}
      <main className="flex-1 overflow-hidden relative flex flex-col z-10">
        
        {/* --- SCREEN: HUB (ОРИГИНАЛЬНЫЙ ТЕКСТ) --- */}
        {screen === 'hub' && (
          <div className="h-full flex flex-col items-center justify-between py-16 px-8 animate-in fade-in duration-500 text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-8 border border-white/20">
                <InfinityIcon className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter mb-2 text-white">Connectum</h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] opacity-70">Синергия мастерства и доверия</p>
            </div>

            <div className="w-full space-y-4 my-10">
              <button 
                onClick={() => { setRole('psychologist'); setScreen('setup'); }}
                className="w-full p-8 bg-white/5 border border-white/10 rounded-[36px] flex items-center gap-6 group hover:bg-indigo-600/10 transition-all relative overflow-hidden text-left"
              >
                <div className="absolute -bottom-4 -right-4 text-7xl font-black text-white/5 uppercase italic pointer-events-none">ТРЕНИРОВКА</div>
                <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">🧠</div>
                <div className="text-left">
                  <h3 className="text-xl font-black uppercase text-white">Я Психолог</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Тренажер • Супервизия • Рост</p>
                </div>
              </button>

              <button 
                onClick={() => { setRole('client'); setScreen('chat'); setMessages([]); handleSend("Здравствуйте", true); }}
                className="w-full p-8 bg-white/5 border border-white/10 rounded-[32px] flex items-center gap-6 group hover:bg-emerald-600/10 transition-all relative overflow-hidden text-left"
              >
                <div className="absolute -bottom-4 -right-4 text-7xl font-black text-white/5 uppercase italic pointer-events-none">ТЕРАПИЯ</div>
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner text-white">🤝</div>
                <div className="text-left">
                  <h3 className="text-xl font-black uppercase text-white">Я Клиент</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-left">ИИ-терапевт • Подбор эксперта</p>
                </div>
              </button>
            </div>
            
            <div className="flex gap-4">
               <a href="https://t.me/psy_connectum" target="_blank" className="p-4 bg-white/5 rounded-2xl border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition">Канал</a>
               <a href="https://t.me/lazalex81" target="_blank" className="p-4 bg-white/5 rounded-2xl border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition">Помощь</a>
            </div>
            <p className="text-[9px] text-slate-700 font-bold uppercase tracking-[0.2em] w-full text-center mt-6">© Connectum • Эволюция Психологии</p>
          </div>
        )}

        {/* --- SCREEN: SETUP --- */}
        {screen === 'setup' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-8 animate-in slide-in-from-right duration-300 no-scrollbar text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Мастерская</h2>
            <div className="bg-white/5 border border-white/10 rounded-[36px] p-6 flex items-center justify-between cursor-pointer active:scale-95 transition" onClick={() => setScreen('profile')}>
              <div className="flex items-center gap-4 text-left">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"><Award className="text-white w-6 h-6"/></div>
                <div className="flex flex-col text-left">
                  <span className="font-black uppercase text-sm text-white">Мой Профиль</span>
                  <span className="text-[10px] text-indigo-400 font-bold mt-1 uppercase tracking-widest">Квесты +12 💎</span>
                </div>
              </div>
              <ChevronRight className="text-slate-600 w-5 h-5" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2 text-left"><label className="text-[10px] font-black text-slate-500 uppercase ml-4">Школа терапии</label><select value={selectedModality} onChange={(e) => setSelectedModality(e.target.value)} className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl text-sm font-bold appearance-none outline-none focus:border-indigo-500 transition-all text-white">{Object.values(MODALITIES).map(m => <option key={m.id} value={m.id} className="bg-slate-900">{m.name}</option>)}</select></div>
              <div className="space-y-2 text-left"><label className="text-[10px] font-black text-slate-500 uppercase ml-4">Выбор кейса</label><select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl text-sm font-bold appearance-none outline-none focus:border-indigo-500 transition-all text-white">{CLIENT_DATABASE.map(c => <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>)}</select></div>
            </div>

            <div className="bg-slate-900/80 border border-indigo-500/20 rounded-[36px] p-8 text-left text-white relative">
              <div className="flex items-center gap-4 mb-4 text-white"><span className="text-4xl">{CLIENT_DATABASE.find(c => c.id === selectedClientId).avatar}</span><h4 className="text-xl font-black">{CLIENT_DATABASE.find(c => c.id === selectedClientId).name}</h4></div>
              <p className="text-sm text-slate-400 italic leading-relaxed">"{CLIENT_DATABASE.find(c => c.id === selectedClientId).bio}"</p>
            </div>

            <button onClick={() => { setMessages([]); handleSend("Здравствуйте", true); setScreen('chat'); }} className="w-full bg-indigo-600 py-6 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl active:scale-95 transition text-white">Запустить сессию</button>
          </div>
        )}

        {/* --- SCREEN: CHAT --- */}
        {screen === 'chat' && (
          <div className="flex-1 flex flex-col animate-in fade-in duration-300">
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-44 text-left">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {m.role === 'report' ? (
                    <div className="w-full bg-slate-900/80 border-2 border-indigo-500/30 rounded-[44px] p-8 mt-4 text-left shadow-2xl animate-in slide-in-from-bottom-5">
                       <h3 className="text-xs font-black uppercase text-indigo-400 tracking-widest mb-4">Skill Radar</h3>
                       <RadarChart data={m.data.analytics || {method: 80, empathy: 70, boundaries: 60, ethics: 90}} />
                       <p className="text-xs italic text-slate-300 mt-6 leading-relaxed">"{m.data.analytics?.insight}"</p>
                    </div>
                  ) : (
                    <div className={`max-w-[85%] p-4 rounded-[24px] text-sm shadow-xl text-left ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'}`} dangerouslySetInnerHTML={{ __html: marked.parse(m.content || "") }} />
                  )}
                </div>
              ))}
              {isTyping && <div className="flex gap-2 p-4 bg-white/5 rounded-2xl w-fit"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75" /><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150" /></div>}
              <div ref={chatEndRef} />
            </div>

            <footer className="absolute bottom-0 w-full p-6 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
              {role === 'psychologist' && (
                <div className="flex gap-3 mb-5">
                    <button onClick={() => handleSend("Дай краткий совет как супервизор", false)} className="flex-1 bg-orange-500/10 border border-orange-500/20 py-4 rounded-2xl text-[10px] font-black uppercase text-orange-400 tracking-wider">🆘 Помощь</button>
                    <button onClick={finishSession} className="flex-1 bg-emerald-500/10 border border-emerald-500/20 py-4 rounded-2xl text-[10px] font-black uppercase text-emerald-400 tracking-wider">✅ Завершить</button>
                </div>
              )}
              
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-[32px] p-1 shadow-inner w-full group focus-within:border-indigo-500/50 transition-all text-left">
                <button onClick={toggleSpeech} className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-slate-500 hover:text-white'}`}><Mic className="w-5 h-5" /></button>
                <textarea 
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)} 
                    placeholder="Ваш ответ..." 
                    rows={1} 
                    className="flex-1 bg-transparent border-none outline-none text-sm py-4 text-white placeholder:text-slate-700 resize-none min-h-[56px] max-h-[150px] no-scrollbar text-left" 
                    onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                />
                <button onClick={() => handleSend()} disabled={!inputText.trim()} className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition disabled:opacity-20 text-white shrink-0"><Send className="w-5 h-5" /></button>
              </div>
            </footer>
          </div>
        )}

        {/* --- SCREEN: PROFILE --- */}
        {screen === 'profile' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-8 animate-in fade-in duration-300 no-scrollbar text-left">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Мой Профиль</h2>
            <div className="space-y-6">
                <div className="space-y-1"><label className="text-[10px] font-black text-slate-500 uppercase ml-4 block text-left">ФИО</label><input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full p-5 bg-white/5 rounded-3xl border-none text-white font-bold" placeholder="Анна Романова"/></div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1"><label className="text-[10px] font-black text-slate-500 uppercase ml-4 block text-left">Опыт (лет)</label><input type="number" value={profile.experience} onChange={e => setProfile({...profile, experience: e.target.value})} className="w-full p-5 bg-white/5 rounded-3xl border-none text-white font-bold" placeholder="5"/></div>
                    <div className="space-y-1"><label className="text-[10px] font-black text-slate-500 uppercase ml-4 block text-left">Цена (₽)</label><input type="number" value={profile.price} onChange={e => setProfile({...profile, price: e.target.value})} className="w-full p-5 bg-white/5 rounded-3xl border-none text-white font-bold" placeholder="3000"/></div>
                </div>
                <div className="space-y-1"><label className="text-[10px] font-black text-slate-500 uppercase ml-4 block text-left">Методы</label><textarea value={profile.methods} onChange={e => setProfile({...profile, methods: e.target.value})} className="w-full p-5 bg-white/5 rounded-3xl border-none text-white text-sm h-32" placeholder="МПТ, КПТ..."/></div>
            </div>
            <button onClick={saveProfile} className="w-full bg-indigo-600 py-6 rounded-[2.5rem] font-black uppercase text-xs shadow-xl active:scale-95 transition text-white">Сохранить</button>
          </div>
        )}
      </main>
    </div>
  );
}
