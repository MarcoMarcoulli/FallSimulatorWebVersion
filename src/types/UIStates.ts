// types/UIStates.ts
export enum UIStates {
  CHOOSING_GRAVITY = 'CHOOSING_GRAVITY',
  WAITING_FOR_START_POINT = 'WAITING_FOR_START_POINT',
  WAITING_FOR_END_POINT = 'WAITING_FOR_END_POINT',
  CHOOSING_CURVE = 'CHOOSING_CURVE',
  INSERTING_INTERMEDIATE_POINTS = 'INSERTING_INTERMEDIATE_POINTS',
  CHOOSING_CONVEXITY = 'CHOOSING_CONVEXITY',
  CHOOSING_RADIUS = 'CHOOSING_RADIUS',
  CHOOSING_MASS = 'CHOOSING_MASS',
  READY_TO_SIMULATE = 'READY_TO_SIMULATE',
  SIMULATING = 'SIMULATING',
  SHOWING_RESULTS = 'SHOWING_RESULTS',
}
