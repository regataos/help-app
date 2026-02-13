const gui = require('nw.gui');
onload = function () {
    gui.Window.get().show();
}

const win = nw.Window.get();
win.moveTo(0, 0);
win.setPosition('center');

setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

const icons = document.querySelectorAll(".icons-menu-option");
icons.forEach(icon => { icon.draggable = false; });

const actionIcons = document.querySelectorAll(".icons-menu");
actionIcons.forEach(icon => { icon.draggable = false; });

const mainIframe = document.getElementById("main-iframe").contentWindow;

function getIframeUrl() {
    return mainIframe.location.href;
}

function goIframeUrl(url) {
    mainIframe.document.location.href = url;
}

const sidebarElements = {
    sidebar: document.querySelector(".sidebar"),
    divIframe: document.querySelector(".div-iframe"),
    hideBtn: document.querySelector(".hide-sidebar"),
    showBtn: document.querySelector(".show-sidebar"),
    iframe: document.querySelector(".iframe"),
    textItems: document.querySelectorAll(".link-items p"),
    listItems: document.querySelectorAll(".sidebar .ul-sidebar li"),
    returnOn: document.getElementById("return-on"),
    returnOff: document.getElementById("return-off"),
    regataosHelp: document.getElementById("option-regataoshelp"),
    regataosCommunity: document.getElementById("option-forum"),
    solutionsEffect: document.querySelector("li#option-solutions .sidebar-item-effect"),
    forumEffect: document.querySelector("#option-forum .sidebar-item-effect"),
    helpEffect: document.querySelector("#option-regataoshelp .sidebar-item-effect"),
    allEffects: document.querySelectorAll(".sidebar-item-effect")
};

function updateOnlineStatus() {
    const isOnline = navigator.onLine;
    sidebarElements.regataosHelp.style.display = isOnline ? "block" : "none";
    sidebarElements.regataosCommunity.style.display =
        (isOnline && languageDetected.includes("pt-br")) ? "block" : "none";
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

function detectIframeUrl() {
    const url = getIframeUrl();
    const activeColor = isDarkTheme ? "#3daee9" : "#005fb8";

    const isSolutions = url.includes("solutions.html");
    const isForum = url.includes("forum.html");
    const isSupport = url.includes("support.html");
    const showBack = isForum || isSupport;

    sidebarElements.returnOn.style.display = showBack ? "flex" : "none";
    sidebarElements.returnOff.style.display = showBack ? "none" : "flex";

    sidebarElements.solutionsEffect.style.backgroundColor = isSolutions ? activeColor : "";
    sidebarElements.forumEffect.style.backgroundColor = isForum ? activeColor : "";
    sidebarElements.helpEffect.style.backgroundColor = isSupport ? activeColor : "";

    sidebarElements.allEffects.forEach(el => {
        el.classList.toggle("sidebar-item-effect-dark", isDarkTheme);
    });
}

function applyThemeToIframe() {
    try {
        const iframeDoc = mainIframe.document;
        if (iframeDoc && iframeDoc.documentElement) {
            iframeDoc.documentElement.classList.toggle("dark-theme", isDarkTheme);
        }
    } catch (e) {}
}

document.getElementById("main-iframe").addEventListener('load', function () {
    detectIframeUrl();
    applyThemeToIframe();
});
detectIframeUrl();

onThemeChange(function () {
    detectIframeUrl();
    applyThemeToIframe();
});

function saveSidebarConfig(hidden) {
    const configDir = '/tmp/regataos-help/config';
    const configFile = `${configDir}/regataos-help.conf`;

    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    if (fs.existsSync(configFile)) {
        let content = fs.readFileSync(configFile, 'utf8');
        if (content.includes('hide_sidebar=')) {
            content = content.replace(/hide_sidebar=\d/, `hide_sidebar=${hidden ? 1 : 0}`);
        } else {
            content += `\nhide_sidebar=${hidden ? 1 : 0}`;
        }
        fs.writeFileSync(configFile, content);
    } else {
        fs.writeFileSync(configFile, `hide_sidebar=${hidden ? 1 : 0}`);
    }
}

function hideSideBar(saveConfig) {
    sidebarElements.textItems.forEach(el => { el.style.visibility = "hidden"; });
    sidebarElements.listItems.forEach(el => { el.style.width = "58px"; });

    sidebarElements.sidebar.style.width = "58px";
    sidebarElements.divIframe.style.marginLeft = "58px";
    sidebarElements.hideBtn.style.display = "none";
    sidebarElements.showBtn.style.display = "flex";
    sidebarElements.iframe.style.width = "calc(100% - 58px)";

    if (saveConfig === true) {
        saveSidebarConfig(true);
    }
}

function showSideBar(saveConfig) {
    sidebarElements.listItems.forEach(el => { el.style.width = "230px"; });

    sidebarElements.sidebar.style.width = "230px";
    sidebarElements.divIframe.style.marginLeft = "230px";
    sidebarElements.hideBtn.style.display = "flex";
    sidebarElements.showBtn.style.display = "none";
    sidebarElements.iframe.style.width = "calc(100% - 230px)";

    if (saveConfig === true) {
        saveSidebarConfig(false);
    }

    setTimeout(function () {
        sidebarElements.textItems.forEach(el => { el.style.visibility = "visible"; });
    }, 300);
}

function sideBarStart() {
    if (fs.existsSync("/tmp/regataos-help/config/regataos-help.conf")) {
        const regataHelpConfig = fs.readFileSync("/tmp/regataos-help/config/regataos-help.conf", "utf8");
        const sideBarConfig = checkConfigFile(regataHelpConfig, "hide_sidebar=");
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

function go_solutions() {
    if (!getIframeUrl().includes("solutions.html")) {
        goIframeUrl("pages/solutions.html");
        setTimeout(function () { window.scrollTo(0, 0); }, 300);
    }
}

function go_regataoshelp() {
    if (!getIframeUrl().includes("support.html")) {
        goIframeUrl("pages/support.html");
        setTimeout(function () { window.scrollTo(0, 0); }, 300);
    }
}

function go_forum() {
    if (!getIframeUrl().includes("forum.html")) {
        goIframeUrl("pages/forum.html");
        setTimeout(function () { window.scrollTo(0, 0); }, 300);
    }
}

function backButton() {
    function backButtonWebview() {
        const webview = mainIframe.document.getElementById('main-webview');

        webview.executeScript({
            code: "window.location.href"
        }, function (result) {
            let urlPage = result[0];

            if (urlPage.includes("com.br/")) {
                urlPage = urlPage.split("com.br/")[1];
            } else {
                urlPage = urlPage.split("com/")[1];
            }

            if (!urlPage) {
                history.go(-1);
                setTimeout(function () { window.scrollTo(0, 0); }, 100);
            } else {
                webview.executeScript({ code: 'history.go(-1)' });
            }
        });
    }

    if (getIframeUrl().includes("forum.html") || getIframeUrl().includes("support.html")) {
        backButtonWebview();
    } else {
        history.go(-1);
        setTimeout(function () { window.scrollTo(0, 0); }, 100);
    }
}

function selectCommunity() {
    if (!languageDetected.includes("pt-br")) {
        sidebarElements.regataosCommunity.style.display = "none";
    }

    if (getIframeUrl().includes("solutions.html")) {
        const communityLink = mainIframe.document.getElementById("community-access");
        if (!communityLink) return;

        communityLink.onclick = function () {
            if (languageDetected.includes("pt-br")) {
                go_forum();
            } else {
                exec('xdg-open "https://t.me/regataos_en"');
            }
        };
    }
}
