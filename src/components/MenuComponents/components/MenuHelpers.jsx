import React, { useState } from "react"

import LocalStorage from "../../../localStorage/localStorage"

export function Label({ children: name = null } = {}) {
    return <label className="col description">{name}</label>
}

export function Icon({ size = 16, className = undefined, children: icon = undefined } = {}) {
    return (
        <svg
            width={size}
            height={size}
            className={className ?? ""}
            viewBox="0 0 16 16"
            fill="currentColor"
            dangerouslySetInnerHTML={{ __html: Spicetify.SVGIcons[icon] ?? icon }}
        ></svg>
    )
}

export function Tooltip({ info = "", placement = "top", className = "", children = null } = {}) {
    return (
        <>
            {info ? (
                <Spicetify.ReactComponent.TooltipWrapper label={info} placement={placement} labelClassName={className}>
                    {children}
                </Spicetify.ReactComponent.TooltipWrapper>
            ) : (
                children
            )}
        </>
    )
}

export function ActionButtonWrapper({
    icon = "",
    info = "",
    field = undefined,
    visible = true,
    alwaysEnable = false,
    siblingField = false,
    disableWhenFalse = false,
    onClickHandler = () => {},
    refreshParentComponent = () => {},
} = {}) {
    // If field is not defined then value will be false
    const [value, setValue] = useState(LocalStorage.config[field] ?? false)

    function updateField() {
        if (field !== undefined) {
            const state = !value

            LocalStorage.config[field] = state
            setValue(state)
            LocalStorage.saveConfig(field, LocalStorage.config[field])

            onClickHandler(state)
        } else {
            onClickHandler()
        }

        refreshParentComponent()
    }

    return (
        <Tooltip info={info}>
            <button
                className={`checkbox${value || siblingField || alwaysEnable ? "" : " disabled"}${visible ? "" : " display-none"}`}
                disabled={disableWhenFalse && !siblingField}
                onClick={updateField}
            >
                <Icon>{icon}</Icon>
            </button>
        </Tooltip>
    )
}

export function InputWrapper({
    info = "",
    field = undefined,
    value: initValue = "",
    disableWhenFalse = false,
    siblingField = true,
    isSmall = true,
    onChangeHandler = () => {},
} = {}) {
    const [value, setValue] = useState(LocalStorage.config[field] ?? initValue)

    function updateField(e) {
        setValue(e.target.value)
        if (field) {
            LocalStorage.config[field] = e.target.value
            LocalStorage.saveConfig(field, LocalStorage.config[field])
        }
        onChangeHandler(e.target.value)
    }

    return (
        <Tooltip info={info}>
            <input
                className={"inputbox" + isSmall ? " small-input" : ""}
                value={siblingField ? value : ""}
                placeholder={value}
                disabled={disableWhenFalse && !siblingField}
                onChange={updateField}
            ></input>
        </Tooltip>
    )
}
