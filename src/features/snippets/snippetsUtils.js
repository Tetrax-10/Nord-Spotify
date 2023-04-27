export function injectSnippetClass(className) {
    className = `nord-${className}`
    if (!document.body.classList.contains(className)) {
        document.body.classList.add(className)
    }
}

export function removeSnippetClass(className) {
    className = `nord-${className}`
    if (document.body.classList.contains(className)) {
        document.body.classList.remove(className)
    }
}

export function injectConditionedSnippetClass(className, shouldEnable = true) {
    shouldEnable ? injectSnippetClass(className) : removeSnippetClass(className)
}

export function injectSnippetClassDynamicUI(classNameNewUI, classNameLibX, classNameOldUI, shouldEnable = true) {
    if (window.Nord.shared.isNewUI && classNameNewUI) {
        injectConditionedSnippetClass(classNameNewUI, shouldEnable)
    } else if (window.Nord.shared.isLibX && classNameLibX) {
        injectConditionedSnippetClass(classNameLibX, shouldEnable)
    } else if (classNameOldUI) {
        injectConditionedSnippetClass(classNameOldUI, shouldEnable)
    }
}
