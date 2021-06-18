// https://stackoverflow.com/questions/17410809/how-to-calculate-rotation-in-2d-in-javascript

const rotatePoint = function(centerX: number, centerY: number, 
                             x: number, y: number, radians: number) {
    let cos = Math.cos(radians),
          sin = Math.sin(radians),
          newX = (cos * (x - centerX)) + (sin * (y - centerY)) + centerX,
          newY = (cos * (y - centerY)) - (sin * (x - centerX)) + centerY;
    return [newX, newY];

}

export { rotatePoint }