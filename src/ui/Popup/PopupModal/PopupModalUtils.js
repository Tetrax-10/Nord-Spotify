import conditionalSnippets from "../../../features/snippets/externalCssSnippets/conditionalSnippets"
import Shared from "../../../shared/shared"
import Utils from "../../../utils/utils"
import Popup from "../Popup"
import Snippet from "../../../features/snippets/snippets"

const PopupModalUtils = (() => {
    // unused
    async function onPopupClose() {
        const closeButton = await Utils.dom.waitForElement("body > generic-modal button.main-trackCreditsModal-closeBtn", 1000)
        const modalOverlay = await Utils.dom.waitForElement("body > generic-modal > div", 1000)

        if (!closeButton || !modalOverlay) return // exit if either element is missing

        closeButton.onclick = () => {
            Spicetify.PopupModal.hide()
            if (Shared.state.refrestToApply) refreshPopup()
        }

        modalOverlay.onclick = (e) => {
            if (e.target === modalOverlay && Shared.state.refrestToApply) refreshPopup()
        }
    }

    function refreshPopup() {
        Popup.createMiniPopup({
            title: "Refresh",
            body: "Refresh to apply changes?",
            buttonName1: "Cancel",
            buttonName2: "Refresh",
            onClickHandler2: () => location.reload(),
        })
    }

    async function hideModalOverlay() {
        Snippet.utils.injectClass(conditionalSnippets.hideModalOverlay)
        if (await Utils.dom.waitForElementDeath(".GenericModal")) {
            Snippet.utils.removeClass(conditionalSnippets.hideModalOverlay)
        }
    }

    async function makePopupDraggable() {
        Snippet.utils.injectClass(conditionalSnippets.hideModalOverlay)
        Snippet.utils.injectClass(conditionalSnippets.injectPopupCSS)

        let mousePosition
        let offset = [0, 0]
        let isDown = false

        let div = await Utils.dom.waitForElement(".GenericModal")
        div.style.position = "absolute"

        function handleMouseDown(e) {
            isDown = true
            offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY]
        }

        function handleMouseUp() {
            isDown = false
        }

        function handleMouseMove(event) {
            event.preventDefault()
            if (isDown) {
                mousePosition = {
                    x: event.clientX,
                    y: event.clientY,
                }
                div.style.left = mousePosition.x + offset[0] + "px"
                div.style.top = mousePosition.y + offset[1] + "px"
            }
        }

        div.addEventListener("mousedown", handleMouseDown, true)
        document.addEventListener("mouseup", handleMouseUp, true)
        document.addEventListener("mousemove", handleMouseMove, true)

        if (await Utils.dom.waitForElementDeath(".GenericModal")) {
            Snippet.utils.removeClass(conditionalSnippets.injectPopupCSS)
            Snippet.utils.removeClass(conditionalSnippets.hideModalOverlay)

            div.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("mousemove", handleMouseMove)
        }
    }

    return {
        refreshPopup: refreshPopup,
        hideModalOverlay: hideModalOverlay,
        makePopupDraggable: makePopupDraggable,
    }
})()

export default PopupModalUtils
