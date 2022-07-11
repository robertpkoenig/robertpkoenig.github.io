
// Simply plays a metronome sound at each quarter note
function playClick() {
    if (currentFrame.count % FRAMES_PER_BEAT == 0) playSound('metronome')
}