// src/components/Canvas.tsx
import React, { useRef, useEffect } from 'react';
import { useStateContext } from '../context/StateContext';
import { useInput } from '../context/InputContext';
import { UIStates } from '../types/UIStates';
import { Point } from '../types/Point';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { UIState, setUIState } = useStateContext();
  const { setStartPoint, setEndPoint, addIntermediatePoint } = useInput();

  // Assicurati che gli attributi del canvas riflettano le dimensioni dello stile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, []); // eseguito una volta al montaggio

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Usa il bounding rect per ottenere le coordinate relative
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const point: Point = { x, y };

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    switch (UIState) {
      case UIStates.WAITING_FOR_START_POINT:
        setStartPoint(point);
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        setUIState(UIStates.WAITING_FOR_END_POINT);
        break;

      case UIStates.WAITING_FOR_END_POINT:
        try {
          setEndPoint(point);
        } catch (error) {
          console.error(error);
          return;
        }
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        setUIState(UIStates.CHOOSING_CURVE);
        break;

      case UIStates.INSERTING_INTERMEDIATE_POINTS: {
        try {
          addIntermediatePoint(point);
        } catch (error) {
          console.error(error);
          return;
        }
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        break;
      }
      default:
        break;
    }
  };

  return <canvas ref={canvasRef} className="w-full h-full" onClick={handleCanvasClick} />;
};

export default Canvas;
