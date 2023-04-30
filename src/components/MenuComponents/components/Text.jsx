import React from "react"
import Render from "../../Render/Render"

export default function Text({ children: content = [["", {}]] } = {}) {
    const hasHighlight = JSON.stringify(content).includes('["Highlight",') // eslint-disable-line quotes

    return (
        <div className="popup-row">
            {hasHighlight ? (
                <span>
                    <Render>{content}</Render>
                </span>
            ) : (
                <Render>{content}</Render>
            )}
        </div>
    )
}

export function Para({ children: content = "" } = {}) {
    return <p className="col description">{content}</p>
}

export function Inline({ children: content = "" } = {}) {
    return <span>{content}</span>
}

export function Highlight({ children: content = "", color = "red" } = {}) {
    return <span className={color ? color + "-text" : ""}>{content}</span>
}

export function Link({ url = "", content = "" } = {}) {
    return (
        <a className="link" href={url}>
            {content}
        </a>
    )
}
