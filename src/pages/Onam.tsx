import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, MessageCircle } from 'lucide-react';
import { onamCards, type OnamCard } from '../data/onamData';
import { VamananAvatar } from '../components/VamananAvatar';

const OnamCardModal: React.FC<{ card: OnamCard; onClose: () => void }> = ({ card, onClose }) => (
  <div
    onClick={onClose}
    role="dialog" aria-modal="true" aria-labelledby="modal-title"
    style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    }}
  >
    <div
      onClick={e => e.stopPropagation()}
      className="animate-fade-in-up"
      style={{
        maxWidth: '520px', width: '100%',
        borderRadius: '24px', overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        background: 'linear-gradient(160deg, #fef9e7, #fdf3d8)',
        maxHeight: '90vh', overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        background: 'linear-gradient(135deg, #5c3d11, #7a5225)',
        display: 'flex', alignItems: 'flex-start', gap: '14px',
      }}>
        <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>{card.emoji}</span>
        <div style={{ flex: 1 }}>
          <h2 id="modal-title" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.3rem', fontWeight: 700, color: '#fef9e7', margin: 0,
          }}>{card.title}</h2>
          <p style={{ fontSize: '0.8rem', color: '#fcd34d', marginTop: '2px' }}>{card.subtitle}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer',
            borderRadius: '50%', padding: '6px',
            color: '#fef9e7', display: 'flex',
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 24px' }}>
        <p style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: 1.7, marginBottom: '16px' }}>
          {card.description}
        </p>

        {/* Vamanan says */}
        <div style={{
          display: 'flex', gap: '12px',
          background: 'rgba(254,243,199,0.5)',
          border: '1px solid rgba(212,160,23,0.2)',
          borderRadius: '16px', padding: '14px',
          marginBottom: '16px',
        }}>
          <VamananAvatar size="sm" />
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#b45309', marginBottom: '5px' }}>
              Vamanan says... 🪷
            </p>
            <p style={{ fontSize: '0.82rem', color: '#78350f', lineHeight: 1.6 }}>
              {card.vamananSays}
            </p>
          </div>
        </div>

        <Link
          to={`/chat`}
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '11px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #d4a017, #a07810)',
            color: '#fff', fontSize: '0.875rem', fontWeight: 600,
            textDecoration: 'none', transition: 'transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <MessageCircle size={16} /> Ask Vamanan more
        </Link>
      </div>
    </div>
  </div>
);

export const Onam: React.FC = () => {
  const [selected, setSelected] = useState<OnamCard | null>(null);

  return (
    <div className="kerala-pattern" style={{ minHeight: '100vh', paddingTop: '64px', paddingBottom: '60px' }}>
      {selected && <OnamCardModal card={selected} onClose={() => setSelected(null)} />}

      {/* Header */}
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', padding: '48px 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <VamananAvatar size="md" animate />
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 700, color: '#78350f', marginBottom: '10px',
        }}>
          Explore Onam with Vamanan
        </h1>
        <p style={{ color: '#b45309', maxWidth: '480px', margin: '0 auto', fontSize: '0.9rem' }}>
          Click any card to let Vamanan explain it in his own unique, clever way! 😌
        </p>
      </div>

      {/* Kerala stripe */}
      <div className="kerala-stripe" style={{ maxWidth: '860px', margin: '0 auto 36px', borderRadius: '2px', opacity: 0.5 }} aria-hidden="true" />

      {/* Cards grid */}
      <div style={{
        maxWidth: '900px', margin: '0 auto', padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        {onamCards.map(card => (
          <button
            key={card.id}
            onClick={() => setSelected(card)}
            aria-label={`Learn about ${card.title}`}
            style={{
              textAlign: 'left', padding: '20px',
              borderRadius: '20px', cursor: 'pointer',
              border: '2px solid rgba(212,160,23,0.22)',
              background: '#fff',
              transition: 'all 0.22s',
              outline: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,160,23,0.2)';
              e.currentTarget.style.borderColor = 'rgba(212,160,23,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(212,160,23,0.22)';
            }}
            onFocus={e => {
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.4)';
            }}
            onBlur={e => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{card.emoji}</div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: '0.95rem', color: '#78350f', marginBottom: '4px',
            }}>{card.title}</h3>
            <p style={{ fontSize: '0.72rem', color: '#d97706', marginBottom: '8px' }}>{card.subtitle}</p>
            <p style={{ fontSize: '0.75rem', color: '#b45309', lineHeight: 1.5 }}
              className="line-clamp-2">{card.description}</p>
            <div style={{
              marginTop: '12px', fontSize: '0.75rem', fontWeight: 600, color: '#d97706',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              Ask Vamanan <span>→</span>
            </div>
          </button>
        ))}
      </div>

      {/* Wish CTA */}
      <div style={{ maxWidth: '860px', margin: '48px auto 0', padding: '0 20px' }}>
        <div style={{
          padding: '40px 32px', borderRadius: '24px', textAlign: 'center',
          background: 'linear-gradient(135deg, #5c3d11, #3d2000)',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌸</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.6rem', fontWeight: 700, color: '#fef9e7', marginBottom: '8px',
          }}>Get Your Onam Wish</h2>
          <p style={{ color: '#fcd34d', fontSize: '0.875rem', marginBottom: '20px' }}>
            Let Vamanan craft a personalized Onam greeting just for you!
          </p>
          <Link
            to="/games"
            style={{
              display: 'inline-block', padding: '12px 24px', borderRadius: '999px',
              background: '#f59e0b', color: '#5c3d11',
              fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Generate My Onam Wish 🎉
          </Link>
        </div>
      </div>
    </div>
  );
};
