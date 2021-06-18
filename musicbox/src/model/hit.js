
// A Song contains 'hit slots' which can each contain a 'Hit'
// A Hit is esssentially a sound played in a specific time slot
class Hit {

    sound // name of the sound
    timeStamp // frame in which it occurs
    playable // the sound will only be played after first round

    constructor(sound, timeStamp) {
        this.sound = sound
        this.timeStamp = timeStamp
        this.playable = false
    }

}