import { Point } from '../../types/Point';
import { MassIconType } from '../../types/MassIconType';

export class Mass {
  private position: Point;
  private iconType: MassIconType;
  private imageUrl: string;
  static readonly MASS_DIAMETER = 50;

  constructor(startPosition: Point, iconType: MassIconType, imageSrc: string) {
    this.position = startPosition;
    this.iconType = iconType;
    this.imageUrl = imageSrc;
  }

  getCurrentPosition(): Point {
    return this.position;
  }

  setCurrentPosition(newPosition: Point): void {
    this.position = newPosition;
  }

  getMassDiameter(): number {
    return Mass.MASS_DIAMETER;
  }

  getXCentered(): number {
    return this.position.x - Mass.MASS_DIAMETER / 2;
  }

  getYCentered(): number {
    return this.position.y - Mass.MASS_DIAMETER / 2;
  }

  getIconType(): MassIconType {
    return this.iconType;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }
}
