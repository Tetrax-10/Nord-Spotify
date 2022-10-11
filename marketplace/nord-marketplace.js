// @ts-chec

// NAME: Nord Spotify Injector
// AUTHOR: Tetrax-10
// DESCRIPTION: Nord Spotify Extension Injector

/// <reference path="../dev/globals.d.ts" />

(function injectNord() {
    let body = document.querySelector("body");

    function injectJS(src, id) {
        if (!body.classList.contains(id)) {
            let script = document.createElement("script");
            script.src = src;
            body.appendChild(script);
            body.classList.add(id);
        }
    }

    injectJS("https://tetrax-10.github.io/Nord-Spotify/src/nord.js", "nord--js");
})();
