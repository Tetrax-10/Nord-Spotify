export function injectSnippetClass(className) {
    if (typeof className === "object") {
        document.body.classList.add(...className.map((className) => `nord-${className}`))
        return
    }
    document.body.classList.add(`nord-${className}`)
}

export function removeSnippetClass(className) {
    if (typeof className === "object") {
        document.body.classList.remove(...className.map((className) => `nord-${className}`))
        return
    }
    document.body.classList.remove(`nord-${className}`)
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
