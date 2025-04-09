// src/logic/curves/Cycloid.ts
import { Curve } from './Curve';
import { Point } from '../../types/Point';

export class NonConvergenceException extends Error {
  constructor(iterations: number) {
    super(`Il metodo di Newton-Raphson non converge dopo ${iterations} iterazioni`);
    this.name = 'NonConvergenceException';
  }
}

export class Cycloid extends Curve {
  private alfa: number;
  private r: number;

  constructor(startPoint: Point, endPoint: Point) {
    super(startPoint, endPoint);
    this.alfa = this.calculateAlfa();
    this.r = this.calculateR(this.intervalY);
  }

  private f(a: number): number {
    return (a - Math.sin(a)) / (1 - Math.cos(a)) - this.intervalX / this.intervalY;
  }

  private df(a: number): number {
    const numerator = Math.pow(Math.sin(a), 2) - a * Math.sin(a);
    const denominator = Math.pow(1 - Math.cos(a), 2);
    return 1 + numerator / denominator;
  }

  private calculateAlfa(): number {
    let alfa = 4 * Math.atan(this.intervalX / (2 * this.intervalY));
    const maxIterations = 100;

    for (let i = 0; i < maxIterations; i++) {
      const nextAlfa = alfa - this.f(alfa) / this.df(alfa);

      if (Math.abs(nextAlfa - alfa) < 1e-6) {
        console.info(`Convergenza raggiunta: alfa = ${nextAlfa}`);
        return nextAlfa;
      }

      alfa = nextAlfa;
    }

    console.error(`Il metodo di Newton-Raphson non converge dopo ${maxIterations} iterazioni`);
    throw new NonConvergenceException(maxIterations);
  }

  private calculateR(y: number): number {
    const rad = y / (1 - Math.cos(this.alfa));
    console.debug(`Raggio calcolato: ${rad}`);
    return rad;
  }

  public evaluateX(a: number): number {
    return this.r * (a - Math.sin(a));
  }

  public evaluateY(a: number): number {
    return this.r * (1 - Math.cos(a));
  }

  public calculatePoints(): Point[] {
    const points: Point[] = new Array(Curve.NUMPOINTS);
    let t: number, aCubic: number, x: number, y: number;

    console.info('calcolo punti cicloide');
    for (let i = 0; i < Curve.NUMPOINTS; i++) {
      t = i / (Curve.NUMPOINTS - 1);
      aCubic = this.alfa * Math.pow(t, 3);
      x = this.startPoint.x + this.evaluateX(aCubic);
      y = this.startPoint.y + this.evaluateY(aCubic);
      points[i] = { x, y };
      console.debug(`Punto[${i}]: x = ${x}, y = ${y}`);
    }

    return points;
  }

  public calculateSlopes(): number[] {
    const slopes: number[] = new Array(Curve.NUMPOINTS);
    let t: number, aCubic: number;

    console.info('calcolo pendenze cicloide');
    slopes[0] = Math.PI / 2;
    console.debug(`pendenza[0]: ${(slopes[0] / Math.PI) * 180}`);

    for (let i = 1; i < Curve.NUMPOINTS; i++) {
      t = i / (Curve.NUMPOINTS - 1);
      aCubic = this.alfa * Math.pow(t, 3);
      slopes[i] = Math.atan(Math.sin(aCubic) / (1 - Math.cos(aCubic)));
      console.debug(`pendenza[${i}]: ${(slopes[i] / Math.PI) * 180}`);
    }

    return slopes;
  }

  public curveName(): string {
    return 'cicloide';
  }
}
