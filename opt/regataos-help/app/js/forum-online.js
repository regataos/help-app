setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

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
