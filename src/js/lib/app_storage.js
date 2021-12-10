/**
 * browser extension storage
 */
export class AppStorage {
    constructor(browser, method) {
        this.runtime = browser.runtime
        this.storage = browser.storage[method]
    }

    getItem (keys) {
        return new Promise(resolve => {
            this.storage.get(keys, resolve)
        })
    }

    setItem (items) {
        return new Promise((resolve, reject) => {
            this.storage.set(items, () => {
                const { lastError } = this.runtime;
                if (lastError) return reject(lastError)
                resolve()
            })
        })
    }

    deleteItem(keys) {
        this.storage.remove(keys, () => {})
    }
}

export class AppSyncStorage extends AppStorage {
    constructor(browser) {
        super(browser, 'sync');
    }
}

export class AppLocaltorage extends AppStorage {
    constructor(browser) {
        super(browser, 'local');
    }
}
