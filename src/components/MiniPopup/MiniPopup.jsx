import React from "react"
import ReactDOM from "react-dom"

import "./MiniPopup.scss"
import Utils from "../../utils/utils"

export default async function MiniPopup({
    title = "",
    body = "",
    buttonName1 = "",
    onClickHandler1 = () => {},
    buttonName2 = "",
    onClickHandler2 = () => {},
} = {}) {
    const MiniPopupComponent = () => (
        <>
            <div className="GenericModal__overlay">
                <div className="GenericModal">
                    <div className="mini-popup-wrapper">
                        <h2 className="mini-popup-heading">{title}</h2>
                        <p className="mini-popup-body">{body}</p>
                        <div className="encore-light-theme mini-popup-button-wrapper">
                            {buttonName1 ? (
                                <button
                                    className="mini-popup-secondary-button"
                                    onClick={() => {
                                        onClickHandler1()
                                        close()
                                    }}
                                >
                                    {buttonName1}
                                </button>
                            ) : null}
                            <button className="mini-popup-default-button">
                                <span
                                    className="mini-popup-default-button-text encore-bright-accent-set"
                                    onClick={() => {
                                        onClickHandler2()
                                        close()
                                    }}
                                >
                                    {buttonName2}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    const reactModalPortal = document.createElement("div")
    reactModalPortal.className = "ReactModalPortal tetrax-mini-popup"
    document.body.appendChild(reactModalPortal)

    ReactDOM.render(<MiniPopupComponent />, reactModalPortal)

    const modalOverlay = await Utils.dom.waitForElement(".tetrax-mini-popup > .GenericModal__overlay", 1000)

    function close() {
        reactModalPortal.remove()
    }

    if (modalOverlay) {
        modalOverlay.onclick = (e) => {
            if (e.target === modalOverlay) {
                close()
            }
        }
    }
}
