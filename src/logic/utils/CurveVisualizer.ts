import { Point } from '../../types/Point';
import { getSimulations } from '../simulation/Simulations';
import { drawStartPoint, drawEndPoint, drawIntermediatePoint } from './PointDrawer';

/**
 * Disegna una curva sul canvas collegando i punti consecutivamente.
 */
export function drawCurve(
  points: Point[],
  ctx: CanvasRenderingContext2D,
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
}

/**
 * Pulisce il canvas e ridisegna tutte le curve tranne l'ultima,
 * poi disegna i punti attuali forniti dal context.
 */
export const clearLastCurve = (
  ctx: CanvasRenderingContext2D,
  startPoint: Point | null,
  endPoint: Point | null,
  intermediatePoints: Point[]
) => {
  const simulations = getSimulations();
  if (!ctx) return;

  // Pulisce tutto il canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Ridisegna tutte le curve tranne l'ultima
  for (let i = 0; i < simulations.length - 1; i++) {
    const sim = simulations[i];
    const points = sim.getPoints();
    const curve = sim.getCurve();
    drawCurve(points, ctx, curve.getRed(), curve.getGreen(), curve.getBlue());
  }

  // Ridisegna i punti in primo piano
  if (startPoint) drawStartPoint(ctx, startPoint);
  if (endPoint) drawEndPoint(ctx, endPoint);
  intermediatePoints.forEach((pt) => drawIntermediatePoint(ctx, pt));
};

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
