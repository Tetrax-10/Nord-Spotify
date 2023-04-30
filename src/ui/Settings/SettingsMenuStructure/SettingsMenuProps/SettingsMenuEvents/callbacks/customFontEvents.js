import dynamicallyGeneratedCss from "../../../../../../features/snippets/dynamicallyGeneratedSnippets/dynamicallyGeneratedCss/dynamicallyGeneratedCss"
import LocalStorage from "../../../../../../localStorage/localStorage"
import Utils from "../../../../../../utils/utils"

const CustomFont = (() => {
    function updateName(name) {
        LocalStorage.tempConfig.fontName = name
    }

    function updateURL(url) {
        LocalStorage.tempConfig.fontURL = url
    }

    function updateFont() {
        Utils.dom.removeInjectedElement("customFont")
        dynamicallyGeneratedCss.utils.toggle("customFont")
    }

    function resetFont() {
        LocalStorage.config.customFontName = LocalStorage.defaultConfig.customFontName
        LocalStorage.config.customFontURL = LocalStorage.defaultConfig.customFontURL
        LocalStorage.saveConfig("customFontName", LocalStorage.config.customFontName)
        LocalStorage.saveConfig("customFontURL", LocalStorage.config.customFontURL)

        updateFont()
    }

    return {
        event: {
            updateName: updateName,
            updateURL: updateURL,
            save: updateFont,
            reset: resetFont,
        },
    }
})()

export default CustomFont
