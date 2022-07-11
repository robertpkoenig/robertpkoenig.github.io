
// Utilizes a P5 function for listening to key events 
function keyPressed() {

    switch (key) {
        // Percussion
        case " ":
            playSound('kick')
            addHitToSong('kick')
            break
        case "g":
            playSound('snare')
            addHitToSong('snare')
            break
        case "h":
            playSound('hat')
            addHitToSong('hat')
            break
        case "f":
            playSound('snap')
            addHitToSong('snap')
            break
        case "d":
            playSound('clave')
            addHitToSong('clave')
            break
        case "j":
            playSound('cymbal')
            addHitToSong('cymbal')
            break       
        case "s":
            playSound('tom1')
            addHitToSong('tom1')
            break
        case "a":
            playSound('tom2')
            addHitToSong('tom2')
            break

        // Guitar
        case "y":
            playSound('pluck1')
            addHitToSong('pluck1')
            break
        case "u":
            playSound('pluck2')
            addHitToSong('pluck2')
            break
        case "i":
            playSound('pluck3')
            addHitToSong('pluck3')
            break
        case "o":
            playSound('slide1')
            addHitToSong('slide1')
            break
        case "p":
            playSound('slide2')
            addHitToSong('slide2')
            break

        // Keyboard
        case "q":
            playSound('chord1')
            addHitToSong('chord1')
            break
        case "w":
            playSound('chord2')
            addHitToSong('chord2')
            break
        case "e":
            playSound('chord3')
            addHitToSong('chord3')
            break

        // Vocal
        case "z":
            playSound('ugh')
            addHitToSong('ugh')
            break
        case "x":
            playSound('yeah')
            addHitToSong('yeah')
            break
        case "c":
            playSound('agh')
            addHitToSong('agh')
            break
        case "v":
            playSound('holdup')
            addHitToSong('holdup')
            break
        case "b":
            playSound('damn')
            addHitToSong('damn')
            break
        case "n":
            playSound('horn')
            addHitToSong('horn')
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