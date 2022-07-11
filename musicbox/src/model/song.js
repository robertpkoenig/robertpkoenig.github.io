// A Song contains a list of tracks, which contain a collection of sample hits
// it also contains a stack of recently added sounds which can be undone

class Song {

    hits
    undoStack

    constructor() {
        this.hits = new Array(NUM_FRAMES_IN_SONG)
        for (let i = 0 ; i < NUM_FRAMES_IN_SONG ; i++) {
            this.hits[i] = []
        }
        this.undoStack = []
    }

    undo() {
        if (this.undoStack.length == 0) return
        const frame = this.undoStack.shift()
        this.hits[frame].pop()
    }

    reset() {
        for (let i = 0 ; i < this.hits.length ; i++) {
            this.hits[i] = []
        }
    }

}