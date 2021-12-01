// shortcut
chrome.commands.onCommand.addListener((command) => {
    if (command === "load-more") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { text: "load-more" }, function (response) {
                // console.log(response);
            });
        });
    }
})

// icon click
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { text: "load-more" }, function (response) {
        // console.log(response);
    });
})
