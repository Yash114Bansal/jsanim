const keyboardToNoteMap = {
    'q': 'C4',
    '2': 'Db4',
    'w': 'D4',
    '3': 'Eb4',
    'e': 'E4',
    'r': 'F4',
    '4': 'Gb4',
    't': 'G4',
    '5': 'Ab4',
    'y': 'A4',
    '6': 'Bb4',
    'u': 'B4',
    'i': 'C5',
    '7': 'Db5',
    'o': 'D5',
    '8': 'Eb5',
    'p': 'E5',
    'a': 'F5',
    'z': 'Gb5',
    's': 'G5',
    'x': 'Ab5',
    'd': 'A5',
    'c': 'Bb5',
    'f': 'B5',
    'v': 'C6',
    'g': 'D6',
    'b': 'E6',
    'h': 'F6',
    'n': 'G6',
};

// Function to handle keydown event

function playNote(note) {

    const keyn = new Audio(`./notes/${note}.mp3`);
    keyn.play();
}

function handleKey(event) {
    const keyPressed = event.key;
    const musicNote = keyboardToNoteMap[keyPressed];
    if (musicNote) {
        playNote(musicNote);
        const box = document.querySelector(`.note${musicNote} > div`);
        setTimeout(() => {
            box.style.transform = 'translateY(15px)'; // Example transformation: move the box 100 pixels to the right
        }, 0); 
        setTimeout(() => {
            box.style.transform = 'translateY(0px)';
        }, 200);
    } 
}


// Add an event listener for the keydown event
document.addEventListener('keydown', handleKey);