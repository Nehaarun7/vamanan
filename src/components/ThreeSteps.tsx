import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const STEPS_KEY = 'vamanan_steps';

interface Step {
  id: number; emoji: string; title: string;
  desc: string; link: string; linkLabel: string; reward: string;
}

const steps: Step[] = [
  { id: 1, emoji: '🌍', title: 'Explore Kerala', desc: "Discover Vamanan's World — Onam, traditions, and culture", link: '/onam', linkLabel: 'Explore Now', reward: 'You have stepped onto the Earth! 🌍' },
  { id: 2, emoji: '🌼', title: 'Experience Onam', desc: 'Read the story of Mahabali and Vamana', link: '/story', linkLabel: 'Read Story', reward: 'You have stepped to the Heavens! ✨' },
  { id: 3, emoji: '🤖', title: 'Talk to Vamanan', desc: "Chat with the Clever Little Guide himself", link: '/chat', linkLabel: 'Start Chat', reward: 'Three steps complete! You are officially Onam-ready! 🌼' },
];

export const ThreeSteps: React.FC = () => {
  const [completed, setCompleted] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem(STEPS_KEY) || '[]'); } catch { return []; }
  });
  const [reward, setReward] = useState<string | null>(null);

  const completeStep = (stepId: number) => {
    if (completed.includes(stepId)) return;
    const next = [...completed, stepId];
    setCompleted(next);
    localStorage.setItem(STEPS_KEY, JSON.stringify(next));
    const step = steps.find(s => s.id === stepId);
    if (step) { setReward(step.reward); setTimeout(() => setReward(null), 3000); }
  };

  const allDone = completed.length === 3;

  return (
    <div style={{ position: 'relative' }}>
      {reward && (
        <div
          role="alert" aria-live="polite"
          className="animate-fade-in-up"
          style={{
            position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 100, padding: '12px 24px', borderRadius: '999px',
            background: 'linear-gradient(135deg, #d4a017, #a07810)',
            color: '#fff', fontSize: '0.875rem', fontWeight: 600,
            boxShadow: '0 4px 16px rgba(212,160,23,0.4)',
            whiteSpace: 'nowrap',
          }}
        >
          {reward} ✨
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          fontWeight: 700, color: '#78350f', marginBottom: '6px',
        }}>
          Vamanan's Three Steps
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#b45309' }}>
          Complete all three steps to unlock the full Onam experience!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}>
        {steps.map((step, index) => {
          const done = completed.includes(step.id);
          return (
            <div key={step.id} style={{
              position: 'relative', padding: '20px',
              borderRadius: '20px',
              border: `2px solid ${done ? '#f59e0b' : 'rgba(212,160,23,0.22)'}`,
              background: done ? 'rgba(254,249,231,0.9)' : '#fff',
              boxShadow: done ? '0 4px 14px rgba(212,160,23,0.2)' : 'none',
              transition: 'all 0.3s',
            }}>
              {/* Step number badge */}
              <div style={{
                position: 'absolute', top: -12, left: -12,
                width: '26px', height: '26px', borderRadius: '50%',
                background: done ? '#d4a017' : '#c4a882',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 700, color: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}>
                {index + 1}
              </div>

              {done && (
                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  <CheckCircle2 size={18} style={{ color: '#d97706' }} />
                </div>
              )}

              <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{step.emoji}</div>
              <h3 style={{ fontWeight: 700, color: '#78350f', fontSize: '0.95rem', marginBottom: '5px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#b45309', lineHeight: 1.4, marginBottom: '14px' }}>
                {step.desc}
              </p>

              <Link
                to={step.link}
                onClick={() => completeStep(step.id)}
                style={{
                  display: 'inline-block',
                  padding: '7px 16px', borderRadius: '999px',
                  background: done ? '#a07810' : 'linear-gradient(135deg, #d4a017, #a07810)',
                  color: '#fff', fontSize: '0.78rem', fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {done ? '✓ Done' : step.linkLabel}
              </Link>
            </div>
          );
        })}
      </div>

      {allDone && (
        <div
          className="animate-fade-in-up"
          role="status"
          style={{
            marginTop: '24px', padding: '20px',
            borderRadius: '20px', textAlign: 'center',
            background: 'linear-gradient(135deg, #d4a017, #a07810)',
            color: '#fff',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎉🌼👑</div>
          <p style={{ fontWeight: 700, fontSize: '1rem' }}>Three steps completed!</p>
          <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '4px' }}>
            Now you are officially ready for Onam. 😌🌼
          </p>
        </div>
      )}
    </div>
  );
};
