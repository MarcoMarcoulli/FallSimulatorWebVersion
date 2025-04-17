// src/logic/utils/PointDrawer.ts
import { Point } from '../../types/Point';

/**
 * Disegna un punto rosso (partenza).
 */
export function drawStartPoint(ctx: CanvasRenderingContext2D, point: Point) {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}

/**
 * Disegna un punto blu (arrivo).
 */
export function drawEndPoint(ctx: CanvasRenderingContext2D, point: Point) {
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}

/**
 * Disegna un punto intermedio con colore casuale.
 */
export function drawIntermediatePoint(ctx: CanvasRenderingContext2D, point: Point) {
  ctx.fillStyle = 'green';
  ctx.beginPath();
  ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}
