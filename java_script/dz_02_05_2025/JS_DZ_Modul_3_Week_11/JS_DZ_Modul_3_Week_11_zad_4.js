const redLight = document.querySelector('.red');
const yellowLight = document.querySelector('.yellow');
const greenLight = document.querySelector('.green');
const changeButton = document.getElementById('change-light');

let currentState = 'red'; 


function resetLights() {
    redLight.classList.remove('active');
    yellowLight.classList.remove('active');
    greenLight.classList.remove('active');
}

changeButton.addEventListener('click', () => {

    resetLights();

    if (currentState === 'red') {
        yellowLight.classList.add('active');
        currentState = 'yellow';
    } else if (currentState === 'yellow') {
        greenLight.classList.add('active');
        currentState = 'green';
    } else if (currentState === 'green') {
        redLight.classList.add('active');
        currentState = 'red';
    }
});