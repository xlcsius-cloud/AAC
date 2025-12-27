import { useStore } from '../store/useStore';
import IconButton from '../components/IconButton';
import './IconsView.css';

export default function IconsView() {
  const categories = useStore((state) => state.categories);
  const icons = useStore((state) => state.icons);
  const selectedCategory = useStore((state) => state.selectedCategory);
  const setSelectedCategory = useStore((state) => state.setSelectedCategory);
  const autoSpeakOnIconClick = useStore((state) => state.autoSpeakOnIconClick);
  const setAutoSpeakOnIconClick = useStore((state) => state.setAutoSpeakOnIconClick);

  const filteredIcons = selectedCategory
    ? icons.filter(icon => icon.category === selectedCategory)
    : icons;

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || '#667eea';
  };

  return (
    <div className="icons-view">
      <div className="icons-controls">
        <div className="category-filter">
          <button
            className={`category-button ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
            title="All Categories"
          >
            ⭐
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              title={category.name}
              style={{
                backgroundColor: selectedCategory === category.id ? category.color : '#f0f0f0',
                color: selectedCategory === category.id ? 'white' : '#666',
                borderColor: category.color,
              }}
            >
              <span className="category-emoji">{category.emoji}</span>
            </button>
          ))}
        </div>
        <div className="auto-speak-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={autoSpeakOnIconClick}
              onChange={(e) => setAutoSpeakOnIconClick(e.target.checked)}
              className="toggle-checkbox"
            />
            <span className="toggle-text">
              {autoSpeakOnIconClick ? '🔊 Auto-Speak ON' : '🔇 Auto-Speak OFF'}
            </span>
          </label>
        </div>
      </div>

      <div className="icons-grid">
        {filteredIcons.length === 0 ? (
          <div className="no-icons">No icons in this category</div>
        ) : (
          filteredIcons.map((icon) => (
            <IconButton
              key={icon.id}
              icon={icon}
              color={getCategoryColor(icon.category)}
            />
          ))
        )}
      </div>
    </div>
  );
}
