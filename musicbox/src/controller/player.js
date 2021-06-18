
// Plays the hits in the song at the current frame
class Player {

    playAllSamplesAtCurrentClockIndex() {

        const slotIndex = window.clock.currentFrame.count
        const samplesInSlot = window.song.hits[slotIndex]

        for (let i = 0 ; i < samplesInSlot.length ; i++) {
            const hit = samplesInSlot[i]
            if (hit.playable == true) window.samplePlayer.playSound(hit.sound)
        }

    }

}