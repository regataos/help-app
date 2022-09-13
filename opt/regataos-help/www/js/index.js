// Show app only when the UI is ready
const gui = require('nw.gui');

onload = function () {
    gui.Window.get().show();
}

// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

// Check internet connection
setInterval(checkOnline, 1000);
function checkOnline() {
    const onlineSupport = document.getElementById("option-regataoshelp");

    if (navigator.onLine) {
        onlineSupport.style.display = "block";
    } else {
        onlineSupport.style.display = "none";
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
        document.querySelector(".sidebar").style.backgroundColor = "#2a2f35";
        document.querySelector(".link-items").style.color = "#f3f3f3";
        document.getElementById("loadscreen").style.backgroundColor = "#171a21";

        const textSideBar = document.querySelectorAll(".link-items p");
        for (let i = 0; i < textSideBar.length; i++) {
            textSideBar[i].style.color = "#f3f3f3";
        }

        document.querySelector("img.seta-off").src = "file:///opt/regataos-help/www/images/img-sidebar/arrow-off-dark.png";
        document.querySelector("img.seta").src = "file:///opt/regataos-help/www/images/img-sidebar/arrow-dark.png";
        document.querySelector(".hide-sidebar .sidebar-icon").src = "file:///opt/regataos-help/www/images/img-sidebar/menu-dark.png";
        document.querySelector(".show-sidebar .sidebar-icon").src = "file:///opt/regataos-help/www/images/img-sidebar/menu-dark.png";
        document.querySelector("img.solution").src = "file:///opt/regataos-help/www/images/img-sidebar/tools2-dark.png";
        document.querySelector("img.help").src = "file:///opt/regataos-help/www/images/img-sidebar/support-dark.png";

        // For sidebar buttons
        const solutionOptions = document.getElementById("option-solutions");
        solutionOptions.classList.remove("sidebar-button");
        solutionOptions.classList.add("sidebar-button-dark");

        const optionRegataosHelp = document.getElementById("option-regataoshelp");
        optionRegataosHelp.classList.remove("sidebar-button");
        optionRegataosHelp.classList.add("sidebar-button-dark");
    }

    function applyLightTheme() {
        document.querySelector("body").style.backgroundColor = "#fff";
        document.querySelector(".sidebar").style.backgroundColor = "#e5e5e5";
        document.querySelector(".link-items").style.color = "#333";
        document.getElementById("loadscreen").style.backgroundColor = "#fff";

        const textSideBar = document.querySelectorAll(".link-items p");
        for (let i = 0; i < textSideBar.length; i++) {
            textSideBar[i].style.color = "#333";
        }

        document.querySelector("img.seta-off").src = "file:///opt/regataos-help/www/images/img-sidebar/arrow-off.png";
        document.querySelector("img.seta").src = "file:///opt/regataos-help/www/images/img-sidebar/arrow.png";
        document.querySelector(".hide-sidebar .sidebar-icon").src = "file:///opt/regataos-help/www/images/img-sidebar/menu.png";
        document.querySelector(".show-sidebar .sidebar-icon").src = "file:///opt/regataos-help/www/images/img-sidebar/menu.png";
        document.querySelector("img.solution").src = "file:///opt/regataos-help/www/images/img-sidebar/tools2.png";
        document.querySelector("img.help").src = "file:///opt/regataos-help/www/images/img-sidebar/support.png";

        // For sidebar buttons
        const solutionOptions = document.getElementById("option-solutions");
        solutionOptions.classList.remove("sidebar-button-dark");
        solutionOptions.classList.add("sidebar-button");

        const optionRegataosHelp = document.getElementById("option-regataoshelp");
        optionRegataosHelp.classList.remove("sidebar-button-dark");
        optionRegataosHelp.classList.add("sidebar-button");
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

// Detect current app page
setInterval(detectIframeUrl, 500);
function detectIframeUrl() {
    const fs = require('fs');

    const iframeUrl = document.getElementById("main-iframe").contentWindow.location.href;

    function usingDarkTheme() {
        if ((iframeUrl.indexOf("solutions.html") > -1) == "1") {
            document.getElementById("return-on").style.display = "none";
            document.getElementById("return-off").style.display = "flex";
            document.querySelector("#option-solutions a").style.borderLeft = "4px solid #0085e4";

        } else {
            document.querySelector("#option-solutions a").style.borderLeft = "4px solid #2a2f35";
        }

        if ((iframeUrl.indexOf("regataos") > -1) == "1") {
            document.getElementById("return-on").style.display = "flex";
            document.getElementById("return-off").style.display = "none";
            document.querySelector("#option-regataoshelp a").style.borderLeft = "4px solid #0085e4";

        } else {
            document.querySelector("#option-regataoshelp a").style.borderLeft = "4px solid #2a2f35";
        }
    }

    function usingLightTheme() {
        if ((iframeUrl.indexOf("solutions.html") > -1) == "1") {
            document.getElementById("return-on").style.display = "none";
            document.getElementById("return-off").style.display = "flex";
            document.querySelector("#option-solutions a").style.borderLeft = "4px solid #0085e4";

        } else {
            document.querySelector("#option-solutions a").style.borderLeft = "4px solid #e5e5e5";
        }

        if ((iframeUrl.indexOf("regataos") > -1) == "1") {
            document.getElementById("return-on").style.display = "flex";
            document.getElementById("return-off").style.display = "none";
            document.querySelector("#option-regataoshelp a").style.borderLeft = "4px solid #0085e4";

        } else {
            document.querySelector("#option-regataoshelp a").style.borderLeft = "4px solid #e5e5e5";
        }
    }

    if (fs.existsSync("/tmp/regataos-configs/config/kdeglobals")) {
        const checkColorScheme = fs.readFileSync("/tmp/regataos-configs/config/kdeglobals", "utf8");
        const configOption = "ColorScheme=";

        const colorConfig = checkConfigFile(checkColorScheme, configOption).toLowerCase();
        if (colorConfig.includes("dark")) {
            usingDarkTheme();
        } else {
            usingLightTheme();
        }

    } else {
        usingLightTheme();
    }
}

// Functions sidebar
//Save the status of the application sidebar
function hideSideBarShellScript() {
    const exec = require('child_process').exec;
    const command = "/bin/bash /opt/regataos-help/scripts/regataos-help-configs -hide-sidebar";
    exec(command, function (error, call, errlog) {
    });
}

function showSideBarShellScript() {
    const exec = require('child_process').exec;
    const command = "/bin/bash /opt/regataos-help/scripts/regataos-help-configs -show-sidebar";
    exec(command, function (error, call, errlog) {
    });
}

function hideSideBar(saveConfig) {
    const textSideBar = document.querySelectorAll(".link-items p");
    for (let i = 0; i < textSideBar.length; i++) {
        textSideBar[i].style.visibility = "hidden";
    }

    const itemSideBar = document.querySelectorAll(".sidebar .ul-sidebar li");
    for (let i = 0; i < itemSideBar.length; i++) {
        itemSideBar[i].style.width = "56px";
    }

    document.querySelector(".sidebar").style.width = "56px";
    document.querySelector(".div-iframe").style.marginLeft = "56px";
    document.querySelector(".hide-sidebar").style.display = "none";
    document.querySelector(".show-sidebar").style.display = "flex";
    document.querySelector(".iframe").style.width = "calc(100% - 56px)";

    if (saveConfig == true) {
        hideSideBarShellScript();
    }
}

function showSideBar(saveConfig) {
    const itemSideBar = document.querySelectorAll(".sidebar .ul-sidebar li");
    for (let i = 0; i < itemSideBar.length; i++) {
        itemSideBar[i].style.width = "230px";
    }

    document.querySelector(".sidebar").style.width = "230px";
    document.querySelector(".div-iframe").style.marginLeft = "230px";
    document.querySelector(".hide-sidebar").style.display = "flex";
    document.querySelector(".show-sidebar").style.display = "none";
    document.querySelector(".iframe").style.width = "calc(100% - 230px)";

    if (saveConfig == true) {
        showSideBarShellScript();
    }

    setTimeout(function () {
        const textSideBar = document.querySelectorAll(".link-items p");
        for (let i = 0; i < textSideBar.length; i++) {
            textSideBar[i].style.visibility = "visible";
        }
    }, 300);
}

function sideBarStart() {
    const fs = require('fs');

    if (fs.existsSync("/tmp/regataos-help/config/regataos-help.conf")) {
        const regataHelpConfig = fs.readFileSync("/tmp/regataos-help/config/regataos-help.conf", "utf8");
        const configOption = "hide_sidebar=";

        const sideBarConfig = checkConfigFile(regataHelpConfig, configOption);
        if (sideBarConfig.includes("0")) {
            showSideBar();
        } else {
            hideSideBar();
        }

    } else {
        showSideBar();
    }
}
sideBarStart();

// Choose url according to user language
function setSupportUrl() {
    const fs = require('fs');

    const urlSupport = {
        "pt_br": "https://suporte.regataos.com.br",
        "pt_pt": "https://suporte.regataos.com.br",
        "en_us": "https://support.regataos.com",
        "en": "https://support.regataos.com",
    };

    if (fs.existsSync("/tmp/regataos-configs/config/plasma-localerc")) {
        const checkLangSystem = fs.readFileSync("/tmp/regataos-configs/config/plasma-localerc", "utf8");

        if (checkLangSystem.includes("LANGUAGE")) {
            const configOption = "LANGUAGE="
            const languageDetected = checkConfigFile(checkLangSystem, configOption);

            if (typeof urlSupport[languageDetected] !== "undefined") {
                return urlSupport[languageDetected];
            } else {
                return urlSupport["en_us"];
            }

        } else if (checkLangSystem.includes("LANG")) {
            const configOption = "LANG="
            const languageDetected = checkConfigFile(checkLangSystem, configOption);

            if (typeof urlSupport[languageDetected] !== "undefined") {
                return urlSupport[languageDetected];
            } else {
                return urlSupport["en_us"];
            }
        }

    } else if (fs.existsSync("/tmp/regataos-configs/config/user-dirs.locale")) {
        const checkLangSystem = fs.readFileSync("/tmp/regataos-configs/config/user-dirs.locale", "utf8");

        if (typeof urlSupport[checkLangSystem] !== "undefined") {
            return urlSupport[checkLangSystem.toLowerCase()];
        } else {
            return urlSupport["en_us"];
        }
    }
}

// Go to specific pages
function go_solutions() {
    const iframeUrl = document.getElementById("main-iframe").contentWindow.location.href;

    if ((iframeUrl.indexOf("solutions.html") > -1) == "0") {
        document.getElementById("main-iframe").contentWindow.document.location.href = "pages/solutions.html";

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

function go_regataoshelp() {
    const iframeUrl = document.getElementById("main-iframe").contentWindow.location.href;

    if ((iframeUrl.indexOf("regataos") > -1) == "0") {
        document.getElementById("main-iframe").contentWindow.document.location.href = setSupportUrl();
        checkTheme();

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

// Back button
function backButton() {
    const iframeUrl = document.getElementById("main-iframe").contentWindow.location.href

    if (iframeUrl.indexOf("suporte.regataos.com.br/search?q=") == -1) {
        history.go(-1);
        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 100);

    } else {
        document.getElementById("main-iframe").contentWindow.document.location.href = setSupportUrl();

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}
