import { RiverNumber } from "../classes/RiverNumber";
import { Model } from "../Model";

class EventManager {

    model: Model

    constructor(model: Model) {
        this.model = model
    }

    arrowPressed() {
        if (this.model.instructionsVisible) {
            document.getElementById("arrow-key-instructions").style.visibility = "hidden"
        }
    }

    handleCanoeCollision() {
        this.model.crashed = true
        this.model.ongoing = false
        this.model.ended = true
        this.model.timer.ongoing = false
    }

    handleTimerRunOut() {
        this.model.ongoing = false
        this.model.ended = true
        this.model.timer.ongoing = false
    }

    handleLeftPaddleCollision() {
        this.model.canoe.leftPaddle = false
    }

    handleRightPaddleCollision() {
        this.model.canoe.rightPaddle = false
    }

    handleNumberCollision(number: RiverNumber) {

        if (number.num == this.model.equationGenerator.currentEquation.answer) {
            this.model.pointsManager.incrementScore()
            this.model.equationGenerator.generateAndSetEquation()
            this.model.numberGenerator.replaceExistingNumbers()
        }
        else this.model.pointsManager.decrementScore()

        this.model.numberGenerator.removeNumber(number)

        document.getElementById("score").innerHTML =
            this.model.pointsManager.score.toString()
    }

}

export { EventManager }