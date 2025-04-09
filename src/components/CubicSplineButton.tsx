// src/components/CubicSplineButton.tsx
import React from 'react';
import { UIStates } from '../types/UIStates';
import { useStateContext } from '../context/StateContext';

const CubicSplineButton: React.FC = () => {
  const { setUIState } = useStateContext();

  const handleCubicSplineClick = () => {
    // Generazione del colore casuale all'interno del componente
    const red = Math.floor(Math.random() * 230);
    const green = Math.floor(Math.random() * 230);
    const blue = Math.floor(Math.random() * 230);

    console.log('Colore spline generato:', { red, green, blue });

    // Potrai passare questi colori al momento della creazione effettiva della curva

    // Cambio stato per iniziare l’inserimento dei punti intermedi
    setUIState(UIStates.INSERTING_INTERMEDIATE_POINTS);
  };

  return (
    <button
      onClick={handleCubicSplineClick}
      className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
    >
      Cubic Spline
    </button>
  );
};

export default CubicSplineButton;
