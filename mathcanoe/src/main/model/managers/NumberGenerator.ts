import Constants from "../../Constants";
import { Canoe } from "../classes/Canoe";
import { RiverNumber } from "../classes/RiverNumber";
import { River } from "../classes/River";
import { EquationGenerator } from "./EquationGenerator";

// This class generates the numbers that appear in the river.
// At semi-random intervals, it generates a number that is either
// the correct number, or a number that is close to the correct
// number within a defined range. It then adds that number to
// a list of numbers stored here, which is accessed by the view
// and the collision detector. The numbers are wrapped in a "RiverNumber"
// class which contains their coordinates and an object used in
// collision detection
class NumberManager {

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

    // This class decrements the a 'count down' variable. If the count
    // down gets to zero, this method generates a number and restarts 
    // the countdown
    generateNumberWhenCountdownFinishes() {

        if (this.countDown > 0) {
            this.countDown--
            return
        }

        this.riverNumbers.push(this.generateRiverNumber())

        this.countDown = (Math.random() * 30) + 30

        this.removeNumbersBelowScreen()

    }

    // Creates a new "RiverNumber" object by calling other methods within
    // this class
    generateRiverNumber(): RiverNumber {
        const number = this.generateNumber()
        const x = this.generateXPosition()
        const y = this.river.centerCoordinates.head.value.y
        return new RiverNumber(x, y, number)
    }

    // Generates a random X position that is within the river course
    generateXPosition(): number {
        const placementLatitude = Constants.RIVER_WIDTH - Constants.CIRCLE_SIZE / 2
        const xOffset = (Math.random() * placementLatitude) - placementLatitude / 2
        return this.river.centerCoordinates.head.value.x + xOffset 
    }

    // either generates the correct number of a number close to the correct
    // number given some probability
    generateNumber(): number {
        const giveCorrectNumber = Math.random() < Constants.PROPORTION_OF_CORRECT_NUMBERS

        let number

        if (giveCorrectNumber) {
            number = this.equationGenerator.currentEquation.answer
        }
        else {
            const offset = Math.random() * Constants.RANDOM_RANGE - Constants.RANDOM_RANGE / 2
            number = Math.abs(Math.round(this.equationGenerator.currentEquation.answer + offset))
        }

        return number
    }

    // removes the river numbers that have gone below the bounds of the screen
    removeNumbersBelowScreen() {
        if (this.riverNumbers.length == 0) return
        const oldestNumber = this.riverNumbers[this.riverNumbers.length - 1]
        if (oldestNumber.position.y > window.innerHeight + Constants.ROCK_W_H) {
            this.riverNumbers.pop()
        }
    }

    // moves the river numbers based on the movement of the canoe
    applyPhysics() {
        for (const number of this.riverNumbers) {
            number.position.x -= this.canoe.velocity.x
            number.position.y += this.canoe.velocity.y
        }
    }

    // removes a river number from the list of river numbers
    removeNumber(number: RiverNumber) {
        const index = this.riverNumbers.indexOf(number)
        this.riverNumbers.splice(index, 1)
    }

    // when a player gets the right number, the numbers that are alread on
    // the screen are changed to reflect the new equation so that the player
    // does not need to wait too long for the fresh numbers to appearh in the river
    replaceExistingNumbers() {
        for (const riverNumber of this.riverNumbers) {
            riverNumber.num = this.generateNumber()
        }
    }

}

export { NumberManager }