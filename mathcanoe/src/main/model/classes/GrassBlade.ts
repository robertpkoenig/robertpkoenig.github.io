import { Vector } from "sat"

enum GrassBladeDirection {
    UP,
    LEFT,
    RIGHT,
}

class GrassBlade {

    direction: GrassBladeDirection
    pos: Vector

    constructor(direction: GrassBladeDirection, pos: Vector) {
        this.direction = direction
        this.pos = pos
    }

}

export  { GrassBlade, GrassBladeDirection }