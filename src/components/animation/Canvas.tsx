import React, { useRef, useEffect, useCallback } from 'react';
import { useStateContext } from '../../context/state/useStateContext';
import { useInputContext } from '../../context/input/useInputContext';
import { UIStates } from '../../types/UIStates';
import { Point } from '../../types/Point';
import { useCanvasContext } from '../../context/canvas/useCanvasContext';
import { drawStartPoint, drawEndPoint, drawIntermediatePoint } from '../../logic/utils/PointDrawer';
import { validateEndPoint, validateIntermediatePoint } from '../../logic/utils/InputValidator';

interface CanvasProps {
  showModal: (msg: string) => void;
}

const Canvas: React.FC<CanvasProps> = ({ showModal }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { UIState, setUIState } = useStateContext();
  const { ctxRef } = useCanvasContext();
  const {
    setStartPoint,
    startPoint,
    endPoint,
    intermediatePoints,
    setEndPoint,
    addIntermediatePoint,
  } = useInputContext();

  // funzione per ridimensionare il canvas e aggiornare ctxRef
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctxRef.current = ctx;
    }
  }, [ctxRef]);

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

      case UIStates.WAITING_FOR_END_POINT: {
        if (!startPoint) return;
        const validated = validateEndPoint(startPoint, point, showModal);
        if (!validated) return;
        setEndPoint(validated);
        drawEndPoint(ctx, validated);
        setUIState(UIStates.CHOOSING_CURVE);
        break;
      }

      case UIStates.INSERTING_INTERMEDIATE_POINTS: {
        if (!startPoint || !endPoint) return;
        const validated = validateIntermediatePoint(
          startPoint,
          endPoint,
          point,
          intermediatePoints.at(-1)!,
          showModal
        );
        if (!validated) return;
        addIntermediatePoint(validated);
        drawIntermediatePoint(ctx, validated);
        break;
      }

      default:
        break;
    }
  };

  return <canvas ref={canvasRef} className="w-full h-full block" onClick={handleCanvasClick} />;
};

export default Canvas;
