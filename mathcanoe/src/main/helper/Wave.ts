import P5 from "p5"

class Wave {

    amplitude: number
    period: number
    phase: number

    constructor(amplitude: number, period: number, phase: number) {

        this.amplitude = amplitude
        this.period = period
        this.phase = phase

    }

    getX(y: number) {        
        return Math.sin(this.phase + Math.PI * 2 * y / this.period) * this.amplitude
    }

}

export { Wave }