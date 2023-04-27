import React from "react"

import { InputWrapper, Label } from "./MenuHelpers"

export default function Input({ name = null, info = "", field = undefined, value = "", isSmall = true, onChangeHandler = () => {} } = {}) {
    return (
        <div className="popup-row" id="search-element">
            <Label>{name}</Label>
            <div className="col action">
                <InputWrapper info={info} field={field} value={value} isSmall={isSmall} onChangeHandler={onChangeHandler}></InputWrapper>
            </div>
        </div>
    )
}
