// src/components/MassButton.tsx
import React from 'react';

interface MassButtonProps {
  imageSrc: string;
  label: string;
  onClick?: () => void;
}

const MassButton: React.FC<MassButtonProps> = ({ imageSrc, label, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center focus:outline-none">
      <img src={imageSrc} alt={label} className="w-16 h-16" />
      <span className="uppercase text-xs mt-1">{label}</span>
    </button>
  );
};

export default MassButton;
