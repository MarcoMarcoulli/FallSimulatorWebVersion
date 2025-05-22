import React from 'react';
import { useStateContext } from '../../../context/state/useStateContext';
import { UIStates } from '../../../types/UIStates';

const CircleButton: React.FC = () => {
  const { setUIState } = useStateContext();

  const handleCircleClick = () => {
    setUIState(UIStates.CHOOSING_CONVEXITY);
  };

  return (
    <button
      onClick={handleCircleClick}
      className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      Circonferenza
    </button>
  );
};

export default CircleButton;
