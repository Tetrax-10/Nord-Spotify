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
    spicetify config current_theme " " color_scheme " " extensions injectNord.js-

    # spicetify apply
    $configFile = Get-Content "$spicePath\config-xpui.ini"
    $backupVer = $configFile -match "^version"
    if ($backupVer.Length -gt 0) {
        spicetify apply
    } else {
        spicetify backup apply
    }
}
else {
    Write-Part "`nYour Powershell version is less than "; Write-Emphasized "$PSMinVersion";
    Write-Part "`nPlease, update your Powershell downloading the "; Write-Emphasized "'Windows Management Framework'"; Write-Part " greater than "; Write-Emphasized "$PSMinVersion"
}
