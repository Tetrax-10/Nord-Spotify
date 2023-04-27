import LocalStorage from "../../localStorage/localStorage"
import Utils from "../../utils/utils"
import dynamicallyGeneratedConditionalCss from "../snippets/dynamicallyGeneratedSnippets/dynamicallyGeneratedConditionalCss/dynamicallyGeneratedConditionalCss"
import { injectWindowsControlsBgDiv, updateWindowsControls } from "./hideWindowsControlsUtils"

const HideWindowsControls = (() => {
    async function init() {
        const isWindows = await Utils.api.checkOS("Win")

        if (!isWindows) return

        injectWindowsControlsBgDiv() // injects div

        dynamicallyGeneratedConditionalCss.utils.inject("hideWindowsControlsCSS", LocalStorage.config.hideWindowsControls) // injects css for the above div
    }

    return {
        init: init,
        event: {
            update: updateWindowsControls,
        },
    }
})()

export default HideWindowsControls
