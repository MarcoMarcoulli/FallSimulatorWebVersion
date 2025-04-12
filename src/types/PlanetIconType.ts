// Enumerazione dei pianeti
export enum PlanetIcon {
  MOON = 'MOON',
  MARS = 'MARS',
  EARTH = 'EARTH',
  JUPITER = 'JUPITER',
  SUN = 'SUN',
}

// Mapping dei valori di gravità in millimetri (gMm) per ogni pianeta
export const gravityMapping: Record<PlanetIcon, number> = {
  [PlanetIcon.MOON]: 1620,
  [PlanetIcon.MARS]: 3730,
  [PlanetIcon.EARTH]: 9810,
  [PlanetIcon.JUPITER]: 24790,
  [PlanetIcon.SUN]: 274000,
};
