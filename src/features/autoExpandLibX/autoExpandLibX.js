import Api from "../../services/api"
import Utils from "../../utils/utils"
import conditionalSnippets from "../snippets/externalCssSnippets/conditionalSnippets"
import Snippet from "../snippets/snippets"

export default async function autoExpandLibX() {
    if (!window.Nord.shared.isLibX || !(await Api.app.laterThan("1.2.9"))) return

    const targetElement = await Utils.dom.waitForElement(".main-yourLibraryX-libraryContainer", 1000)

    function toogleLibXExpandedView() {
        if (targetElement.classList.contains("main-yourLibraryX-libraryIsCollapsed")) {
            Snippet.utils.removeClass(conditionalSnippets.hideMainItemSideBar)
        } else {
            Snippet.utils.injectClass(conditionalSnippets.hideMainItemSideBar)
        }
    }

    toogleLibXExpandedView()

    const observer = new MutationObserver((mutation) => {
        mutation = mutation[0]
        if (mutation.target === targetElement && mutation.attributeName === "class") {
            toogleLibXExpandedView()
        }
    })

    observer.observe(targetElement, { attributes: true, attributeFilter: ["class"], subtree: false, childList: false })
}
