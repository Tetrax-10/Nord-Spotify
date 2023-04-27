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
                        "enableRightSidebar",
                        "enableRightSidebarTransitionAnimations",
                        "enableRightSidebarLyrics",
                        "enableWhatsNewFeed",
                    ],
                    disable: ["enableRightSidebarExtractedColors", ["enableNavAltExperiment2", "DISABLED"]],
                }
                break
            case "newui":
                features = {
                    enable: [["enableNavAltExperiment2", "ENABLED_CENTER"]],
                    disable: [
                        "enableYLXSidebar",
                        "enableRightSidebar",
                        "enableRightSidebarTransitionAnimations",
                        "enableRightSidebarLyrics",
                        "enableWhatsNewFeed",
                    ],
                }
                break
            default:
                features = {
                    disable: [
                        "enableYLXSidebar",
                        "enableRightSidebar",
                        "enableRightSidebarTransitionAnimations",
                        "enableRightSidebarLyrics",
                        "enableWhatsNewFeed",
                        "enableRightSidebarExtractedColors",
                        ["enableNavAltExperiment2", "DISABLED"],
                    ],
                }
                break
        }

        ExpFeatures.change(features)
    }

    async function createUiModeOptions() {
        Shared.uiModeOptions = { oldui: "Old UI" }

        if (await Api.app.laterThan("1.2.9")) {
            Shared.uiModeOptions.libx = "Library X"
        }

        if ((await Api.app.laterThan("1.2.2")) && (await Api.app.earlierThan("1.2.3"))) {
            Shared.uiModeOptions.newui = "New UI"
        }
    }

    function repairConfig() {
        if (window.Nord.shared.isLibX) {
            LocalStorage.config.uiMode = "libx"
        } else if (window.Nord.shared.isNewUI) {
            LocalStorage.config.uiMode = "newui"
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
