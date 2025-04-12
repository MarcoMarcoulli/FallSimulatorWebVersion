// src/components/ControlPanel.tsx
import React from 'react';
import { useStateContext } from '../context/StateContext';
import { UIStates } from '../types/UIStates';
import MessageDisplay from './MessageDisplay';
import PlanetSelector from './PlanetSelector';
import MassSelector from './MassSelector';
import CancelInputButton from './CancelInputButton';
import ParabolaButton from './ParabolaButton';
import CycloidButton from './CycloidButton';
import CircleButton from './CircleButton';
import CubicSplineButton from './CubicSplineButton';
import InsertAnotherCurveButton from './InsertAnotherCurveButton';
import StartSimulationButton from './StartSimulationButton';
import ConvexityButtons from './ConvexityButtons';
import StopIntermediatePointsInsertion from './StopIntermediatePointsInsertionButton';
import RadiusSlider from './RadiusSlider';

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
      {UIState === UIStates.READY_TO_SIMULATE && (
        <>
          <InsertAnotherCurveButton />
          <StartSimulationButton />
        </>
      )}
      {UIState === UIStates.CHOOSING_CONVEXITY && (
        <>
          <ConvexityButtons convexity={1} />
          <ConvexityButtons convexity={-1} />
        </>
      )}
      {UIState === UIStates.INSERTING_INTERMEDIATE_POINTS && (
        <>
          <StopIntermediatePointsInsertion />
        </>
      )}
      {UIState === UIStates.CHOOSING_RADIUS && (
        <>
          <RadiusSlider />
        </>
      )}
      <CancelInputButton />
    </div>
  );
};

export default ControlPanel;
