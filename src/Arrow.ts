export class Arrow {
  html: HTMLElement;
  image: HTMLImageElement;
  arrowSize: number = 42;
  gapSize: number = 8 * 2;
  effectsDistance = 750;
  positions = {
    x: 0,
    y: 0,
  };

  constructor(html: HTMLElement) {
    this.html = html;
    this.image = html.querySelector(".arrowImage") as HTMLImageElement;
    setTimeout(() => {
      const properties = this.html.getBoundingClientRect();
      this.positions = {
        x: properties.left + properties.width / 2,
        y: properties.top + properties.height / 2,
      };
      console.log(this.positions);
    }, 500);
  }

  applyTransformations = (cursorX: number, cursorY: number) => {
    const distance = this.getDistance(cursorX, cursorY)
    this.rotate(cursorX, cursorY)
    this.applyOpacity(distance)
  }

  getDistance = (x: number, y: number) => {
    const distance = Math.sqrt((x - this.positions.x)**2 + (y - this.positions.y)**2)
    return distance
  }

  rotate = (x2: number, y2: number) => {
    const deltaX = x2 - this.positions.x;
    const deltaY = y2 - this.positions.y;
    const angle = Math.atan2(deltaY, deltaX);
    const angleDeg = angle * (180 / Math.PI);
    this.image.style.transform = `rotate(${angleDeg}deg)`;
  };

  applyOpacity = (distance: number) => {
    const opacity = Math.max(0.1, 1 - (distance / this.effectsDistance))
    this.image.style.opacity = String(opacity)
  }
}
