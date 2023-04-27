import preload from "./preload/preload"
import nord from "./nord"

export default async function initNord() {
    while (!(Spicetify.Platform && Spicetify.Player && Spicetify.CosmosAsync)) {
        await new Promise((resolve) => setTimeout(resolve, 10))
    }

    await preload()
    await nord()
}
