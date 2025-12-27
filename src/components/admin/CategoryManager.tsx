import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Category } from '../../types';
import './CategoryManager.css';

export default function CategoryManager() {
  const categories = useStore((state) => state.categories);
  const addCategory = useStore((state) => state.addCategory);
  const updateCategory = useStore((state) => state.updateCategory);
  const deleteCategory = useStore((state) => state.deleteCategory);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    emoji: '',
    color: '#667eea',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      emoji: '',
      color: '#667eea',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.color) return;

    if (editingId) {
      updateCategory(editingId, formData);
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name!,
        emoji: formData.emoji || '📁',
        color: formData.color!,
      };
      addCategory(newCategory);
    }
    resetForm();
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      emoji: category.emoji,
      color: category.color,
    });
    setEditingId(category.id);
    setIsAdding(true);
  };

  const predefinedColors = [
    '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
    '#F38181', '#AA96DA', '#667eea', '#764ba2',
    '#f093fb', '#4facfe', '#43e97b', '#fa709a',
  ];

  return (
    <div className="category-manager">
      <div className="manager-header">
        <h2>Manage Categories</h2>
        <button
          className="add-button"
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          + Add Category
        </button>
      </div>

      {isAdding && (
        <form className="category-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Category' : 'Add New Category'}</h3>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., People, Food, Actions"
              required
            />
          </div>
          <div className="form-group">
            <label>Emoji</label>
            <input
              type="text"
              value={formData.emoji}
              onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
              placeholder="e.g., 👥, 🍎, 🏃"
            />
          </div>
          <div className="form-group">
            <label>Color *</label>
            <div className="color-picker">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="color-input"
              />
              <div className="predefined-colors">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData({ ...formData, color })}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              {editingId ? 'Update' : 'Add'} Category
            </button>
            <button type="button" className="cancel-button" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="categories-list">
        {categories.length === 0 ? (
          <div className="empty-message">No categories yet. Add your first category!</div>
        ) : (
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                style={{ borderColor: category.color }}
              >
                <div className="category-card-header">
                  <span
                    className="category-preview"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.emoji || '📁'}
                  </span>
                  <div className="category-card-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(category)}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        if (window.confirm(`Delete category "${category.name}"? This will also delete all icons in this category.`)) {
                          deleteCategory(category.id);
                        }
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="category-card-body">
                  <div className="category-name">{category.name}</div>
                  <div className="category-color" style={{ color: category.color }}>
                    {category.color}
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
