import LocalStorage from "../../../../localStorage/localStorage"

export function hideWindowsControlsCSS() {
    return `
    body #nord-hideWindowsControls {
        height: ${LocalStorage.tempConfig.hideWindowsControlsValues.height}px;
        width: ${LocalStorage.tempConfig.hideWindowsControlsValues.width}px;
        background-color: ${window.Nord.shared.isNewUI || window.Nord.shared.isLibX ? "var(--spice-sidebar)" : "var(--spice-main)"};
        position: absolute;
        filter: brightness(${LocalStorage.tempConfig.hideWindowsControlsValues.filter});
        top: 0px;
        right: 0px;
    }`
}
