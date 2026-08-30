import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import type { Message } from '../services/aiService';
import { VamananAvatar } from './VamananAvatar';

interface ChatMessageProps {
  message: Message;
  onRegenerate?: () => void;
  isLast?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRegenerate, isLast }) => {
  const [copied, setCopied] = useState(false);
  const isVamanan = message.role === 'assistant';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const formatTime = (date: Date) =>
    new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const renderContent = (content: string) =>
    content.split('\n').map((line, i, arr) => (
      <React.Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <div
      className="animate-fade-in-up"
      role="article"
      aria-label={`${isVamanan ? 'Vamanan' : 'You'}: ${message.content.slice(0, 50)}`}
      style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
        justifyContent: isVamanan ? 'flex-start' : 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      {isVamanan && (
        <div style={{ flexShrink: 0, alignSelf: 'flex-end' }}>
          <VamananAvatar size="sm" />
        </div>
      )}

      <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', alignItems: isVamanan ? 'flex-start' : 'flex-end' }}>
        {isVamanan && (
          <span style={{ fontSize: '0.7rem', color: '#b45309', fontWeight: 600, marginBottom: '3px', paddingLeft: '4px' }}>
            Vamanan 🪷
          </span>
        )}

        <div
          className={isVamanan ? 'chat-bubble-vamanan' : 'chat-bubble-user'}
          style={{ padding: '10px 14px', fontSize: '0.875rem', lineHeight: 1.6 }}
        >
          {renderContent(message.content)}
        </div>

        {/* Timestamp + actions */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          marginTop: '4px', paddingLeft: '4px', paddingRight: '4px'
        }}>
          <span style={{ fontSize: '0.68rem', color: 'rgba(180,83,9,0.6)' }}>
            {formatTime(message.timestamp)}
          </span>
          {isVamanan && (
            <>
              <button
                onClick={handleCopy}
                title="Copy message"
                aria-label="Copy message"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '2px', color: '#d97706', lineHeight: 0,
                  borderRadius: '4px'
                }}
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
              </button>
              {isLast && onRegenerate && (
                <button
                  onClick={onRegenerate}
                  title="Regenerate"
                  aria-label="Regenerate response"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '2px', color: '#d97706', lineHeight: 0,
                    borderRadius: '4px'
                  }}
                >
                  <RefreshCw size={11} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const TypingIndicator: React.FC = () => (
  <div
    className="animate-fade-in-up"
    aria-label="Vamanan is typing"
    aria-live="polite"
    style={{
      display: 'flex', gap: '8px',
      marginBottom: '16px', alignItems: 'flex-end'
    }}
  >
    <div style={{ flexShrink: 0 }}>
      <VamananAvatar size="sm" typing />
    </div>
    <div
      className="chat-bubble-vamanan"
      style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
    >
      <span style={{ fontSize: '0.72rem', color: '#b45309', marginRight: '4px' }}>
        Vamanan is thinking
      </span>
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  </div>
);
