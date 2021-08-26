import p5 from 'p5'
import Constants from "../Constants"
import { Model } from "../model/Model"
import DebugView from './DebugView'

// This class draws all game objects to the p5 canvas
class View {

    p5: p5
    model: Model

    stationaryImage: p5.Image
    leftDipImage: p5.Image
    rightDipImage: p5.Image

    scoreBoardX: number
    scoreBoardRefY: number
    scoreBoardLabelOffset: number

    equationBoardX: number
    equationBoardY: number

    clockX: number
    clockY: number

    numFont: p5.Font

    timerDisplay: HTMLElement

    debugViewer: DebugView

    constructor(p5: p5, model: Model) {

        this.p5 = p5
        this.model = model

        this.canvasSetup()
        this.loadImages()
        this.loadFonts()

        this.debugViewer = new DebugView(p5, model)

    }

    // Set the P5 drawing parameters
    canvasSetup() {
        this.p5.rectMode(this.p5.CENTER)
        this.p5.rectMode(this.p5.CENTER)
        this.p5.imageMode(this.p5.CENTER)
        this.p5.strokeWeight(5)
        this.p5.stroke(0)
        this.p5.frameRate(30)
    }

    // Load the canoe images
    loadImages() {
        this.stationaryImage = this.p5.loadImage("./assets/images/canoe/canoe-stationary.svg");
        this.leftDipImage = this.p5.loadImage("./assets/images/canoe/canoe-left-dip.svg");
        this.rightDipImage = this.p5.loadImage("./assets/images/canoe/canoe-right-dip.svg");
    }

    loadFonts() {
        this.numFont = this.p5.loadFont('./assets/fonts/Poppins-Medium.ttf')
    }

    // Core method which draws things to the p5 canvas
    render() {
        this.p5.background("#00b16a")
        this.drawRiverBanks()
        this.drawRiver()
        this.drawNumbers()
        this.drawCanoe()
        // this.debugViewer.render()
    }

    // Draws the sand-colored river banks
    drawRiverBanks() {

        this.p5.push()

            this.p5.noFill()
            this.p5.strokeWeight(Constants.SAND_BANK_WIDTH)
            this.p5.stroke(194, 178, 128)

            this.p5.beginShape()

                for (const point of this.model.river.leftBankSand) {
                    this.p5.curveVertex(point.x, point.y)
                }

            this.p5.endShape()

        this.p5.pop()

    }

    // Draws the blue river water
    drawRiver() {    

        this.p5.push()

            this.p5.noFill()

            this.p5.strokeWeight(Constants.RIVER_WIDTH)
            this.p5.stroke("#2980b9")
            
            this.p5.beginShape()

                for (const point of this.model.river.centerCoordinates) {
                    this.p5.curveVertex(point.x, point.y)
                }

            this.p5.endShape()

        this.p5.pop()

    }

    // Draws different canoe images based on the canoe state,
    // and does so with different rotations
    drawCanoe() {
        let currentImage
        if (this.model.canoe.leftPaddle) currentImage = this.leftDipImage
        else if (this.model.canoe.rightPaddle) currentImage = this.rightDipImage;
        else currentImage = this.stationaryImage;
       
        this.p5.push()
            this.p5.translate(innerWidth / 2, this.model.canoe.position.y);
            this.p5.rotate(this.model.canoe.rotationRadians - Math.PI / 2);
            this.p5.image(currentImage, 0, 0, Constants.CANOE_W_H, Constants.CANOE_W_H);
        this.p5.pop()
    }

    // Draws the numbers in the river
    drawNumbers() {
        this.p5.push() 
            this.p5.textAlign(this.p5.CENTER, this.p5.CENTER)
            this.p5.textSize(40)
            this.p5.textFont(this.numFont)
            for (const number of this.model.numberGenerator.riverNumbers) {
                this.p5.strokeWeight(5)
                this.p5.stroke('black')
                this.p5.ellipse(number.position.x, number.position.y, Constants.CIRCLE_SIZE)
                this.p5.strokeWeight(0)
                this.p5.stroke(0)
                this.p5.text(number.num, number.position.x, number.position.y - 6)
            }
        this.p5.pop()
    }

}

export { View }