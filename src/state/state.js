import LocalStorage from "../localStorage/localStorage"
import Utils from "../utils/utils"
import stateUtils from "./stateUtils"

const State = (() => {
    const AppState = {
        path: undefined,
        isBannerPage: undefined,
        isValidPage: undefined,
        pageType: undefined,
        uri: undefined,
        uid: undefined,
        image: undefined,
        previousUri: undefined,
        islocal: undefined,
        filterCSS: undefined,
        shouldChangeProp: false,
        changeStateSrc: "init",
        isZoomOutKeyPressed: false,
        currentPos: undefined,
        dynamicColorPalette: {},
    }

    async function init() {
        while (!(Spicetify.Player.data && Spicetify.Platform.History.location)) {
            await new Promise((resolve) => setTimeout(resolve, 10))
        }

        AppState.path = Spicetify.Platform.History.location.pathname
        AppState.uri = Spicetify.Player.data.track.uri
        AppState.uid = Utils.path.uriToUID(AppState.uri)
        AppState.pageType = stateUtils.pathToType()
        AppState.islocal = Spicetify.Player.data.track.metadata.is_local === "true"
        AppState.image = Spicetify.Player.data.track.metadata.image_xlarge_url
        AppState.filterCSS = LocalStorage.config.bannerBlurValue == 0 ? "unset" : `blur(${LocalStorage.config.bannerBlurValue}px)`
    }

    function onPageChange(event) {
        AppState.changeStateSrc = "pagechange"
        AppState.path = event.pathname
        AppState.pageType = stateUtils.pathToType()
    }

    function onSongChange(event) {
        AppState.changeStateSrc = "songchange"
        AppState.islocal = event.data.track.metadata.is_local === "true"
    }

    return {
        app: AppState,
        init: init,
        onPageChange: onPageChange,
        onSongChange: onSongChange,
    }
})()

export default State
