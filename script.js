$(document).mousemove(function(e){
    $("#image").stop().animate({left:e.pageX, top:e.pageY});
});

handleMessage = (request) => {
    if ('start' === request.action) {
      setBrowserIcon('on');
  
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
      setBrowserIcon('off');
      chrome.webRequest.onHeadersReceived.removeListener(headersReceivedListener);
  
      if (addOneMinuteInterval) {
        clearInterval(addOneMinuteInterval);
        addOneMinuteInterval = null;
      }
    }
};
  
  chrome.runtime.onMessage.addListener(handleMessage);