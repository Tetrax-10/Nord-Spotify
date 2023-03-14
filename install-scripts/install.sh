#!/bin/sh

set -e

# Download URL
theme_url="https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master"

# Setup directories to download to
spice_dir="$(dirname "$(spicetify -c)")"
theme_dir="${spice_dir}/Themes"
ext_dir="${spice_dir}/Extensions"

# Make directories if needed
mkdir -p "${theme_dir}/Nord-Spotify"
mkdir -p "${ext_dir}"

# Download latest tagged files into correct directories
echo "Downloading Nord-Spotify..."
curl --silent --output "${theme_dir}/Nord-Spotify/color.ini" "${theme_url}/Nord-Spotify/color.ini"
curl --silent --output "${theme_dir}/Nord-Spotify/user.css" "${theme_url}/Nord-Spotify/user.css"
curl --silent --output "${ext_dir}/injectNord.js" "${theme_url}/src/injectNord.js"

# Apply theme
echo "Applying theme..."
spicetify config extensions nord.js-
spicetify config current_theme Nord-Spotify color_scheme Spotify extensions injectNord.js inject_css 1 replace_colors 1 overwrite_assets 1
spicetify apply

echo "All done!"
