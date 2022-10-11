#!/bin/sh

set -e

echo "Uninstalling"
spicetify config current_theme " " color_scheme " " extensions injectNord.js-

echo "Deleting files"
while true; do
    read -p "Do you wish to delete theme files? [y/n] " yn </dev/tty
    case $yn in
    [Yy]*)
        spice_dir="$(dirname "$(spicetify -c)")"
        theme_dir="${spice_dir}/Themes"
        ext_dir="${spice_dir}/Extensions"

        rm -rf "${theme_dir}/Nord-Spotify"
        # Use -f to ignore if missing
        rm -f "${ext_dir}/injectNord.js"
        break
        ;;
    [Nn]*)
        echo "Skipping deletion."
        break
        ;;
    *) echo "Please answer yes or no." ;;
    esac
done

spicetify apply
