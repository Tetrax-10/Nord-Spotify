import { changeColorScheme, createColorScheme, hexToRgb, injectColorScheme, keyToSpiceVar } from "./colorSchemeUtils"
import {
    createColorSchemeBasedOnOther,
    deleteColorScheme,
    exportColorScheme,
    importColorScheme,
    resetColorScheme,
    saveColorScheme,
    updateBaseColorScheme,
    updateColorSchemeNameAdd,
    updateColorSchemeNameEdit,
    updateColor,
} from "./colorSchemeEvents"

const ColorScheme = (() => {
    return {
        create: createColorScheme,
        inject: injectColorScheme,
        utils: {
            keyToSpiceVar: keyToSpiceVar,
            hexToRgb: hexToRgb,
        },
        event: {
            change: changeColorScheme,
            editPopup: {
                updateColor: updateColor,
                updateName: updateColorSchemeNameEdit,
                delete: deleteColorScheme,
                reset: resetColorScheme,
                export: exportColorScheme,
                save: saveColorScheme,
            },
            addPopup: {
                updateName: updateColorSchemeNameAdd,
                updateBaseColorScheme: updateBaseColorScheme,
                import: importColorScheme,
                save: createColorSchemeBasedOnOther,
            },
        },
    }
})()

export default ColorScheme
