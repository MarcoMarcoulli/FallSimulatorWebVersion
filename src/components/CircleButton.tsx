import React from 'react';
import { useStateContext } from '../context/StateContext';
import { UIStates } from '../types/UIStates';

const CircleButton: React.FC = () => {
  const { setUIState } = useStateContext();

  const handleCircleClick = () => {
    // Transizione allo stato in cui si deve scegliere la convessità
    setUIState(UIStates.CHOOSING_CONVEXITY);
  };

  return (
    <button
      onClick={handleCircleClick}
      className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
    >
      Circonferenza
    </button>
  );
};

export default CircleButton;
