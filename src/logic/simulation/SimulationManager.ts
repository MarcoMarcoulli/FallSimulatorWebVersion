import { Curve } from '../curves/Curve';
import { Point } from '../../types/Point';
import { Mass } from './Mass';

export type ArrivalCallback = (arrived: boolean) => void;

export class SimulationManager {
  private mass: Mass | null = null;
  private readonly curve: Curve;
  private readonly points: Point[];
  private slopes: number[] = [];
  private times: number[] = [];

  private onArrival: ArrivalCallback | null = null;

  constructor(curve: Curve) {
    this.curve = curve;
    this.points = curve.calculatePoints();
  }

  set Mass(m: Mass) {
    this.mass = m;
  }

  set Slopes(s: number[]) {
    this.slopes = s;
  }

  set ArrivalCallback(callback: ArrivalCallback) {
    this.onArrival = callback;
  }

  get Curve() {
    return this.curve;
  }

  get Mass(): Mass | null {
    return this.mass;
  }

  get Points() {
    return this.points;
  }

  getTimes() {
    return this.times;
  }

  getArrivalTime() {
    return this.times.at(-1) ?? 0;
  }

  calculateTimeParametrization(g: number) {
    const n = this.points.length;
    this.times = Array<number>(n).fill(0);
    this.times[1] = Number.EPSILON;

    for (let i = 2; i < n; i++) {
      const h1 = this.points[i - 1].y - this.points[0].y;
      const h2 = this.points[i].y - this.points[0].y;

      if (h1 === 0) {
        this.times[i] = this.times[i - 1] + Number.EPSILON;
        continue;
      }

      const v1 = Math.sqrt(2 * g * h1);
      const v2 = Math.sqrt(2 * g * h2);
      const v1y = v1 * Math.abs(Math.sin(this.slopes[i - 1] || 0));
      const v2y = v2 * Math.abs(Math.sin(this.slopes[i] || 0));
      const dy = Math.abs(this.points[i].y - this.points[i - 1].y);
      const integrand = (1 / v1y + 1 / v2y) / 2;
      this.times[i] = this.times[i - 1] + integrand * dy;
    }
  }

  /* ---------- Animazione ------------------------------- */

  startAnimation(container: HTMLDivElement) {
    if (!this.mass) return;

    const img = this.mass.element;
    if (!container.contains(img)) container.appendChild(img);

    const tStart = performance.now();

    const step = (now: number) => {
      const elapsed = (now - tStart) / 1000;
      let i = this.times.findIndex((t) => t > elapsed);
      if (i === -1) i = this.times.length - 1;

      // → Massa ha raggiunto il traguardo
      if (i >= this.times.length - 1) {
        this.mass!.Position = this.points.at(-1)!;
        this.onArrival?.(true);
        return;
      }

      // → Massa non arriverà mai (risale oltre lo start)
      if (i < this.times.length - 2 && this.points[i + 2].y < this.points[0].y) {
        this.onArrival?.(false);
        return;
      }

      const ratio = (elapsed - this.times[i]) / (this.times[i + 1] - this.times[i]);
      const x = this.points[i].x + (this.points[i + 1].x - this.points[i].x) * ratio;
      const y = this.points[i].y + (this.points[i + 1].y - this.points[i].y) * ratio;

      this.mass!.Position = { x, y };

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}
