import P5 from "p5"
import { rotatePoint } from "../../helper/Rotate"
import { River } from "./River"
import SAT, { Polygon, Vector } from 'sat'
import { Constants } from "../../Constants"

class Canoe {

    river: River

    height: number

    velocity: Vector
    position: Vector
    leftDipForce: Vector
    rightDipForce: Vector

    polygon: Polygon
    leftPaddlePolygon: Polygon
    rightPaddlePolygon: Polygon

    canoePathOffsets: number[][] = [
        [-0.16,  0.0],
        [-0.12,  0.25],
        [ 0,     0.5],
        [ 0.12,  0.25],
        [ 0.16,  0],
        [ 0.12, -0.25],
        [ 0,    -0.5],
        [-0.12, -0.25],
        [-0.16,  0]
    ]

    leftPaddlePathOffsets: number[][] = [
        [-0.4, -0.05],
        [-0.4,  0.05],
        [   0,  0.05],
        [   0, -0.05],
        [-0.4, -0.05],
    ]

    rightPaddlePathOffsets: number[][] = [
        [   0, -0.05],
        [   0,  0.05],
        [ 0.4,  0.05],
        [ 0.4, -0.05],
        [   0, -0.05],
    ]

    /**
    * These arrays are used in the generateCanoeShape method to create a path
    * defining the boundary of the canoe and paddle for collision detection
    */

    leftPaddle: boolean
    rightPaddle: boolean
    forwardIntent: boolean
    backwardIntent: boolean

    selfPropulsion: Vector
    dampening: Vector

    rotationRadians: number

    constructor() {
        this.velocity = new Vector(0, 0)
        this.selfPropulsion = new Vector(0, 0)
        this.dampening = new Vector(0.5, 0.5)

        this.leftPaddle = false
        this.rightPaddle = false
        this.rotationRadians = 0

        this.height = Math.round(window.innerHeight * 0.75)
    }

    centerCanoeInRiver(river: River) {
        this.river = river
        const targetHeight = this.height

        let currNode = river.centerCoordinates.head
        while (currNode.value.y < targetHeight) {
            currNode = currNode.next
        }
        
        this.position = new Vector(window.innerWidth / 2, currNode.value.y)
        const riverXOffset = currNode.value.x - (window.innerWidth / 2)
        river.xOffset = -riverXOffset
        river.adjustAllBankPoints(riverXOffset)
    }

    setIntentForward() {
        this.forwardIntent = true
        this.backwardIntent = false
    }

    unSetIntentForward() {
        this.forwardIntent = false
    }

    setIntentBackward() {
        this.backwardIntent = true
        this.forwardIntent = false
    }

    unSetIntentBackward() {
        this.backwardIntent = false
    }

    paddleLeft() {
        this.rightPaddle = false
        this.leftPaddle = true
        if (this.forwardIntent) {
            this.paddleForwardLeft()
        }
        if (this.backwardIntent) {
            this.paddleBackwardLeft()
        }
    }

    paddleForwardLeft() {
        // setTimeout(this.unPaddleLeft.bind(this), 500)
        this.selfPropulsion.x += this.velocity.x / 5
        this.selfPropulsion.y += this.velocity.y / 5

        const perp = this.river.velocityNodeAtCanoePosition.value.clone()
        perp.perp().reverse()
        perp.y *= -1
        this.selfPropulsion.add(perp)
    }

    paddleBackwardLeft() {
        this.selfPropulsion.x -= this.velocity.x / 3
        this.selfPropulsion.y -= this.velocity.y / 3

        const perp = this.river.velocityNodeAtCanoePosition.value.clone()
        perp.perp().reverse()
        perp.y *= -1
        this.selfPropulsion.add(perp)
    }

    paddleRight() {
        this.leftPaddle = false
        this.rightPaddle = true
        if (this.forwardIntent) {
            this.paddleForwardRight()
        }
        if (this.forwardIntent) {
            this.paddleBackwardRight()
        }
    }

