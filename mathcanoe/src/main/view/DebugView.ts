import p5 from "p5"
import { Model } from "../model/Model"

class DebugView {

    p5: p5
    model: Model

    constructor(p5: p5, model: Model) {
        this.p5 = p5
        this.model = model
    }

    render() {
        this.drawVelocityHeadNode()
        this.drawCenterCoordinates()
        this.drawCanoePolygon()
        this.drawLeftPaddlePolygon()
        this.drawRightBankCoordinates()
        this.drawCanoePosition()
        this.drawCanoeCentroid()
        this.drawLeftPaddleCentroid()
        this.drawLeftBankCollisionHeadAndEnd()
        this.drawRightBankCollisionHead()
        this.drawRiverVelocityNodeVector()
        this.drawRiverVelocityRightPerpendicular()
    }

    drawVelocityHeadNode() {
        this.p5.ellipse(this.model.river.velocityNodeAtCanoePosition.value.x + 100,
                        this.model.river.velocityNodeAtCanoePosition.value.y + 100, 10, 10)
    }

    // drawRockPolygons() {
    //     for (const rock of this.model.rockManager.rocks) {
    //         this.p5.beginShape()
    //         for (const point of rock.box.points) {
    //             this.p5.vertex(point.x + 50, point.y + 50)
    //         }
    //         this.p5.endShape(this.p5.CLOSE)
    //     }
    // }

    drawCenterCoordinates() {
        for (const centerCoordinate of this.model.river.centerCoordinates) {
            this.p5.ellipse(centerCoordinate.x, centerCoordinate.y, 5, 5);
        }
    }

    drawCanoePolygon() {
        this.p5.beginShape()
        for (const point of this.model.canoe.polygon.calcPoints) {
            this.p5.vertex(point.x + 50, point.y + 50)
        }
        this.p5.endShape(this.p5.CLOSE)
    }

    drawLeftPaddlePolygon() {
        this.p5.beginShape()
        for (const point of this.model.canoe.leftPaddlePolygon.calcPoints) {
            this.p5.vertex(point.x + 50, point.y + 50)
        }
        this.p5.endShape(this.p5.CLOSE)
    }

    drawRightBankCoordinates() {
        for (const rightBankPoint of this.model.river.rightBank) {
            // if (SAT.pointInPolygon(rightBankPoint, this.canoe.canoePolygon)) console.log("Right bank collision");
            this.p5.ellipse(rightBankPoint.x, rightBankPoint.y, 5)
        }
    }

    drawCanoePosition() {
        const position = this.model.canoe.polygon.pos
        this.p5.ellipse(position.x, position.y, 10)
    }

    drawCanoeCentroid() {
        const centroid = this.model.canoe.polygon.getCentroid()
        this.p5.ellipse(centroid.x, centroid.y, 5)
    }

    drawLeftPaddleCentroid() {
        const leftPaddlePosition = this.model.canoe.leftPaddlePolygon.pos
        this.p5.ellipse(leftPaddlePosition.x, leftPaddlePosition.y, 10)
    }

    drawLeftBankCollisionHeadAndEnd() {
        const leftHead = this.model.river.leftBankCollisionHead
        this.p5.ellipse(leftHead.value.x, leftHead.value.y, 10)
        let leftEnd = this.model.river.leftBankCollisionHead
        for (let i = 0 ; i < 50 ; i++) {
            leftEnd = leftEnd.next
        }
        this.p5.ellipse(leftEnd.value.x, leftEnd.value.y, 10)
    }

    drawRightBankCollisionHead() {
        const rightHead = this.model.river.rightBankCollisionHead
        this.p5.ellipse(rightHead.value.x, rightHead.value.y, 10)
    }

    drawRiverVelocityNodeVector() {
        this.p5.ellipse(this.model.river.velocityPositionNode.value.x, this.model.river.velocityPositionNode.value.y, 20)
        this.p5.stroke(255, 0, 0)
        this.p5.line(this.model.river.velocityPositionNode.value.x, this.model.river.velocityPositionNode.value.y, 
                     this.model.river.velocityPositionNode.value.x + this.model.river.velocityNodeAtCanoePosition.value.x,
                     this.model.river.velocityPositionNode.value.y + this.model.river.velocityNodeAtCanoePosition.value.y)
    }

    drawRiverVelocityRightPerpendicular() {
        const rightPerp = this.model.river.velocityNodeAtCanoePosition.value.clone()
        rightPerp.perp()
        this.p5.line(this.model.river.velocityPositionNode.value.x, this.model.river.velocityPositionNode.value.y, 
            this.model.river.velocityPositionNode.value.x + rightPerp.x,
            this.model.river.velocityPositionNode.value.y + rightPerp.y)
        this.p5.stroke(0, 255, 0)
        const leftPerp = this.model.river.velocityNodeAtCanoePosition.value.clone()
        leftPerp.perp().perp().perp().scale(0.5, 0.5)
            this.p5.line(this.model.river.velocityPositionNode.value.x, this.model.river.velocityPositionNode.value.y, 
                this.model.river.velocityPositionNode.value.x + leftPerp.x,
                this.model.river.velocityPositionNode.value.y + leftPerp.y)
    }

}