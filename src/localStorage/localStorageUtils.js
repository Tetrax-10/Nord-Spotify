const LocalStorageUtils = (() => {
    function generateColorSchemesOptions(config) {
        let colorSchemesOptions = {}
        Object.keys(config.colorSchemes).forEach((key) => {
            colorSchemesOptions[key] = config.colorSchemes[key]["Name"]
        })
        colorSchemesOptions.Dynamic = "Nord Dynamic"
        return colorSchemesOptions
    }

    function localStorageInfo(localStorageKey) {
        /* eslint-disable no-console */
        let localStorageAllStringsLength = 0
        let itemLength, item, itemSize, totalSizeOccupied
        console.log("")

        for (item in localStorage) {
            if (!localStorage.hasOwnProperty(item)) {
                continue
            }

            itemLength = (localStorage[item].length + item.length) * 2
            localStorageAllStringsLength += itemLength

            if (item == `${localStorageKey}:settings`) {
                itemSize = itemLength / 1024
                console.log("Nord = " + itemSize.toFixed(2) + " KB")
            }
        }

        totalSizeOccupied = localStorageAllStringsLength / 1024
        console.log("Others       = " + (totalSizeOccupied - itemSize).toFixed(2) + " KB")
        console.log("Total        = " + totalSizeOccupied.toFixed(2) + " KB / 5 MB")
        console.log("")
        /* eslint-enable no-console */
    }

    // duplicated so i dont need to import Utils in LocalStorage
    // I dont want "config not found" issue in Utils
    function makeSmallUri(uri) {
        const [type, uid] = uri.match(/^([^:]*:[^:]*):(.*)$/).slice(1, 3)
        switch (type) {
            case "spotify:album":
                return `a:${uid}`
            case "spotify:local":
                return `l:${uid}`
            case "spotify:playlist":
                return `p:${uid}`
            case "spotify:show":
                return `s:${uid}`
            case "spotify:artist":
                return `ar:${uid}`
            default:
                return uri
        }
    }

    return {
        generateColorSchemesOptions: generateColorSchemesOptions,
        localStorageInfo: localStorageInfo,
        makeSmallUri: makeSmallUri,
    }
})()

export default LocalStorageUtils
