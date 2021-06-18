import { Constants }from "../../Constants";
import { Canoe } from "../classes/Canoe";
import { RiverNumber } from "../classes/RiverNumber";
import { River } from "../classes/River";
import { EquationGenerator } from "./EquationGenerator";

class NumberGenerator {

    river: River
    canoe: Canoe
    equationGenerator: EquationGenerator
    countDown: number
    riverNumbers: RiverNumber[]

    constructor(equationGenerator: EquationGenerator, river: River, canoe: Canoe) {
        this.equationGenerator = equationGenerator
        this.river = river
        this.canoe = canoe
        this.riverNumbers = []
    }

    generateNumberAtRandomInterval() {
        
        if (this.countDown > 0) {
            this.countDown--
            return
        }

        this.riverNumbers.push(this.generateRiverNumber())

        this.countDown = (Math.random() * 30) + 30

        this.removeNumbersBelowScreen()
    }

    generateRiverNumber(): RiverNumber {
        // Create boolean to give correct number once every four numbers
        const number = this.generateNumber()
        const riverHead = this.river.centerCoordinates.head.value
        const y = riverHead.y
        const placementLatitude = Constants.riverWidth - Constants.numberCircleSize / 2
        const xOffset = (Math.random() * placementLatitude) - placementLatitude / 2
        const x = riverHead.x + xOffset 
        return new RiverNumber(x, y, number)
    }

    generateNumber(): number {
        const giveCorrectNumber = Math.random() < Constants.proportionOfCorrectNumbers

        let number

        if (giveCorrectNumber) {
            number = this.equationGenerator.currentEquation.answer
        }
        else {
            const offset = Math.random() * Constants.randomRange - Constants.randomRange / 2
            number = Math.abs(Math.round(this.equationGenerator.currentEquation.answer + offset))
        }

        return number
    }

    removeNumbersBelowScreen() {
        if (this.riverNumbers.length == 0) return
        const oldestNumber = this.riverNumbers[this.riverNumbers.length - 1]
        if (oldestNumber.position.y > window.innerHeight + Constants.rockWidthAndHeight) {
            this.riverNumbers.pop()
        }
    }

    applyPhysics() {
        for (const number of this.riverNumbers) {
            number.position.x -= this.canoe.velocity.x
            number.position.y += this.canoe.velocity.y
        }
    }

    removeNumber(number: RiverNumber) {
        const index = this.riverNumbers.indexOf(number)
        this.riverNumbers.splice(index, 1)
    }

    replaceExistingNumbers() {
        for (const riverNumber of this.riverNumbers) {
            riverNumber.num = this.generateNumber()
        }
    }

}

export { NumberGenerator }