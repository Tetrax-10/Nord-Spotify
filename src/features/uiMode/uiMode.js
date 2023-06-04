import ExpFeatures from "../../expFeatures/expFeatures"
import LocalStorage from "../../localStorage/localStorage"
import Api from "../../services/api"
import Shared from "../../shared/shared"

const UiMode = (() => {
    function changeUiMode(mode) {
        let features

        switch (mode) {
            case "libx":
                features = {
                    enable: [
                        "enableYLXSidebar",
                        "enableWhatsNewFeed",
                        "enableRightSidebar",
                        "enableRightSidebarTransitionAnimations",
                        "enableRightSidebarLyrics",
                        "enableRightSidebarCredits",
                    ],
                    disable: ["enableRightSidebarExtractedColors"],
                }
                break
            default:
                features = {
                    disable: ["enableYLXSidebar", "enableWhatsNewFeed", "enableRightSidebar"],
                }
                break
        }

        ExpFeatures.change(features)
    }

    async function createUiModeOptions() {
        Shared.uiModeOptions = { oldui: "Stock" }

        if (await Api.app.laterThan("1.2.9")) {
            Shared.uiModeOptions.libx = "Library X"
        }
    }

    function repairConfig() {
        if (window.Nord.shared.isLibX) {
            LocalStorage.config.uiMode = "libx"
        } else {
            LocalStorage.config.uiMode = "oldui"
        }

        LocalStorage.saveConfig("uiMode", LocalStorage.config.uiMode)
    }

    return {
        createOptions: createUiModeOptions,
        repairConfig: repairConfig,
        event: {
            change: changeUiMode,
        },
    }
})()

export default UiMode
