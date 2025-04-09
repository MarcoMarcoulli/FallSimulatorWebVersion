// src/utils/CurveVisualizer.ts
import { Point } from '../../types/Point';
import { getSimulations } from '../simulation/Simulations';

/**
 * Disegna una curva sul canvas collegando i punti consecutivamente.
 * @param points Array di punti {x, y}
 * @param ctx Contesto canvas 2D
 * @param red Rosso [0-255]
 * @param green Verde [0-255]
 * @param blue Blu [0-255]
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

export const clearLastCurve = (ctx: CanvasRenderingContext2D) => {
  const simulations = getSimulations();
  if (simulations.length === 0) return;

  // Pulisce tutto il canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Ridisegna tutte le curve tranne l'ultima
  for (let i = 0; i < simulations.length - 1; i++) {
    const sim = simulations[i];
    const points = sim.getPoints();
    const curve = sim.getCurve();
    drawCurve(points, ctx, curve.getRed(), curve.getGreen(), curve.getBlue());
  }
};
