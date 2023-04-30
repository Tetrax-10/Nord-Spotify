import PopupModalUtils from "./PopupModalUtils"

const PopupModal = (() => {
    function createModal({ title = "", content = () => {}, isLarge = false, hideOverlay = false, isDraggable = false, callback = () => {} } = {}) {
        Spicetify.PopupModal.display({
            title: title,
            content: content(),
            isLarge: isLarge,
        })

        // onPopupClose() // uncomment if you wanna trigger refresh mini popup
        if (hideOverlay) PopupModalUtils.hideModalOverlay()
        if (isDraggable) PopupModalUtils.makePopupDraggable()
        callback()
    }

    function createSubModal({ title = "", content = () => {}, isLarge = false, hideOverlay = false, isDraggable = false, callback = () => {} } = {}) {
        Spicetify.PopupModal.hide()

        setTimeout(() => {
            createModal({
                title: title,
                content: content,
                isLarge: isLarge,
                hideOverlay: hideOverlay,
                isDraggable: isDraggable,
                callback: callback,
            })
        }, 10)
    }

    return {
        create: createModal,
        createSubModal: createSubModal,
    }
})()

export default PopupModal
