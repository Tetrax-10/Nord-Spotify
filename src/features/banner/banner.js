import Utils from "../../utils/utils"
import LocalStorage from "../../localStorage/localStorage"
import State from "../../state/state"
import {
    canBannerInteractWithPlayerBar,
    injectBanner,
    injectAndStyleBanners,
    updateBannerPosInConfig,
    hideOrShowBanner,
    hideOrShowLyricsPageBanners,
    updateBannerBlur,
} from "./bannerUtils"

const Banner = (() => {
    // a copy of enableTransition is present in _conditional-snippets.scss -> snippet: bannerCSS
    let enableTransition = "background-image 0.5s, background-size 0.5s, background-position-y 2s, filter 0.5s ease-in-out"
    let disableTransition = "background-image 0.5s, background-size 0.5s, background-position-y 0s, filter 0.5s ease-in-out"

    async function init() {
        const player = await Utils.dom.waitForElement(".Root__now-playing-bar", 1000)
        const topBar = await Utils.dom.waitForElement(".Root__top-bar", 1000)
        const zoomOutKey = "`"

        const banner = await injectAndStyleBanners()

        State.app.currentPos = parseInt(getComputedStyle(banner).backgroundPositionY)

        await injectBanner()

        player.addEventListener("contextmenu", () => {
            if (!canBannerInteractWithPlayerBar()) return

            banner.style.transition = enableTransition
            banner.style.backgroundPositionY = "50%"
            State.app.currentPos = 50
            updateBannerPosInConfig()
        })

        player.addEventListener("wheel", (event) => {
            if (document.querySelector(".volume-bar:hover")) return

            if (player.matches(":hover") && State.app.isValidPage) {
                banner.style.transition = disableTransition
                let delta = Math.sign(event.deltaY)

                State.app.currentPos = parseInt(getComputedStyle(banner).backgroundPositionY)

                // scroll down
                if (delta == 1 && State.app.currentPos < 100) {
                    // makes sure currentPos is always divisible by 5 and limit it to 100
                    State.app.currentPos = 95 < State.app.currentPos + 5 ? 100 : State.app.currentPos + 5
                }

                // scroll up
                if (delta == -1 && 0 < State.app.currentPos) {
                    // makes sure currentPos is always divisible by 5 and limit it to 0
                    State.app.currentPos = State.app.currentPos - 5 < 5 ? 0 : State.app.currentPos - 5
                }

                banner.style.backgroundPositionY = State.app.currentPos + "%"
                updateBannerPosInConfig()
            }
        })

        window.addEventListener("keydown", (event) => {
            if (event.repeat) return
            if (event.key == zoomOutKey && !LocalStorage.config.fitBannerImage) {
                State.app.isZoomOutKeyPressed = true
                banner.style.backgroundColor = "var(--spice-main)" // on scrolled page zoom
                banner.style.backgroundSize = "contain"
                banner.style.zIndex = "1"
                topBar.style.zIndex = 0
            }
        })

        window.addEventListener("keyup", (event) => {
            if (event.repeat) return
            if (event.key == zoomOutKey && !LocalStorage.config.fitBannerImage) {
                State.app.isZoomOutKeyPressed = false
                banner.style.backgroundSize = "cover"
                if (!State.app.isZoomOutKeyPressed) {
                    banner.style.removeProperty("z-index")
                    banner.style.backgroundColor = "unset"
                    topBar.style.removeProperty("z-index")
                }
            }
        })
    }

    async function onPageChange() {
        await injectBanner()
    }

    async function onSongChange(event) {
        const banner = document.querySelector("#main-banner")
        banner.style.transition = enableTransition
        await injectBanner(event)
    }

    return {
        init: init,
        onPageChange: onPageChange,
        onSongChange: onSongChange,
        event: {
            hideOrShowBanner: hideOrShowBanner,
            hideOrShowLyricsPageBanners: hideOrShowLyricsPageBanners,
            updateBlur: updateBannerBlur,
        },
    }
})()

export default Banner
