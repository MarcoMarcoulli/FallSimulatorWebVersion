export interface MassArrivalMessage {
  massName: string;
  curveName: string;
  arrivalTime?: number; // only defined if arrived
}
