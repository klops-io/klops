    const carbonIntensityFactor = {
    'europeanUnion': 276,
    'france': 34.8,
    'unitedStates': 493,
    'china': 681,
    'other': 519};
    

    const defaultCarbonIntensityFactorIngCO2PerKWh = 519;
    const kWhPerByteDataCenter = 0.000000000072;
    const kWhPerByteNetwork = 0.000000000152;
    const kWhPerMinuteDevice = 0.00021;
    
    let duration = localStorage.getItem('duration');
    duration = null === duration ? 0 : duration;
    
    const kWhDataCenterTotal = stats.total * kWhPerByteDataCenter;
    const GESDataCenterTotal = kWhDataCenterTotal * defaultCarbonIntensityFactorIngCO2PerKWh;
    
    const kWhNetworkTotal = stats.total * kWhPerByteNetwork;
    const GESNetworkTotal = kWhNetworkTotal * defaultCarbonIntensityFactorIngCO2PerKWh;
    
    const kWhDeviceTotal = duration * kWhPerMinuteDevice;
    const GESDeviceTotal = kWhDeviceTotal * carbonIntensityFactorIngCO2PerKWh[userLocation];
    
    const kWhTotal = Math.round(1000 * (kWhDataCenterTotal + kWhNetworkTotal + kWhDeviceTotal)) / 1000;
    const gCO2Total = Math.round(GESDataCenterTotal + GESNetworkTotal + GESDeviceTotal);
    
    const kmByCar = Math.round(1000 * gCO2Total / GESgCO2ForOneKmByCar) / 1000;
    const chargedSmartphones = Math.round(gCO2Total / GESgCO2ForOneChargedSmartphone);
    
    gCO2Total 
    chrome.runtime()