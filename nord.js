// @ts-chec

// NAME: Nord Spotify
// AUTHOR: Tetrax-10
// DESCRIPTION: Nord Spotify Extension

/// <reference path="../globals.d.ts" />

(async function nord() {
    if (!(Spicetify.Platform && Spicetify.LocalStorage && Spicetify.Config)) {
        setTimeout(nord, 300);
        return;
    }
    if (Spicetify.Config.current_theme == "Nord-Spotify") {
        initNord();
    }
})();

function initNord() {
    let body = document.querySelector("body");

    function injectCSS(cssStyle, check) {
        if (!body.classList.contains(check)) {
            let styleElement = document.createElement("style");
            styleElement.innerHTML = cssStyle;
            styleElement.id = check;
            body.appendChild(styleElement);
            body.classList.add(check);
        }
    }

    function removeInjectedCSS(id) {
        let styleElement = document.getElementById(id);
        if (body.classList.contains(id) && styleElement) {
            styleElement.remove();
            body.classList.remove(id);
        }
    }

    let nord__hide_artist_top_bar = `.main-topBar-background { background-color: unset !important; } .main-topBar-overlay { background-color: unset !important; } .main-entityHeader-topbarTitle { background-color: var(--spice-main); padding: 10px; width: 100%; padding-top: 15px; padding-left: 32px; border-top-left-radius: 10px; border-top-right-radius: 10px; position: absolute; left: 0px; transition: all 0s ease; }`;
    // let nord__show_top_bar = `.main-topBar-background { background-color: var(--spice-main) !important; } .main-topBar-overlay { background-color: var(--spice-main) !important; }`;

    function countNoOfSlashes(string) {
        let count = 0;
        string.split("").forEach((char) => {
            if (char == "/") {
                count++;
            }
        });
        return count;
    }

    Spicetify.Platform.History.listen((data) => {
        if ((data.pathname.includes("/artist/") || data.pathname.includes("/playlist/")) && countNoOfSlashes(data.pathname) == 2) {
            // removeInjectedCSS("nord--show-top-bar");
            injectCSS(nord__hide_artist_top_bar, "nord--hide-artist-top-bar");
        } else {
            removeInjectedCSS("nord--hide-artist-top-bar");
            // injectCSS(nord__show_top_bar, "nord--show-top-bar");
        }
    });
}
