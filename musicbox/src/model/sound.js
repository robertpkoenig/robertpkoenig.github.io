// Wrapper class for an HTML audio element
// Subsequent research showed this could be replaced
// with the JS Audio class
class Sound {

    sound

    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.pause();
        this.sound.currentTime = 0
        this.sound.play()
    }

}