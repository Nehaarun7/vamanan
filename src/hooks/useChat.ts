import { useState, useCallback, useRef } from 'react';
import { type Message, sendMessage, isAIConfigured } from '../services/aiService';

const STORAGE_KEY = 'vamanan_chat_history';
const USER_NAME_KEY = 'vamanan_user_name';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function loadHistory(): Message[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return parsed.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch {
    return [];
  }
}

function saveHistory(messages: Message[]) {
  try {
    const toSave = messages.slice(-50); // Keep last 50 messages
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // Storage full or unavailable
  }
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(loadHistory);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState('onamFriend');
  const [userName, setUserNameState] = useState<string>(() => localStorage.getItem(USER_NAME_KEY) || '');
  const [usingAI, setUsingAI] = useState(isAIConfigured());
  const abortRef = useRef<AbortController | null>(null);

  const setUserName = useCallback((name: string) => {
    setUserNameState(name);
    localStorage.setItem(USER_NAME_KEY, name);
  }, []);

  const sendUserMessage = useCallback(async (content: string) => {
    if (!content.trim() || isTyping) return;

    // Extract name if mentioned
    const nameMatch = content.match(/(?:my name is|i am|call me|njan|njante peru)\s+([A-Za-z]+)/i);
    if (nameMatch && !userName) {
      setUserName(nameMatch[1]);
    }

    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveHistory(updatedMessages);
    setIsTyping(true);

    try {
      const result = await sendMessage({
        message: content,
        conversationHistory: messages,
        mode,
        userName: userName || undefined
      });

      setUsingAI(result.isAI);

      const assistantMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: result.reply,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, assistantMsg];
      setMessages(finalMessages);
      saveHistory(finalMessages);
    } catch {
      const errorMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: "Ayyoo... Vamanan's connection got a little tired! 😅 Try again in a moment. 🌼",
        timestamp: new Date()
      };
      const withError = [...updatedMessages, errorMsg];
      setMessages(withError);
      saveHistory(withError);
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping, mode, userName, setUserName]);

  const regenerateLast = useCallback(async () => {
    if (isTyping || messages.length < 2) return;
    
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) return;

    const withoutLast = messages.filter((_, i) => i !== messages.length - 1);
    setMessages(withoutLast);
    await sendUserMessage(lastUserMsg.content);
  }, [messages, isTyping, sendUserMessage]);

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const forgetUser = useCallback(() => {
    setUserNameState('');
    localStorage.removeItem(USER_NAME_KEY);
  }, []);

  return {
    messages,
    isTyping,
    mode,
    setMode,
    userName,
    setUserName,
    usingAI,
    sendMessage: sendUserMessage,
    regenerateLast,
    clearChat,
    forgetUser,
    abortRef
  };
}
