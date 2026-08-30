import React, { useEffect, useRef, useState } from 'react';
import { Trash2, User, ChevronDown } from 'lucide-react';
import { ChatMessage, TypingIndicator } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { ModeSelector } from '../components/ModeSelector';
import { VamananAvatar } from '../components/VamananAvatar';
import { useChat } from '../hooks/useChat';
import { useSpeech } from '../hooks/useSpeech';
import { isAIConfigured } from '../services/aiService';

const GREETINGS = [
  "Namaskaaaram! 🙏🌼 Njan Vamanan! Ask me anything about Onam, Kerala, or just have a chat! Moonnu adi mathiyallo... but our conversation can be much longer! 😌",
  "Ahh, a visitor! 🌸 Welcome to my little corner of the internet! I am Vamanan — small in size, but BIG in ideas! What would you like to talk about today? 😏",
  "Hello hello! 👋 Vamanan here, the one who covered the universe in three steps! 😂 Innu ningalode samsaarikkan vannu. What's on your mind? 🌼"
];

const WELCOME_MSG = {
  id: 'welcome',
  role: 'assistant' as const,
  content: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
  timestamp: new Date()
};

export const Chat: React.FC = () => {
  const {
    messages,
    isTyping,
    mode,
    setMode,
    userName,
    setUserName,
    usingAI,
    sendMessage,
    regenerateLast,
    clearChat,
    forgetUser
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [aiEnabled] = useState(isAIConfigured);

  const { isListening, isSupported: isSpeechSupported, voiceEnabled, setVoiceEnabled,
    startListening, stopListening, speak, transcript } = useSpeech((text) => {
    if (text) sendMessage(text);
  });

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setShowScrollBtn(!atBottom);
  };

  // Speak Vamanan's latest message if voice is on
  useEffect(() => {
    if (!voiceEnabled) return;
    const last = messages[messages.length - 1];
    if (last?.role === 'assistant') {
      speak(last.content);
    }
  }, [messages, voiceEnabled, speak]);

  const displayMessages = messages.length === 0 ? [WELCOME_MSG] : messages;

  return (
    <div
      className="chat-page"
      style={{ paddingTop: '64px', background: 'linear-gradient(180deg, #fdf3d8 0%, #fef9e7 100%)' }}
    >
      {/* ── Chat Header ── */}
      <div
        className="glass flex-shrink-0 flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(212,160,23,0.3)' }}
      >
        <div className="flex items-center gap-3">
          <VamananAvatar size="sm" animate />
          <div>
            <h1
              className="font-bold text-sm"
              style={{ fontFamily: "'Playfair Display', serif", color: '#78350f' }}
            >
              🪷 Vamanan GPT
            </h1>
            <p className="text-xs" style={{ color: '#d97706' }}>
              {isTyping ? '✨ Thinking...' : usingAI ? '🟢 AI Active' : '🟡 Fallback Mode'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg transition-colors text-xs font-medium"
            style={{ color: '#d97706' }}
            aria-label="Settings"
          >
            {showSettings ? '✕' : '⚙️'}
          </button>
          <button
            onClick={clearChat}
            className="p-2 rounded-lg transition-colors"
            style={{ color: '#d97706' }}
            aria-label="Clear chat history"
            title="Clear chat"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* ── Settings Panel ── */}
      {showSettings && (
        <div
          className="animate-fade-in-up flex-shrink-0 px-4 py-3 border-b"
          style={{ background: 'rgba(254,249,231,0.95)', borderColor: 'rgba(212,160,23,0.2)' }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: '#b45309' }}>
            Choose Vamanan's Mode
          </p>
          <ModeSelector current={mode} onChange={setMode} compact />

          <div className="flex items-center gap-3 mt-3">
            <label
              htmlFor="nameInput"
              className="text-xs font-semibold flex items-center gap-1 flex-shrink-0"
              style={{ color: '#b45309' }}
            >
              <User size={12} /> Your Name
            </label>
            <input
              id="nameInput"
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Tell Vamanan your name..."
              className="flex-1 px-3 py-1.5 text-xs rounded-full border focus:outline-none"
              style={{
                background: '#fff',
                borderColor: 'rgba(212,160,23,0.4)',
                color: '#78350f'
              }}
            />
            {userName && (
              <button
                onClick={forgetUser}
                className="text-xs flex-shrink-0"
                style={{ color: '#d97706' }}
                title="Forget my name"
              >
                Forget
              </button>
            )}
          </div>

          {!aiEnabled && (
            <p
              className="text-xs mt-2 px-3 py-1.5 rounded-lg"
              style={{ color: '#d97706', background: 'rgba(254,243,199,0.8)' }}
            >
              💡 Add VITE_OPENAI_API_KEY to .env for full AI responses
            </p>
          )}
        </div>
      )}

      {/* ── Mode Bar ── */}
      {!showSettings && (
        <div
          className="flex-shrink-0 px-3 py-2 border-b overflow-x-auto scrollbar-hide"
          style={{ background: 'rgba(254,249,231,0.6)', borderColor: 'rgba(212,160,23,0.15)' }}
        >
          <ModeSelector current={mode} onChange={setMode} compact />
        </div>
      )}

      {/* ── Messages ── */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="chat-messages px-4 py-4"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        {displayMessages.map((msg, i) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onRegenerate={
              i === displayMessages.length - 1 && msg.role === 'assistant'
                ? regenerateLast
                : undefined
            }
            isLast={i === displayMessages.length - 1}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Scroll Button ── */}
      {showScrollBtn && (
        <button
          onClick={() => scrollToBottom()}
          className="fixed right-4 z-40 p-2 rounded-full text-white shadow-lg transition-colors"
          style={{ bottom: '90px', background: '#d97706' }}
          aria-label="Scroll to bottom"
        >
          <ChevronDown size={18} />
        </button>
      )}

      {/* ── Input ── */}
      <div className="flex-shrink-0">
        <ChatInput
          onSend={sendMessage}
          disabled={isTyping}
          isListening={isListening}
          isSpeechSupported={isSpeechSupported}
          voiceEnabled={voiceEnabled}
          onVoiceToggle={() => setVoiceEnabled(!voiceEnabled)}
          onMicClick={isListening ? stopListening : startListening}
          transcript={transcript}
        />
      </div>
    </div>
  );
};
