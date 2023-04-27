const Shared = (() => {
    return {
        SpicetifyConfig: Spicetify.Config,
        state: {
            refrestToApply: false,
            isImmersiveView: false,
        },
    }
})()

export default Shared
