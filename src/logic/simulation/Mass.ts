import { Point } from '../../types/Point';
import { MassIconType } from '../../types/MassIconType';

export class Mass {
  private position: Point;
  private iconType: MassIconType;
  private image: HTMLImageElement;
  static readonly MASS_DIAMETER = 40;

  constructor(startPosition: Point, iconType: MassIconType, imageSrc: string) {
    this.position = startPosition;
    this.iconType = iconType;

    // Crea l'immagine e la configura
    this.image = new Image();
    this.image.src = imageSrc;
    this.image.width = Mass.MASS_DIAMETER;
    this.image.height = Mass.MASS_DIAMETER;
    this.image.style.position = 'absolute';
    this.updateImagePosition();
  }

  private updateImagePosition(): void {
    this.image.style.left = `${this.getXCentered()}px`;
    this.image.style.top = `${this.getYCentered()}px`;
  }

  getCurrentPosition(): Point {
    return this.position;
  }

  setCurrentPosition(newPosition: Point): void {
    this.position = newPosition;
    this.updateImagePosition();
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

  getImageElement(): HTMLImageElement {
    return this.image;
  }
}
