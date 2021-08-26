import { Circle, Vector } from "sat"
import Constants from "../../Constants"

// This is the wrapper class for the numbers displayed in the river
class RiverNumber {

    num: number
    position: Vector
    collisionCircle: Circle

    constructor(x: number, y: number, num: number) {
        this.position = new Vector(x, y)
        this.num = num
        this.collisionCircle = new Circle(this.position, Constants.CIRCLE_SIZE / 2)
    }
    
}

export { RiverNumber }