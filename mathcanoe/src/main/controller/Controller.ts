import p5 from "p5";
import { Canoe } from "../model/classes/Canoe";
import { Model } from "../model/Model";

class Controller {

    model: Model
    p5: p5

    introState: number

    constructor(p5: p5, model: Model) {
        this.model = model
        this.p5 = p5
        this.introState = 0
    }

    routeKeyPress(key: string) {
        switch (key) {
            case "ArrowLeft":
                this.handleLeftPress()
                break
            case "ArrowRight":
                this.handleRightPress()
                break                   
            case "ArrowUp":
                this.handleUpPress()
                break
            case "ArrowDown":
                this.handleDownPress()
                break
            case " ":
                this.handleSpacePress()
                break
            default:
                break
        }
    }

    routeKeyRelease(key: string) {
        switch (key) {
            case "ArrowLeft":
                this.handleLeftRelease()
                break
            case "ArrowRight":
                this.handleRightRelease()
                break                   
            case "ArrowUp":
                this.handleUpRelease()
                break
            case "ArrowDown":
                this.handleDownRelease()
                break
            default:
                break
        }
    }

    handleSpacePress(): void {

        this.introState++

        if (this.introState > 2) return

        if (this.introState == 1) {
            this.p5.select("#popup").style("visibility: hidden")
            this.p5.select("#arrow-key-instructions").style("visibility: visible")
        }

        if (this.introState == 2) {

            this.p5.select("#arrow-key-instructions").style("visibility: hidden")

            this.model.started = true
            this.model.ongoing = true
            this.model.timer.start() 

        }

    }

    handleXPress(): void {
        throw new Error("Method not implemented.")
    }

    handleLeftRelease(): void {
        this.model.canoe.unPaddleLeft()
    }

    handleRightRelease(): void {
        this.model.canoe.unPaddleRight()
    }

    handleUpRelease(): void {
        this.model.canoe.unSetIntentForward()
    }

    handleDownRelease(): void {
        this.model.canoe.unSetIntentBackward()
    }

    handleLeftPress(): void {
        this.model.canoe.paddleLeft()
        this.model.eventManager.arrowPressed()
    }
    
    handleRightPress(): void {
        this.model.canoe.paddleRight()
        this.model.eventManager.arrowPressed()
    }

    handleUpPress(): void {
        this.model.canoe.setIntentForward()
    }

    handleDownPress(): void {
        this.model.canoe.setIntentBackward()
    }

    handleMousePressed(): void {
        // this.canoeScreen.sound.play()
    }

}

export { Controller }