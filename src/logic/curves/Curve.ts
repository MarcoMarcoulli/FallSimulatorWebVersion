// src/logic/curves/Curve.ts
import { Point } from '../../types/Point';

export abstract class Curve {
  protected intervalX: number;
  protected intervalY: number;
  protected startPoint: Point;
  protected endPoint: Point;

  protected red: number = 0;
  protected green: number = 0;
  protected blue: number = 0;

  static readonly NUMPOINTS = 7000;

  constructor(startPoint: Point, endPoint: Point) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.intervalX = endPoint.x - startPoint.x;
    this.intervalY = endPoint.y - startPoint.y;
  }

  abstract calculatePoints(): Point[];
  abstract calculateSlopes(): number[];
  abstract curveName(): string;

  setRandomColors(): void {
    this.red = Math.floor(Math.random() * 230);
    this.green = Math.floor(Math.random() * 230);
    this.blue = Math.floor(Math.random() * 230);
  }

  setRed(red: number): void {
    this.red = red;
  }

  setGreen(green: number): void {
    this.green = green;
  }

  setBlue(blue: number): void {
    this.blue = blue;
  }

  getRed(): number {
    return this.red;
  }

  getGreen(): number {
    return this.green;
  }

  getBlue(): number {
    return this.blue;
  }

  static getNumPoints(): number {
    return Curve.NUMPOINTS;
  }

  getStartPoint(): Point {
    return this.startPoint;
  }

  getEndPoint(): Point {
    return this.endPoint;
  }
}
