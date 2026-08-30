import React from 'react';

interface Mode {
  id: string;
  emoji: string;
  label: string;
  desc: string;
}

const modes: Mode[] = [
  { id: 'onamFriend', emoji: '🌼', label: 'Onam Friend', desc: 'Festive & warm' },
  { id: 'storyteller', emoji: '📖', label: 'Storyteller', desc: 'Tales & legends' },
  { id: 'wise', emoji: '🧠', label: 'Wise Vamanan', desc: 'Deep wisdom' },
  { id: 'mischief', emoji: '😂', label: 'Mischief Mode', desc: 'Jokes & pranks' },
  { id: 'game', emoji: '🎮', label: 'Game Mode', desc: 'Quiz & riddles' },
  { id: 'wishes', emoji: '🎉', label: 'Onam Wishes', desc: 'Greetings' },
];

interface ModeSelectorProps {
  current: string;
  onChange: (mode: string) => void;
  compact?: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ current, onChange, compact = false }) => {
  if (compact) {
    return (
      <div
        role="group"
        aria-label="Vamanan modes"
        style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}
        className="scrollbar-hide"
      >
        {modes.map(mode => {
          const active = current === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onChange(mode.id)}
              aria-pressed={active}
              title={mode.desc}
              style={{
                flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '5px 10px', borderRadius: '999px',
                fontSize: '0.75rem', fontWeight: 500,
                border: 'none', cursor: 'pointer',
                transition: 'all 0.2s',
                background: active ? 'linear-gradient(135deg, #d4a017, #a07810)' : 'rgba(254,243,199,0.8)',
                color: active ? '#fff' : '#92400e',
                transform: active ? 'scale(1.05)' : 'scale(1)',
                boxShadow: active ? '0 2px 8px rgba(212,160,23,0.3)' : 'none',
              }}
            >
              <span>{mode.emoji}</span>
              <span style={{ display: window.innerWidth < 480 ? 'none' : 'inline' }}>{mode.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Vamanan modes"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '12px'
      }}
    >
      {modes.map(mode => {
        const active = current === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            aria-pressed={active}
            style={{
              textAlign: 'left', padding: '14px',
              borderRadius: '16px', cursor: 'pointer',
              border: `2px solid ${active ? '#f59e0b' : 'rgba(212,160,23,0.25)'}`,
              background: active ? 'rgba(254,243,199,0.8)' : '#fff',
              transition: 'all 0.2s',
              boxShadow: active ? '0 2px 10px rgba(212,160,23,0.2)' : 'none',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{mode.emoji}</div>
            <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#78350f', marginBottom: '2px' }}>{mode.label}</div>
            <div style={{ fontSize: '0.72rem', color: '#b45309' }}>{mode.desc}</div>
          </button>
        );
      })}
    </div>
  );
};
