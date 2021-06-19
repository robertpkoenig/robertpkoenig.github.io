class SoundPlayer {

    success: HTMLAudioElement
    failure: HTMLAudioElement

    constructor() {
        this.success = new Audio("./assets/sounds/success.wav")
        this.failure = new Audio("./assets/sounds/failure.wav")
    }

    playSuccess() {
        this.success.pause()
        this.success.play()
    }

    playFailure() {
        this.failure.pause()
        this.failure.play()
    }

}

export default SoundPlayer