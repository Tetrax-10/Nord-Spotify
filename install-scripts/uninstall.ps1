$PSMinVersion = 3

if ($PSVersionTable.PSVersion.Major -gt $PSMinVersion) {
  $ErrorActionPreference = "Stop"

    # get Spicetify path
    $spicePath = spicetify -c | Split-Path
    # get spotify path
    $spotifyPath = spicetify config spotify_path
    # get xpui path
    $xpuiPath = -join("$spotifyPath", "Apps\xpui")
    # Spicetify Themes path
    $themePath = "$spicePath\Themes"
    # Spicetify Extensions path
    $extensionsPath = "$spicePath\Extensions"

    # removing Nord Spotify
    Write-Host "Removing Nord Spotify" -ForegroundColor DarkCyan
    Remove-Item -Recurse -Force "$themePath\Nord-Spotify" -ErrorAction Ignore
    Remove-Item -Recurse -Force "$xpuiPath\Nord-Spotify" -ErrorAction Ignore
    Remove-Item -Force "$extensionsPath\injectNord.js" -ErrorAction Ignore
    Remove-Item -Force "$extensionsPath\nord.js" -ErrorAction Ignore

    # spicetify default theme
    spicetify config extensions nord.js- -q
    spicetify config current_theme " " color_scheme " " extensions injectNord.js- -q

    Write-Host "Backing up Spotify" -ForegroundColor DarkCyan
    spicetify backup -q

    spicetify apply -q

    Write-Host "Nord Spotify Uninstalled Successfully" -ForegroundColor Green
}
else {
    Write-Host "`nYour Powershell version is less than "; Write-Emphasized "$PSMinVersion";
    Write-Host "`nPlease, update your Powershell downloading the "; Write-Emphasized "'Windows Management Framework'"; Write-Host " greater than "; Write-Emphasized "$PSMinVersion"
}
