import React, { useState } from "react"

// import LocalStorage from "../../../utils/localStorage/localStorage"
import { Label, Tooltip } from "./MenuHelpers"
// import Shared from "../../../shared/shared"

export default function ColorInput({ name = "", field = undefined, color = undefined, info = "", onChangeHandler = () => {} } = {}) {
    const [value, setValue] = useState(color)

    function updateField(e) {
        const state = e.target.value.toUpperCase()
        setValue(state)
        onChangeHandler(field, state)
    }

    return (
        <div className="popup-row" id="search-element">
            <Label>{name}</Label>
            <div className="col action">
                <Tooltip info={info}>
                    <input className="inputbox" type="color" value={value} onChange={updateField}></input>
                </Tooltip>
                <Tooltip info={info}>
                    <input className="small-input" value={value} onChange={updateField}></input>
                </Tooltip>
            </div>
        </div>
    )
}
