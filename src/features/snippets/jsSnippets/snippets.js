import LocalStorage from "../../../localStorage/localStorage"
import Utils from "../../../utils/utils"
import { changeKeyBind } from "./jsSnippetsUtils"

export function toggleQuickSearchKeyBind() {
    changeKeyBind({ ctrl: true, key: "space" }, { ctrl: true, key: "k" }, LocalStorage.config.quickSearch)
}

export function toggleSearchPageKeyBind() {
    changeKeyBind({ ctrl: true, key: "/" }, { ctrl: true, key: "l" }, LocalStorage.config.search)
}

export async function toggleRedoKeyBind() {
    const isWindows = await Utils.api.checkOS("Win")
    if (isWindows) {
        if (LocalStorage.config.redo) {
            Spicetify.Mousetrap.bind("ctrl+shift+z", async () => {
                await Spicetify.CosmosAsync.post("sp://desktop/v1/redo")
            })
        } else {
            Spicetify.Mousetrap.unbind("ctrl+shift+z")
        }
    }
}
