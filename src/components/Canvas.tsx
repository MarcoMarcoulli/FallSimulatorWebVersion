import React, { useRef, useEffect, useCallback } from 'react';
import { useStateContext } from '../context/state/useStateContext';
import { useInputContext } from '../context/input/useInputContext';
import { UIStates } from '../types/UIStates';
import { Point } from '../types/Point';
import { useCanvasContext } from '../context/canvas/useCanvasContext';
import { drawStartPoint, drawEndPoint, drawIntermediatePoint } from '../logic/utils/PointDrawer';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { UIState, setUIState } = useStateContext();
  const { setStartPoint, setEndPoint, addIntermediatePoint } = useInputContext();
  const { setCtx } = useCanvasContext();

  // Funzione che aggiorna la dimensione del canvas dinamicamente
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) setCtx(ctx);
    }
  }, [setCtx]);

  // Al mount e al resize
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const point: Point = { x, y };

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    switch (UIState) {
      case UIStates.WAITING_FOR_START_POINT:
        setStartPoint(point);
        drawStartPoint(ctx, point);
        setUIState(UIStates.WAITING_FOR_END_POINT);
        break;

      case UIStates.WAITING_FOR_END_POINT:
        setEndPoint(point);
        drawEndPoint(ctx, point);
        setUIState(UIStates.CHOOSING_CURVE);
        break;

      case UIStates.INSERTING_INTERMEDIATE_POINTS:
        addIntermediatePoint(point);
        drawIntermediatePoint(ctx, point);
        break;

      default:
        break;
    }
  };

  return <canvas ref={canvasRef} className="w-full h-full block" onClick={handleCanvasClick} />;
};

export default Canvas;
