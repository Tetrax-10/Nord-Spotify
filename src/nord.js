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
    if (Spicetify.Config.current_theme == "Nord-Spotify" || Spicetify.Config.current_theme == "Nord Spotify") {
        await initNord();
    }
})();

async function initNord() {
    const { React } = Spicetify;
    const { useState } = React;

    let body = document.querySelector("body");

    if (Spicetify.Config.current_theme == "Nord Spotify") {
        injectStyleSheet("https://tetrax-10.github.io/Nord-Spotify/src/user.css", "nord--nordSpotify");
    }

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

    let svg = `<svg viewBox="0 0 262.394 262.394" style="scale: 0.5; fill: var(--spice-custom-subdued)"><path d="M245.63,103.39h-9.91c-2.486-9.371-6.197-18.242-10.955-26.432l7.015-7.015c6.546-6.546,6.546-17.159,0-23.705 l-15.621-15.621c-6.546-6.546-17.159-6.546-23.705,0l-7.015,7.015c-8.19-4.758-17.061-8.468-26.432-10.955v-9.914 C159.007,7.505,151.502,0,142.244,0h-22.091c-9.258,0-16.763,7.505-16.763,16.763v9.914c-9.37,2.486-18.242,6.197-26.431,10.954 l-7.016-7.015c-6.546-6.546-17.159-6.546-23.705,0.001L30.618,46.238c-6.546,6.546-6.546,17.159,0,23.705l7.014,7.014 c-4.758,8.19-8.469,17.062-10.955,26.433h-9.914c-9.257,0-16.762,7.505-16.762,16.763v22.09c0,9.258,7.505,16.763,16.762,16.763 h9.914c2.487,9.371,6.198,18.243,10.956,26.433l-7.015,7.015c-6.546,6.546-6.546,17.159,0,23.705l15.621,15.621 c6.546,6.546,17.159,6.546,23.705,0l7.016-7.016c8.189,4.758,17.061,8.469,26.431,10.955v9.913c0,9.258,7.505,16.763,16.763,16.763 h22.091c9.258,0,16.763-7.505,16.763-16.763v-9.913c9.371-2.487,18.242-6.198,26.432-10.956l7.016,7.017 c6.546,6.546,17.159,6.546,23.705,0l15.621-15.621c3.145-3.144,4.91-7.407,4.91-11.853s-1.766-8.709-4.91-11.853l-7.016-7.016 c4.758-8.189,8.468-17.062,10.955-26.432h9.91c9.258,0,16.763-7.505,16.763-16.763v-22.09 C262.393,110.895,254.888,103.39,245.63,103.39z M131.198,191.194c-33.083,0-59.998-26.915-59.998-59.997 c0-33.083,26.915-59.998,59.998-59.998s59.998,26.915,59.998,59.998C191.196,164.279,164.281,191.194,131.198,191.194z"/><path d="M131.198,101.199c-16.541,0-29.998,13.457-29.998,29.998c0,16.54,13.457,29.997,29.998,29.997s29.998-13.457,29.998-29.997 C161.196,114.656,147.739,101.199,131.198,101.199z"/></svg>`;

    new Spicetify.Topbar.Button("Nord Spotify", svg, settingsPage);

    ////////////////////////////////////// Functions ///////////////////////////////////////////

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

    function injectStyleSheet(src, id) {
        if (!body.classList.contains(id)) {
            let styleSheet = document.createElement("link");
            styleSheet.rel = "stylesheet";
            styleSheet.type = "text/css";
            styleSheet.href = src;
            body.appendChild(styleSheet);
            body.classList.add(id);
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
