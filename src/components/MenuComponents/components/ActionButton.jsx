import React from "react"

import { ActionButtonWrapper, Label } from "./MenuHelpers"

export default function ActionButton({
    name = null,
    info = "",
    field = undefined,
    visibility = true,
    icon = "check",
    onClickHandler = () => {},
} = {}) {
    if (visibility === false) return null

    return (
        <div className="popup-row" id="search-element">
            <Label>{name}</Label>
            <div className="col action">
                <ActionButtonWrapper icon={icon} info={info} field={field} onClickHandler={onClickHandler} />
            </div>
        </div>
    )
}
