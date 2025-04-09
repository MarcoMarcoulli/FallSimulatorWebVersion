declare module 'natural-spline-interpolator' {
  export default class Spline {
    constructor(x: number[], y: number[]);
    at(x: number): number;
  }
}
