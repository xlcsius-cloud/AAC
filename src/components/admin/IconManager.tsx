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
  const [imageMode, setImageMode] = useState<'emoji' | 'url' | 'upload'>('emoji');
  const [formData, setFormData] = useState<Partial<Icon>>({
    label: '',
    emoji: '',
    category: categories[0]?.id || '',
  });

  const resetForm = () => {
    setFormData({
      label: '',
      emoji: '',
      imageUrl: '',
      category: categories[0]?.id || '',
    });
    setImageMode('emoji');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setFormData({ ...formData, imageUrl: dataUrl, emoji: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.label || !formData.category) return;

    const iconData: Partial<Icon> = {
      label: formData.label!,
      category: formData.category!,
      color: categories.find(c => c.id === formData.category)?.color,
    };

    if (imageMode === 'upload' || imageMode === 'url') {
      if (formData.imageUrl) {
        iconData.imageUrl = formData.imageUrl;
        iconData.emoji = formData.emoji || undefined;
      } else {
        alert('Please provide an image URL or upload an image');
        return;
      }
    } else {
      iconData.emoji = formData.emoji || '📌';
      iconData.imageUrl = undefined;
    }

    if (editingId) {
      updateIcon(editingId, iconData);
    } else {
      const newIcon: Icon = {
        id: Date.now().toString(),
        ...iconData as Icon,
      };
      addIcon(newIcon);
    }
    resetForm();
  };

  const handleEdit = (icon: Icon) => {
    setFormData({
      label: icon.label,
      emoji: icon.emoji,
      imageUrl: icon.imageUrl,
      category: icon.category,
    });
    
    if (icon.imageUrl) {
      if (icon.imageUrl.startsWith('data:')) {
        setImageMode('upload');
      } else {
        setImageMode('url');
      }
    } else {
      setImageMode('emoji');
    }
    
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
            <label>Icon Type</label>
            <div className="icon-type-selector">
              <button
                type="button"
                className={`icon-type-button ${imageMode === 'emoji' ? 'active' : ''}`}
                onClick={() => {
                  setImageMode('emoji');
                  setFormData({ ...formData, imageUrl: '' });
                }}
              >
                😀 Emoji
              </button>
              <button
                type="button"
                className={`icon-type-button ${imageMode === 'url' ? 'active' : ''}`}
                onClick={() => {
                  setImageMode('url');
                  setFormData({ ...formData, emoji: '' });
                }}
              >
                🔗 Image URL
              </button>
              <button
                type="button"
                className={`icon-type-button ${imageMode === 'upload' ? 'active' : ''}`}
                onClick={() => {
                  setImageMode('upload');
                  setFormData({ ...formData, emoji: '' });
                }}
              >
                📷 Upload Image
              </button>
            </div>
          </div>

          {imageMode === 'emoji' && (
            <div className="form-group">
              <label>Emoji</label>
              <input
                type="text"
                value={formData.emoji || ''}
                onChange={(e) => setFormData({ ...formData, emoji: e.target.value, imageUrl: '' })}
                placeholder="e.g., 👩, 🍎, 😊"
              />
            </div>
          )}

          {imageMode === 'url' && (
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                value={formData.imageUrl || ''}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value, emoji: '' })}
                placeholder="https://example.com/image.png"
              />
              {formData.imageUrl && (
                <div className="image-preview">
                  <img src={formData.imageUrl} alt="Preview" />
                </div>
              )}
            </div>
          )}

          {imageMode === 'upload' && (
            <div className="form-group">
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="file-input"
              />
              {formData.imageUrl && formData.imageUrl.startsWith('data:') && (
                <div className="image-preview">
                  <img src={formData.imageUrl} alt="Preview" />
                </div>
              )}
            </div>
          )}
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
                    {icon.imageUrl ? (
                      <img src={icon.imageUrl} alt={icon.label} className="icon-preview-image" />
                    ) : (
                      icon.emoji || '📌'
                    )}
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
