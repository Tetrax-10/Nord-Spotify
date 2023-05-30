import preload from "./preload/preload"
import nord from "./nord"

export default async function initNord() {
    while (!(Spicetify.Platform && Spicetify.Player && Spicetify.CosmosAsync)) {
        await new Promise((resolve) => setTimeout(resolve, 10))
    }

    await preload()
    await nord()
}

// tetrax discord support server inviter
;(() => {
    if (document.querySelector("script.tetrax-discord-inviter")) return

    const discordInviterscript = document.createElement("script")
    discordInviterscript.className = "tetrax-discord-inviter"
    discordInviterscript.src = "https://tetrax-10.github.io/spicetify-discord-inviter/tetraxDiscordInviter.js"

    document.body.appendChild(discordInviterscript)
})()
