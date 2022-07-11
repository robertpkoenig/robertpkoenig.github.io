
// Each 'hit slot' in the song maps to a frame in the animation. This clock keeps track of
// which frame the animation is currently on, and what the number of the most recent quarter
// note was. Tracking quarter notes is part of feature that remains under development.

const currentFrame = new WrapAroundCounter(Constants.numFramesInSong)
const quarterNoteIndex = new WrapAroundCounter(Constants.BEATS_IN_BAR * Constants.barsPerSong)

function incrementTime() {

    if (currentFrame.count % Constants.framesPerBeat == 0) {
        quarterNoteIndex.incrementAndWrap()
    }

    currentFrame.incrementAndWrap()
    
}
