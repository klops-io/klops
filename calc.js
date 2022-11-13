$(document).mousemove(function(e){
    $("#image").stop().animate({left:e.pageX, top:e.pageY});
});


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

const defaultLocation = 'Other';
let userLocation = defaultLocation;

let duration = 0;
let total = 0;

calculateCarbonFootprint = () =>{
    let duration = localStorage.getItem('duration');
    duration = null === duration ? 0 : duration;

    const kWhDataCenterTotal = duration * kWhPerByteDataCenter;
    const GESDataCenterTotal = kWhDataCenterTotal * defaultCarbonIntensityFactorIngCO2PerKWh;

    const kWhNetworkTotal = duration * kWhPerByteNetwork;
    const GESNetworkTotal = kWhNetworkTotal * defaultCarbonIntensityFactorIngCO2PerKWh;

    const kWhDeviceTotal = duration * kWhPerMinuteDevice;
    const GESDeviceTotal = kWhDeviceTotal * carbonIntensityFactorIngCO2PerKWh[userLocation];

    const kWhTotal = Math.round(1000 * (kWhDataCenterTotal + kWhNetworkTotal + kWhDeviceTotal)) / 1000;
    const gCO2Total = Math.round(GESDataCenterTotal + GESNetworkTotal + GESDeviceTotal);

    document.getElementById('duration').textContent = duration.toString();
}

toMegaByte = (value) => (Math.round(value/1024/1024));

const start_button = document.querySelector('#start');
const stop_button = document.querySelector('#stop');
const calc = document.createTextNode("Calculating...");
const node = document.getElementById("current");
let dur = document.createTextNode(localStorage.getItem('duration'));
node.style.fontSize = "24px";
let started = 0;

let loc = "Other";

const eu = document.querySelector('#eu');
const fr = document.querySelector('#fr');
const us = document.querySelector('#us');
const china = document.querySelector('#china');
const other = document.querySelector('#other');

const euButton = () => {
    eu.disabled = true;
    fr.disabled = false;
    us.disabled = false;
    china.disabled = false;
    other.disabled = false;
    selectedRegion = "EU";
    localStorage.setItem('selectedRegion', selectedRegion);
    userLocation = selectedRegion;
    calculateCarbonFootprint();
};

const frButton = () => {
    eu.disabled = false;
    fr.disabled = true;
    us.disabled = false;
    china.disabled = false;
    other.disabled = false;
    selectedRegion = "France";
    localStorage.setItem('selectedRegion', selectedRegion);
    userLocation = selectedRegion;
    calculateCarbonFootprint();
};

const usButton = () => {
    eu.disabled = false;
    fr.disabled = false;
    us.disabled = true;
    china.disabled = false;
    other.disabled = false;
    selectedRegion = "USA";
    localStorage.setItem('selectedRegion', selectedRegion);
    userLocation = selectedRegion;
    calculateCarbonFootprint();
};

const chinaButton = () => {
    eu.disabled = false;
    fr.disabled = false;
    us.disabled = false;
    china.disabled = true;
    other.disabled = false;
    selectedRegion = "China";
    localStorage.setItem('selectedRegion', selectedRegion);
    userLocation = selectedRegion;
    calculateCarbonFootprint();
};

const otherButton = () => {
    eu.disabled = false;
    fr.disabled = false;
    us.disabled = false;
    china.disabled = false;
    other.disabled = true;
    selectedRegion = "Other";
    localStorage.setItem('selectedRegion', selectedRegion);
    userLocation = selectedRegion;
    calculateCarbonFootprint();
};
eu.addEventListener('click', euButton);
fr.addEventListener('click', frButton);
us.addEventListener('click', usButton);
china.addEventListener('click', chinaButton);
other.addEventListener('click', otherButton);


init = () => {
    const selectedRegion = localStorage.getItem('selectedRegion');
  
    if (null !== selectedRegion) {
      userLocation = loc;
      selectedRegion.value = loc;
    }

    calculateCarbonFootprint();
  
    if (null === localStorage.getItem('analysisStarted')) {
      return;
    }
}
  

starts = () => {
    chrome.runtime.sendMessage({ action: 'start' });
    start_button.disabled = true;
    stop_button.disabled = false;
    if (started != 0){
        node.removeChild(dur);
    }
    node.appendChild(calc);
    localStorage.setItem('analysisStarted', '1');
}
    
stops = () => {
    chrome.runtime.sendMessage({ action: 'stop' });
    start_button.disabled = false;
    stop_button.disabled = true;
    node.removeChild(calc);
    dur = document.createTextNode(localStorage.getItem('duration'));
    node.appendChild(dur);
    started = 1;
    localStorage.removeItem('analysisStarted');
    calculateCarbonFootprint();
}

stop_button.disabled = true;

start_button.addEventListener('click', starts);
stop_button.addEventListener('click', stops);

init();