const DELAY = 500

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.text == "load-more") {
        let buttons = Array.from(document.getElementsByClassName("ajax-pagination-btn"))
        if (buttons.length > 0) {
            ArrayPlusDelay(buttons, (button) => {
                button.click()
            }, DELAY)
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