import SAT, { Vector } from "sat"
import Constants from "../../Constants"
import { Model } from "../Model"

class CollisionDetector {
    
    model: Model
    collisionCheckLength: number

    constructor(model: Model) {
        this.model = model
        this.setCollisionCheckLength()
    }

    setCollisionCheckLength() {
        this.collisionCheckLength = (Constants.CANOE_W_H * 2) / Constants.CENTER_POINT_Y_GAP        
    }

    detectCollisions() {

        if (this.canoeCollisionDetected()) 
            this.model.eventManager.handleCanoeCrash()

        if (this.leftPaddleCollisitionDetected())
            this.model.eventManager.handleLeftPaddleCollision()

        if (this.rightPaddleCollisitionDetected())
            this.model.eventManager.handleRightPaddleCollision()
                
        this.detectAndReportNumberCollision()

    }

    canoeCollisionDetected(): boolean {
        
        let currLeftNode = this.model.river.leftBankCollisionHead

        for (let i = 0 ; i < this.collisionCheckLength ; i++) {
            if (SAT.pointInPolygon(currLeftNode.value, this.model.canoe.polygon)) {
                // console.log("leftHit");
                return true
            }
            currLeftNode = currLeftNode.next
        }

        let currRightNode = this.model.river.rightBankCollisionHead

        for (let i = 0 ; i < this.collisionCheckLength ; i++) {
            if (SAT.pointInPolygon(currRightNode.value, this.model.canoe.polygon)) {
                // console.log("rightHit");
                return true
            }
            currRightNode = currRightNode.next
        }

        // for (const rock of this.model.rockManager.rocks) {
        //     if (SAT.testPolygonPolygon(this.model.canoe.polygon, rock.box)) {
        //         // console.log("rockHit");
        //         return true
        //     }
        // }

        return false
    }

    detectAndReportNumberCollision(): void {
        for (const number of this.model.numberGenerator.riverNumbers) {
            if (number.collisionCircle.pos.y < this.model.canoe.position.y - Constants.CANOE_W_H / 2 ||
                number.collisionCircle.pos.y > this.model.canoe.position.y + Constants.CANOE_W_H / 2) {
                    continue
                }
            
            for (const point of this.model.canoe.polygon.points) {
                
                const x = point.x + this.model.canoe.polygon.pos.x
                const y = point.y + this.model.canoe.polygon.pos.y

                if (SAT.pointInCircle(new Vector(x, y), number.collisionCircle)) {
                    this.model.eventManager.handleNumberCollision(number)
                }
            }
        }
    }

    leftPaddleCollisitionDetected(): boolean {
        
        let currLeftNode = this.model.river.leftBankCollisionHead

        for (let i = 0 ; i < this.collisionCheckLength ; i++) {
            if (SAT.pointInPolygon(currLeftNode.value, this.model.canoe.leftPaddlePolygon)) {
                // console.log("leftPaddleHit");
                return true
            }
            currLeftNode = currLeftNode.prev
        }

        let currRightNode = this.model.river.rightBankCollisionHead

        for (let i = 0 ; i < this.collisionCheckLength ; i++) {
            if (SAT.pointInPolygon(currRightNode.value, this.model.canoe.leftPaddlePolygon)) {
                // console.log("leftPaddleHit");
                return true
            }
            currRightNode = currRightNode.next
        }

        return false
    }

    rightPaddleCollisitionDetected(): boolean {
        
        let currLeftNode = this.model.river.leftBankCollisionHead

        for (let i = 0 ; i < this.collisionCheckLength ; i++) {
            if (SAT.pointInPolygon(currLeftNode.value, this.model.canoe.rightPaddlePolygon)) {
                // console.log("rightPaddleHit");
                return true
            }
            currLeftNode = currLeftNode.prev
        }

        let currRightNode = this.model.river.rightBankCollisionHead

        for (let i = 0 ; i < this.collisionCheckLength ; i++) {
            if (SAT.pointInPolygon(currRightNode.value, this.model.canoe.rightPaddlePolygon)) {
                // console.log("rightPaddleHit");
                return true
            }
            currRightNode = currRightNode.next
        }

        return false
    }

}

export { CollisionDetector }