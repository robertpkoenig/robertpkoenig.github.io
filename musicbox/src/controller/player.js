
// Plays the hits in the song at the current frame

function playAllSamplesAtCurrentClockIndex() {

    const slotIndex = currentFrame.count
    const samplesInSlot = window.song.hits[slotIndex]

    for (let i = 0 ; i < samplesInSlot.length ; i++) {
        const hit = samplesInSlot[i]
        if (hit.playable == true) playSound(hit.sound)
    }

}