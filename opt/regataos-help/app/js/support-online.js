setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

function setSupportUrl() {
    const webview = document.getElementById('main-webview');

    const urlSupport = {
        "pt-br": "https://suporte.regataos.com.br",
        "pt-pt": "https://support.regataos.com.br",
        "en-us": "https://support.regataos.com.br",
        "en": "https://support.regataos.com.br"
    };

    if (typeof urlSupport[languageDetected] !== "undefined") {
        webview.setAttribute("src", urlSupport[languageDetected]);
    } else {
        webview.setAttribute("src", urlSupport["en-us"]);
    }
}
setSupportUrl();

function injectColorSchemeToWebview() {
    const webview = document.getElementById('main-webview');
    if (!webview) return;

    const colorScheme = isDarkTheme ? "dark" : "light";
    webview.executeScript({
        code: 'document.documentElement.style.colorScheme = "' + colorScheme + '";'
    });
}

const webview = document.getElementById('main-webview');
if (webview) {
    webview.addEventListener('loadstop', function () {
        injectColorSchemeToWebview();
    });
}

onThemeChange(function () {
    injectColorSchemeToWebview();
});
