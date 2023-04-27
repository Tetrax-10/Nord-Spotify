import LocalStorage from "../../localStorage/localStorage"
import Utils from "../../utils/utils"
import dynamicallyGeneratedConditionalCss from "../snippets/dynamicallyGeneratedSnippets/dynamicallyGeneratedConditionalCss/dynamicallyGeneratedConditionalCss"

export function injectWindowsControlsBgDiv() {
    const id = "nord-hideWindowsControls"
    const element = document.createElement("div")
    element.id = id
    document.body.appendChild(element)
    document.body.classList.add(id)
}

export function updateWindowsControls(field, value) {
    LocalStorage.tempConfig.hideWindowsControlsValues[field] = value
    Utils.dom.removeInjectedElement("hideWindowsControlsCSS")
    dynamicallyGeneratedConditionalCss.utils.inject("hideWindowsControlsCSS", false)
    dynamicallyGeneratedConditionalCss.utils.inject("hideWindowsControlsCSS", LocalStorage.config.hideWindowsControls)
}
