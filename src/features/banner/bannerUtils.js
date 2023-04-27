import State from "../../state/state"
import LocalStorage from "../../localStorage/localStorage"
import Utils from "../../utils/utils"
import conditionalSnippets from "../snippets/externalCssSnippets/conditionalSnippets"
import Snippet from "../snippets/snippets"

export async function injectAndStyleBanners() {
    const mainView = await Utils.dom.waitForElement(".under-main-view", 1000)

    // inject main banner
    const banner = document.createElement("div")
    banner.id = "main-banner"
    mainView.appendChild(banner)

    // inject preload banner
    const preBanner = document.createElement("img")
    preBanner.id = "preload-banner"
    mainView.appendChild(preBanner)

    // inject banner css
    Snippet.utils.injectConditionedClass(conditionalSnippets.bannerCSS)

    LocalStorage.config.fitBannerImage ? (banner.style.backgroundSize = "contain") : (banner.style.backgroundSize = "cover")

    showTopbarWhenBannerScrolledFully()

    return banner
}

export async function injectBanner(rawData = Spicetify.Player) {
    if (State.app.changeStateSrc !== "songchange") {
        hideOrShowBanner()
        fixBannerPage()
        hideOrShowTopbar()
    }

    await updateState(rawData)
    if (State.app.shouldChangeProp) updateBannerImage()
    saveBannerPos()
}

function saveBannerPos() {
    LocalStorage.saveConfig("bannerPosition", LocalStorage.config.bannerPosition)
}

export function updateBannerPosInConfig() {
    const smallUri = Utils.utils.makeSmallUri(State.app.uri)

    if (State.app.currentPos == 50) {
        delete LocalStorage.config.bannerPosition[smallUri]
    } else {
        LocalStorage.config.bannerPosition[smallUri] = `${State.app.currentPos}`
    }
}

function showTopBar() {
    Snippet.utils.removeClass(conditionalSnippets.hideTopBar)
    Snippet.utils.injectClass(conditionalSnippets.showTopBar)
}

function hideTopBar() {
    Snippet.utils.removeClass(conditionalSnippets.showTopBar)
    Snippet.utils.injectClass(conditionalSnippets.hideTopBar)
}

function showTopbarWhenBannerScrolledFully() {
    const observer = new MutationObserver((mutationsList) => {
        if (State.app.isValidPage) {
            for (const mutation of mutationsList) {
                if (mutation.type === "attributes" && mutation.attributeName === "class") {
                    const topBarContent = document.querySelector(".main-entityHeader-topbarContent")
                    if (topBarContent.classList.contains("main-entityHeader-topbarContentFadeIn")) {
                        showTopBar()
                    } else {
                        hideTopBar()
                    }
                }
            }
        }
    })

    const targetNode = document.querySelector(".Root__top-bar")
    observer.observe(targetNode, { attributes: true, attributeFilter: ["class"], subtree: true, childList: true })
}

function hideOrShowTopbar() {
    if (State.app.isValidPage) {
        hideTopBar()
    } else {
        showTopBar()
    }
}

function updateBannerImage() {
    const banner = document.querySelector("#main-banner")
    const preBanner = document.querySelector("#preload-banner")

    // return if banner image didn't change
    if (banner.style.backgroundImage == `url("${State.app.image}")`) {
        return
    }

    preBanner.src = State.app.image
    preBanner.addEventListener("load", changeBannerImage)

    function changeBannerImage() {
        setTimeout(
            () => {
                banner.style.filter = "blur(100px)"
                const smallUri = Utils.utils.makeSmallUri(State.app.uri)
                setTimeout(() => {
                    banner.style.backgroundImage = `url("${State.app.image}")`
                    const pos = LocalStorage.config.bannerPosition.hasOwnProperty(smallUri) ? LocalStorage.config.bannerPosition[smallUri] : "50"
                    banner.style.backgroundPositionY = pos + "%"
                    banner.style.filter = State.app.filterCSS
                    preBanner.removeEventListener("load", changeBannerImage)
                }, 500)
            },
            State.app.changeStateSrc === "songchange" ? 0 : 100 // song images are already loaded by spotify so no need wait 100ms for loading
        )
    }
}

function handleSpotifyDefaultBanner() {
    if (State.app.pageType === "artists" || State.app.pageType === "playlists") {
        const spotifyDefaultBanner = document.querySelector(".main-entityHeader-background")

        if (spotifyDefaultBanner && State.app.changeStateSrc === "songchange") {
            spotifyDefaultBanner.style.display = "none"
        }
    }
}

