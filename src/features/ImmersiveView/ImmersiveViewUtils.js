import Utils from "../../utils/utils"
import conditionalSnippets from "../snippets/externalCssSnippets/conditionalSnippets"
import Snippet from "../snippets/snippets"

const ImmersiveViewUtils = (() => {
    async function createReactPortal() {
        const portal = document.createElement("div")
        portal.className = "tetrax-react-portal main-topBar-historyButtons"

        const portalLocation = await Utils.dom.waitForElement(".main-noConnection")

        portalLocation.insertAdjacentElement("afterend", portal)

        return portal
    }

    function turnOnImmersiveView() {
        Snippet.utils.injectClass(conditionalSnippets.immersiveView)
        Snippet.utils.injectClassDynamicUI(conditionalSnippets.bigBannerLibXImmersiveView, conditionalSnippets.bigBannerOldImmersiveView)
    }

    function turnOffImmersiveView() {
        Snippet.utils.removeClass(conditionalSnippets.immersiveView)
        Snippet.utils.injectClassDynamicUI(conditionalSnippets.bigBannerLibXImmersiveView, conditionalSnippets.bigBannerOldImmersiveView, false)
    }

    return {
        createReactPortal: createReactPortal,
        turnOn: turnOnImmersiveView,
        turnOff: turnOffImmersiveView,
    }
})()

export default ImmersiveViewUtils
