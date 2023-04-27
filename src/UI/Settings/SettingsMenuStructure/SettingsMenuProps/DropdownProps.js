import ColorScheme from "../../../../features/colorScheme/colorScheme"
import DynamicColors from "../../../../features/colorScheme/dynamicColors/dynamicColors"
import Shared from "../../../../shared/shared"
import LocalStorage from "../../../../localStorage/localStorage"
import addColorSchemePopup from "./SettingsMenuEvents/PopupModals/AddColorScheme"
import editColorSchemePopup from "./SettingsMenuEvents/PopupModals/EditColorScheme"
import UiMode from "../../../../features/uiMode/uiMode"

export default function getSettingsDropdownProps() {
    return {
        uiMode: {
            name: "Nord UI mode",
            field: "uiMode",
            options: Shared.uiModeOptions,
            onChangeHandler: UiMode.event.change,
        },
        selectColorScheme: {
            name: "Color Scheme",
            field: "colorScheme",
            options: LocalStorage.extract.colorSchemesOptions,
            onChangeHandler: ColorScheme.event.change,
            buttons: [
                {
                    icon: "edit",
                    info: "Edit current color scheme",
                    visible: () => LocalStorage.config.colorScheme != "Dynamic",
                    onClickHandler: editColorSchemePopup,
                },
                {
                    icon: "plus2px",
                    info: "Create a color scheme",
                    onClickHandler: addColorSchemePopup,
                },
            ],
        },
        selectDynamicColorMode: {
            name: "Dynamic Color Mode",
            field: "dynamicColorMode",
            options: {
                atmos: "Atmosphere (Best)",
                average: "Average of Colors",
                DARK_VIBRANT: "Dark Vibrant",
                LIGHT_VIBRANT: "Light Vibrant",
            },
            onChangeHandler: async () => {
                if (Shared.SpicetifyConfig.color_scheme === "Dynamic") await DynamicColors.inject()
            },
        },
    }
}
