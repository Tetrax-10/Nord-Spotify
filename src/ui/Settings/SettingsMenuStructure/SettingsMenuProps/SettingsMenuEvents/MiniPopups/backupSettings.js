import Backup from "../../../../../../backup/backup"
import Popup from "../../../../../Popup/Popup"

export default function backupSettingsMiniPopup() {
    Popup.createMiniPopup({
        title: "Backup Settings",
        body: "What to backup?",
        buttonName1: "Banner Positions",
        buttonName2: "All Settings",
        onClickHandler1: () => Backup.export("banners"),
        onClickHandler2: () => Backup.export("all"),
    })
}
