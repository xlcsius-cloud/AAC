import { useStore } from '../store/useStore';
import './KeyboardView.css';

export default function KeyboardView() {
  const currentText = useStore((state) => state.currentText);
  const setCurrentText = useStore((state) => state.setCurrentText);
  const addMessage = useStore((state) => state.addMessage);

  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const handleKeyClick = (key: string) => {
    setCurrentText(currentText + key);
  };

  const handleSpace = () => {
    setCurrentText(currentText + ' ');
  };

  const handleBackspace = () => {
    setCurrentText(currentText.slice(0, -1));
  };

  const handleSend = () => {
    if (currentText.trim()) {
      addMessage(currentText.trim());
      setCurrentText('');
    }
  };

  const quickWords = ['Hello', 'Yes', 'No', 'Please', 'Thank you', 'Help', 'Hungry', 'Thirsty', 'Happy', 'Sad'];

  const handleQuickWord = (word: string) => {
    setCurrentText(currentText ? `${currentText} ${word}` : word);
  };

  return (
    <div className="keyboard-view">
      <div className="quick-words">
        {quickWords.map((word) => (
          <button
            key={word}
            className="quick-word-button"
            onClick={() => handleQuickWord(word)}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="keyboard-container">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key}
                className="key-button"
                onClick={() => handleKeyClick(key.toLowerCase())}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="keyboard-controls">
        <button className="control-button space-button" onClick={handleSpace}>
          Space
        </button>
        <button className="control-button backspace-button" onClick={handleBackspace}>
          ⌫ Backspace
        </button>
        <button className="control-button send-button" onClick={handleSend}>
          Send →
        </button>
      </div>
    </div>
  );
}
