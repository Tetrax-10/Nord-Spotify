import getSettingsDropdownProps from "./SettingsMenuProps/DropdownProps"
import getSettingsActionInputProps from "./SettingsMenuProps/ActionInputProps"
import getSettingsMultipleActionButtonProps from "./SettingsMenuProps/MultipleActionButtonProps"
import LinkActionButtonProps from "./SettingsMenuProps/LinkActionButtonProps"
import ActionButtonProps from "./SettingsMenuProps/ActionButtonProps"
import getSettingsButtonProps from "./SettingsMenuProps/ButtonProps"

export default function getSettingsMenuStructure() {
    const SettingsDropdownProps = getSettingsDropdownProps()
    const SettingsMultipleActionButtonProps = getSettingsMultipleActionButtonProps()
    const SettingsActionInputProps = getSettingsActionInputProps()
    const ButtonProps = getSettingsButtonProps()

    return [
        ["SearchBar", { placeholder: "Search for a feature" }],
        ["Heading", { name: "Settings" }],
        ["Dropdown", SettingsDropdownProps.selectColorScheme],
        ["Dropdown", SettingsDropdownProps.selectDynamicColorMode],
        ["Dropdown", SettingsDropdownProps.uiMode],
        ["MultipleActionButton", SettingsMultipleActionButtonProps.hideWindowsControls],
        ["MultipleActionButton", SettingsMultipleActionButtonProps.customFont],
        ["ActionInput", SettingsActionInputProps.fontSize],
        ["Heading", { name: "Banners" }],
        ["LinkActionButton", LinkActionButtonProps.repositionBanner],
        ["ActionButton", ActionButtonProps.showBanner],
        ["ActionButton", ActionButtonProps.fullPageBanner],
        ["ActionButton", ActionButtonProps.bannersInLyricsPage],
        ["ActionButton", ActionButtonProps.songBannersOnly],
        ["ActionButton", ActionButtonProps.changeCoverArtOnSongChange],
        ["ActionButton", ActionButtonProps.hideDefaultCoverArt],
        ["ActionButton", ActionButtonProps.hidePageDetails],
        ["ActionInput", SettingsActionInputProps.bannerBlur],
        ["ActionButton", ActionButtonProps.fitBannerImage],
        ["Heading", { name: "Snippets" }],
        ["ActionButton", ActionButtonProps.hideHomePageRecommendation],
        ["ActionButton", ActionButtonProps.hoverTime],
        ["ActionButton", ActionButtonProps.hideSimilarSongsRecommendation],
        ["ActionButton", ActionButtonProps.hidePlaylistImageEditButton],
        ["ActionButton", ActionButtonProps.hideLikedSongsCard],
        ["ActionButton", ActionButtonProps.centeredLyrics],
        ["Heading", { name: "Keybinds" }],
        ["ActionButton", ActionButtonProps.quickSearch],
        ["ActionButton", ActionButtonProps.search],
        ["ActionButton", ActionButtonProps.redo],
        ["Heading", { name: "Advanced Settings" }],
        ["ActionButton", ActionButtonProps.rightClickToReload],
        ["Space"],
        ["Button", ButtonProps.likeNord],
        ["Button", ButtonProps.reset],
        ["Button", ButtonProps.backup],
        ["Button", ButtonProps.restore],
    ]
}
