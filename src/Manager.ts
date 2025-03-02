import { Arrow } from "./Arrow";

export class Manager {
  arrowQuantity: number;
  arrowSize: number = 42;
  gapSize: number = 8 * 2;
  arrowHTMLElement: HTMLElement;
  elementsToUpdate: Array<Arrow> = [];
  mapHTML: HTMLElement = document.querySelector(".map") as HTMLElement;
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  cursor = {
    x: 0,
    y: 0,
  };

  constructor() {
    this.arrowHTMLElement = this.getArrowHTMLElement() as HTMLElement;
    this.arrowQuantity = this.getArrowQuantity(
      this.sizes.width,
      this.sizes.height,
      this.arrowSize
    );
    this.placeArrows(this.arrowQuantity);
  }

  getArrowHTMLElement = () => {
    const arrowHTMLElement = document.querySelector(".arrow");
    arrowHTMLElement?.remove();
    return arrowHTMLElement;
  };

  getArrowQuantity = (width: number, height: number, arrowSize: number) => {
    const colQuantity = Math.floor(width / (arrowSize + this.gapSize));
    const rowQuantity = Math.floor(height / (arrowSize + this.gapSize));
    return colQuantity * rowQuantity;
  };

  placeArrows = (arrowQuantity: number) => {
    this.mapHTML.innerHTML = "";
    for (let i = 0; i < arrowQuantity; i++) {
      const arrowClone = this.arrowHTMLElement.cloneNode(true) as HTMLElement;
      const arrow = new Arrow(arrowClone);
      this.elementsToUpdate.push(arrow);
      this.mapHTML.appendChild(arrowClone);
    }
  };

  updateSizes = () => {
    this.sizes.height = window.innerHeight;
    this.sizes.width = window.innerWidth;
    this.arrowQuantity = this.getArrowQuantity(
      this.sizes.width,
      this.sizes.height,
      this.arrowSize
    );
    this.placeArrows(this.arrowQuantity);
  };

  updateCursorPosition = (x: number, y: number) => {
    this.cursor.x = x;
    this.cursor.y = y;
    console.log(this.cursor.x, this.cursor.y);

    for (let arrow of this.elementsToUpdate) {
      arrow.rotateArrow(this.cursor.x, this.cursor.y);
    }
  };
}
