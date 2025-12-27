import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Icon } from '../../types';
import './IconManager.css';

export default function IconManager() {
  const icons = useStore((state) => state.icons);
  const categories = useStore((state) => state.categories);
  const addIcon = useStore((state) => state.addIcon);
  const updateIcon = useStore((state) => state.updateIcon);
  const deleteIcon = useStore((state) => state.deleteIcon);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Icon>>({
    label: '',
    emoji: '',
    category: categories[0]?.id || '',
  });

  const resetForm = () => {
    setFormData({
      label: '',
      emoji: '',
      category: categories[0]?.id || '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.label || !formData.category) return;

    if (editingId) {
      updateIcon(editingId, formData);
    } else {
      const newIcon: Icon = {
        id: Date.now().toString(),
        label: formData.label!,
        emoji: formData.emoji || '📌',
        category: formData.category!,
        color: categories.find(c => c.id === formData.category)?.color,
      };
      addIcon(newIcon);
    }
    resetForm();
  };

  const handleEdit = (icon: Icon) => {
    setFormData({
      label: icon.label,
      emoji: icon.emoji,
      category: icon.category,
    });
    setEditingId(icon.id);
    setIsAdding(true);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || '#667eea';
  };

  return (
    <div className="icon-manager">
      <div className="manager-header">
        <h2>Manage Icons</h2>
        <button
          className="add-button"
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          + Add Icon
        </button>
      </div>

      {isAdding && (
        <form className="icon-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Icon' : 'Add New Icon'}</h3>
          <div className="form-group">
            <label>Label *</label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g., Mom, Apple, Happy"
              required
            />
          </div>
          <div className="form-group">
            <label>Emoji</label>
            <input
              type="text"
              value={formData.emoji}
              onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
              placeholder="e.g., 👩, 🍎, 😊"
            />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              {editingId ? 'Update' : 'Add'} Icon
            </button>
            <button type="button" className="cancel-button" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="icons-list">
        {icons.length === 0 ? (
          <div className="empty-message">No icons yet. Add your first icon!</div>
        ) : (
          <div className="icons-grid">
            {icons.map((icon) => (
              <div
                key={icon.id}
                className="icon-card"
                style={{ borderColor: getCategoryColor(icon.category) }}
              >
                <div className="icon-card-header">
                  <span className="icon-preview" style={{ backgroundColor: getCategoryColor(icon.category) }}>
                    {icon.emoji || '📌'}
                  </span>
                  <div className="icon-card-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(icon)}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => deleteIcon(icon.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="icon-card-body">
                  <div className="icon-label">{icon.label}</div>
                  <div className="icon-category">
                    {getCategoryName(icon.category)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
