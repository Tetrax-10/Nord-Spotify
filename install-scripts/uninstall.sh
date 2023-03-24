#!/bin/sh

set -e

spice_dir="$(dirname "$(spicetify -c)")"
theme_dir="${spice_dir}/Themes"
ext_dir="${spice_dir}/Extensions"

rm -rf "${theme_dir}/Nord-Spotify"
# Use -f to ignore if missing
rm -f "${ext_dir}/injectNord.js"
rm -f "${ext_dir}/nord.js"

echo "Removing Nord Spotify"
spicetify config extensions nord.js- -q
spicetify config current_theme " " color_scheme " " extensions injectNord.js- -q

echo "Backing up Spotify"
spicetify backup -q

spicetify apply -q

echo "Nord Spotify Uninstalled Successfully"
