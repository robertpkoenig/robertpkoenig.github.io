
// Utilizes a P5 function for listening to key events 
function keyPressed() {

    switch (key) {
        // Percussion
        case " ":
            window.samplePlayer.playSound('kick')
            window.recorder.addHitToSong('kick')
            break
        case "g":
            window.samplePlayer.playSound('snare')
            window.recorder.addHitToSong('snare')
            break
        case "h":
            window.samplePlayer.playSound('hat')
            window.recorder.addHitToSong('hat')
            break
        case "f":
            window.samplePlayer.playSound('snap')
            window.recorder.addHitToSong('snap')
            break
        case "d":
            window.samplePlayer.playSound('clave')
            window.recorder.addHitToSong('clave')
            break
        case "j":
            window.samplePlayer.playSound('cymbal')
            window.recorder.addHitToSong('cymbal')
            break       
        case "s":
            window.samplePlayer.playSound('tom1')
            window.recorder.addHitToSong('tom1')
            break
        case "a":
            window.samplePlayer.playSound('tom2')
            window.recorder.addHitToSong('tom2')
            break

        // Guitar
        case "y":
            window.samplePlayer.playSound('pluck1')
            window.recorder.addHitToSong('pluck1')
            break
        case "u":
            window.samplePlayer.playSound('pluck2')
            window.recorder.addHitToSong('pluck2')
            break
        case "i":
            window.samplePlayer.playSound('pluck3')
            window.recorder.addHitToSong('pluck3')
            break
        case "o":
            window.samplePlayer.playSound('slide1')
            window.recorder.addHitToSong('slide1')
            break
        case "p":
            window.samplePlayer.playSound('slide2')
            window.recorder.addHitToSong('slide2')
            break

        // Keyboard
        case "q":
            window.samplePlayer.playSound('chord1')
            window.recorder.addHitToSong('chord1')
            break
        case "w":
            window.samplePlayer.playSound('chord2')
            window.recorder.addHitToSong('chord2')
            break
        case "e":
            window.samplePlayer.playSound('chord3')
            window.recorder.addHitToSong('chord3')
            break

        // Vocal
        case "z":
            window.samplePlayer.playSound('ugh')
            window.recorder.addHitToSong('ugh')
            break
        case "x":
            window.samplePlayer.playSound('yeah')
            window.recorder.addHitToSong('yeah')
            break
        case "c":
            window.samplePlayer.playSound('agh')
            window.recorder.addHitToSong('agh')
            break
        case "v":
            window.samplePlayer.playSound('holdup')
            window.recorder.addHitToSong('holdup')
            break
        case "b":
            window.samplePlayer.playSound('damn')
            window.recorder.addHitToSong('damn')
            break
        case "n":
            window.samplePlayer.playSound('horn')
            window.recorder.addHitToSong('horn')
            break

        case "-":
            toggleControls()
            break

        case "+":
            storeItem('hits', window.song.hits);
            break

        default:
            break
    }

}