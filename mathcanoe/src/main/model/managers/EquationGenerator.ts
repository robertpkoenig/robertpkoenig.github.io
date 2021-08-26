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

enum Operation {
    ADD,
    SUBTRACTION,
    MULTIPLY,
    DIVIDE
}

// Generates equations that are displayed at the bottom of the screen.
// An operation is randomly selected, and an equation that uses that
// operation is randomly generated. 
class EquationGenerator {

    currentEquation: Equation
   
    // Selects an operation, calls another method to randomly generate an equation
    // using that method
    generateAndSetEquation() {

        const randomOperation = this.getRandomOperation()

        switch (randomOperation) {
            case Operation.ADD:
                this.currentEquation = this.generateAdditionEquation()
                break
            case Operation.SUBTRACTION:
                this.currentEquation = this.generateSubtractionEquation()
                break
            case Operation.MULTIPLY:
                this.currentEquation = this.generateMultiplicationEquation()
                break
            case Operation.DIVIDE:
                this.currentEquation = this.generateDivisionEquation()
                break
            default:
                break
        }

        this.updateDomEquationDisplay()

    }

    // Selects a random operation from the enum of operations
    private getRandomOperation(): Operation {
        return Math.floor(Math.random() * Object.keys(Operation).length)
    }

    // Updates the html element which displays the equation
    private updateDomEquationDisplay() {
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

    private generateSubtractionEquation(): Equation {
        // Generate random numbers between one and 20
        const numOne = Math.round(Math.random() * 20) + 1
        const numTwo = Math.round(Math.random() * numOne)
        const answer = numOne - numTwo

        const text = numOne + " - " + numTwo + " = ?"

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
