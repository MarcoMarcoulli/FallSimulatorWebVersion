// src/components/ControlPanel.tsx
import React from 'react';
import { useStateContext } from '../context/StateContext';
import { UIStates } from '../types/UIStates';
import MessageDisplay from './MessageDisplay';
import PlanetSelector from './PlanetSelector';
import MassSelector from './MassSelector';
import CancelInputButton from './CancelInputButton';

const ControlPanel: React.FC = () => {
  const { UIState } = useStateContext();

  return (
    <div className="flex flex-col gap-4 p-4">
      <MessageDisplay />
      {UIState === UIStates.CHOOSING_GRAVITY && (
        <>
          <PlanetSelector />
        </>
      )}
      {UIState === UIStates.CHOOSING_CURVE && (
        <>
          <ParabolaButton />
          <CycloidButton />
          <CircleButton />
          <CubicSplineButton />
        </>
      )}
      {UIState === UIStates.CHOOSING_MASS && (
        <>
          <MassSelector />
        </>
      )}
      <CancelInputButton />
    </div>
  );
};

export default ControlPanel;
