// @ts-chec

// NAME: Nord Spotify Injector
// AUTHOR: Tetrax-10
// DESCRIPTION: Nord Spotify Extension Injector

/// <reference path="../dev/globals.d.ts" />

(function injectNord() {
    if (!Spicetify.Config) {
        setTimeout(injectNord, 50);
        return;
    }

    let body = document.querySelector("body");

    let isMarketplace = Spicetify.Config.current_theme == "Nord Spotify" ? true : false;

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

    function injectJS(src, id) {
        if (!body.classList.contains(id)) {
            let script = document.createElement("script");
            script.id = id;
            script.type = "text/javascript";
            script.src = src;
            body.appendChild(script);
            body.classList.add(id);
        }
    }

    let server = "https://tetrax-10.github.io/Nord-Spotify";

    injectStyleSheet(`${server}/src/nord.css`, "nord--nordSpotify");

    injectJS(`${server}/src/nord.js`, "nord--js");

    window.NordSpotifyRemote = true;
})();
