// Global variable
const mainIframe = document.getElementById("main-iframe").contentWindow;

function getIframeUrl() {
    let iframeUrl = mainIframe.location.href;
    return iframeUrl;
}

// Go url iframe
function goIframeUrl(url) {
    mainIframe.document.location.href = url;
}

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
        document.querySelector("img.forum").src = "file:///opt/regataos-help/www/images/img-sidebar/forum-dark.png";

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
        document.querySelector("img.forum").src = "file:///opt/regataos-help/www/images/img-sidebar/forum.png";

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

    function usingDarkTheme() {
        if ((getIframeUrl().indexOf("solutions.html") > -1) == "1") {
            document.getElementById("return-on").style.display = "none";
            document.getElementById("return-off").style.display = "flex";
            document.querySelector("#option-solutions a").style.borderLeft = "4px solid #0085e4";

        } else {
            document.querySelector("#option-solutions a").style.borderLeft = "4px solid #2a2f35";
        }

        if ((getIframeUrl().indexOf("forum.html") > -1) == "1") {
            document.getElementById("return-on").style.display = "flex";
            document.getElementById("return-off").style.display = "none";
            document.querySelector("#option-forum a").style.borderLeft = "4px solid #0085e4";

        } else {
            document.querySelector("#option-forum a").style.borderLeft = "4px solid #2a2f35";
        }

        if ((getIframeUrl().indexOf("regataos") > -1) == "1") {
            document.getElementById("return-on").style.display = "flex";
            document.getElementById("return-off").style.display = "none";
            document.querySelector("#option-regataoshelp a").style.borderLeft = "4px solid #0085e4";

        } else {
            document.querySelector("#option-regataoshelp a").style.borderLeft = "4px solid #2a2f35";
        }
    }

    function usingLightTheme() {
        if ((getIframeUrl().indexOf("solutions.html") > -1) == "1") {
            document.getElementById("return-on").style.display = "none";
            document.getElementById("return-off").style.display = "flex";
            document.querySelector("#option-solutions a").style.borderLeft = "4px solid #0085e4";

        } else {
            document.querySelector("#option-solutions a").style.borderLeft = "4px solid #e5e5e5";
        }

        if ((getIframeUrl().indexOf("forum.html") > -1) == "1") {
            document.getElementById("return-on").style.display = "flex";
            document.getElementById("return-off").style.display = "none";
            document.querySelector("#option-forum a").style.borderLeft = "4px solid #0085e4";

        } else {
            document.querySelector("#option-forum a").style.borderLeft = "4px solid #e5e5e5";
        }

        if ((getIframeUrl().indexOf("regataos") > -1) == "1") {
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
        "pt-br": "https://suporte.regataos.com.br",
        "pt-pt": "https://suporte.regataos.com.br",
        "en-us": "https://support.regataos.com",
        "en": "https://support.regataos.com",
    };

    if (typeof urlSupport[languageDetected] !== "undefined") {
        return urlSupport[languageDetected];
    } else {
        return urlSupport["en-us"];
    }
}

// Go to specific pages
function go_solutions() {
    if ((getIframeUrl().indexOf("solutions.html") > -1) == "0") {
        goIframeUrl("pages/solutions.html");

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

function go_regataoshelp() {
    if ((getIframeUrl().indexOf("regataos") > -1) == "0") {
        goIframeUrl(setSupportUrl());
        checkTheme();

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

function go_forum() {
    if ((getIframeUrl().indexOf("forum.html") > -1) == "0") {
        goIframeUrl("pages/forum.html");

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

// Back button
function backButton() {
    if ((getIframeUrl().indexOf("forum.html") > -1) == "1") {
        const webview = mainIframe.document.getElementById('webview-forum');

        webview.executeScript({
            code: "window.location.href"
        }, result => {
            this.url = result[0];
            let urlPage = url;
            urlPage = urlPage.split("com/")[1];

            if (!urlPage) {
                if (getIframeUrl().indexOf("suporte.regataos.com.br/search?q=") == -1) {
                    history.go(-1);
                    // Take the page to the top
                    setTimeout(function () {
                        window.scrollTo(0, 0);
                    }, 100);

                } else {
                    goIframeUrl(setSupportUrl());

                    // Take the page to the top
                    setTimeout(function () {
                        window.scrollTo(0, 0);
                    }, 300);
                }

            } else {
                webview.executeScript({ code: 'history.go(-1)' })
            }
        })

    } else {
        if (getIframeUrl().indexOf("suporte.regataos.com.br/search?q=") == -1) {
            history.go(-1);
            // Take the page to the top
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 100);

        } else {
            goIframeUrl(setSupportUrl());

            // Take the page to the top
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 300);
        }
    }
}

// Select community and hide forum in sidebar
function selectCommunity() {
    if ((languageDetected.indexOf("pt") > -1) == "0") {
        document.querySelector("#option-forum").style.display = "none";
    }

    mainIframe.document.getElementById("community-access").onclick = function () {
        if ((languageDetected.indexOf("pt") > -1) == "1") {
            go_forum();

        } else {
            const exec = require('child_process').exec;
            const command = `xdg-open "https://t.me/regataos_en"`;
            exec(command, function (error, call, errlog) {
            });
        }
    };
}
selectCommunity();
