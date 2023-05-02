import LocalStorage from "../../../localStorage/localStorage"
import Snippet from "../snippets"

// snippet injection is automated in -> src/features/snippets/snippets.js
// css is present in theme/src/snippets/regular-snippets/_regular-snippets.scss

const RegularSnippets = (() => {
    const snippets = [
        "hideHomePageRecommendation",
        "hideLikedSongsCard",
        "hideSimilarSongsRecommendation",
        "hidePlaylistImageEditButton",
        "hoverTime",
        "hideDefaultCoverArt",
        "centeredLyrics",
        "autoExpandLibX",
    ]

    function toggle(id) {
        LocalStorage.config[id] ? Snippet.utils.injectClass(id) : Snippet.utils.removeClass(id)
    }

    return {
        snippets: snippets,
        utils: {
            toggle: toggle,
        },
    }
})()

export default RegularSnippets
