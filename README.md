# Nord-Spotify

Nord Themed Spotify with no UI Ads

<br />

![home](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/home.png)

![artist 2](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/artist-2.png)

## Snippets Support - Deeply Customize

![snippets](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/snippets.png)

![artist](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/artist.png)

![search 2](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/search-2.png)

![search](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/search.png)

![search](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/genre.png)

![playlist](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/playlist.png)

## Customized Spotify and 3rd parties Integration

![Screenshot 2](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/spotify-lyrics.png)

![Screenshot 2](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/lyrics-plus.png)

## Nightly

![search 2](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/nightly.png)

<br />

## Install Theme

## Get it on Spicetify Marketplace

Step 1 : Follow [Spicetify Marketplace](https://github.com/spicetify/spicetify-marketplace) readme and install it.

Step 2 : Open Spotify App -> Marketplace -> Themes

Step 3 : Search `Nord Spotify` Click Install Buttton. Done!

<br />

## Install Manually - Auto Update Method (No Offline Support)

### Windows Powershell

```ps
iwr -useb https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/install-scripts/install.ps1 | iex
```

### Mac/Linux

```ps
curl -fsSL https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/install-scripts/install.sh | sh
```

(Or)

Copy `Nord-Spotify` Folder to your Themes folder

Copy `injectNord.js` to your Extentions Folder

Then run the following command to apply the theme:

```
spicetify config current_theme Nord-Spotify color_scheme Nord extensions injectNord.js
spicetify apply
```

## Uninstall Manually - Auto Update Method

### Windows Powershell

```ps
iwr -useb https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/install-scripts/uninstall.ps1 | iex
```

### Mac/Linux

```ps
curl -fsSL https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/install-scripts/uninstall.sh | sh
```

(Or)

```
spicetify config current_theme marketplace color_scheme Marketplace extensions injectNord.js-
spicetify apply
```

## Install Manually - Offline Support (No Auto Update)

Copy `Nord-Spotify` Folder to your Themes folder, But replace the `user.css` with [nord.css](https://github.com/Tetrax-10/Nord-Spotify/blob/master/src/nord.css) and rename it to `user.css`

Copy [nord.js](https://github.com/Tetrax-10/Nord-Spotify/blob/master/src/nord.js) to your Extentions Folder

Then run the following command to apply the theme:

```
spicetify config current_theme Nord-Spotify color_scheme Nord extensions nord.js
spicetify apply
```

If you wanna remove the theme run these commands:

```
spicetify config current_theme marketplace color_scheme Marketplace extensions nord.js-
spicetify apply
```

### Themes Folder Location

| **Platform** | **Path**                                                                     |
| ------------ | ---------------------------------------------------------------------------- |
| **Linux**    | `~/.config/spicetify/Themes` or `$XDG_CONFIG_HOME/.config/spicetify/Themes/` |
| **MacOS**    | `~/spicetify_data/Themes` or `$SPICETIFY_CONFIG/Themes`                      |
| **Windows**  | `%userprofile%\.spicetify\Themes\`                                           |

### Extension Folder Location

| **Platform** | **Path**                                                                             |
| ------------ | ------------------------------------------------------------------------------------ |
| **Linux**    | `~/.config/spicetify/Extensions` or `$XDG_CONFIG_HOME/.config/spicetify/Extensions/` |
| **MacOS**    | `~/spicetify_data/Extensions` or `$SPICETIFY_CONFIG/Extensions`                      |
| **Windows**  | `%appdata%\spicetify\Extensions`                                                     |

<br />

## To Change and Customize Theme Colors

## Marketplace Method

In Marketplace near the settings icon there will a drop down on top right corner, you can change color schemes there

To Customize Colors enable theme developer tools in marketplace settings

## Manual Method

### To Change Theme's Color Scheme run these commands in Powershell/Terminal

### Nord

```
spicetify config color_scheme Nord
spicetify apply
```

### Nightly

```
spicetify config color_scheme Nightly
spicetify apply
```

To Customize Colors edit `color.ini` located inside `Nord-Spotify` Folder

<br />

## Support

Like This Theme? Gimme Some ❤️ by Liking this Repository

[![Github Stars badge](https://img.shields.io/github/stars/Tetrax-10/Spicetify-Themes?logo=github&style=social)](https://github.com/Tetrax-10/Spicetify-Themes)
