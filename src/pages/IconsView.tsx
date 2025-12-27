import { useStore } from '../store/useStore';
import IconButton from '../components/IconButton';
import './IconsView.css';

export default function IconsView() {
  const categories = useStore((state) => state.categories);
  const icons = useStore((state) => state.icons);
  const selectedCategory = useStore((state) => state.selectedCategory);
  const setSelectedCategory = useStore((state) => state.setSelectedCategory);

  const filteredIcons = selectedCategory
    ? icons.filter(icon => icon.category === selectedCategory)
    : icons;

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || '#667eea';
  };

  return (
    <div className="icons-view">
      <div className="category-filter">
        <button
          className={`category-button ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
            style={{
              backgroundColor: selectedCategory === category.id ? category.color : '#f0f0f0',
              color: selectedCategory === category.id ? 'white' : '#666',
              borderColor: category.color,
            }}
          >
            <span className="category-emoji">{category.emoji}</span>
            {category.name}
          </button>
        ))}
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
