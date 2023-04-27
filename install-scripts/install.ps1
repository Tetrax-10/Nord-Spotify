$PSMinVersion = 3

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
    $spicePath = spicetify path userdata
    # Spicetify Themes path
    $themePath = "$spicePath\Themes"

    $title    = 'Nord comes with two modes:'
    $question = "Auto Update mode - Theme requires internet access so it auto updates when ever there is a new update available`nOffline mode - Works without internet and thus gives better performance. To update the theme just run this script and choose Offline mode"
    $choices  = '&1. Auto Update', '&2. Offline'

    # remove old folders
    Write-Host "Removing old version if any" -ForegroundColor DarkCyan
    Remove-Item -Recurse -Force "$themePath\Nord" -ErrorAction Ignore

    $decision = $Host.UI.PromptForChoice($title, $question, $choices, 0)
    if ($decision -eq 0) {
        # Auto Update mode
        # create folders
        Write-Host "Installing Nord (Auto Update mode)" -ForegroundColor DarkCyan
        New-Item -Path "$themePath\Nord" -ItemType Directory | Out-Null
        
        # Clone to themes folder
        Write-Host "Fetching Theme from GitHub" -ForegroundColor DarkCyan
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/theme/color.ini" -UseBasicParsing -OutFile "$themePath\Nord\color.ini"
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/Nord/user.css" -UseBasicParsing -OutFile "$themePath\Nord\user.css"
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/master/Nord/theme.js" -UseBasicParsing -OutFile "$themePath\Nord\theme.js"
    } else {
        # Offline mode
        # create folders
        Write-Host "Installing Nord (Offline mode)" -ForegroundColor DarkCyan
        New-Item -Path "$themePath\Nord" -ItemType Directory | Out-Null
        
        # Clone to themes folder
        Write-Host "Fetching Theme from GitHub" -ForegroundColor DarkCyan
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/dist/Nord/color.ini" -UseBasicParsing -OutFile "$themePath\Nord\color.ini"
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/dist/Nord/user.css" -UseBasicParsing -OutFile "$themePath\Nord\user.css"
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Tetrax-10/Nord-Spotify/dist/Nord/theme.js" -UseBasicParsing -OutFile "$themePath\Nord\theme.js"
    }

    # Installing
    Write-Host "Changing Config" -ForegroundColor DarkCyan
    spicetify config current_theme Nord color_scheme Spotify -q
    
    Write-Host "Backing up Spotify" -ForegroundColor DarkCyan
    spicetify backup -q

    Write-Host "Applying Theme" -ForegroundColor DarkCyan
    spicetify apply -q

    Write-Host 'Nord installed successfully' -ForegroundColor Green
}
else {
    Write-Host "`nYour Powershell version is less than "; Write-Emphasized "$PSMinVersion";
    Write-Host "`nPlease, update your Powershell downloading the "; Write-Emphasized "'Windows Management Framework'"; Write-Host " greater than "; Write-Emphasized "$PSMinVersion"
}