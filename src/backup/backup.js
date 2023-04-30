import Popup from "../ui/Popup/Popup"
import LocalStorage from "../localStorage/localStorage"
import Api from "../services/api"
import Utils from "../utils/utils"

const Backup = (() => {
    function importData(data, mode = undefined) {
        if (data.hideHomePageRecommendation !== undefined && mode === undefined) {
            LocalStorage.saveConfig(data)

            Api.send.notification("Nord settings restored successfully")
        } else if (data["a:5YDSZWizEYBsXgk6kwxvMn"] !== undefined || data["spotify:album:5YDSZWizEYBsXgk6kwxvMn"] !== undefined) {
            LocalStorage.saveConfig("bannerPosition", data)

            Api.send.notification("Banner positions restored successfully")
        } else {
            Api.send.notification("Falied to Restore, backup data seems to be Corrupted!", true, 4000)
            return
        }

        setTimeout(() => {
            Utils.utils.forceReload()
        }, 500)
    }

    async function importSettings(mode) {
        try {
            const data = await Utils.json.stringToJSON(mode === "file" ? await filePicker() : await Api.clipboard.get())

            if (data.hideHomePageRecommendation !== undefined) {
                Popup.createMiniPopup({
                    title: "Restore Settings",
                    body: "what to Restore?",
                    buttonName1: "banner",
                    buttonName2: "all",
                    onClickHandler1: () => importData(data.bannerPosition, "banner"),
                    onClickHandler2: () => importData(data),
                })
            } else {
                importData(data)
            }
        } catch (err) {
            console.error(`Nord:handled: ${err}`)
            Api.send.notification("Falied to Restore, backup data seems to be Corrupted!", true, 4000)
        }
    }

    function exportSettings(mode) {
        switch (mode) {
            case "all":
                Api.clipboard.send(Utils.json.JSONToString(LocalStorage.config))
                break
            case "banners":
                Api.clipboard.send(Utils.json.JSONToString(LocalStorage.config.bannerPosition))
                break
        }
        Api.send.notification("Export Data Copied to Clipboard")
    }

    async function filePicker() {
        const fileHandle = await window.showOpenFilePicker()
        const file = await fileHandle[0].getFile()
        const text = await file.text()

        return text
    }

    return {
        import: importSettings,
        export: exportSettings,
        utils: {
            filePicker: filePicker,
        },
    }
})()

export default Backup
