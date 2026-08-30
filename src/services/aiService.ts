import { VAMANAN_SYSTEM_PROMPT, MODE_PROMPTS } from '../data/vamananPersonality';
import { getFallbackResponse } from '../data/fallbackResponses';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  conversationHistory: Message[];
  mode?: string;
  userName?: string;
}

const API_BASE = import.meta.env.VITE_API_URL || '';

async function callOpenAI(request: ChatRequest): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const modePrompt = request.mode ? (MODE_PROMPTS[request.mode] || '') : '';
  const userContext = request.userName ? `\nThe user's name is ${request.userName}. Address them by name occasionally.` : '';
  
  const systemPrompt = VAMANAN_SYSTEM_PROMPT + (modePrompt ? `\n\nCURRENT MODE:\n${modePrompt}` : '') + userContext;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...request.conversationHistory.slice(-10).map(m => ({
      role: m.role,
      content: m.content
    })),
    { role: 'user', content: request.message }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: 0.85,
      presence_penalty: 0.3,
      frequency_penalty: 0.3
    })
  });

  if (!response.ok) {
    throw new Error(`API_ERROR_${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || getFallbackResponse(request.message, request.mode);
}

async function callBackendAPI(request: ChatRequest): Promise<string> {
  if (!API_BASE) {
    throw new Error('NO_BACKEND');
  }

  const response = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: request.message,
      conversationHistory: request.conversationHistory.slice(-10),
      mode: request.mode,
      userName: request.userName
    })
  });

  if (!response.ok) throw new Error('BACKEND_ERROR');
  const data = await response.json();
  return data.reply;
}

export async function sendMessage(request: ChatRequest): Promise<{ reply: string; isAI: boolean }> {
  // Try backend API first, then direct OpenAI, then fallback
  try {
    if (API_BASE) {
      const reply = await callBackendAPI(request);
      return { reply, isAI: true };
    }
  } catch {
    // Backend not available
  }

  try {
    const reply = await callOpenAI(request);
    return { reply, isAI: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'UNKNOWN';
    if (errorMsg !== 'NO_API_KEY') {
      console.warn('AI API error, using fallback:', errorMsg);
    }
  }

  // Fallback mode
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));
  return {
    reply: getFallbackResponse(request.message, request.mode || 'onamFriend'),
    isAI: false
  };
}

export function isAIConfigured(): boolean {
  return !!(import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_API_URL);
}
