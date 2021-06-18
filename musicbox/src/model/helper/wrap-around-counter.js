
// This class simply increments to a maximum, and then starts over from zero
class WrapAroundCounter {

    count
    max

    constructor(max) {
        this.count = 0
        this.max = max
    }

    incrementAndWrap() {
        this.count++
        if (this.count >= this.max) {
            this.count = 0
        }
    }

}