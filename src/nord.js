import Shared from "./shared/shared"
import NordApi from "./expose/expose"

import LocalStorage from "./localStorage/localStorage"
import Utils from "./utils/utils"
import State from "./state/state"

import Banner from "./features/banner/banner"
import Snippet from "./features/snippets/snippets"
import HideWindowsControls from "./features/hideWindowsControls/hideWindowsControls"
import DynamicColors from "./features/colorScheme/dynamicColors/dynamicColors"
import ColorScheme from "./features/colorScheme/colorScheme"
import ImmersiveView from "./features/ImmersiveView/ImmersiveView"

import Popup from "./ui/Popup/Popup"

import SettingsMenu from "./ui/Settings/SettingsMenu"

import ExpFeatures from "./expFeatures/expFeatures"
import UiMode from "./features/uiMode/uiMode"

import Icons from "./icons/icons"

export default async function nord() {
    Shared.SpicetifyConfig.color_scheme = LocalStorage.config.colorScheme

    DynamicColors.utils.disableMarketplaceDynamicColors()
    Utils.utils.unColorLyricsPlus()

    NordApi.expose()

    ImmersiveView()

    Snippet.init()
    await HideWindowsControls.init()
    await State.init()
    await Banner.init()
    await ColorScheme.inject()
    await DynamicColors.inject()

    setTimeout(async () => {
        if (Spicetify.RemoteConfigResolver) {
            ExpFeatures.init()
            await UiMode.createOptions()
            UiMode.repairConfig()
        }
    }, 300)

    const settingsButton = new Spicetify.Topbar.Button("Nord Settings", Icons.settings, () => {
        Popup.createModal({
            title: "Nord Settings",
            isLarge: true,
            content: SettingsMenu,
            callback: () => setTimeout(() => document.querySelector(".nord-search").focus(), 100),
        })
    })

    settingsButton.element.addEventListener("contextmenu", () => (LocalStorage.config.rightClickToReload ? Utils.utils.forceReload() : null))

    Spicetify.Platform.History.listen(async (event) => {
        State.onPageChange(event)
        await Banner.onPageChange()
        await DynamicColors.inject()
    })

    Spicetify.Player.addEventListener("songchange", async (event) => {
        State.onSongChange(event)
        await Banner.onSongChange(event)
        await DynamicColors.inject()
    })
}
