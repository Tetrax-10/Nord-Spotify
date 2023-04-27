import React, { useState } from "react"

import LocalStorage from "../../../localStorage/localStorage"
import { ActionButtonWrapper, Label } from "./MenuHelpers"

export default function MultipleActionButton({ name = null, buttons = [] } = {}) {
    const [toogle, setToogle] = useState(true)
    const refresh = () => setToogle(!toogle)

    return (
        <div className="popup-row" id="search-element">
            <Label>{name}</Label>
            <div className="col action">
                {buttons.map(({ icon = "check", info = "", field = undefined, disableWhenFalse = false, onClickHandler = () => {} } = {}) => (
                    <ActionButtonWrapper
                        icon={icon}
                        info={info}
                        field={field}
                        onClickHandler={onClickHandler}
                        disableWhenFalse={disableWhenFalse}
                        siblingField={LocalStorage.config[buttons[buttons.length - 1].field]}
                        refreshParentComponent={refresh}
                    />
                ))}
            </div>
        </div>
    )
}
