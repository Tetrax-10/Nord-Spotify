import React from "react"

export default function Text({ children = "" } = {}) {
    const hasHighlight = React.Children.toArray(children).some((child) => child.type && child.type.name === "Highlight")

    return (
        <>
            {hasHighlight ? (
                <div className="popup-row">
                    <p className="col description">
                        <span>{children}</span>
                    </p>
                </div>
            ) : (
                <div className="popup-row">
                    <p className="col description">{children}</p>
                </div>
            )}
        </>
    )
}

export function Highlight({ children: text = "", color = "red" } = {}) {
    return <span className={color ? color + "-text" : ""}>{text}</span>
}

export function Link({ url = "", children: text = "" } = {}) {
    return (
        <div className="popup-row">
            <a className="link" href={url}>
                {text}
            </a>
        </div>
    )
}
