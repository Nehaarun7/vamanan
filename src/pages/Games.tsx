import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { gameQuestions, type GameQuestion } from '../data/onamData';
import { VamananAvatar } from '../components/VamananAvatar';
import { Link } from 'react-router-dom';

/* ─── QUIZ ─── */
const QuizGame: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [reaction, setReaction] = useState('');

  const q: GameQuestion = gameQuestions[current];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) {
      setScore(s => s + 1);
      const r = ["Ayyoo! Correct aanu! 👏 Ningalkku nalla buddhi undallo!", "Correct! 🎉 Mahabali proud!", "Nalla answer! 😌 Vamanan approve!", "Ahh, pinne! 😂 Ningal smart aanu!"];
      setReaction(r[Math.floor(Math.random() * r.length)]);
    } else {
      const r = [`Almost! 😏 Correct answer: ${q.options[q.correct]}. ${q.explanation}`, `Ayyoo! 😅 ${q.explanation}`, `Hmm, not quite! 🤔 ${q.explanation}`];
      setReaction(r[Math.floor(Math.random() * r.length)]);
    }
  };

  const next = () => {
    if (current < gameQuestions.length - 1) { setCurrent(c => c + 1); setSelected(null); setReaction(''); }
    else setFinished(true);
  };

  const restart = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); setReaction(''); };

  if (finished) {
    const pct = Math.round((score / gameQuestions.length) * 100);
    const msg = pct >= 80 ? "Wow! Ningal Onam expert aanu! 🌟" : pct >= 50 ? "Not bad! 😌 Keep practicing!" : "Practice cheyyuka ketto! 😂 But ithu try cheythathinnu points! 🌸";
    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }} className="animate-fade-in-up">
        <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>🏆</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#78350f', marginBottom: '8px' }}>Quiz Complete!</h3>
        <div style={{ fontSize: '2.8rem', fontWeight: 700, color: '#d97706', marginBottom: '8px' }}>{score}/{gameQuestions.length}</div>
        <p style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '20px' }}>{msg}</p>
        <div style={{ maxWidth: '200px', margin: '0 auto 20px', background: 'rgba(254,243,199,0.8)', borderRadius: '999px', height: '10px' }}>
          <div style={{ height: '10px', borderRadius: '999px', background: 'linear-gradient(90deg, #d4a017, #f0c940)', width: `${pct}%`, transition: 'width 1s ease' }} />
        </div>
        <button onClick={restart} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '10px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #d4a017, #a07810)', color: '#fff',
          fontSize: '0.875rem', fontWeight: 600,
        }}><RotateCcw size={15} /> Play Again</button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '14px' }}>
        {gameQuestions.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: '5px', borderRadius: '999px',
            background: i < current ? '#f59e0b' : i === current ? '#d4a017' : 'rgba(212,160,23,0.2)',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#d97706', marginBottom: '16px' }}>
        <span>Question {current + 1}/{gameQuestions.length}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Trophy size={12} /> {score} pts</span>
      </div>

      <p style={{ fontWeight: 600, color: '#78350f', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '18px' }}>{q.question}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {q.options.map((opt, i) => {
          let bg = '#fff', border = 'rgba(212,160,23,0.25)', color = '#78350f';
          if (selected !== null) {
            if (i === q.correct) { bg = '#f0fdf4'; border = '#4ade80'; color = '#166534'; }
            else if (selected === i) { bg = '#fef2f2'; border = '#f87171'; color = '#991b1b'; }
            else { bg = 'rgba(254,249,231,0.4)'; color = '#b45309'; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null} style={{
              textAlign: 'left', padding: '11px 14px', borderRadius: '12px',
              border: `2px solid ${border}`, background: bg, color,
              fontSize: '0.875rem', cursor: selected === null ? 'pointer' : 'default',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px',
              transition: 'all 0.15s',
            }}>
              <span>{opt}</span>
              {selected !== null && i === q.correct && <CheckCircle2 size={15} color="#16a34a" />}
              {selected !== null && selected === i && i !== q.correct && <XCircle size={15} color="#dc2626" />}
            </button>
          );
        })}
      </div>

      {reaction && (
        <div className="animate-fade-in-up" style={{
          display: 'flex', gap: '10px', padding: '12px',
          background: 'rgba(254,243,199,0.6)', border: '1px solid rgba(212,160,23,0.2)',
          borderRadius: '14px', marginBottom: '14px',
        }}>
          <VamananAvatar size="sm" />
          <p style={{ fontSize: '0.82rem', color: '#78350f', lineHeight: 1.5 }}>{reaction}</p>
        </div>
      )}

      {selected !== null && (
        <button onClick={next} style={{
          width: '100%', padding: '12px', borderRadius: '14px', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #d4a017, #a07810)', color: '#fff',
          fontSize: '0.875rem', fontWeight: 600, transition: 'transform 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {current < gameQuestions.length - 1 ? 'Next Question →' : 'See Results 🏆'}
        </button>
      )}
    </div>
  );
};

/* ─── RIDDLE ─── */
const riddles = [
  { q: "I have no legs, but I run. During Onam, everyone waits for me. I bring colors and joy — what am I?", a: "Pookalam", hint: "Think of what's placed at every doorstep... 🌸" },
  { q: "I come in 26+ varieties on a banana leaf. Rich and poor eat me together. I am the heart of Onam. What am I?", a: "Onam Sadya", hint: "The greatest meal in Kerala history... 🍛" },
  { q: "I am a king who gave away everything. Every year I come home to see my people. Who am I?", a: "Mahabali", hint: "He ruled a golden kingdom... 👑" },
  { q: "I am small in size but cover the universe in three steps. I look innocent but am incredibly clever. Who am I?", a: "Vamanan", hint: "The Clever Little Guide... 😌" },
  { q: "I race through Kerala's backwaters. I am 100 feet long with 100 rowers. What am I?", a: "Vallam Kali", hint: "Racing through Punnamada Lake... 🚣" },
];

const RiddleGame: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const riddle = riddles[idx];

  const checkAnswer = () => {
    const u = guess.toLowerCase().trim(), a = riddle.a.toLowerCase();
    const ok = a.split(' ').some(w => w.length > 3 && u.includes(w)) || u.includes(a.substring(0, 5));
    setCorrect(ok); setRevealed(true);
  };

  const nextRiddle = () => { setIdx(i => (i + 1) % riddles.length); setGuess(''); setRevealed(false); setShowHint(false); setCorrect(null); };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <span style={{ fontSize: '1.6rem' }}>🧩</span>
        <div>
          <p style={{ fontSize: '0.7rem', color: '#d97706' }}>Riddle {idx + 1}/{riddles.length}</p>
          <p style={{ fontWeight: 600, color: '#78350f', fontSize: '0.95rem' }}>Vamanan's Riddle</p>
        </div>
      </div>

      <div style={{ background: 'rgba(254,243,199,0.5)', border: '1px solid rgba(212,160,23,0.2)', borderRadius: '16px', padding: '16px', marginBottom: '14px' }}>
        <p style={{ fontSize: '0.875rem', color: '#78350f', lineHeight: 1.6, fontStyle: 'italic' }}>"{riddle.q}"</p>
      </div>

      {showHint && (
        <div className="animate-fade-in-up" style={{ display: 'flex', gap: '10px', background: 'rgba(254,243,199,0.6)', borderRadius: '14px', padding: '10px', marginBottom: '12px' }}>
          <VamananAvatar size="sm" />
          <p style={{ fontSize: '0.82rem', color: '#b45309' }}>Hint: {riddle.hint}</p>
        </div>
      )}

      {!revealed ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" value={guess} onChange={e => setGuess(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && guess && checkAnswer()}
            placeholder="Your answer..."
            style={{ padding: '10px 14px', borderRadius: '12px', border: '2px solid rgba(212,160,23,0.3)', background: '#fff', fontSize: '0.875rem', color: '#451a03', outline: 'none' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setShowHint(true)} style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid rgba(212,160,23,0.3)', background: 'rgba(254,243,199,0.6)', color: '#92400e', fontSize: '0.82rem', cursor: 'pointer' }}>Get Hint 💡</button>
            <button onClick={checkAnswer} disabled={!guess.trim()} style={{ flex: 1, padding: '10px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #d4a017, #a07810)', color: '#fff', fontSize: '0.82rem', fontWeight: 600, cursor: guess.trim() ? 'pointer' : 'not-allowed', opacity: guess.trim() ? 1 : 0.5 }}>Submit</button>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px', padding: '12px', borderRadius: '14px', background: correct ? '#f0fdf4' : '#fef2f2', border: `1px solid ${correct ? '#4ade80' : '#f87171'}` }}>
            <VamananAvatar size="sm" />
            <div>
              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: correct ? '#166534' : '#991b1b', marginBottom: '3px' }}>
                {correct ? 'Correct! 🎉 Ningal clever aanu!' : 'Almost! 😏 The answer is:'}
              </p>
              {!correct && <p style={{ fontSize: '0.82rem', color: '#78350f', fontWeight: 600 }}>{riddle.a}</p>}
            </div>
          </div>
          <button onClick={nextRiddle} style={{ padding: '11px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #d4a017, #a07810)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
            Next Riddle →
          </button>
        </div>
      )}
    </div>
  );
};

