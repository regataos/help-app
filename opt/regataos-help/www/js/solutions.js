// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

// Check internet connection
setInterval(checkOnline, 500);
function checkOnline() {
    const online = document.querySelectorAll(".online");
    const onlineImg = document.querySelectorAll(".online-img");
    const offline = document.querySelectorAll(".offline");
    const offlineImg = document.querySelectorAll(".offline-img");
    const transparentButton = document.querySelector(".button-transparent");

    if (navigator.onLine) {
        for (let i = 0; i < online.length; i++) {
            online[i].style.display = "inline-block";
        }

        for (let i = 0; i < onlineImg.length; i++) {
            onlineImg[i].style.display = "block";
        }

        for (let i = 0; i < offline.length; i++) {
            offline[i].style.display = "none";
        }

        for (let i = 0; i < offlineImg.length; i++) {
            offlineImg[i].style.display = "none";
        }

        transparentButton.style.display = "none";

    } else {
        for (let i = 0; i < online.length; i++) {
            online[i].style.display = "none";
        }

        for (let i = 0; i < onlineImg.length; i++) {
            onlineImg[i].style.display = "none";
        }

        for (let i = 0; i < offline.length; i++) {
            offline[i].style.display = "inline-block";
        }

        for (let i = 0; i < offlineImg.length; i++) {
            offlineImg[i].style.display = "block";
        }

        transparentButton.style.display = "inline-block";
    }
}

// Check configuration files
function checkConfigFile(data, desiredString) {
    const searchString = new RegExp(`(?<=${desiredString}).*`, "g");

    let systemConfig = data.match(searchString)[0];
    systemConfig = systemConfig.toLowerCase();
    systemConfig = systemConfig.replace(/:.*/g, '');
    systemConfig = systemConfig.replace(/\.utf-8/g, "").replace(/\.utf8/g, "");
    return systemConfig;
}

// Check the theme that should be used
function checkTheme() {
    const fs = require('fs');

    function applyDarkTheme() {
        document.querySelector("body").style.backgroundColor = "#171a21";
        document.querySelector(".div2").style.backgroundColor = "#171a21";
        document.getElementById("loadscreen").style.backgroundColor = "#171a21";

        const div1 = document.querySelector(".div1")
        div1.style.backgroundColor = "#171a21";
        div1.style.color = "#fff";

        const h2Text = document.querySelectorAll(".h2");
        for (let i = 0; i < h2Text.length; i++) {
            h2Text[i].style.color = "#f3f3f3";
        }

        const h3Text = document.querySelectorAll(".h3");
        for (let i = 0; i < h3Text.length; i++) {
            h3Text[i].style.color = "#f3f3f3";
        }

        const pText = document.querySelectorAll("p");
        for (let i = 0; i < pText.length; i++) {
            pText[i].style.color = "#f3f3f3";
        }

        const networkButton = document.getElementById("network-button");
        networkButton.classList.remove("button");
        networkButton.classList.add("button-dark");

        const repositoryButton = document.getElementById("repo-button");
        repositoryButton.classList.remove("button");
        repositoryButton.classList.add("button-dark");

        const restoreButton = document.getElementById("restore-button");
        restoreButton.classList.remove("button");
        restoreButton.classList.add("button-dark");

        const infoButton = document.getElementById("info-button");
        infoButton.classList.remove("button");
        infoButton.classList.add("button-dark");
    }

    function applyLightTheme() {
        document.querySelector("body").style.backgroundColor = "#fff";
        document.querySelector(".div2").style.backgroundColor = "#fff";
        document.getElementById("loadscreen").style.backgroundColor = "#fff";

        const div1 = document.querySelector(".div1");
        div1.style.backgroundColor = "#fff";
        div1.style.color = "#000";

        const h2Text = document.querySelectorAll(".h2");
        for (let i = 0; i < h2Text.length; i++) {
            h2Text[i].style.color = "#333";
        }

        const h3Text = document.querySelectorAll(".h3");
        for (let i = 0; i < h3Text.length; i++) {
            h3Text[i].style.color = "#575757";
        }

        const pText = document.querySelectorAll("p");
        for (let i = 0; i < pText.length; i++) {
            pText[i].style.color = "#575757";
        }

        const networkButton = document.getElementById("network-button");
        networkButton.classList.remove("button-dark");
        networkButton.classList.add("button");

        const repositoryButton = document.getElementById("repo-button");
        repositoryButton.classList.remove("button-dark");
        repositoryButton.classList.add("button");

        const restoreButton = document.getElementById("restore-button");
        restoreButton.classList.remove("button-dark");
        restoreButton.classList.add("button");

        const infoButton = document.getElementById("info-button");
        infoButton.classList.remove("button-dark");
        infoButton.classList.add("button");
    }

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

// Run Shell Script
function runShellScript(script) {
    const exec = require('child_process').exec;
    var command = `xhost +; sleep 1; sudo /opt/regataos-help/scripts/${script}.sh`;
    exec(command, function (error, call, errlog) {
    });
}

// Open community in browser
function selectCommunityUrl() {
    const fs = require('fs');

    const urlCommunity = {
        "pt_br": "https://regataos.forumeiros.com/",
        "pt_pt": "https://regataos.forumeiros.com/",
        "en_us": "https://t.me/regataos_en",
        "en": "https://t.me/regataos_en",
    };

    if (fs.existsSync("/tmp/regataos-configs/config/plasma-localerc")) {
        const checkLangSystem = fs.readFileSync("/tmp/regataos-configs/config/plasma-localerc", "utf8");

        if (checkLangSystem.includes("LANGUAGE")) {
            const configOption = "LANGUAGE="
            const languageDetected = checkConfigFile(checkLangSystem, configOption);

            if (typeof urlCommunity[languageDetected] !== "undefined") {
                return urlCommunity[languageDetected];
            } else {
                return urlCommunity["en_us"];
            }

        } else if (checkLangSystem.includes("LANG")) {
            const configOption = "LANG="
            const languageDetected = checkConfigFile(checkLangSystem, configOption);

            if (typeof urlCommunity[languageDetected] !== "undefined") {
                return urlCommunity[languageDetected];
            } else {
                return urlCommunity["en_us"];
            }
        }

    } else if (fs.existsSync("/tmp/regataos-configs/config/user-dirs.locale")) {
        const checkLangSystem = fs.readFileSync("/tmp/regataos-configs/config/user-dirs.locale", "utf8");

        if (typeof urlCommunity[checkLangSystem] !== "undefined") {
            return urlCommunity[checkLangSystem.toLowerCase()];
        } else {
            return urlCommunity["en_us"];
        }
    }
}

function community() {
    const exec = require('child_process').exec;
    const command = `xdg-open ${selectCommunityUrl()}`;
    exec(command, function (error, call, errlog) {
    });
}
