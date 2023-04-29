import React, { useState } from "react"
import ReactDOM from "react-dom"

import Shared from "../../shared/shared"
import ImmersiveViewUtils from "./ImmersiveViewUtils"

import { Icon, Tooltip } from "../../components/MenuComponents/components/MenuHelpers"

export default async function ImmersiveView() {
    function toogleImmersiveView(setIcon) {
        if (Shared.state.isImmersiveView) {
            // turn off Immersive view
            ImmersiveViewUtils.turnOff()
            setIcon("fullscreen")
        } else {
            // turn on Immersive view
            ImmersiveViewUtils.turnOn()
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

    ReactDOM.render(<ImmersiveViewButton />, await ImmersiveViewUtils.createReactPortal())
}
