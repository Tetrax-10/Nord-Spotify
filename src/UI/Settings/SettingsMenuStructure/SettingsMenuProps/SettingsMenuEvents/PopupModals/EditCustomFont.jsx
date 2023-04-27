import React from "react"

import "./EditColorScheme"

import Popup from "../../../../../Popup/Popup"
import Render from "../../../../../../components/Render/Render"
import MenuComponents from "../../../../../../components/MenuComponents/MenuComponents"
import CustomFont from "../callbacks/customFontEvents"

export default function editCustomFontPopup() {
    const info = (
        <MenuComponents.Text>
            If you have the font installed in your PC, then just enter the font's name else enter both font name and Google font URL
        </MenuComponents.Text>
    )
    const link = <MenuComponents.Link url="https://github.com/Tetrax-10/Nord-Spotify#custom-fonts">Open step-by-step Tutorial</MenuComponents.Link>

    const ActionInputProps = {
        customFontName: {
            name: "Font Name",
            field: "customFontName",
            onChangeHandler: CustomFont.event.updateName,
        },
        customFontURL: {
            name: "Font URL",
            field: "customFontURL",
            onChangeHandler: CustomFont.event.updateURL,
        },
    }

    const ButtonProps = {
        reset: {
            name: "Reset",
            color: "red",
            onClickHandler: CustomFont.event.reset,
        },
        save: {
            name: "Save",
            onClickHandler: CustomFont.event.save,
        },
    }

    const editCustomFontStructure = [
        ["Text", info],
        ["LittleSpace"],
        ["Text", link],
        ["ActionInput", ActionInputProps.customFontName],
        ["ActionInput", ActionInputProps.customFontURL],
        ["Button", ButtonProps.reset],
        ["Button", ButtonProps.save],
    ]

    Popup.createSubModal({
        title: "Custom Font",
        content: () => {
            /* eslint-disable react/no-unknown-property */
            return (
                <>
                    <div className="tetrax-settings-menu" app="Nord" aria-label="Custom Font">
                        <Render>{editCustomFontStructure}</Render>
                    </div>
                </>
            )
            /* eslint-enable react/no-unknown-property */
        },
    })
}
