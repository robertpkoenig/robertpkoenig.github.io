import p5 from "p5"
import { Constants } from "../../Constants"
import { Model } from "../Model"

class Timer {

    startTimeMillis: number
    p5: p5
    model: Model

    constructor(p5: p5, model: Model) {
        this.p5 = p5
        this.model = model
    }

    start() {
        this.startTimeMillis = this.p5.millis()
    }

    getCurrentMillis(): number {
        if (!this.model.started) return 0
        return this.p5.millis() - this.startTimeMillis
    }

}

export { Timer }