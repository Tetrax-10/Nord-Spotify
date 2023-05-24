import RegularSnippets from "./externalCssSnippets/regularSnippets"
import JsSnippets from "./jsSnippets/jsSnippets"
import dynamicallyGeneratedCss from "./dynamicallyGeneratedSnippets/dynamicallyGeneratedCss/dynamicallyGeneratedCss"
import { injectConditionedSnippetClass, injectSnippetClass, injectSnippetClassDynamicUI, removeSnippetClass } from "./snippetsUtils"

const Snippet = (() => {
    function initSnippets() {
        if (window.Nord.shared.isLibX) {
            injectSnippetClass("libX")
        } else {
            injectSnippetClass("oldUI")
        }

        // inject regular snippets
        RegularSnippets.snippets.forEach((id) => RegularSnippets.utils.toggle(id))

        // inject dynamically generated snippets
        Object.keys(dynamicallyGeneratedCss.snippets).forEach((id) => dynamicallyGeneratedCss.utils.toggle(id))

        // inject JS snippets
        Object.keys(JsSnippets.snippets).forEach((id) => JsSnippets.utils.toggle(JsSnippets.snippets[id]))
    }

    return {
        init: initSnippets,
        utils: {
            injectClass: injectSnippetClass,
            removeClass: removeSnippetClass,
            injectConditionedClass: injectConditionedSnippetClass,
            injectClassDynamicUI: injectSnippetClassDynamicUI,
        },
    }
})()

export default Snippet
