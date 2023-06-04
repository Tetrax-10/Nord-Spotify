import Utils from "../../../utils/utils"

export default async function injectDiscordServerLink() {
    const headerSection = await Utils.dom.waitForElement(".main-trackCreditsModal-header", 1000)

    const linkElement = document.createElement("a")
    linkElement.textContent = "Join our discord server for help and discussions"
    linkElement.href = "https://discord.gg/DaUbPmbDwr"
    linkElement.className = "tetrax-settings-discord-link"

    const container = document.createElement("div")
    container.appendChild(document.querySelector("h1.main-type-alto"))
    container.appendChild(linkElement)
    headerSection.prepend(container)
}
