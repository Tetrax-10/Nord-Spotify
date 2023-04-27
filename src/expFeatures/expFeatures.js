import Utils from "../utils/utils"

const ExpFeatures = (() => {
    let expFeaturesData

    function changeExpFeatures(featuresData = { enable: [], disable: [] }) {
        try {
            expFeaturesData = JSON.parse(localStorage.getItem("spicetify-exp-features"))
        } catch (err) {
            console.error(`Nord:handled: can't parse exp features; error: ${err}`)
            return
        }

        setExpFeatures(featuresData.enable ?? [], true)
        setExpFeatures(featuresData.disable ?? [], false)

        localStorage.setItem("spicetify-exp-features", JSON.stringify(expFeaturesData))
        Utils.utils.forceReload()
    }

    function setExpFeatures(features, value) {
        features.forEach((feature) => {
            if (typeof feature === "object") {
                value = feature[1]
                feature = feature[0]
            }

            if (expFeaturesData[feature] === undefined) return

            expFeaturesData[feature].value = value
        })
    }

    return {
        change: changeExpFeatures,
    }
})()

export default ExpFeatures
