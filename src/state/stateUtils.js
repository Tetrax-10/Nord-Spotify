import LocalStorage from "../localStorage/localStorage"
import State from "./state"

const stateUtils = (() => {
    function pathToType() {
        let rootPath = State.app.path.split("/")[1]

        switch (rootPath) {
            case "playlist":
            case "album":
            case "show":
                State.app.isBannerPage = true
                State.app.isValidPage = true
                return rootPath + "s"
            case "artist":
                if (State.app.path.split("/").length === 3) {
                    State.app.isBannerPage = true
                    State.app.isValidPage = true
                    return "artists"
                }
                break
            case "genre":
                if (!(State.app.path.split("/")[2].includes("section") || State.app.path.split("/")[2].includes("recently-played"))) {
                    State.app.isBannerPage = false
                    State.app.isValidPage = true
                    return "genre"
                }
                break
            case "folder":
                State.app.isBannerPage = false
                State.app.isValidPage = true
                return "folder"
            case "new-releases":
                State.app.isBannerPage = false
                State.app.isValidPage = false
                return "new-releases"
            case "lyrics-plus":
            case "lyrics":
                State.app.isBannerPage = false
                State.app.isValidPage = LocalStorage.config.bannersInLyricsPage
                return rootPath
        }

        switch (State.app.path) {
            case "/collection/tracks":
                State.app.isBannerPage = false
                State.app.isValidPage = true
                return "liked"
            case "/collection/local-files":
                State.app.isBannerPage = false
                State.app.isValidPage = true
                return "local"
        }

        State.app.isValidPage = false
        State.app.isBannerPage = false
        return false
    }

    return {
        pathToType: pathToType,
    }
})()

export default stateUtils
