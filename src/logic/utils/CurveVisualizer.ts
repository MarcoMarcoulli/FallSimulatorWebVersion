import { Point } from '../../types/Point';
import { SimulationManager } from '../simulation/SimulationManager';
import { drawStartPoint, drawEndPoint, drawIntermediatePoint } from './PointDrawer';

export function drawCurve(
  points: Point[],
  ctx: CanvasRenderingContext2D,
  startPoint: Point | null,
  endPoint: Point | null,
  intermediatePoints: Point[],
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
  intermediatePoints.forEach((pt) => drawIntermediatePoint(ctx, pt));
}

export const clearLastCurve = (
  simulations: SimulationManager[],
  ctx: CanvasRenderingContext2D,
  startPoint: Point | null,
  endPoint: Point | null,
  intermediatePoints: Point[]
): void => {
  if (!ctx) return;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let i = 0; i < simulations.length - 1; i++) {
    const sim = simulations[i];
    const curve = sim.Curve;
    drawCurve(
      sim.Points,
      ctx,
      startPoint,
      endPoint,
      intermediatePoints,
      curve.getRed(),
      curve.getGreen(),
      curve.getBlue()
    );
  }

  if (startPoint) drawStartPoint(ctx, startPoint);
  if (endPoint) drawEndPoint(ctx, endPoint);
  intermediatePoints.forEach((pt) => drawIntermediatePoint(ctx, pt));
};

export const clearCanvas = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
