import React, { useState } from "react"
import ReactDOM from "react-dom"

import Utils from "../../utils/utils"
import Snippet from "../snippets/snippets"
import conditionalSnippets from "../snippets/externalCssSnippets/conditionalSnippets"
import Shared from "../../shared/shared"

import { Icon, Tooltip } from "../../components/MenuComponents/components/MenuHelpers"

async function createReactPortal() {
    const portal = document.createElement("div")
    portal.className = "tetrax-react-portal main-topBar-historyButtons"

    const portalLocation = await Utils.dom.waitForElement(".main-noConnection")

    portalLocation.insertAdjacentElement("afterend", portal)

    return portal
}

export default async function ImmersiveView() {
    function toogleImmersiveView(setIcon) {
        if (Shared.state.isImmersiveView) {
            // turn off Immersive view
            Snippet.utils.removeClass(conditionalSnippets.immersiveView)
            Snippet.utils.injectClassDynamicUI(
                null,
                conditionalSnippets.bigBannerLibXImmersiveView,
                conditionalSnippets.bigBannerOldImmersiveView,
                false
            )
            setIcon("fullscreen")
        } else {
            // turn on Immersive view
            Snippet.utils.injectClass(conditionalSnippets.immersiveView)
            Snippet.utils.injectClassDynamicUI(
                null,
                conditionalSnippets.bigBannerLibXImmersiveView,
                conditionalSnippets.bigBannerOldImmersiveView,
                true
            )
            setIcon("minimize")
        }
        Shared.state.isImmersiveView = !Shared.state.isImmersiveView
    }

    function ImmersiveViewButton() {
        const [icon, setIcon] = useState("fullscreen")

        return (
            <Tooltip info={icon === "fullscreen" ? "Turn on Immersive view" : "Turn off Immersive view"} placement="bottom">
                <button className="main-topBar-button" onClick={() => toogleImmersiveView(setIcon)}>
                    <Icon>{icon}</Icon>
                </button>
            </Tooltip>
        )
    }

    ReactDOM.render(<ImmersiveViewButton />, await createReactPortal())
}
