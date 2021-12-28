import { AppSyncStorage } from "./lib/app_storage";
import { elById } from "./lib/dom";
import { APP_DEFAULT_DELAY, APP_MIN_DELAY } from "./lib/app_value";

const syncStorage = new AppSyncStorage(chrome || browser)

async function save_options() {
    const delay = elById("delay_input").value
    console.log("save_options delay input", delay)

    if (delay < APP_MIN_DELAY) {
        updateStatus("minimum 300 milisecconds.")
        return
    }
    const items = await syncStorage.setItem({delay: delay});
    updateStatus("Options saved.", items)
}

async function restore_options() {
    const items = await syncStorage.getItem({delay: APP_DEFAULT_DELAY});
    console.log("restore_options", items);
    elById("delay_input").value = items.delay;
}

function updateStatus(text) {
    let status = elById("status");
    status.textContent = text;
    setTimeout(function () {
        console.log("callback empty")
        status.textContent = "";
    }, 1000);
}

document.addEventListener("DOMContentLoaded", restore_options);
elById("save").addEventListener("click", save_options);
