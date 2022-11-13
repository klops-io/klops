const start_button = document.querySelector('#start');
const stop_button = document.querySelector('#stop');

const startButton = () => {
    start_button.disabled = true;
    stop_button.disabled = false;
};

const stopButton = () => {
    start_button.disabled = false;
    stop_button.disabled = true;
};

stop_button.disabled = true;

start_button.addEventListener('click', startButton);
stop_button.addEventListener('click', stopButton)