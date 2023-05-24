import Utils from "../utils/utils"

const ExpFeatures = (() => {
    let expFeaturesData
    let allAvailableSpotifyExpFeatures

    async function init() {
        if (Spicetify.RemoteConfigResolver) {
            allAvailableSpotifyExpFeatures = Utils.utils.combineMapKeys(
                Spicetify.RemoteConfigResolver.value.localConfiguration.values,
                Spicetify.RemoteConfigResolver.value.remoteConfiguration.values
            )
        }
    }

    function changeExpFeatures(featuresData = { enable: [], disable: [] }) {
        try {
            expFeaturesData = JSON.parse(localStorage.getItem("spicetify-exp-features"))
        } catch (err) {
            console.error(
                `Nord:handled: Can't parse exp features, but \`Spicetify.RemoteConfigResolver\` is found > from: \`ExpFeatures\` > error: ${err}`
            )
            return
        }

        setExpFeatures(featuresData.enable ?? [], true)
        setExpFeatures(featuresData.disable ?? [], false)

        localStorage.setItem("spicetify-exp-features", JSON.stringify(expFeaturesData))
        localStorage.setItem("nord:isReloaded", "true")

        Utils.utils.forceReload()
    }

    function setExpFeatures(features, value) {
        features.forEach((feature) => {
            if (typeof feature === "object") {
                value = feature[1]
                feature = feature[0]
            }

            if (!allAvailableSpotifyExpFeatures.includes(feature)) {
                console.warn(`Nord:handled: exp feature ${feature} not found > from: \`setExpFseatures()\``)
                return
            }

            expFeaturesData[feature] = expFeaturesData[feature] ?? { value: undefined }

            expFeaturesData[feature].value = value
        })
    }

    return {
        init: init,
        change: changeExpFeatures,
    }
})()

export default ExpFeatures
