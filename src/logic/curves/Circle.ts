// src/logic/curves/Circle.ts
import { Point } from '../../types/Point';
import { Curve } from './Curve';

export class Circle extends Curve {
  private r: number;
  private convexity: number; // 1 per concavità verso l'alto, -1 verso il basso

  constructor(startPoint: Point, endPoint: Point, convexity: number, radius?: number) {
    super(startPoint, endPoint);
    this.convexity = convexity;

    if (radius !== undefined) {
      this.r = radius;
    } else {
      if (convexity === -1) {
        this.r =
          (Math.pow(this.intervalX, 2) + Math.pow(this.intervalY, 2)) / (2 * this.intervalY) + 1;
      } else {
        this.r = (Math.pow(this.intervalX, 2) + Math.pow(this.intervalY, 2)) / (2 * this.intervalX);
      }
    }
  }

  public getR(): number {
    return this.r;
  }

  private evaluateFunction(variable: number): number {
    return Math.sqrt(2 * variable * this.r - Math.pow(variable, 2));
  }

  private aCoefficient(): number {
    return Math.pow(this.intervalX, 2) + Math.pow(this.intervalY, 2);
  }

  private cCoefficient(): number {
    return Math.pow(this.aCoefficient() / 2, 2) - Math.pow(this.intervalY * this.r, 2);
  }

  private xCenter(): number {
    const x =
      this.intervalX / 2 +
      this.convexity *
        Math.sign(this.intervalX) *
        Math.sqrt(Math.pow(this.intervalX / 2, 2) - this.cCoefficient() / this.aCoefficient());
    console.debug(`xCenter: ${x}`);
    return x;
  }

  private yCenter(): number {
    const xC = this.xCenter();
    const y =
      (Math.pow(this.intervalX, 2) + Math.pow(this.intervalY, 2) - 2 * xC * this.intervalX) /
      (2 * this.intervalY);
    console.debug(`yCenter: ${y}`);
    return y;
  }

  public calculatePoints(): Point[] {
    const points: Point[] = new Array(Curve.NUMPOINTS);

    const xCenterAbs = this.xCenter() + this.startPoint.x;
    const yCenterAbs = this.yCenter() + this.startPoint.y;

    let t: number, x: number, y: number;

    if (this.convexity === 1) {
      const x0 = xCenterAbs - this.r;
      console.info("Calcolo punti circonferenza con concavità verso l'alto");

      for (let i = 0; i < Curve.NUMPOINTS; i++) {
        t = i / (Curve.NUMPOINTS - 1);
        const xCubic = this.intervalX * Math.pow(t, 3);
        x = this.startPoint.x + xCubic;
        y = yCenterAbs + this.evaluateFunction(x - x0);
        points[i] = { x, y };
        console.debug(`Punto[${i}]: x = ${x}, y = ${y}`);
      }
    } else if (this.convexity === -1) {
      const y0 = yCenterAbs - this.r;
      console.info('Calcolo punti circonferenza con concavità verso il basso');

      for (let i = 0; i < Curve.NUMPOINTS; i++) {
        t = i / (Curve.NUMPOINTS - 1);
        const yCubic = this.intervalY * Math.pow(t, 3);
        y = this.startPoint.y + yCubic;
        x = xCenterAbs + Math.sign(this.intervalX) * this.evaluateFunction(y - y0);
        points[i] = { x, y };
        console.debug(`Punto[${i}]: x = ${x}, y = ${y}`);
      }
    }

    return points;
  }

  public calculateSlopes(): number[] {
    const slopes: number[] = new Array(Curve.NUMPOINTS);

    const xCenterAbs = this.xCenter() + this.startPoint.x;
    const yCenterAbs = this.yCenter() + this.startPoint.y;

    let t: number, x: number, y: number;

    if (this.convexity === 1) {
      const x0 = xCenterAbs - this.r;
      console.info("Calcolo pendenze circonferenza con concavità verso l'alto");

      for (let i = 0; i < Curve.NUMPOINTS; i++) {
        t = i / (Curve.NUMPOINTS - 1);
        const xCubic = this.intervalX * Math.pow(t, 3);
        x = this.startPoint.x + xCubic;
        const dx = x - x0;
        slopes[i] = Math.atan((this.r - dx) / Math.sqrt(2 * this.r * dx - dx * dx));
        console.debug(`Pendenza[${i}]: ${(slopes[i] / Math.PI) * 180}`);
      }
    } else if (this.convexity === -1) {
      const y0 = yCenterAbs - this.r;
      console.info('Calcolo pendenze circonferenza con concavità verso il basso');

      for (let i = 0; i < Curve.NUMPOINTS; i++) {
        t = i / (Curve.NUMPOINTS - 1);
        const yCubic = this.intervalY * Math.pow(t, 3);
        y = this.startPoint.y + yCubic;
        const dy = y - y0;
        slopes[i] = Math.PI / 2 - Math.atan((this.r - dy) / Math.sqrt(2 * this.r * dy - dy * dy));
        console.debug(`Pendenza[${i}]: ${(slopes[i] / Math.PI) * 180}`);
      }
    }

    return slopes;
  }

  public curveName(): string {
    return 'circonferenza';
  }
}
