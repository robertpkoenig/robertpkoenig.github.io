import { RiverNumber } from "../classes/RiverNumber";
import { Model } from "../Model";
import SoundPlayer from "./SoundPlayer";

// This class is called by various classes to handle events
// that occur during game play. It exists so that the classes
// which call it can be made cleaner, and less cluttered.
class EventManager {

    model: Model
    p5: p5
    soundPlayer: SoundPlayer

    constructor(p5: p5, model: Model, soundPlayer: SoundPlayer) {
        this.p5 = p5
        this.model = model
        this.soundPlayer = soundPlayer
    }

    // Hides the arrow instructions on the screen
    hideArrowInstructions() {
        if (this.model.instructionsVisible) {
            document.getElementById("arrow-key-instructions").style.visibility = "hidden"
            this.model.instructionsVisible = false
        }
    }

    // When the canoe crashes, the game finishes
    handleCanoeCrash() {
        this.model.crashed = true
        this.model.ongoing = false
        this.model.ended = true
        document.getElementById("crash-screen").style.visibility = "visible"
    }

    // When the left paddle collides with the river bank,
    // it is raised up
    handleLeftPaddleCollision() {
        this.model.canoe.leftPaddle = false
    }

    // When the right paddle collides with the river bank,
    // it is raised up
    handleRightPaddleCollision() {
        this.model.canoe.rightPaddle = false
    }

    // Triggered when the canoe collides with a number
    handleNumberCollision(number: RiverNumber) {

        // If it is the correct number
        if (number.num == this.model.equationGenerator.currentEquation.answer) {
            this.handleCorrectNumberCollision()
        }
        // If it is the wrong number
        else {
            this.handleIncorrectNumberCollision()
        }

        // Remove the number from the river
        this.model.numberGenerator.removeNumber(number)

        // Update the score DOM element
        document.getElementById("score").innerHTML =
            this.model.pointsManager.score.toString()

    }

    // When correct number is hit
    handleCorrectNumberCollision() {
        this.model.pointsManager.incrementScore()
        this.model.equationGenerator.generateAndSetEquation()
        this.model.numberGenerator.replaceExistingNumbers()
        this.soundPlayer.playSuccess()
    }

    // When incorrect number is hit
    handleIncorrectNumberCollision() {
        this.model.pointsManager.decrementScore()
        this.soundPlayer.playFailure()
    }

}

export { EventManager }