const PreloadUtils = (() => {
    let expFeaturesData
    try {
        expFeaturesData = JSON.parse(localStorage.getItem("spicetify-exp-features"))
    } catch (err) {
        console.error(`Nord:handled: can't parse exp features; error: ${err}`)
    }

    async function isNewUI() {
        if (!Spicetify.RemoteConfigResolver) {
            return (await waitForElement(".nav-alt", 1000)) ? true : false
        }

        if (expFeaturesData.enableNavAltExperiment2 === undefined) return false

        const newUiState = expFeaturesData.enableNavAltExperiment2.value

        return newUiState === "DISABLED" || newUiState === undefined ? false : true
    }

    async function isLibX() {
        if (!Spicetify.RemoteConfigResolver) {
            return (await waitForElement("body.ylx", 1000)) ? true : false
        }

        if (expFeaturesData.enableYLXSidebar === undefined) return false

        const libXState = expFeaturesData.enableYLXSidebar.value

        return libXState === true ? true : false
    }

    async function waitForElement(selector, timeout = null, location = document.body) {
        return new Promise((resolve) => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector))
            }

            const observer = new MutationObserver(async () => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector))
                    observer.disconnect()
                } else {
                    if (timeout) {
                        async function timeOver() {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    observer.disconnect()
                                    resolve(false)
                                }, timeout)
                            })
                        }
                        resolve(await timeOver())
                    }
                }
            })

            observer.observe(location, {
                childList: true,
                subtree: true,
            })
        })
    }

    return {
        isNewUI: isNewUI,
        isLibX: isLibX,
    }
})()

export default PreloadUtils
