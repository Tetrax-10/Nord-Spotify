import React from "react"

import { Tooltip } from "./MenuHelpers"

export default function Button({ name = "Button", info = "", color = "", visible = true, closeModal = true, onClickHandler = () => {} } = {}) {
    const closeModalFun = () => {
        if (closeModal) Spicetify.PopupModal.hide()
        onClickHandler()
    }

    return (
        <Tooltip info={info}>
            <button className={"login-button" + (color ? " " + color + "-btn" : "") + (visible ? "" : " display-none")} onClick={closeModalFun}>
                {name}
            </button>
        </Tooltip>
    )
}
