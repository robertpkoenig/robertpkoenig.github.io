class Constants {

    static BEATS_IN_BAR = 4 // beat means quarter note
    static barsPerSong = 4
    static possibleHitsPerBeat = 4 // 16th note quantizing (there are 4 16th notes per beat)
    static beatsPerMinute = 120 // so 2 quarter notes per second, or 8 16th notes per second)
    static beatsPerSecond = Constants.beatsPerMinute / 60
    static framesPerBeat = 16
    static framesPerHit = Constants.framesPerBeat / Constants.possibleHitsPerBeat
    static framesPerSecond = Constants.framesPerBeat * Constants.beatsPerSecond
    static numFramesInSong = Constants.barsPerSong * Constants.BEATS_IN_BAR * Constants.framesPerBeat
    static maxNumHitsPerTrack = Constants.barsPerSong * Constants.BEATS_IN_BAR * Constants.possibleHitsPerBeat
    static radius = 100
    static ballRadius = 20
    static amplitude = 10
    static period = 200
    static canvasWidthAndHeight = window.innerHeight * 0.9
    static canvasCenterX = Constants.canvasWidthAndHeight / 2
    static canvasCenterY = Constants.canvasWidthAndHeight / 2

}