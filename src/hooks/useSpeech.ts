import { useState, useCallback, useRef } from 'react';

interface SpeechState {
  isListening: boolean;
  isSpeaking: boolean;
  isSupported: boolean;
  transcript: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecognition = any;

export function useSpeech(onTranscript: (text: string) => void) {
  const [state, setState] = useState<SpeechState>({
    isListening: false,
    isSpeaking: false,
    isSupported: typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window),
    transcript: ''
  });
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const recognitionRef = useRef<AnyRecognition>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const startListening = useCallback(() => {
    if (!state.isSupported) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SR();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setState(s => ({ ...s, isListening: true }));
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setState(s => ({ ...s, transcript }));
        if (event.results[event.results.length - 1].isFinal) {
          onTranscript(transcript);
        }
      };

      recognition.onerror = () => {
        setState(s => ({ ...s, isListening: false }));
      };

      recognition.onend = () => {
        setState(s => ({ ...s, isListening: false, transcript: '' }));
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setState(s => ({ ...s, isListening: false }));
    }
  }, [state.isSupported, onTranscript]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setState(s => ({ ...s, isListening: false }));
  }, []);

  const speak = useCallback((text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const clean = text.replace(/[\u{1F300}-\u{1FFFF}]/gu, '');
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB'));
    if (preferred) utterance.voice = preferred;
    
    utterance.onstart = () => setState(s => ({ ...s, isSpeaking: true }));
    utterance.onend = () => setState(s => ({ ...s, isSpeaking: false }));
    utterance.onerror = () => setState(s => ({ ...s, isSpeaking: false }));
    
    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setState(s => ({ ...s, isSpeaking: false }));
  }, []);

  return {
    ...state,
    voiceEnabled,
    setVoiceEnabled,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  };
}
