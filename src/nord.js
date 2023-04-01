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
    if (!(Spicetify.Platform && Spicetify.Player)) {
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

    let body = document.body;

    let isNewUI = await isNewUIFunc();

    let isPremium = await isPremiumFunc();

    let isWindows = os("Win");

    let server = "https://tetrax-10.github.io/Nord-Spotify";

    let isMarketplace = userConfig.current_theme == "Nord Spotify" ? true : false;

    let priority = isMarketplace ? " !important" : "";

    ////////////////////////////////////// CONFIG ///////////////////////////////////////////

    function getLocalStorageDataFromKey(key) {
        return Spicetify.LocalStorage.get(key);
    }

    function setLocalStorageDataWithKey(key, value) {
        Spicetify.LocalStorage.set(key, value);
    }

    async function getConfig() {
        try {
            let parsed = JSON.parse(getLocalStorageDataFromKey("nord:settings"));
            if (parsed && typeof parsed === "object") {
                return parsed;
            }
            throw "Config Error Nord";
        } catch {
            setLocalStorageDataWithKey("nord:settings", `{}`);
            return {};
        }
    }

    const defaultSettings = {
        bannerOverlay: true,
        bannerOverlayColor: "#00000080",
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
        hideMarketplace: false,
        quickSearch: false,
        search: false,
        redo: false,
        darkSideBar: false,
        localColor: false,
        rightClickToReload: false,
        customFontURL: "https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap",
        customFontName: "Quicksand",
        colorScheme: "Nord",
        colorSchemeBasedOn: "Dynamic",
        fontSize: "100%",
        fontSizeBool: false,
        hoverTime: true,
        hideDefaultCoverArt: true,
        hidePageDetails: false,
        changeCoverArtOnSongChange: true,
        bannerBlurValue: "0",
        fitBannerSize: false,
        songBannersOnly: false,
        dynamicColorMode: "atmos",
        nordedDynamicColor: true,
        bannersInLyricsPage: false,
        centeredLyrics: false,
        fullPageBanner: true,
        showBanner: true,
        bannerPosition: {
            "spotify:album:5YDSZWizEYBsXgk6kwxvMn": "30",
        },
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
                misc: "#434C5E",
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
                misc: "#33424A",
                selectedRow: "#DEDEDE",
                customMainSecondary: "#2B363E",
                customMainSoftSecondary: "#242D35",
                customHighlight: "#34414B",
                customLinkHover: "#95B5F0",
                customSelectedButton: "#33424A",
                customSubdued: "#7084A1",
                customSuccess: "#76BA99",
            },
            Discord: {
                Name: "Discord",
                text: "#A4ACBC",
                subtext: "#A4ACBC",
                main: "#36393F",
                sidebar: "#2F3136",
                player: "#36393F",
                card: "#36393F",
                button: "#8A99AF",
                buttonActive: "#A4BADB",
                buttonDisabled: "#565D67",
                notification: "#40444B",
                notificationError: "#C03947",
                shadow: "#1D2128",
                tabActive: "#40444B",
                playbackBar: "#DEDEDE",
                misc: "#565D67",
                selectedRow: "#DEDEDE",
                customMainSecondary: "#474B52",
                customMainSoftSecondary: "#40444B",
                customHighlight: "#51555D",
                customLinkHover: "#B3CBFF",
                customSelectedButton: "#5865F2",
                customSubdued: "#757F95",
                customSuccess: "#389C57",
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
                misc: "#535353",
                selectedRow: "#DEDEDE",
                customMainSecondary: "#2A2A2A",
                customMainSoftSecondary: "#202020",
                customHighlight: "#5A5A5A",
                customLinkHover: "#FFFFFF",
                customSelectedButton: "#505050",
                customSubdued: "#7A7A7A",
                customSuccess: "#1DB954",
            },
            Blood: {
                Name: "Blood",
                notificationError: "#A9555E",
                shadow: "#1D2128",
                playbackBar: "#DEDEDE",
                selectedRow: "#DEDEDE",
                customSuccess: "#76BA99",
                card: "#712637",
                player: "#712637",
                main: "#712637",
                tabActive: "#7d3040",
                notification: "#7d3040",
                customMainSoftSecondary: "#7d3040",
                customMainSecondary: "#843746",
                sidebar: "#661f2f",
                button: "#bd6977",
                buttonActive: "#cc7785",
                misc: "#8f404f",
                buttonDisabled: "#8f404f",
                subtext: "#e68f9c",
                text: "#e68f9c",
                customSubdued: "#c26e7b",
                customLinkHover: "#ffb1be",
                customHighlight: "#a35261",
                customSelectedButton: "#a35261",
            },
            Chocolate: {
                Name: "Chocolate",
                notificationError: "#A9555E",
                shadow: "#1D2128",
                playbackBar: "#DEDEDE",
                selectedRow: "#DEDEDE",
                customSuccess: "#76BA99",
                card: "#3e2d29",
                player: "#3e2d29",
                main: "#3e2d29",
                tabActive: "#473632",
                notification: "#473632",
                customMainSoftSecondary: "#473632",
                customMainSecondary: "#4e3c38",
                sidebar: "#362623",
                button: "#806b67",
                buttonActive: "#8e7975",
                misc: "#574541",
                buttonDisabled: "#574541",
                subtext: "#a6908c",
                text: "#a6908c",
                customSubdued: "#84706c",
                customLinkHover: "#c8b1ad",
                customHighlight: "#695551",
                customSelectedButton: "#695551",
            },
            Mint: {
                Name: "Mint",
                notificationError: "#A9555E",
                shadow: "#1D2128",
                playbackBar: "#DEDEDE",
                selectedRow: "#DEDEDE",
                customSuccess: "#76BA99",
                card: "#294f45",
                player: "#294f45",
                main: "#294f45",
                tabActive: "#33594e",
                notification: "#33594e",
                customMainSoftSecondary: "#33594e",
                customMainSecondary: "#395f55",
                sidebar: "#23463c",
                button: "#6b9387",
                buttonActive: "#78a195",
                misc: "#43695e",
                buttonDisabled: "#43695e",
                subtext: "#90b9ad",
                text: "#90b9ad",
                customSubdued: "#6f978b",
                customLinkHover: "#b2dccf",
                customHighlight: "#547b70",
                customSelectedButton: "#547b70",
            },
        },
    };

    let CONFIG = await getConfig();

    async function saveConfig(item, value) {
        if (item) {
            let tempConfig = await getConfig("nord:settings");
            tempConfig[item] = value;
            setLocalStorageDataWithKey("nord:settings", JSON.stringify(tempConfig));
            return;
        }
        setLocalStorageDataWithKey("nord:settings", JSON.stringify(CONFIG));
    }

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

    marketplaceDynamicState(false);

    let hideWindowsControlsValues = structuredClone(CONFIG.hideWindowsControlsValues);
    let colorSchemes = structuredClone(CONFIG.colorSchemes);

    let colorSchemesOptions = {};
    Object.keys(CONFIG.colorSchemes).forEach((key) => {
        colorSchemesOptions[key] = colorSchemes[key]["Name"];
    });
    colorSchemesOptions.Dynamic = "Nord Spotify's Dynamic";

    injectColor(`${CONFIG.colorScheme}`, "start");

    if (!window.NordSpotifyRemote) {
        server = "Nord-Spotify";
    }

    if (isNewUI) {
        injectStyleSheet(`${server}/src/Snippets/NewUI.css`, "nord--NewUI");
    } else {
        injectStyleSheet(`${server}/src/Snippets/OldUI.css`, "nord--OldUI");
    }

    NordSpotify.Config = CONFIG;
    NordSpotify.Save = saveConfig;
    NordSpotify.Reload = forceReload;
    NordSpotify.ResetItem = ResetItem;
    NordSpotify.localStorageInfo = localStorageInfo;

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
                .popup-row .demo {
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
                    margin: 5px;
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
                }
                .popup-row.search-div .col {
                    position: relative;
                }
                .popup-row .nord-search-container {
                    width: 100%;
                }
                .popup-row .nord-search-icon {
                    position: absolute;
                    margin: 10px;
                }
                .popup-row .nord-search {
                    padding: 10px 36px !important;
                    width: 100%;
                }
                .popup-row .display-none {
                    display: none !important;
                }`
    );

    function DisplayIcon({ icon, size, className }) {
        return React.createElement("svg", {
            width: size,
            height: size,
            className: className ? className : null,
            viewBox: "0 0 16 16",
            fill: "currentColor",
            dangerouslySetInnerHTML: {
                __html: icon,
            },
        });
    }

    function checkBoxItem({ name, field, bool = true, label = null, check = true, edit = false, external = false, onClickCheckFun = () => {}, onClickEditFun = () => {} }) {
        if (bool) {
            let [value, setValue] = useState(CONFIG[field]);
            return React.createElement(
                "div",
                { className: "popup-row", id: "search-element" },
                React.createElement("label", { className: "col description" }, name),
                React.createElement(
                    "div",
                    { className: "col action" },
                    edit
                        ? React.createElement(
                              Spicetify.ReactComponent.TooltipWrapper,
                              {
                                  label: "Edit menu",
                                  showDelay: 200,
                              },
                              React.createElement(
                                  "button",
                                  {
                                      className: "checkbox",
                                      onClick: async () => {
                                          onClickEditFun();
                                      },
                                  },
                                  React.createElement(DisplayIcon, { icon: Spicetify.SVGIcons.edit, size: 16 })
                              )
                          )
                        : null,
                    external
                        ? React.createElement(
                              Spicetify.ReactComponent.TooltipWrapper,
                              {
                                  label: "Open Guide",
                                  showDelay: 200,
                              },
                              React.createElement(
                                  "button",
                                  {
                                      className: "checkbox",
                                      onClick: async () => {
                                          onClickEditFun();
                                      },
                                  },
                                  React.createElement(DisplayIcon, { icon: Spicetify.SVGIcons["external-link"], size: 16 })
                              )
                          )
                        : null,
                    check
                        ? React.createElement(
                              label ? Spicetify.ReactComponent.TooltipWrapper : "div",
                              {
                                  label: label,
                                  showDelay: 200,
                                  className: label ? "" : "no-tool-tip-wrapper",
                              },
                              React.createElement(
                                  "button",
                                  {
                                      className: "checkbox" + (value ? "" : " disabled"),
                                      onClick: async () => {
                                          let state = !value;
                                          CONFIG[field] = state;
                                          setValue(state);
                                          await saveConfig();
                                          onClickCheckFun();

                                          switch (ComplexConditionedSnippets[field]) {
                                              case undefined:
                                                  updateCssSnippet(field);
                                                  break;
                                              case "restart":
                                                  refrestToApply = true;
                                                  break;
                                          }

                                          if (ComplexConditionedSnippetsCond[field] === "restart") {
                                              refrestToApply = true;
                                          }
                                      },
                                  },
                                  React.createElement(DisplayIcon, { icon: Spicetify.SVGIcons.check, size: 16 })
                              )
                          )
                        : null
                )
            );
        } else {
            return null;
        }
    }

    function dropDownItem({ name, field, options, add = false, edit = false, addVisibility = () => false, editVisibility = () => false, bool = true, onChangeFun = () => {}, onClickAddFun = () => {}, onClickEditFun = () => {} }) {
        if (bool) {
            let [value, setValue] = useState(CONFIG[field]);
            return React.createElement(
                "div",
                { className: "popup-row", id: "search-element" },
                React.createElement("label", { className: "col description" }, name),
                React.createElement(
                    "div",
                    { className: "col action" },
                    edit
                        ? React.createElement(
                              Spicetify.ReactComponent.TooltipWrapper,
                              {
                                  label: "Edit current color scheme",
                                  showDelay: 200,
                              },
                              React.createElement(
                                  "button",
                                  {
                                      className: `checkbox${value ? "" : " disabled"}${editVisibility() ? "" : " display-none"}`,
                                      onClick: async () => {
                                          onClickEditFun();
                                      },
                                  },
                                  React.createElement(DisplayIcon, { icon: Spicetify.SVGIcons.edit, size: 16 })
                              )
                          )
                        : null,
                    add
                        ? React.createElement(
                              Spicetify.ReactComponent.TooltipWrapper,
                              {
                                  label: "Create a color scheme",
                                  showDelay: 200,
                              },
                              React.createElement(
                                  "button",
                                  {
                                      className: `checkbox${value ? "" : " disabled"}${addVisibility() ? "" : " display-none"}`,
                                      onClick: async () => {
                                          onClickAddFun();
                                      },
                                  },
                                  React.createElement(DisplayIcon, { icon: Spicetify.SVGIcons.plus2px, size: 16 })
                              )
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

    function inputBoxItem({ name, field, label = null, chooseColor = false, subProperty = false, ChildSubProperty = false, bool = true, onChangeFun = () => {} }) {
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
                { className: "popup-row", id: "search-element" },
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
                    React.createElement(
                        label ? Spicetify.ReactComponent.TooltipWrapper : "div",
                        {
                            label: label,
                            showDelay: 200,
                            className: label ? "" : "no-tool-tip-wrapper",
                        },
                        React.createElement("input", {
                            className: "small-input",
                            value: value,
                            onChange: async (e) => {
                                setValue(e.target.value);
                                onChangeFun(field, e.target.value);
                            },
                        })
                    )
                )
            );
        } else {
            return null;
        }
    }

    function heading({ name, bool = true, start = false }) {
        if (bool) {
            return React.createElement("div", { className: "popup-row" }, start ? React.createElement("hr", { className: "space" }, null) : null, React.createElement("h3", { className: "div-title" }, name), React.createElement("hr", { className: "divider" }, null));
        } else {
            return null;
        }
    }

    function ButtonItem({ name, color = "", onclickFun, onContextMenuFun }) {
        return React.createElement(
            "button",
            {
                className: `login-button${color}`,
                id: "search-ignore-element",
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

    function popupItem({ title, name1, color1 = "", onclickFun1, name2 = null, color2 = "", onclickFun2 = null }) {
        Spicetify.PopupModal.hide();

        let DOMcontent = React.createElement(
            "div",
            null,
            settingsMenuCSS,
            React.createElement(ButtonItem, {
                name: name1,
                color: color1,
                onclickFun: onclickFun1,
            }),
            name2
                ? React.createElement(ButtonItem, {
                      name: name2,
                      color: color2,
                      onclickFun: onclickFun2,
                  })
                : null
        );

        setTimeout(() => {
            Spicetify.PopupModal.display({
                title: title,
                content: DOMcontent,
            });
        }, 100);
    }

    function searchBarItem() {
        return React.createElement(
            "div",
            { className: "popup-row search-div", id: "search-ignore-element" },
            React.createElement(
                "div",
                { className: "col" },
                React.createElement(
                    "div",
                    { className: "nord-search-container" },
                    React.createElement(DisplayIcon, { icon: Spicetify.SVGIcons.search, size: 16, className: "nord-search-icon" }),
                    React.createElement(
                        "input",
                        {
                            type: "text",
                            className: `nord-search`,
                            placeholder: "Search for a feature",
                            onChange: async (e) => {
                                let query = e.target.value.trim().toLowerCase();
                                let rows = document.querySelectorAll(".popup-row");
                                rows.forEach((row) => {
                                    if (row.id == "search-ignore-element") return;
                                    if (query == "") {
                                        row.style.display = "unset";
                                        return;
                                    }
                                    if (row.id == "search-element") {
                                        if (row.textContent.trim().toLowerCase().includes(query)) {
                                            row.style.display = "unset";
                                        } else {
                                            row.style.display = "none";
                                        }
                                    } else {
                                        row.style.display = "none";
                                    }
                                });
                            },
                        },
                        null
                    )
                )
            )
        );
    }

    async function addCustomColorInfo() {
        let addcustomColorInfoContainer = React.createElement(
            "div",
            null,
            settingsMenuCSS,
            React.createElement(checkBoxItem, {
                name: `How to save a Dynamic Theme ?`,
                check: false,
                external: true,
                bool: userConfig.color_scheme === "Dynamic",
                onClickEditFun: () => {
                    window.open("https://github.com/Tetrax-10/Nord-Spotify#save-any-dynamic-theme-to-your-theme-library");
                },
            }),
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
                    })
                )
            ),
            React.createElement(dropDownItem, {
                name: "Based on",
                field: "colorSchemeBasedOn",
                options: (() => {
                    let tempColorSchemesOptions = structuredClone(colorSchemesOptions);
                    if (userConfig.color_scheme != "Dynamic") delete tempColorSchemesOptions.Dynamic;
                    return tempColorSchemesOptions;
                })(),
            }),
            React.createElement(
                "button",
                {
                    className: "small-button",
                    onClick: async () => {
                        let importData = await stringToJSON(await getFromClipboard());
                        CONFIG.colorSchemes[camalize(importData.Name)] = importData;
                        await saveConfig();
                        refreshPopup();
                    },
                },
                `Import from clipboard`
            ),
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
                            if (userConfig.color_scheme == "Dynamic") {
                                colorSchemes[nameObject] = structuredClone(palette);
                            } else {
                                colorSchemes[nameObject] = structuredClone(CONFIG.colorSchemes[basedOn]);
                            }
                            colorSchemes[nameObject]["Name"] = name;
                            CONFIG.colorSchemes = colorSchemes;
                            CONFIG.colorScheme = nameObject;
                            await saveConfig();
                            refreshPopup();
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
        injectCSS(ComplexConditionedSnippets.hideOverlaySmall, "nord--hideOverlaySmall");

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
                React.createElement("p", { className: "popup-row" }, React.createElement("span", null, "Hex values only. Eg: "), React.createElement("span", { style: { color: "#bf616a" } }, "#BF616A"), React.createElement("span", null, " (3/6 digits)")),
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
                    className: "small-button red",
                    onClick: async () => {
                        if (defaultSettings.colorSchemes[userConfig.color_scheme] == undefined) {
                            CONFIG.colorSchemes[userConfig.color_scheme] = defaultSettings.colorSchemes["Spotify"];
                        } else {
                            CONFIG.colorSchemes[userConfig.color_scheme] = defaultSettings.colorSchemes[userConfig.color_scheme];
                        }
                        await saveConfig();
                        refreshPopup();
                    },
                },
                `Reset`
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
                            refreshPopup();
                        } else {
                            notification("Stock Color Schemes can't be Deleted", true);
                        }
                    },
                },
                "Delete"
            ),
            React.createElement(
                "button",
                {
                    className: "small-button",
                    onClick: async () => {
                        sendToClipboard(await JSONToString(CONFIG.colorSchemes[userConfig.color_scheme]));
                        Spicetify.PopupModal.hide();
                        notification("Export Data Copied to Clipboard");
                    },
                },
                "Export to Clipboard"
            ),
            React.createElement(
                "button",
                {
                    className: "small-button green",
                    onClick: async () => {
                        CONFIG.colorSchemes = colorSchemes;
                        await saveConfig();
                        refreshPopup();
                    },
                },
                "Save"
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
        injectCSS(ComplexConditionedSnippets.hideOverlayBig, "nord--hideOverlayBig");

        let editHideWindowsControlsContainer = React.createElement(
            "div",
            null,
            settingsMenuCSS,
            React.createElement(
                "div",
                { className: "popup-row" },
                React.createElement("p", { className: "popup-row" }, "Tutorial"),
                React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "divider" }, null)),
                React.createElement("p", { className: "popup-row" }, `1. First Edit Height and Width, values can also be in decimal`),
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
                    className: "small-button red",
                    onClick: async () => {
                        CONFIG.hideWindowsControlsValues = defaultSettings.hideWindowsControlsValues;
                        await saveConfig();
                        Spicetify.PopupModal.hide();
                        refreshPopup();
                    },
                },
                "Reset"
            ),
            React.createElement(
                "button",
                {
                    className: "small-button green",
                    onClick: async () => {
                        CONFIG.hideWindowsControlsValues = hideWindowsControlsValues;
                        await saveConfig();
                        Spicetify.PopupModal.hide();
                        refreshPopup();
                    },
                },
                "Save"
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
                React.createElement("p", { className: "popup-row" }, "If you have the font installed in your PC, then just enter the font's name. Else paste font's URL"),
                React.createElement(
                    "a",
                    {
                        href: "https://github.com/Tetrax-10/Nord-Spotify#custom-fonts",
                        className: "demo",
                    },
                    "Click for Tutorial"
                ),
                React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
                React.createElement(inputBoxItem, {
                    name: "Font Name",
                    field: "customFontName",
                }),
                React.createElement(inputBoxItem, {
                    name: "Font Url",
                    field: "customFontURL",
                })
            ),
            React.createElement("div", { className: "popup-row" }, React.createElement("hr", { className: "space" }, null)),
            React.createElement(
                "button",
                {
                    className: "small-button red",
                    onClick: async () => {
                        CONFIG.customFontURL = defaultSettings.customFontURL;
                        CONFIG.customFontName = defaultSettings.customFontName;
                        await saveConfig();
                        refreshPopup();
                    },
                },
                "Reset"
            ),
            React.createElement(
                "button",
                {
                    className: "small-button green",
                    onClick: async () => {
                        let inputField = document.querySelectorAll(".popup-row .small-input");
                        let customFontName = inputField[0].value;
                        let customFontURL = inputField[1].value;

                        CONFIG.customFontName = customFontName;
                        CONFIG.customFontURL = customFontURL;
                        await saveConfig();
                        refreshPopup();
                    },
                },
                "Save"
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
                    className: "small-button red",
                    onClick: async () => {
                        CONFIG.fontSize = defaultSettings.fontSize;
                        await saveConfig();
                        refreshPopup();
                    },
                },
                "Reset"
            ),
            React.createElement(
                "button",
                {
                    className: "small-button",
                    onClick: async () => {
                        let values = document.querySelector(".popup-row .small-input");
                        let customFontSize = values.value;
                        CONFIG.fontSize = customFontSize;
                        await saveConfig();
                        refreshPopup();
                    },
                },
                "Save"
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
        React.createElement(searchBarItem),
        React.createElement(heading, {
            name: "Settings",
            start: true,
        }),
        React.createElement(dropDownItem, {
            name: "Spotify Color",
            field: "colorScheme",
            add: true,
            addVisibility: () => true,
            edit: true,
            editVisibility: () => {
                return CONFIG.colorScheme != "Dynamic";
            },
            bool: (!CONFIG.localColor && !isMarketplace) || isMarketplace,
            options: colorSchemesOptions,
            onClickEditFun: () => {
                Spicetify.PopupModal.hide();
                setTimeout(() => {
                    editCustomColor();
                }, 100);
            },
            onClickAddFun: () => {
                Spicetify.PopupModal.hide();
                setTimeout(() => {
                    addCustomColorInfo();
                }, 100);
            },
            onChangeFun: () => {
                removeInjectedElement(`nord--${userConfig.color_scheme}`);
                injectColor(`${CONFIG.colorScheme}`);
            },
        }),
        React.createElement(dropDownItem, {
            name: "Nord Spotify's Dynamic Color Mode",
            field: "dynamicColorMode",
            options: {
                atmos: "Atmosphere (Best)",
                average: "Average of Colors",
                DARK_VIBRANT: "Dark Vibrant",
                LIGHT_VIBRANT: "Light Vibrant",
            },
            onChangeFun: async () => {
                if (userConfig.color_scheme == "Dynamic") {
                    await createDynamicColors();
                }
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Make Dynamic Colors Norded",
            field: "nordedDynamicColor",
            onClickCheckFun: async () => {
                if (userConfig.color_scheme == "Dynamic") {
                    await createDynamicColors();
                }
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Custom Font",
            field: "customFont",
            edit: true,
            onClickEditFun: async () => {
                Spicetify.PopupModal.hide();
                setTimeout(customFontInfo, 100);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Font Size",
            field: "fontSizeBool",
            edit: true,
            onClickEditFun: async () => {
                Spicetify.PopupModal.hide();
                setTimeout(customFontSize, 100);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Windows Control",
            field: "hideWindowsControls",
            bool: isWindows,
            edit: true,
            onClickCheckFun: () => {
                if (CONFIG.hideWindowsControls) {
                    hideWindowsControls();
                } else {
                    removeInjectedElement("nord--hideWindowsControls");
                }
                cssSnippet(hideWindowsControlsCSS(), "nord--hideWindowsControlsCSS", CONFIG.hideWindowsControls);
            },
            onClickEditFun: async () => {
                Spicetify.PopupModal.hide();
                setTimeout(editHideWindowsControls, 100);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Pointers",
            field: "pointers",
            label: "Change Mouse Cursor for Clickable Clements",
        }),
        React.createElement(heading, {
            name: "Banners",
        }),
        React.createElement(checkBoxItem, {
            name: `How to Reposition Banners ?`,
            check: false,
            external: true,
            onClickEditFun: () => {
                window.open("https://github.com/Tetrax-10/Nord-Spotify#how-to-reposition-banner-");
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Show Banner",
            field: "showBanner",
            label: "Makes Cover Art as Banner",
            onClickCheckFun: hideOrShowBanner,
        }),
        React.createElement(checkBoxItem, {
            name: "Full Page Banner",
            field: "fullPageBanner",
            label: "Makes Cover Art Bigger",
            onClickCheckFun: async () => {
                if (CONFIG.fullPageBanner && CONFIG.showBanner) {
                    await dynamicUI(ComplexConditionedSnippets.bigBannerNew, "nord--bigBannerNew", ComplexConditionedSnippets.bigBannerOld, "nord--bigBannerOld", true);
                } else {
                    await dynamicUI(ComplexConditionedSnippets.bigBannerNew, "nord--bigBannerNew", ComplexConditionedSnippets.bigBannerOld, "nord--bigBannerOld", false);
                }
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Banner Overlay",
            field: "bannerOverlay",
            label: "Dark Tint on Banners",
        }),
        React.createElement(inputBoxItem, {
            name: "Banner Overlay Color",
            field: "bannerOverlayColor",
            label: "8 digit Hex code / rgba code",
            onChangeFun: updateBannerOverlayColor,
        }),
        React.createElement(checkBoxItem, {
            name: "Show Banners in Lyrics Page",
            field: "bannersInLyricsPage",
            onClickCheckFun: () => {
                if (pageType == "lyrics-plus" || pageType == "lyrics") {
                    Spicetify.Platform.History.goBack();
                    Spicetify.Platform.History.goForward();
                }
                hideOrShowLyricsPageBanners();
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Show Only Song's Banners",
            field: "songBannersOnly",
        }),
        React.createElement(checkBoxItem, {
            name: "Change Page's CoverArt On Song Change",
            field: "changeCoverArtOnSongChange",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Page's Default CoverArt",
            field: "hideDefaultCoverArt",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Page's Details",
            field: "hidePageDetails",
            label: "Hide user name and description of a page",
            onClickCheckFun: () => {
                cssSnippet(ComplexConditionedSnippets.hidePageDetails, "nord-hidePageDetails", CONFIG.hidePageDetails);
            },
        }),
        React.createElement(inputBoxItem, {
            name: "Banner Blur Amout",
            field: "bannerBlurValue",
            label: "0 to 100",
            onChangeFun: (field, value) => {
                updateBannerBlur(field, value, "contextMenu");
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Fit Banner Image to Screen Size",
            field: "fitBannerSize",
            label: "",
            onClickCheckFun: () => {
                CONFIG.fitBannerSize ? (banner.style.backgroundSize = "contain") : (banner.style.backgroundSize = "100%");
            },
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
            label: "Hide Marketplace from Sidebar",
        }),
        React.createElement(checkBoxItem, {
            name: "Dark SideBar",
            field: "darkSideBar",
            bool: !isNewUI,
            onClickCheckFun: async () => {
                removeInjectedElement(`nord--${userConfig.color_scheme}`);
                injectColor(`${CONFIG.colorScheme}`);
            },
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
            name: "Bolded SideBar Playlist Names",
            field: "boldedSideBarItems",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide SideBar Divider",
            field: "hideSideBarDivider",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide SideBar Status",
            field: "hideSideBarStatus",
            label: "Hide playing/download status in sidebar",
        }),
        React.createElement(heading, {
            name: "Player",
        }),
        React.createElement(checkBoxItem, {
            name: "Show Timestamp on Hovering the Progress Bar",
            field: "hoverTime",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Friend Activity",
            field: "hideFriendActivity",
            bool: isNewUI,
            label: "Hide friend activity icon from player bar",
            onClickCheckFun: async () => {
                await dynamicUI(ComplexConditionedSnippets.hideFriendActivity, "nord--hideFriendActivity", null, null, CONFIG.hideFriendActivity);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Spotify Connect",
            field: "hideSpotifyConnect",
            label: "Hide spotify connect icon from player bar",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Spotify's Full Screen",
            field: "hideSpotifyFullScreen",
            bool: isPremium,
            label: "Hide spotify's full screen icon from player bar",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Dots Under Player Controls",
            field: "hideDotsUnderPlayerButtons",
        }),
        React.createElement(heading, {
            name: "Playlist",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Similar Songs Recommendation on Playlist Page",
            field: "hideSimilarSongsRecommendation",
        }),
        React.createElement(checkBoxItem, {
            name: "Disable Highlighting of Current Playing Song",
            field: "hideCurrentPlayingSongBG",
            onClickCheckFun: () => {
                cssSnippet(ComplexConditionedSnippets.hideCurrentPlayingSongBG, "nord--hideCurrentPlayingSongBG", !CONFIG.hideCurrentPlayingSongBG);
            },
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Playlist Image Edit Button",
            field: "hidePlaylistImageEditButton",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Radio Page's Gradient Effect",
            field: "hideRadioGradient",
        }),
        React.createElement(heading, {
            name: "Your Library",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Liked Song's Card",
            field: "hideLikedSongsCard",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Liked Song's Card Text",
            field: "hideLikedSongsCardTexts",
        }),
        React.createElement(heading, {
            name: "Lyrics",
        }),
        React.createElement(checkBoxItem, {
            name: "Make Lyrics alignment Center",
            field: "centeredLyrics",
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
            name: "Remove Lyrics BG Color",
            field: "nordLyrics",
            onClickCheckFun: nordLyricsFun,
        }),
        React.createElement(heading, {
            name: "Misc",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Ads",
            field: "hideAds",
            bool: !isPremium,
            label: "Hides all UI Ads",
        }),
        React.createElement(checkBoxItem, {
            name: "Norded Genre Cards",
            field: "betterGenre",
        }),
        React.createElement(checkBoxItem, {
            name: "Hide Cards Download Status",
            field: "hideCardsDownloadStatus",
        }),
        React.createElement(checkBoxItem, {
            name: "Bubble UI",
            field: "bubbleUI",
            bool: isNewUI,
            onClickCheckFun: () => {
                cssSnippet(ComplexConditionedSnippets.bubbleUI, "nord--bubbleUI", !CONFIG.bubbleUI);
            },
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
            name: "Advanced Settings",
        }),
        React.createElement(checkBoxItem, {
            name: "Right Click Nord Spotify Settings Icon to Refresh",
            field: "rightClickToReload",
        }),
        React.createElement(checkBoxItem, {
            name: "Use Local Colors ( color.ini )",
            field: "localColor",
            label: "Use Spicetify/Themes/Nord-Spotify/color.ini",
            bool: !isMarketplace,
        }),
        React.createElement(ButtonItem, {
            name: "Like on GitHub 👍",
            onclickFun: () => {
                window.open("https://github.com/Tetrax-10/Nord-Spotify");
            },
        }),
        React.createElement(ButtonItem, {
            name: "Reset Settings",
            color: " red",
            onclickFun: async () => {
                popupItem({
                    title: "Reset Nord Spotify ?",
                    name1: "Cancel",
                    color1: " green",
                    onclickFun1: () => {
                        Spicetify.PopupModal.hide();
                    },
                    name2: "Reset",
                    color2: " red",
                    onclickFun2: () => {
                        Spicetify.LocalStorage.remove("nord:settings");
                        forceReload();
                    },
                });
            },
        }),
        React.createElement(ButtonItem, {
            name: "Backup",
            onclickFun: () => {
                popupItem({
                    title: "Backup Option",
                    name1: "Banner Positions",
                    onclickFun1: () => {
                        exportSettings("banners");
                    },
                    name2: "All Settings",
                    onclickFun2: () => {
                        exportSettings("all");
                    },
                });
            },
        }),
        React.createElement(ButtonItem, {
            name: "Restore",
            onclickFun: () => {
                popupItem({
                    title: "Restore Option",
                    name1: "Banner Positions",
                    onclickFun1: () => {
                        importSettings("banners");
                    },
                    name2: "All Settings",
                    onclickFun2: () => {
                        importSettings("all");
                    },
                });
            },
        })
    );

    function settingsPage() {
        Spicetify.PopupModal.display({
            title: "Nord Spotify",
            content: settingsDOMContent,
            isLarge: true,
        });

        waitForUserToTriggerClosePopup();
    }

    ////////////////////////////////////// Menu ///////////////////////////////////////////

    let svg = `<svg viewBox="0 0 262.394 262.394" style="scale: 0.5; fill: var(--spice-custom-subdued)"><path d="M245.63,103.39h-9.91c-2.486-9.371-6.197-18.242-10.955-26.432l7.015-7.015c6.546-6.546,6.546-17.159,0-23.705 l-15.621-15.621c-6.546-6.546-17.159-6.546-23.705,0l-7.015,7.015c-8.19-4.758-17.061-8.468-26.432-10.955v-9.914 C159.007,7.505,151.502,0,142.244,0h-22.091c-9.258,0-16.763,7.505-16.763,16.763v9.914c-9.37,2.486-18.242,6.197-26.431,10.954 l-7.016-7.015c-6.546-6.546-17.159-6.546-23.705,0.001L30.618,46.238c-6.546,6.546-6.546,17.159,0,23.705l7.014,7.014 c-4.758,8.19-8.469,17.062-10.955,26.433h-9.914c-9.257,0-16.762,7.505-16.762,16.763v22.09c0,9.258,7.505,16.763,16.762,16.763 h9.914c2.487,9.371,6.198,18.243,10.956,26.433l-7.015,7.015c-6.546,6.546-6.546,17.159,0,23.705l15.621,15.621 c6.546,6.546,17.159,6.546,23.705,0l7.016-7.016c8.189,4.758,17.061,8.469,26.431,10.955v9.913c0,9.258,7.505,16.763,16.763,16.763 h22.091c9.258,0,16.763-7.505,16.763-16.763v-9.913c9.371-2.487,18.242-6.198,26.432-10.956l7.016,7.017 c6.546,6.546,17.159,6.546,23.705,0l15.621-15.621c3.145-3.144,4.91-7.407,4.91-11.853s-1.766-8.709-4.91-11.853l-7.016-7.016 c4.758-8.189,8.468-17.062,10.955-26.432h9.91c9.258,0,16.763-7.505,16.763-16.763v-22.09 C262.393,110.895,254.888,103.39,245.63,103.39z M131.198,191.194c-33.083,0-59.998-26.915-59.998-59.997 c0-33.083,26.915-59.998,59.998-59.998s59.998,26.915,59.998,59.998C191.196,164.279,164.281,191.194,131.198,191.194z"/><path d="M131.198,101.199c-16.541,0-29.998,13.457-29.998,29.998c0,16.54,13.457,29.997,29.998,29.997s29.998-13.457,29.998-29.997 C161.196,114.656,147.739,101.199,131.198,101.199z"/></svg>`;

    let settingsButton = new Spicetify.Topbar.Button("Nord Spotify", svg, settingsPage);

    ////////////////////////////////////// CSS Snippets ///////////////////////////////////////////

    let enableTransition = "background-image 0.5s, background-size 0.5s, background-position-y 2s, filter 0.5s ease-in-out";
    let disableTransition = "background-image 0.5s, background-size 0.5s, background-position-y 0s, filter 0.5s ease-in-out";

    let refrestToApply = false;

    let Snippets = {
        hideHomePageRecommendation: `
    /* disable homepage recommendation */
    section[data-testid="home-page"] .main-shelf-shelf:not([aria-label="Recently played"]) {
        display: none !important;
    }`,

        hideLikedSongsCard: `
    /* remove liked songs card in your library */
    .collection-collectionEntityHeroCard-likedSongs {
        display: none;
    }`,

        hideLikedSongsCardTexts: `
    /* blue like card useless text in your library */
    .collection-collectionEntityHeroCard-tracksContainer {
        display: none;
    }`,

        hideSimilarSongsRecommendation: `
    /* disable similar song suggestion in playlist */
    .playlist-playlist-seeMore,
    .playlist-playlist-playlistInlineCurationSection,
    .playlist-playlist-searchResultListContainer,
    .playlist-playlist-recommendedTrackList {
        display: none !important;
    }`,

        hidePlaylistImageEditButton: `
    /* remove playlist edit image button */
    .main-editImageButton-overlay {
        display: none;
    }`,

        hideRadioGradient: `
    /* radio gradient hidden */
    .KNUIWLKuuA1qIkTt4jus:after {
        background: none !important;
    }`,

        hideSideBarStatus: `
    /* hide sidebar status */
    .main-rootlist-statusIcons {
        display: none;
    }`,

        hideCardsDownloadStatus: `
    /* hide cards download status (home page) */
    .main-card-DownloadStatusIndicator,
    /* search result top result */
    .hcxPtZcvjM07S6ydT685 {
        display: none;
    }`,

        hideSpotifyConnect: `
    /* hide spotify connect */
    .PrhIVExjBkmjHt6Ea4XE {
        display: none;
    }`,

        hideAds: `
    /* upgrade button top bar */
    button[title="Upgrade to Premium"],
    button[aria-label="Upgrade to Premium"],
    .main-topBar-UpgradeButton,
    /* top bar user context menu Upgrade to Premium */
    .main-contextMenu-menuItem a[href="https://www.spotify.com/premium/"],
    .main-contextMenu-menuItem a[href="https://www.spotify.com/premium/?ref=desktop_loggedin_upgrade_menu"],
    /* top side ads */
    .WiPggcPDzbwGxoxwLWFf,
    /* bottom ads */
    .main-leaderboardComponent-container,
    /* popup video ad */
    .Root__modal-slot .GenericModal__overlay.QMMTQfEw3AIHFf4dTRp3.nPKDEvIoCzySBR24pZiN {
        display: none !important;
    }
    /* Context menu download button */
    .main-contextMenu-disabled:not([as="a"]) {
        display: none !important;
    }

    /* no idea what these are */
    .Root__ads-container-desktop--is-hidden,
    .sponsor-container,
    .desktoproutes-homepage-takeover-ad-hptoComponent-parentContainer {
        display: none !important;
    }`,

        hideSideBarScrollBar: `
    /* hides sidebar scrollbar */
    .os-scrollbar:nth-child(6) .os-scrollbar-handle {
        visibility: hidden;
    }`,

        highlightSideBarItem: `
    /* sidebar selected item (main items) */
    .personal-library .main-collectionLinkButton-collectionLinkButton.main-collectionLinkButton-selected.active,
    .main-navBar-navBarItem .main-navBar-navBarLinkActive {
        background-color: var(--spice-custom-main-soft-secondary);
        border-radius: 10px;
    }`,

        highlightSideBarSelectedItem: `
    /* sidebar selected playlist */
    .main-rootlist-rootlistItem .main-rootlist-rootlistItemLinkActive:hover,
    .main-rootlist-rootlistItem .main-rootlist-rootlistItemLinkActive {
        color: var(--spice-custom-link-hover) !important;
    }`,

        boldedSideBarItems: `
    /* sidebar playlist names */
    .main-rootlist-rootlistItem span {
        font-weight: bold;
    }`,

        hideSideBarDivider: `
    /* sidebar divider invisible */
    .LayoutResizer__resize-bar {
        background: none;
    }`,

        betterGenre: `
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
    }`,

        bannerOverlay: `
    /* banner image overlay */
    #main-banner:after,
    /* artist image overlay */
    .main-entityHeader-background:after {
        position: fixed;
        top: 0;
        left: 0;
        display: block;
        content: "";
        background: ${CONFIG.bannerOverlayColor};
        height: 100vh;
        width: 100%;
        z-index: -1;
    }`,

        hideDotsUnderPlayerButtons: `
    /* hide dots under active button */
    .main-shuffleButton-button.main-shuffleButton-active:after,
    .main-repeatButton-button.main-repeatButton-active:after,
    /* queue */
    .KAZD28usA1vPz5GVpm63.RK45o6dbvO1mb0wQtSwq:after,
    .control-button--active-dot:after {
        display: none;
    }`,

        pointers: `
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
    }`,

        betterSpotifyLyrics: `
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
    }`,

        betterLyricsPlus: `
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
    }`,

        hideSpotifyFullScreen: `
    /* hide spotify premium full screen */
    .control-button[aria-label="Full screen"] {
        display: none;
    }`,

        hideMarketplace: `
    /* hide marketplace */
    .main-navBar-navBarItem[data-id="/marketplace"] {
        display: none;
    }`,

        hoverTime: `
    .playback-bar__progress-time-elapsed,
    .main-playbackBarRemainingTime-container {
        opacity: 0;
    }`,

        hideDefaultCoverArt: `
    section[data-testid="playlist-page"] .playlist-playlist-playlistImageContainer,
    section[data-testid="enhanced-page"] .playlist-playlist-playlistImageContainer,
    section[data-testid="artist-page"] .main-entityHeader-imageContainer,
    /* artist page without artist banner */
    section .main-entityHeader-imageContainer,
    section[data-testid="album-page"] .main-entityHeader-imageContainer,
    section[data-testid="playlist-page"] .playlist-playlist-playlistImageContainer {
        display: none;
    }`,

        centeredLyrics: `
    .lyrics-lyrics-contentContainer {
        justify-content: center !important;
    }
    .lyrics-lyricsContent-lyric {
        display: flex;
        justify-content: center !important;
    }
    .lyrics-lyrics-contentContainer .lyrics-lyrics-contentWrapper {
        margin: unset !important;
    }`,

        customFont: customFont(CONFIG.customFontURL, CONFIG.customFontName),
        fontSizeBool: fontSize(CONFIG.fontSize),
    };

    let ComplexConditionedSnippets = {
        quickSearch: "restart",
        search: "restart",
        redo: "restart",

        nordLyrics: `
    /* spotify lyrics background norded */
    .lyrics-lyrics-container * {
        --lyrics-color-background: none;
        --lyrics-color-active: var(--spice-text);
        --lyrics-color-messaging: var(--spice-text);
        --lyrics-color-inactive: rgba(var(--spice-rgb-text), 0.7);
        --lyrics-color-passed: rgba(var(--spice-rgb-text), 0.7);
    }`,

        hidePageDetails: `
    .main-entityHeader-subtitle.main-entityHeader-small.main-entityHeader-uppercase.main-entityHeader-bold,
    .main-entityHeader-subtitle.main-entityHeader-gray,
    .main-entityHeader-metaData,
    .main-entityHeader-headerText > span,
    .main-entityHeader-headerText > div {
        display: none;
    }
    .main-entityHeader-title {
        display: -webkit-box !important;
    }`,

        hideCurrentPlayingSongBG: `
    /* current playing song background */
    div.main-rootlist-wrapper > div:nth-child(2) > div .main-trackList-active {
        border-radius: 10px;
        background-color: rgba(var(--spice-rgb-custom-main-soft-secondary), 0.6);
    }`,

        bubbleUI: `
    /* bubble UI */
    :root {
        --spice-sidebar: var(--spice-main) !important;
    }
    .main-nowPlayingBar-center .x-progressBar-progressBarBg .x-progressBar-sliderArea {
        border-radius: 10px !important;
    }`,

        hideFriendActivity: `
    /* hide friend activity */
    .main-nowPlayingBar-right button[aria-label="Friend Activity"] {
        display: none;
    }`,

        hideTopBar: `
    .main-topBar-background {
        background-color: unset !important;
    }
    .main-topBar-overlay {
        background-color: unset !important;
    }`,

        hideArtistTopBarNew: `
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
        -webkit-app-region: drag !important;
    }`,

        hideArtistTopBarOld: `
    .main-entityHeader-topbarTitle {
        background-color: var(--spice-main);
        padding: 10px;
        width: 100%;
        padding-top: 15px;
        padding-left: 32px;
        position: absolute;
        left: 0px;
        transition: all 0s ease;
        -webkit-app-region: drag !important;
    }`,

        bigBannerNew: `
    /* Big Playlists */
    .nav-alt .main-entityHeader-nonWrapped,
    .main-entityHeader-background {
        height: calc(100vh - 88px) !important;
    }`,

        bigBannerOld: `
    /* Big Playlist */
    .main-entityHeader-nonWrapped,
    /* Big artist */
    .main-entityHeader-background {
        height: calc(100vh - 78px) !important;
    }`,

        lyricsPlusNoBg: `
    .lyrics-lyricsContainer-LyricsBackground {
        background-color: unset !important;
    }`,

        hideOverlayBig: `
    /* Hide Overlay */
    .GenericModal__overlay {
        background-color: transparent;
    }
    .main-embedWidgetGenerator-container {
        box-shadow: 0 0 50px rgba(var(--spice-rgb-shadow), 1) !important;
    }`,

        hideOverlaySmall: `
    /* Hide Overlay */
    .GenericModal__overlay {
        background-color: transparent;
    }
    .main-trackCreditsModal-container {
        box-shadow: 0 0 50px rgba(var(--spice-rgb-shadow), 1) !important;
        width: 100% !important;
        max-width: 520px !important;
    }`,

        injectPopupCSS: `
    .GenericModal__overlay {
        visibility: hidden;
    }
    .GenericModal {
        visibility: visible;
    }`,

        bannerCSS: `
    #main-banner {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        will-change: transform;
        z-index: -1;
        transition: ${enableTransition};
        display: none;
    }
    #pre-banner {
        display: none;
    }`,
    };

    let ComplexConditionedSnippetsCond = {
        nordLyrics: "restart",
    };

    async function updateBannerBlur(field, value, src) {
        if (value == "") {
            value = 0;
        }

        if (src == "contextMenu") {
            CONFIG[field] = value;
            await saveConfig(field, CONFIG[field]);
        }

        filterCSS = value == 0 ? "unset" : `blur(${value}px)`;
        banner.style.filter = filterCSS;
    }

    async function updateBannerOverlayColor(field, value) {
        if (!value) {
            value = defaultSettings[field];
        }

        CONFIG[field] = value;
        await saveConfig(field, CONFIG[field]);

        let bannerOverlay = `
        /* banner image overlay */
        #main-banner:after,
        /* artist image overlay */
        .main-entityHeader-background:after {
            position: fixed;
            top: 0;
            left: 0;
            display: block;
            content: "";
            background: ${value};
            height: 100vh;
            width: 100%;
            z-index: -1;
        }`;

        if (CONFIG.bannerOverlay) {
            removeInjectedElement("nord--bannerOverlay");
            cssSnippet(bannerOverlay, "nord--bannerOverlay", true);
        }
    }

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

    ////////////////////////////////////// Apply CSS Snippets ///////////////////////////////////////////

    nordLyricsFun();

    Object.keys(Snippets).forEach((id) => updateCssSnippet(id));

    cssSnippet(ComplexConditionedSnippets.nordLyrics, "nord--nordLyrics", CONFIG.nordLyrics);

    cssSnippet(ComplexConditionedSnippets.hideCurrentPlayingSongBG, "nord--hideCurrentPlayingSongBG", !CONFIG.hideCurrentPlayingSongBG);

    cssSnippet(ComplexConditionedSnippets.bubbleUI, "nord--bubbleUI", !CONFIG.bubbleUI);

    await dynamicUI(ComplexConditionedSnippets.hideFriendActivity, "nord--hideFriendActivity", null, null, CONFIG.hideFriendActivity);

    if (isWindows) {
        hideWindowsControls(); // injects div
        cssSnippet(hideWindowsControlsCSS(), "nord--hideWindowsControlsCSS", CONFIG.hideWindowsControls); // injects css for the above div
    }

    ////////////////////////////////////// Apply JS Snippets ///////////////////////////////////////////

    injectJS(quickSearchKeyBind);

    injectJS(searchKeyBind);

    injectJS(redoKeyBind);

    injectReload(CONFIG.rightClickToReload);

    ////////////////////////////////////// Core Functions ///////////////////////////////////////////

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

    function injectRemoteJS(src, id) {
        if (!body.classList.contains(id)) {
            let script = document.createElement("script");
            script.id = id;
            script.type = "text/javascript";
            script.src = src;
            body.appendChild(script);
            body.classList.add(id);
        }
    }

    function updateCssSnippet(id) {
        if (CONFIG[id]) {
            injectCSS(Snippets[id], `nord--${id}`);
        } else {
            removeInjectedElement(`nord--${id}`);
        }
    }

    function cssSnippet(data, id, bool) {
        if (data && id) {
            bool ? injectCSS(data, id) : removeInjectedElement(id);
        }
    }

    async function dynamicUI(newUICode, newID, oldUICode, oldID, bool) {
        if (isNewUI) {
            cssSnippet(newUICode, newID, bool);
        } else {
            cssSnippet(oldUICode, oldID, bool);
        }
    }

    function marketplaceDynamicState(bool) {
        if (getLocalStorageDataFromKey("marketplace:albumArtBasedColors") != bool.toString() && isMarketplace) {
            setLocalStorageDataWithKey("marketplace:albumArtBasedColors", bool.toString());
            forceReload();
        }
    }

    async function injectColor(colorScheme, src = "") {
        if ((CONFIG.localColor && !isMarketplace) || colorScheme == "Dynamic") {
            if (colorScheme == "Dynamic") {
                injectRemoteJS("https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js", "chroma-js");
                userConfig.color_scheme = "Dynamic";
                src == "start" ? null : await createDynamicColors();
            }
            return;
        }

        userConfig.color_scheme = colorScheme;
        injectCSS(createColorScheme(colorSchemes[colorScheme]), `nord--${colorScheme}`);
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
        return (await waitForElement(".nav-alt", 1000)) ? true : false;
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
            settingsButton.element.addEventListener("contextmenu", forceReload);
        }
    }

    async function waitForUserToTriggerClosePopup() {
        let closeButton = await waitForElement("body > generic-modal button.main-trackCreditsModal-closeBtn", 1000);
        let modalOverlay = await waitForElement("body > generic-modal > div", 1000);
        if (closeButton && modalOverlay) {
            closeButton.onclick = () => {
                Spicetify.PopupModal.hide();
                if (refrestToApply) {
                    refreshPopup();
                }
            };
            modalOverlay.onclick = (e) => {
                if (e.target === modalOverlay && refrestToApply) {
                    refreshPopup();
                }
            };
        }
    }

    async function waitForElement(selector, timeout = null, location = document.body) {
        return new Promise((resolve) => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            let observer = new MutationObserver(async () => {
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
            let observer = new MutationObserver(async () => {
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

    function forceReload() {
        Spicetify.PopupModal.hide();
        location.reload();
    }

    function refreshPopup() {
        popupItem({
            title: "Refresh To Apply Changes ?",
            name1: "Later",
            onclickFun1: () => {
                refrestToApply = false;
                Spicetify.PopupModal.hide();
            },
            name2: "Refresh",
            onclickFun2: () => {
                forceReload();
            },
        });
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
        if (typeof field == "string") {
            if (!isHex(value)) {
                value = CONFIG.colorSchemes[userConfig.color_scheme][field];
            }
            colorSchemes[userConfig.color_scheme][field] = value.toUpperCase();
            removeInjectedElement(`nord--${userConfig.color_scheme}`);
            injectCSS(createColorScheme(colorSchemes[userConfig.color_scheme]), `nord--${userConfig.color_scheme}`);
        } else {
            removeInjectedElement(`nord--${userConfig.color_scheme}`);
            injectCSS(createColorScheme(field), `nord--Dynamic`);
        }
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

    async function importSettings(mode) {
        let importData;
        try {
            switch (mode) {
                case "all":
                    importData = await stringToJSON(await filePicker());
                    if (importData.pointers !== undefined) {
                        CONFIG = importData;
                    } else {
                        Spicetify.PopupModal.hide();
                        notification("Falied to Restore, File seems to be Corrupted!");
                        return;
                    }
                    await saveConfig();
                    refreshPopup();
                    break;
                case "banners":
                    importData = await stringToJSON(await filePicker());
                    if (importData.bannerPosition !== undefined) {
                        CONFIG.bannerPosition = importData.bannerPosition;
                    } else if (Object.keys(importData)[0]) {
                        CONFIG.bannerPosition = importData;
                    } else {
                        Spicetify.PopupModal.hide();
                        notification("Falied to Restore, File seems to be Corrupted!");
                        return;
                    }
                    await saveConfig();
                    refreshPopup();
                    break;
            }
        } catch {
            Spicetify.PopupModal.hide();
            notification("Falied to Restore, File seems to be Corrupted!");
        }
    }

    async function exportSettings(mode) {
        switch (mode) {
            case "all":
                sendToClipboard(await JSONToString(CONFIG));
                break;
            case "banners":
                sendToClipboard(await JSONToString(CONFIG.bannerPosition));
                break;
        }
        Spicetify.PopupModal.hide();
        notification("Export Data Copied to Clipboard");
    }

    async function filePicker() {
        let fileHandle = await window.showOpenFilePicker();
        let file = await fileHandle[0].getFile();
        let text = await file.text();

        return text;
    }

    async function ResetItem(item) {
        CONFIG[item] = defaultSettings[item];
        await saveConfig();
    }

    function localStorageInfo() {
        let localStorageAllStringsLength = 0;
        let itemLength, item, nordSpotifySize, totalSizeOccupied;
        console.log("");

        for (item in localStorage) {
            if (!localStorage.hasOwnProperty(item)) {
                continue;
            }

            itemLength = (localStorage[item].length + item.length) * 2;
            localStorageAllStringsLength += itemLength;

            if (item == "nord:settings") {
                nordSpotifySize = itemLength / 1024;
                console.log("Nord Spotify = " + nordSpotifySize.toFixed(2) + " KB");
            }
        }

        totalSizeOccupied = localStorageAllStringsLength / 1024;
        console.log("Others       = " + (totalSizeOccupied - nordSpotifySize).toFixed(2) + " KB");
        console.log("Total        = " + totalSizeOccupied.toFixed(2) + " KB / 5 MB");
    }

    function createColorScheme(colors) {
        return `
        :root {
            --spice-text: ${colors["text"]}${priority};
            --spice-subtext: ${colors["subtext"]}${priority};
            --spice-main: ${colors["main"]}${priority};
            --spice-sidebar: ${CONFIG.darkSideBar || isNewUI ? colors["sidebar"] : colors["main"]}${priority};
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
        injectCSS(ComplexConditionedSnippets.injectPopupCSS, "nord--injectPopupCSS");

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

    function nordLyricsFun() {
        if (CONFIG.nordLyrics) {
            setLocalStorageDataWithKey("lyrics-plus:visual:colorful", "false");
            setLocalStorageDataWithKey("lyrics-plus:visual:noise", "false");
        } else {
            setLocalStorageDataWithKey("lyrics-plus:visual:colorful", "true");
            setLocalStorageDataWithKey("lyrics-plus:visual:noise", "true");
        }
    }

    async function updateURI(src, rawData) {
        if (!CONFIG.changeCoverArtOnSongChange && isBannerPage && src == "song") {
            return;
        }

        if (pageType == "artists" || pageType == "playlists") {
            try {
                let bigCoverArt;
                if (src == "song") {
                    bigCoverArt = await waitForElement(".main-entityHeader-background", 1000);
                    bigCoverArt.style.display = "none";
                } else {
                    bigCoverArt.style.display = "unset";
                }
            } catch {}
        }

        if (src == "song" || !isBannerPage || CONFIG.songBannersOnly) {
            if (islocal) {
                uri = rawData.data.track.uri;
            } else {
                uri = rawData.data.track.metadata.album_uri;
            }

            try {
                uid = uri.split(":")[2];
            } catch {
                console.error("URI is not splittable");
            }

            if (previousUri == uri) {
                previousUri = uri;
                shouldChangeProp = false;
                return;
            }
            previousUri = uri;
            shouldChangeProp = true;

            image = rawData.data.track.metadata.image_xlarge_url;
        } else if (isBannerPage) {
            uri = pathToURI(path);
            uid = pathToURI(path, "uid");

            if (previousUri == uri) {
                previousUri = uri;
                shouldChangeProp = false;
                return;
            }
            previousUri = uri;
            shouldChangeProp = true;

            image = await fetchImage(rawData);
        }
    }

    async function updateBannerImage() {
        if (banner.style.backgroundImage == `url("${image}")`) {
            return;
        }

        preBanner.style.backgroundImage = `url("${image}")`;
        banner.style.filter = "blur(100px)";

        setTimeout(() => {
            banner.style.backgroundImage = `url("${image}")`;
            let pos = CONFIG.bannerPosition[uri] ? parseInt(CONFIG.bannerPosition[uri]) : "50";
            banner.style.backgroundPositionY = pos + "%";
            banner.style.filter = filterCSS;
        }, 500);
    }

    async function hideTopBarRules() {
        let cond2 = pageType == "new-releases" && isNewUI;

        if (isValidPage || cond2) {
            injectCSS(ComplexConditionedSnippets.hideTopBar, "nord--hideTopBar");
            if (isValidPage) {
                await dynamicUI(ComplexConditionedSnippets.hideArtistTopBarNew, "nord--hideArtistTopBarNew", ComplexConditionedSnippets.hideArtistTopBarOld, "nord--hideArtistTopBarOld", true);
            }
        } else {
            removeInjectedElement("nord--hideArtistTopBarNew");
            removeInjectedElement("nord--hideArtistTopBarOld");
            removeInjectedElement("nord--hideTopBar");
        }
    }

    function hideOrShowLyricsPageBanners() {
        if ((pageType == "lyrics-plus" || pageType == "lyrics") && CONFIG.bannersInLyricsPage) {
            pageType == "lyrics-plus" ? injectCSS(ComplexConditionedSnippets.lyricsPlusNoBg, "nord--lyricsPlusNoBg") : null;
            updateBannerBlur("bannerBlurValue", 20);
        } else {
            updateBannerBlur("bannerBlurValue", CONFIG.bannerBlurValue);
            removeInjectedElement("nord--lyricsPlusNoBg");
        }
    }

    async function hideOrShowBanner() {
        if (isValidPage && CONFIG.showBanner) {
            hideOrShowLyricsPageBanners();
            if (CONFIG.fullPageBanner) {
                await dynamicUI(ComplexConditionedSnippets.bigBannerNew, "nord--bigBannerNew", ComplexConditionedSnippets.bigBannerOld, "nord--bigBannerOld", true);
            }
            cssSnippet(ComplexConditionedSnippets.hidePageDetails, "nord-hidePageDetails", CONFIG.hidePageDetails);
            banner.style.display = "unset";
        } else {
            await dynamicUI(ComplexConditionedSnippets.bigBannerNew, "nord--bigBannerNew", ComplexConditionedSnippets.bigBannerOld, "nord--bigBannerOld", false);
            cssSnippet(ComplexConditionedSnippets.hidePageDetails, "nord-hidePageDetails", false);
            banner.style.display = "none";
        }

        let fixAlbumPage = `
        section[data-testid="album-page"] > div:nth-child(4),
        section[data-testid="album-page"] > div:nth-child(5) {
            background-color: var(--spice-main);
        }
        .main-actionBar-ActionBar.contentSpacing {
            background-color: var(--spice-main);
        }
        .contentSpacing {
            padding: 32px !important;
        }`;

        let fixLikedSongsPage = `
        .main-actionBar-ActionBar.contentSpacing {
            background-color: var(--spice-main);
        }
        .playlist-playlist-playlist[data-testid="playlist-page"] > div:nth-child(4),
        section[data-testid="enhanced-page"] > div:nth-child(3) {
            background-color: var(--spice-main);
        }`;

        let fixFolderPage = `
        .main-actionBar-ActionBar.contentSpacing {
            background-color: var(--spice-main);
        }
        .folder-folderPage-sectionWrapper > div:nth-child(4) {
            background-color: var(--spice-main);
        }`;

        let fixShowsPage = `
        .main-actionBar-ActionBar.contentSpacing {
            background-color: var(--spice-main);
        }
        .show-showPage-sectionWrapper > div:nth-child(4) {
            background-color: var(--spice-main);
        }`;

        let fixLocalPage = `
        .main-actionBar-ActionBar.contentSpacing {
            background-color: var(--spice-main);
        }
        .uCHqQ74vvHOnctGg0X0B > div:nth-child(4) {
            background-color: var(--spice-main);
        }`;

        let fixEnhancedPage = `
        .main-actionBar-ActionBar.contentSpacing {
            background-color: var(--spice-main);
        }
        section[data-testid="enhanced-page"] > div:nth-child(3) {
            background-color: var(--spice-main);
        }`;

        if (pageType == "albums") {
            cssSnippet(fixAlbumPage, "nord--fixAlbumPage", true);
        } else {
            cssSnippet(fixAlbumPage, "nord--fixAlbumPage", false);
        }

        if (pageType == "playlists") {
            cssSnippet(fixEnhancedPage, "nord--fixEnhancedPage", true);
        } else {
            cssSnippet(fixEnhancedPage, "nord--fixEnhancedPage", false);
        }

        if (pageType == "liked") {
            cssSnippet(fixLikedSongsPage, "nord--fixLikedSongsPage", true);
        } else {
            cssSnippet(fixLikedSongsPage, "nord--fixLikedSongsPage", false);
        }

        if (pageType == "folder") {
            cssSnippet(fixFolderPage, "nord--fixFolderPage", true);
        } else {
            cssSnippet(fixFolderPage, "nord--fixFolderPage", false);
        }

        if (pageType == "shows") {
            cssSnippet(fixShowsPage, "nord--fixShowsPage", true);
        } else {
            cssSnippet(fixShowsPage, "nord--fixShowsPage", false);
        }

        if (pageType == "local") {
            cssSnippet(fixLocalPage, "nord--fixLocalPage", true);
        } else {
            cssSnippet(fixLocalPage, "nord--fixLocalPage", false);
        }
    }

    function pathToURI(path, uid = false) {
        path = path.split("/");
        if (uid) {
            return path[2];
        }
        return `spotify:${path[1]}:${path[2]}`;
    }

    async function fetchImage(rawData = Spicetify.Player) {
        try {
            if (pageType == "playlists") {
                rawData = (await Spicetify.Platform.PlaylistAPI.getMetadata(`spotify:playlist:${uid}`)).images;
                if (rawData.length > 1) return rawData.pop()["url"];
            }
            if (isBannerPage) {
                rawData = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/${pageType}/${uid}`);
                return rawData.images[0]["url"];
            } else {
                return rawData.data.track.metadata.image_xlarge_url;
            }
        } catch {}
    }

    function pathToType() {
        let rootPath = path.split("/")[1];

        switch (rootPath) {
            case "playlist":
            case "album":
            case "show":
                isBannerPage = true;
                isValidPage = true;
                return rootPath + "s";
            case "artist":
                if (path.split("/").length == 3) {
                    isBannerPage = true;
                    isValidPage = true;
                    return "artists";
                }
                break;
            case "genre":
                if (!(path.split("/")[2].includes("section") || path.split("/")[2].includes("recently-played"))) {
                    isBannerPage = false;
                    isValidPage = true;
                    return "genre";
                }
                break;
            case "folder":
                isBannerPage = false;
                isValidPage = true;
                return rootPath;
            case "new-releases":
                isBannerPage = false;
                isValidPage = false;
                return rootPath;
            case "lyrics-plus":
                isBannerPage = false;
                isValidPage = true && CONFIG.bannersInLyricsPage;
                return rootPath;
            case "lyrics":
                isBannerPage = false;
                isValidPage = true && CONFIG.bannersInLyricsPage;
                return rootPath;
        }

        switch (path) {
            case "/collection/tracks":
                isBannerPage = false;
                isValidPage = true;
                return "liked";
            case "/collection/local-files":
                isBannerPage = false;
                isValidPage = true;
                return "local";
        }

        isValidPage = false;
        isBannerPage = false;
        return false;
    }

    async function saveBannerPos() {
        await saveConfig("bannerPosition", CONFIG.bannerPosition);
    }

    function updateConfigPos() {
        if (currentPos == 50) {
            delete CONFIG.bannerPosition[uri];
        } else {
            CONFIG.bannerPosition[uri] = `${currentPos}`;
        }
    }

    async function fetchDynamicColor(dynamicImageUri) {
        try {
            let rawData = await Spicetify.CosmosAsync.get(
                encodeURI(`https://api-partner.spotify.com/pathfinder/v1/query?operationName=fetchExtractedColors&variables={"uris":["${dynamicImageUri}"]}&extensions={"persistedQuery":{"version":1,"sha256Hash":"d7696dd106f3c84a1f3ca37225a1de292e66a2d5aced37a66632585eeb3bbbfa"}}`)
            );

            let extractedColors = rawData.data.extractedColors[0];
            return { dark: extractedColors.colorDark.hex, light: extractedColors.colorLight.hex, raw: extractedColors.colorRaw.hex };
        } catch {}
    }

    function singleHexToPalette(mainColor) {
        let mixingColor = "#2A2A2A";
        let mixedMainColor = CONFIG.nordedDynamicColor ? chroma.mix(mainColor, mixingColor, 0.57, "rgb") : chroma(mainColor);

        palette = {
            Name: "Dynamic",
            notificationError: "#A9555E",
            shadow: "#1D2128",
            playbackBar: "#DEDEDE",
            selectedRow: "#DEDEDE",
            customSuccess: "#76BA99",
        };

        palette.main = palette.player = palette.card = mixedMainColor.hex();
        palette.customMainSoftSecondary = palette.notification = palette.tabActive = mixedMainColor.brighten(0.23).hex();
        palette.customMainSecondary = mixedMainColor.brighten(0.38).hex();
        palette.sidebar = chroma.mix(mainColor, "#1F1F1F", 0.6, "rgb").hex();
        palette.button = mixedMainColor.brighten(1.5).hex();
        palette.buttonActive = mixedMainColor.brighten(1.8).hex();
        palette.buttonDisabled = palette.misc = mixedMainColor.brighten(0.6).hex();
        palette.text = palette.subtext = mixedMainColor.brighten(2.3).hex();
        palette.customSubdued = mixedMainColor.brighten(1.6).hex();
        palette.customLinkHover = mixedMainColor.brighten(3).hex();
        palette.customSelectedButton = palette.customHighlight = mixedMainColor.brighten(1).hex();
    }

    async function createDynamicColors() {
        if (typeof chroma == "undefined") {
            setTimeout(createDynamicColors, 300);
            return;
        }

        try {
            let mainColors, colorMode;
            let rawImage = image.split("/");
            if (1 < rawImage.length) {
                formatedImage = `spotify:image:${rawImage.pop()}`;
            } else {
                formatedImage = rawImage.pop();
            }

            if (islocal) {
                colorMode = "average";
            } else {
                colorMode = CONFIG.dynamicColorMode;
            }

            switch (colorMode) {
                case "atmos":
                    mainColors = await fetchDynamicColor(formatedImage);
                    singleHexToPalette(mainColors.dark);
                    updateColors(palette);
                    break;
                case "average":
                    let tempImageElement = document.createElement("img");
                    tempImageElement.src = formatedImage;
                    tempImageElement.onload = () => {
                        let { R, G, B } = getAverageColor(tempImageElement, 4);
                        singleHexToPalette(`rgb(${R},${G},${B})`);
                        updateColors(palette);
                    };
                    break;
                case "DARK_VIBRANT":
                case "LIGHT_VIBRANT":
                    mainColors = await Spicetify.colorExtractor(uri);
                    singleHexToPalette(mainColors[CONFIG.dynamicColorMode]);
                    updateColors(palette);
                    break;
            }
        } catch (err) {
            console.error(err);
        }
    }

    function getAverageColor(imageElement, ratio) {
        let canvas = document.createElement("canvas");

        let height = (canvas.height = imageElement.naturalHeight);
        let width = (canvas.width = imageElement.naturalHeight);

        let context = canvas.getContext("2d");
        context.drawImage(imageElement, 0, 0, width, height);

        let data, length;
        let i = -4;
        let count = 0;

        try {
            data = context.getImageData(0, 0, width, height);
            length = data.data.length;
        } catch (err) {
            console.error(err);
            return {
                R: 0,
                G: 0,
                B: 0,
            };
        }
        let R, G, B;
        R = G = B = 0;

        while ((i += ratio * 4) < length) {
            ++count;

            R += data.data[i];
            G += data.data[i + 1];
            B += data.data[i + 2];
        }

        R = ~~(R / count);
        G = ~~(G / count);
        B = ~~(B / count);

        return {
            R,
            G,
            B,
        };
    }

    async function injectBanner(src, rawData = Spicetify.Player) {
        if (src != "song") {
            await hideOrShowBanner();
            await hideTopBarRules();
        }
        await updateURI(src, rawData);
        await updateBannerImage();
        if (userConfig.color_scheme == "Dynamic" && shouldChangeProp) {
            await createDynamicColors();
        }
    }

    ////////////////////////////////////// Main ///////////////////////////////////////////

    let path, isBannerPage, isValidPage, pageType, uri, uid, image, previousUri, islocal, filterCSS, banner, preBanner, currentPos, shouldChangeProp;
    let palette = {};

    (async function initMain() {
        if (!(Spicetify.Player.data && (userConfig.color_scheme == "Dynamic") == (window.chroma ? true : false))) {
            setTimeout(initMain, 1000);
            return;
        }
        await main();
    })();

    async function main() {
        path = Spicetify.Platform.History.location.pathname;
        pageType = pathToType();
        islocal = Spicetify.Player.data.track.metadata.is_local == "true";
        filterCSS = CONFIG.bannerBlurValue == 0 ? "unset" : `blur(${CONFIG.bannerBlurValue}px)`;

        let player = await waitForElement(".Root__now-playing-bar", 1000);
        let leftPlayerControls = await waitForElement(".main-nowPlayingBar-left", 1000);
        let isPlayerHover = false;
        let isLeftPlayerControls = false;
        let isTilde = false;
        let zoomOutKey = "`";

        let mainView = await waitForElement(".Root__main-view", 1000);
        let topBar = await waitForElement(".Root__top-bar", 1000);

        banner = document.createElement("div");
        mainView.appendChild(banner);
        banner.id = "main-banner";

        injectCSS(ComplexConditionedSnippets.bannerCSS, "nord--bannerCSS");

        CONFIG.fitBannerSize ? (banner.style.backgroundSize = "contain") : (banner.style.backgroundSize = "100%");

        currentPos = parseInt(getComputedStyle(banner).backgroundPositionY);

        preBanner = document.createElement("div");
        mainView.appendChild(preBanner);
        preBanner.id = "pre-banner";

        await injectBanner("start");

        Spicetify.Platform.History.listen(async (data) => {
            path = data.pathname;
            pageType = pathToType();
            await injectBanner("page");
            await saveBannerPos();
        });

        Spicetify.Player.addEventListener("songchange", async (event) => {
            banner.style.transition = enableTransition;
            islocal = event.data.track.metadata.is_local == "true";
            await saveBannerPos();
            await injectBanner("song", event);
        });

        leftPlayerControls.addEventListener("mouseover", () => {
            isLeftPlayerControls = true;
        });
        leftPlayerControls.addEventListener("mouseout", () => {
            isLeftPlayerControls = false;
            banner.style.transition = enableTransition;
        });

        player.addEventListener("mouseover", () => {
            isPlayerHover = true;
        });
        player.addEventListener("mouseout", () => {
            isPlayerHover = false;
            banner.style.transition = enableTransition;
        });

        player.addEventListener("contextmenu", () => {
            if (!isLeftPlayerControls) {
                banner.style.transition = enableTransition;
                banner.style.backgroundPositionY = "50%";
                currentPos = 50;
                updateConfigPos();
            }
        });

        player.addEventListener("wheel", (event) => {
            if (document.querySelector(".volume-bar:hover")) return;

            if (isPlayerHover && isValidPage) {
                banner.style.transition = disableTransition;
                let delta = Math.sign(event.deltaY);

                currentPos = parseInt(getComputedStyle(banner).backgroundPositionY);

                if (delta == 1 && currentPos < 100) {
                    currentPos = 95 < currentPos + 5 ? 100 : currentPos + 5;
                    banner.style.backgroundPositionY = currentPos + "%";
                    updateConfigPos();
                }

                if (delta == -1 && 0 < currentPos) {
                    currentPos = currentPos - 5 < 5 ? 0 : currentPos - 5;
                    banner.style.backgroundPositionY = currentPos + "%";
                    updateConfigPos();
                }
            }
        });

        window.addEventListener("keydown", (event) => {
            if (event.repeat) return;
            if (event.key == zoomOutKey && !CONFIG.fitBannerSize) {
                isTilde = true;
                banner.style.backgroundColor = "var(--spice-main)";
                banner.style.zIndex = "1";
                banner.style.backgroundSize = "50%";
                topBar.style.zIndex = 0;
            }
        });

        window.addEventListener("keyup", (event) => {
            if (event.repeat) return;
            if (event.key == zoomOutKey && !CONFIG.fitBannerSize) {
                isTilde = false;
                banner.style.backgroundSize = "100%";
                setTimeout(() => {
                    if (!isTilde) {
                        banner.style.zIndex = "-1";
                        banner.style.backgroundColor = "unset";
                        topBar.style.zIndex = 2;
                    }
                }, 500);
            }
        });
    }
}
