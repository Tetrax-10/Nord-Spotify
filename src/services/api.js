const Api = (() => {
    async function getOS() {
        const systemInfo = await Spicetify.CosmosAsync.get("sp://desktop/v1/version")
        return systemInfo.platform
    }

    async function isPremium() {
        let data = await Spicetify.CosmosAsync.get("sp://product-state/v1/values")
        if (data.catalogue == "premium" || data.name == "Spotify Premium" || data.type == "premium") {
            return true
        } else {
            return false
        }
    }

    function getFromClipboard() {
        return Spicetify.Platform.ClipboardAPI.paste()
    }

    function sendToClipboard(data) {
        if (data) {
            Spicetify.Platform.ClipboardAPI.copy(data)
        }
    }

    function notification(text, isError = false, ms) {
        Spicetify.showNotification(text, isError, ms)
    }

    async function isAppLaterThan(specifiedVersion) {
        let appInfo = await Spicetify.CosmosAsync.get("sp://desktop/v1/version")
        let result = appInfo.version.localeCompare(specifiedVersion, undefined, { numeric: true, sensitivity: "base" })

        return result === 1
    }

    async function isAppEarlierThan(specifiedVersion) {
        let appInfo = await Spicetify.CosmosAsync.get("sp://desktop/v1/version")
        let result = appInfo.version.localeCompare(specifiedVersion, undefined, { numeric: true, sensitivity: "base" })

        return result !== 1
    }

    return {
        get: {
            os: getOS,
            premiumStatus: isPremium,
        },
        app: {
            laterThan: isAppLaterThan,
            earlierThan: isAppEarlierThan,
        },
        send: {
            notification: notification,
        },
        clipboard: {
            get: getFromClipboard,
            send: sendToClipboard,
        },
    }
})()

export default Api
