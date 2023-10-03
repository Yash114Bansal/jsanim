const allnotes = document.querySelectorAll(".note");

// Add mappings to audio Files

allnotes.forEach(key => {
    key.addEventListener("click", () => {
        const note = new Audio(`./notes/${key.getAttribute('note')}.mp3`);
        note.play();
    });
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
    let key;

    if (event.type === 'mousedown') {

        key = event.target.getAttribute('note');
        if (!key) {
            return;
        }
    }
    else {
        const note_press = keyboardToNoteMap[event.key];
        if (note_press) {
            key = note_press;
        }
        else {
            return;
        }
    }
    console.log(key);
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
    document.addEventListener('keydown', handleKeyPress);

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
const play_button = document.getElementById("play");
function playNotesWithDelay() {
    // Firstly Stop Recording
    stopRecording();
    let index = 0;

    function playNextNote() {
        if (index < recording.length) {
            const note = recording[index];
            moveBox(note.key);
            index++;

            if (index < recording.length) {
                const nextNote = recording[index];
                const delay = nextNote.time - note.time;
                setTimeout(playNextNote, delay);
            } else {
                play_button.disabled = false;
            }
        }
    }

    play_button.disabled = true;

    playNextNote();
}
play_button.addEventListener("click", playNotesWithDelay)
const playy = document.getElementById("playy")
const learn = document.getElementById("learn")
const piano = document.querySelector(".piano");
const home = document.querySelector(".home");
const btn = document.querySelector(".btn");
playy.addEventListener("click", function (e) {
    home.classList.add("dissapear");
    piano.classList.remove("dissapear");
    btn.classList.remove("dissapear");
});

document.getElementById("contact").addEventListener("click", function(){
    window.open("mailto:yash114bansal@gmail.com",'_blank');
});

// function removeElementsOnSmallScreen() {
//     if (window.innerWidth < 650) {
//         var elementsToRemove = document.querySelectorAll('.white-note-area.noteC4, .white-note-area.noteD4, .white-note-area.noteE4, .white-note-area.noteF4, .white-note-area.noteG4, .white-note-area.noteA4, .white-note-area.noteB4');
//         elementsToRemove.forEach(function(element) {
//             element.remove();
//         });
//     }
// }

// // Call the function on page load and when the window is resized
// window.addEventListener('load', removeElementsOnSmallScreen);
// window.addEventListener('resize', removeElementsOnSmallScreen);