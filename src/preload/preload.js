import PreloadUtils from "./preloadUtils"

export default async function preload() {
    PreloadUtils.shouldReloadToApplyExpFeatures()

    window.Nord = window.Nord ?? {}
    window.Nord.shared = window.Nord.shared ?? {}

    window.Nord.shared.isLibX = await PreloadUtils.isLibX()
}
