import React, { useState } from "react"

import LocalStorage from "../../../localStorage/localStorage"
import { ActionButtonWrapper, InputWrapper, Label } from "./MenuHelpers"

export default function ActionInput({
    name = null,
    info = "",
    field = undefined,
    disableWhenFieldIsFalse = false,
    onChangeHandler = () => {},
    buttons = [],
} = {}) {
    const [toogle, setToogle] = useState(true)
    const refresh = () => setToogle(!toogle)

    return (
        <div className="popup-row" id="search-element">
            <Label>{name}</Label>
            <div className="col action">
                <InputWrapper
                    info={info}
                    field={field}
                    disableWhenFalse={disableWhenFieldIsFalse ? true : false}
                    siblingField={LocalStorage.config[disableWhenFieldIsFalse]}
                    onChangeHandler={onChangeHandler}
                ></InputWrapper>
                {buttons.map(({ icon = "check", field = "", onClickHandler = () => {} } = {}) => (
                    <ActionButtonWrapper icon={icon} field={field} onClickHandler={onClickHandler} refreshParentComponent={refresh} />
                ))}
            </div>
        </div>
    )
}
