import { Circle, Vector } from "sat"
import { Constants } from "../../Constants"

class RiverNumber {

    num: number
    position: Vector
    collisionCircle: Circle

    constructor(x: number, y: number, num: number) {
        this.position = new Vector(x, y)
        this.num = num
        this.collisionCircle = new Circle(this.position, Constants.numberCircleSize / 2)
    }
    
}

export { RiverNumber }