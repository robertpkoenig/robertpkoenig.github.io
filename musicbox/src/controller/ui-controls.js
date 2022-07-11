const metronomeOn = false

function toggleMetronome() {
    metronomeOn = !metronomeOn
    const metronomeState = document.getElementById('metronome-state')
    if (metronomeOn) {
        metronomeState.innerHTML = "On"
        metronomeState.style="color: blue"
    }
    else {
        metronomeState.innerHTML = "Off"
        metronomeState.classList.remove('on-text')
        metronomeState.style=""
    }
}


window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
    if(e.keyCode == 32 && e.target == document.getElementById('toggle')) {
        e.preventDefault();
    }
    if(e.keyCode == 32 && e.target == document.getElementById('undo')) {
        e.preventDefault();
    }
    if(e.keyCode == 32 && e.target == document.getElementById('restart')) {
        e.preventDefault();
    }
  });