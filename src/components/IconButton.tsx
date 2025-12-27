import { useStore } from '../store/useStore';
import './IconButton.css';
import { Icon } from '../types';

interface IconButtonProps {
  icon: Icon;
  color: string;
}

export default function IconButton({ icon, color }: IconButtonProps) {
  const appendToCurrentText = useStore((state) => state.appendToCurrentText);
  const addMessage = useStore((state) => state.addMessage);

  const handleClick = () => {
    appendToCurrentText(icon.label);
  };

  return (
    <button
      className="icon-button"
      onClick={handleClick}
      style={{
        backgroundColor: color,
        borderColor: color,
      }}
    >
      <div className="icon-emoji">{icon.emoji || '📌'}</div>
      <div className="icon-label">{icon.label}</div>
    </button>
  );
}
