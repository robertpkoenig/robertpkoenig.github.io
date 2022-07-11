
// Each 'hit slot' in the song maps to a frame in the animation. This clock keeps track of
// which frame the animation is currently on, and what the number of the most recent quarter
// note was. Tracking quarter notes is part of feature that remains under development.

const currentFrame = new WrapAroundCounter(NUM_FRAMES_IN_SONG)
const quarterNoteIndex = new WrapAroundCounter(BEATS_IN_BAR * BARS_PER_SONG)

function incrementTime() {

    if (currentFrame.count % FRAMES_PER_BEAT == 0) {
        quarterNoteIndex.incrementAndWrap()
    }

    currentFrame.incrementAndWrap()
    
}
