import React, { useRef, useEffect } from 'react';
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext('2d');
      setCtx(context);
    }
  }, [setCtx]);

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
        try {
          setEndPoint(point);
          drawEndPoint(ctx, point);
          setUIState(UIStates.CHOOSING_CURVE);
        } catch (error) {
          console.error(error);
        }
        break;

      case UIStates.INSERTING_INTERMEDIATE_POINTS:
        try {
          addIntermediatePoint(point);
          drawIntermediatePoint(ctx, point);
        } catch (error) {
          console.error(error);
        }
        break;

      default:
        break;
    }
  };

  return <canvas ref={canvasRef} className="w-full h-full" onClick={handleCanvasClick} />;
};

export default Canvas;
