import { useStore } from '../store/useStore';
import './MessageHistory.css';

export default function MessageHistory() {
  const messages = useStore((state) => state.messages);
  const clearMessages = useStore((state) => state.clearMessages);
  const setCurrentText = useStore((state) => state.setCurrentText);

  return (
    <div className="message-history">
      <div className="history-header">
        <h2>Recent Messages</h2>
        {messages.length > 0 && (
          <button className="clear-history-button" onClick={clearMessages}>
            Clear
          </button>
        )}
      </div>
      <div className="history-list">
        {messages.length === 0 ? (
          <div className="empty-history">No messages yet</div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="history-item"
              onClick={() => setCurrentText(message.text)}
            >
              <div className="history-text">{message.text}</div>
              <div className="history-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
