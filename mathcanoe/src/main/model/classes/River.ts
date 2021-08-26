import { Vector } from "sat"
import Constants from "../../Constants"
import { LinkedList } from "../../helper/LinkedList"
import { LLNode } from "../../helper/LLNode"
import { Wave } from "../../helper/Wave"
import { Canoe } from "./Canoe"


class River {

    riverWaves: Wave[]
    leftBankWaves: Wave[]
    rightBankWaves: Wave[]

    canoe: Canoe

    rightBank: LinkedList<Vector>
    leftBank: LinkedList<Vector> 
    centerCoordinates: LinkedList<Vector>
    xOffset: number

    rightBankSand: LinkedList<Vector>
    leftBankSand: LinkedList<Vector> 

    velocities: LinkedList<Vector>
    velocityNodeAtCanoePosition: LLNode<Vector>
    velocityPositionNode: LLNode<Vector>

    leftBankCollisionHead: LLNode<Vector>
    rightBankCollisionHead: LLNode<Vector>
    collisionHeadHeight: number

    bankLength: number
    bankAdditionIncrement: number

    constructor(canoe: Canoe) {
        this.canoe = canoe
        // this.screen = screen
        this.xOffset = 0
        this.bankAdditionIncrement = 0
        this.bankLength = 0

        this.initializeRiverWaves()
        this.initializeLeftBankWaves()
        
        this.rightBank = new LinkedList<Vector>()
        this.leftBank = new LinkedList<Vector>()
        this.centerCoordinates = new LinkedList<Vector>()
        this.velocities = new LinkedList<Vector>()

        this.rightBankSand = new LinkedList<Vector>()
        this.leftBankSand = new LinkedList<Vector>()

        this.collisionHeadHeight = this.canoe.height - Constants.CANOE_W_H
    }

    initializeRiverWaves() {
        this.riverWaves = []
        this.riverWaves.push(new Wave(200, 3000, Math.random() * 3000))
        this.riverWaves.push(new Wave(150, 1600, Math.random() * 1600))
        this.riverWaves.push(new Wave(50, 800, 0))
        this.riverWaves.push(new Wave(75, 800, 400))
    }

    initializeLeftBankWaves() {
        this.leftBankWaves = []
        this.leftBankWaves.push(new Wave(10, 1000, Math.random() * 1000))
        this.leftBankWaves.push(new Wave(10, 1000, Math.random() * 1000))
        this.leftBankWaves.push(new Wave(5, 500, Math.random() * 500))
    }

    initializeRightBankWaves() {
        this.rightBankWaves = []
        this.rightBankWaves.push(new Wave(10, 1000, Math.random() * 1000))
        this.rightBankWaves.push(new Wave(10, 1000, Math.random() * 1000))
        this.rightBankWaves.push(new Wave(5, 500, Math.random() * 500))
    }

    generateInitialBankPoint() {
        let firstCenterXPosition = window.innerWidth / 2
        for (const wave of this.riverWaves) {
            firstCenterXPosition += wave.getX( - Constants.CENTER_POINT_Y_GAP)
        }
        
        const firstCenterYPosition = -Constants.VERTICAL_OFFSET + Constants.CENTER_POINT_Y_GAP
        const firstCenterPoint = new Vector(firstCenterXPosition, firstCenterYPosition)
        this.centerCoordinates.addFirst(firstCenterPoint)
        // Add a dummy velocity to ensure length of velocities is same as river
        this.velocities.addFirst(new Vector(0, 0))
    }

    setVelocityNodeAtCanoePosition() {

        let positionNode = this.centerCoordinates.head
        let vectorNode = this.velocities.head

        while (positionNode.value.y < this.canoe.height) {
            positionNode = positionNode.next
            vectorNode = vectorNode.next

        }

        this.velocityNodeAtCanoePosition = vectorNode
        this.velocityPositionNode = positionNode

    }

    manageBanks() {
        while(this.centerCoordinates.head.value.y > - Constants.VERTICAL_OFFSET + Constants.CENTER_POINT_Y_GAP) {
            this.generateBanks()
        }
    }

    generateBanks() {
            this.bankAdditionIncrement = 0
            const prevCenterCoordinate: Vector = this.centerCoordinates.getFirst()
            const newCenterCoordinate: Vector = this.generateNewCenterCoordinate()
            this.centerCoordinates.addFirst(newCenterCoordinate)

            const centerXChange = prevCenterCoordinate.x - newCenterCoordinate.x
            const centerYChange = prevCenterCoordinate.y - newCenterCoordinate.y
            const hypotenuse = Math.sqrt((centerXChange * centerXChange) + (centerYChange * centerYChange))
            const positionMultiplier = (Constants.RIVER_WIDTH / 2) / hypotenuse

            // multiply the centerRise by position multiplier to get the increase in left bank x position
            const newLeftBankCoordinateX = (newCenterCoordinate.x + (centerYChange * positionMultiplier))
            const newLeftBankCoordinateY = (newCenterCoordinate.y - (centerXChange * positionMultiplier))
            const newLeftBankCoordinate = new Vector(newLeftBankCoordinateX, newLeftBankCoordinateY)
            this.leftBank.addFirst(newLeftBankCoordinate)

            const newLeftBankSandCoordinate = newLeftBankCoordinate.clone()
            newLeftBankSandCoordinate.x += this.generateNewLeftBankOffset()
            this.leftBankSand.addFirst(newLeftBankSandCoordinate)

            // multiply the centerRise by position multiplier to get the increase in left bank x position
            const newRightBankCoordinateX = (newCenterCoordinate.x - (centerYChange * positionMultiplier))
            const newRightBankCoordinateY = (newCenterCoordinate.y + (centerXChange * positionMultiplier))
            const newRightBankCoordinate = new Vector(newRightBankCoordinateX, newRightBankCoordinateY)
            this.rightBank.addFirst(newRightBankCoordinate)

            const newRightBankSandCoordinate = newRightBankCoordinate.clone()
            newRightBankSandCoordinate.x += this.generateNewLeftBankOffset()
            this.rightBankSand.addFirst(newRightBankSandCoordinate)
            
            this.addNewVelocityToList(centerXChange, centerYChange, hypotenuse)

            if (this.leftBankCollisionHead != null) this.updateCollisionHeads()
            this.bankLength += Constants.CENTER_POINT_Y_GAP
            // Because of y axis going down, bank length grows negatively
            // this.bankLength -= Constants.centerPointYGap;
            
            this.bankAdditionIncrement += Constants.FLOW_RATE
    }

