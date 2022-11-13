const carbonIntensityFactorIngCO2PerKWh = {
    'EU': 276,
    'France': 34.8,
    'USA': 493,
    'China': 681,
    'Other': 519
};

const defaultCarbonIntensityFactorIngCO2PerKWh = 519;
const kWhPerByteDataCenter = 0.000000000072;
const kWhPerByteNetwork = 0.000000000152;
const kWhPerMinuteDevice = 0.00021;

let duration = 0;
let total = 0;

const kWhDataCenterTotal = total * kWhPerByteDataCenter;
const GESDataCenterTotal = kWhDataCenterTotal * defaultCarbonIntensityFactorIngCO2PerKWh;

const kWhNetworkTotal = total * kWhPerByteNetwork;
const GESNetworkTotal = kWhNetworkTotal * defaultCarbonIntensityFactorIngCO2PerKWh;

const kWhDeviceTotal = duration * kWhPerMinuteDevice;
const GESDeviceTotal = kWhDeviceTotal * carbonIntensityFactorIngCO2PerKWh[location];

const kWhTotal = Math.round(1000 * (kWhDataCenterTotal + kWhNetworkTotal + kWhDeviceTotal)) / 1000;
const gCO2Total = Math.round(GESDataCenterTotal + GESNetworkTotal + GESDeviceTotal);

toMegaByte = (value) => (Math.round(value/1024/1024));

const start_button = document.querySelector('#start');
const stop_button = document.querySelector('#stop');
const calc = document.createTextNode("Calculating...");
const node = document.getElementById("current");
node.style.fontSize = "24px";

starts = () => {
    chrome.runtime.sendMessage({ action: 'start' });
    start_button.disabled = true;
    stop_button.disabled = false;
    node.appendChild(calc);
    localStorage.setItem('analysisStarted', '1');
}
    
stops = () => {
    chrome.runtime.sendMessage({ action: 'stop' });
    start_button.disabled = false;
    stop_button.disabled = true;
    node.removeChild(calc);
    localStorage.removeItem('analysisStarted');
}

stop_button.disabled = true;

start_button.addEventListener('click', starts);
stop_button.addEventListener('click', stops);
