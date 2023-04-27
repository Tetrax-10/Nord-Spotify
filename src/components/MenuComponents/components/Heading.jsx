import React from "react"

export default function Heading({ name = null } = {}) {
    return (
        <div className="popup-row">
            <hr className="space"></hr>
            <h3 className="div-title">{name}</h3>
            <hr className="divider"></hr>
        </div>
    )
}
