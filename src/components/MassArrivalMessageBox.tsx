import React from 'react';
import { getArrivalMessages, getNeverArriveMessages } from '../logic/simulation/ArrivalMessages';

const MassArrivalMessagesBox: React.FC = () => {
  const arrivalMessages = getArrivalMessages().sort(
    (a, b) => (a.arrivalTime ?? 0) - (b.arrivalTime ?? 0)
  );
  const neverArriveMessages = getNeverArriveMessages();

  return (
    <div className="mt-4 space-y-2">
      {arrivalMessages.map((msg, index) => (
        <div key={index} className="text-green-700 font-medium">
          {msg.massName} sulla {msg.curveName} è arrivato in {msg.arrivalTime?.toFixed(5)} secondi.
        </div>
      ))}
      {neverArriveMessages.map((msg, index) => (
        <div key={`n-${index}`} className="text-red-600 font-medium">
          {msg.massName} sulla {msg.curveName} non arriverà mai a destinazione.
        </div>
      ))}
    </div>
  );
};

export default MassArrivalMessagesBox;
