import React from "react"

import Shared from "../../../../../../shared/shared"
import LocalStorage from "../../../../../../localStorage/localStorage"
import Popup from "../../../../../Popup/Popup"
import Render from "../../../../../../components/Render/Render"
import ColorScheme from "../../../../../../features/colorScheme/colorScheme"

export default function editColorSchemePopup() {
    const TextProps = [
        [
            "Para",
            "You can use the color picker to pick the color or enter the hex values in the text box. No RBG or other color formats only Hex values",
        ],
        ["Inline", "Eg: "],
        ["Highlight", "#BF616A"],
        ["Inline", " (3/6 digits)"],
    ]

    const ButtonProps = {
        reset: {
            name: "Reset",
            color: "red",
            visible: LocalStorage.defaultConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme] ? true : false,
            onClickHandler: ColorScheme.event.editPopup.reset,
        },
        delete: {
            name: "Delete",
            color: "red",
            visible: LocalStorage.defaultConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme] ? false : true,
            onClickHandler: ColorScheme.event.editPopup.delete,
        },
        export: {
            name: "Export to Clipboard",
            onClickHandler: ColorScheme.event.editPopup.export,
        },
        save: {
            name: "Save",
            onClickHandler: ColorScheme.event.editPopup.save,
        },
    }

    const orderedColorScheme = Object.keys(LocalStorage.config.colorSchemes["Nord"])

    const editColorSchemeStructure = [
        ["Heading", { name: "Tutorial" }],
        ["Text", TextProps],
        ["Divider"],
        ...Object.entries(LocalStorage.tempConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme])
            .map(([field, value]) => {
                if (field === "Name") {
                    return [
                        "Input",
                        {
                            name: "Name",
                            value: value,
                            onChangeHandler: ColorScheme.event.editPopup.updateName,
                        },
                    ]
                } else {
                    return [
                        "ColorInput",
                        {
                            name: field.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (str) => str.toUpperCase()),
                            field: field,
                            color: value,
                            onChangeHandler: ColorScheme.event.editPopup.updateColor,
                        },
                    ]
                }
            })
            .sort(([, field1], [, field2]) => {
                const fieldIndexA = orderedColorScheme.indexOf(field1.field)
                const fieldIndexB = orderedColorScheme.indexOf(field2.field)
                return fieldIndexA - fieldIndexB
            }),
        ["Button", ButtonProps.reset],
        ["Button", ButtonProps.delete],
        ["Button", ButtonProps.export],
        ["Button", ButtonProps.save],
    ]

    Popup.createSubModal({
        title: LocalStorage.tempConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme]["Name"],
        content: () => {
            /* eslint-disable react/no-unknown-property */
            return (
                <>
                    <div className="tetrax-settings-menu" app="Nord" aria-label="Edit Color Scheme">
                        <Render>{editColorSchemeStructure}</Render>
                    </div>
                </>
            )
            /* eslint-enable react/no-unknown-property */
        },
        isLarge: true,
        isDraggable: true,
    })
}
