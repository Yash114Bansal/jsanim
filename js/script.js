const allnotes = document.querySelectorAll(".note");

// Add mappings to audio Files

allnotes.forEach(key => {
    const note = new Audio(`./notes/${key.getAttribute('note')}.mp3`);
    key.addEventListener("click", () => {
        note.play();
    });
    note.play();
});


// Adding Recording Options
let recording = [];
let startTime;

// Get all the piano keys and buttons
const pianoKeys = document.querySelectorAll('.white-note-area, .black-note-area');
const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');

// Function to handle key press event
function handleKeyPress(event) {
    const key = event.target.getAttribute('note');
    const currentTime = Date.now() - startTime;

    recording.push({ key, time: currentTime });

    // console.log(`Key: ${key}, Time: ${currentTime}ms`);
}

// Function to start recording
function startRecording() {
    recording = [];
    startTime = Date.now();

    pianoKeys.forEach(key => {
        key.addEventListener('mousedown', handleKeyPress);
    });

    startButton.disabled = true;
    stopButton.disabled = false;
}

// Function to stop recording
function stopRecording() {
    pianoKeys.forEach(key => {
        key.removeEventListener('mousedown', handleKeyPress);
    });

    startButton.disabled = false;
    stopButton.disabled = true;

    // Print the recorded data to the console
    console.log("Recording Data:", recording);
}

// Add click event listeners to the buttons
startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);


// Function to move the red box
function moveBox(note) {
    console.log("Called");
    console.log(note);
    const Note = document.querySelector(`.note${note}`);
    const redBox = document.createElement('div');
    redBox.innerHTML = note;
    redBox.className = 'red-box';
    Note.appendChild(redBox); // Append to the first white-note-area

    setTimeout(() => {
        redBox.classList.add('active'); // Trigger the animation
    }, 100);
}
// moveRedBox(".noteC6")

function playNotesWithDelay() {
    let index = 0;

    function playNextNote() {
        if (index < recording.length) {
            const note = recording[index];
            moveBox(note.key);
            index++;

            if (index < recording.length) {
                const nextNote = recording[index];
                // debugger;
                console.log(recording[index]);
                const delay = nextNote.time - note.time;
                console.log(delay);
                setTimeout(playNextNote, delay);
            }
        }
    }

    // Start playing notes with the first one
    playNextNote();
}

document.getElementById("play").addEventListener("click",playNotesWithDelay)
