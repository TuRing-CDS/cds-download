/**
 * Created by Z on 2017-01-11.
 */
function Console() {
}

Console.Type = {
    LOG: "log",
    DEBUG: "debug",
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
    GROUP: "group",
    GROUP_COLLAPSED: "groupCollapsed",
    GROUP_END: "groupEnd"
};

Console.addMessage = function (type, format, args) {
    chrome.extension.sendRequest({
        command: "sendToConsole",
        tabId: chrome.devtools.tabId,
        args: escape(JSON.stringify(Array.prototype.slice.call(arguments, 0)))
    });
};

(function () {
    var console_types = Object.getOwnPropertyNames(Console.Type);
    for (var type = 0; type < console_types.length; ++type) {
        var method_name = Console.Type[console_types[type]];
        Console[method_name] = Console.addMessage.bind(Console, method_name);
    }
})();

// Console.log(chrome.devtools.inspectedWindow);
chrome.devtools.inspectedWindow.getResources(function (list) {
    list.forEach(function (item) {
        Console.log(item.url);
    })
});