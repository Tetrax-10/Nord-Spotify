import LocalStorage from "../localStorage/localStorage"
import Utils from "../utils/utils"

const NordApi = (() => {
    window.Nord = window.Nord ?? {}

    function expose() {
        window.Nord.config = LocalStorage.config
        window.Nord.save = LocalStorage.saveConfig
        window.Nord.resetItem = LocalStorage.utils.resetItem
        window.Nord.reload = Utils.utils.forceReload
        window.Nord.localStorageInfo = LocalStorage.utils.info
        window.Nord.reset = () => {
            localStorage.removeItem("nord:settings")
            console.log("%cNord Settings Reset Successful", "color: #59CE8F") // eslint-disable-line no-console
            Utils.utils.forceReload()
        }
    }

    return {
        expose: expose,
    }
})()

export default NordApi
