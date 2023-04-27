import defaultSettingsJson from "../public/default-settings.json"
import LocalStorageUtils from "./localStorageUtils"

const LocalStorage = ((defaultSettings, localStorageKey) => {
    const defaultConfig = defaultSettings
    let userConfig = initConfig()

    let hideWindowsControlsValues = structuredClone(userConfig.hideWindowsControlsValues)
    let colorSchemes = structuredClone(userConfig.colorSchemes)

    function getLocalStorage(key) {
        return localStorage.getItem(key)
    }

    function setLocalStorage(key, value) {
        localStorage.setItem(key, value)
    }

    function makeConfig(config) {
        // assign default value to config fields if undefined
        Object.keys(defaultConfig).forEach((key) => {
            if (config[key] === undefined) {
                config[key] = defaultConfig[key]
            }
        })
        // remove deprecated fields from config
        Object.keys(config).forEach((key) => {
            if (defaultConfig[key] === undefined) {
                delete config[key]
            }
        })
        // makes sure newly added color schemes are added to config as CONFIG.colorSchemes is never undefined
        Object.keys(defaultConfig.colorSchemes).forEach((key) => {
            if (config.colorSchemes[key] === undefined) {
                config.colorSchemes[key] = defaultConfig.colorSchemes[key]
            }
        })

        // Add backward compatibility to banner positions
        Object.keys(config.bannerPosition).forEach((key) => {
            if (key.includes("spotify:")) {
                const smallUri = LocalStorageUtils.makeSmallUri(key)
                const smallUriValue = config.bannerPosition[key]
                delete config.bannerPosition[key]
                config.bannerPosition[smallUri] = smallUriValue
            }
        })

        saveConfig(config, undefined, true)

        return config
    }

    function initConfig() {
        try {
            let config = JSON.parse(getLocalStorage(`${localStorageKey}:settings`))
            if (config && typeof config === "object") {
                return makeConfig(config)
            }
            throw ""
        } catch (err) {
            console.error(`Nord:handled: ${err}`)
            return makeConfig({})
        }
    }

    function saveConfig(item = undefined, value = undefined, isInit = false) {
        // save individual config field without saving the whole config
        if (item && typeof item === "string" && value !== undefined) {
            userConfig[item] = value
            setLocalStorage(`${localStorageKey}:settings`, JSON.stringify(userConfig))
        }

        // save assigned config to local storage
        if (item && typeof item === "object" && value === undefined) {
            isInit ? null : (userConfig = item)
            setLocalStorage(`${localStorageKey}:settings`, JSON.stringify(item))
        }

        // save current userConfig to local storage
        if (item === undefined && value === undefined) {
            setLocalStorage(`${localStorageKey}:settings`, JSON.stringify(userConfig))
        }
    }

    function resetItem(item) {
        userConfig[item] = defaultConfig[item]
        saveConfig(userConfig)
    }

    return {
        config: userConfig,
        saveConfig: saveConfig,
        defaultConfig: defaultConfig,
        tempConfig: {
            hideWindowsControlsValues: hideWindowsControlsValues,
            colorSchemes: colorSchemes,
            colorSchemeName: undefined,
            baseColorScheme: undefined,
            fontName: undefined,
            fontURL: undefined,
        },
        extract: {
            colorSchemesOptions: LocalStorageUtils.generateColorSchemesOptions(userConfig),
        },
        utils: {
            get: getLocalStorage,
            set: setLocalStorage,
            resetItem: resetItem,
            info: () => LocalStorageUtils.localStorageInfo(localStorageKey),
        },
    }
})(defaultSettingsJson, "nord")

export default LocalStorage
