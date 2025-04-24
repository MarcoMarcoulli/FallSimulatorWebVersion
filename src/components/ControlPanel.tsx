// src/components/ControlPanel.tsx
import React, { useState } from 'react';
import { useStateContext } from '../context/state/useStateContext';
import { UIStates } from '../types/UIStates';

import MessageDisplay from './MessageDisplay';

import PlanetSelector from './PlanetSelector';
import MassSelector from './MassSelector';
import CancelInputButton from './CancelInputButton';
import CurveSelector from './CurveSelector';
import InsertAnotherCurveButton from './curveButtons/InsertAnotherCurveButton';
import StartSimulationButton from './StartSimulationButton';
import ConvexityButtons from './curveButtons/ConvexityButtons';
import StopIntermediatePointsInsertion from './curveButtons/StopIntermediatePointsInsertionButton';
import RadiusSlider from './curveButtons/RadiusSlider';
import ConfirmRadiusButton from './curveButtons/ConfirmRadiusButton';
import { MassIconType, MASS_ICONS } from '../types/MassIconType';

const ControlPanel: React.FC = () => {
  const { UIState } = useStateContext();
  const [showParabola, setShowParabola] = useState(true);
  const [showCycloid, setShowCycloid] = useState(true);
  const [hiddenMasses, setHiddenMasses] = useState<Set<MassIconType>>(new Set());

  const resetButtonsVisibility = () => {
    setShowParabola(true);
    setShowCycloid(true);
  };

  const hideMass = (mass: MassIconType) => {
    setHiddenMasses((prev) => new Set(prev).add(mass));
  };

  const resetMasses = () => setHiddenMasses(new Set());

  const allMassesUsed = hiddenMasses.size === MASS_ICONS.length;

  return (
    <div className="flex flex-col gap-4 p-4">
      <MessageDisplay />

      {UIState === UIStates.CHOOSING_GRAVITY && <PlanetSelector />}

      {UIState === UIStates.CHOOSING_CURVE && (
        <CurveSelector
          showParabola={showParabola}
          setShowParabola={setShowParabola}
          showCycloid={showCycloid}
          setShowCycloid={setShowCycloid}
        />
      )}

      {UIState === UIStates.CHOOSING_MASS && (
        <MassSelector hiddenMasses={hiddenMasses} onMassSelect={hideMass} />
      )}

      {UIState === UIStates.CHOOSING_CONVEXITY && (
        <>
          <ConvexityButtons convexity={1} />
          <ConvexityButtons convexity={-1} />
        </>
      )}

      {UIState === UIStates.INSERTING_INTERMEDIATE_POINTS && <StopIntermediatePointsInsertion />}

      {UIState === UIStates.CHOOSING_RADIUS && (
        <>
          <RadiusSlider />
          <ConfirmRadiusButton />
        </>
      )}

      {UIState === UIStates.READY_TO_SIMULATE && (
        <>
          {!allMassesUsed && <InsertAnotherCurveButton />}
          <StartSimulationButton />
        </>
      )}

      {UIState !== UIStates.CHOOSING_GRAVITY && (
        <CancelInputButton
          resetButtonsVisibility={resetButtonsVisibility}
          resetMasses={resetMasses}
        />
      )}
    </div>
  );
};

export default ControlPanel;
