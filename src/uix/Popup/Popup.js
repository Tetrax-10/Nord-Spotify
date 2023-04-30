import MiniPopup from "../../components/MiniPopup/MiniPopup"
import PopupModal from "./PopupModal/PopupModal"
import PopupModalUtils from "./PopupModal/PopupModalUtils"

const Popup = (() => {
    return {
        createModal: PopupModal.create,
        createSubModal: PopupModal.createSubModal,
        createMiniPopup: MiniPopup,
        refreshPopup: PopupModalUtils.refreshPopup,
    }
})()

export default Popup
