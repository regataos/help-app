// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

// Check the theme that should be used
setInterval(checkTheme, 1000);
function checkTheme() {
    function applyDarkTheme() {
        document.querySelector("body").style.backgroundColor = "#171a21";
        document.getElementById("loadscreen").style.backgroundColor = "#171a21";
    }

    function applyLightTheme() {
        document.querySelector("body").style.backgroundColor = "";
        document.getElementById("loadscreen").style.backgroundColor = "";
    }

    const fs = require('fs');
    if (fs.existsSync("/tmp/regataos-configs/config/kdeglobals")) {
        const checkColorScheme = fs.readFileSync("/tmp/regataos-configs/config/kdeglobals", "utf8");
        const configOption = "ColorScheme=";
        const colorConfig = checkConfigFile(checkColorScheme, configOption).toLowerCase();
        if (colorConfig.includes("dark")) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    } else {
        applyLightTheme();
    }
}
checkTheme();
