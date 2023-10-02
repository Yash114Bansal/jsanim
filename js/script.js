const allnotes = document.querySelectorAll(".note");

// var note = new Audio("../notes/C4.mp3");

// allnotes.forEach(key=>{
//     console.log(key);
//     key.addEventListener("click",()=>{
//         note.src = `../notes/${key.note}.mp3`;
//         note.play();
//     })
// })

allnotes.forEach(key => {
    key.addEventListener("click", () => {
        const note = new Audio(`../notes/${key.getAttribute('note')}.mp3`);
        note.play();
    });
});