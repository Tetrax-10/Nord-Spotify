import PreloadUtils from "./preloadUtils"

export default async function preload() {
    PreloadUtils.shouldReloadToApplyExpFeatures()

    window.Nord = window.Nord ?? {}
    window.Nord.shared = window.Nord.shared ?? {}
    window.Nord.shared.extensionList = window.Nord.shared.extensionList ?? {}

    // ui mode
    window.Nord.shared.isLibX = await PreloadUtils.isLibX()
    // installed extensions
    window.Nord.shared.extensionList.beautifulLyrics = await PreloadUtils.checkIfAnExtensionIsInstalled("beautiful-lyrics")
}
