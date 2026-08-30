import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { storyChapters } from '../data/onamData';
import { VamananAvatar } from '../components/VamananAvatar';

export const Story: React.FC = () => {
  const [chapter, setChapter] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = storyChapters[chapter];
  const isFirst = chapter === 0;
  const isLast = chapter === storyChapters.length - 1;

  const goNext = () => { if (isLast) setFinished(true); else setChapter(c => c + 1); };
  const goPrev = () => { if (finished) setFinished(false); else setChapter(c => Math.max(0, c - 1)); };
  const restart = () => { setChapter(0); setFinished(false); };

  return (
    <div className="kerala-pattern" style={{ minHeight: '100vh', paddingTop: '64px', paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '40px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
          <VamananAvatar size="md" animate />
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 700, color: '#78350f',
        }}>
          The Day Vamanan Came
        </h1>
        <p style={{ color: '#b45309', fontSize: '0.875rem', fontStyle: 'italic', marginTop: '6px' }}>
          "A story of three steps that changed the universe"
        </p>
      </div>

      {/* Progress dots */}
      <div style={{ maxWidth: '620px', margin: '0 auto 24px', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          {storyChapters.map((ch, i) => (
            <button
              key={i}
              onClick={() => { setChapter(i); setFinished(false); }}
              aria-label={`Chapter ${i + 1}: ${ch.title}`}
              aria-current={i === chapter && !finished ? 'true' : undefined}
              style={{
                height: '7px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                width: i === chapter && !finished ? '28px' : '16px',
                background: i < chapter || finished ? '#f59e0b' : i === chapter && !finished ? '#d4a017' : 'rgba(212,160,23,0.25)',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#d97706', marginTop: '6px' }}>
          {finished ? 'Story Complete! 🌸' : `Chapter ${chapter + 1} of ${storyChapters.length}`}
        </p>
      </div>

      {/* Story card */}
      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '0 20px' }}>
        {!finished ? (
          <div
            key={chapter}
            className="animate-fade-in-up"
            style={{
              borderRadius: '24px', overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(92,61,17,0.12)',
              border: '1px solid rgba(212,160,23,0.2)',
              background: 'linear-gradient(160deg, #fef9e7, #fdf3d8)',
            }}
          >
            {/* Chapter header */}
            <div style={{
              padding: '28px 32px', textAlign: 'center',
              background: 'linear-gradient(135deg, #5c3d11, #7a5225)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{current.emoji}</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem', fontWeight: 700, color: '#fef9e7',
              }}>
                {current.title}
              </h2>
              <p style={{ fontSize: '0.72rem', color: '#fcd34d', marginTop: '4px' }}>
                Chapter {current.id}
              </p>
            </div>

            {/* Text */}
            <div style={{ padding: '28px 32px' }}>
              {current.content.split('\n\n').map((para, i) => (
                <p key={i} style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  color: '#5c3d11', lineHeight: 1.85, marginBottom: '18px',
                }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Navigation */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0 32px 28px',
            }}>
              <button
                onClick={goPrev}
                disabled={isFirst}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '9px 16px', borderRadius: '999px',
                  border: 'none', cursor: isFirst ? 'not-allowed' : 'pointer',
                  background: 'rgba(254,243,199,0.8)', color: '#92400e',
                  fontSize: '0.82rem', fontWeight: 500,
                  opacity: isFirst ? 0.35 : 1,
                  transition: 'all 0.2s',
                }}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <button
                onClick={goNext}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '9px 18px', borderRadius: '999px',
                  border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #d4a017, #a07810)',
                  color: '#fff', fontSize: '0.82rem', fontWeight: 600,
                  boxShadow: '0 3px 10px rgba(212,160,23,0.35)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {isLast ? 'Finish Story 🌸' : <>Next Chapter <ChevronRight size={16} /></>}
              </button>
            </div>
          </div>
        ) : (
          /* Finished */
          <div
            className="animate-fade-in-up"
            style={{
              borderRadius: '24px', overflow: 'hidden', textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              background: 'linear-gradient(160deg, #5c3d11, #3d2000)',
            }}
          >
            <div style={{ padding: '48px 32px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🌼👑🌼</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem', fontWeight: 700, color: '#fef9e7', marginBottom: '14px',
              }}>
                Onam Ashamsakal!
              </h2>
              <p style={{ color: '#fcd34d', lineHeight: 1.7, fontSize: '0.875rem', marginBottom: '10px' }}>
                You've read the complete story of Vamanan and Mahabali. 🌸
              </p>
              <p style={{ color: 'rgba(252,211,77,0.7)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '28px' }}>
                "Onam is Kerala's eternal promise: We remember. We are grateful. We celebrate."
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                <Link
                  to="/chat"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    padding: '12px 20px', borderRadius: '999px',
                    background: '#f59e0b', color: '#5c3d11',
                    fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <MessageCircle size={16} /> Ask Vamanan about the story
                </Link>
                <button
                  onClick={restart}
                  style={{
                    padding: '12px 20px', borderRadius: '999px',
                    background: 'none', border: '1px solid rgba(252,211,77,0.4)',
                    color: '#fcd34d', fontSize: '0.875rem', cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  Read Again 📖
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chapter list */}
      <div style={{ maxWidth: '620px', margin: '28px auto 0', padding: '0 20px' }}>
        <p style={{ textAlign: 'center', fontSize: '0.78rem', fontWeight: 600, color: '#b45309', marginBottom: '12px' }}>
          Story Chapters
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
          {storyChapters.map((ch, i) => {
            const active = i === chapter && !finished;
            const past = i < chapter || finished;
            return (
              <button
                key={ch.id}
                onClick={() => { setChapter(i); setFinished(false); }}
                style={{
                  padding: '10px', borderRadius: '14px', textAlign: 'left',
                  cursor: 'pointer',
                  background: active ? '#f59e0b' : past ? 'rgba(254,243,199,0.8)' : '#fff',
                  color: active ? '#fff' : '#78350f',
                  border: `1px solid ${active ? '#d97706' : 'rgba(212,160,23,0.2)'}`,
                  transition: 'all 0.2s',
                } as React.CSSProperties}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{ch.emoji}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, lineHeight: 1.3 }}>{ch.title}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
