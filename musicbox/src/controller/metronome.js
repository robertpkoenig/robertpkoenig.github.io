
// Simply plays a metronome sound at each quarter note
function playClick() {
    if (window.clock.currentFrame.count % Constants.framesPerBeat == 0) window.samplePlayer.playSound('metronome')
}