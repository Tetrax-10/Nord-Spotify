import PreloadUtils from "./preloadUtils"

export default async function preload() {
    window.Nord = window.Nord ?? {}
    window.Nord.shared = window.Nord.shared ?? {}

    window.Nord.shared.isNewUI = await PreloadUtils.isNewUI()
    window.Nord.shared.isLibX = await PreloadUtils.isLibX()
}
