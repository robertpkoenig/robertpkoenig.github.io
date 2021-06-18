window.samplePlayer = new SamplePlayer()
window.clock = new Clock()
window.song = new Song()
window.visualizer = new Visualizer()
window.player = new Player(window.clock, window.song, window.samplePlayer)
window.recorder = new Recorder(window.clock, window.song)
window.metronome = new Metronome()

let lightVector
let zoomOut = false

// Called by P5 on page load
function setup() {

    // Create the canvas and attach to div
    const canvas = createCanvas(windowWidth - 350, windowHeight, WEBGL)
    canvas.parent('canvas')

    // P5 parameters
    frameRate(32)
    noStroke()

    window.samplePlayer.loadSounds()
    window.samplePlayer.createSoundsMap()

    // This will adjust the camera angle if the screen is too small to accomodate the whole screen
    if (windowHeight < 900) zoomOut = true
    lightVector = createVector(-1, 0.75, 0.5)

    // Hide loading screen and show main app
    select('#loading_screen').style('display', 'none')
    select('body').class('grid')
    select('#app').style('visibility', 'visible')
}

// Called by P5 in each animation frame
function draw() {

    // Control WebGL environment
    if (zoomOut) translate(0, 0, -100)
    directionalLight(100, 100, 100, lightVector) 
    ambientLight(100)

    // Clear the canvas
    background(255)

    if (window.clock.currentFrame.count == 0) { window.recorder.setAllHitsToPlayable() }
    if (window.metronome.on) window.metronome.playClick()

    window.visualizer.visualize()
    window.player.playAllSamplesAtCurrentClockIndex()
    window.clock.incrementTime()

}

// Resizes the P5 anvas whenever window is resized
function windowResized() {
    resizeCanvas(windowWidth - 350, windowHeight)
}