    addNewVelocityToList(centerXChange: number, centerYChange: number, hypotenuse: number) {
        const riverVelocity: Vector = new Vector((centerXChange/hypotenuse), (centerYChange/hypotenuse))
        riverVelocity.normalize()
        riverVelocity.x *= Constants.FLOW_RATE
        riverVelocity.y *= Constants.FLOW_RATE
        this.velocities.addFirst(riverVelocity)
        if (this.velocityNodeAtCanoePosition != null) {
            this.updateVelocityNodeAtCanoePosition();
        }
    }

    updateVelocityNodeAtCanoePosition() {
        while (this.velocityPositionNode.value.y > this.canoe.height) {
            this.velocityPositionNode = this.velocityPositionNode.prev
            this.velocityNodeAtCanoePosition = this.velocityNodeAtCanoePosition.prev
        }
    }

    generateNewCenterCoordinate(): Vector {
        let bankXOffset = window.innerWidth / 2 + this.xOffset;
        for (const wave of this.riverWaves) {
            bankXOffset += wave.getX(this.bankLength);
        }
        const newCenterPoint = new Vector(bankXOffset, this.centerCoordinates.head.value.y - Constants.CENTER_POINT_Y_GAP);
        return newCenterPoint;
    }

    generateNewLeftBankOffset(): number {
        let leftBankSandXOffset = 0
        for (const wave of this.leftBankWaves) {
            leftBankSandXOffset += wave.getX(this.bankLength);
        }
        return leftBankSandXOffset
    }

    generateNewRightBankOffset(): number {
        let rightBankSandXOffset = 0
        for (const wave of this.rightBankWaves) {
            rightBankSandXOffset += wave.getX(this.bankLength);
        }
        return rightBankSandXOffset
    }

    pruneBanks() {
        if (this.bankAdditionIncrement >= 10) {
                this.centerCoordinates.removeLast();
                this.leftBank.removeLast();
                this.rightBank.removeLast();
                this.leftBankSand.removeLast()
        }
    }

    getInitialCollisionHead(bank: LinkedList<Vector>): LLNode<Vector> {

        let currNode = bank.head
        while (currNode.value.y < this.collisionHeadHeight) {
            currNode = currNode.next
        }

        return currNode

    }

    updateCollisionHeads() {

        while (this.leftBankCollisionHead.value.y > this.collisionHeadHeight) {
            this.leftBankCollisionHead = this.leftBankCollisionHead.prev
        }

        while (this.rightBankCollisionHead.value.y > this.collisionHeadHeight) {
            this.rightBankCollisionHead = this.rightBankCollisionHead.prev
        }

    }

    applyPhysics() {
        this.xOffset -= this.canoe.velocity.x

        for (const rightBankCoordinate of this.rightBank) {
            rightBankCoordinate.y += this.canoe.velocity.y;
            rightBankCoordinate.x -= this.canoe.velocity.x
        }
        for (const leftBankCoordinate of this.leftBank) {
            leftBankCoordinate.y += this.canoe.velocity.y;
            leftBankCoordinate.x -= this.canoe.velocity.x
        }
        for (const riverCenterCoordinate of this.centerCoordinates) {
            riverCenterCoordinate.y += this.canoe.velocity.y;
            riverCenterCoordinate.x -= this.canoe.velocity.x
        }
        for (const leftBankSandCoordinate of this.leftBankSand) {
            leftBankSandCoordinate.y += this.canoe.velocity.y;
            leftBankSandCoordinate.x -= this.canoe.velocity.x
        }
        for (const rightBankSandCoordinate of this.rightBankSand) {
            rightBankSandCoordinate.y += this.canoe.velocity.y;
            rightBankSandCoordinate.x -= this.canoe.velocity.x
        }
    }

    adjustAllBankPoints(xOffset: number) {
        for (const leftBankCoordinate of this.rightBank) {
            leftBankCoordinate.x -= xOffset
        }
        for (const rightBankCoordinate of this.leftBank) {
            rightBankCoordinate.x -= xOffset
        }
        for (const riverCenterCoordinate of this.centerCoordinates) {
            riverCenterCoordinate.x -= xOffset
        }
        for (const leftBankSandCoordinate of this.leftBankSand) {
            leftBankSandCoordinate.x -= xOffset
        }
        for (const rightBankSandCoordinate of this.rightBankSand) {
            rightBankSandCoordinate.x -= xOffset
        }
    }

}

export { River }