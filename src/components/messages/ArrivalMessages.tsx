// src/components/ArrivalMessages.tsx
import React, { useMemo } from 'react';
import { useSimulationContext } from '../../context/simulation/useSimulationContext';

function extractTime(msg: string): number {
  const m = msg.match(/in ([\d.]+) secondi/);
  return m ? parseFloat(m[1]) : Infinity;
}

const ArrivalMessages: React.FC = () => {
  const { arrivalMessages, neverArriveMessages } = useSimulationContext();

  const sortedArrivals = useMemo(
    () => [...arrivalMessages].sort((a, b) => extractTime(a) - extractTime(b)),
    [arrivalMessages]
  );

  return (
    <div className="space-y-1 overflow-auto p-2">
      {sortedArrivals.map((msg, i) => (
        <div key={`arrival-${i}`} className="text-green-700">
          {msg}
        </div>
      ))}

      {neverArriveMessages.map((msg, i) => (
        <div key={`never-${i}`} className="text-red-700">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default ArrivalMessages;
