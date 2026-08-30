import React, { useState, useRef, type KeyboardEvent } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isListening?: boolean;
  isSpeechSupported?: boolean;
  voiceEnabled?: boolean;
  onVoiceToggle?: () => void;
  onMicClick?: () => void;
  transcript?: string;
}

const SUGGESTIONS = [
  "Tell me the Mahabali story 📖",
  "What is Onam Sadya? 🍛",
  "Give me an Onam wish 🌸",
  "Tell me a joke 😂",
  "What is Pookalam? 🌼",
  "Who is Mahabali? 👑",
];

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend, disabled = false,
  isListening = false, isSpeechSupported = false,
  voiceEnabled = false, onVoiceToggle, onMicClick,
  transcript = ''
}) => {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const msg = (isListening ? transcript : value).trim();
    if (!msg || disabled) return;
    onSend(msg);
    setValue('');
    setShowSuggestions(false);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = textareaRef.current;
    if (el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 120) + 'px'; }
  };

  const currentValue = isListening ? transcript : value;
  const canSend = currentValue.trim().length > 0 && !disabled;

  return (
    <div style={{
      borderTop: '1px solid rgba(212,160,23,0.2)',
      background: 'rgba(254,249,231,0.95)',
    }}>
      {/* Suggestions */}
      {showSuggestions && (
        <div style={{
          padding: '8px 12px 4px',
          display: 'flex', gap: '6px', overflowX: 'auto', flexWrap: 'nowrap'
        }} className="scrollbar-hide">
          {SUGGESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => { onSend(q); setShowSuggestions(false); }}
              disabled={disabled}
              style={{
                flexShrink: 0,
                padding: '5px 10px', borderRadius: '999px',
                fontSize: '0.72rem', cursor: 'pointer',
                background: '#fff',
                border: '1px solid rgba(212,160,23,0.3)',
                color: '#92400e', whiteSpace: 'nowrap',
                transition: 'background 0.15s',
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '8px 12px 10px' }}>
        {/* Voice toggle */}
        {onVoiceToggle && (
          <button
            onClick={onVoiceToggle}
            aria-label={voiceEnabled ? 'Disable voice' : 'Enable voice'}
            title={voiceEnabled ? 'Voice ON' : 'Voice OFF'}
            style={{
              flexShrink: 0, width: '38px', height: '38px',
              borderRadius: '50%', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: voiceEnabled ? '#f59e0b' : 'rgba(254,243,199,0.8)',
              color: voiceEnabled ? '#fff' : '#d97706',
              transition: 'all 0.2s',
            }}
          >
            {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        )}

        {/* Textarea */}
        <div style={{ flex: 1, position: 'relative' }}>
          <textarea
            ref={textareaRef}
            value={currentValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? '🎤 Listening...' : 'Ask Vamanan anything...'}
            disabled={disabled || isListening}
            rows={1}
            aria-label="Message input"
            autoComplete="off"
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '22px',
              border: '2px solid rgba(212,160,23,0.3)',
              background: '#fff',
              fontSize: '0.875rem',
              color: '#451a03',
              resize: 'none',
              outline: 'none',
              lineHeight: 1.5,
              minHeight: '42px',
              maxHeight: '120px',
              fontFamily: "'Poppins', sans-serif",
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = '#f59e0b')}
            onBlur={e => (e.target.style.borderColor = 'rgba(212,160,23,0.3)')}
          />
        </div>

        {/* Mic */}
        {isSpeechSupported && onMicClick && (
          <button
            onClick={onMicClick}
            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
            style={{
              flexShrink: 0, width: '38px', height: '38px',
              borderRadius: '50%', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isListening ? '#ef4444' : 'rgba(254,243,199,0.8)',
              color: isListening ? '#fff' : '#d97706',
              animation: isListening ? 'pulse-gold 1s infinite' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
        )}

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          style={{
            flexShrink: 0, width: '42px', height: '42px',
            borderRadius: '50%', border: 'none', cursor: canSend ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: canSend ? 'linear-gradient(135deg, #d4a017, #a07810)' : 'rgba(212,160,23,0.3)',
            color: '#fff',
            opacity: canSend ? 1 : 0.5,
            transition: 'all 0.2s',
            boxShadow: canSend ? '0 2px 8px rgba(212,160,23,0.35)' : 'none',
            transform: canSend ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  );
};
