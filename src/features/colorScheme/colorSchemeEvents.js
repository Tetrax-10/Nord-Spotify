import chroma from "chroma-js"

import LocalStorage from "../../localStorage/localStorage"
import Shared from "../../shared/shared"
import ColorScheme from "./colorScheme"
import Utils from "../../utils/utils"
import Api from "../../services/api"
import State from "../../state/state"
import { deleteTempColors, injectColorScheme } from "./colorSchemeUtils"

export function updateColor(field, hex) {
    try {
        hex = chroma(hex).hex().toUpperCase()
        update(hex.slice(0, 7)) // avoids transparent colors
    } catch (err) {
        console.warn(`Nord:handled: Not a hex value > from: \`updateColor()\` > error: ${err}`)
        hex = LocalStorage.config.colorSchemes[Shared.SpicetifyConfig.color_scheme][field].toUpperCase()
        update(hex)
    }

    function update(hex) {
        LocalStorage.tempConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme][field] = hex
        document.documentElement.style.setProperty(ColorScheme.utils.keyToSpiceVar(field, "--spice-"), hex)
        const [r, g, b] = ColorScheme.utils.hexToRgb(hex)
        document.documentElement.style.setProperty(ColorScheme.utils.keyToSpiceVar(field, "--spice-rgb-"), `${r},${g},${b}`)
    }
}

export function resetColorScheme() {
    LocalStorage.config.colorSchemes[Shared.SpicetifyConfig.color_scheme] =
        LocalStorage.defaultConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme]

    LocalStorage.tempConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme] =
        LocalStorage.defaultConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme]

    LocalStorage.extract.colorSchemesOptions[Shared.SpicetifyConfig.color_scheme] =
        LocalStorage.defaultConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme]["Name"]

    LocalStorage.saveConfig("colorSchemes", LocalStorage.config.colorSchemes)

    // update colorScheme (UI)
    refreshColorScheme()
}

export function deleteColorScheme() {
    delete LocalStorage.config.colorSchemes[Shared.SpicetifyConfig.color_scheme]
    delete LocalStorage.tempConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme]
    delete LocalStorage.extract.colorSchemesOptions[Shared.SpicetifyConfig.color_scheme]

    LocalStorage.saveConfig("colorScheme", "Nord")
    LocalStorage.saveConfig("colorSchemes", LocalStorage.config.colorSchemes)

    // update colorScheme (UI)
    refreshColorScheme()
}

export function exportColorScheme() {
    Api.clipboard.send(Utils.json.JSONToString(LocalStorage.tempConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme]))
    Api.send.notification("Color Scheme Copied to Clipboard")
}

export function saveColorScheme() {
    LocalStorage.config.colorSchemes[Shared.SpicetifyConfig.color_scheme] = LocalStorage.tempConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme]
    LocalStorage.saveConfig("colorSchemes", LocalStorage.config.colorSchemes)
}

export function updateColorSchemeNameEdit(name) {
    LocalStorage.tempConfig.colorSchemes[Shared.SpicetifyConfig.color_scheme]["Name"] = name
    LocalStorage.extract.colorSchemesOptions[Shared.SpicetifyConfig.color_scheme] = name
}

export function updateColorSchemeNameAdd(value) {
    LocalStorage.tempConfig.colorSchemeName = value
}

export function updateBaseColorScheme(value) {
    LocalStorage.tempConfig.baseColorScheme = value
}

export async function importColorScheme() {
    const importedData = await Api.clipboard.get()

    try {
        const importedColorScheme = Utils.json.stringToJSON(importedData)

        const name = importedColorScheme.Name
        const nameObject = Utils.utils.camalize(name)

        hotUpdateConfig(name, nameObject, importedColorScheme)

        refreshColorScheme()
    } catch (err) {
        const errorMessage = "Import failed, make sure you copied it correctly"

        console.warn(`Nord:handled: ${errorMessage} > from: \`importColorScheme()\` > error: ${err}`)
        Api.send.notification(errorMessage, true)
    }
}

export function createColorSchemeBasedOnOther() {
    if (!LocalStorage.tempConfig.colorSchemeName) {
        Api.send.notification("Give your Color Scheme a Name", true)
        return
    }

    const name = LocalStorage.tempConfig.colorSchemeName.trim()
    const basedOn = LocalStorage.tempConfig.baseColorScheme
    const nameObject = Utils.utils.camalize(name)

    if (LocalStorage.extract.colorSchemesOptions[nameObject]) {
        Api.send.notification("Color Scheme already exist, you can edit it", true)
    } else {
        if (Shared.SpicetifyConfig.color_scheme === "Dynamic") {
            hotUpdateConfig(name, nameObject, State.app.dynamicColorPalette)
        } else {
            hotUpdateConfig(name, nameObject, structuredClone(LocalStorage.config.colorSchemes[basedOn]))
        }

        refreshColorScheme()
    }
}

function refreshColorScheme() {
    injectColorScheme(LocalStorage.config.colorScheme)
    deleteTempColors()
}

function hotUpdateConfig(name, nameObject, colorScheme) {
    LocalStorage.config.colorSchemes[nameObject] = colorScheme

    LocalStorage.config.colorSchemes[nameObject]["Name"] = name
    LocalStorage.tempConfig.colorSchemes = LocalStorage.config.colorSchemes

    LocalStorage.config.colorScheme = nameObject

    LocalStorage.extract.colorSchemesOptions[nameObject] = name

    LocalStorage.saveConfig("colorSchemes", LocalStorage.config.colorSchemes)
    LocalStorage.saveConfig("colorScheme", LocalStorage.config.colorScheme)
}
