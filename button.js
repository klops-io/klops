const carbonIntensityFactor = {
    'europeanUnion': 276,
    'france': 34.8,
    'unitedStates': 493,
    'china': 681,
    'other': 519};
    
const kWhPerByteDataCenter = 0.000000000072;
const kWhPerByteNetwork = 0.000000000152;
const kWhPerMinuteDevice = 0.00021;

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