// src/types/MassIcon.ts

export enum MassIconType {
  GALILEO = 'GALILEO',
  NEWTON = 'NEWTON',
  LEIBNITZ = 'LEIBNITZ',
  BERNOULLI = 'BERNOULLI',
  JAKOB = 'JAKOB',
}

// 2) interfaccia per i dati di ciascuna massa
export interface MassIcon {
  type: MassIconType;
  label: string;
  imageSrc: string;
}

// 3) array di tutte le masse con i loro dati
import galileoImg from '../assets/masses/Galileo.png';
import newtonImg from '../assets/masses/Newton.png';
import leibnitzImg from '../assets/masses/Leibnitz.png';
import bernoulliImg from '../assets/masses/Bernoulli.png';
import jakobImg from '../assets/masses/Jakob.png';

export const MASS_ICONS: MassIcon[] = [
  { type: MassIconType.GALILEO, label: 'GALILEO', imageSrc: galileoImg },
  { type: MassIconType.NEWTON, label: 'NEWTON', imageSrc: newtonImg },
  { type: MassIconType.LEIBNITZ, label: 'LEIBNITZ', imageSrc: leibnitzImg },
  { type: MassIconType.BERNOULLI, label: 'BERNOULLI', imageSrc: bernoulliImg },
  { type: MassIconType.JAKOB, label: 'JAKOB', imageSrc: jakobImg },
];
