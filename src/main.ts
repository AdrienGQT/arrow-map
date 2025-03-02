import { Manager } from "./Manager"

let manager : Manager;

const onLoad = () => {
  manager = new Manager()
}

const onResize = () => {
  manager.updateSizes()
}

const onMouseMove= (e:MouseEvent) => {
  manager.updateCursorPosition(e.clientX, e.clientY)
}

window.addEventListener('DOMContentLoaded', onLoad)

window.addEventListener('resize', onResize)

window.addEventListener('mousemove', onMouseMove)
