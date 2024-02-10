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
    }
}

// Check the theme that should be used
setInterval(checkTheme, 1000);
function checkTheme() {
    function applyDarkTheme() {
        document.querySelector("body").style.backgroundColor = "#1b1e20";
        document.querySelector(".div2").style.backgroundColor = "#1b1e20";
        document.getElementById("loadscreen").style.backgroundColor = "#1b1e20";
        document.getElementById("community-access").classList.add("community-access-dark");

        const styleElement = document.createElement("style");
        styleElement.appendChild(document.createTextNode(`
        html ::-webkit-scrollbar-track {
            background: #1b1e20;
            border-left: 1px solid #2a2e32;
        }
        html ::-webkit-scrollbar-thumb {
            background: #383e42;
            border-radius: 2em;
            border: 6px solid rgba(0, 0, 0, 0);
            background-clip: padding-box;
        }
        html ::-webkit-scrollbar-thumb:hover {
            background: #2383b5;
            border-radius: 2em;
            border: 6px solid rgba(0, 0, 0, 0);
            background-clip: padding-box;
        }
        `));
        document.getElementsByTagName("head")[0].appendChild(styleElement);

        const div1 = document.querySelector(".div1")
        div1.style.backgroundColor = "#1b1e20";
        div1.style.color = "#fff";

        const h2Text = document.querySelectorAll(".h2");
        for (let i = 0; i < h2Text.length; i++) {
            h2Text[i].style.color = "#eff0f1";
        }

        const optionItem = document.querySelectorAll(".option-item");
        for (let i = 0; i < optionItem.length; i++) {
            optionItem[i].style.backgroundColor = "#2a2e32";
        }

        const h3Text = document.querySelectorAll(".h3");
        for (let i = 0; i < h3Text.length; i++) {
            h3Text[i].style.color = "#eff0f1";
        }

        const pText = document.querySelectorAll("p");
        for (let i = 0; i < pText.length; i++) {
            pText[i].style.color = "#eff0f1";
        }

        document.querySelector(".rede-icone-on").style.backgroundImage = "url(./../images/wifi-on-dark.png)";
        document.querySelector(".rede-icone-off").style.backgroundImage = "url(./../images/wifi-off-dark.png)";
        document.querySelector(".repo-icone-on").style.backgroundImage = "url(./../images/repo-on-dark.png)";
        document.querySelector(".repo-icone-off").style.backgroundImage = "url(./../images/repo-on-dark.png)";
        document.querySelector(".restore-icone").style.backgroundImage = "url(./../images/restore-dark.png)";
        document.querySelector(".info-icone").style.backgroundImage = "url(./../images/info-dark.png)";

        const networkButton = document.getElementById("network-button");
        networkButton.classList.add("button-dark");
        const repositoryButton = document.getElementById("repo-button");
        repositoryButton.classList.add("button-dark");
        const restoreButton = document.getElementById("restore-button");
        restoreButton.classList.add("button-dark");
        const infoButton = document.getElementById("info-button");
        infoButton.classList.add("button-dark");
    }

    function applyLightTheme() {
        document.querySelector("body").style.backgroundColor = "#fff";
        document.querySelector(".div2").style.backgroundColor = "#fff";
        document.getElementById("loadscreen").style.backgroundColor = "#fff";
        document.getElementById("community-access").classList.remove("community-access-dark");

        const styleElement = document.createElement("style");
        styleElement.appendChild(document.createTextNode(`
        html ::-webkit-scrollbar-track {
            background: #fff;
            border-left: 1px solid #cdcdcd;
        }
        html ::-webkit-scrollbar-thumb {
            transition: all .3s;
            background: #b3b3b3;
            border-radius: 2em;
            border: 6px solid rgba(0, 0, 0, 0);
            background-clip: padding-box;
        }
        html ::-webkit-scrollbar-thumb:hover {
            background: #8a8a8a;
            border-radius: 2em;
            border: 6px solid rgba(0, 0, 0, 0);
            background-clip: padding-box;
        }
        `));
        document.getElementsByTagName("head")[0].appendChild(styleElement);

        const div1 = document.querySelector(".div1");
        div1.style.backgroundColor = "#fff";
        div1.style.color = "#000";

        const h2Text = document.querySelectorAll(".h2");
        for (let i = 0; i < h2Text.length; i++) {
            h2Text[i].style.color = "#222";
        }

        const optionItem = document.querySelectorAll(".option-item");
        for (let i = 0; i < optionItem.length; i++) {
            optionItem[i].style.backgroundColor = "#eff0f1";
        }

        const h3Text = document.querySelectorAll(".h3");
        for (let i = 0; i < h3Text.length; i++) {
            h3Text[i].style.color = "#222";
        }

        const pText = document.querySelectorAll("p");
        for (let i = 0; i < pText.length; i++) {
            pText[i].style.color = "#333";
        }

        document.querySelector(".rede-icone-on").style.backgroundImage = "url(./../images/wifi-on.png)";
        document.querySelector(".rede-icone-off").style.backgroundImage = "url(./../images/wifi-off.png)";
        document.querySelector(".repo-icone-on").style.backgroundImage = "url(./../images/repo-on.png)";
        document.querySelector(".repo-icone-off").style.backgroundImage = "url(./../images/repo-on.png)";
        document.querySelector(".restore-icone").style.backgroundImage = "url(./../images/restore.png)";
        document.querySelector(".info-icone").style.backgroundImage = "url(./../images/info.png)";

        const networkButton = document.getElementById("network-button");
        networkButton.classList.remove("button-dark");
        const repositoryButton = document.getElementById("repo-button");
        repositoryButton.classList.remove("button-dark");
        const restoreButton = document.getElementById("restore-button");
        restoreButton.classList.remove("button-dark");
        const infoButton = document.getElementById("info-button");
        infoButton.classList.remove("button-dark");
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

// Run Shell Script
function runShellScript(script) {
    const exec = require('child_process').exec;
    const command = `xhost +; sleep 1; ps -C ${script}.sh > /dev/null;
    if [ $? = 1 ]; then sudo /opt/regataos-help/scripts/${script}.sh; fi`;
    exec(command, function (error, call, errlog) {
    });
}
