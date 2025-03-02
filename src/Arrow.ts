export class Arrow {
  html: HTMLElement;
  image: HTMLImageElement;
  arrowSize: number = 42;
  gapSize: number = 8 * 2;
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

  rotateArrow = (x2: number, y2: number) => {
    const deltaX = x2 - this.positions.x;
    const deltaY = y2 - this.positions.y;
    const angle = Math.atan2(deltaY, deltaX);
    const angleDeg = angle * (180 / Math.PI);
    this.image.style.transform = `rotate(${angleDeg}deg)`;
  };
}
