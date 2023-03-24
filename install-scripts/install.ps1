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
        Write-Host "Installing Spicetify" -ForegroundColor DarkCyan
        Invoke-WebRequest -UseBasicParsing "https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.ps1" | Invoke-Expression
    }

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
    # Nord Spotify Snippets path
    $snippetsPath = "$themePath\Nord-Spotify\assets\Nord-Spotify\src\Snippets"

    $title    = 'Nord Spotify comes with two modes:'
    $question = "Theme requires internet access. Updates the Theme automatically when there is a new update available`nOffline - Works without internet and thus gives better performance. Re-running this powershell script installs the latest update"
    $choices  = '&Auto Update', '&Offline'

    # remove old folders
    Write-Host "Removing old version if any" -ForegroundColor DarkCyan
    Remove-Item -Recurse -Force "$themePath\Nord-Spotify" -ErrorAction Ignore
    Remove-Item -Recurse -Force "$xpuiPath\Nord-Spotify" -ErrorAction Ignore
    Remove-Item -Force "$extensionsPath\injectNord.js" -ErrorAction Ignore
    Remove-Item -Force "$extensionsPath\nord.js" -ErrorAction Ignore

    $decision = $Host.UI.PromptForChoice($title, $question, $choices, 0)
    if ($decision -eq 0) {
        # create folders
        Write-Host "Installing Nord Spotify (Auto Update Version)" -ForegroundColor DarkCyan
        New-Item -Path "$themePath\Nord-Spotify" -ItemType Directory | Out-Null
        
        # Clone to themes folder
        Write-Host "Fetching Theme from GitHub" -ForegroundColor DarkCyan
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/Nord-Spotify/color.ini" -UseBasicParsing -OutFile "$themePath\Nord-Spotify\color.ini"
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/Nord-Spotify/user.css" -UseBasicParsing -OutFile "$themePath\Nord-Spotify\user.css"
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/injectNord.js" -UseBasicParsing -OutFile "$extensionsPath\injectNord.js"

        # Installing
        Write-Host "Changing Config" -ForegroundColor DarkCyan
        spicetify config extensions nord.js- -q
        spicetify config current_theme Nord-Spotify color_scheme Spotify extensions injectNord.js inject_css 1 replace_colors 1 overwrite_assets 1 -q  
    } else {
        # create folders
        Write-Host "Installing Nord Spotify (Offline Version)" -ForegroundColor DarkCyan
        New-Item -Path $snippetsPath -ItemType Directory | Out-Null

        Write-Host "Fetching Theme from GitHub" -ForegroundColor DarkCyan
        # Clone to assets folder
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/Snippets/NewUI.css" -UseBasicParsing -OutFile "$snippetsPath\NewUI.css"
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/Snippets/OldUI.css" -UseBasicParsing -OutFile "$snippetsPath\OldUI.css"
        # Clone to themes folder
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/Nord-Spotify/color.ini" -UseBasicParsing -OutFile "$themePath\Nord-Spotify\color.ini"
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/nord.css" -UseBasicParsing -OutFile "$themePath\Nord-Spotify\user.css"
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/src/nord.js" -UseBasicParsing -OutFile "$extensionsPath\nord.js"

        # Installing
        Write-Host "Changing Config" -ForegroundColor DarkCyan
        spicetify config extensions injectNord.js- -q
        spicetify config current_theme Nord-Spotify color_scheme Spotify extensions nord.js inject_css 1 replace_colors 1 overwrite_assets 1 -q
    }

    # applying
    $configFile = Get-Content "$spicePath\config-xpui.ini"
    $backupVer = $configFile -match "^version"
    if ($backupVer.Length -gt 0) {
        Write-Host "Applying Theme" -ForegroundColor DarkCyan
        spicetify apply
    } else {
        Write-Host "Making Backup and Applying Theme" -ForegroundColor DarkCyan
        spicetify backup apply
    }

    Write-Host 'Theme Applied Successfully. Run "spicetify apply" if theme not applied' -ForegroundColor Green
}
else {
    Write-Host "`nYour Powershell version is less than "; Write-Emphasized "$PSMinVersion";
    Write-Host "`nPlease, update your Powershell downloading the "; Write-Emphasized "'Windows Management Framework'"; Write-Host " greater than "; Write-Emphasized "$PSMinVersion"
}