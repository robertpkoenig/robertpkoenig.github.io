
// This class just keeps track of the score.
class PointsManager {

    score: number

    constructor() {
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