import { useState } from 'react';
import './TextToSpeech.css';

interface TextToSpeechProps {
  text: string;
}

export default function TextToSpeech({ text }: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (!text || isSpeaking) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  if (!text) {
    return (
      <button className="speak-button" disabled>
        🔊 Speak
      </button>
    );
  }

  return (
    <button
      className={`speak-button ${isSpeaking ? 'speaking' : ''}`}
      onClick={isSpeaking ? stop : speak}
    >
      {isSpeaking ? '⏸️ Stop' : '🔊 Speak'}
    </button>
  );
}
