import Api from "../../services/api"
import Utils from "../../utils/utils"
import conditionalSnippets from "../snippets/externalCssSnippets/conditionalSnippets"
import Snippet from "../snippets/snippets"

export default async function autoExpandLibX() {
    if (!window.Nord.shared.isLibX || !(await Api.app.laterThan("1.2.9"))) return

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes" && mutation.attributeName === "class") {
                const topBarContent = document.querySelector(".Root__nav-bar > div:nth-child(2) > div")
                if (topBarContent.classList.contains("main-yourLibraryX-libraryIsCollapsed")) {
                    showMainItemSideBar()
                } else {
                    hideMainItemSideBar()
                }
            }
        }
    })

    const targetNode = await Utils.dom.waitForElement(".Root__nav-bar")
    observer.observe(targetNode, { attributes: true, attributeFilter: ["class"], subtree: true, childList: true })
}

function showMainItemSideBar() {
    Snippet.utils.removeClass(conditionalSnippets.hideMainItemSideBar)
    Snippet.utils.injectClass(conditionalSnippets.showMainItemSideBar)
}

function hideMainItemSideBar() {
    Snippet.utils.removeClass(conditionalSnippets.showMainItemSideBar)
    Snippet.utils.injectClass(conditionalSnippets.hideMainItemSideBar)
}
