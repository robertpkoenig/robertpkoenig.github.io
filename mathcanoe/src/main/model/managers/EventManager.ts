import { RiverNumber } from "../classes/RiverNumber";
import { Model } from "../Model";
import SoundPlayer from "./SoundPlayer";

class EventManager {

    model: Model
    p5: p5
    soundPlayer: SoundPlayer

    constructor(p5: p5, model: Model, soundPlayer: SoundPlayer) {
        this.p5 = p5
        this.model = model
        this.soundPlayer = soundPlayer
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
        document.getElementById("crash-screen").style.visibility = "visible"
    }

    handleTimerRunOut() {
        this.model.ongoing = false
        this.model.ended = true
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
            this.soundPlayer.playSuccess()
        }
        else {
            this.model.pointsManager.decrementScore()
            this.soundPlayer.playFailure()
        }

        this.model.numberGenerator.removeNumber(number)

        document.getElementById("score").innerHTML =
            this.model.pointsManager.score.toString()
    }

}

export { EventManager }