const PreloadUtils = (() => {
    let expFeaturesData
    try {
        expFeaturesData = JSON.parse(localStorage.getItem("spicetify-exp-features"))
    } catch (err) {
        console.warn(`Nord:handled: Can't parse exp features, probability exp features was never turned on > from: \`PreloadUtils\` > error: ${err}`)
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

    function shouldReloadToApplyExpFeatures() {
        const isReloaded = localStorage.getItem("nord:isReloaded")
        localStorage.setItem("nord:isReloaded", "false")

        if (isReloaded === "true") {
            setTimeout(() => location.reload(), 1500)
        }
    }

    async function checkIfAnExtensionIsInstalled(name) {
        const scriptElement = await waitForElement(`script[src*="${name}.js"]`, 1000)
        return scriptElement ? true : false
    }

    return {
        isLibX: isLibX,
        shouldReloadToApplyExpFeatures: shouldReloadToApplyExpFeatures,
        checkIfAnExtensionIsInstalled: checkIfAnExtensionIsInstalled,
    }
})()

export default PreloadUtils
