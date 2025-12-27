import { Outlet, NavLink } from 'react-router-dom';
import { useStore } from '../store/useStore';
import TextToSpeech from '../components/TextToSpeech';
import MessageHistory from '../components/MessageHistory';
import './UserInterface.css';

export default function UserInterface() {
  const currentText = useStore((state) => state.currentText);
  const clearCurrentText = useStore((state) => state.clearCurrentText);
  const addMessage = useStore((state) => state.addMessage);

  const handleSend = () => {
    if (currentText.trim()) {
      addMessage(currentText.trim());
      clearCurrentText();
    }
  };

  return (
    <div className="user-interface">
      <div className="user-header">
        <h1>Communication</h1>
        <nav className="user-nav">
          <NavLink to="icons" className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
            📱 Icons
          </NavLink>
          <NavLink to="keyboard" className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
            ⌨️ Keyboard
          </NavLink>
        </nav>
      </div>

      <div className="user-main">
        <div className="communication-panel">
          <div className="current-message">
            <div className="message-display">
              {currentText || <span className="placeholder">Your message will appear here...</span>}
            </div>
            <div className="message-actions">
              <TextToSpeech text={currentText} />
              <button 
                className="send-button" 
                onClick={handleSend}
                disabled={!currentText.trim()}
              >
                Send
              </button>
              <button 
                className="clear-button" 
                onClick={clearCurrentText}
                disabled={!currentText}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="communication-area">
            <Outlet />
          </div>
        </div>

        <MessageHistory />
      </div>
    </div>
  );
}