/* ─── WISH GENERATOR ─── */
const wishData: Record<string, Record<string, string[]>> = {
  english: {
    funny: [
      `{name}! Happy Onam! 🌼 May your pookalam be beautiful, your sadya endless, and your payasam glass never empty! Diet starts NEXT month. No exceptions! 😂 — Vamanan 😌`,
      `Hey {name}! 🎉 This Onam, may you eat so much sadya that even Mahabali is impressed! May your pookalam be Instagram-worthy! 😂🌸`,
    ],
    traditional: [
      `Dear {name}, on this auspicious Onam, may Mahabali's blessings fill your home with prosperity and joy. May every petal of your pookalam be a prayer answered. 🌺 Happy Onam!`,
    ],
    emotional: [
      `{name}, Onam reminds us that love transcends time. Just as Mahabali crosses oceans to see his people, may the people you love always find their way back to you. 🌼 Happy Onam.`,
    ],
    friendly: [
      `{name}! HAPPY ONAM! 🎉🌸 Hope your Onam is full of amazing food, beautiful flowers, and quality time! Mahabali is watching — and smiling! 😌`,
    ],
    professional: [
      `Wishing {name} and your family a joyous Onam. May this festival bring abundance, health, and success in the coming year. 🌸 Warm Onam wishes.`,
    ],
  },
  manglish: {
    funny: [
      `{name}! 🌼 Happy Onam! Pookalam ready aano? Sadya full kazhichu, payasam minimum 2 glass edukka! Diet strictly next month! 😂 — Vamanan, the 3-step wonder! 👣`,
    ],
    traditional: [
      `{name}, ee Onam ningalude veettil samadhanavum santhoshavum nirayayatte. Mahabali rajaavindu asheervadam undo! 🌸 Onam Ashamsakal!`,
    ],
    emotional: [
      `{name}, Onam vumbol oru feeling undu alle? 💛 Mahabali's love for his people — ithu every year remind cheyyunnu. Happy Onam. 🌼`,
    ],
    friendly: [
      `{name}! HAPPY ONAM da! 🌸🎉 Sadya kazhikunna, pookalam idunna, paayasam kudikkunna — perfect Onam! Enjoy cheyyuka! 😌🌼`,
    ],
    professional: [
      `{name}, Onam occasion-il heartfelt wishes! 🌸 Onam Ashamsakal! 🌼`,
    ],
  },
  malayalam: {
    funny: [
      `{name}! ഈ ഓണം ningalude pookalam number one aayal mathi! Sadya full kazhikkanam — diet next month! 😂 Onam Ashamsakal!`,
    ],
    traditional: [
      `{name}, ഈ തിരുവോണത്തിൽ മഹാബലിയുടെ അനുഗ്രഹം നിങ്ങളുടെ ജീവിതത്തിൽ സന്തോഷവും സമൃദ്ധിയും നിറക്കട്ടെ. 🌸 ഓണാശംസകൾ!`,
    ],
    emotional: [
      `{name}, ഓണം നമ്മോടു പറയുന്നത് — സ്നേഹം, ഒരുമ. ഈ ഓണം നിങ്ങൾക്ക് ആ സ്നേഹം നിറഞ്ഞ ദിനങ്ങൾ ആകട്ടെ. 💛🌼`,
    ],
    friendly: [
      `{name}! Happy Onam! 🎉 Pookalam iduka, sadya kazhikuka, pinne paayasam randu glass edukka! 😂🌸`,
    ],
    professional: [
      `{name}, ഓണത്തിന്റെ ശുഭദിനത്തിൽ ഹൃദ്യമായ ആശംസകൾ. 🌸 ഓണം ആഘോഷം ആനന്ദകരമാകട്ടെ!`,
    ],
  },
};

const WishGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('english');
  const [mood, setMood] = useState('funny');
  const [wish, setWish] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const pool = ((wishData[language] || wishData.english)[mood] || wishData.english.funny);
      const raw = pool[Math.floor(Math.random() * pool.length)];
      setWish(raw.replace(/\{name\}/g, name || 'Friend'));
      setLoading(false);
    }, 800);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: '10px',
    border: '1px solid rgba(212,160,23,0.3)', background: '#fff',
    fontSize: '0.875rem', color: '#451a03', outline: 'none',
    fontFamily: "'Poppins', sans-serif",
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontWeight: 600, color: '#78350f', fontSize: '0.95rem', marginBottom: '2px' }}>Onam Wish Generator</p>
        <p style={{ fontSize: '0.72rem', color: '#d97706' }}>Let Vamanan craft your personalized wish!</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#b45309', marginBottom: '4px' }}>Your Name (optional)</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name..." style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#b45309', marginBottom: '4px' }}>Language</label>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={inputStyle}>
              <option value="english">English</option>
              <option value="manglish">Manglish</option>
              <option value="malayalam">Malayalam</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#b45309', marginBottom: '4px' }}>Mood</label>
            <select value={mood} onChange={e => setMood(e.target.value)} style={inputStyle}>
              <option value="funny">Funny 😂</option>
              <option value="traditional">Traditional 🌸</option>
              <option value="emotional">Emotional 💛</option>
              <option value="friendly">Friendly 😊</option>
              <option value="professional">Professional 🤝</option>
            </select>
          </div>
        </div>
      </div>

      <button onClick={generate} disabled={loading} style={{
        width: '100%', padding: '12px', borderRadius: '12px', border: 'none', cursor: loading ? 'wait' : 'pointer',
        background: 'linear-gradient(135deg, #d4a017, #a07810)', color: '#fff',
        fontSize: '0.875rem', fontWeight: 600, marginBottom: '14px',
        opacity: loading ? 0.7 : 1, transition: 'all 0.2s',
      }}>
        {loading ? 'Vamanan is thinking... 🤔' : 'Generate My Onam Wish 🌸'}
      </button>

      {wish && (
        <div className="animate-fade-in-up" style={{ background: 'rgba(254,243,199,0.5)', border: '1px solid rgba(212,160,23,0.2)', borderRadius: '16px', padding: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
            <VamananAvatar size="sm" />
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#b45309' }}>Vamanan's wish for you 🪷</p>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#78350f', lineHeight: 1.7, marginBottom: '10px' }}>{wish}</p>
          <button
            onClick={() => navigator.clipboard.writeText(wish).catch(() => {})}
            style={{ fontSize: '0.72rem', color: '#d97706', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            📋 Copy wish
          </button>
        </div>
      )}
    </div>
  );
};

/* ─── MAIN ─── */
type GameTab = 'quiz' | 'riddle' | 'wish';

export const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameTab>('quiz');

  useEffect(() => {
    if (window.location.hash === '#wish') setActiveGame('wish');
  }, []);

  const tabs: { id: GameTab; emoji: string; label: string }[] = [
    { id: 'quiz', emoji: '🧠', label: 'Onam Quiz' },
    { id: 'riddle', emoji: '🧩', label: 'Riddles' },
    { id: 'wish', emoji: '🎉', label: 'Wish Generator' },
  ];

  return (
    <div className="kerala-pattern" style={{ minHeight: '100vh', paddingTop: '64px', paddingBottom: '60px', padding: '80px 20px 60px' }}>
      {/* Header */}
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎮</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
          fontWeight: 700, color: '#78350f', marginBottom: '8px',
        }}>Play with Vamanan</h1>
        <p style={{ color: '#b45309', fontSize: '0.875rem' }}>
          Quiz, riddles, and personalized Onam wishes! Vamanan ka style mein! 😏
        </p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '4px',
          background: 'rgba(254,243,199,0.7)', padding: '5px',
          borderRadius: '18px', marginBottom: '20px',
        }}>
          {tabs.map(tab => {
            const active = activeGame === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveGame(tab.id)} aria-pressed={active} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                padding: '10px 8px', borderRadius: '14px', border: 'none', cursor: 'pointer',
                background: active ? '#fff' : 'transparent',
                color: active ? '#78350f' : '#b45309',
                fontSize: '0.82rem', fontWeight: active ? 600 : 500,
                boxShadow: active ? '0 2px 8px rgba(92,61,17,0.1)' : 'none',
                transition: 'all 0.2s',
              }}>
                <span>{tab.emoji}</span>
                <span className="hide-mobile">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Game card */}
        <div key={activeGame} className="animate-fade-in-up" style={{
          borderRadius: '24px', padding: '24px',
          background: 'linear-gradient(160deg, #fef9e7, #fdf3d8)',
          boxShadow: '0 4px 20px rgba(212,160,23,0.12)',
          border: '1px solid rgba(212,160,23,0.18)',
        }}>
          {activeGame === 'quiz' && <QuizGame />}
          {activeGame === 'riddle' && <RiddleGame />}
          {activeGame === 'wish' && <WishGenerator />}
        </div>

        {/* Chat CTA */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '0.78rem', color: '#b45309', marginBottom: '10px' }}>Want more fun? Ask Vamanan directly!</p>
          <Link to="/chat" style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '10px 20px', borderRadius: '999px',
            background: 'linear-gradient(135deg, #d4a017, #a07810)',
            color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            💬 Chat with Vamanan
          </Link>
        </div>
      </div>
    </div>
  );
};
