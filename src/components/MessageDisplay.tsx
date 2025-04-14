// src/components/MessageDisplay.tsx
import React from 'react';
import { useStateContext } from '../context/state/useStateContext';
import { UIStates } from '../types/UIStates';

const MessageDisplay: React.FC = () => {
  const { UIState } = useStateContext();

  let message = '';
  switch (UIState) {
    case UIStates.CHOOSING_GRAVITY:
      message = 'SCEGLI IL CAMPO GRAVITAZIONALE';
      break;
    case UIStates.WAITING_FOR_START_POINT:
      message = 'INSERISCI IL PUNTO DI PARTENZA';
      break;
    case UIStates.WAITING_FOR_END_POINT:
      message = 'INSERISCI IL PUNTO DI ARRIVO';
      break;
    case UIStates.INSERTING_INTERMEDIATE_POINTS:
      message = 'INSERISCI DEI PUNTI INTERMEDI DA INTERPOLARE';
      break;
    case UIStates.CHOOSING_CURVE:
      message = 'SCEGLI UNA CURVA';
      break;
    case UIStates.CHOOSING_MASS:
      message = 'SCEGLI CHI VUOI FAR SCIVOLARE';
      break;
    case UIStates.CHOOSING_CONVEXITY:
      message = 'SCEGLI LA CONVESSITA';
      break;
    case UIStates.CHOOSING_RADIUS:
      message = 'SELEZIONA IL RAGGIO DELLA CIRCONFERENZA';
      break;
    case UIStates.SIMULATING:
      message = 'SIMULAZIONE IN CORSO ...';
      break;
    default:
      message = '';
  }

  return <p className="text-sm font-medium">{message}</p>;
};

export default MessageDisplay;
