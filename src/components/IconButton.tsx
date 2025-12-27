import React from 'react';
import { useStore } from '../store/useStore';
import { speakText } from '../utils/speech';
import './IconButton.css';
import { Icon } from '../types';

interface IconButtonProps {
  icon: Icon;
  color: string;
}

export default function IconButton({ icon, color }: IconButtonProps) {
  const appendToCurrentText = useStore((state) => state.appendToCurrentText);
  const autoSpeakOnIconClick = useStore((state) => state.autoSpeakOnIconClick);

  const handleClick = () => {
    appendToCurrentText(icon.label);
    // Automatically speak if the setting is enabled
    if (autoSpeakOnIconClick) {
      speakText(icon.label);
    }
  };

  const [imageError, setImageError] = React.useState(false);

  return (
    <button
      className="icon-button"
      onClick={handleClick}
      style={{
        backgroundColor: color,
        borderColor: color,
      }}
    >
      {icon.imageUrl && !imageError ? (
        <div className="icon-image-container">
          <img 
            src={icon.imageUrl} 
            alt={icon.label}
            className="icon-image"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="icon-emoji">{icon.emoji || '📌'}</div>
      )}
      <div className="icon-label">{icon.label}</div>
    </button>
  );
}
