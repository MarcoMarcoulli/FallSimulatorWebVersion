import React from 'react';
import ParabolaButton from './ParabolaButton';
import CycloidButton from './CycloidButton';
import CircleButton from './CircleButton';
import CubicSplineButton from './CubicSplineButton';

interface Props {
  showParabola: boolean;
  setShowParabola: (used: boolean) => void;
  showCycloid: boolean;
  setShowCycloid: (used: boolean) => void;
}

const CurveSelector: React.FC<Props> = ({
  showParabola,
  setShowParabola,
  showCycloid,
  setShowCycloid,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {showParabola && <ParabolaButton onClick={() => setShowParabola(false)} />}
      {showCycloid && <CycloidButton onClick={() => setShowCycloid(false)} />}
      <CircleButton />
      <CubicSplineButton />
    </div>
  );
};

export default CurveSelector;
