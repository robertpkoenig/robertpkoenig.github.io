import { RiverNumber } from "../classes/RiverNumber";
import { EquationGenerator } from "./EquationGenerator";
import { NumberGenerator } from "./NumberGenerator";

class PointsManager {

    equationGenerator: EquationGenerator
    numberGenerator: NumberGenerator
    score: number

    constructor(equationGenerator: EquationGenerator, numberGenerator: NumberGenerator) {
        this.equationGenerator = equationGenerator
        this.numberGenerator = numberGenerator
        this.score = 0
    }
    
    incrementScore() {
        this.score++
    }

    decrementScore() {
        this.score--
    }

}

export { PointsManager }