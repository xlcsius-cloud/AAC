import { useState } from 'react';
import { useStore } from '../store/useStore';
import IconManager from '../components/admin/IconManager';
import CategoryManager from '../components/admin/CategoryManager';
import './AdminInterface.css';

export default function AdminInterface() {
  const [activeTab, setActiveTab] = useState<'icons' | 'categories'>('icons');

  return (
    <div className="admin-interface">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage icons and categories for the communication board</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'icons' ? 'active' : ''}`}
          onClick={() => setActiveTab('icons')}
        >
          📱 Icons
        </button>
        <button
          className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          🗂️ Categories
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'icons' ? <IconManager /> : <CategoryManager />}
      </div>
    </div>
  );
}
