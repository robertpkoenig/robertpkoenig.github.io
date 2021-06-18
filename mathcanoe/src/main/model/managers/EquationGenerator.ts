import { Equation } from "../classes/Equation";

const divisonPairs = [
    [6, 3],
    [9, 3],
    [12, 3],
    [15, 3],
    [4, 2],
    [6, 2],
    [8, 2],
    [10, 2],
    [12, 2],
    [8, 4],
    [12, 4],
    [16, 4],
    [20, 4],
    [10, 5],
    [15, 5],
    [20, 5],
    [12, 6],
    [18, 6],
    [14, 7],
    [21, 7],
    [16, 8],
    [18, 9],
]

class EquationGenerator {

    currentEquation: Equation
   
    generateAndSetEquation() {
        const randomIndex = Math.round(Math.random() * 2)
        switch (randomIndex) {
            case 0:
                this.currentEquation = this.generateAdditionEquation()
                break
            case 1:
                this.currentEquation = this.generateMultiplicationEquation()
                break
            case 2:
                this.currentEquation = this.generateDivisionEquation()
                break
            default:
                break
        }
        document.getElementById("equation").innerHTML =
        this.currentEquation.text
    }

    private generateAdditionEquation(): Equation {
        // Generate random numbers between one and 20
        const numOne = Math.round(Math.random() * 20) + 1
        const numTwo = Math.round(Math.random() * 20) + 1
        const answer = numOne + numTwo

        const text = numOne + " + " + numTwo + " = ?"

        return new Equation(text, answer)
    }

    private generateMultiplicationEquation(): Equation {
        // Generate random numbers between one and 20
        const numOne = Math.round(Math.random() * 9) + 1
        const numTwo = Math.round(Math.random() * 9) + 1
        const answer = numOne * numTwo

        const text = numOne + " x " + numTwo + " = ?"

        return new Equation(text, answer)
    }

    private generateDivisionEquation(): Equation {
        // Generate random numbers between one and 20
        const randomIndex = Math.round(Math.random() * (divisonPairs.length - 1))
        const divisionPair = divisonPairs[randomIndex]
        const numOne = divisionPair[0] 
        const numTwo = divisionPair[1] 
        const answer = numOne / numTwo

        const text = numOne + " / " + numTwo + " = ?"

        return new Equation(text, answer)
    }


}

export { EquationGenerator }
