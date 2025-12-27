import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <h1 className="home-title">Welcome to AAC App</h1>
        <p className="home-subtitle">
          An Augmentative and Alternative Communication application for non-verbal children
        </p>
        
        <div className="mode-selection">
          <Link to="/user/icons" className="mode-card user-mode">
            <div className="mode-icon">👤</div>
            <h2>User Mode</h2>
            <p>Simple interface for communication using icons or keyboard</p>
            <div className="mode-features">
              <span>📱 Icons Interface</span>
              <span>⌨️ Keyboard Interface</span>
            </div>
          </Link>

          <Link to="/admin" className="mode-card admin-mode">
            <div className="mode-icon">⚙️</div>
            <h2>Admin Mode</h2>
            <p>Manage icons, categories, and customize the communication board</p>
            <div className="mode-features">
              <span>➕ Add Icons</span>
              <span>🗂️ Manage Categories</span>
              <span>🎨 Customize</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
