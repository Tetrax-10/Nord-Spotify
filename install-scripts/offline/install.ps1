param (
  [string] $version
)

$PSMinVersion = 3

if ($v) {
    $version = $v
}

function Write-Emphasized ([string] $Text) {
    Write-Host $Text -ForegroundColor "Cyan"
}

if ($PSVersionTable.PSVersion.Major -gt $PSMinVersion) {
    $ErrorActionPreference = "Stop"

    # Enable TLS 1.2 since it is required for connections to GitHub.
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

    # Silent Invoke-WebRequest
    $ProgressPreference = 'SilentlyContinue'

    # Check if Spicetify exists
    $checkSpice = Get-Command spicetify -ErrorAction Silent
    if ($null -eq $checkSpice) {
        Write-Host "Spicetify not found" -ForegroundColor Red
        Write-Host "Installing Spicetify" -ForegroundColor Green
        Invoke-WebRequest -UseBasicParsing "https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.ps1" | Invoke-Expression
    }

    # get Spicetify path
    $spicePath = spicetify -c | Split-Path
    # get xpui path
    $xpuiPath = $ENV:UserProfile + "\AppData\Roaming\Spotify\Apps\xpui"
    # Spicetify Themes path
    $themeDir = "$spicePath\Themes"
    # Spicetify Extensions path
    $extensionsDir = "$spicePath\Extensions"

    # remove old folders
    Write-Host "Removing old version if any" -ForegroundColor Green
    Remove-Item -Recurse -Force "$themeDir\Nord-Spotify" -ErrorAction Ignore
    Remove-Item -Recurse -Force "$xpuiPath\src" -ErrorAction Ignore

    # create folders
    Write-Host "Installing Nord Spotify (offline)" -ForegroundColor Green
    New-Item -Path "$xpuiPath\src\Colors" -ItemType Directory | Out-Null
    New-Item -Path "$xpuiPath\src\Snippets" -ItemType Directory | Out-Null
    New-Item -Path "$themeDir\Nord-Spotify" -ItemType Directory | Out-Null

    # Clone to xpui folder
    Write-Host "Fetching Theme from GitHub" -ForegroundColor Green
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/Colors/NordColor.css" -UseBasicParsing -OutFile "$xpuiPath\src\Colors\NordColor.css"
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/Colors/NightlyColor.css" -UseBasicParsing -OutFile "$xpuiPath\src\Colors\NightlyColor.css"
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/Snippets/NewUI.css" -UseBasicParsing -OutFile "$xpuiPath\src\Snippets\NewUI.css"
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/Snippets/OldUI.css" -UseBasicParsing -OutFile "$xpuiPath\src\Snippets\OldUI.css"
    # Clone to spicetify folder
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/Nord-Spotify/color.ini" -UseBasicParsing -OutFile "$themeDir\Nord-Spotify\color.ini"
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/nord.css" -UseBasicParsing -OutFile "$themeDir\Nord-Spotify\user.css"
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/nord.js" -UseBasicParsing -OutFile "$extensionsDir\nord.js"

    # Installing
    Write-Host "Changing Config" -ForegroundColor Green
    spicetify config current_theme Nord-Spotify color_scheme NordColor extensions nord.js inject_css 1 replace_colors 1 overwrite_assets 1 -q

    # applying
    $configFile = Get-Content "$spicePath\config-xpui.ini"
    $backupVer = $configFile -match "^version"
    if ($backupVer.Length -gt 0) {
        Write-Host "Applying Theme" -ForegroundColor Green
        spicetify apply -q
    } else {
        Write-Host "Making Backup and Applying Theme" -ForegroundColor Green
        spicetify backup apply -q
    }

    Write-Host "Theme Applied Successfully. Ignore any Error Message" -ForegroundColor Green
}
else {
    Write-Host "`nYour Powershell version is less than "; Write-Emphasized "$PSMinVersion";
    Write-Host "`nPlease, update your Powershell downloading the "; Write-Emphasized "'Windows Management Framework'"; Write-Host " greater than "; Write-Emphasized "$PSMinVersion"
}