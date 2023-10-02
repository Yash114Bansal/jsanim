const allnotes = document.querySelectorAll(".note");


allnotes.forEach(key => {
    key.addEventListener("click", () => {
        const note = new Audio(`./notes/${key.getAttribute('note')}.mp3`);
        note.play();
    });
});