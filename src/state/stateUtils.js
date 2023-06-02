import Snippet from "../features/snippets/snippets"
import LocalStorage from "../localStorage/localStorage"
import State from "./state"

const stateUtils = (() => {
    function pathToType() {
        let rootPath = State.app.path.split("/")[1]

        switch (rootPath) {
            case "playlist":
            case "album":
            case "show":
            case "episode":
                State.app.isBannerPage = true
                State.app.isValidBannerPage = true
                return rootPath + "s"
            case "artist":
                if (State.app.path.split("/").length === 3) {
                    State.app.isBannerPage = true
                    State.app.isValidBannerPage = true
                    return "artists"
                }
                break
            case "genre":
                if (!(State.app.path.split("/")[2].includes("section") || State.app.path.split("/")[2].includes("recently-played"))) {
                    State.app.isBannerPage = false
                    State.app.isValidBannerPage = true
                    return "genre"
                }
                break
            case "folder":
                State.app.isBannerPage = false
                State.app.isValidBannerPage = true
                return "folder"
            case "new-releases":
                State.app.isBannerPage = false
                State.app.isValidBannerPage = false
                return "new-releases"
            case "lyrics-plus":
            case "lyrics":
                State.app.isBannerPage = false
                State.app.isValidBannerPage = LocalStorage.config.bannersInLyricsPage
                return rootPath
        }

        switch (State.app.path) {
            case "/collection/tracks":
                State.app.isBannerPage = false
                State.app.isValidBannerPage = true
                return "liked"
            case "/collection/local-files":
                State.app.isBannerPage = false
                State.app.isValidBannerPage = true
                return "local"
        }

        State.app.isBannerPage = false
        State.app.isValidBannerPage = false
        return false
    }

    function updateDomClasses() {
        if (State.app.isBannerPage) {
            Snippet.utils.injectClass("banner-page")
        } else {
            Snippet.utils.removeClass("banner-page")
        }

        if (State.app.isValidBannerPage) {
            Snippet.utils.injectClass("valid-banner-page")
        } else {
            Snippet.utils.removeClass("valid-banner-page")
        }

        // inject page classes
        if (State.app.pageType === "playlists") {
            Snippet.utils.injectClass("page-playlists")
        } else {
            Snippet.utils.removeClass("page-playlists")
        }
        if (State.app.pageType === "albums") {
            Snippet.utils.injectClass("page-albums")
        } else {
            Snippet.utils.removeClass("page-albums")
        }
        if (State.app.pageType === "shows") {
            Snippet.utils.injectClass("page-shows")
        } else {
            Snippet.utils.removeClass("page-shows")
        }
        if (State.app.pageType === "episodes") {
            Snippet.utils.injectClass("page-episodes")
        } else {
            Snippet.utils.removeClass("page-episodes")
        }
        if (State.app.pageType === "artists") {
            Snippet.utils.injectClass("page-artists")
        } else {
            Snippet.utils.removeClass("page-artists")
        }
        if (State.app.pageType === "genre") {
            Snippet.utils.injectClass("page-genre")
        } else {
            Snippet.utils.removeClass("page-genre")
        }
        if (State.app.pageType === "folder") {
            Snippet.utils.injectClass("page-folder")
        } else {
            Snippet.utils.removeClass("page-folder")
        }
        if (State.app.pageType === "new-releases") {
            Snippet.utils.injectClass("page-new-releases")
        } else {
            Snippet.utils.removeClass("page-new-releases")
        }
        if (State.app.pageType === "lyrics-plus") {
            Snippet.utils.injectClass("page-lyrics-plus")
        } else {
            Snippet.utils.removeClass("page-lyrics-plus")
        }
        if (State.app.pageType === "lyrics") {
            Snippet.utils.injectClass("page-lyrics")
        } else {
            Snippet.utils.removeClass("page-lyrics")
        }
        if (State.app.pageType === "liked") {
            Snippet.utils.injectClass("page-liked")
        } else {
            Snippet.utils.removeClass("page-liked")
        }
        if (State.app.pageType === "local") {
            Snippet.utils.injectClass("page-local")
        } else {
            Snippet.utils.removeClass("page-local")
        }
    }

    return {
        pathToType: pathToType,
        updateDomClasses: updateDomClasses,
    }
})()

export default stateUtils
