// src/components/CubicSplineButton.tsx
import React from 'react';

import { useInputContext } from '../../../context/input/useInputContext';
import { useStateContext } from '../../../context/state/useStateContext';
import { useCanvasContext } from '../../../context/canvas/useCanvasContext';

import { UIStates } from '../../../types/UIStates';

const CubicSplineButton: React.FC = () => {
  const { ctxRef } = useCanvasContext();
  const { setUIState } = useStateContext();
  const { startPoint, endPoint, g, newIntermediatePointList } = useInputContext();

  const handleCubicSplineClick = () => {
    if (!startPoint || !endPoint || !ctxRef || g === null) {
      console.warn('Dati mancanti per creare la cicloide.');
      return;
    }

    // Generazione del colore casuale all'interno del componente
    const red = Math.floor(Math.random() * 230);
    const green = Math.floor(Math.random() * 230);
    const blue = Math.floor(Math.random() * 230);

    console.log('Colore spline generato:', { red, green, blue });

    newIntermediatePointList();
    setUIState(UIStates.INSERTING_INTERMEDIATE_POINTS);
  };

  return (
    <button
      onClick={handleCubicSplineClick}
      className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      Cubic Spline
    </button>
  );
};

export default CubicSplineButton;
