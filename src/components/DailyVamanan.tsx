import React, { useState } from 'react';
import { getTodaysDailyVamanan } from '../data/fallbackResponses';

const tabs = [
  { id: 'thought', emoji: '🌼', label: 'Thought' },
  { id: 'joke',    emoji: '😂', label: 'Joke' },
  { id: 'wisdom',  emoji: '🧠', label: 'Wisdom' },
  { id: 'story',   emoji: '📖', label: 'Story' },
] as const;

type TabId = typeof tabs[number]['id'];

export const DailyVamanan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('thought');
  const daily = getTodaysDailyVamanan();

  const content: Record<TabId, string> = {
    thought: daily.thought,
    joke: daily.joke,
    wisdom: daily.wisdom,
    story: daily.story,
  };

  return (
    <div style={{
      borderRadius: '20px', overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(212,160,23,0.15)',
      border: '1px solid rgba(212,160,23,0.2)',
      background: 'linear-gradient(135deg, #fef9e7, #fdf3d8)',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1.3rem' }}>✨</span>
        <div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: '1rem', color: '#78350f', marginBottom: '1px',
          }}>Today's Vamanan</h3>
          <p style={{ fontSize: '0.7rem', color: '#d97706' }}>Daily wisdom from the Clever Little Guide</p>
        </div>
      </div>

      {/* Tab buttons */}
      <div style={{ display: 'flex', gap: '6px', padding: '0 16px 10px', overflowX: 'auto' }}
        className="scrollbar-hide">
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '5px 12px', borderRadius: '999px',
                fontSize: '0.75rem', fontWeight: 500,
                border: 'none', cursor: 'pointer',
                background: active ? '#f59e0b' : 'rgba(254,243,199,0.8)',
                color: active ? '#fff' : '#92400e',
                transition: 'all 0.2s',
              }}
            >
              {tab.emoji} {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px 18px' }}>
        <p style={{
          fontSize: '0.875rem', color: '#78350f',
          lineHeight: 1.7, fontStyle: 'italic',
        }}>
          "{content[activeTab]}"
        </p>
        <p style={{ textAlign: 'right', fontSize: '0.72rem', color: '#d97706', marginTop: '8px' }}>
          — Vamanan 😌
        </p>
      </div>
    </div>
  );
};
