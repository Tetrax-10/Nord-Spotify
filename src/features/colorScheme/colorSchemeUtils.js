import chroma from "chroma-js"

import LocalStorage from "../../localStorage/localStorage"
import Shared from "../../shared/shared"
import ColorScheme from "./colorScheme"
import Utils from "../../utils/utils"
import DynamicColors from "./dynamicColors/dynamicColors"

export function createColorScheme(colors) {
    let cssVariables = ""

    //bug
    Object.entries(colors).forEach(([field, hex]) => {
        if (field === "Name") return

        field === "sidebar" ? (hex = window.Nord.shared.isNewUI || window.Nord.shared.isLibX ? colors.sidebar : colors.main) : null

        const spiceVar = keyToSpiceVar(field, "--spice-")
        const rgbSpiceVar = keyToSpiceVar(field, "--spice-rgb-")

        const [r, g, b] = hexToRgb(hex)

        cssVariables += `
            ${spiceVar}: ${hex};
            ${rgbSpiceVar}: ${r},${g},${b};
        `
    })

    return `:root {
        ${cssVariables}
    }`
}

export async function injectColorScheme(colorScheme = LocalStorage.config.colorScheme) {
    Utils.dom.removeInjectedElement(Shared.SpicetifyConfig.color_scheme)

    Shared.SpicetifyConfig.color_scheme = colorScheme

    if (colorScheme == "Dynamic") {
        await DynamicColors.inject()
    } else {
        Utils.dom.injectCSS(createColorScheme(LocalStorage.config.colorSchemes[colorScheme]), colorScheme)
    }
}

export function keyToSpiceVar(field, prefix) {
    const words = field.match(/[A-Za-z][a-z]*/g)
    const convertedWords = words.map((word) => word.toLowerCase())
    const convertedClassName = prefix + convertedWords.join("-")

    return convertedClassName
}

export function hexToRgb(hex) {
    return chroma(hex).rgb()
}

export function changeColorScheme() {
    deleteTempColors()
    injectColorScheme()
}

export function deleteTempColors() {
    Object.keys(LocalStorage.config.colorSchemes["Nord"]).forEach((field) => {
        document.documentElement.style.removeProperty(ColorScheme.utils.keyToSpiceVar(field, "--spice-"))
        document.documentElement.style.removeProperty(ColorScheme.utils.keyToSpiceVar(field, "--spice-rgb-"))
    })
}