    paddleForwardRight() {
        // setTimeout(this.unPaddleLeft.bind(this), 500)
        this.selfPropulsion.x += this.velocity.x / 5
        this.selfPropulsion.y += this.velocity.y / 5

        const perp = this.river.velocityNodeAtCanoePosition.value.clone()
        perp.perp()
        perp.y *= -1
        this.selfPropulsion.add(perp)
    }

    paddleBackwardRight() {
        this.selfPropulsion.x -= this.velocity.x / 3
        this.selfPropulsion.y -= this.velocity.y / 3

        const perp = this.river.velocityNodeAtCanoePosition.value.clone()
        perp.perp()
        perp.y *= -1
        this.selfPropulsion.add(perp)
    }

    setPaddleUpright() {
        this.leftPaddle = false
        this.rightPaddle = false
    }

    unPaddleLeft() {
        this.leftPaddle = false
    }

    unPaddleRight() {
        this.rightPaddle = false
    }

    applyPhysics() {

        let x = this.river.velocityNodeAtCanoePosition.value.x * (Constants.centerPointYGap / 2)
        x *= -1
        let y = this.river.velocityNodeAtCanoePosition.value.y * (Constants.centerPointYGap / 2)

        // Apply the effects of the river
        this.velocity.x = x 
        this.velocity.y = y
       
        if (!this.forwardIntent && this.leftPaddle) {
            const perp = this.river.velocityNodeAtCanoePosition.value.clone()
            perp.perp().reverse()
            perp.scale(0.2, 0.2)
            perp.y *= -1
            this.selfPropulsion.add(perp)

            this.selfPropulsion.x -= x * 0.03
            this.selfPropulsion.y -= y * 0.03
        }

        else if (!this.forwardIntent && this.rightPaddle) {
            const perp = this.river.velocityNodeAtCanoePosition.value.clone()
            perp.perp()
            perp.scale(0.2, 0.2)
            perp.y *= -1
            this.selfPropulsion.add(perp)

            this.selfPropulsion.x -= x * 0.03
            this.selfPropulsion.y -= y * 0.03
        }

        this.velocity.add(this.selfPropulsion)
        this.selfPropulsion.x *= 0.95
        this.selfPropulsion.y *= 0.95

        this.rotationRadians = Math.atan2(this.velocity.y, -this.velocity.x)
        this.polygon.setAngle(this.rotationRadians + Math.PI / 2)
    }

    initializePolygons() {

        const canoeVectors: SAT.Vector[] = []
        for (const offset of this.canoePathOffsets) {
            const width = offset[0] * Constants.canoeSize
            const height = offset[1] * Constants.canoeSize
            const nextClockwiseVector = new SAT.Vector(width, height)
            canoeVectors.push(nextClockwiseVector)
        }
        this.polygon = new Polygon(this.position, canoeVectors)
    
        const leftPaddleVectors: SAT.Vector[] = []
        for (const offset of this.leftPaddlePathOffsets) {
            const width = offset[0] * Constants.canoeSize
            const height = offset[1] * Constants.canoeSize
            const nextClockwiseVector = new SAT.Vector(width, height)
            leftPaddleVectors.push(nextClockwiseVector)
        }
        this.leftPaddlePolygon = new Polygon(this.position, leftPaddleVectors)
 
        const rightPaddleVectors: SAT.Vector[] = []
        for (const offset of this.rightPaddlePathOffsets) {
            const width = offset[0] * Constants.canoeSize
            const height = offset[1] * Constants.canoeSize
            const nextClockwiseVector = new SAT.Vector(width, height)
            rightPaddleVectors.push(nextClockwiseVector)
        }
        this.rightPaddlePolygon = new Polygon(this.position, rightPaddleVectors)
        
    }

}

export { Canoe }

    // Rotate the path by the current rotation angle
    // so that collision detection can be applied to the shape
    // described by the rotated path

    // getRotatedCanoePath() {
    //     const rotatedPath: number[][] = []
    //     for (const coordinate of this.canoePathOffsets) {
    //         const x = coordinate[0],
    //               y = coordinate[1],
    //               newCoordinate = rotatePoint(0, 0, x, y, this.rotationFactor)
    //         rotatedPath.push(newCoordinate)
    //     }
    //     return rotatedPath
    // }