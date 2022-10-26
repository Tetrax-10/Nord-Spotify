// @ts-chec

// NAME: Nord Spotify
// AUTHOR: Tetrax-10
// DESCRIPTION: Nord Spotify Extension

/// <reference path="../dev/globals.d.ts" />

window.NordSpotify = {
    Reset: () => {
        localStorage.removeItem("nord:settings");
        console.log("%cNord Spotify Reset Successful", "color: #59CE8F");
    },
};

(async function nord() {
    if (!Spicetify.Platform) {
        setTimeout(nord, 300);
        return;
    }
    await initNord();
})();

async function initNord() {
    const { React } = Spicetify;
    const { useState } = React;

    let versionInfo = await Spicetify.CosmosAsync.get("sp://desktop/v1/version");

    let userConfig = Spicetify.Config;

    let body = await waitForElement("body", 5000);

    let isNewUI = await isNewUIFunc();

    let isPremium = await isPremiumFunc();

    let isWindows = os("Win");

    let server = "https://tetrax-10.github.io/Nord-Spotify/";

    let isMarketplace = userConfig.current_theme == "Nord Spotify" ? true : false;

    let priority = isMarketplace ? " !important" : "";

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
            return {};
        }
    }

    const defaultSettings = {
        artistBigImage: true,
        customFont: true,
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
        hideWindowsControls: true,
        hideWindowsControlsValues: {
            height: "31",
            width: "135",
            filter: "2.13",
        },
        highlightSideBarItem: true,
        highlightSideBarSelectedItem: true,
        nordLyrics: true,
        pointers: true,
        rightSideCoverArt: true,
        hideMarketplace: false,
        quickSearch: false,
        search: false,
        redo: false,
        darkSideBar: false,
        dev: false,
        localCSS: false,
        localColor: false,
        rightClickToReload: false,
        isReload: true,
        customFontURL: "https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap",
        customFontName: "Quicksand",
        colorScheme: "Nord",
        colorSchemeBasedOn: "Nord",
        fontSize: "100%",
        fontSizeBool: false,
        colorSchemes: {
            Nord: {
                Name: "Nord",
                text: "#B2BCCC",
                subtext: "#B2BCCC",
                main: "#2E3440",
                sidebar: "#262B35",
                player: "#2E3440",
                card: "#2E3440",
                button: "#8A99AF",
                buttonActive: "#718CAD",
                buttonDisabled: "#434C5E",
                notification: "#363D4C",
                notificationError: "#A9555E",
                shadow: "#1D2128",
                tabActive: "#363D4C",
                playbackBar: "#DEDEDE",
                misc: "#DEDEDE",
                selectedRow: "#DEDEDE",
                customMainSecondary: "#3B4354",
                customMainSoftSecondary: "#363D4C",
                customHighlight: "#454E61",
                customLinkHover: "#5687C5",
                customSelectedButton: "#4C566A",
                customSubdued: "#8A99AF",
                customSuccess: "#76BA99",
            },
            Nightly: {
                Name: "Nightly",
                text: "#8A9CBC",
                subtext: "#8A9CBC",
                main: "#1D2428",
                sidebar: "#181E24",
                player: "#1D2428",
                card: "#1D2428",
                button: "#687791",
                buttonActive: "#879ABC",
                buttonDisabled: "#33424A",
                notification: "#242D35",
                notificationError: "#A9555E",
                shadow: "#1D2128",
                tabActive: "#242D35",
                playbackBar: "#DEDEDE",
                misc: "#DEDEDE",
                selectedRow: "#DEDEDE",
                customMainSecondary: "#2B363E",
                customMainSoftSecondary: "#242D35",
                customHighlight: "#34414B",
                customLinkHover: "#95B5F0",
                customSelectedButton: "#33424A",
                customSubdued: "#7084A1",
                customSuccess: "#76BA99",
            },
            Comfy: {
                Name: "Comfy",
                text: "#9199BA",
                subtext: "#9199BA",
                main: "#23283D",
                sidebar: "#1E2233",
                player: "#23283D",
                card: "#23283D",
                button: "#7289DA",
                buttonActive: "#849DF5",
                buttonDisabled: "#38436B",
                notification: "#2B3046",
                notificationError: "#A9555E",
                shadow: "#000519",
                tabActive: "#2B3046",
                playbackBar: "#DEDEDE",
                misc: "#DEDEDE",
                selectedRow: "#DEDEDE",
                customMainSecondary: "#32374D",
                customMainSoftSecondary: "#2B3046",
                customHighlight: "#40486D",
                customLinkHover: "#A4B1EA",
                customSelectedButton: "#3E4460",
                customSubdued: "#6774A2",
                customSuccess: "#76BA99",
            },
            Spotify: {
                Name: "Spotify",
                text: "#B3B3B3",
                subtext: "#B3B3B3",
                main: "#121212",
                sidebar: "#000000",
                player: "#121212",
                card: "#121212",
                button: "#1DB954",
                buttonActive: "#1ED760",
                buttonDisabled: "#535353",
                notification: "#4687D6",
                notificationError: "#E22134",
                shadow: "#000000",
                tabActive: "#333333",
                playbackBar: "#DEDEDE",
                misc: "#DEDEDE",
                selectedRow: "#DEDEDE",
                customMainSecondary: "#2A2A2A",
                customMainSoftSecondary: "#202020",
                customHighlight: "#5A5A5A",
                customLinkHover: "#FFFFFF",
                customSelectedButton: "#505050",
                customSubdued: "#7A7A7A",
                customSuccess: "#1DB954",
            },
        },
    };

    async function saveConfig() {
        await setLocalStorageDataWithKey("nord:settings", JSON.stringify(CONFIG));
    }

    let CONFIG = await getConfig();

    function initConfigItems(item, value) {
        if (CONFIG[item] == undefined) {
            CONFIG[item] = value;
        } else {
            return;
        }
    }

    Object.keys(defaultSettings).forEach((key) => {
        initConfigItems(key, defaultSettings[key]);
    });

    Object.keys(defaultSettings.colorSchemes).forEach((key) => {
        if (CONFIG.colorSchemes[key] == undefined) {
            CONFIG.colorSchemes[key] = defaultSettings.colorSchemes[key];
        }
    });

    await saveConfig();

    ////////////////////////////////////// Preprocessor ///////////////////////////////////////////

    let hideWindowsControlsValues = structuredClone(CONFIG.hideWindowsControlsValues);
    let colorSchemes = structuredClone(CONFIG.colorSchemes);

    let colorSchemesOptions = {};
    Object.keys(CONFIG.colorSchemes).forEach((key) => {
        colorSchemesOptions[key] = colorSchemes[key]["Name"];
    });

    injectColor(`${CONFIG.colorScheme}`);

    if (CONFIG.dev && CONFIG.localCSS && !isMarketplace) {
        server = "";
    } else {
        if (isMarketplace) {
            injectStyleSheet(`${server}src/nord.css`, "nord--nordSpotify");
        }
    }

    if (isNewUI) {
        injectStyleSheet(`${server}src/Snippets/NewUI.css`, "nord--NewUI");
    } else {
        injectStyleSheet(`${server}src/Snippets/OldUI.css`, "nord--OldUI");
    }

    NordSpotify.Config = CONFIG;
    NordSpotify.Save = saveConfig;
    NordSpotify.Reload = forceReload;
    NordSpotify.ResetItem = ResetItem;

    ////////////////////////////////////// CSS Snippets ///////////////////////////////////////////

    let hideArtistTopBarNew = `
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
        margin-top: -1px;
        left: 0px;
        transition: all 0s ease;
    }`;

    let hideArtistTopBarOld = `
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
        position: absolute;
        left: 0px;
        transition: all 0s ease;
    }`;

    let rightSideCoverArtNew = `
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
    .main-coverSlotExpanded-exitActive {
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

    let rightSideCoverArtOld = `
    /* right side cover art */
    .main-nowPlayingWidget-nowPlaying > .ellipsis-one-line,
    .main-trackInfo-container {
        margin-left: 74px;
    }
    /* static cover */
    .main-coverSlotExpanded-container {
        border-radius: 10px;
        position: fixed;
        top: calc(100% - 300px);
        left: calc(100% - 210px);
        width: 200px;
        height: 200px;
        visibility: hidden;
        transform-origin: center;
        animation: 1s coverExpandedIn;
        animation-fill-mode: forwards;
    }
    /* dynamic cover */
    .main-coverSlotCollapsed-container[aria-hidden="true"] {
        left: calc(100vw - 154px);
        top: -233px;
        width: 200px;
        height: 200px;
        visibility: hidden;
        animation: 1s coverExpandedOut;
    }
    .main-coverSlotExpanded-exitActive {
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

    let artistBigImageNew = `
    .main-entityHeader-container.main-entityHeader-withBackgroundImage,
    .main-entityHeader-background,
    .main-entityHeader-background.main-entityHeader-overlay:after {
        height: calc(100vh - 105px) !important;
    }`;

    let artistBigImageOld = `
    .main-entityHeader-container.main-entityHeader-withBackgroundImage,
    .main-entityHeader-background,
    .main-entityHeader-background.main-entityHeader-overlay:after {
        height: calc(100vh - 90px) !important;
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
        --spice-sidebar: var(--spice-main) !important;
    }
    .main-nowPlayingBar-center .x-progressBar-progressBarBg .x-progressBar-sliderArea {
        border-radius: 10px !important;
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

    let darkSideBar = `
    /* Dark SideBar */
    :root {
        --spice-sidebar: var(--spice-main) !important;
    }`;

    let hideOverlayBig = `
    /* Hide Overlay */
    .GenericModal__overlay {
        background-color: transparent;
    }
    .main-embedWidgetGenerator-container {
        box-shadow: 0 0 50px rgba(var(--spice-rgb-shadow), 1) !important;
    }`;

    let hideOverlaySmall = `
    /* Hide Overlay */
    .GenericModal__overlay {
        background-color: transparent;
    }
    .main-trackCreditsModal-container {
        box-shadow: 0 0 50px rgba(var(--spice-rgb-shadow), 1) !important;
        width: 100% !important;
        max-width: 520px !important;
    }`;

    let injectPopupCSS = `
    .GenericModal__overlay {
        visibility: hidden;
    }
    .GenericModal {
        visibility: visible;
    }`;

    function customFont(url, name) {
        let customFont = `
        /* Better Font (Quicksand) */
        @import url("${url}");
        * {
            font-family: "${name}", sans-serif, serif !important;
        }`;

        return customFont;
    }

    function fontSize(size) {
        let fontSize = `
        :root {
            font-size: ${size};
        }`;

        return fontSize;
    }

    function hideWindowsControlsCSS() {
        let color = isNewUI ? "var(--spice-sidebar)" : "var(--spice-main)";

        let hideWindowsControlsCSS = `
        #nord--hideWindowsControls {
            height: ${hideWindowsControlsValues.height}px;
            width: ${hideWindowsControlsValues.width}px;
            background-color: ${color};
            position: absolute;
            filter: brightness(${hideWindowsControlsValues.filter});
            top: 0px;
            right: 0px;
        }`;

        return hideWindowsControlsCSS;
    }

    ////////////////////////////////////// JS Snippets ///////////////////////////////////////////

    function quickSearchKeyBind() {
        changeKeyBind({ key: "k", ctrl: true }, { key: "space", ctrl: true }, CONFIG.quickSearch);
    }

    function searchKeyBind() {
        changeKeyBind({ key: "l", ctrl: true }, { key: "/", ctrl: true }, CONFIG.search);
    }

    async function redoKeyBind() {
        if (isWindows) {
            if (CONFIG.redo) {
                Spicetify.Mousetrap.bind("ctrl+shift+z", async () => {
                    await Spicetify.CosmosAsync.post("sp://desktop/v1/redo");
                });
            } else {
                Spicetify.Mousetrap.unbind("ctrl+shift+z");
            }
        }
    }

    ////////////////////////////////////// UI ///////////////////////////////////////////

    let settingsMenuCSS = React.createElement(
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
                .popup-row .red {
                    font-size: 13px;
                    color: #59CE8F;
                }
                .popup-row .little-space {
                    margin-bottom: 10px;
                }
                .popup-row .inputbox {
                    padding: 10px;
                    border-radius: 15px;
                    border: 0;
                    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
                }
                button.checkbox {
                    align-items: center;
                    color: var(--spice-text);
                    cursor: pointer;
                    display: flex;
                    margin-inline-start: 12px;
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
                    background-color: #76ba99;
                    color: #25316D;
                }
                .red {
                    background-color: #A9555E;
                }
                .small-button.red {
                    background-color: #A9555E !important;
                }
                input.small-input {
                    padding: 5px !important;
                    border-radius: 6px !important;
                    right: 0px !important;
                }
                .small-button {
                    margin-right: 20px;
                }
                .popup-row .inputbox[type="color"] {
                    background-color: var(--spice-custom-main-secondary) !important;
                    padding: 0px;
                    border-radius: 5px !important;
                    border: none;
                    margin-right: 10px;
                }
                .popup-row .inputbox[type="color"]::-webkit-color-swatch {
                    border-radius: 5px !important;
                    border: none;
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

    function checkBoxItem({ name, field, bool = true, check = true, more = false, onClickCheckFun = () => {}, onClickMoreFun = () => {} }) {
        if (bool) {
            let [value, setValue] = useState(CONFIG[field]);
            return React.createElement(
                "div",
                { className: "popup-row" },
                React.createElement("label", { className: "col description" }, name),
                React.createElement(
                    "div",
                    { className: "col action" },
                    more
                        ? React.createElement(
                              "button",
                              {
                                  className: "checkbox" + (value ? "" : " disabled"),
                                  onClick: async () => {
                                      onClickMoreFun();
                                  },
                              },
                              React.createElement(DisplayIcon, { icon: Spicetify.SVGIcons.more, size: 16 })
                          )
                        : null,
                    check
                        ? React.createElement(
                              "button",
                              {
                                  className: "checkbox" + (value ? "" : " disabled"),
                                  onClick: async () => {
                                      let state = !value;
                                      CONFIG[field] = state;
                                      setValue(state);
                                      await saveConfig();
                                      onClickCheckFun();
                                  },
                              },
                              React.createElement(DisplayIcon, { icon: Spicetify.SVGIcons.check, size: 16 })
                          )
                        : null
                )
            );
        } else {
            return null;
        }
    }

    function dropDownItem({ name, field, options, add = false, edit = false, bool = true, onChangeFun = () => {}, onClickAddFun = () => {}, onClickEditFun = () => {} }) {
        if (bool) {
            let [value, setValue] = useState(CONFIG[field]);
            return React.createElement(
                "div",
                { className: "popup-row" },
                React.createElement("label", { className: "col description" }, name),
                React.createElement(
                    "div",
                    { className: "col action" },
                    edit
                        ? React.createElement(
                              "button",
                              {
                                  className: "checkbox" + (value ? "" : " disabled"),
                                  onClick: async () => {
                                      onClickEditFun();
                                  },
                              },
                              React.createElement(DisplayIcon, { icon: Spicetify.SVGIcons.edit, size: 16 })
                          )
                        : null,
                    add
                        ? React.createElement(
                              "button",
                              {
                                  className: "checkbox" + (value ? "" : " disabled"),
                                  onClick: async () => {
                                      onClickAddFun();
                                  },
                              },
                              React.createElement(DisplayIcon, { icon: Spicetify.SVGIcons.plus2px, size: 16 })
                          )
                        : null
                ),
                React.createElement(
                    "div",
                    { className: "col action" },
                    React.createElement(
                        "select",
                        {
                            value,
                            onChange: async (e) => {
                                setValue(e.target.value);
                                CONFIG[field] = e.target.value;
                                await saveConfig();
                                onChangeFun();
                            },
                        },
                        Object.keys(options).map((item) =>
                            React.createElement(
                                "option",
                                {
                                    value: item,
                                },
                                options[item]
                            )
                        )
                    )
                )
            );
        } else {
            return null;
        }
    }

    function inputBoxItem({ name, field, chooseColor = false, subProperty = false, ChildSubProperty = false, bool = true, onChangeFun = () => {} }) {
        let tempConfig;
        if (ChildSubProperty) {
            tempConfig = structuredClone(CONFIG[subProperty][ChildSubProperty]);
        } else if (subProperty) {
            tempConfig = structuredClone(CONFIG[subProperty]);
        } else {
            tempConfig = structuredClone(CONFIG);
        }

        let [value, setValue] = useState(tempConfig[field]);

        if (bool) {
            return React.createElement(
                "div",
                { className: "popup-row" },
                React.createElement("label", { className: "col description" }, name),
                React.createElement(
                    "div",
                    { className: "col action" },
                    chooseColor
                        ? React.createElement(
                              "div",
                              { className: "popup-row" },
                              React.createElement(
                                  "input",
                                  {
                                      type: "color",
                                      className: `inputbox`,
                                      value: value,
                                      onChange: async (e) => {
                                          setValue(e.target.value.toUpperCase());
                                          onChangeFun(field, e.target.value);
                                      },
                                  },
                                  null
                              )
                          )
                        : null,
                    React.createElement("input", {
                        className: "small-input",
                        placeholder: value,
                        required: true,
                        onChange: async (e) => {
                            setValue(e.target.value);
                            onChangeFun(field, e.target.value);
                        },
                    })
                )
            );
        } else {
            return null;
        }
    }

    function heading({ name, bool = true }) {
        if (bool) {
            return React.createElement(
                "div",
                null,
                React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
                React.createElement("div", { className: "popup-row" }, React.createElement("h3", { className: "div-title" }, name)),
                React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null))
            );
        } else {
            return null;
        }
    }

    function ButtonItem({ name, color = "", onclickFun, onContextMenuFun }) {
        return React.createElement(
            "button",
            {
                className: `login-button${color}`,
                onClick: async () => {
                    onclickFun();
                },
                onContextMenu: async () => {
                    onContextMenuFun();
                },
            },
            name
        );
    }

    async function addcustomColorInfo() {
        let addcustomColorInfoContainer = React.createElement(
            "div",
            null,
            settingsMenuCSS,
            React.createElement("div", { className: "popup-row" }, React.createElement("h3", { className: "div-title" }, "Color Scheme Details")),
            React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
            React.createElement(
                "div",
                { className: "popup-row" },
                React.createElement("label", { className: "col description" }, "Color Scheme Name"),
                React.createElement(
                    "div",
                    { className: "col action" },
                    React.createElement("input", {
                        className: "inputbox",
                        required: true,
                    })
                )
            ),
            React.createElement(dropDownItem, {
                name: "Based on",
                field: "colorSchemeBasedOn",
                options: colorSchemesOptions,
            }),
            React.createElement(
                "button",
                {
                    className: "small-button green",
                    onClick: async () => {
                        let name = document.querySelector(".popup-row .inputbox").value;
                        let basedOn = document.querySelector(".popup-row select").value;
                        name = name.trim();
                        let nameObject = camalize(name);
                        if (colorSchemesOptions[nameObject]) {
                            notification("Color Scheme already exist, you can edit it", true);
                        } else if (!nameObject) {
                            notification("Give your Color Scheme a Name", true);
                        } else {
                            colorSchemes[nameObject] = structuredClone(CONFIG.colorSchemes[basedOn]);
                            colorSchemes[nameObject]["Name"] = name;
                            CONFIG.colorSchemes = colorSchemes;
                            CONFIG.colorScheme = nameObject;
                            await saveConfig();
                            reload();
                        }
                    },
                },
                `Save`
            )
        );

        Spicetify.PopupModal.display({
            title: "Create Custom Color",
            content: addcustomColorInfoContainer,
        });

        waitForUserToTriggerClosePopup();
    }

    async function editCustomColor() {
        injectPopup();
        injectCSS(hideOverlaySmall, "nord--hideOverlaySmall");

        let name = colorSchemesOptions[userConfig.color_scheme];

        let editCustomColorContainer = React.createElement(
            "div",
            null,
            settingsMenuCSS,
            React.createElement(
                "div",
                { className: "popup-row" },
                React.createElement("div", { className: "popup-row" }, React.createElement("h3", { className: "div-title" }, "Tutorial")),
                React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
                React.createElement(
                    "p",
                    { className: "popup-row" },
                    React.createElement("span", null, "1. Hex values only. ["),
                    React.createElement("span", { style: { color: "#bf616a" } }, "#BF616A"),
                    React.createElement("span", null, " (3/6 digits)]")
                ),
                React.createElement(
                    "div",
                    { className: "popup-row" },
                    React.createElement("span", null, "2. Install "),
                    React.createElement("span", { style: { color: "#bf616a" } }, "Spotify Backup"),
                    React.createElement("span", null, " extension to Backup your Custom Color Scheme")
                ),
                React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
                React.createElement("div", { className: "popup-row" }, React.createElement("h3", { className: "div-title" }, `${name} Values`)),
                React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
                React.createElement(inputBoxItem, {
                    name: "Text",
                    field: "text",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Subtext",
                    field: "subtext",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Main",
                    field: "main",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Sidebar",
                    field: "sidebar",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Player",
                    field: "player",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Card",
                    field: "card",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Button",
                    field: "button",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Button Active",
                    field: "buttonActive",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Button Disabled",
                    field: "buttonDisabled",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Notification",
                    field: "notification",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Notification Error",
                    field: "notificationError",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Shadow",
                    field: "shadow",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Tab Active",
                    field: "tabActive",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Playback Bar",
                    field: "playbackBar",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Misc",
                    field: "misc",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Selected Row",
                    field: "selectedRow",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Custom Main Secondary",
                    field: "customMainSecondary",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Custom Main Soft Secondary",
                    field: "customMainSoftSecondary",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Custom Highlight",
                    field: "customHighlight",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Custom Link Hover",
                    field: "customLinkHover",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Custom Selected Button",
                    field: "customSelectedButton",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Custom Subdued",
                    field: "customSubdued",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                }),
                React.createElement(inputBoxItem, {
                    name: "Custom Success",
                    field: "customSuccess",
                    chooseColor: true,
                    subProperty: "colorSchemes",
                    ChildSubProperty: userConfig.color_scheme,
                    onChangeFun: updateColors,
                })
            ),
            React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
            React.createElement(
                "button",
                {
                    className: "small-button green",
                    onClick: async () => {
                        CONFIG.colorSchemes = colorSchemes;
                        await saveConfig();
                        Spicetify.PopupModal.hide();
                        reload();
                    },
                },
                `Save`
            ),
            React.createElement(
                "button",
                {
                    className: "small-button",
                    onClick: async () => {
                        let importData = await stringToJSON(await getFromClipboard());
                        CONFIG.colorSchemes[camalize(importData.Name)] = importData;
                        await saveConfig();
                        Spicetify.PopupModal.hide();
                        reload();
                    },
                },
                `Import`
            ),
            React.createElement(
                "button",
                {
                    className: "small-button",
                    onClick: async () => {
                        sendToClipboard(await JSONToString(CONFIG.colorSchemes[userConfig.color_scheme]));
                        Spicetify.PopupModal.hide();
                        notification("Exported Successfully");
                    },
                },
                `Export`
            ),
            React.createElement(
                "button",
                {
                    className: "small-button red",
                    onClick: async () => {
                        let currentColorScheme = userConfig.color_scheme;
                        if (defaultSettings.colorSchemes[currentColorScheme] == undefined) {
                            delete CONFIG.colorSchemes[currentColorScheme];
                            CONFIG.colorScheme = "Nord";
                            await saveConfig();
                            Spicetify.PopupModal.hide();
                            reload();
                        } else {
                            notification("Stock Color Schemes can't be Deleted", true);
                        }
                    },
                },
                `Delete`
            ),
            React.createElement(
                "button",
                {
                    className: "small-button red",
                    onClick: async () => {
                        if (defaultSettings.colorSchemes[userConfig.color_scheme] == undefined) {
                            CONFIG.colorSchemes[userConfig.color_scheme] = defaultSettings.colorSchemes["Spotify"];
                        } else {
                            CONFIG.colorSchemes[userConfig.color_scheme] = defaultSettings.colorSchemes[userConfig.color_scheme];
                        }
                        await saveConfig();
                        Spicetify.PopupModal.hide();
                        reload();
                    },
                },
                `Reset`
            )
        );

        Spicetify.PopupModal.display({
            title: "Custom Colors",
            content: editCustomColorContainer,
        });

        waitForUserToTriggerClosePopup();

        if (await waitForElementDeath(`.GenericModal[aria-label="Custom Colors"]`)) {
            removeInjectedElement("nord--hideOverlaySmall");
            removeInjectedElement("nord--injectPopupCSS");
        }
    }

    async function editHideWindowsControls() {
        injectCSS(hideOverlayBig, "nord--hideOverlayBig");

        let editHideWindowsControlsContainer = React.createElement(
            "div",
            null,
            settingsMenuCSS,
            React.createElement(
                "div",
                { className: "popup-row" },
                React.createElement("p", { className: "popup-row" }, "Tutorial"),
                React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
                React.createElement("p", { className: "popup-row" }, `1. First Edit Height and Width`),
                React.createElement("p", { className: "popup-row" }, `2. After the Height and Width are perfect, Now try adjusting Filter`),
                React.createElement("div", { className: "popup-row little-space" }, null),
                React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
                React.createElement(inputBoxItem, {
                    name: "Height",
                    field: "height",
                    subProperty: "hideWindowsControlsValues",
                    onChangeFun: updateWindowsControls,
                }),
                React.createElement(inputBoxItem, {
                    name: "Width",
                    field: "width",
                    subProperty: "hideWindowsControlsValues",
                    onChangeFun: updateWindowsControls,
                }),
                React.createElement(inputBoxItem, {
                    name: "Filter ( Adjusts Color )",
                    field: "filter",
                    subProperty: "hideWindowsControlsValues",
                    onChangeFun: updateWindowsControls,
                })
            ),
            React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
            React.createElement(
                "button",
                {
                    className: "small-button green",
                    onClick: async () => {
                        CONFIG.hideWindowsControlsValues = hideWindowsControlsValues;
                        await saveConfig();
                        Spicetify.PopupModal.hide();
                        reload();
                    },
                },
                `Save`
            ),
            React.createElement(
                "button",
                {
                    className: "small-button red",
                    onClick: async () => {
                        CONFIG.hideWindowsControlsValues = defaultSettings.hideWindowsControlsValues;
                        await saveConfig();
                        Spicetify.PopupModal.hide();
                        reload();
                    },
                },
                `Reset`
            )
        );

        Spicetify.PopupModal.display({
            title: "Hide Windows Controls",
            content: editHideWindowsControlsContainer,
            isLarge: true,
        });

        waitForUserToTriggerClosePopup();

        if (await waitForElementDeath(`.GenericModal[aria-label="Hide Windows Controls"]`)) {
            removeInjectedElement("nord--hideOverlayBig");
        }
    }

    function customFontInfo() {
        let customFontInfoContainer = React.createElement(
            "div",
            null,
            settingsMenuCSS,
            React.createElement(
                "div",
                { className: "popup-row" },
                React.createElement("p", { className: "popup-row" }, "If you dont have the font locally, then enter the Font's URL"),
                React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
                React.createElement(inputBoxItem, {
                    name: "Font Url",
                    field: "customFontURL",
                }),
                React.createElement(inputBoxItem, {
                    name: "Font Name",
                    field: "customFontName",
                })
            ),
            React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
            React.createElement(
                "button",
                {
                    className: "small-button green",
                    onClick: async () => {
                        let values = document.querySelectorAll(".popup-row .small-input");
                        let customFontURL = values[0].value;
                        let customFontName = values[1].value;

                        CONFIG.customFontURL = customFontURL;
                        CONFIG.customFontName = customFontName;
                        await saveConfig();
                        Spicetify.PopupModal.hide();
                        reload();
                    },
                },
                `Save`
            ),
            React.createElement(
                "button",
                {
                    className: "small-button red",
                    onClick: async () => {
                        CONFIG.customFontURL = defaultSettings.customFontURL;
                        CONFIG.customFontName = defaultSettings.customFontName;
                        await saveConfig();
                        Spicetify.PopupModal.hide();
                        reload();
                    },
                },
                `Reset`
            )
        );

        Spicetify.PopupModal.display({
            title: "Custom Font",
            content: customFontInfoContainer,
        });

        waitForUserToTriggerClosePopup();
    }

    function customFontSize() {
        let customFontSizeInfoContainer = React.createElement(
            "div",
            null,
            settingsMenuCSS,
            React.createElement(
                "div",
                { className: "popup-row" },
                React.createElement(inputBoxItem, {
                    name: "Font Size",
                    field: "fontSize",
                })
            ),
            React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
            React.createElement(
                "button",
                {
                    className: "small-button",
                    onClick: async () => {
                        let values = document.querySelector(".popup-row .small-input");
                        let customFontSize = values.value;
                        CONFIG.fontSize = customFontSize;
                        await saveConfig();
                        Spicetify.PopupModal.hide();
                        reload();
                    },
                },
                `Save`
            ),
            React.createElement(
                "button",
                {
                    className: "small-button red",
                    onClick: async () => {
                        CONFIG.fontSize = defaultSettings.customFontURL;
                        await saveConfig();
                        Spicetify.PopupModal.hide();
                        reload();
                    },
                },
                `Reset`
            )
        );

        Spicetify.PopupModal.display({
            title: "Font Size",
            content: customFontSizeInfoContainer,
        });

        waitForUserToTriggerClosePopup();
    }

    let settingsDOMContent = React.createElement(
        "div",
        null,
        settingsMenuCSS,
        React.createElement("div", { className: "popup-row" }, React.createElement("h3", { className: "div-title" }, "Settings")),
        React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
        React.createElement(dropDownItem, {
            name: "Spotify Color",
            field: "colorScheme",
            add: true,
            edit: true,
            bool: !CONFIG.localColor,
            options: colorSchemesOptions,
            onClickEditFun: () => {
                Spicetify.PopupModal.hide();
                setTimeout(() => {
                    editCustomColor();
                }, 300);
            },
            onClickAddFun: () => {
                Spicetify.PopupModal.hide();
                setTimeout(() => {
                    addcustomColorInfo();
                }, 300);
            },
            onChangeFun: () => {
                removeInjectedElement(`nord--${userConfig.color_scheme}`);
                injectColor(`${CONFIG.colorScheme}`);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Custom Font",
            field: "customFont",
            more: true,
            onClickMoreFun: async () => {
                Spicetify.PopupModal.hide();
                setTimeout(customFontInfo, 300);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Font Size",
            field: "fontSizeBool",
            more: true,
            onClickMoreFun: async () => {
                Spicetify.PopupModal.hide();
                setTimeout(customFontSize, 300);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Windows Control",
            field: "hideWindowsControls",
            bool: isWindows,
            more: true,
            onClickMoreFun: async () => {
                Spicetify.PopupModal.hide();
                setTimeout(editHideWindowsControls, 300);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Apply Changes on Settings Close ( Recommended: On )",
            field: "isReload",
        }),
        React.createElement(checkBoxItem, {
            name: "Right Click Nord Spotify Settings Icon to Refresh",
            field: "rightClickToReload",
            onClickCheckFun: () => {
                injectReload(CONFIG.rightClickToReload);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Pointers",
            field: "pointers",
        }),
        React.createElement(heading, {
            name: "Home",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Home Page Recommendation",
            field: "hideHomePageRecommendation",
        }),
        React.createElement(heading, {
            name: "SideBar",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Marketplace",
            field: "hideMarketplace",
        }),
        React.createElement(checkBoxItem, {
            name: "Dark SideBar",
            field: "darkSideBar",
            bool: !isNewUI,
        }),
        React.createElement(checkBoxItem, {
            name: "Hide SideBar ScrollBar",
            field: "hideSideBarScrollBar",
        }),
        React.createElement(checkBoxItem, {
            name: "Highlight SideBar Selected Items ( Main Items )",
            field: "highlightSideBarItem",
        }),
        React.createElement(checkBoxItem, {
            name: "Highlight SideBar Items ( Playlists )",
            field: "highlightSideBarSelectedItem",
        }),
        React.createElement(checkBoxItem, {
            name: "SideBar Playlist Names bold",
            field: "boldedSideBarItems",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide SideBar Divider",
            field: "hideSideBarDivider",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide SideBar Status",
            field: "hideSideBarStatus",
        }),
        React.createElement(heading, {
            name: "Player",
        }),
        React.createElement(checkBoxItem, {
            name: "Right Side Cover Art",
            field: "rightSideCoverArt",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Friend Activity",
            field: "hideFriendActivity",
            bool: isNewUI,
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Spotify Connect",
            field: "hideSpotifyConnect",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Spotify Full Screen",
            field: "hideSpotifyFullScreen",
            bool: isPremium,
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Dots Under Player Controls",
            field: "hideDotsUnderPlayerButtons",
        }),
        React.createElement(heading, {
            name: "Playlist",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Playlist Similar Songs Recommendation",
            field: "hideSimilarSongsRecommendation",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Current Playing Song BG",
            field: "hideCurrentPlayingSongBG",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Playlist Image Edit Button",
            field: "hidePlaylistImageEditButton",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Radio Gradient",
            field: "hideRadioGradient",
        }),
        React.createElement(heading, {
            name: "Your Library",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Your Library Liked Song's Card",
            field: "hideLikedSongsCard",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Your Library Liked Song's Card Text",
            field: "hideLikedSongsCardTexts",
        }),
        React.createElement(heading, {
            name: "Misc",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Ads",
            field: "hideAds",
            bool: !isPremium,
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Top Gradient",
            field: "hideTopGradient",
        }),
        React.createElement(checkBoxItem, {
            name: "Norded Genre Cards",
            field: "betterGenre",
        }),
        React.createElement(checkBoxItem, {
            name: "Big Artist Image",
            field: "artistBigImage",
        }),
        React.createElement(checkBoxItem, {
            name: "Norded Spotify Lyrics",
            field: "nordLyrics",
        }),
        React.createElement(checkBoxItem, {
            name: "Beautify Spotify Lyrics",
            field: "betterSpotifyLyrics",
        }),
        React.createElement(checkBoxItem, {
            name: "Beautify Lyrics Plus",
            field: "betterLyricsPlus",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide TopBar Play Button",
            field: "hideTopBarPlayButton",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Cards Download Status",
            field: "hideCardsDownloadStatus",
        }),
        React.createElement(checkBoxItem, {
            name: "Bubble UI",
            field: "bubbleUI",
            bool: isNewUI,
        }),
        React.createElement(heading, {
            name: "Keybinds",
        }),
        React.createElement(checkBoxItem, {
            name: "Quick Search ( Ctrl + Space )",
            field: "quickSearch",
        }),
        React.createElement(checkBoxItem, {
            name: "Search ( Ctrl + / )",
            field: "search",
        }),
        React.createElement(checkBoxItem, {
            name: "Redo ( Ctrl + Shift + z )",
            field: "redo",
            bool: isWindows,
        }),
        React.createElement(heading, {
            name: "Developer Settings",
            bool: CONFIG.dev && !isMarketplace,
        }),
        React.createElement(checkBoxItem, {
            name: "Use Local CSS",
            field: "localCSS",
            bool: CONFIG.dev && !isMarketplace,
        }),
        React.createElement(checkBoxItem, {
            name: "Use Local Color Schemes",
            field: "localColor",
            bool: CONFIG.dev && !isMarketplace,
        }),
        React.createElement(ButtonItem, {
            name: "Like on GitHub 👍",
            onclickFun: () => {
                window.open("https://github.com/Tetrax-10/Nord-Spotify");
            },
            onContextMenuFun: async () => {
                if (!isMarketplace) {
                    CONFIG.dev = !CONFIG.dev;
                    await saveConfig();
                    reload();
                }
            },
        }),
        React.createElement(ButtonItem, {
            name: "Reset Settings",
            color: " red",
            onclickFun: async () => {
                Spicetify.LocalStorage.remove("nord:settings");
                reload();
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

    let svg = `<svg viewBox="0 0 262.394 262.394" style="scale: 0.5; fill: var(--spice-custom-subdued)"><path d="M245.63,103.39h-9.91c-2.486-9.371-6.197-18.242-10.955-26.432l7.015-7.015c6.546-6.546,6.546-17.159,0-23.705 l-15.621-15.621c-6.546-6.546-17.159-6.546-23.705,0l-7.015,7.015c-8.19-4.758-17.061-8.468-26.432-10.955v-9.914 C159.007,7.505,151.502,0,142.244,0h-22.091c-9.258,0-16.763,7.505-16.763,16.763v9.914c-9.37,2.486-18.242,6.197-26.431,10.954 l-7.016-7.015c-6.546-6.546-17.159-6.546-23.705,0.001L30.618,46.238c-6.546,6.546-6.546,17.159,0,23.705l7.014,7.014 c-4.758,8.19-8.469,17.062-10.955,26.433h-9.914c-9.257,0-16.762,7.505-16.762,16.763v22.09c0,9.258,7.505,16.763,16.762,16.763 h9.914c2.487,9.371,6.198,18.243,10.956,26.433l-7.015,7.015c-6.546,6.546-6.546,17.159,0,23.705l15.621,15.621 c6.546,6.546,17.159,6.546,23.705,0l7.016-7.016c8.189,4.758,17.061,8.469,26.431,10.955v9.913c0,9.258,7.505,16.763,16.763,16.763 h22.091c9.258,0,16.763-7.505,16.763-16.763v-9.913c9.371-2.487,18.242-6.198,26.432-10.956l7.016,7.017 c6.546,6.546,17.159,6.546,23.705,0l15.621-15.621c3.145-3.144,4.91-7.407,4.91-11.853s-1.766-8.709-4.91-11.853l-7.016-7.016 c4.758-8.189,8.468-17.062,10.955-26.432h9.91c9.258,0,16.763-7.505,16.763-16.763v-22.09 C262.393,110.895,254.888,103.39,245.63,103.39z M131.198,191.194c-33.083,0-59.998-26.915-59.998-59.997 c0-33.083,26.915-59.998,59.998-59.998s59.998,26.915,59.998,59.998C191.196,164.279,164.281,191.194,131.198,191.194z"/><path d="M131.198,101.199c-16.541,0-29.998,13.457-29.998,29.998c0,16.54,13.457,29.997,29.998,29.997s29.998-13.457,29.998-29.997 C161.196,114.656,147.739,101.199,131.198,101.199z"/></svg>`;

    new Spicetify.Topbar.Button("Nord Spotify", svg, settingsPage);

    ////////////////////////////////////// Functions ///////////////////////////////////////////

    function injectCSS(cssStyle, id) {
        if (!body.classList.contains(id)) {
            let styleElement = document.createElement("style");
            styleElement.id = id;
            styleElement.innerHTML = cssStyle;
            body.appendChild(styleElement);
            body.classList.add(id);
        }
    }

    function injectStyleSheet(src, id) {
        if (!body.classList.contains(id)) {
            let styleSheet = document.createElement("link");
            styleSheet.id = id;
            styleSheet.rel = "stylesheet";
            styleSheet.type = "text/css";
            styleSheet.href = src;
            body.appendChild(styleSheet);
            body.classList.add(id);
        }
    }

    function removeInjectedElement(id) {
        let element = document.getElementById(id);
        if (body.classList.contains(id) && element) {
            element.remove();
            body.classList.remove(id);
        }
    }

    function injectJS(callback = () => {}) {
        callback();
    }

    function cssSnippet(data, id, bool) {
        if (bool) {
            injectCSS(data, id);
        } else {
            removeInjectedElement(id);
        }
    }

    async function dynamicUI(newUICode, newID, oldUICode, oldID, bool) {
        if (isNewUI) {
            cssSnippet(newUICode, newID, bool);
        } else {
            cssSnippet(oldUICode, oldID, bool);
        }
    }

    async function injectColor(colorScheme) {
        if (CONFIG.localColor) {
            return;
        }

        userConfig.color_scheme = colorScheme;

        injectCSS(createColorScheme(colorSchemes[colorScheme]), `nord--${colorScheme}`);
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

    function changeKeyBind(oldKey, newKey, bool) {
        try {
            if (bool) {
                Spicetify.Keyboard.changeShortcut(oldKey, newKey);
            } else {
                Spicetify.Keyboard.changeShortcut(newKey, oldKey);
            }
        } catch {}
    }

    function os(os) {
        return versionInfo.platform.includes(os);
    }

    async function isNewUIFunc() {
        return (await waitForElement(".nav-alt", 500)) ? true : false;
    }

    async function isPremiumFunc() {
        let data = await Spicetify.CosmosAsync.get("sp://product-state/v1/values");
        if (data.catalogue == "premium" || data.name == "Spotify Premium" || data.type == "premium") {
            return true;
        } else {
            return false;
        }
    }

    function injectReload(bool) {
        if (bool) {
            settingsButton.addEventListener("contextmenu", forceReload);
        } else {
            settingsButton.removeEventListener("contextmenu", forceReload);
        }
    }

    async function waitForUserToTriggerClosePopup() {
        const closeButton = await waitForElement("body > generic-modal button.main-trackCreditsModal-closeBtn", 1000);
        const modalOverlay = await waitForElement("body > generic-modal > div", 1000);
        if (closeButton && modalOverlay) {
            closeButton.onclick = () => reload();
            modalOverlay.onclick = (e) => {
                if (e.target === modalOverlay) {
                    reload();
                }
            };
        }
    }

    async function waitForElement(selector, timeout = null, location = document.body) {
        return new Promise((resolve) => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(async () => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                } else {
                    if (timeout) {
                        async function timeOver() {
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    observer.disconnect();
                                    resolve(false);
                                }, timeout);
                            });
                        }
                        resolve(await timeOver());
                    }
                }
            });

            observer.observe(location, {
                childList: true,
                subtree: true,
            });
        });
    }

    async function waitForElementDeath(selector, location = document.body) {
        return new Promise((resolve) => {
            const observer = new MutationObserver(async () => {
                if (!document.querySelector(selector)) {
                    resolve(true);
                    observer.disconnect();
                }
            });

            observer.observe(location, {
                childList: true,
                subtree: true,
            });
        });
    }

    function reload() {
        Spicetify.PopupModal.hide();
        if (CONFIG.isReload) {
            location.reload();
        }
    }

    function forceReload() {
        Spicetify.PopupModal.hide();
        location.reload();
    }

    function notification(text, isError = false) {
        Spicetify.showNotification(text, isError);
    }

    function hideWindowsControls(id = "nord--hideWindowsControls") {
        let element = document.createElement("div");
        element.id = id;
        body.appendChild(element);
        body.classList.add(id);
    }

    function updateWindowsControls(field, value) {
        hideWindowsControlsValues[field] = value;
        removeInjectedElement("nord--hideWindowsControlsCSS");
        cssSnippet(hideWindowsControlsCSS(), "nord--hideWindowsControlsCSS", CONFIG.hideWindowsControls);
    }

    function updateColors(field, value) {
        if (!isHex(value)) {
            value = CONFIG.colorSchemes[userConfig.color_scheme][field];
        }
        colorSchemes[userConfig.color_scheme][field] = value.toUpperCase();
        removeInjectedElement(`nord--${userConfig.color_scheme}`);
        injectCSS(createColorScheme(colorSchemes[userConfig.color_scheme]), `nord--${userConfig.color_scheme}`);
    }

    function hexToRgb(hex) {
        try {
            hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => {
                return r + r + g + g + b + b;
            });

            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
        } catch {}
    }

    function isHex(hex) {
        return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
    }

    function camalize(str) {
        return capitalizeFirstLetter(str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()));
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async function JSONToString(data) {
        return JSON.stringify(data);
    }

    async function stringToJSON(data) {
        return JSON.parse(data);
    }

    async function sendToClipboard(data) {
        if (data) {
            await Spicetify.Platform.ClipboardAPI.copy(data);
        }
    }

    async function getFromClipboard() {
        return await Spicetify.Platform.ClipboardAPI.paste();
    }

    async function ResetItem(item) {
        CONFIG[item] = undefined;
        await saveConfig();
    }

    function createColorScheme(colors) {
        return `
        :root {
            --spice-text: ${colors["text"]}${priority};
            --spice-subtext: ${colors["subtext"]}${priority};
            --spice-main: ${colors["main"]}${priority};
            --spice-sidebar: ${colors["sidebar"]}${priority};
            --spice-player: ${colors["player"]}${priority};
            --spice-card: ${colors["card"]}${priority};
            --spice-button: ${colors["button"]}${priority};
            --spice-button-active: ${colors["buttonActive"]}${priority};
            --spice-button-disabled: ${colors["buttonDisabled"]}${priority};
            --spice-notification: ${colors["notification"]}${priority};
            --spice-notification-error: ${colors["notificationError"]}${priority};
            --spice-shadow: ${colors["shadow"]}${priority};
            --spice-tab-active: ${colors["tabActive"]}${priority};
            --spice-playback-bar: ${colors["playbackBar"]}${priority};
            --spice-misc: ${colors["misc"]}${priority};
            --spice-selected-row: ${colors["selectedRow"]}${priority};
            --spice-custom-main-secondary: ${colors["customMainSecondary"]}${priority};
            --spice-custom-main-soft-secondary: ${colors["customMainSoftSecondary"]}${priority};
            --spice-custom-highlight: ${colors["customHighlight"]}${priority};
            --spice-custom-link-hover: ${colors["customLinkHover"]}${priority};
            --spice-custom-selected-button: ${colors["customSelectedButton"]}${priority};
            --spice-custom-subdued: ${colors["customSubdued"]}${priority};
            --spice-custom-success: ${colors["customSuccess"]}${priority};

            --spice-rgb-text: ${hexToRgb(colors["text"])}${priority};
            --spice-rgb-subtext: ${hexToRgb(colors["subtext"])}${priority};
            --spice-rgb-main: ${hexToRgb(colors["main"])}${priority};
            --spice-rgb-sidebar: ${hexToRgb(colors["sidebar"])}${priority};
            --spice-rgb-player: ${hexToRgb(colors["player"])}${priority};
            --spice-rgb-card: ${hexToRgb(colors["card"])}${priority};
            --spice-rgb-button: ${hexToRgb(colors["button"])}${priority};
            --spice-rgb-button-active: ${hexToRgb(colors["buttonActive"])}${priority};
            --spice-rgb-button-disabled: ${hexToRgb(colors["buttonDisabled"])}${priority};
            --spice-rgb-notification: ${hexToRgb(colors["notification"])}${priority};
            --spice-rgb-notification-error: ${hexToRgb(colors["notificationError"])}${priority};
            --spice-rgb-shadow: ${hexToRgb(colors["shadow"])}${priority};
            --spice-rgb-tab-active: ${hexToRgb(colors["tabActive"])}${priority};
            --spice-rgb-playback-bar: ${hexToRgb(colors["playbackBar"])}${priority};
            --spice-rgb-misc: ${hexToRgb(colors["misc"])}${priority};
            --spice-rgb-selected-row: ${hexToRgb(colors["selectedRow"])}${priority};
            --spice-rgb-custom-main-secondary: ${hexToRgb(colors["customMainSecondary"])}${priority};
            --spice-rgb-custom-main-soft-secondary: ${hexToRgb(colors["customMainSoftSecondary"])}${priority};
            --spice-rgb-custom-highlight: ${hexToRgb(colors["customHighlight"])}${priority};
            --spice-rgb-custom-link-hover: ${hexToRgb(colors["customLinkHover"])}${priority};
            --spice-rgb-custom-selected-button: ${hexToRgb(colors["customSelectedButton"])}${priority};
            --spice-rgb-custom-subdued: ${hexToRgb(colors["customSubdued"])}${priority};
            --spice-rgb-custom-success: ${hexToRgb(colors["customSuccess"])}${priority};
        }`;
    }

    async function injectPopup() {
        injectCSS(injectPopupCSS, "nord--injectPopupCSS");

        let mousePosition;
        let offset = [0, 0];
        let isDown = false;

        let div = await waitForElement(`.GenericModal[aria-label="Custom Colors"]`);
        div.style.position = "absolute";

        div.addEventListener(
            "mousedown",
            (e) => {
                isDown = true;
                offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
            },
            true
        );

        document.addEventListener(
            "mouseup",
            () => {
                isDown = false;
            },
            true
        );

        document.addEventListener(
            "mousemove",
            (event) => {
                event.preventDefault();
                if (isDown) {
                    mousePosition = {
                        x: event.clientX,
                        y: event.clientY,
                    };
                    div.style.left = mousePosition.x + offset[0] + "px";
                    div.style.top = mousePosition.y + offset[1] + "px";
                }
            },
            true
        );
    }

    ////////////////////////////////////// Main ///////////////////////////////////////////

    let data = Spicetify.Platform.History.location;

    if ((data.pathname.includes("/artist/") || data.pathname.includes("/playlist/")) && countNoOfSlashes(data.pathname) == 2) {
        await dynamicUI(hideArtistTopBarNew, "nord--hideArtistTopBarNew", hideArtistTopBarOld, "nord--hideArtistTopBarOld", true);
    } else {
        removeInjectedElement("nord--hideArtistTopBarNew");
        removeInjectedElement("nord--hideArtistTopBarOld");
    }

    Spicetify.Platform.History.listen(async (data) => {
        if ((data.pathname.includes("/artist/") || data.pathname.includes("/playlist/")) && countNoOfSlashes(data.pathname) == 2) {
            await dynamicUI(hideArtistTopBarNew, "nord--hideArtistTopBarNew", hideArtistTopBarOld, "nord--hideArtistTopBarOld", true);
        } else {
            removeInjectedElement("nord--hideArtistTopBarNew");
            removeInjectedElement("nord--hideArtistTopBarOld");
        }
    });

    cssSnippet(customFont(CONFIG.customFontURL, CONFIG.customFontName), "nord-customFont", CONFIG.customFont);

    cssSnippet(fontSize(CONFIG.fontSize, CONFIG.fontSize), "nord-fontSize", CONFIG.fontSizeBool);

    cssSnippet(hideHomePageRecommendation, "nord--hideHomePageRecommendation", CONFIG.hideHomePageRecommendation);

    cssSnippet(hideSideBarScrollBar, "nord--hideSideBarScrollBar", CONFIG.hideSideBarScrollBar);

    cssSnippet(highlightSideBarItem, "nord--highlightSideBarItem", CONFIG.highlightSideBarItem);

    cssSnippet(highlightSideBarSelectedItem, "nord--highlightSideBarSelectedItem", CONFIG.highlightSideBarSelectedItem);

    cssSnippet(boldedSideBarItems, "nord--boldedSideBarItems", CONFIG.boldedSideBarItems);

    cssSnippet(hideSideBarDivider, "nord--hideSideBarDivider", CONFIG.hideSideBarDivider);

    cssSnippet(hideSideBarStatus, "nord--hideSideBarStatus", CONFIG.hideSideBarStatus);

    await dynamicUI(rightSideCoverArtNew, "nord--rightSideCoverArt", rightSideCoverArtOld, "nord--rightSideCoverArt", CONFIG.rightSideCoverArt);
    cssSnippet(leftSideCoverArt, "nord--leftSideCoverArt", !CONFIG.rightSideCoverArt);

    await dynamicUI(hideFriendActivity, "nord--hideFriendActivity", null, null, CONFIG.hideFriendActivity);

    cssSnippet(hideSpotifyConnect, "nord--hideSpotifyConnect", CONFIG.hideSpotifyConnect);

    cssSnippet(hideSpotifyFullScreen, "nord--hideSpotifyFullScreen", CONFIG.hideSpotifyFullScreen);

    cssSnippet(hideDotsUnderPlayerButtons, "nord--hideDotsUnderPlayerButtons", CONFIG.hideDotsUnderPlayerButtons);

    cssSnippet(hideSimilarSongsRecommendation, "nord--hideSimilarSongsRecommendation", CONFIG.hideSimilarSongsRecommendation);

    cssSnippet(hideCurrentPlayingSongBG, "nord--hideCurrentPlayingSongBG", !CONFIG.hideCurrentPlayingSongBG);

    cssSnippet(hidePlaylistImageEditButton, "nord--hidePlaylistImageEditButton", CONFIG.hidePlaylistImageEditButton);

    cssSnippet(hideRadioGradient, "nord--hideRadioGradient", CONFIG.hideRadioGradient);

    cssSnippet(hideLikedSongsCard, "nord--hideLikedSongsCard", CONFIG.hideLikedSongsCard);

    cssSnippet(hideLikedSongsCardTexts, "nord--hideLikedSongsCardTexts", CONFIG.hideLikedSongsCardTexts);

    cssSnippet(hideAds, "nord--hideAds", CONFIG.hideAds);

    cssSnippet(hideTopGradient, "nord--hideTopGradient", CONFIG.hideTopGradient);

    cssSnippet(betterGenre, "nord--betterGenre", CONFIG.betterGenre);

    cssSnippet(artistBigImage, "nord--artistBigImage", CONFIG.artistBigImage);
    await dynamicUI(artistBigImageNew, "nord--artistBigImageNew", artistBigImageOld, "nord--artistBigImageOld", CONFIG.artistBigImage);

    cssSnippet(pointers, "nord--pointers", CONFIG.pointers);

    cssSnippet(nordLyrics, "nord--nordLyrics", CONFIG.nordLyrics);

    cssSnippet(betterSpotifyLyrics, "nord--betterSpotifyLyrics", CONFIG.betterSpotifyLyrics);

    cssSnippet(betterLyricsPlus, "nord--betterLyricsPlus", CONFIG.betterLyricsPlus);

    cssSnippet(hideTopBarPlayButton, "nord--hideTopBarPlayButton", CONFIG.hideTopBarPlayButton);

    cssSnippet(hideCardsDownloadStatus, "nord--hideCardsDownloadStatus", CONFIG.hideCardsDownloadStatus);

    cssSnippet(bubbleUI, "nord--bubbleUI", !CONFIG.bubbleUI);

    cssSnippet(hideMarketplace, "nord--hideMarketplace", CONFIG.hideMarketplace);

    injectJS(quickSearchKeyBind);

    injectJS(searchKeyBind);

    injectJS(redoKeyBind);

    await dynamicUI(null, null, darkSideBar, "nord--darkSideBar", !CONFIG.darkSideBar);

    if (isWindows) {
        hideWindowsControls(); // injects div
        cssSnippet(hideWindowsControlsCSS(), "nord--hideWindowsControlsCSS", CONFIG.hideWindowsControls); // injects css for the above div
    }

    let settingsButton = await waitForElement(`.main-topBar-button[title="Nord Spotify"]`, 5000);

    injectReload(CONFIG.rightClickToReload);

    settingsButton.addEventListener("click", waitForUserToTriggerClosePopup);
}
