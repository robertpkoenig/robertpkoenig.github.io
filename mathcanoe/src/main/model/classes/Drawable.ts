import { Vector, Polygon } from 'sat'

class Drawable {
    name: string
    widthAndHeight: number
    position: Vector
    box: Polygon

    constructor(x: number, y: number, widthAndHeight: number, name: string) {
        this.position = new Vector(x, y)
        this.widthAndHeight = widthAndHeight
        this.box = new Polygon(this.position, this.getBoundingBoxVectors())
        this.name = name
    }

    getBoundingBoxVectors(): Vector[] {
        const vectors: Vector[] = []

        const halfDimension = this.widthAndHeight / 2
        vectors.push(new Vector(-halfDimension, -halfDimension))
        vectors.push(new Vector(halfDimension, -halfDimension))
        vectors.push(new Vector(halfDimension, halfDimension))
        vectors.push(new Vector(-halfDimension, halfDimension))

        return vectors
    }

    applyPhysics(yVelocity: number, xVelocity: number) {
        this.position.y += yVelocity
        this.position.x += xVelocity
    }
}

export { Drawable }