async function updateState(rawData) {
    if (!LocalStorage.config.changeCoverArtOnSongChange && State.app.isBannerPage && State.app.changeStateSrc === "songchange") {
        return
    }

    handleSpotifyDefaultBanner()

    if (State.app.changeStateSrc === "songchange" || !State.app.isBannerPage || LocalStorage.config.songBannersOnly) {
        if (State.app.islocal) {
            State.app.uri = rawData.data.track.uri
        } else {
            State.app.uri = rawData.data.track.metadata.album_uri
        }

        State.app.uid = Utils.path.uriToUID(State.app.uri) // this wrapped inside a try catch block. idk why

        if (State.app.previousUri == State.app.uri) {
            State.app.shouldChangeProp = false
            return
        }
        State.app.previousUri = State.app.uri
        State.app.shouldChangeProp = true

        State.app.image = rawData.data.track.metadata.image_xlarge_url
    } else if (State.app.isBannerPage) {
        State.app.uri = Utils.path.pathToURI(State.app.path)
        State.app.uid = Utils.path.pathToUID(State.app.path)

        if (State.app.previousUri == State.app.uri) {
            State.app.shouldChangeProp = false
            return
        }
        State.app.previousUri = State.app.uri
        State.app.shouldChangeProp = true

        State.app.image = await fetchBannerImage(rawData)

        if (!State.app.image) State.app.shouldChangeProp = false
    }
}

async function fetchBannerImage(rawData = Spicetify.Player) {
    try {
        if (State.app.pageType == "playlists") {
            rawData = await Spicetify.Platform.PlaylistAPI.getMetadata(`spotify:playlist:${State.app.uid}`)
            if (rawData.images.length > 1) return rawData.images.pop()["url"]
        }
        if (State.app.isBannerPage) {
            rawData = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/${State.app.pageType}/${State.app.uid}`)
            return rawData.images[0]["url"]
        } else {
            return rawData.data.track.metadata.image_xlarge_url
        }
    } catch (err) {
        console.error(`Nord: ${err}`)
    }
}

export function updateBannerBlur(value, src) {
    const banner = document.querySelector("#main-banner")

    value === "" ? (value = 0) : null

    if (src === "menu") {
        LocalStorage.config["bannerBlurValue"] = value
        LocalStorage.saveConfig("bannerBlurValue", LocalStorage.config["bannerBlurValue"])
    }

    State.app.filterCSS = value != 0 && (LocalStorage.config.bannerBlur || src === "lyrics") ? `blur(${value}px)` : "unset"
    banner.style.filter = State.app.filterCSS
}

export function hideOrShowLyricsPageBanners() {
    if ((State.app.pageType == "lyrics-plus" || State.app.pageType == "lyrics") && LocalStorage.config.bannersInLyricsPage) {
        State.app.pageType == "lyrics-plus" ? Utils.dom.injectCSS(conditionalSnippets.lyricsPlusNoBg, "lyricsPlusNoBg") : null
        updateBannerBlur(20, "lyrics")
    } else {
        updateBannerBlur(LocalStorage.config.bannerBlurValue)
        Utils.dom.removeInjectedElement("lyricsPlusNoBg")
    }
}

function fixBannerPage() {
    const fixPages = {
        albums: "fixAlbumPage",
        playlists: "fixEnhancedPage",
        liked: "fixLikedSongsPage",
        folder: "fixFolderPage",
        shows: "fixShowsPage",
        local: "fixLocalPage",
    }

    const currentPage = fixPages[State.app.pageType]
    const otherPages = Object.values(fixPages).filter((className) => className !== currentPage)

    Snippet.utils.injectConditionedClass(currentPage)
    otherPages.forEach((className) => Snippet.utils.injectConditionedClass(className, false))
}

export function hideOrShowBanner() {
    const banner = document.querySelector("#main-banner")

    if (State.app.isValidPage && LocalStorage.config.showBanner) {
        hideOrShowLyricsPageBanners()
        if (LocalStorage.config.fullPageBanner) {
            Snippet.utils.injectClassDynamicUI(conditionalSnippets.bigBannerNew, conditionalSnippets.bigBannerLibX, conditionalSnippets.bigBannerOld)
        }
        Snippet.utils.injectConditionedClass(conditionalSnippets.hidePageDetails, LocalStorage.config.hidePageDetails)
        banner.style.display = "unset"
    } else {
        Snippet.utils.injectClassDynamicUI(
            conditionalSnippets.bigBannerNew,
            conditionalSnippets.bigBannerLibX,
            conditionalSnippets.bigBannerOld,
            false
        )
        Snippet.utils.injectConditionedClass(conditionalSnippets.hidePageDetails, false)
        banner.style.display = "none"
    }
}

export function canBannerInteractWithPlayerBar() {
    return !(
        document.querySelector(".main-nowPlayingBar-left a:hover") ||
        document.querySelector(".main-nowPlayingBar-left span:hover") ||
        document.querySelector(".main-nowPlayingBar-left img:hover") ||
        document.querySelector(".main-nowPlayingBar-left svg:hover") ||
        document.querySelector(".main-nowPlayingBar-left button:hover") ||
        document.querySelector(".main-nowPlayingBar-right button:hover") ||
        document.querySelector(".main-nowPlayingBar-right svg:hover") ||
        document.querySelector(".volume-bar:hover")
    )
}
