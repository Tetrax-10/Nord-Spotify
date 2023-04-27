import Utils from "../../../../../../utils/utils"
import Popup from "../../../../../Popup/Popup"

export default function resetSettingsMiniPopup() {
    Popup.createMiniPopup({
        title: "Reset Settings",
        body: "Are you sure you wanna reset?",
        buttonName1: "Cancel",
        buttonName2: "Reset",
        onClickHandler2: () => {
            Spicetify.LocalStorage.remove("nord:settings")
            Utils.utils.forceReload()
        },
    })
}
