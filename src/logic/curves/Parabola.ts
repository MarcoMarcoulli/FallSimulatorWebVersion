// src/logic/curves/Parabola.ts
import { Point } from '../../types/Point';
import { Curve } from './Curve';

export class Parabola extends Curve {
  private a: number;

  constructor(startPoint: Point, endPoint: Point) {
    super(startPoint, endPoint);
    this.a = this.intervalX / Math.pow(this.intervalY, 2);
    console.info(`coefficiente a = ${this.a}`);
  }

  public getA(): number {
    return this.a;
  }

  public evaluateX(y: number): number {
    return this.a * Math.pow(y, 2);
  }

  public calculatePoints(): Point[] {
    const points: Point[] = new Array(Curve.NUMPOINTS);
    let x: number, y: number, t: number, yCubic: number;

    for (let i = 0; i < Curve.NUMPOINTS; i++) {
      t = i / (Curve.NUMPOINTS - 1); // Normalizzazione
      yCubic = this.intervalY * Math.pow(t, 3);
      y = this.startPoint.y + yCubic;
      x = this.startPoint.x + this.evaluateX(yCubic);
      points[i] = { x, y };
    }

    return points;
  }

  public calculateSlopes(): number[] {
    const slopes: number[] = new Array(Curve.NUMPOINTS);
    let yCubic: number, t: number;

    console.info('calcolo pendenze parabola');
    for (let i = 0; i < Curve.NUMPOINTS; i++) {
      t = i / (Curve.NUMPOINTS - 1);
      yCubic = this.intervalY * Math.pow(t, 3);
      slopes[i] = Math.PI / 2 - Math.atan(2 * this.a * yCubic);
      console.debug(`pendenza[${i}]: ${(slopes[i] / Math.PI) * 180}`);
    }

    return slopes;
  }

  public curveName(): string {
    return 'parabola';
  }
}
