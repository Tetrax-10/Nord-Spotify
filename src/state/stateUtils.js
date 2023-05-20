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
    }

    return {
        pathToType: pathToType,
        updateDomClasses: updateDomClasses,
    }
})()

export default stateUtils
