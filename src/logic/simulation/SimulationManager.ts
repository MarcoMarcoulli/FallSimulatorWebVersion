import { Curve } from '../curves/Curve';
import { Point } from '../../types/Point';
import { Mass } from './Mass';

export type ArrivalCallback = (arrived: boolean) => void;

function binarySearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
}

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

  set OnArrival(callback: ArrivalCallback) {
    this.onArrival = callback;
  }

  get Curve() {
    return this.curve;
  }

  get Mass(): Mass | null {
    return this.mass;
  }

  get Points(): Point[] {
    return this.points;
  }

  getTimes(): number[] {
    return this.times;
  }

  getArrivalTime(): number {
    return this.times.at(-1) ?? 0;
  }

  calculateTimeParametrization(g: number): void {
    const n = this.points.length;
    this.times = Array(n).fill(0);
    this.times[1] = Number.EPSILON;

    if (this.slopes.length !== this.points.length) {
      throw new Error('La lunghezza di slopes non corrisponde al numero di punti.');
    }

    for (let i = 2; i < n; i++) {
      const h1 = this.points[i - 1].y - this.points[0].y;
      const h2 = this.points[i].y - this.points[0].y;

      if (h1 === 0) {
        this.times[i] = this.times[i - 1] + Number.EPSILON;
        continue;
      }

      const v1 = Math.sqrt(2 * g * h1);
      const v2 = Math.sqrt(2 * g * h2);
      const v1y = v1 * Math.abs(Math.sin(this.slopes[i - 1]));
      const v2y = v2 * Math.abs(Math.sin(this.slopes[i]));
      const dy = Math.abs(this.points[i].y - this.points[i - 1].y);
      const integrand = (1 / v1y + 1 / v2y) / 2;
      this.times[i] = this.times[i - 1] + integrand * dy;
    }
  }

  startAnimation(container: HTMLDivElement): void {
    if (!this.mass) return;

    if (this.times.length < 2) {
      console.error('Tempi non calcolati o troppo pochi punti');
      return;
    }

    this.mass.Position = this.points[0];
    const img = this.mass.element;
    if (!container.contains(img)) container.appendChild(img);

    const tStart = performance.now();
    let hasStopped = false;
    let rafId: number;

    const step = (now: number) => {
      if (hasStopped) return;

      const elapsed = (now - tStart) / 1000;
      const i = binarySearch(this.times, elapsed);

      if (i >= this.times.length - 1) {
        console.log('Arrivato, chiamo callback once');
        this.mass!.Position = this.points.at(-1)!;
        hasStopped = true;
        this.onArrival?.(true);
        cancelAnimationFrame(rafId);
        return;
      } else if (i < this.times.length - 2 && this.points[i + 2].y < this.points[0].y) {
        this.mass!.Position = this.points[i];
        hasStopped = true;
        this.onArrival?.(false);
        cancelAnimationFrame(rafId);
        return;
      }

      const t1 = this.times[i];
      const t2 = this.times[i + 1];
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const ratio = (elapsed - t1) / (t2 - t1);
      this.mass!.Position = {
        x: p1.x + (p2.x - p1.x) * ratio,
        y: p1.y + (p2.y - p1.y) * ratio,
      };

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
  }
}
