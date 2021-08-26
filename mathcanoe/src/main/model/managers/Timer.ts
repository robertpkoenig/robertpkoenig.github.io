import p5 from "p5"
import { Model } from "../Model"

// Maintains the current time, and updates the timer DOM element
class Timer {

    startTimeMillis: number
    p5: p5
    model: Model
    timerHTMLElement: HTMLElement

    constructor(p5: p5, model: Model) {
        this.p5 = p5
        this.model = model
        this.timerHTMLElement = document.getElementById("time")
    }

    start() {
        this.startTimeMillis = this.p5.millis()
    }

    // Gets the milliseconds elapsed since the timer was started
    getCurrentMillis(): number {
        if (!this.model.started) return 0
        return this.p5.millis() - this.startTimeMillis
    }

    // Updates the timer DOM element
    updateTimer() {
        const seconds = Math.floor(this.getCurrentMillis() / 1000)
        const minutes = Math.floor(seconds / 60)
        const displaySeconds = seconds % 60
        const leadingZero = displaySeconds < 10 ? "0" : ""
        const timeText = minutes + ":" + leadingZero + displaySeconds
        this.timerHTMLElement.innerHTML = timeText
    }

}

export { Timer }