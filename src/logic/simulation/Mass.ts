import { Point } from '../../types/Point';
import { MassIconType } from '../../types/MassIconType';

export class Mass {
  private static readonly DIAMETER: number = 40;
  private position: Point;
  private readonly iconType: MassIconType;
  private readonly img: HTMLImageElement;

  constructor(startPos: Point, iconType: MassIconType, imgSrc: string) {
    this.position = startPos;
    this.iconType = iconType;
    this.img = new Image();
    this.img.src = imgSrc;
    this.img.width = Mass.DIAMETER;
    this.img.height = Mass.DIAMETER;
    this.img.style.position = 'absolute';
    this.updateDomPosition();
  }

  // ——— getter ———
  get element(): HTMLImageElement {
    return this.img;
  }
  get iconTypeValue(): MassIconType {
    return this.iconType;
  }
  get Position() {
    return this.position;
  }
  static get diameter() {
    return Mass.DIAMETER;
  }

  set Position(p: Point) {
    this.position = p;
    this.updateDomPosition();
  }

  private updateDomPosition() {
    this.img.style.left = `${this.position.x - Mass.DIAMETER / 2}px`;
    this.img.style.top = `${this.position.y - Mass.DIAMETER / 2}px`;
  }
}
