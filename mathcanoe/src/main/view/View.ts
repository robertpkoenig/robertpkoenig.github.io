import p5 from 'p5'
import { Constants } from "../Constants"
import { Vector } from "sat"
import { Model } from "../model/Model"

class View {

    p5: p5
    model: Model

    stationaryImage: p5.Image
    leftDipImage: p5.Image
    rightDipImage: p5.Image
    rockImage: p5.Image

    scoreBoardX: number
    scoreBoardRefY: number
    scoreBoardLabelOffset: number

    equationBoardX: number
    equationBoardY: number

    clockX: number
    clockY: number

    numFont: p5.Font

    timerDisplay: HTMLElement

    constructor(p5: p5, model: Model) {

        this.p5 = p5
        this.model = model

        this.canvasSetup()
        this.loadImages()
        this.loadFonts()
        this.selectDomElements()

    }

    canvasSetup() {
        this.p5.rectMode(this.p5.CENTER)
        this.p5.rectMode(this.p5.CENTER)
        this.p5.imageMode(this.p5.CENTER)
        this.p5.strokeWeight(5)
        this.p5.stroke(0)
        this.p5.frameRate(30)
    }

    loadImages() {
        this.stationaryImage = this.p5.loadImage("./assets/images/canoe/canoe-stationary.png");
        this.leftDipImage = this.p5.loadImage("./assets/images/canoe/canoe-left-dip.png");
        this.rightDipImage = this.p5.loadImage("./assets/images/canoe/canoe-right-dip.png");
        this.rockImage = this.p5.loadImage("./assets/images/river/rocks.png");
    }

    loadFonts() {
        this.numFont = this.p5.loadFont('./assets/fonts/Poppins-Medium.ttf')
    }

    selectDomElements() {
        this.timerDisplay =
            document.getElementById("time")
    }

    render() {
        this.p5.background(119, 211, 119)
        this.drawRiver()
        this.drawNumbers()
        this.drawCanoe()
        // this.drawRocks()
        this.updateTimer()
    }

    drawRiver() {    

        this.p5.push()

            this.p5.noFill()
            this.p5.strokeWeight(Constants.sandBankWidth)
            this.p5.stroke(194, 178, 128)

            this.p5.beginShape()

                for (const point of this.model.river.leftBankSand) {
                    this.p5.curveVertex(point.x, point.y)
                }

            this.p5.endShape()

            this.p5.beginShape()

                for (const point of this.model.river.rightBankSand) {
                    this.p5.curveVertex(point.x, point.y)
                }

            this.p5.endShape()

            this.p5.strokeWeight(Constants.riverWidth)
            this.p5.stroke(31, 206, 150)
            
            this.p5.beginShape()

                for (const point of this.model.river.centerCoordinates) {
                    this.p5.curveVertex(point.x, point.y)
                }

            this.p5.endShape()

        this.p5.pop()

    }

    drawCanoe() {
        let currentImage
        if (this.model.canoe.leftPaddle) currentImage = this.leftDipImage
        else if (this.model.canoe.rightPaddle) currentImage = this.rightDipImage;
        else currentImage = this.stationaryImage;
       
        this.p5.push()
            this.p5.translate(innerWidth / 2, this.model.canoe.position.y);
            this.p5.rotate(this.model.canoe.rotationRadians - Math.PI / 2);
            this.p5.image(currentImage, 0, 0, Constants.canoeSize, Constants.canoeSize);
        this.p5.pop()
    }

    drawRocks() {
        for (const rock of this.model.rockManager.rocks) {
            this.p5.image(this.rockImage, rock.position.x, rock.position.y, Constants.rockWidthAndHeight, Constants.rockWidthAndHeight)
        }
    }

    drawNumbers() {
        this.p5.push() 
            this.p5.textAlign(this.p5.CENTER, this.p5.CENTER)
            this.p5.textSize(40)
            this.p5.textFont(this.numFont)
            for (const number of this.model.numberGenerator.riverNumbers) {
                this.p5.strokeWeight(5)
                this.p5.stroke('gold')
                this.p5.ellipse(number.position.x, number.position.y, Constants.numberCircleSize)
                this.p5.strokeWeight(0)
                this.p5.stroke(0)
                this.p5.text(number.num, number.position.x, number.position.y - 6)
            }
        this.p5.pop()
    }

    updateTimer() {
        const seconds = Math.floor(this.model.timer.getCurrentMillis() / 1000)
        const minutes = Math.floor(seconds / 60)
        const displaySeconds = seconds % 60
        const leadingZero = displaySeconds < 10 ? "0" : ""
        const timeText = minutes + ":" + leadingZero + displaySeconds
        this.timerDisplay.innerHTML = timeText
    }

}

export { View }