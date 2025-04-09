import { MassArrivalMessage } from '../../types/MassArrivalMessage';

let arrivalMessages: MassArrivalMessage[] = [];
let neverArriveMessages: MassArrivalMessage[] = [];

export const addArrivalMessage = (message: MassArrivalMessage) => {
  arrivalMessages.push(message);
};

export const addNeverArriveMessage = (message: MassArrivalMessage) => {
  neverArriveMessages.push(message);
};

export const getArrivalMessages = () => [...arrivalMessages];
export const getNeverArriveMessages = () => [...neverArriveMessages];

export const clearArrivalMessages = () => {
  arrivalMessages = [];
  neverArriveMessages = [];
};
