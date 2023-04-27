import React, { useState } from "react"

import LocalStorage from "../../../localStorage/localStorage"
import { ActionButtonWrapper, Label } from "./MenuHelpers"

export default function Dropdown({
    name = null,
    field = undefined,
    value: initValue = "",
    options = {},
    visibility = true,
    onChangeHandler: onChangeCallback = () => {},
    buttons = [],
} = {}) {
    if (visibility === false) return null

    const [value, setValue] = useState(LocalStorage.config[field] ?? initValue)

    function onChangeHandler(e) {
        setValue(e.target.value)
        if (field) {
            LocalStorage.config[field] = e.target.value
            LocalStorage.saveConfig(field, LocalStorage.config[field])
        }
        onChangeCallback(e.target.value)
    }

    return (
        <div className="popup-row" id="search-element">
            <Label>{name}</Label>
            <div className="col action">
                <select value={value} onChange={onChangeHandler}>
                    {Object.keys(options).map((item) => (
                        <option value={item}>{options[item]}</option>
                    ))}
                </select>
                {buttons.map(({ icon = "check", info = "", visible = () => true, onClickHandler = () => {} } = {}) => (
                    <ActionButtonWrapper icon={icon} info={info} visible={visible()} alwaysEnable={true} onClickHandler={onClickHandler} />
                ))}
            </div>
        </div>
    )
}
