#!/bin/sh

set -e

spicePath="$(spicetify path userdata)"
themePath="${spicePath}/Themes"

rm -rf "${themePath}/Nord"

echo "Removing Nord"
spicetify config current_theme " " color_scheme " " -q

echo "Backing up Spotify"
spicetify backup -q

echo "Applying Config"
spicetify apply -q

echo "Nord Uninstalled Successfully"
