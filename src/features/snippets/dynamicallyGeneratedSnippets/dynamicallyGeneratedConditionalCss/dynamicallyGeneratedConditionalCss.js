import Utils from "../../../../utils/utils"
import { hideWindowsControlsCSS } from "./snippets"

// These snippets are used in many places throughout the app
// css is generated dynamically

const dynamicallyGeneratedConditionalCss = (() => {
    const snippets = {
        hideWindowsControlsCSS: hideWindowsControlsCSS,
    }

    function inject(id, shouldEnable = true) {
        const css = snippets[id]()
        shouldEnable ? Utils.dom.injectCSS(css, id) : Utils.dom.removeInjectedElement(id)
    }

    return {
        snippets: snippets,
        utils: {
            inject: inject,
        },
    }
})()

export default dynamicallyGeneratedConditionalCss
