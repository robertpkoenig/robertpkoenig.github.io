function loadExample(number) {
    const fileName = "./examples/" + number + ".json"
    fetch(fileName)
    .then(response => response.json())
    .then(json => loadSong(json))
    window.clock.currentFrame.count = 0
}

function loadSong(loadedSong) {
    for (let i = 0; i < loadedSong.hits.length; i++) {
        window.song.hits[i] = loadedSong.hits[i] 
    }
}