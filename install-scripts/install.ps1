param (
    [string] $version
)

$PSMinVersion = 3

if ($v) {
    $version = $v
}

if ($PSVersionTable.PSVersion.Major -gt $PSMinVersion) {
    $ErrorActionPreference = "Stop"

    # Enable TLS 1.2 since it is required for connections to GitHub.
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

    # Check if Spicetify exists
    $checkSpice = Get-Command spicetify -ErrorAction Silent
    if ($null -eq $checkSpice) {
        Write-Host -ForegroundColor Red "Spicetify not found, So Installing Spicetify"
        iwr -useb https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.ps1 | iex
        Write-Done
    }

    # Check if Spicetify Themes folder already exists
    $spicePath = spicetify -c | Split-Path
    $sp_dot_dir = "$spicePath\Themes"
    Remove-Item -Recurse -Force "$sp_dot_dir\Nord-Spotify" -ErrorAction Ignore
    New-Item -Path "$sp_dot_dir\Nord-Spotify" -ItemType Directory | Out-Null

    # Clone to spicetify folder
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/Nord-Spotify/color.ini" -UseBasicParsing -OutFile "$sp_dot_dir\Nord-Spotify\color.ini"
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/Nord-Spotify/user.css" -UseBasicParsing -OutFile "$sp_dot_dir\Nord-Spotify\user.css"
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/injectNord.js" -UseBasicParsing -OutFile "$spicePath\Extensions\injectNord.js"

    # Installing
    spicetify config current_theme Nord-Spotify color_scheme Nord extensions injectNord.js inject_css 1 replace_colors 1 overwrite_assets 1

    # applying
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
