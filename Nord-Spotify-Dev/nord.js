// @ts-chec

// NAME: Nord Spotify
// AUTHOR: Tetrax-10
// DESCRIPTION: Nord Spotify Extension

/// <reference path="../dev/globals.d.ts" />

(async function nord() {
    if (!(Spicetify.Platform && Spicetify.LocalStorage && Spicetify.Config)) {
        setTimeout(nord, 300);
        return;
    }
    if (Spicetify.Config.current_theme == "Nord-Spotify" || Spicetify.Config.current_theme == "Nord Spotify" || Spicetify.Config.current_theme == "Nord Spotify Dev") {
        await initNord();
    }
})();

async function initNord() {
    const { React } = Spicetify;
    const { useState } = React;

    ////////////////////////////////////// CONFIG ///////////////////////////////////////////

    async function getLocalStorageDataFromKey(key) {
        return Spicetify.LocalStorage.get(key);
    }

    async function setLocalStorageDataWithKey(key, value) {
        Spicetify.LocalStorage.set(key, value);
    }

    async function getConfig() {
        try {
            const parsed = JSON.parse(await getLocalStorageDataFromKey("nord:settings"));
            if (parsed && typeof parsed === "object") {
                return parsed;
            }
            throw "Config Error Nord";
        } catch {
            await setLocalStorageDataWithKey("nord:settings", `{}`);
            // default settings
            return {
                artistBigImage: true,
                betterFont: true,
                betterGenre: true,
                betterLyricsPlus: true,
                betterSpotifyLyrics: true,
                boldedSideBarItems: true,
                bubbleUI: true,
                hideAds: true,
                hideCardsDownloadStatus: true,
                hideCurrentPlayingSongBG: false,
                hideDotsUnderPlayerButtons: true,
                hideFriendActivity: false,
                hideHomePageRecommendation: false,
                hideLikedSongsCard: false,
                hideLikedSongsCardTexts: false,
                hidePlaylistImageEditButton: false,
                hideRadioGradient: true,
                hideSideBarDivider: true,
                hideSideBarDownloadStatus: true,
                hideSideBarScrollBar: true,
                hideSideBarStatus: true,
                hideSimilarSongsRecommendation: false,
                hideSpotifyConnect: false,
                hideSpotifyFullScreen: false,
                hideTopBarPlayButton: true,
                hideTopGradient: true,
                hideWindowsControl: false,
                highlightSideBarItem: true,
                highlightSideBarSelectedItem: true,
                leftSideCoverArt: false,
                nordLyrics: true,
                pointers: true,
                rightSideCoverArt: true,
                hideMarketplace: false,
            };
        }
    }

    async function saveConfig() {
        await setLocalStorageDataWithKey("nord:settings", JSON.stringify(CONFIG));
    }

    const CONFIG = await getConfig();
    await saveConfig();

    ////////////////////////////////////// Snippets ///////////////////////////////////////////

    let nordSpotify = `
    /* //////////////////////////////////// Apply to all //////////////////////////////////// */
    * {
        --text-subdued: var(--spice-custom-subdued);
        --background-highlight: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.5);
        --progress-bar-radius: 0px;
    }
    
    /* //////////////////////////////////// Nord Theme //////////////////////////////////// */
    
    /* //////////// SideBar //////////// */
    
    /* remove gradient shadow in sidebar above playlist */
    .main-rootlist-rootlistDividerGradient {
        display: none !important;
    }
    
    /* sidebar change divider color */
    .main-rootlist-rootlistDivider {
        background-color: var(--spice-custom-selected-button);
    }
    
    /* rounded sidebar */
    .Root__nav-bar {
        z-index: 1;
        border-radius: 10px !important;
    }
    
    /* sidebar icons color */
    .collection-active-icon,
    .collection-icon,
    .home-active-icon,
    .home-icon,
    .premiumSpotifyIcon,
    .search-active-icon,
    .search-icon {
        color: var(--spice-text);
    }
    
    /* sidebar liked songs icon color */
    .main-likedSongsButton-likedSongsIcon {
        color: var(--spice-main);
        background: var(--spice-text);
        border-radius: 5px;
    }
    
    .main-createPlaylistButton-createPlaylistIcon,
    .main-yourEpisodesButton-yourEpisodesIcon {
        border-radius: 5px;
    }
    
    /* sidebar your episodes icon color */
    .main-yourEpisodesButton-yourEpisodesIcon {
        background: var(--spice-text);
    }
    .main-yourEpisodesButton-yourEpisodesIcon path {
        fill: var(--spice-main);
    }
    
    /* liked songs your episodes and create playlist in sidebar color */
    .main-collectionLinkButton-collectionLinkButton .main-collectionLinkButton-icon,
    .main-collectionLinkButton-collectionLinkButton .main-collectionLinkButton-collectionLinkText,
    .main-createPlaylistButton-button {
        opacity: 1;
    }
    
    /* //////////// playlist //////////// */
    
    /* small cover image in playlist row */
    .main-trackList-rowImage {
        border-radius: 5px !important;
    }
    
    /* playlist big image shadow */
    .main-entityHeader-shadow {
        -webkit-box-shadow: none !important;
        box-shadow: 0 5px 10px rgba(var(--spice-rgb-shadow), 1) !important;
    }
    
    /* change playing icon color in playlist to theme color */
    .main-trackList-playingIcon {
        filter: sepia() saturate(90%) hue-rotate(170deg);
    }
    
    /* change background color of selected row */
    .main-trackList-trackListRow.main-trackList-selected,
    .main-trackList-trackListRow.main-trackList-selected:hover {
        background-color: rgba(var(--spice-rgb-custom-main-secondary), 0.6) !important;
    }
    .main-trackList-trackListRow:focus-within,
    .main-trackList-trackListRow:hover {
        background-color: rgba(var(--spice-rgb-custom-main-secondary), 0.4);
    }
    
    /* When song is currently playing */
    .main-trackList-active .main-type-mesto,
    .main-trackList-active .main-trackList-rowSubTitle,
    .main-trackList-active .main-trackList-rowSubTitle a,
    .main-trackList-active .main-trackList-rowMarker,
    .main-trackList-active .main-trackList-rowSectionVariable,
    .main-trackList-active .main-trackList-rowSectionVariable a,
    .main-trackList-active .main-trackList-rowSectionVariable span,
    .main-trackList-active .main-trackList-rowMarker,
    .main-trackList-active .main-trackList-rowDuration {
        color: var(--spice-custom-subdued) !important;
    }
    
    /* artist name color change in all playlist */
    .main-trackList-rowSubTitle a[href],
    .main-trackList-rowSubTitle,
    .main-trackList-rowSectionVariable a[href],
    .main-trackList-rowSectionVariable .ebHsEf {
        color: var(--spice-custom-subdued) !important;
    }
    
    /* playlist tracks artist hover */
    .main-trackList-rowSubTitle.standalone-ellipsis-one-line :hover {
        color: var(--spice-custom-link-hover) !important;
    }
    
    /* change appearance of public/private playlist tag on top of playlist */
    .main-entityHeader-subtitle.main-entityHeader-small.main-entityHeader-uppercase.main-entityHeader-bold {
        border: 2px var(--spice-text) solid;
        border-radius: 7px;
        width: fit-content;
        display: inline;
        text-align: center;
        padding: 3px 7px;
    }
    
    /* title text area background color for editing playlist details */
    .main-playlistEditDetailsModal-titleInput {
        background: rgba(var(--spice-rgb-custom-main-secondary), 0.3) !important;
    }
    
    /* description text area background color for editing playlist details */
    .main-playlistEditDetailsModal-descriptionTextarea {
        background: rgba(var(--spice-rgb-custom-main-secondary), 0.3) !important;
    }
    .main-playlistEditDetailsModal-description textarea {
        border-radius: 10px;
    }
    
    /* playlist details edit popup save button */
    .main-playlistEditDetailsModal-save span:hover,
    .main-playlistEditDetailsModal-save span {
        background-color: var(--spice-custom-main-soft-secondary) !important;
        color: var(--spice-text) !important;
        border-radius: 10px !important;
    }
    
    /* playlist tracks row rounded */
    div.main-rootlist-wrapper > div:nth-child(2) > div :hover,
    div.main-rootlist-wrapper > div:nth-child(2) > div .main-trackList-active:hover,
    .main-trackList-trackListRow.main-trackList-trackListRowGrid.main-trackList-selected {
        border-radius: 10px;
    }
    
    /* current playing song color */
    div.main-rootlist-wrapper > div:nth-child(2) > div .main-trackList-rowTitle.standalone-ellipsis-one-line {
        color: var(--spice-text);
    }
    
    /* playlist collaborators profile pic */
    .main-entityHeader-creatorWrapper .main-image-image {
        border-radius: 50% !important;
    }
    
    /* playlist collaborators popup profile pic */
    .os-viewport-native-scrollbars-invisible .main-avatar-image {
        border-radius: 50% !important;
    }
    
    /* search bar in playlist page */
    .x-filterBox-filterInput {
        background-color: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
        color: var(--spice-text);
    }
    /* .x-filterBox-filterInput, */
    .x-filterBox-filterInput::placeholder {
        color: var(--spice-text);
    }
    
    /* playlist row (contributed) */
    .main-trackList-trackListRow.main-trackList-trackListRowGrid .main-avatar-image {
        border-radius: 50% !important;
    }
    
    /* playlist page header icons (search and sort buttons) */
    .X1lXSiVj0pzhQCUo_72A,
    .main-actionBar-ActionBar.contentSpacing button {
        color: var(--spice-text);
    }
    
    /* explicit badge */
    .main-tag-container[aria-label="Explicit"]:hover,
    .main-tag-container[aria-label="Explicit"] {
        border-radius: 3.3px !important;
        background-color: var(--spice-custom-subdued);
    }
    
    /* playlist page buttons (left side buttons) */
    .main-actionBar-ActionBar .x-downloadButton-DownloadButton svg,
    /* episodes download button color */
    .DbMYFmOEEz9PH1h1zK9n .x-downloadButton-DownloadButton svg,
    /* episodes more button color */
    .DbMYFmOEEz9PH1h1zK9n .main-moreButton-button svg,
    /* collaborate button hover */
    .main-actionBar-ActionBar .X1lXSiVj0pzhQCUo_72A:hover,
    /* collaborate button */
    .main-actionBar-ActionBar .jMg2yhvAA3YfgM1Ix5GL svg,
    /* more */
    .main-actionBar-ActionBar .main-moreButton-button svg {
        color: var(--spice-custom-subdued);
    }
    
    /* your library and playlist sort drop down */
    .x-sortBox-sortDropdown {
        background-color: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
        color: var(--spice-text);
        text-decoration: none !important;
    }
    
    /* your library and playlist small search button */
    .x-filterBox-expandButton,
    .x-filterBox-expandButton:hover {
        background-color: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
    }
    
    /* your library and playlist small search button */
    .x-filterBox-searchIconContainer,
    .x-filterBox-searchIcon {
        color: var(--spice-text);
    }
    
    /* playlist edit input and textarea */
    .main-playlistEditDetailsModal-title input,
    .main-playlistEditDetailsModal-description textarea {
        border: 0 !important;
    }
    
    /* playlist edit input and textarea placeholder */
    .main-playlistEditDetailsModal-title input::placeholder,
    .main-playlistEditDetailsModal-description textarea::placeholder {
        color: var(--spice-custom-subdued) !important;
    }
    
    /* playlist page big name padding */
    .main-entityHeader-titleInner h1 {
        margin: 0 !important;
    }
    
    /* search bar in playlist page (at end recommended songs) */
    .WIBrW3xa1aqQaLWZhp5U > input {
        display: flex;
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.7) !important;
        flex-direction: column;
        border-radius: 10px !important;
        border: 0 !important;
        color: var(--spice-text) !important;
        height: 40px !important;
    }
    .WIBrW3xa1aqQaLWZhp5U > input::placeholder {
        color: var(--spice-custom-subdued) !important;
    }
    
    /* search bar - search icon in left */
    .zOwN1vkkgX9JIvE81_B2 {
        color: var(--spice-custom-subdued) !important;
    }
    
    /* playlist page hours */
    .UyzJidwrGk3awngSGIwv {
        color: var(--spice-text);
    }
    
    /* album name hover color */
    .main-trackList-rowSectionVariable .standalone-ellipsis-one-line:hover {
        color: var(--spice-custom-link-hover) !important;
    }
    
    .artist-popularTrackList-seeMore {
        color: var(--spice-custom-subdued);
    }
    
    /* //////////// Home Page //////////// */
    
    /* home page top six playlist bg color */
    .view-homeShortcutsGrid-shortcut {
        background-color: var(--spice-custom-main-soft-secondary) !important;
        border-radius: 10px;
    }
    .view-homeShortcutsGrid-shortcut:focus-within,
    .view-homeShortcutsGrid-shortcut:hover,
    .view-homeShortcutsGrid-shortcut[data-context-menu-open="true"] {
        background-color: var(--spice-custom-main-secondary) !important;
    }
    
    /* home page top six playlist image border radius */
    .view-homeShortcutsGrid-image {
        border-radius: 0px !important;
    }
    
    /* home page top six playlist image shadow */
    .view-homeShortcutsGrid-imageWrapper {
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
    }
    
    /* home page each chart topic title height */
    .main-shelf-titleWrapper h2 {
        line-height: 1.2em;
    }
    
    /* //////////// Search Page //////////// */
    
    /* search bar in search page */
    .x-searchInput-searchInputInput {
        display: flex;
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.7) !important;
        flex-direction: column;
        border-radius: 10px !important;
        border: 0 !important;
        color: var(--spice-text) !important;
        height: 40px !important;
    }
    
    /* search bar placeholder */
    .x-searchInput-searchInputInput::placeholder {
        color: var(--spice-custom-subdued) !important;
    }
    
    /* search bar - search icon in left */
    .x-searchInput-searchInputSearchIcon svg {
        color: var(--spice-text) !important;
    }
    
    /* search bar border */
    .nav-alt .x-searchInput-searchInputInput,
    .nav-alt .x-searchInput-searchInputInput:hover,
    .nav-alt .x-searchInput-searchInputInput:focus {
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    
    /* search page tab options */
    :root .KjPUGV8uMbl_0bvk9ePv button > span {
        height: 40px;
        border-radius: 10px !important;
        background-color: var(--spice-custom-main-soft-secondary);
    }
    :root .KjPUGV8uMbl_0bvk9ePv button[aria-checked="false"]:hover,
    :root .KjPUGV8uMbl_0bvk9ePv button[aria-checked="false"] {
        height: 40px;
        border-radius: 10px !important;
        background-color: var(--spice-custom-main-soft-secondary) !important;
    }
    :root .KjPUGV8uMbl_0bvk9ePv button[aria-checked="true"] > span {
        color: var(--spice-text);
        background-color: var(--spice-custom-selected-button) !important;
    }
    :root .KjPUGV8uMbl_0bvk9ePv button[aria-checked="false"] > span:hover {
        background-color: var(--spice-custom-main-secondary) !important;
    }
    
    /* top result head */
    .iGyMsGo7FgYQQThBj2y9.main-shelf-shelf .main-shelf-header {
        border-radius: 15px;
        padding-top: 10px;
        padding-left: 15px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.8);
    }
    /* top result body */
    .eITFAR9yPwhjL_2gxB09 .main-heroCard-card {
        border-radius: 15px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.8);
    }
    
    /* type of top result in search page */
    .RArlOXg8S6l3NgRKrGsO {
        background-color: var(--spice-custom-main-secondary);
        border-radius: 7px;
        height: 28px;
    }
    
    /* top songs container in search page heading */
    .QVIrLvegL13F9cEdMqfT.EbZrO5qZMclA_AaI3NV8 {
        border-radius: 15px;
        padding-top: 10px;
        padding-left: 15px;
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.8);
    }
    
    /* //////////// Profile Page //////////// */
    
    /* If no profile pic the element will not be circle (not working) */
    .main-entityHeader-circle {
        border-radius: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    
    /* Profile photo hover edit button */
    .main-editImage-buttonContainer button {
        border-radius: 10px;
    }
    
    /* edit spotify username */
    input[placeholder="Add a display name"]::placeholder {
        color: var(--spice-text);
    }
    input[placeholder="Add a display name"] {
        background-color: var(--spice-custom-main-soft-secondary);
    }
    
    /* username in playlist page, profile page followers and following */
    .main-entityHeader-metaData a:hover {
        color: var(--spice-custom-link-hover) !important;
    }
    
    /* //////////// Context Menu //////////// */
    
    /* rounded context menu */
    .main-contextMenu-menu {
        border-radius: 15px; /* extra border radius so always rounded */
    }
    
    /* rounded context menu items */
    .main-contextMenu-menuItemButton[aria-expanded="true"],
    .main-contextMenu-menuItemButton:hover {
        background-color: var(--spice-custom-main-soft-secondary) !important;
    }
    .main-contextMenu-menuItemButton {
        border-radius: 10px;
    }
    .main-contextMenu-menuItemButton::before,
    .main-contextMenu-menuItemButton::after {
        display: none;
    }
    
    /* context menu hide scrollbar */
    .main-contextMenu-menu::-webkit-scrollbar {
        display: none;
    }
    
    /* //////////// Album Page //////////// */
    
    /* album page playcount color */
    .main-trackList-rowSectionVariable .main-trackList-rowPlayCount {
        color: var(--spice-custom-subdued) !important;
    }
    
    /* 1 more release */
    .fLS8v3_EfBadEerbGVoR:hover,
    .fLS8v3_EfBadEerbGVoR {
        background-color: var(--spice-custom-main-soft-secondary) !important;
        border-radius: 10px;
    }
    
    /* album page total duration color */
    .main-entityHeader-divider span {
        color: var(--spice-text);
    }
    
    /* //////////// Settings Page //////////// */
    
    /* settings page buttons */
    .cuhCvm,
    /* settings page connect to facebook */
    .Button-y0gtbx-0.kVItyf.xm2mOJwSu9_GfODYzx8M {
        border: none;
        border-radius: 7px;
        background-color: var(--spice-custom-main-soft-secondary);
        height: 40px;
        padding: 10px;
    }
    
    /* settings page connect to facebook button icon */
    .IconWrapper__Wrapper-ihacte-0.bhgxOC {
        display: none;
    }
    
    /* equalizer */
    .x-settings-equalizerContainer {
        border-radius: 10px;
    }
    .main-dropDown-dropDown::-webkit-scrollbar {
        display: none;
    }
    .main-dropDown-dropDown {
        background-color: var(--spice-custom-main-soft-secondary);
        color: var(--spice-text);
    }
    
    /* equalizer reset button */
    .PiFWoUIRceOm8SHTCakS > button {
        background-color: var(--spice-custom-main-secondary);
    }
    
    /* settings input */
    .x-settings-input::placeholder {
        color: rgba(var(--spice-rgb-custom-subdued), 0.7);
    }
    
    /* equalizer sliders color */
    .gv7Rcc2ouDRSd0pto7Df {
        filter: sepia() saturate(90%) hue-rotate(170deg);
    }
    
    /* settings page toggles */
    .x-toggle-indicatorWrapper {
        background-color: var(--spice-custom-main-secondary);
    }
    input:checked ~ .x-toggle-indicatorWrapper .x-toggle-indicator,
    .x-toggle-indicator {
        background: var(--spice-text);
    }
    input:checked ~ .x-toggle-indicatorWrapper {
        background-color: rgba(var(--spice-rgb-button), 0.4);
    }
    
    /* //////////// Artist Page //////////// */
    
    /* change appearance of follow button */
    .idI9vydtCzXVhU1BaKLw {
        border: none;
        border-radius: 7px;
        background-color: var(--spice-custom-main-soft-secondary);
        height: 40px;
        padding: 10px;
    }
    
    /* artist big image disabled gradient overlay  */
    .main-entityHeader-background.main-entityHeader-overlay {
        --bgColor: transparent !important;
    }
    
    /* artist page discography tab options */
    :root .Jr6tcq7gSdKFSqofza3T button > span {
        height: 40px;
        border-radius: 10px !important;
        background-color: var(--spice-custom-main-soft-secondary);
    }
    :root .Jr6tcq7gSdKFSqofza3T button[aria-checked="false"]:hover,
    :root .Jr6tcq7gSdKFSqofza3T button[aria-checked="false"] {
        height: 40px;
        border-radius: 10px !important;
        background-color: var(--spice-custom-main-soft-secondary) !important;
    }
    :root .Jr6tcq7gSdKFSqofza3T button[aria-checked="true"] > span {
        color: var(--spice-text);
        background-color: var(--spice-custom-selected-button) !important;
    }
    :root .Jr6tcq7gSdKFSqofza3T button[aria-checked="false"] > span:hover {
        background-color: var(--spice-custom-main-secondary) !important;
    }
    
    /* artist page liked songs container */
    .artist-artistOverview-sideBlock {
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.9);
        border-radius: 10px;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 20px;
    }
    
    /* artist page liked songs container artist image */
    .artist-artistOverview-sideBlock .main-image-image.main-avatar-image {
        border-radius: 10px !important;
    }
    
    /* artist page liked songs container artist image like symbol */
    .SxHlW6byhoJSUJNugaE1 .Kujbn0F68QOf_o44cNxw {
        display: none;
    }
    
    /* artist page songs container */
    .artist-artistOverview-popularTracks {
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.8);
        border-radius: 10px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
    }
    
    /* //////////// Episodes Page //////////// */
    
    /* .hTRqaN61SDG95erQGMmx = podcast page */
    /* ._OxEpxzAgJiTENfolVUN = your episodes page */
    
    /* episode rounded corner */
    .hTRqaN61SDG95erQGMmx > div,
    ._OxEpxzAgJiTENfolVUN > div {
        border-radius: 10px;
        background-color: var(--spice-custom-main-soft-secondary);
    }
    .hTRqaN61SDG95erQGMmx > div:hover,
    ._OxEpxzAgJiTENfolVUN > div:hover {
        background-color: var(--spice-custom-main-secondary) !important;
    }
    .hTRqaN61SDG95erQGMmx > hr,
    ._OxEpxzAgJiTENfolVUN > hr {
        display: none;
    }
    .hTRqaN61SDG95erQGMmx,
    ._OxEpxzAgJiTENfolVUN {
        padding: 20px;
    }
    
    /* top episode in a podcast page */
    .TT1tIewS2iI8Uz8kLuQB.te8hrsPnSvx9SUkzV0ME.WBxE9PQe96PpkE9RuTo5 {
        border-radius: 10px;
        background-color: var(--spice-custom-main-soft-secondary);
    }
    
    /* podcast left side about heading */
    .YJlizbhw6DBPHT9OYbdj > h3 {
        padding: 15px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: var(--spice-custom-main-soft-secondary);
    }
    
    /* podcast left side description */
    .YJlizbhw6DBPHT9OYbdj .playlist-playlist-playlistDescription {
        padding: 15px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: var(--spice-custom-main-soft-secondary);
    }
    
    /* podcast left side tag button below about section */
    .nLNTsyonBwoRIzAv1AME > a {
        border: none;
        border-radius: 10px;
        background-color: var(--spice-custom-main-soft-secondary);
        height: 40px;
        padding: 12px;
    }
    
    /* hover buttons always visible in episodes container */
    .DbMYFmOEEz9PH1h1zK9n button {
        opacity: 1 !important;
    }
    
    /* episodes play button */
    .Button-qlcn5g-0.jGQZTS > span:hover,
    .Button-qlcn5g-0.jGQZTS > span {
        background-color: var(--spice-button) !important;
    }
    
    /* green episodes icon rounded corner */
    .main-entityHeader-imageContainer .oezNMICqWdJHdR3QV9La {
        border-radius: 10px;
    }
    
    /* episode page podcast title link */
    .main-entityHeader-subtitle.main-entityHeader-large.main-entityHeader-bold > a:hover {
        color: var(--spice-custom-link-hover) !important;
    }
    
    /* episode page date */
    .qfYkuLpETFW3axnfMntO p,
    .main-actionBar-ActionBarRow p,
    /* episode page duration */
    .qfYkuLpETFW3axnfMntO p > span,
    .main-actionBar-ActionBarRow p > span {
        color: var(--spice-text);
    }
    
    /* //////////// Root //////////// */
    
    /* rounded root */
    .nav-alt .Root__main-view {
        z-index: 0;
        border-radius: 10px !important;
    }
    
    /* username top right notification indicator hidden */
    .main-userWidget-notificationIndicator {
        display: none !important;
    }
    
    /* username on top right corner customization */
    .main-userWidget-box:hover,
    .main-userWidget-box {
        background-color: var(--spice-custom-main-soft-secondary) !important;
        border-radius: 10px;
    }
    .main-userWidget-chevron {
        display: none;
    }
    
    /* small profile photo on top right corner */
    .main-userWidget-box .main-avatar-image {
        border-radius: 10px;
    }
    
    /* change scrollbar appearance */
    .os-theme-spotify.os-host-transition > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {
        border-radius: 4px;
        width: 8px;
        background-color: var(--spice-custom-main-secondary);
    }
    .os-theme-spotify.os-host-transition > .os-scrollbar-vertical > .os-scrollbar-track {
        width: 6px;
    }
    
    /* all images */
    .main-image-image {
        border-radius: 5%;
    }
    
    /* fixed button hover color */
    .encore-dark-theme .encore-bright-accent-set {
        --background-base: var(--spice-button);
        --background-press: var(--spice-button);
        --background-highlight: var(--spice-button);
    }
    
    /* fix anchor tag */
    a {
        text-decoration: none !important;
    }
    /* liked songs of a artist in artist page (you have liked n songs) */
    .Type__TypeElement-goli3j-0.dqBHkz> a:hover,
    /* charts topic name in home page */
    .Type__TypeElement-goli3j-0.dnNHjd > a:hover,
    /* player song name */
    .main-trackInfo-name :hover > a {
        color: var(--spice-custom-link-hover) !important;
    }
    
    /* like button color */
    .main-addButton-button.main-addButton-active svg,
    .main-addButton-button svg {
        color: var(--spice-custom-subdued);
    }
    
    /* fix like button color on click (animation color) */
    #_R_G *:not([fill="none"]) {
        fill: var(--spice-custom-subdued) !important;
    }
    #_R_G *:not([stroke="none"]) {
        stroke: var(--spice-custom-subdued);
    }
    
    /* Big play buttons */
    :root button > span.encore-bright-accent-set,
    /* new release card play button */
    .main-playButton-PlayButton button > span {
        border-radius: 16px !important;
    }
    
    /* see all button */
    .main-shelf-seeAll {
        background-color: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
        padding-left: 12px;
        padding-right: 10px;
        padding-top: 3px;
        height: 34px;
    }
    
    /* spotify popup close buttons */
    /* playlist edit popup close button */
    .main-playlistEditDetailsModal-closeBtn:hover,
    /* profile edit popup close button */
    .zHeo4VUxytwm6Ptr0QyA:hover,
    /* collaborate popup close button */
    .ttg4QuP3hS13nliEPlmS:hover {
        background-color: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
    }
    
    /* drop down arrow color in playlist page title bar */
    .gtBDUL {
        fill: var(--spice-custom-subdued);
    }
    
    /* //////////// Top bar //////////// */
    
    /* top bar color */
    .main-topBar-background {
        background-color: var(--spice-main) !important;
    }
    .main-topBar-overlay {
        background-color: var(--spice-main) !important;
    }
    
    /* top bar buttons */
    .main-topBar-historyButtons {
        padding-left: 10px;
        gap: 15px;
    }
    .main-topBar-button,
    .main-topBar-button:hover,
    .main-topBar-historyButtons .main-topBar-button {
        height: 40px;
        width: 40px;
        background-color: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
    }
    
    /* top bar tabs */
    /* queue page */
    .queue-tabBar-headerItemLink.queue-tabBar-active,
    /* lyrics plus */
    .lyrics-tabBar-headerItemLink.lyrics-tabBar-active,
    /* marketplace */
    .marketplace-tabBar-headerItemLink.marketplace-tabBar-active {
        border-radius: 10px;
    }
    
    /* private session */
    .main-noConnection button {
        height: 45px;
    }
    .main-noConnection-button {
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.7) !important;
        border-radius: 10px;
        padding: 10px;
    }
    .main-noConnection-button svg {
        padding-right: 3px;
    }
    
    /* top bar table heading background */
    .nav-alt .main-trackList-trackListHeaderStuck.main-trackList-trackListHeader,
    .main-trackList-trackListHeader {
        background: var(--spice-main);
    }
    
    /* //////////// Player //////////// */
    
    /* player cover image */
    .cover-art-image {
        border-radius: 10px;
    }
    
    /* progress bar */
    .playback-bar {
        border-radius: 0px !important;
        bottom: 6px;
        width: 98.8%;
        position: absolute;
    }
    :root .Root__now-playing-bar .playback-bar {
        left: 9px !important;
        position: fixed !important;
    }
    .x-progressBar-progressBarBg {
        background-color: unset;
    }
    .main-nowPlayingBar-center .x-progressBar-progressBarBg .w699O0LgQRghXyl3bs9u {
        border-radius: 0px !important;
        border-bottom-left-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
    }
    
    /* progress bar time style */
    .playback-bar__progress-time-elapsed,
    .main-playbackBarRemainingTime-container {
        position: absolute;
        bottom: 14px;
        right: 0px;
    }
    .playback-bar__progress-time-elapsed {
        transform: translateX(calc(-100% - 20px));
    }
    .playback-bar__progress-time-elapsed::after {
        position: absolute;
        left: calc(100% + 10px);
        font-weight: bold;
        color: var(--spotify-main-color);
        color: rgba(var(--spice-rgb-custom-subdued), 0.8);
        content: "/";
        transform: translateX(-50%);
    }
    .playback-bar__progress-time-elapsed,
    .main-playbackBarRemainingTime-container {
        opacity: 0;
    }
    .playback-bar:hover .playback-bar__progress-time-elapsed,
    .playback-bar:hover .main-playbackBarRemainingTime-container {
        transition: all 0.3s ease;
        opacity: 1;
    }
    
    /* progress bar (how much filled) */
    .epWhU7hHGktzlO_dop6z {
        border-radius: 50px;
        height: 6px;
        background-color: var(--spice-custom-selected-button) !important;
        transition: transform, 0s, ease, 0.25s;
    }
    
    /* progress bar (how much remaining) */
    .w699O0LgQRghXyl3bs9u {
        border-radius: 50px;
        height: 6px;
        background-color: var(--spice-custom-main-secondary) !important;
    }
    
    /* progress bar ball (visible when hovered) */
    .progress-bar__slider {
        /* display: none !important; */
        width: 12px !important;
        height: 12px !important;
        border-radius: 50%;
        transition: left, 0s, ease, 0.25s;
        top: 3.5px;
    }
    
    /* rounded player */
    .Root__now-playing-bar {
        z-index: 1;
        border-radius: 10px;
        padding: 10px;
        background-color: var(--spice-main);
    }
    
    /* hides info about other devices on player */
    .main-connectBar-connectBar {
        display: none !important;
    }
    .control-button::after {
        display: none !important;
    }
    
    /* change appearance of play button in player */
    .main-playPauseButton-button {
        color: inherit;
        background-color: transparent;
    }
    .main-playPauseButton-button svg {
        height: 19px;
        width: 19px;
        transform: scale(1.5);
    }
    
    /* if no player, pause button disabled background color made transparent */
    .main-playPauseButton-button[disabled] {
        background-color: var(--spice-main);
    }
    
    /* artist name in player */
    .main-trackInfo-artists > span > a {
        font-size: 0.875rem;
        color: var(--spice-custom-subdued) !important;
    }
    .main-trackInfo-artists > span :hover {
        color: var(--spice-custom-link-hover) !important;
    }
    
    /* cover art expand button */
    .main-coverSlotCollapsed-expandButton:hover,
    .main-coverSlotCollapsed-expandButton {
        border-radius: 5px;
        background-color: rgba(var(--spice-rgb-shadow), 0.3);
        color: var(--spice-text);
        height: 22px;
        width: 22px;
    }
    
    /* cover art collapse button */
    .main-coverSlotExpandedCollapseButton-collapseButton:hover,
    .main-coverSlotExpandedCollapseButton-collapseButton {
        border-radius: 10px;
        background-color: rgba(var(--spice-rgb-shadow), 0.3);
        color: var(--spice-text);
        height: 28px;
        width: 28px;
    }
    
    /* now playing bar buttons color */
    .main-nowPlayingBar-center button,
    .main-nowPlayingBar-right button {
        color: var(--spice-text) !important;
    }
    
    /* active button */
    .main-nowPlayingBar-nowPlayingBar button.control-button--active,
    .main-nowPlayingBar-nowPlayingBar button[aria-checked="mixed"],
    .main-nowPlayingBar-nowPlayingBar button[aria-expanded="true"],
    .main-nowPlayingBar-nowPlayingBar button[aria-checked="true"] {
        color: var(--spice-button-active) !important;
    }
    
    /* //////////// Cards //////////// */
    
    /* all cards */
    .main-card-card {
        background-color: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
        padding: 0;
        height: 100%;
        overflow: hidden;
    }
    .main-card-card:hover,
    .main-card-card[data-context-menu-open="true"] {
        background-color: var(--spice-custom-main-secondary);
    }
    .main-card-card .main-card-imageContainer {
        margin-bottom: -4px;
    }
    .main-card-card .main-card-imageContainer .main-cardImage-circular,
    .main-card-card .main-card-imageContainer img {
        border-radius: 0;
    }
    .main-card-card .main-card-cardMetadata {
        padding: 16px;
    }
    
    /* cards play buttons */
    .main-card-card .main-card-PlayButtonContainer {
        right: 8px;
        bottom: 8px;
    }
    
    /* no artist image in cards */
    .main-card-card .main-entityHeader-imagePlaceholder {
        background-color: var(--spice-custom-main-soft-secondary);
        transition: background-color 0.3s ease;
    }
    .main-card-card:hover .main-entityHeader-imagePlaceholder {
        background-color: var(--spice-custom-main-secondary) !important;
        transition: background-color 0.3s ease;
    }
    
    /* card image placeholder background eg: png snippet */
    .main-card-card .main-cardImage-imageWrapper {
        transition: background-color 0.3s ease;
    }
    .main-card-card:hover .main-cardImage-imageWrapper {
        background-color: var(--spice-custom-main-secondary) !important;
        transition: background-color 0.3s ease;
    }
    
    /* remove card shadow below the image */
    .main-cardImage-imageWrapper {
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    
    /* your library your episodes border radius */
    .main-card-imageContainer .oezNMICqWdJHdR3QV9La {
        border-radius: 0;
    }
    
    /* your library local files icon color */
    .tlNAdRNP5lIeiD85nMcL > img {
        filter: sepia() saturate(90%) hue-rotate(160deg);
    }
    
    /* cards artist name fix */
    .main-cardSubHeader-root :hover {
        color: var(--spice-custom-link-hover) !important;
    }
    .main-cardSubHeader-root > a {
        color: var(--spice-custom-subdued) !important;
    }
    
    /* search page card X button */
    .ADri2r8kq8LVqSsNNvIr .xmJl0s8mcJ3bfhtnoaP1 {
        border-radius: 10px;
    }
    
    /* //////////// marketplace - Custom App //////////// */
    
    /* fix marketplace buttons */
    #playlist-phrase-submit,
    #marketplace-reload-okay,
    #marketplace-reload-cancel {
        background-color: var(--spice-main);
        padding: 10px;
        border: none;
        border-radius: 10%;
    }
    .marketplace-card-desc,
    .searchbar--bar__wrapper > input::placeholder {
        color: var(--spice-custom-subdued) !important;
    }
    
    /* marketplace search bar */
    .searchbar-bar {
        display: flex;
        background-color: var(--spice-custom-main-soft-secondary) !important;
        flex-direction: column;
        padding: 15px;
        border-radius: 10px !important;
        border: none;
    }
    
    /* marketplace themes dev tools and settings bg color */
    .marketplace-header-icon-button {
        background-color: var(--spice-custom-main-soft-secondary);
    }
    
    /* marketplace download button fix */
    .button-module__button___hf2qg_marketplace {
        border-radius: 16px;
        background-color: var(--spice-button);
    }
    
    /* marketplace buttons color on click */
    .button-module__button___hf2qg_marketplace {
        border-radius: 13px;
        background-color: var(--spice-button) !important;
    }
    
    /* marketplace installed border */
    .marketplace-card--installed {
        border: 3px solid var(--spice-button-active);
    }
    
    /* marketplace item name hover */
    .marketplace-grid .main-cardHeader-link:hover {
        color: var(--spice-custom-link-hover) !important;
    }
    
    /* marketplace star count hover */
    .marketplace-cardSubHeader > span:hover {
        color: var(--spice-text) !important;
    }
    
    /* marketplace color scheme scrollbar */
    .Dropdown-menu::-webkit-scrollbar {
        display: none;
    }
    
    /* marketplace color scheme options */
    .Dropdown-option {
        border-radius: 10px;
    }
    
    /* marketplace color scheme drop down */
    .Dropdown-control {
        background-color: var(--spice-custom-main-soft-secondary);
    }
    .Dropdown-placeholder.is-selected {
        height: 30px;
        padding: 3px;
        width: 100px;
    }
    
    /* marketplace toogles */
    .toggle-module__toggle-indicator-wrapper___6Lcp0_marketplace {
        background-color: var(--spice-custom-main-secondary);
    }
    .toggle-module__toggle-indicator___nCxwE_marketplace {
        background: var(--spice-text) !important;
    }
    .toggle-module__toggle-input___ceLM4_marketplace:checked ~ .toggle-module__toggle-indicator-wrapper___6Lcp0_marketplace {
        background-color: rgba(var(--spice-rgb-button), 0.4);
    }
    
    /* marketplace dev tools */
    .devtools-column {
        background-color: var(--spice-main);
    }
    
    /* marketplace dev tools code editor */
    .marketplace-code-editor {
        border: 3px solid var(--spice-button);
        border-radius: 10px;
    }
    
    /* marketplace dev tools code editor heading */
    .devtools-heading,
    .invalid-css-heading {
        text-decoration: none;
    }
    
    /* marketplace add snippet input box */
    .marketplace-customCSS-input-container input {
        display: flex;
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.7) !important;
        flex-direction: column;
        border-radius: 10px !important;
        border: 0 !important;
        color: var(--spice-text) !important;
        height: 40px !important;
    }
    .marketplace-customCSS-input-container input::placeholder {
        color: var(--spice-custom-subdued) !important;
    }
    
    /* marketplace add snippet text area placeholder */
    .marketplace-customCSS-input-container textarea::placeholder {
        color: var(--spice-custom-subdued) !important;
    }
    
    /* marketplace external js */
    .marketplace-grid .main-card-draggable .main-card-cardMetadata li.marketplace-card__tag[data-tag="external JS"] {
        background-color: var(--spice-notification-error) !important;
        color: var(--spice-text);
    }
    
    /* marketplace installed */
    .marketplace-card__bottom-meta.main-type-mestoBold {
        color: var(--spice-custom-success);
    }
    
    /* marketplace tags */
    .marketplace-card__tag {
        background-color: var(--spice-custom-highlight) !important;
        color: var(--spice-custom-subdued);
    }
    
    /* //////////// New Releases - Custom App //////////// */
    
    /* change appearance of new releases refresh button */
    .new-releases-controls-container > button {
        border: none;
        border-radius: 7px;
        background-color: var(--spice-custom-main-soft-secondary);
        height: 40px;
        padding: 10px;
    }
    
    /* //////////// Lyrics Plus - Custom App //////////// */
    
    /* bottom settings icon */
    .lyrics-config-button {
        background-color: var(--spice-custom-main-secondary);
        border-radius: 10px;
        color: var(--spice-text);
    }
    
    /* //////////// Experimental Feature //////////// */
    
    /* experimental feature popup */
    .main-trackCreditsModal-header,
    .main-trackCreditsModal-mainSection {
        background-color: var(--spice-main);
    }
    .main-trackCreditsModal-mainSection::-webkit-scrollbar {
        width: 8px;
    }
    .main-trackCreditsModal-mainSection::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: var(--spice-custom-main-secondary);
    }
    
    /* experimental feature seach bar */
    input.search[placeholder="Search for a feature"] {
        border-color: var(--spice-main);
    }
    input.search[placeholder="Search for a feature"]::placeholder {
        color: var(--spice-custom-subdued);
    }
    
    /* experimental feature seach bar icon outside */
    .search-container svg {
        color: var(--spice-text);
    }
    
    /* experimental feature reset button */
    .setting-row .reset {
        color: var(--spice-text);
    }
    
    /* //////////// quick search //////////// */
    
    /* quick search - text color */
    .v2oO4ItuH_0zk3OFj5dh {
        color: var(--spice-text) !important;
    }
    
    /* quick search - placeholder in search box */
    .v2oO4ItuH_0zk3OFj5dh::placeholder {
        color: var(--spice-custom-subdued);
    }
    
    /* quick search - input box */
    .kQ22nY00NOOrZjfmRP5J {
        background: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
    }
    
    /* quick search - search icon */
    .HN_3fmk5t15DGlzDbx1_ {
        color: var(--spice-text);
    }
    
    /* quick search rounded rows */
    #search-modal-listbox > a:hover,
    #search-modal-listbox .kUkjSLUuPyag37OAbVPH.sKrYQkHlFOyAc0bM142q {
        border-radius: 10px !important;
        background-color: var(--spice-custom-main-soft-secondary) !important;
    }
    
    /* quick search scrollbar */
    #search-modal-listbox::-webkit-scrollbar {
        display: none;
    }
    
    /* quick search item-type button */
    .OQZtYvcaWiQEaOOMZ54v {
        background-color: var(--spice-button-disabled);
        border-radius: 10px;
    }
    
    /* quick search popup rounded corner */
    ._p8ywioveAdTZ8yZmPfr {
        border-radius: 10px;
    }
    
    /* //////////// Popup Modal //////////// */
    
    /* big popup modal height */
    .main-embedWidgetGenerator-container {
        height: 90vh;
    }
    
    /* dynamic height for add snippet modal */
    .GenericModal[aria-label="Add Snippet"] .main-embedWidgetGenerator-container {
        height: unset;
    }
    
    /* dynamic height for sort by play count release notes modal */
    .GenericModal[aria-label="Sort By Play Count 2.6 Release Notes"] .main-embedWidgetGenerator-container {
        height: unset;
    }
    
    /* big popup modal rounded corner */
    .main-trackCreditsModal-header {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .main-trackCreditsModal-mainSection {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    
    /* entire popup Modal */
    .main-trackCreditsModal-container,
    .GenericModal {
        border-radius: 10px;
    }
    
    /* popup Modal select */
    .main-trackCreditsModal-container select {
        background-color: var(--spice-tab-active);
        border-radius: 4px;
        color: rgba(var(--spice-rgb-selected-row), 0.7);
    }
    
    /* popup modal input */
    .main-trackCreditsModal-mainSection input {
        background-color: var(--spice-custom-main-secondary) !important;
        padding: 15px;
        border-radius: 10px !important;
        border: none;
    }
    
    /* popup modal scrollbar */
    .marketplace-code-editor-wrapper.marketplace-code-editor::-webkit-scrollbar-thumb,
    .main-trackCreditsModal-mainSection::-webkit-scrollbar-thumb {
        width: 8px;
        border-radius: 10px;
        background-color: var(--spice-custom-main-secondary);
    }
    
    /* select style */
    .main-embedWidgetGenerator-container select {
        background-color: var(--spice-tab-active);
        color: rgba(var(--spice-rgb-selected-row), 0.7);
        padding: 0 32px 0 12px;
        border: 0;
        border-radius: 5px;
        font-weight: 400;
        font-size: 14px;
    }
    
    /* keyboard shortcuts */
    .EhyK_jJzB2PcWXd5lg24 {
        background-color: var(--spice-main);
        border-radius: 10px;
    }
    .main-keyboardShortcutsHelpModal-sections::-webkit-scrollbar {
        width: 8px;
    }
    .main-keyboardShortcutsHelpModal-sections::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: var(--spice-custom-main-secondary);
    }
    
    /* add song again and delete popup */
    /* AdF5F5BxQXGeWkfceg9A - add song again */
    /* J0xJcBaKhwl9EIuzvhLg - delete songs popup */
    /* K8PtC1Way9XetxDGwCGx - delete playlist popup */
    /* j1BMy6Uh7sBoeNA18Rrh - delete folder popup */
    .K8PtC1Way9XetxDGwCGx,
    .AdF5F5BxQXGeWkfceg9A,
    .J0xJcBaKhwl9EIuzvhLg,
    .j1BMy6Uh7sBoeNA18Rrh {
        background-color: var(--spice-main);
    }
    .AdF5F5BxQXGeWkfceg9A > h2,
    .J0xJcBaKhwl9EIuzvhLg > h2,
    .K8PtC1Way9XetxDGwCGx > h2,
    .j1BMy6Uh7sBoeNA18Rrh > h2,
    .AdF5F5BxQXGeWkfceg9A > p,
    .J0xJcBaKhwl9EIuzvhLg > p,
    .j1BMy6Uh7sBoeNA18Rrh > p,
    .K8PtC1Way9XetxDGwCGx > p {
        color: var(--spice-text);
    }
    .AdF5F5BxQXGeWkfceg9A div button:focus,
    .J0xJcBaKhwl9EIuzvhLg div button:focus,
    .K8PtC1Way9XetxDGwCGx div button:focus,
    .j1BMy6Uh7sBoeNA18Rrh div button:focus {
        outline: none;
        outline-offset: 0px;
    }
    /* add anyway, cancel */
    .Button-sc-1dqy6lx-0.daAltg:hover {
        color: var(--spice-text) !important;
    }
    
    /* sort by playcount - Extension */
    .main-trackCreditsModal-originalCredits .login-button.green {
        background-color: rgba(107, 203, 119, 0.5) !important;
    }
    .main-trackCreditsModal-originalCredits .login-button.red {
        background-color: rgba(191, 97, 106, 0.7) !important;
    }
    
    /* sort by play count input */
    .popup-row .inputbox::placeholder,
    /* lastfm stats input */
    #login-global-div > input::placeholder {
        color: var(--spice-custom-subdued) !important;
    }
    #login-global-div > input,
    /* sort by playcount input */
    .popup-row .inputbox {
        box-shadow: none !important;
    }
    
    /* popup buttons */
    .main-trackCreditsModal-originalCredits button {
        border: none !important;
        border-radius: 7px !important;
        background-color: var(--spice-custom-main-secondary) !important;
        height: 40px !important;
        padding: 10px !important;
        color: var(--spice-text);
    }
    
    /* popup checkbox */
    button.checkbox.disabled {
        color: rgba(var(--spice-rgb-text), 0.3) !important;
    }
    
    /* //////////// Artist Discography //////////// */
    
    /* artist discography album img comtainer */
    .main-entityHeader-image.artist-artistDiscography-headerImage {
        padding: 30px;
        padding-bottom: 150px;
        padding-right: 150px;
        border-radius: 15px;
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.8) !important;
    }
    .main-entityHeader-image.artist-artistDiscography-headerImage > img {
        height: 120px;
        width: 120px;
    }
    
    /* artist discography album info */
    .artist-artistDiscography-headerMetadata {
        padding: 20px;
        border-radius: 15px;
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.8);
    }
    
    /* artist discography view type near all drop down */
    .kg7_tYjFur1DEfwH_0W5 > button:hover,
    .kg7_tYjFur1DEfwH_0W5 > button[aria-checked="true"] {
        color: var(--spice-text);
        background-color: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
    }
    .kg7_tYjFur1DEfwH_0W5 > button[aria-checked="false"] {
        color: var(--spice-text);
    }
    
    /* top bar artist name */
    .artist-artistDiscography-topBar a {
        padding-left: 35px;
    }
    
    /* //////////// Spotify Connect //////////// */
    
    /* spotify connect buttons */
    .bzmsYhq8qXerwAFF0AUJ > button:hover {
        background-color: var(--spice-custom-main-soft-secondary) !important;
        border-radius: 10px;
    }
    
    /* spotify connect dont see your device? */
    .HVCCFeUiHVwZVv74p34a > a:hover,
    .zFqMGX3h5z2CO3f2uEiL > a:hover {
        background-color: var(--spice-custom-main-soft-secondary) !important;
        border-radius: 10px;
    }
    
    /* spotify connect img */
    .tm3lCLoFzk25Q_df5g5K.AXkwHpGa_BG7Dy4v7o2V .uWvwXlS0Da1bWsRX6KOw {
        filter: sepia() saturate(90%) hue-rotate(170deg);
    }
    
    /* //////////// Friend Activity //////////// */
    
    /* rounded friend activity */
    .nav-alt .main-buddyFeed-buddyFeedRoot {
        border-radius: 10px !important;
    }
    
    /* Find friends container */
    .SQHCRmgNjRywo1Lt7rP3 {
        background-color: var(--spice-main);
        height: 69px;
    }
    
    /* friend activity close button */
    .main-buddyFeed-findFriendsButton {
        background-color: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
    }
    .main-buddyFeed-findFriendsButton:hover {
        background-color: var(--spice-custom-main-secondary) !important;
        border-radius: 10px;
    }
    
    /* no friends settings button */
    .MObmOrMxbQpO10ebAtZA .ralK8s_OmE8a8zWcfNKM:hover,
    .MObmOrMxbQpO10ebAtZA .ralK8s_OmE8a8zWcfNKM {
        border-radius: 10px;
        background-color: var(--spice-custom-main-soft-secondary);
        color: var(--spice-text);
    }
    
    /* connect to facebook */
    .HgRmCE3NxfiYNtv6pF3H:hover,
    .HgRmCE3NxfiYNtv6pF3H {
        border: none;
        border-radius: 10px !important;
        background-color: var(--spice-custom-main-soft-secondary) !important;
        color: var(--spice-text);
        height: 40px;
        padding: 10px;
    }
    
    /* //////////////////////////////////// Spotify Stock Full Screen //////////////////////////////////// */
    
    /* song image */
    .npv-cross-fade-image.npv-cross-fade--next {
        border-radius: 20px;
    }
    
    /* //////////////////////////////////// Personal //////////////////////////////////// */
    
    /* home page top extra padding above greeting */
    .main-home-content {
        padding-top: 15px;
    }
    
    /* //////////////////////////////////// Testing //////////////////////////////////// */
    `;

    let hideArtistTopBar = `
    .main-topBar-background {
        background-color: unset !important;
    }
    .main-topBar-overlay {
        background-color: unset !important;
    }
    .main-entityHeader-topbarTitle {
        background-color: var(--spice-main);
        padding: 10px;
        width: 100%;
        padding-top: 15px;
        padding-left: 32px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        position: absolute;
        left: 0px;
        transition: all 0s ease;
    }`;

    let rightSideCoverArt = `
    /* right side cover art */
    .main-nowPlayingWidget-nowPlaying > .ellipsis-one-line,
    .main-trackInfo-container {
        margin-left: 74px;
    } /* static cover */
    .main-coverSlotExpanded-container {
        border-radius: 10px;
        position: fixed;
        top: calc(100% - 307px);
        left: calc(100% - 208px);
        width: 200px;
        height: 200px;
        visibility: hidden;
        transform-origin: center;
        animation: 1s coverExpandedIn;
        animation-fill-mode: forwards;
    } /* dynamic cover */
    .main-coverSlotCollapsed-container[aria-hidden="true"] {
        left: calc(100vw - 162px);
        top: -231px;
        width: 200px;
        height: 200px;
        visibility: hidden;
        animation: 1s coverExpandedOut;
    }
    .Q4cc5RktWgz2H8_vDrIS {
        display: none;
    }
    @keyframes coverExpandedIn {
        99% {
            visibility: hidden;
        }
        100% {
            visibility: visible;
        }
    }
    @keyframes coverExpandedOut {
        99% {
            visibility: visible;
        }
        100% {
            visibility: hidden;
        }
    }
    .main-coverSlotCollapsed-container {
        position: fixed;
        top: -6px;
        left: 0px;
        width: 56px;
        height: 56px;
        visibility: visible;
        z-index: 1;
    }
    .cover-art .cover-art-image,
    .main-coverSlotCollapsed-container {
        transform-origin: center;
        transition-timing-function: ease-in;
        transition: width 0.5s 0.2s, height 0.5s 0.2s, top 0.3s, left 0.5s;
    }
    .main-coverSlotCollapsed-container[aria-hidden="false"] {
        transition-timing-function: ease-out !important;
        transition: width 0.5s 0.2s, height 0.5s 0.2s, top 0.5s 0.1s, left 0.3s !important;
    }
    .main-coverSlotCollapsed-container[aria-hidden="true"] .cover-art .cover-art-image,
    .main-nowPlayingWidget-coverExpanded .main-coverSlotCollapsed-container .cover-art .cover-art-image {
        width: 200px;
        height: 200px;
    }
    .main-nowPlayingBar-left {
        z-index: 2;
    }
    .main-nowPlayingBar-center {
        z-index: 1;
    }
    .cover-art {
        background-color: transparent;
    }`;

    let leftSideCoverArt = `
    /* hide small cover art when expanded */
    .main-nowPlayingWidget-coverExpanded .main-coverSlotCollapsed-container.main-coverSlotCollapsed-navAltContainer {
        visibility: hidden;
    }`;

    let hideHomePageRecommendation = `
    /* disable homepage recommendation */
    section[data-testid="home-page"] .main-shelf-shelf:not([aria-label="Recently played"]) {
        display: none !important;
    }`;

    let hideLikedSongsCard = `
    /* remove liked songs card in your library */
    .main-heroCard-card.collection-collectionEntityHeroCard-likedSongs.collection-collectionEntityHeroCard-container {
        display: none;
    }`;

    let hideLikedSongsCardTexts = `
    /* blue like card useless text in your library */
    .collection-collectionEntityHeroCard-tracksContainer {
        display: none;
    }`;

    let hideSimilarSongsRecommendation = `
    /* disable similar song suggestion in playlist */
    .playlist-playlist-seeMore,
    .playlist-playlist-playlistInlineCurationSection,
    .playlist-playlist-searchResultListContainer,
    .playlist-playlist-recommendedTrackList {
        display: none !important;
    }`;

    let hidePlaylistImageEditButton = `
    /* remove playlist edit image button */
    .main-editImageButton-overlay {
        display: none;
    }`;

    let hideRadioGradient = `
    /* radio gradient hidden */
    .KNUIWLKuuA1qIkTt4jus:after {
        background: none !important;
    }`;

    let hideSideBarStatus = `
    /* hide sidebar status */
    .main-rootlist-statusIcons {
        display: none;
    }`;

    let hideCardsDownloadStatus = `
    /* hide cards download status */
    .main-card-DownloadStatusIndicator {
        display: none;
    }`;

    let nordLyrics = `
    /* spotify lyrics background norded */
    .lyrics-lyrics-container * {
        --lyrics-color-active: var(--spice-text);
        --lyrics-color-background: none;
        --lyrics-color-inactive: rgba(var(--spice-rgb-text), 0.7);
        --lyrics-color-messaging: var(--spice-text);
    }`;

    let hideFriendActivity = `
    /* hide friend activity */
    .main-nowPlayingBar-right button[aria-label="Friend Activity"] {
        display: none;
    }`;

    let hideSpotifyConnect = `
    /* hide spotify connect */
    .PrhIVExjBkmjHt6Ea4XE {
        display: none;
    }`;

    let hideWindowsControl = `
    /* Hide windows controls */
    /* Mama element */
    .nav-alt .Root__top-container {
        background-image: linear-gradient(#515c71, #515c71); /* depends on the color */
        background-repeat: no-repeat;
        background-position: top right;
        background-size: 135px 31px; /* depends on the set page zoom - this value is for 100% */
    }
    /* Top Bar element */
    .Root__fixed-top-bar {
        background-image: linear-gradient(#515c71, #515c71); /* depends on the color */
        background-repeat: no-repeat;
        background-position: top right;
        background-size: 127px 23.5px; /* depends on the set page zoom - this value is for 100% */
    }`;

    let betterFont = `
    /* Better Font (Quicksand) */
    @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap");
    * {
        font-family: "Quicksand", sans-serif !important;
    }`;

    let hideAds = `
    /* upgrade button top bar */
    button[title="Upgrade to Premium"],
    button[aria-label="Upgrade to Premium"],
    .main-topBar-UpgradeButton,
    /* top bar user context menu Upgrade to Premium */
    .main-contextMenu-menuItem a[href="https://www.spotify.com/premium/"],
    /* top side ads */
    .WiPggcPDzbwGxoxwLWFf,
    /* bottom ads */
    .Root__main-view > div:nth-child(2) /* mama div of main-leaderboardComponent-container */,
    .main-leaderboardComponent-container,
    /* popup video ad */
    .Root__modal-slot .GenericModal__overlay.QMMTQfEw3AIHFf4dTRp3.nPKDEvIoCzySBR24pZiN {
        display: none !important;
    }

    /* no idea what these are */
    .Root__ads-container-desktop--is-hidden,
    .sponsor-container,
    .desktoproutes-homepage-takeover-ad-hptoComponent-parentContainer {
        display: none !important;
    }`;

    let hideSideBarScrollBar = `
    /* hides sidebar scrollbar */
    .os-scrollbar:nth-child(6) .os-scrollbar-handle {
        visibility: hidden;
    }`;

    let highlightSideBarItem = `
    /* sidebar selected item (main items) */
    .personal-library .main-collectionLinkButton-collectionLinkButton.main-collectionLinkButton-selected.active,
    .main-navBar-navBarItem .main-navBar-navBarLinkActive {
        background-color: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
    }`;

    let highlightSideBarSelectedItem = `
    /* sidebar selected playlist */
    .main-rootlist-rootlistItem .main-rootlist-rootlistItemLinkActive:hover,
    .main-rootlist-rootlistItem .main-rootlist-rootlistItemLinkActive {
        color: var(--spice-custom-link-hover) !important;
    }`;

    let boldedSideBarItems = `
    /* sidebar playlist names */
    .main-rootlist-rootlistItem span {
        font-weight: bold;
    }`;

    let hideSideBarDivider = `
    /* sidebar divider invisible */
    .LayoutResizer__resize-bar {
        background: none;
    }`;

    let hideTopGradient = `
    /* Hide playlist gradient top */
    .main-entityHeader-backgroundColor {
        display: none !important;
    }
    /* Hide playlist gradient bottom */
    .main-actionBarBackground-background {
        display: none !important;
    }
    /* remove gradient color on home screen */
    .main-home-homeHeader {
        display: none !important;
    }`;

    let hideCurrentPlayingSongBG = `
    /* current playing song background */
    div.main-rootlist-wrapper > div:nth-child(2) > div .main-trackList-active {
        border-radius: 10px;
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.6);
    }`;

    let betterGenre = `
    /* seearch page genre card background */
    .x-categoryCard-CategoryCard {
        background-color: var(--spice-custom-main-soft-secondary) !important;
        padding-bottom: 30px;
        transition: transform, 0s, ease, 0.25s;
    }
    .x-categoryCard-CategoryCard:hover {
        background-color: var(--spice-custom-main-secondary) !important;
        transition: transform, 0s, ease, 0.25s;
    }
    /* search page genre images */
    .tV9cjMpTPaykKsn2OVsw {
        border-radius: 10px;
    }`;

    let artistBigImage = `
    /* Artist big image */
    .main-entityHeader-container.main-entityHeader-withBackgroundImage,
    .main-entityHeader-background,
    .main-entityHeader-background.main-entityHeader-overlay:after {
        height: calc(100vh - 105px) !important;
    }
    .main-entityHeader-withBackgroundImage .main-entityHeader-headerText {
        position: fixed;
        justify-content: center;
        bottom: 3%;
    }
    .main-entityHeader-container.main-entityHeader-nonWrapped.main-entityHeader-withBackgroundImage {
        padding-left: 3%;
    }
    .main-entityHeader-background.main-entityHeader-overlay {
        display: none;
    }`;

    let hideTopBarPlayButton = `
    /* remove play button from topbar */
    :root .Root__top-bar header .main-playButton-PlayButton {
        display: none !important;
    }`;

    let hideDotsUnderPlayerButtons = `
    /* hide dots under active button */
    .main-shuffleButton-button.main-shuffleButton-active:after,
    .main-repeatButton-button.main-repeatButton-active:after,
    /* queue */
    .control-button--active-dot:after {
        display: none;
    }`;

    let pointers = `
    button,
    .show-followButton-button,
    .main-dropDown-dropDown,
    .x-toggle-wrapper,
    .main-playlistEditDetailsModal-closeBtn,
    .main-trackList-rowPlayPauseButton,
    .main-rootlist-rootlistItemLink:link,
    .main-rootlist-rootlistItemLink:visited,
    .x-sortBox-sortDropdown,
    .main-contextMenu-menuItemButton,
    .main-trackList-column,
    .main-moreButton-button,
    .x-downloadButton-button,
    .main-playButton-PlayButton,
    .main-coverSlotExpandedCollapseButton-chevron,
    .main-coverSlotCollapsed-chevron,
    .control-button:focus,
    .control-button:hover,
    .main-repeatButton-button,
    .main-skipForwardButton-button,
    .main-playPauseButton-button,
    .main-skipBackButton-button,
    .main-shuffleButton-button,
    .main-addButton-button,
    .progress-bar__slider,
    .playback-bar,
    .main-editImageButton-image,
    .X1lXSiVj0pzhQCUo_72A  /* collaborate button in playlist */ ,
    #spicetify-playlist-list .main-rootlist-wrapper /* sidebar playlist hover */ {
        cursor: pointer !important;
    }`;

    let betterSpotifyLyrics = `
    /* better spotify lyrics style  */
    .lyrics-lyrics-contentContainer .lyrics-lyricsContent-lyric.lyrics-lyricsContent-highlight {
        filter: blur(1.5px);
        padding: 15px;
        font-size: 110%;
    }
    .lyrics-lyrics-contentContainer .lyrics-lyricsContent-lyric.lyrics-lyricsContent-active {
        filter: none;
        padding: 20px;
        font-size: 140%;
    }
    .lyrics-lyrics-contentContainer .lyrics-lyricsContent-lyric {
        filter: blur(1.5px);
        padding: 15px;
        font-size: 110%;
    }
    .lyrics-lyrics-contentContainer .lyrics-lyricsContent-lyric.lyrics-lyricsContent-unsynced {
        filter: none;
        padding: 10px;
        font-size: 100%;
    }`;

    let betterLyricsPlus = `
    /* lyrics plus compact off style */
    .lyrics-lyricsContainer-LyricsContainer .lyrics-lyricsContainer-LyricsLine.lyrics-lyricsContainer-LyricsLine-active {
        padding: 15px;
        filter: none;
        font-size: 250%;
    }
    .lyrics-lyricsContainer-LyricsContainer .lyrics-lyricsContainer-LyricsLine {
        padding: 15px;
        filter: blur(1.5px);
        font-size: 210%;
    }`;

    let bubbleUI = `
    /* bubble UI */
    :root {
        --spice-sidebar: var(--spice-main);
    }`;

    let hideSpotifyFullScreen = `
    /* hide spotify premium full screen */
    .control-button[aria-label="Full screen"] {
        display: none;
    }`;

    let hideMarketplace = `
    /* hide marketplace */
    .main-navBar-navBarItem[data-id="/marketplace"] {
        display: none;
    }`;

    ////////////////////////////////////// UI ///////////////////////////////////////////

    let style = React.createElement(
        "style",
        null,
        `.popup-row::after {
                    content: "";
                    display: table;
                    clear: both;
                }
                .popup-row .col {
                    display: flex;
                    padding: 10px 0;
                    align-items: center;
                }
                .popup-row .col.description {
                    float: left;
                    padding-right: 15px;
                }
                .popup-row .col.action {
                    float: right;
                    text-align: right;
                }
                .popup-row .div-title {
                    color: var(--spice-text);
                }                
                .popup-row .divider {
                    height: 2px;
                    border-width: 0;
                    background-color: var(--spice-button-disabled);
                }
                .popup-row .space {
                    margin-bottom: 20px;
                    visibility: hidden;
                }
                .popup-row .info {
                    /* font-size: 13px; */
                }
                .popup-row .demo {
                    font-size: 13px;
                    color: #59CE8F;
                }
                .popup-row .little-space {
                    margin-bottom: 10px;
                }
                .popup-row .inputbox {
                    display: flex;
                    flex-direction: column;
                    padding: 15px;
                    border-radius: 15px;
                    border: 0;
                    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
                }
                button.checkbox {
                    align-items: center;
                    border: 0px;
                    border-radius: 50%;
                    background-color: rgba(var(--spice-rgb-shadow), 0.7);
                    color: var(--spice-text);
                    cursor: pointer;
                    display: flex;
                    margin-inline-start: 12px;
                    padding: 8px;
                }
                button.checkbox.disabled {
                    color: rgba(var(--spice-rgb-text), 0.3);
                }
                select {
                    color: var(--spice-text);
                    background: rgba(var(--spice-rgb-shadow), 0.7);
                    border: 0;
                    height: 32px;
                }
                ::-webkit-scrollbar {
                    width: 8px;
                }
                .login-button {
                    background-color: var(--spice-button);
                    border-radius: 8px;
                    border-style: none;
                    color: var(--spice-text);
                    cursor: pointer;
                    font-size: 14px;
                    height: 40px;
                    margin: 10px;
                    padding: 5px 10px;
                    text-align: center;
                }
                .green {
                    background-color: #6BCB77;
                    color: #25316D;
                }
                .red {
                    background-color: #bf616a;
                }`
    );

    function DisplayIcon({ icon, size }) {
        return React.createElement("svg", {
            width: size,
            height: size,
            viewBox: "0 0 16 16",
            fill: "currentColor",
            dangerouslySetInnerHTML: {
                __html: icon,
            },
        });
    }

    function checkBoxItem({ name, field, onclickFun = () => {} }) {
        let [value, setValue] = useState(CONFIG[field]);
        return React.createElement(
            "div",
            { className: "popup-row" },
            React.createElement("label", { className: "col description" }, name),
            React.createElement(
                "div",
                { className: "col action" },
                React.createElement(
                    "button",
                    {
                        className: "checkbox" + (value ? "" : " disabled"),
                        onClick: async () => {
                            let state = !value;
                            CONFIG[field] = state;
                            setValue(state);
                            await saveConfig();
                            onclickFun();
                        },
                    },
                    React.createElement(DisplayIcon, { icon: Spicetify.SVGIcons.check, size: 16 })
                )
            )
        );
    }

    function ButtonItem({ name, color = "", onclickFun }) {
        return React.createElement(
            "button",
            {
                className: `login-button${color}`,
                onClick: async () => {
                    onclickFun();
                },
            },
            name
        );
    }

    let settingsDOMContent = React.createElement(
        "div",
        null,
        style,
        React.createElement("div", { className: "popup-row" }, React.createElement("h3", { className: "div-title" }, "Home")),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
        React.createElement(checkBoxItem, {
            name: "Hide Home Page Recommendation",
            field: "hideHomePageRecommendation",
            onclickFun: () => {
                theme(hideHomePageRecommendation, "nord--hideHomePageRecommendation", CONFIG.hideHomePageRecommendation);
            },
        }),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
        React.createElement("div", { className: "popup-row" }, React.createElement("h3", { className: "div-title" }, "SideBar")),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
        React.createElement(checkBoxItem, {
            name: "Hide Marketplace",
            field: "hideMarketplace",
            onclickFun: () => {
                theme(hideMarketplace, "nord--hideMarketplace", CONFIG.hideMarketplace);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide SideBar ScrollBar",
            field: "hideSideBarScrollBar",
            onclickFun: () => {
                theme(hideSideBarScrollBar, "nord--hideSideBarScrollBar", CONFIG.hideSideBarScrollBar);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Highlight SideBar Selected Items (Main Items)",
            field: "highlightSideBarItem",
            onclickFun: () => {
                theme(highlightSideBarItem, "nord--highlightSideBarItem", CONFIG.highlightSideBarItem);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Highlight SideBar Items (Playlists)",
            field: "highlightSideBarSelectedItem",
            onclickFun: () => {
                theme(highlightSideBarSelectedItem, "nord--highlightSideBarSelectedItem", CONFIG.highlightSideBarSelectedItem);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "SideBar Playlist Names bold",
            field: "boldedSideBarItems",
            onclickFun: () => {
                theme(boldedSideBarItems, "nord--boldedSideBarItems", CONFIG.boldedSideBarItems);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide SideBar Divider",
            field: "hideSideBarDivider",
            onclickFun: () => {
                theme(hideSideBarDivider, "nord--hideSideBarDivider", CONFIG.hideSideBarDivider);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide SideBar Status",
            field: "hideSideBarStatus",
            onclickFun: () => {
                theme(hideSideBarStatus, "nord--hideSideBarStatus", CONFIG.hideSideBarStatus);
            },
        }),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
        React.createElement("div", { className: "popup-row" }, React.createElement("h3", { className: "div-title" }, "Player")),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
        React.createElement(checkBoxItem, {
            name: "Right Side Cover Art",
            field: "rightSideCoverArt",
            onclickFun: () => {
                CONFIG.leftSideCoverArt = !CONFIG.rightSideCoverArt;
                saveConfig();
                theme(rightSideCoverArt, "nord--rightSideCoverArt", CONFIG.rightSideCoverArt);
                theme(leftSideCoverArt, "nord--leftSideCoverArt", CONFIG.leftSideCoverArt);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Player Friend Activity",
            field: "hideFriendActivity",
            onclickFun: () => {
                theme(hideFriendActivity, "nord--hideFriendActivity", CONFIG.hideFriendActivity);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Player Spotify Connect",
            field: "hideSpotifyConnect",
            onclickFun: () => {
                theme(hideSpotifyConnect, "nord--hideSpotifyConnect", CONFIG.hideSpotifyConnect);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Player Spotify Full Screen",
            field: "hideSpotifyFullScreen",
            onclickFun: () => {
                theme(hideSpotifyFullScreen, "nord--hideSpotifyFullScreen", CONFIG.hideSpotifyFullScreen);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Dots Under Player Buttons",
            field: "hideDotsUnderPlayerButtons",
            onclickFun: () => {
                theme(hideDotsUnderPlayerButtons, "nord--hideDotsUnderPlayerButtons", CONFIG.hideDotsUnderPlayerButtons);
            },
        }),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
        React.createElement("div", { className: "popup-row" }, React.createElement("h3", { className: "div-title" }, "Playlist")),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
        React.createElement(checkBoxItem, {
            name: "Hide Playlist Similar Songs Recommendation",
            field: "hideSimilarSongsRecommendation",
            onclickFun: () => {
                theme(hideSimilarSongsRecommendation, "nord--hideSimilarSongsRecommendation", CONFIG.hideSimilarSongsRecommendation);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Current Playing Song BG",
            field: "hideCurrentPlayingSongBG",
            onclickFun: () => {
                theme(hideCurrentPlayingSongBG, "nord--hideCurrentPlayingSongBG", !CONFIG.hideCurrentPlayingSongBG);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Playlist Image Edit Button",
            field: "hidePlaylistImageEditButton",
            onclickFun: () => {
                theme(hidePlaylistImageEditButton, "nord--hidePlaylistImageEditButton", CONFIG.hidePlaylistImageEditButton);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Radio Gradient",
            field: "hideRadioGradient",
            onclickFun: () => {
                theme(hideRadioGradient, "nord--hideRadioGradient", CONFIG.hideRadioGradient);
            },
        }),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
        React.createElement("div", { className: "popup-row" }, React.createElement("h3", { className: "div-title" }, "Your Library")),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
        React.createElement(checkBoxItem, {
            name: "Hide Your Library Liked Song's Card",
            field: "hideLikedSongsCard",
            onclickFun: () => {
                theme(hideLikedSongsCard, "nord--hideLikedSongsCard", CONFIG.hideLikedSongsCard);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Your Library Liked Song's Card Text",
            field: "hideLikedSongsCardTexts",
            onclickFun: () => {
                theme(hideLikedSongsCardTexts, "nord--hideLikedSongsCardTexts", CONFIG.hideLikedSongsCardTexts);
            },
        }),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
        React.createElement("div", { className: "popup-row" }, React.createElement("h3", { className: "div-title" }, "Misc")),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
        React.createElement(checkBoxItem, {
            name: "Hide Ads",
            field: "hideAds",
            onclickFun: () => {
                theme(hideAds, "nord--hideAds", CONFIG.hideAds);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Better Font",
            field: "betterFont",
            onclickFun: () => {
                theme(betterFont, "nord--betterFont", CONFIG.betterFont);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Top Gradient",
            field: "hideTopGradient",
            onclickFun: () => {
                theme(hideTopGradient, "nord--hideTopGradient", CONFIG.hideTopGradient);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Better Genre",
            field: "betterGenre",
            onclickFun: () => {
                theme(betterGenre, "nord--betterGenre", CONFIG.betterGenre);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Big Artist Image",
            field: "artistBigImage",
            onclickFun: () => {
                theme(artistBigImage, "nord--artistBigImage", CONFIG.artistBigImage);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Pointers",
            field: "pointers",
            onclickFun: () => {
                theme(pointers, "nord--pointers", CONFIG.pointers);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Spotify Lyrics Nord BG",
            field: "nordLyrics",
            onclickFun: () => {
                theme(nordLyrics, "nord--nordLyrics", CONFIG.nordLyrics);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Better Spotify Lyrics",
            field: "betterSpotifyLyrics",
            onclickFun: () => {
                theme(betterSpotifyLyrics, "nord--betterSpotifyLyrics", CONFIG.betterSpotifyLyrics);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Better Lyrics Plus",
            field: "betterLyricsPlus",
            onclickFun: () => {
                theme(betterLyricsPlus, "nord--betterLyricsPlus", CONFIG.betterLyricsPlus);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide TopBar Play Button",
            field: "hideTopBarPlayButton",
            onclickFun: () => {
                theme(hideTopBarPlayButton, "nord--hideTopBarPlayButton", CONFIG.hideTopBarPlayButton);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Cards Download Status",
            field: "hideCardsDownloadStatus",
            onclickFun: () => {
                theme(hideCardsDownloadStatus, "nord--hideCardsDownloadStatus", CONFIG.hideCardsDownloadStatus);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Windows OS Control - Nord Only (Experimental Feature)",
            field: "hideWindowsControl",
            onclickFun: () => {
                theme(hideWindowsControl, "nord--hideWindowsControl", CONFIG.hideWindowsControl);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Bubble UI",
            field: "bubbleUI",
            onclickFun: () => {
                theme(bubbleUI, "nord--bubbleUI", !CONFIG.bubbleUI);
            },
        }),
        React.createElement(ButtonItem, {
            name: "Like on GitHub 👍",
            onclickFun: () => {
                window.open("https://github.com/Tetrax-10/Nord-Spotify");
            },
        })
    );

    function settingsPage() {
        Spicetify.PopupModal.display({
            title: "Nord Spotify",
            content: settingsDOMContent,
            isLarge: true,
        });
    }

    ////////////////////////////////////// Menu ///////////////////////////////////////////

    new Spicetify.Topbar.Button("Nord Spotify", "heart-active", settingsPage);

    ////////////////////////////////////// Functions ///////////////////////////////////////////

    let body = document.querySelector("body");

    function injectCSS(cssStyle, id) {
        if (!body.classList.contains(id)) {
            let styleElement = document.createElement("style");
            styleElement.innerHTML = cssStyle;
            styleElement.id = id;
            body.appendChild(styleElement);
            body.classList.add(id);
        }
    }

    function removeInjectedCSS(id) {
        let styleElement = document.getElementById(id);
        if (body.classList.contains(id) && styleElement) {
            styleElement.remove();
            body.classList.remove(id);
        }
    }

    function theme(cssStyle, id, bool) {
        if (bool) {
            injectCSS(cssStyle, id);
        } else {
            removeInjectedCSS(id);
        }
    }

    function countNoOfSlashes(string) {
        let count = 0;
        string.split("").forEach((char) => {
            if (char == "/") {
                count++;
            }
        });
        return count;
    }

    ////////////////////////////////////// Main ///////////////////////////////////////////

    injectCSS(nordSpotify, "nord--nordSpotify");

    let data = Spicetify.Platform.History.location;

    if ((data.pathname.includes("/artist/") || data.pathname.includes("/playlist/")) && countNoOfSlashes(data.pathname) == 2) {
        injectCSS(hideArtistTopBar, "nord--hideArtistTopBar");
    } else {
        removeInjectedCSS("nord--hideArtistTopBar");
    }

    Spicetify.Platform.History.listen((data) => {
        if ((data.pathname.includes("/artist/") || data.pathname.includes("/playlist/")) && countNoOfSlashes(data.pathname) == 2) {
            injectCSS(hideArtistTopBar, "nord--hideArtistTopBar");
        } else {
            removeInjectedCSS("nord--hideArtistTopBar");
        }
    });

    theme(hideHomePageRecommendation, "nord--hideHomePageRecommendation", CONFIG.hideHomePageRecommendation);

    theme(hideSideBarScrollBar, "nord--hideSideBarScrollBar", CONFIG.hideSideBarScrollBar);

    theme(highlightSideBarItem, "nord--highlightSideBarItem", CONFIG.highlightSideBarItem);

    theme(highlightSideBarSelectedItem, "nord--highlightSideBarSelectedItem", CONFIG.highlightSideBarSelectedItem);

    theme(boldedSideBarItems, "nord--boldedSideBarItems", CONFIG.boldedSideBarItems);

    theme(hideSideBarDivider, "nord--hideSideBarDivider", CONFIG.hideSideBarDivider);

    theme(hideSideBarStatus, "nord--hideSideBarStatus", CONFIG.hideSideBarStatus);

    theme(rightSideCoverArt, "nord--rightSideCoverArt", CONFIG.rightSideCoverArt);

    theme(leftSideCoverArt, "nord--leftSideCoverArt", CONFIG.leftSideCoverArt);

    theme(hideFriendActivity, "nord--hideFriendActivity", CONFIG.hideFriendActivity);

    theme(hideSpotifyConnect, "nord--hideSpotifyConnect", CONFIG.hideSpotifyConnect);

    theme(hideSpotifyFullScreen, "nord--hideSpotifyFullScreen", CONFIG.hideSpotifyFullScreen);

    theme(hideDotsUnderPlayerButtons, "nord--hideDotsUnderPlayerButtons", CONFIG.hideDotsUnderPlayerButtons);

    theme(hideSimilarSongsRecommendation, "nord--hideSimilarSongsRecommendation", CONFIG.hideSimilarSongsRecommendation);

    theme(hideCurrentPlayingSongBG, "nord--hideCurrentPlayingSongBG", !CONFIG.hideCurrentPlayingSongBG);

    theme(hidePlaylistImageEditButton, "nord--hidePlaylistImageEditButton", CONFIG.hidePlaylistImageEditButton);

    theme(hideRadioGradient, "nord--hideRadioGradient", CONFIG.hideRadioGradient);

    theme(hideLikedSongsCard, "nord--hideLikedSongsCard", CONFIG.hideLikedSongsCard);

    theme(hideLikedSongsCardTexts, "nord--hideLikedSongsCardTexts", CONFIG.hideLikedSongsCardTexts);

    theme(hideAds, "nord--hideAds", CONFIG.hideAds);

    theme(betterFont, "nord--betterFont", CONFIG.betterFont);

    theme(hideTopGradient, "nord--hideTopGradient", CONFIG.hideTopGradient);

    theme(betterGenre, "nord--betterGenre", CONFIG.betterGenre);

    theme(artistBigImage, "nord--artistBigImage", CONFIG.artistBigImage);

    theme(pointers, "nord--pointers", CONFIG.pointers);

    theme(nordLyrics, "nord--nordLyrics", CONFIG.nordLyrics);

    theme(betterSpotifyLyrics, "nord--betterSpotifyLyrics", CONFIG.betterSpotifyLyrics);

    theme(betterLyricsPlus, "nord--betterLyricsPlus", CONFIG.betterLyricsPlus);

    theme(hideTopBarPlayButton, "nord--hideTopBarPlayButton", CONFIG.hideTopBarPlayButton);

    theme(hideCardsDownloadStatus, "nord--hideCardsDownloadStatus", CONFIG.hideCardsDownloadStatus);

    theme(hideWindowsControl, "nord--hideWindowsControl", CONFIG.hideWindowsControl);

    theme(bubbleUI, "nord--bubbleUI", !CONFIG.bubbleUI);

    theme(hideMarketplace, "nord--hideMarketplace", CONFIG.hideMarketplace);
}
