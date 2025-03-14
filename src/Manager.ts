import GUI from 'lil-gui'
import { Arrow } from "./Arrow";

export class Manager {
  arrowQuantity!: number;
  arrowSize: number = 42;
  gapSize: number = 8 * 2;
  arrowHTMLElement: HTMLElement;
  elementsToUpdate: Array<Arrow> = [];
  mapHTML: HTMLElement = document.querySelector(".map") as HTMLElement;
  gui!: GUI
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
    this.updateScene()
    this.initGUI()
  }

  initGUI = () => {
    this.gui = new GUI()
    this.gui.add(this, 'arrowSize', 10, 100, 1).name('Arrows size').onChange(() => {this.updateScene()})
    this.gui.add(this, 'gapSize', 0, 100, 1).name('Gap size').onChange(() => {this.updateScene()})
  }

  updateScene = () => {
    this.updateSizes()
    this.placeArrows();
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

  placeArrows = () => {
    this.mapHTML.innerHTML = "";
    for (let i = 0; i < this.arrowQuantity; i++) {
      const arrowClone = this.arrowHTMLElement.cloneNode(true) as HTMLElement;
      const arrow = new Arrow(arrowClone);
      this.elementsToUpdate.push(arrow);
      this.mapHTML.appendChild(arrowClone);
    }
  };

  updateSizes = () => {
    this.sizes.height = window.innerHeight;
    this.sizes.width = window.innerWidth;
    this.updateCSS()
    this.arrowQuantity = this.getArrowQuantity(
      this.sizes.width,
      this.sizes.height,
      this.arrowSize
    );
    this.placeArrows();
  };

  updateCursorPosition = (x: number, y: number) => {
    this.cursor.x = x;
    this.cursor.y = y;
    console.log(this.cursor.x, this.cursor.y);

    for (let arrow of this.elementsToUpdate) {
      arrow.applyTransformations(this.cursor.x, this.cursor.y)
    }
  };

  updateCSS = () => {
    this.arrowHTMLElement.style.width = `${this.arrowSize}px`
    this.arrowHTMLElement.style.height = `${this.arrowSize}px`
    this.arrowHTMLElement.style.padding = `${this.gapSize / 2}px`
  }
}
