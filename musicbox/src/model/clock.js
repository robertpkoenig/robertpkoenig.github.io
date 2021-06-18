
// Each 'hit slot' in the song maps to a frame in the animation. This clock keeps track of
// which frame the animation is currently on, and what the number of the most recent quarter
// note was. Tracking quarter notes is part of feature that remains under development.

class Clock {

    currentFrame
    quarterNoteIndex

    constructor() {
        this.currentFrame = new WrapAroundCounter(Constants.numFramesInSong)
        this.quarterNoteIndex = new WrapAroundCounter(Constants.BEATS_IN_BAR * Constants.barsPerSong)
    }

    incrementTime() {

        if (this.currentFrame.count % Constants.framesPerBeat == 0) {
            this.quarterNoteIndex.incrementAndWrap()
        }

        this.currentFrame.incrementAndWrap()
        
    }

}