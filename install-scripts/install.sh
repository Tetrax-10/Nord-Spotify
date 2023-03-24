#!/bin/sh

set -e

# Download URL
theme_url="https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master"

# Setup directories to download to
spice_dir="$(dirname "$(spicetify -c)")"
theme_dir="${spice_dir}/Themes"
nord_dir="${theme_dir}/Nord-Spotify"
snippet_dir="${nord_dir}/assets/Nord-Spotify/src/Snippets"
ext_dir="${spice_dir}/Extensions"

# Make directories if needed
mkdir -p "${nord_dir}"
mkdir -p "${ext_dir}"

cat <<EOF

Nord Spotify comes with two modes:
1: Auto Update - Theme requires internet access. Updates the Theme automatically when there is a new update available
2: Offline     - Works without internet and thus gives better performance. Re-running this shell script installs the latest update

EOF

CHOICE="0"
while [ $CHOICE != "1" ] && [ $CHOICE != "2" ]
do
    printf "Please choose a version: "
    read -r CHOICE </dev/tty
done

# For visual indentation
echo ""

# Install online or offline version depending on users choice
if [ "$CHOICE" = "1" ]
then
    echo "Installing Nord Spotify (Auto Update Version)"

    echo "Fetching Theme from GitHub\n"
    curl --silent --output "${nord_dir}/color.ini" "${theme_url}/Nord-Spotify/color.ini"
    curl --silent --output "${nord_dir}/user.css" "${theme_url}/Nord-Spotify/user.css"
    curl --silent --output "${ext_dir}/injectNord.js" "${theme_url}/src/injectNord.js"

    echo "Changing configuration"
    spicetify config extensions nord.js- -q
    spicetify config current_theme Nord-Spotify color_scheme Spotify extensions injectNord.js inject_css 1 replace_colors 1 overwrite_assets 1 -q
else
    echo "Installing Nord Spotify (Offline Version)"
    mkdir -p "${snippet_dir}"

    echo "Fetching Theme from GitHub\n"
    curl --silent --output "${snippet_dir}/NewUI.css" "${theme_url}/src/Snippets/NewUI.css"
    curl --silent --output "${snippet_dir}/OldUI.css" "${theme_url}/src/Snippets/OldUI.css"

    curl --silent --output "${nord_dir}/color.ini" "${theme_url}/Nord-Spotify/color.ini"
    curl --silent --output "${nord_dir}/user.css" "${theme_url}/src/nord.css"
    curl --silent --output "${ext_dir}/nord.js" "${theme_url}/src/nord.js"

    echo "Changing configuration"
    spicetify config extensions injectNord.js- -q
    spicetify config current_theme Nord-Spotify color_scheme Spotify extensions nord.js inject_css 1 replace_colors 1 overwrite_assets 1 -q
fi

# Bacup spotify if no backup version found
backup_version=$(grep version  "${spice_dir}/config-xpui.ini" 2>/dev/null | sed 's/version = //g')
if [ "$backup_version" = "" ]
then
    echo "Making backup and applying Theme"
    spicetify backup apply
else
    echo "Applying Theme"
    spicetify apply
fi

echo "\nNord Spotify installed successfully"
