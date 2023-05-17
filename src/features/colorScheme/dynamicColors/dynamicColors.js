import chroma from "chroma-js"

import Shared from "../../../shared/shared"
import State from "../../../state/state"
import LocalStorage from "../../../localStorage/localStorage"
import Utils from "../../../utils/utils"
import ColorScheme from "../colorScheme"

const DynamicColors = (() => {
    async function inject() {
        if (Shared.SpicetifyConfig.color_scheme === "Dynamic" && State.app.shouldChangeProp) {
            let colorPalette = await createDynamicColors()
            State.app.dynamicColorPalette = colorPalette
            updateDynamicColors(colorPalette)
        }
    }

    async function createDynamicColors() {
        try {
            let mainColors, colorMode, formatedImage, colorPalette
            let rawImage = State.app.image.split("/") // bug

            if (State.app.image.includes("mosaic.scdn.co")) {
                formatedImage = `spotify:mosaic:${rawImage
                    .pop()
                    .match(/.{1,40}/g)
                    .join(":")}`
            } else {
                if (1 < rawImage.length) {
                    formatedImage = `spotify:image:${rawImage.pop()}`
                } else {
                    formatedImage = rawImage.pop()
                }
            }

            if (State.app.islocal) {
                colorMode = "average"
            } else {
                colorMode = LocalStorage.config.dynamicColorMode
            }

            switch (colorMode) {
                case "atmos":
                    mainColors = await fetchDynamicColor(formatedImage)
                    colorPalette = singleColorToPalette(mainColors.dark)
                    break
                case "average":
                    let image = new Image()
                    image.src = formatedImage
                    colorPalette = await new Promise((resolve) => {
                        image.onload = () => {
                            let { R, G, B } = getAverageColor(image, 4)
                            let palette = singleColorToPalette(`rgb(${R},${G},${B})`)
                            resolve(palette)
                        }
                    })
                    break
                case "DARK_VIBRANT":
                case "LIGHT_VIBRANT":
                    mainColors = await Spicetify.colorExtractor(State.app.uri)
                    colorPalette = singleColorToPalette(mainColors[LocalStorage.config.dynamicColorMode])
                    break
            }

            return colorPalette
        } catch (err) {
            console.error(`Nord:unexpected: Can't create dynamic colors > from: \`createDynamicColors()\` > error: ${err}`)
        }
    }

    function getAverageColor(imageElement, ratio) {
        let canvas = document.createElement("canvas")

        let height = (canvas.height = imageElement.naturalHeight)
        let width = (canvas.width = imageElement.naturalHeight)

        let context = canvas.getContext("2d")
        context.drawImage(imageElement, 0, 0, width, height)

        let data, length
        let i = -4
        let count = 0

        try {
            data = context.getImageData(0, 0, width, height)
            length = data.data.length
        } catch (err) {
            return {
                R: 0,
                G: 0,
                B: 0,
            }
        }
        let R, G, B
        R = G = B = 0

        while ((i += ratio * 4) < length) {
            ++count

            R += data.data[i]
            G += data.data[i + 1]
            B += data.data[i + 2]
        }

        R = ~~(R / count)
        G = ~~(G / count)
        B = ~~(B / count)

        /* eslint-disable object-shorthand */
        return {
            R,
            G,
            B,
        }
        /* eslint-enable object-shorthand */
    }

    async function fetchDynamicColor(dynamicImageUri) {
        try {
            let rawData = await Spicetify.CosmosAsync.get(
                encodeURI(
                    `https://api-partner.spotify.com/pathfinder/v1/query?operationName=fetchExtractedColors&variables={"uris":["${dynamicImageUri}"]}&extensions={"persistedQuery":{"version":1,"sha256Hash":"d7696dd106f3c84a1f3ca37225a1de292e66a2d5aced37a66632585eeb3bbbfa"}}`
                )
            )

            let extractedColors = rawData.data.extractedColors[0]
            return { dark: extractedColors.colorDark.hex, light: extractedColors.colorLight.hex, raw: extractedColors.colorRaw.hex }
        } catch (err) {
            console.error(
                `Nord:unexpected: can't fetch dynamic color from Spotify API (atmosphere mode) > from: \`fetchDynamicColor()\` > error: ${err}`
            )
        }
    }

    function singleColorToPalette(mainColor) {
        let mixingColor = "#2A2A2A"
        let mixedMainColor = chroma.mix(mainColor, mixingColor, 0.57, "rgb")

        let colorPalette = {
            Name: "Dynamic",
            notificationError: "#A9555E",
            playbackBar: "#DEDEDE",
            selectedRow: "#DEDEDE",
            customSuccess: "#76BA99",
        }

        colorPalette.main = colorPalette.player = colorPalette.card = mixedMainColor.hex()
        colorPalette.customMainSoftSecondary = colorPalette.notification = colorPalette.tabActive = mixedMainColor.brighten(0.23).hex()
        colorPalette.customMainSecondary = mixedMainColor.brighten(0.38).hex()
        colorPalette.sidebar = chroma.mix(mainColor, "#1F1F1F", 0.6, "rgb").hex()
        colorPalette.button = mixedMainColor.brighten(1.5).hex()
        colorPalette.buttonActive = mixedMainColor.brighten(1.8).hex()
        colorPalette.buttonDisabled = colorPalette.misc = mixedMainColor.brighten(0.6).hex()
        colorPalette.shadow = chroma.mix(mixedMainColor, "#000000", 0.95).hex()
        colorPalette.text = colorPalette.subtext = mixedMainColor.brighten(2.3).hex()
        colorPalette.customSubdued = mixedMainColor.brighten(1.6).hex()
        colorPalette.customLinkHover = mixedMainColor.brighten(3).hex()
        colorPalette.customSelectedButton = colorPalette.customHighlight = mixedMainColor.brighten(1).hex()

        return colorPalette
    }

    function updateDynamicColors(colorPalette) {
        Utils.dom.removeInjectedElement("Dynamic")
        Utils.dom.injectCSS(ColorScheme.create(colorPalette), "Dynamic")
    }

    function disableMarketplaceDynamicColors() {
        if (LocalStorage.utils.get("marketplace:albumArtBasedColors") != "false") {
            LocalStorage.utils.set("marketplace:albumArtBasedColors", "false")
            Utils.utils.forceReload()
        }
    }

    return {
        inject: inject,
        utils: {
            disableMarketplaceDynamicColors: disableMarketplaceDynamicColors,
        },
    }
})()

export default DynamicColors
