$PSMinVersion = 3

if ($PSVersionTable.PSVersion.Major -gt $PSMinVersion) {
  $ErrorActionPreference = "Stop"

    # get Spicetify path
    $spicePath = spicetify path userdata
    # Spicetify Themes path
    $themePath = "$spicePath\Themes"

    # removing Nord
    Write-Host "Removing Nord" -ForegroundColor DarkCyan
    Remove-Item -Recurse -Force "$themePath\Nord" -ErrorAction Ignore

    # spicetify default theme
    spicetify config current_theme " " color_scheme " " -q

    Write-Host "Backing up Spotify" -ForegroundColor DarkCyan
    spicetify backup -q

    Write-Host "Applying Config" -ForegroundColor DarkCyan
    spicetify apply -q

    Write-Host "Nord Uninstalled Successfully" -ForegroundColor Green
}
else {
    Write-Host "`nYour Powershell version is less than "; Write-Emphasized "$PSMinVersion";
    Write-Host "`nPlease, update your Powershell downloading the "; Write-Emphasized "'Windows Management Framework'"; Write-Host " greater than "; Write-Emphasized "$PSMinVersion"
}
