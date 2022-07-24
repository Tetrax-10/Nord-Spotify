# Nord-Spotify

A better Nord Theme with no Ads

<br />

![Screenshot](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/screenshot_1.png)

![Screenshot 2](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/screenshot_2.png)

## Disable Homepage Recommendation

![disable recommendation](https://raw.githubusercontent.com/Tetrax-10/Spicetify-Themes/master/assets/disable-recommendation.gif)

### To disable homepage recommendation paste this code at the end of the CSS file

```css
section[data-testid="home-page"] .main-shelf-shelf:not([aria-label="Recently played"], [aria-label="Your playlists"]) {
    display: none !important;
}
```

<br />

## Install Theme

Create a Folder named `Nord-Spotify` inside your Themes Folder then paste `user.css` and `color.ini`

### Themes Folder Location

| **Platform** | **Path**                                                                     |
| ------------ | ---------------------------------------------------------------------------- |
| **Linux**    | `~/.config/spicetify/Themes` or `$XDG_CONFIG_HOME/.config/spicetify/Themes/` |
| **MacOS**    | `~/spicetify_data/Themes` or `$SPICETIFY_CONFIG/Themes`                      |
| **Windows**  | `%userprofile%\.spicetify\Themes\`                                           |

Now run the following command to install the theme:

```
spicetify config current_theme Nord-Spotify color_scheme base
spicetify apply
```

<br />

## Get it on Spicetify Marketplace

Step 1 : Follow [Spicetify Marketplace](https://github.com/spicetify/spicetify-marketplace) readme and install it.

Step 2 : Open Spotify App -> Marketplace -> Themes

Step 3 : Search `Nord Spotify` Click Install Buttton. Done!

<br />

## Credits

[Sleek](https://github.com/spicetify/spicetify-themes/tree/master/Sleek) theme by [harbassan](https://github.com/harbassan)

[SpotifyNoPremium](https://github.com/Daksh777/SpotifyNoPremium) theme by [Daksh777](https://github.com/Daksh777)

## Support

🌟 Like it? Gimme Some Love ! 💕

[![Github Stars badge](https://img.shields.io/github/stars/Tetrax-10/Spicetify-Themes?logo=github&style=social)](https://github.com/Tetrax-10/Spicetify-Themes)
