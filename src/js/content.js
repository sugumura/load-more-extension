const DELAY = 500

if (typeof browser === "undefined") {
    var browser = chrome;
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.text == "load-more") {
        let buttons = Array.from(document.getElementsByClassName("ajax-pagination-btn"))
        if (buttons.length > 0) {
            ArrayPlusDelay(buttons, (button) => {
                button.click()
            }, DELAY)
        } else {
            sendResponse({response: "load-more-finish"})
        }
    }
})

function ArrayPlusDelay(array, delegate, delay) {
    let i = 0
    let interval = setInterval(() => {
        delegate(array[i]);
        if (i++ >= array.length - 1)
            clearInterval(interval);
    }, delay)
}
