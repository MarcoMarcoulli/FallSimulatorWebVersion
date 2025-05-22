// src/components/PlanetIconButton.tsx
import React from 'react';

interface PlanetButtonProps {
  imageSrc: string;
  label: string;
  gravityText: string;
  onClick?: () => void;
}

const PlanetButton: React.FC<PlanetButtonProps> = ({ imageSrc, label, gravityText, onClick }) => {
  return (
    <div className="flex flex-col items-center text-center w-20">
      <button onClick={onClick} className="focus:outline-none">
        <img src={imageSrc} alt={label} className="w-16 h-16" />
      </button>
      <div className="mt-1">
        <span className="block uppercase text-xs">{label}</span>
        {gravityText && <span className="block text-xs">{gravityText}</span>}
      </div>
    </div>
  );
};

export default PlanetButton;
