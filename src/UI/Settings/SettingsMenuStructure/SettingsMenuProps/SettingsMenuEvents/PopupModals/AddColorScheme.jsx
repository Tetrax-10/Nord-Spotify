import React from "react"

import Render from "../../../../../../components/Render/Render"
import Shared from "../../../../../../shared/shared"
import Popup from "../../../../../Popup/Popup"
import LocalStorage from "../../../../../../localStorage/localStorage"
import ColorScheme from "../../../../../../features/colorScheme/colorScheme"

export default function addColorSchemePopup() {
    // if user didnt change Based on dropdown use current color scheme
    LocalStorage.tempConfig.baseColorScheme = Shared.SpicetifyConfig.color_scheme

    const TextProps = [
        ["Inline", "If you wanna save this Dynamic Theme just "],
        ["Highlight", "Give it a name"],
        ["Inline", " and make sure "],
        ["Highlight", "Nord Dynamic is selected"],
    ]

    const InputProps = {
        name: "Color Scheme Name",
        disableWhenFieldIsFalse: "bannerBlur",
        onChangeHandler: ColorScheme.event.addPopup.updateName,
    }

    const DropdownProps = {
        name: "Based on",
        value: Shared.SpicetifyConfig.color_scheme,
        options:
            Shared.SpicetifyConfig.color_scheme === "Dynamic"
                ? LocalStorage.extract.colorSchemesOptions
                : (({ Dynamic, ...rest }) => rest)(LocalStorage.extract.colorSchemesOptions), // eslint-disable-line no-unused-vars
        onChangeHandler: ColorScheme.event.addPopup.updateBaseColorScheme,
    }

    const ButtonProps = {
        import: {
            name: "Import from clipboard",
            onClickHandler: ColorScheme.event.addPopup.import,
        },
        save: {
            name: "Save",
            onClickHandler: ColorScheme.event.addPopup.save,
        },
    }

    const createColorSchemeStructure = [
        ["Text", TextProps],
        ["Heading", { name: "Color Scheme Details" }],
        ["Input", InputProps],
        ["Dropdown", DropdownProps],
        ["Button", ButtonProps.import],
        ["Button", ButtonProps.save],
    ]

    Popup.createSubModal({
        title: "Create Color Scheme",
        content: () => {
            /* eslint-disable react/no-unknown-property */
            return (
                <>
                    <div className="tetrax-settings-menu" app="Nord" aria-label="Create Color Scheme">
                        <Render>{createColorSchemeStructure}</Render>
                    </div>
                </>
            )
            /* eslint-enable react/no-unknown-property */
        },
    })
}
