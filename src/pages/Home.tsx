import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, BookOpen, Flower2 } from 'lucide-react';
import { VamananAvatar } from '../components/VamananAvatar';
import { FloatingPetals } from '../components/FloatingPetals';
import { ThreeSteps } from '../components/ThreeSteps';
import { DailyVamanan } from '../components/DailyVamanan';
import { isAIConfigured } from '../services/aiService';

export const Home: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [aiOn] = useState(isAIConfigured());

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="kerala-pattern" style={{ minHeight: '100vh' }}>
      <FloatingPetals count={10} />

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 20px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-labelledby="hero-heading"
      >
        {/* Decorative rings */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          {[380, 280, 180].map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: s, height: s, borderRadius: '50%',
              border: `1px solid rgba(212,160,23,${0.08 + i * 0.04})`,
            }} />
          ))}
        </div>

        {/* Top Kerala stripe */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 64, left: 0, right: 0, height: '3px', opacity: 0.2,
          background: 'repeating-linear-gradient(90deg, #d4a017 0,#d4a017 20px,transparent 20px,transparent 30px)',
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          transition: 'all 0.7s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
        }}>
          {/* Speech bubble */}
          <div style={{ marginBottom: '24px', display: 'inline-block', position: 'relative' }}>
            <div style={{
              padding: '8px 18px', borderRadius: '20px',
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid rgba(212,160,23,0.3)',
              fontSize: '0.85rem', fontWeight: 500,
              color: '#78350f',
              boxShadow: '0 2px 12px rgba(212,160,23,0.15)',
            }}>
              💬 Makkale... moonnu adi mathi! 😌
            </div>
            {/* Bubble tail */}
            <div style={{
              position: 'absolute', bottom: -7, left: '50%',
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '8px solid rgba(255,255,255,0.92)',
            }} />
          </div>

          {/* Avatar */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <VamananAvatar size="xl" animate />
          </div>

          {/* Title */}
          <h1
            id="hero-heading"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.4rem, 7vw, 4rem)',
              fontWeight: 700, color: '#78350f',
              margin: '0 0 8px', lineHeight: 1.1,
            }}
          >
            Vamanan GPT
          </h1>

          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '8px', marginBottom: '14px',
          }}>
            <span style={{ color: '#f59e0b', fontSize: '0.8rem' }}>✦</span>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic', fontWeight: 500,
              color: '#b45309', fontSize: '1rem', margin: 0,
            }}>
              "The Clever Little Guide"
            </p>
            <span style={{ color: '#f59e0b', fontSize: '0.8rem' }}>✦</span>
          </div>

          <p style={{ fontSize: '1.1rem', color: '#92400e', maxWidth: '480px', margin: '0 auto 6px', lineHeight: 1.5 }}>
            Bring Vamanan to life with AI.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#b45309', maxWidth: '380px', margin: '0 auto 28px' }}>
            Ask anything. But be ready for Vamanan's answer. 😏
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
            <Link to="/chat" aria-label="Talk to Vamanan" style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '12px 22px', borderRadius: '999px',
              background: 'linear-gradient(135deg, #d4a017, #a07810)',
              color: '#fff', fontWeight: 600, fontSize: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(212,160,23,0.4)',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <MessageCircle size={17} /> Talk to Vamanan
            </Link>

            <Link to="/onam" aria-label="Explore Onam" style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '12px 22px', borderRadius: '999px',
              background: '#fff',
              border: '2px solid #f59e0b',
              color: '#92400e', fontWeight: 600, fontSize: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(212,160,23,0.15)',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Flower2 size={17} /> Explore Onam
            </Link>

            <Link to="/story" aria-label="Hear His Story" style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '12px 22px', borderRadius: '999px',
              background: '#5c3d11',
              color: '#fef9e7', fontWeight: 600, fontSize: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(92,61,17,0.3)',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <BookOpen size={17} /> Hear His Story
            </Link>
          </div>

          {!aiOn && (
            <div style={{
              display: 'inline-block',
              padding: '5px 14px', borderRadius: '999px',
              background: 'rgba(254,243,199,0.8)',
              border: '1px solid rgba(212,160,23,0.3)',
              fontSize: '0.72rem', color: '#b45309',
            }}>
              🌸 Running in Fallback Mode — Add API key to enable full AI
            </div>
          )}
        </div>

        {/* Scroll hint */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)',
          animation: 'vamanan-float 2s ease-in-out infinite',
          opacity: 0.5,
        }}>
          <div style={{
            width: '20px', height: '32px',
            border: '2px solid #f59e0b', borderRadius: '10px',
            display: 'flex', justifyContent: 'center', paddingTop: '4px',
          }}>
            <div style={{
              width: '4px', height: '8px',
              background: '#f59e0b', borderRadius: '2px',
              animation: 'vamanan-float 1.5s ease-in-out infinite',
            }} />
          </div>
        </div>
      </section>

      {/* ── THREE STEPS ── */}
      <section style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <ThreeSteps />
      </section>

      {/* ── DAILY VAMANAN ── */}
      <section style={{ padding: '0 20px 60px', maxWidth: '600px', margin: '0 auto' }}>
        <DailyVamanan />
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ padding: '0 20px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          fontWeight: 700, textAlign: 'center',
          color: '#78350f', marginBottom: '8px',
        }}>
          What Vamanan Can Do
        </h2>
        <p style={{ textAlign: 'center', color: '#b45309', fontSize: '0.875rem', marginBottom: '36px' }}>
          More than a chatbot. It's an experience.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {[
            { emoji: '📖', title: 'Tell Stories', desc: 'The Mahabali-Vamana story, beautifully narrated' },
            { emoji: '🌼', title: 'Explain Onam', desc: 'Every tradition, every dish, every dance' },
            { emoji: '🎮', title: 'Play Games', desc: 'Onam quizzes, riddles, and memory games' },
            { emoji: '🎉', title: 'Generate Wishes', desc: 'Personalized Onam greetings in your language' },
            { emoji: '😂', title: 'Make You Laugh', desc: "Vamanan's humor is... legendary 😏" },
            { emoji: '🧠', title: 'Share Wisdom', desc: 'Cultural insights from the Clever Little Guide' },
          ].map(({ emoji, title, desc }) => (
            <div key={title} style={{
              padding: '20px', borderRadius: '18px',
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(212,160,23,0.2)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,160,23,0.18)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{emoji}</div>
              <h3 style={{ fontWeight: 700, color: '#78350f', marginBottom: '4px', fontSize: '0.95rem' }}>{title}</h3>
              <p style={{ fontSize: '0.78rem', color: '#b45309', lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kerala stripe */}
      <div className="kerala-stripe" aria-hidden="true" />

      {/* Footer */}
      <footer style={{
        padding: '32px 20px', textAlign: 'center',
        background: '#fdf3d8', color: '#b45309',
      }}>
        <p style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🌼</p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1rem', color: '#78350f' }}>
          Vamanan GPT
        </p>
        <p style={{ fontSize: '0.72rem', color: '#d97706', marginTop: '6px' }}>
          Built for TinkerHub Toc H Kochi · Toc H Institute of Science &amp; Technology
        </p>
        <p style={{ fontSize: '0.7rem', color: '#f59e0b', marginTop: '6px' }}>
          Moonnu adi kond universe cover cheyyaam! 😌
        </p>
      </footer>
    </div>
  );
};
