import p5 from "p5"
import { Constants } from "../../Constants"

class Timer {

    startTimeMillis: number
    ongoing: boolean
    p5: p5

    constructor(p5: p5) {
        this.ongoing = false
        this.p5 = p5
    }

    start() {
        this.startTimeMillis = this.p5.millis()
        this.ongoing = true
    }

    getCurrentMillis(): number {
        if (!this.ongoing) return Constants.maxMillis
        return Constants.maxMillis - (this.p5.millis() - this.startTimeMillis)
    }

}

export { Timer }