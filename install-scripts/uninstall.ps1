param (
  [string] $version
)

$PSMinVersion = 3

if ($v) {
  $version = $v
}

if ($PSVersionTable.PSVersion.Major -gt $PSMinVersion) {
  $ErrorActionPreference = "Stop"

    # Check if Spicetify Themes folder already exists
    $spicePath = spicetify -c | Split-Path
    $sp_dot_dir = "$spicePath\Themes"

    # remove Nord-Spotify folder
    Remove-Item -Recurse -Force "$sp_dot_dir\Nord-Spotify" -ErrorAction Ignore

    # remove Nord-Spotify external js
    Remove-Item -Force "$spicePath\Extensions\injectNord.js" -ErrorAction Ignore

    # spicetify default theme
    spicetify config current_theme " " color_scheme " " extensions injectNord.js- -q

    # spicetify apply
    $configFile = Get-Content "$spicePath\config-xpui.ini"
    $backupVer = $configFile -match "^version"
    if ($backupVer.Length -gt 0) {
        spicetify apply -q
    } else {
        spicetify backup apply -q
    }

    Write-Host "Uninstalled Successfully. Ignore any Error Message" -ForegroundColor Green
}
else {
    Write-Host "`nYour Powershell version is less than "; Write-Emphasized "$PSMinVersion";
    Write-Host "`nPlease, update your Powershell downloading the "; Write-Emphasized "'Windows Management Framework'"; Write-Host " greater than "; Write-Emphasized "$PSMinVersion"
}
