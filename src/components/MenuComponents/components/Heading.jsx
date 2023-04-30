import React from "react"

export default function Heading({ name = null } = {}) {
    return (
        <div className="popup-row">
            <div className="space"></div>
            <h3 className="div-title">{name}</h3>
            <hr className="divider"></hr>
        </div>
    )
}
