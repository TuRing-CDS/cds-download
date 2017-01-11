/**
 * Created by Z on 2017-01-11.
 */
const tab_log = function(json_args) {
    var args = JSON.parse(unescape(json_args));
    console[args[0]].apply(console, Array.prototype.slice.call(args, 1));
}

chrome.extension.onRequest.addListener(function(request) {
    if (request.command !== 'sendToConsole')
        return;
    chrome.tabs.executeScript(request.tabId, {
        code: "("+ tab_log + ")('" + request.args + "');",
    });
});
