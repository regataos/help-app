// Show app only when the UI is ready
const gui = require('nw.gui');
onload = function () {
    gui.Window.get().show();
}

const win = nw.Window.get();
// Move window to top left of screen
win.moveTo(0, 0);
// Move window to middle of screen
win.setPosition('center');

// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

// Block drag and drop of icons
const icons = document.querySelectorAll(".icons-menu-option");
for (let i = 0; i < icons.length; i++) {
    icons[i].draggable = false;
}

const actionIcons = document.querySelectorAll(".icons-menu");
for (let i = 0; i < actionIcons.length; i++) {
    actionIcons[i].draggable = false;
}

// Get information from the main iframe
const mainIframe = document.getElementById("main-iframe").contentWindow;
function getIframeUrl() {
    let getUrl = mainIframe.location.href;
    return getUrl;
}

function goIframeUrl(url) {
    mainIframe.document.location.href = url;
}

// Check internet connection
setInterval(checkOnline, 1000);
function checkOnline() {
    const regataosHelp = document.getElementById("option-regataoshelp");
    const regataosCommunity = document.getElementById("option-forum");

    if (navigator.onLine) {
        regataosHelp.style.display = "block";

        if (languageDetected.includes("pt-br")) {
            regataosCommunity.style.display = "block";
        }
    } else {
        regataosHelp.style.display = "none";
        regataosCommunity.style.display = "none";
    }
}

// Detect current app page
setInterval(detectIframeUrl, 500);
function detectIframeUrl() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if (getIframeUrl().includes("solutions.html")) {
            document.getElementById("return-on").style.display = "none";
            document.getElementById("return-off").style.display = "flex";
            document.querySelector("li#option-solutions .sidebar-item-effect").style.backgroundColor = "#3daee9";
        } else {
            document.querySelector("li#option-solutions .sidebar-item-effect").style.backgroundColor = "";
        }

        if (getIframeUrl().includes("forum.html")) {
            document.getElementById("return-on").style.display = "flex";
            document.getElementById("return-off").style.display = "none";
            document.querySelector("#option-forum .sidebar-item-effect").style.backgroundColor = "#3daee9";
        } else {
            document.querySelector("#option-forum .sidebar-item-effect").style.backgroundColor = "";
        }

        if (getIframeUrl().includes("support.html")) {
            document.getElementById("return-on").style.display = "flex";
            document.getElementById("return-off").style.display = "none";
            document.querySelector("#option-regataoshelp .sidebar-item-effect").style.backgroundColor = "#3daee9";
        } else {
            document.querySelector("#option-regataoshelp .sidebar-item-effect").style.backgroundColor = "";
        }

        const sidebarItemEffectDark = document.querySelectorAll(".sidebar-item-effect");
        for (let i = 0; i < sidebarItemEffectDark.length; i++) {
            sidebarItemEffectDark[i].classList.add("sidebar-item-effect-dark");
        }

    } else {
        if (getIframeUrl().includes("solutions.html")) {
            document.getElementById("return-on").style.display = "none";
            document.getElementById("return-off").style.display = "flex";
            document.querySelector("li#option-solutions .sidebar-item-effect").style.backgroundColor = "#005fb8";
        } else {
            document.querySelector("li#option-solutions .sidebar-item-effect").style.backgroundColor = "";
        }

        if (getIframeUrl().includes("forum.html")) {
            document.getElementById("return-on").style.display = "flex";
            document.getElementById("return-off").style.display = "none";
            document.querySelector("#option-forum .sidebar-item-effect").style.backgroundColor = "#005fb8";
        } else {
            document.querySelector("#option-forum .sidebar-item-effect").style.backgroundColor = "";
        }

        if (getIframeUrl().includes("support.html")) {
            document.getElementById("return-on").style.display = "flex";
            document.getElementById("return-off").style.display = "none";
            document.querySelector("#option-regataoshelp .sidebar-item-effect").style.backgroundColor = "#005fb8";
        } else {
            document.querySelector("#option-regataoshelp .sidebar-item-effect").style.backgroundColor = "";
        }

        const sidebarItemEffectDark = document.querySelectorAll(".sidebar-item-effect");
        for (let i = 0; i < sidebarItemEffectDark.length; i++) {
            sidebarItemEffectDark[i].classList.remove("sidebar-item-effect-dark");
        }
    }
}

// Functions sidebar
//Save the status of the application sidebar
function hideSideBarShellScript() {
    const exec = require('child_process').exec;
    const command = "/bin/bash /opt/regataos-help/app/scripts/regataos-help-configs -hide-sidebar";
    exec(command, function (error, call, errlog) {
    });
}

function showSideBarShellScript() {
    const exec = require('child_process').exec;
    const command = "/bin/bash /opt/regataos-help/app/scripts/regataos-help-configs -show-sidebar";
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
        itemSideBar[i].style.width = "58px";
    }

    document.querySelector(".sidebar").style.width = "58px";
    document.querySelector(".div-iframe").style.marginLeft = "58px";
    document.querySelector(".hide-sidebar").style.display = "none";
    document.querySelector(".show-sidebar").style.display = "flex";
    document.querySelector(".iframe").style.width = "calc(100% - 58px)";

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

// Go to specific pages
function go_solutions() {
    if (!getIframeUrl().includes("solutions.html")) {
        goIframeUrl("pages/solutions.html");

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

function go_regataoshelp() {
    if (!getIframeUrl().includes("support.html")) {
        goIframeUrl("pages/support.html");

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

function go_forum() {
    if (!getIframeUrl().includes("forum.html")) {
        goIframeUrl("pages/forum.html");

        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 300);
    }
}

// Back button
function backButton() {
    function backButtonWebview() {
        const webview = mainIframe.document.getElementById('main-webview');

        webview.executeScript({
            code: "window.location.href"
        }, result => {
            this.url = result[0];
            let urlPage = url;

            if (urlPage.includes("com.br/")) {
                urlPage = urlPage.split("com.br/")[1];
            } else {
                urlPage = urlPage.split("com/")[1];
            }

            if (!urlPage) {
                history.go(-1);

                // Take the page to the top
                setTimeout(function () {
                    window.scrollTo(0, 0);
                }, 100);
            } else {
                webview.executeScript({ code: 'history.go(-1)' })
            }
        })
    }

    if (getIframeUrl().includes("forum.html")) {
        backButtonWebview();
    } else if (getIframeUrl().includes("support.html")) {
        backButtonWebview();
    } else {
        history.go(-1);
        // Take the page to the top
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 100);
    }
}

// Select community and hide forum in sidebar
function selectCommunity() {
    if (!languageDetected.includes("pt-br")) {
        document.querySelector("#option-forum").style.display = "none";
    }

    if (getIframeUrl().includes("solutions.html")) {
        mainIframe.document.getElementById("community-access").onclick = function () {
            if (languageDetected.includes("pt-br")) {
                go_forum();
            } else {
                const exec = require('child_process').exec;
                const command = `xdg-open "https://t.me/regataos_en"`;
                exec(command, function (error, call, errlog) {
                });
            }
        };
    }
}
selectCommunity();
