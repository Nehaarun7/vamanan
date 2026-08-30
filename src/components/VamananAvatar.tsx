import React from 'react';

interface VamananAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  typing?: boolean;
  className?: string;
}

const sizeMap = { sm: 40, md: 64, lg: 96, xl: 160 };

export const VamananAvatar: React.FC<VamananAvatarProps> = ({
  size = 'md', animate = false, typing = false, className = ''
}) => {
  const px = sizeMap[size];

  return (
    <div
      className={className}
      aria-label="Vamanan avatar"
      style={{
        position: 'relative', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center',
        width: px, height: px,
        animation: animate ? 'vamanan-float 3s ease-in-out infinite' : 'none',
        flexShrink: 0,
      }}
    >
      {/* Glow ring */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(240,201,64,0.35) 0%, transparent 70%)',
        animation: 'pulse-gold 2.5s infinite',
      }} />

      {/* Main circle */}
      <div style={{
        position: 'relative',
        width: px - 6, height: px - 6,
        borderRadius: '50%', overflow: 'hidden',
        background: 'linear-gradient(135deg, #fdf3d8 0%, #f0c940 50%, #d4a017 100%)',
        border: '2px solid #d4a017',
        boxShadow: '0 3px 12px rgba(212,160,23,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '80%', height: '80%' }}>
          {/* Body */}
          <ellipse cx="50" cy="72" rx="18" ry="22" fill="#c8845a" />
          {/* Dhoti */}
          <path d="M32 72 Q50 92 68 72 Q50 80 32 72Z" fill="#f0c940" opacity="0.9" />
          <path d="M36 72 L42 89 L50 83 L58 89 L64 72" fill="#f0c940" stroke="#d4a017" strokeWidth="0.5" />
          {/* Neck */}
          <rect x="45" y="50" width="10" height="10" rx="3" fill="#d4956a" />
          {/* Head */}
          <ellipse cx="50" cy="40" rx="16" ry="17" fill="#d4956a" />
          {/* Eyes */}
          <ellipse cx="44" cy="38" rx="3" ry="3.5" fill="white" />
          <ellipse cx="56" cy="38" rx="3" ry="3.5" fill="white" />
          <circle cx="45" cy="38.5" r="1.8" fill="#3d2000" />
          <circle cx="57" cy="38.5" r="1.8" fill="#3d2000" />
          <circle cx="45.7" cy="37.5" r="0.6" fill="white" />
          <circle cx="57.7" cy="37.5" r="0.6" fill="white" />
          {/* Smile */}
          <path d="M44 44 Q50 49 56 44" stroke="#3d2000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Brows */}
          <path d="M41 34 Q44 32 47 34" stroke="#5c3d11" strokeWidth="1.2" fill="none" />
          <path d="M53 34 Q56 32 59 34" stroke="#5c3d11" strokeWidth="1.2" fill="none" />
          {/* Tilaka */}
          <ellipse cx="50" cy="31" rx="2" ry="3" fill="#c0392b" />
          <line x1="50" y1="28" x2="50" y2="25" stroke="#c0392b" strokeWidth="1.5" />
          {/* Crown */}
          <path d="M36 32 Q38 20 50 18 Q62 20 64 32" fill="#f0c940" stroke="#d4a017" strokeWidth="1" />
          <circle cx="50" cy="20" r="3" fill="#e74c3c" />
          <circle cx="42" cy="25" r="2" fill="#3498db" />
          <circle cx="58" cy="25" r="2" fill="#2ecc71" />
          {/* Ear ornaments */}
          <circle cx="34" cy="40" r="2.5" fill="#f0c940" stroke="#d4a017" strokeWidth="0.5" />
          <circle cx="66" cy="40" r="2.5" fill="#f0c940" stroke="#d4a017" strokeWidth="0.5" />
          {/* Necklace */}
          <path d="M40 54 Q50 60 60 54" stroke="#f0c940" strokeWidth="1.5" fill="none" />
          {/* Arms */}
          <ellipse cx="30" cy="65" rx="7" ry="13" fill="#d4956a" transform="rotate(-15 30 65)" />
          <ellipse cx="70" cy="65" rx="7" ry="13" fill="#d4956a" transform="rotate(15 70 65)" />
          {/* Hands */}
          <ellipse cx="26" cy="75" rx="5" ry="6" fill="#d4956a" />
          <ellipse cx="74" cy="75" rx="5" ry="6" fill="#d4956a" />
          {/* Sacred thread */}
          <path d="M35 55 Q40 52 50 54 Q60 52 65 55" stroke="#f5e6a3" strokeWidth="1" fill="none" />
        </svg>

        {/* Typing dots overlay */}
        {typing && (
          <div style={{
            position: 'absolute', bottom: '4px', left: 0, right: 0,
            display: 'flex', justifyContent: 'center', gap: '3px',
          }}>
            <span className="typing-dot" style={{ width: '5px', height: '5px' }} />
            <span className="typing-dot" style={{ width: '5px', height: '5px' }} />
            <span className="typing-dot" style={{ width: '5px', height: '5px' }} />
          </div>
        )}
      </div>

      {/* Petal decorations for xl */}
      {size === 'xl' && (
        <div aria-hidden="true">
          {['🌸', '🌼', '🪷', '🌺', '🌸', '🌼'].map((petal, i) => (
            <span key={i} style={{
              position: 'absolute',
              top: '50%', left: '50%',
              fontSize: '0.85rem',
              transform: `rotate(${i * 60}deg) translateY(-${px / 2 + 14}px)`,
              transformOrigin: '0 0',
              marginTop: '-10px', marginLeft: '-8px',
            }}>{petal}</span>
          ))}
        </div>
      )}
    </div>
  );
};
