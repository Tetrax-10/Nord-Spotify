import getSettingsMenuActionButtonProps from "./SettingsMenuProps/ActionButtonProps"
import getSettingsMenuActionInputProps from "./SettingsMenuProps/ActionInputProps"
import getSettingsMenuButtonProps from "./SettingsMenuProps/ButtonProps"
import getSettingsMenuDropdownProps from "./SettingsMenuProps/DropdownProps"
import getSettingsMenuLinkActionButtonProps from "./SettingsMenuProps/LinkActionButtonProps"
import getSettingsMenuMultipleActionButtonProps from "./SettingsMenuProps/MultipleActionButtonProps"

export default function getSettingsMenuStructure() {
    const ActionButtonProps = getSettingsMenuActionButtonProps()
    const ActionInputProps = getSettingsMenuActionInputProps()
    const ButtonProps = getSettingsMenuButtonProps()
    const DropdownProps = getSettingsMenuDropdownProps()
    const LinkActionButtonProps = getSettingsMenuLinkActionButtonProps()
    const MultipleActionButtonProps = getSettingsMenuMultipleActionButtonProps()

    return [
        ["SearchBar", { placeholder: "Search for a feature" }],
        ["Heading", { name: "Settings" }],
        ["Dropdown", DropdownProps.selectColorScheme],
        ["Dropdown", DropdownProps.selectDynamicColorMode],
        ["Dropdown", DropdownProps.uiMode],
        ["MultipleActionButton", MultipleActionButtonProps.hideWindowsControls],
        ["MultipleActionButton", MultipleActionButtonProps.customFont],
        ["ActionInput", ActionInputProps.fontSize],
        ["Heading", { name: "Banners" }],
        ["LinkActionButton", LinkActionButtonProps.repositionBanner],
        ["ActionButton", ActionButtonProps.showBanner],
        ["ActionButton", ActionButtonProps.fullPageBanner],
        ["ActionButton", ActionButtonProps.bannersInLyricsPage],
        ["ActionButton", ActionButtonProps.songBannersOnly],
        ["ActionButton", ActionButtonProps.changeCoverArtOnSongChange],
        ["ActionButton", ActionButtonProps.hideDefaultCoverArt],
        ["ActionButton", ActionButtonProps.hidePageDetails],
        ["ActionInput", ActionInputProps.bannerBlur],
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
