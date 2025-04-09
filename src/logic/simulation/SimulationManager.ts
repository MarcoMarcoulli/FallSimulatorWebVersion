// src/logic/SimulationManager.ts
import { Point } from '../../types/Point';
import { Curve } from '../curves/Curve';
import { Mass } from './Mass';

export interface MassArrivalObserver {
  (sim: SimulationManager, arrived: boolean): void;
}

export class SimulationManager {
  private curve: Curve;
  private points: Point[];
  private slopes: number[] = [];
  private times: number[] = [];
  private mass: Mass | null = null;
  private observer?: MassArrivalObserver;

  constructor(curve: Curve) {
    this.curve = curve;
    this.points = curve.calculatePoints();
  }

  addMassArrivalObserver(observer: MassArrivalObserver): void {
    this.observer = observer;
  }

  notifyMassArrivalObserver(arrived: boolean): void {
    if (this.observer) {
      this.observer(this, arrived);
    }
  }

  setMass(mass: Mass): void {
    this.mass = mass;
  }

  getMass(): Mass | null {
    return this.mass;
  }

  getCurve(): Curve {
    return this.curve;
  }

  getPoints(): Point[] {
    return this.points;
  }

  getArrivalTime(): number {
    return this.times[this.points.length - 1];
  }

  setSlopes(slopes: number[]): void {
    this.slopes = slopes;
  }

  getTimes(): number[] {
    return this.times;
  }

  calculateTimeParametrization(g: number): number[] {
    this.times = new Array(this.points.length);
    this.times[0] = 0;
    this.times[1] = Number.MIN_VALUE;

    for (let i = 2; i < this.points.length; i++) {
      const h1 = this.points[i - 1].y - this.curve.getStartPoint().y;

      if (h1 === 0) {
        this.times[i] = this.times[i - 1] + Number.MIN_VALUE;
        continue;
      }

      const h2 = this.points[i].y - this.curve.getStartPoint().y;
      const v1 = Math.sqrt(2 * g * h1);
      const v2 = Math.sqrt(2 * g * h2);

      const v1y = v1 * Math.abs(Math.sin(this.slopes[i - 1]));
      const v2y = v2 * Math.abs(Math.sin(this.slopes[i]));

      const dy = Math.abs(this.points[i].y - this.points[i - 1].y);
      const integrand = (1 / v1y + 1 / v2y) / 2;

      this.times[i] = this.times[i - 1] + integrand * dy;
    }

    return this.times;
  }
}
