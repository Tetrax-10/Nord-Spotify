#!/bin/sh

set -e

# Setup directories to download to
spicePath="$(spicetify path userdata)"
themePath="${spicePath}/Themes"

# Make directories if needed
mkdir -p "${themePath}/Nord"

cat <<EOF

Nord comes with two modes:
1: Auto Update mode - Theme requires internet access so it auto updates when ever there is a new update available
2: Offline mode - Works without internet and thus gives better performance. To update the theme just run this script and choose Offline mode

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
    echo "Installing Nord (Auto Update mode)"

    echo "Fetching Theme from GitHub\n"
    curl --silent --output "${themePath}/Nord/color.ini" "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/theme/color.ini"
    curl --silent --output "${themePath}/Nord/user.css" "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/Nord/user.css"
    curl --silent --output "${themePath}/Nord/theme.js" "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/Nord/theme.js"
else
    echo "Installing Nord (Offline mode)"

    echo "Fetching Theme from GitHub\n"
    curl --silent --output "${themePath}/Nord/color.ini" "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/dist/Nord/color.ini"
    curl --silent --output "${themePath}/Nord/user.css" "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/dist/Nord/user.css"
    curl --silent --output "${themePath}/Nord/theme.js" "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/dist/Nord/theme.js"
fi

echo "Changing Config"
spicetify config current_theme Nord color_scheme Spotify -q

echo "Backing up Spotify"
spicetify backup -q

echo "Applying Theme"
spicetify apply -q

echo "\nNord installed successfully"
