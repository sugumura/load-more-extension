const browser = chrome ? chrome : browser

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("onMessage", request)

    if (request.text === "load-more") {
        let buttons = Array.from(document.getElementsByClassName("ajax-pagination-btn"))
        if (buttons.length > 0) {
            ArrayPlusDelay(buttons, (button) => {
                button.click()
            }, Number(request.delay))
            sendResponse({response: "load-more-click"})
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
