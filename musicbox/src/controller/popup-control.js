function hidePopup() {
    document.getElementById("video-popup").style.visibility = "hidden"
    pauseVideo()
}

function showPopup() {
    document.getElementById("video-popup").style.visibility = "visible"
}

function pauseVideo() {
    document.getElementById('video-window.player').contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
}