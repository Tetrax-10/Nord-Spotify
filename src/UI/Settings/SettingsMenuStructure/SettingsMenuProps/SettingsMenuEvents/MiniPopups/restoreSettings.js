import Backup from "../../../../../../backup/backup"
import Popup from "../../../../../Popup/Popup"

export default function restoreSettingsMiniPopup() {
    Popup.createMiniPopup({
        title: "Restore Settings",
        body: "Restore from?",
        buttonName1: "Clipboard",
        buttonName2: "File",
        onClickHandler1: () => Backup.import("clipboard"),
        onClickHandler2: () => Backup.import("file"),
    })
}
