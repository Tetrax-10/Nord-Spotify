import React from "react"

import "./SettingsMenu.scss"

import Render from "../../components/Render/Render"
import getSettingsMenuStructure from "./SettingsMenuStructure/SettingsMenuStructure"
import injectDiscordServerLink from "./helper/joinDiscord"

export default function SettingsMenu() {
    const SettingsMenuStructure = getSettingsMenuStructure()

    injectDiscordServerLink()

    /* eslint-disable react/no-unknown-property */
    return (
        <>
            <div className="tetrax-settings-menu" app="Nord" aria-label="Nord Settings">
                <Render>{SettingsMenuStructure}</Render>
            </div>
        </>
    )
    /* eslint-enable react/no-unknown-property */
}
