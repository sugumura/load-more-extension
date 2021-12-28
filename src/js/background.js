import { APP_DELAY } from "./lib/app_value";

const browser = chrome ? chrome : browser

// ユーザがアクションした場合にフラグを立てる
let isLoadRequest = false
let loadTab = null

browser.action.setTitle({title: "Load more!"});

// shortcut
browser.commands.onCommand.addListener((command) => {
    if (command === "load-more") {
        isLoadRequest = true
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            loadTab = tabs[0]
            requestLoadMore()
        })
    }
})

// icon click
browser.action.onClicked.addListener((tab) => {
    isLoadRequest = true
    loadTab = tab
    browser.tabs.sendMessage(tab.id, { text: "load-more" }, function (response) {
        finishProcess(response)
    });
})

// request
browser.webRequest.onCompleted.addListener((request) => {
        if (isLoadRequest) {
            setTimeout(() => {
                requestLoadMore()
            }, APP_DELAY)
        }
    },
    {
        urls: [
            "https://github.com/_render_node/*/timeline/more_items*",
            "https://github.com/*/*/pull/*/timeline_more_items*"
        ],
        types: ["xmlhttprequest"]
    }
);

function requestLoadMore() {
    if (!loadTab) {
        return
    }
    browser.tabs.sendMessage(loadTab.id, { text: "load-more" }, function (response) {
        finishProcess(response)
    });
}

function finishProcess(message) {
    if (!message) {
        return
    }
    if (message.response === "load-more-finish") {
        browser.notifications.create({
            type: "basic",
            title: "Finish",
            message: "load finished",
            iconUrl: browser.runtime.getURL("assets/icons/load_more_128.png"),
        })
        isLoadRequest = false
        loadTab = null
    }
}
