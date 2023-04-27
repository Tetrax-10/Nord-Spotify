import { toggleQuickSearchKeyBind, toggleSearchPageKeyBind, toggleRedoKeyBind } from "./snippets"

const JsSnippets = (() => {
    const snippets = {
        quickSearch: toggleQuickSearchKeyBind,
        search: toggleSearchPageKeyBind,
        redo: toggleRedoKeyBind,
    }

    function runJsSnippetCode(callback = () => {}) {
        callback()
    }

    return {
        snippets: snippets,
        utils: {
            toggle: runJsSnippetCode,
        },
    }
})()

export default JsSnippets
