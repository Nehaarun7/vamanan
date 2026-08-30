import React from 'react';
import { Link } from 'react-router-dom';
import { VamananAvatar } from '../components/VamananAvatar';
import { MessageCircle, BookOpen, Gamepad2, Flower2, Mic, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const features = [
    { icon: MessageCircle, title: 'Conversational AI', desc: 'Powered by GPT-3.5 with a custom Vamanan personality engine' },
    { icon: BookOpen, title: 'Immersive Story Mode', desc: '8-chapter narrative of the Mahabali-Vamana legend' },
    { icon: Gamepad2, title: 'Interactive Games', desc: 'Onam quiz, riddles, and personalized wish generator' },
    { icon: Flower2, title: 'Onam Knowledge Hub', desc: "9 cultural cards with Vamanan's explanations" },
    { icon: Mic, title: 'Voice Interaction', desc: 'Speech-to-text input and text-to-speech responses' },
    { icon: Sparkles, title: 'Three Steps Feature', desc: 'Guided journey through Kerala culture with rewards' },
  ];

  const tech = [
    { label: 'Frontend', value: 'React 19 + TypeScript' },
    { label: 'Styling', value: 'Tailwind CSS v4' },
    { label: 'Routing', value: 'React Router v7' },
    { label: 'Icons', value: 'Lucide React' },
    { label: 'AI', value: 'OpenAI GPT-3.5 Turbo' },
    { label: 'Build Tool', value: 'Vite 8' },
    { label: 'Storage', value: 'LocalStorage' },
    { label: 'Fonts', value: 'Playfair Display + Poppins' },
  ];

  const steps = [
    { n: '1', title: 'Personality Engine', desc: "A carefully crafted system prompt defines Vamanan's character — playful, clever, culturally-aware, never robotic." },
    { n: '2', title: 'Mode System', desc: '6 distinct modes (Onam Friend, Storyteller, Wise, Mischief, Game, Wishes) adapt the response style dynamically.' },
    { n: '3', title: 'Language Detection', desc: "Vamanan responds in English, Malayalam, Manglish, or mixed — matching the user's style naturally." },
    { n: '4', title: 'Memory', desc: "Session context keeps track of conversation history and the user's name for personalized responses." },
    { n: '5', title: 'Fallback Mode', desc: 'Smart predefined responses for 15+ topics ensure the app works even without an API key.' },
  ];

  return (
    <div className="kerala-pattern" style={{ minHeight: '100vh', paddingTop: '64px', paddingBottom: '60px' }}>
      {/* Hero */}
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', padding: '48px 20px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <VamananAvatar size="lg" animate />
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 700, color: '#78350f', marginBottom: '12px',
        }}>
          Why Vamanan GPT?
        </h1>
        <p style={{ color: '#92400e', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
          Vamanan GPT brings Kerala's Onam spirit into an interactive AI experience — combining storytelling, culture, humor and modern conversational AI.
        </p>
      </div>

      {/* Features */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 48px' }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.7rem', fontWeight: 700, color: '#78350f',
          textAlign: 'center', marginBottom: '24px',
        }}>What Makes Vamanan Special</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{
              padding: '18px', borderRadius: '18px',
              background: '#fff', border: '1px solid rgba(212,160,23,0.18)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,160,23,0.2)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px', marginBottom: '12px',
                background: 'linear-gradient(135deg, #d4a017, #a07810)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={19} color="#fff" />
              </div>
              <h3 style={{ fontWeight: 700, color: '#78350f', fontSize: '0.88rem', marginBottom: '4px' }}>{title}</h3>
              <p style={{ fontSize: '0.75rem', color: '#b45309', lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How AI works */}
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '0 20px 48px' }}>
        <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(212,160,23,0.18)' }}>
          <div style={{ padding: '18px 24px', background: 'linear-gradient(135deg, #5c3d11, #7a5225)' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.3rem', fontWeight: 700, color: '#fef9e7', margin: 0,
            }}>How Vamanan's Personality Works</h2>
          </div>
          <div style={{ padding: '24px', background: 'linear-gradient(160deg, #fef9e7, #fdf3d8)' }}>
            {steps.map(({ n, title, desc }) => (
              <div key={n} style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
                <div style={{
                  flexShrink: 0, width: '28px', height: '28px',
                  borderRadius: '50%', background: '#d4a017',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.82rem', fontWeight: 700, color: '#fff',
                }}>
                  {n}
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#78350f', fontSize: '0.875rem', marginBottom: '2px' }}>{title}</p>
                  <p style={{ fontSize: '0.78rem', color: '#b45309', lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '0 20px 48px' }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.7rem', fontWeight: 700, color: '#78350f',
          textAlign: 'center', marginBottom: '18px',
        }}>Tech Stack</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
          {tech.map(({ label, value }) => (
            <div key={label} style={{
              padding: '12px', borderRadius: '14px', textAlign: 'center',
              background: '#fff', border: '1px solid rgba(212,160,23,0.18)',
            }}>
              <p style={{ fontSize: '0.68rem', color: '#d97706', marginBottom: '3px' }}>{label}</p>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#78350f' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Built for */}
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          padding: '40px 32px', borderRadius: '24px', textAlign: 'center',
          background: 'linear-gradient(135deg, #5c3d11, #3d2000)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🌼</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4rem', fontWeight: 700, color: '#fef9e7', marginBottom: '6px',
          }}>Built For</h2>
          <p style={{ color: '#fcd34d', fontSize: '0.875rem', marginBottom: '4px' }}>TinkerHub Toc H Kochi</p>
          <p style={{ color: 'rgba(252,211,77,0.7)', fontSize: '0.78rem', marginBottom: '14px' }}>
            Toc H Institute of Science &amp; Technology
          </p>
          <p style={{ color: 'rgba(252,211,77,0.5)', fontSize: '0.72rem', fontStyle: 'italic', marginBottom: '20px' }}>
            This project was created for a student competition and represents an independent creative work inspired by Kerala's Onam festival.
          </p>
          <Link
            to="/chat"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '11px 22px', borderRadius: '999px',
              background: '#f59e0b', color: '#5c3d11',
              fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <MessageCircle size={16} /> Talk to Vamanan
          </Link>
        </div>
      </div>
    </div>
  );
};
