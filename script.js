/*
    https://github.com/carbonalyser/Carbonalyser
    Carboanalyser used is published under MIT License

    MIT License

    Copyright (c) 2019 Richard Hanna

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

$(document).mousemove(function(e){
    $("#image").stop().animate({left:e.pageX, top:e.pageY});
});

extractHostname = (url) => {
    let hostname = url.indexOf("//") > -1 ? url.split('/')[2] : url.split('/')[0];
  
    // find & remove port number
    hostname = hostname.split(':')[0];
    // find & remove "?"
    hostname = hostname.split('?')[0];
  
    return hostname;
};

setByteLengthPerOrigin = (origin, byteLength) => {
    const stats = localStorage.getItem('stats');
    const statsJson = null === stats ? {} : JSON.parse(stats);
  
    let bytePerOrigin = undefined === statsJson[origin] ? 0 : parseInt(statsJson[origin]);
    statsJson[origin] = bytePerOrigin + byteLength;
  
    localStorage.setItem('stats', JSON.stringify(statsJson));
};

headersReceivedListener = (requestDetails) => {
    if (isChrome()) {
       const origin = extractHostname(!requestDetails.initiator ? requestDetails.url : requestDetails.initiator);
       const responseHeadersContentLength = requestDetails.responseHeaders.find(element => element.name.toLowerCase() === "content-length");
       const contentLength = undefined === responseHeadersContentLength ? {value: 0} : responseHeadersContentLength;
       const requestSize = parseInt(contentLength.value, 10);
       setByteLengthPerOrigin(origin, requestSize);
       return {};
    }
  
    let filter = browser.webRequest.filterResponseData(requestDetails.requestId);
  
    filter.ondata = event => {
      const origin = extractHostname(!requestDetails.originUrl ? requestDetails.url : requestDetails.originUrl);
      setByteLengthPerOrigin(origin, event.data.byteLength);
  
      filter.write(event.data);
    };
  
    filter.onstop = () => {
      filter.disconnect();
    };
  
    return {};
};

addOneMinute = () => {
    let duration = localStorage.getItem('duration');
    duration = null === duration ? 1 : 1 * duration + 1;
    localStorage.setItem('duration', duration);
};

let addOneMinuteInterval;

handleMessage = (request) => {
    if ('start' === request.action) {
      chrome.webRequest.onHeadersReceived.addListener(
        headersReceivedListener,
        {urls: ['<all_urls>']},
        ['responseHeaders']
      );
  
      if (!addOneMinuteInterval) {
        addOneMinuteInterval = setInterval(addOneMinute, 60000);
      }
  
      return;
    }
  
    if ('stop' === request.action) {
      chrome.webRequest.onHeadersReceived.removeListener(headersReceivedListener);
  
      if (addOneMinuteInterval) {
        clearInterval(addOneMinuteInterval);
        addOneMinuteInterval = null;
      }
    }
};
  
chrome.runtime.onMessage.addListener(handleMessage);