const field = document.getElementById('field');
const ball = document.getElementById('ball');

const ballSize = 100;

field.addEventListener('click', (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;

    let newX = clickX - ballSize / 2;
    let newY = clickY - ballSize / 2;

    const fieldWidth = field.offsetWidth;
    const fieldHeight = field.offsetHeight;

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX + ballSize > fieldWidth) newX = fieldWidth - ballSize;
    if (newY + ballSize > fieldHeight) newY = fieldHeight - ballSize;

    ball.style.left = `${newX}px`;
    ball.style.top = `${newY}px`;
});