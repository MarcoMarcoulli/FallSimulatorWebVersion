// src/components/PlanetIconButton.tsx
import React from 'react';

interface PlanetButtonProps {
  imageSrc: string;
  label: string;
  gravityText: string; // Testo aggiuntivo, ad es. "g = 1,62". Se non presente, viene mostrato solo il label.
  onClick?: () => void;
}

const PlanetButton: React.FC<PlanetButtonProps> = ({ imageSrc, label, gravityText, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center focus:outline-none">
      <img src={imageSrc} alt={label} className="w-16 h-16" />
      <span className="uppercase text-xs mt-1">{label}</span>
      {gravityText && <span className="text-xs">{gravityText}</span>}
    </button>
  );
};

export default PlanetButton;
