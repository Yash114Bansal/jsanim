const canvas = document.getElementById("screensaver");
const ctx = canvas.getContext("2d");
const body = document.body;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const image = new Image();
image.src = "../images/music2.png";

const images = [];
const imageWidth = 105;
const imageHeight = 100;

images.push({
    x: (canvas.width - imageWidth) / 2,
    y: (canvas.height - imageHeight) / 2,
    dx: (Math.random() < 0.5 ? -1 : 1) * 3,
    dy: (Math.random() < 0.5 ? -1 : 1) * 3,
});

canvas.addEventListener("click", (e) => {
    if (images.length <=5) {
        
        const newImage = {
            x: e.clientX - imageWidth / 2,
            y: e.clientY - imageHeight / 2,
            dx: (Math.random() < 0.5 ? -1 : 1) * 3,
            dy: (Math.random() < 0.5 ? -1 : 1) * 3,
        };
        images.push(newImage);
    }
});
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const img of images) {
        img.x += img.dx;
        img.y += img.dy;

        // if (img.x < 0 || img.x + imageWidth > canvas.width) {
        //     img.dx *= -1;
        // }
        // if (img.y < 0 || img.y + imageHeight > canvas.height) {
        //     img.dy *= -1;
        // }
        if (img.x < 0) {
            img.dx *= -1;
            body.style.borderLeftColor = getRandomColor();

        }
        if (img.x + imageWidth > canvas.width) {
            img.dx *= -1;
            body.style.borderRightColor = getRandomColor();
        }
        if (img.y < 0) {
            img.dy *= -1;
            body.style.borderTopColor = getRandomColor();

        }
        if (img.y + imageHeight > canvas.height) {
            img.dy *= -1;
            body.style.borderBottomColor = getRandomColor();

        }

        ctx.drawImage(image, img.x, img.y, imageWidth, imageHeight);
    }
}

image.onload = () => {
    animate();
};