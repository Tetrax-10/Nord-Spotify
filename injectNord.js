// @ts-chec

// NAME: Nord Spotify Injector
// AUTHOR: Tetrax-10
// DESCRIPTION: Nord Spotify Extension Injector

/// <reference path="./dev/globals.d.ts" />

(function injectNord() {
    let body = document.querySelector("body");

    function injectJS(src, id) {
        if (!body.classList.contains(id)) {
            let script = document.createElement("script");
            script.id = id;
            script.src = src;
            body.appendChild(script);
            body.classList.add(id);
        }
    }

    let server = "https://tetrax-10.github.io/Nord-Spotify";

    injectJS(`${server}/src/nord.js`, "nord--js");
})();
