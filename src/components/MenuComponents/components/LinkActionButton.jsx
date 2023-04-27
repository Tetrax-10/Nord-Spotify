import React from "react"

import { Icon, Label, Tooltip } from "./MenuHelpers"

export default function LinkActionButton({ name = "", info = "Open Guide", url = "", visible = true } = {}) {
    const openLink = () => window.open(url)

    return (
        <>
            <div className="popup-row" id="search-element">
                <Label>{name}</Label>
                <div className="col action">
                    <Tooltip info={info}>
                        <button className={`checkbox${visible ? "" : " display-none"}`} onClick={openLink}>
                            <Icon>{"external-link"}</Icon>
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}
