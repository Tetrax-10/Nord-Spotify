import LocalStorage from "../../../../localStorage/localStorage"

export function hideWindowsControlsCSS() {
    return `
    body #nord-hideWindowsControls {
        height: ${LocalStorage.tempConfig.hideWindowsControlsValues.height}px;
        width: ${LocalStorage.tempConfig.hideWindowsControlsValues.width}px;
        backdrop-filter: brightness(${LocalStorage.tempConfig.hideWindowsControlsValues.filter});
        position: absolute;
        z-index: 10000;
        top: 0px;
        right: 0px;
    }
    html.fullscreen body #nord-hideWindowsControls {
        z-index: -1;
    }`
}
