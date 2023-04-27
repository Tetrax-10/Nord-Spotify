import dynamicallyGeneratedConditionalCss from "../../../../features/snippets/dynamicallyGeneratedSnippets/dynamicallyGeneratedConditionalCss/dynamicallyGeneratedConditionalCss"
import dynamicallyGeneratedCss from "../../../../features/snippets/dynamicallyGeneratedSnippets/dynamicallyGeneratedCss/dynamicallyGeneratedCss"
import LocalStorage from "../../../../localStorage/localStorage"
import editCustomFontPopup from "./SettingsMenuEvents/PopupModals/EditCustomFont"
import editWindowsControlsPopup from "./SettingsMenuEvents/PopupModals/editWindowsControls"

export default function getSettingsMultipleActionButtonProps() {
    return {
        hideWindowsControls: {
            name: "Hide Windows Controls",
            buttons: [
                {
                    icon: "edit",
                    info: "Edit windows controls",
                    disableWhenFalse: true,
                    onClickHandler: editWindowsControlsPopup,
                },
                {
                    icon: "check",
                    field: "hideWindowsControls",
                    onClickHandler: () => {
                        dynamicallyGeneratedConditionalCss.utils.inject("hideWindowsControlsCSS", LocalStorage.config.hideWindowsControls)
                        Spicetify.PopupModal.hide()
                    },
                },
            ],
        },
        customFont: {
            name: "Custom Font",
            buttons: [
                {
                    icon: "edit",
                    info: "Edit custom font",
                    disableWhenFalse: true,
                    onClickHandler: editCustomFontPopup,
                },
                {
                    icon: "check",
                    field: "customFont",
                    onClickHandler: () => dynamicallyGeneratedCss.utils.toggle("customFont"),
                },
            ],
        },
    }
}
