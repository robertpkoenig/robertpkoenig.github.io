
// Loads and plays mp3 files. Sounds are mapped to text titles in a dictionary.
class SamplePlayer {

    sounds

    // These can not be called from the constructor static context
    loadSounds() {
        this.kick = new Sound('./sounds/percussion/kick.mp3')
        this.snare = new Sound('./sounds/percussion/snare2.mp3')
        this.hat = new Sound('./sounds/percussion/hat.mp3')
        this.snap = new Sound('./sounds/percussion/snap.mp3')
        this.clave = new Sound('./sounds/percussion/clave.mp3')
        this.cymbal = new Sound('./sounds/percussion/cymbal.mp3')
        this.tom1 = new Sound('./sounds/percussion/tom1.mp3')
        this.tom2 = new Sound('./sounds/percussion/tom2.mp3')

        // Guitar
        this.pluck1 = new Sound('./sounds/guitar/pluck1.mp3')
        this.pluck2 = new Sound('./sounds/guitar/pluck2.mp3')
        this.pluck3 = new Sound('./sounds/guitar/pluck3.mp3')
        this.slide1 = new Sound('./sounds/guitar/slide1.mp3')
        this.slide2 = new Sound('./sounds/guitar/slide2.mp3')
        this.slide3 = new Sound('./sounds/guitar/slide3.mp3')

        // Keyboard
        this.chord1 = new Sound('./sounds/keyboard/chord1.mp3')
        this.chord2 = new Sound('./sounds/keyboard/chord2.mp3')
        this.chord3 = new Sound('./sounds/keyboard/chord3.mp3')

        // Vocal
        this.ugh = new Sound('./sounds/vocal/ugh.mp3')
        this.yeah = new Sound('./sounds/vocal/yeah.mp3')
        this.agh = new Sound('./sounds/vocal/agh.mp3')
        this.holdup = new Sound('./sounds/vocal/holdup.mp3')
        this.damn = new Sound('./sounds/vocal/damn.mp3')
        this.horn = new Sound('./sounds/vocal/airhorn.mp3')

        this.metronome = new Sound('./sounds/metronome.mp3')
    }

    createSoundsMap() {

        this.sounds = {
            // Percussion
            kick: this.kick,
            snare: this.snare,
            hat: this.hat,
            snap: this.snap,
            clave: this.clave,
            cymbal: this.cymbal,
            tom1: this.tom1,
            tom2: this.tom2,

            // Guitar
            pluck1: this.pluck1,
            pluck2: this.pluck2, 
            pluck3: this.pluck3,
            slide1: this.slide1,
            slide2: this.slide2,
            slide3: this.slide3,

            // Keyboard
            chord1: this.chord1,
            chord2: this.chord2,
            chord3: this.chord3,

            // Vocal
            ugh: this.ugh,
            yeah: this.yeah,
            agh: this.agh,
            holdup: this.holdup,
            damn: this.damn,
            horn: this.horn,

            metronome: this.metronome,
        }
        
    }

    playSound(name) {
        this.sounds[name].play()
    }

}