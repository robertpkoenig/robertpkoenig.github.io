
// Adds hits to a song. The main purpose of this class was to enable quantizing,
// but quantizing was abandoned after several tricky bugs arose.

const newHits = []

function addHitToSong(name) {
    // get the slot that is the closest to this frame
    // instead using modulo
    // if the modulo value is zero or one, using the current 16th note, if it is 2 or 3, using the one higher
    // let index = Math.round(map(window.clock.currentFrame.count, 0, NUM_FRAMES_IN_SONG - 1,
    //                     0, MAX_NUM_HITS_PER_TRACK - 1))
    // let index = window.clock.sixteenthNoteIndex.count
    // // move to the higher 16th note index if the frame count is closer to that higher one
    // // if (window.clock.currentFrame.count % FRAMES_PER_HIT > 1) index++
    // console.log("**HIT** quarter note: " + window.clock.quarterNoteIndex.count + 
    //             " sixteenthNote: " + window.clock.sixteenthNoteIndex.count +
    //             " slot index: " + index);
    const frame = currentFrame.count
    const newHit = new Hit(name, frame)
    const indexInFrame = window.song.hits[frame].length
    window.song.hits[frame].push(newHit)
    window.song.undoStack.unshift(frame)
    newHits.push(newHit)
}

function setAllHitsToPlayable() {
    for (const hit of newHits) {
        hit.playable = true
    }
    newHits.length = 0
}