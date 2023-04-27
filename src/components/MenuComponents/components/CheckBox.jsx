import React from "react"

import ActionButton from "./ActionButton"
import { Label } from "./MenuHelpers"

export default function CheckBox({ name = null, info = "", field = undefined, onClickHandler = () => {} } = {}) {
    return (
        <div className="popup-row" id="search-element">
            <Label>{name}</Label>
            <div className="col action">
                <ActionButton icon="check" info={info} field={field} onClickHandler={onClickHandler} />
            </div>
        </div>
    )
}
