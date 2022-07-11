
// Loads and plays mp3 files. Sounds are mapped to text titles in a dictionary.

const sounds = {}

function loadSounds() {
    sounds.kick = new Sound('./sounds/percussion/kick.mp3')
    sounds.snare = new Sound('./sounds/percussion/snare2.mp3')
    sounds.hat = new Sound('./sounds/percussion/hat.mp3')
    sounds.snap = new Sound('./sounds/percussion/snap.mp3')
    sounds.clave = new Sound('./sounds/percussion/clave.mp3')
    sounds.cymbal = new Sound('./sounds/percussion/cymbal.mp3')
    sounds.tom1 = new Sound('./sounds/percussion/tom1.mp3')
    sounds.tom2 = new Sound('./sounds/percussion/tom2.mp3')

    // Guitar
    sounds.pluck1 = new Sound('./sounds/guitar/pluck1.mp3')
    sounds.pluck2 = new Sound('./sounds/guitar/pluck2.mp3')
    sounds.pluck3 = new Sound('./sounds/guitar/pluck3.mp3')
    sounds.slide1 = new Sound('./sounds/guitar/slide1.mp3')
    sounds.slide2 = new Sound('./sounds/guitar/slide2.mp3')
    sounds.slide3 = new Sound('./sounds/guitar/slide3.mp3')

    // Keyboard
    sounds.chord1 = new Sound('./sounds/keyboard/chord1.mp3')
    sounds.chord2 = new Sound('./sounds/keyboard/chord2.mp3')
    sounds.chord3 = new Sound('./sounds/keyboard/chord3.mp3')

    // Vocal
    sounds.ugh = new Sound('./sounds/vocal/ugh.mp3')
    sounds.yeah = new Sound('./sounds/vocal/yeah.mp3')
    sounds.agh = new Sound('./sounds/vocal/agh.mp3')
    sounds.holdup = new Sound('./sounds/vocal/holdup.mp3')
    sounds.damn = new Sound('./sounds/vocal/damn.mp3')
    sounds.horn = new Sound('./sounds/vocal/airhorn.mp3')

    sounds.metronome = new Sound('./sounds/metronome.mp3')
}

function playSound(name) {
    sounds[name].play()
}
