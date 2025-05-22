// src/logic/utils/CurveVisualizer.ts

import { Point } from '../../types/Point';
import { SimulationManager } from '../simulation/SimulationManager';
import { drawStartPoint, drawEndPoint, drawIntermediatePoint } from './PointDrawer';

/**
 * Disegna la curva e tutti i punti di input (start, end, intermediate).
 * @param points        punti della curva calcolati
 * @param ctx           contesto 2D del canvas
 * @param startPoint    punto di partenza
 * @param endPoint      punto di arrivo
 * @param intermediate  lista di liste di punti intermedi
 * @param red,green,blue colore della curva
 */
export function drawCurve(
  points: Point[],
  ctx: CanvasRenderingContext2D,
  startPoint: Point | null,
  endPoint: Point | null,
  intermediate: Point[][],
  red: number,
  green: number,
  blue: number
): void {
  ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
  ctx.lineWidth = 2;

  ctx.beginPath();
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
  }
  ctx.stroke();

  if (startPoint) drawStartPoint(ctx, startPoint);
  if (endPoint) drawEndPoint(ctx, endPoint);

  intermediate.forEach((group) => group.forEach((pt) => drawIntermediatePoint(ctx, pt)));
}

export const clearLastCurve = (
  simulations: SimulationManager[],
  ctx: CanvasRenderingContext2D,
  startPoint: Point | null,
  endPoint: Point | null,
  intermediate: Point[][]
): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let i = 0; i < simulations.length - 1; i++) {
    const sim = simulations[i];
    const curve = sim.Curve;
    drawCurve(
      sim.Points,
      ctx,
      startPoint,
      endPoint,
      intermediate,
      curve.getRed(),
      curve.getGreen(),
      curve.getBlue()
    );
  }

  if (startPoint) drawStartPoint(ctx, startPoint);
  if (endPoint) drawEndPoint(ctx, endPoint);

  intermediate.forEach((group) => group.forEach((pt) => drawIntermediatePoint(ctx, pt)));
};

export const clearCanvas = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
