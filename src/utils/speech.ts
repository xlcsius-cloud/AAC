/**
 * Utility function to speak text using the Web Speech API
 * @param text - The text to speak
 */
export function speakText(text: string): void {
  if (!text) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.lang = 'en-US';

  window.speechSynthesis.speak(utterance);
}
