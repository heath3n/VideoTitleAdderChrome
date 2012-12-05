chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.name == "fetchPage") {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://gdata.youtube.com/feeds/api/videos/" + request.videoid + "?alt=json", true);
        xhr.onreadystatechange = function (evt) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log("Successful.");
                    sendResponse({response: JSON.parse(xhr.responseText), videoid: request.videoid});
                } else {
                    console.log("Hmm. Failed for " + request.videoid + ".");
                }
            }
        }
        xhr.send();
    }
    if (request.name == "options") {
        var resp = {};
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            resp[key] = localStorage[key];
        }
        sendResponse(resp);
    }
  }
);