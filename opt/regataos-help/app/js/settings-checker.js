const fs = require('fs');
const { exec, execFile } = require('child_process');

function checkConfigFile(data, key) {
    const line = data.split('\n').find(l => l.startsWith(key));
    if (!line) return '';

    return line
        .slice(key.length)
        .split(':')[0]
        .replace(/\.utf-?8/gi, '')
        .replace(/_/g, '-')
        .toLowerCase()
        .trim();
}

function systemLang() {
    if (fs.existsSync("/tmp/regataos-configs/config/plasma-localerc")) {
        const checkLangSystem = fs.readFileSync("/tmp/regataos-configs/config/plasma-localerc", "utf8");

        if (checkLangSystem.includes("LANGUAGE")) {
            return checkConfigFile(checkLangSystem, "LANGUAGE=");
        } else if (checkLangSystem.includes("LANG")) {
            return checkConfigFile(checkLangSystem, "LANG=");
        }

    } else if (fs.existsSync("/tmp/regataos-configs/config/user-dirs.locale")) {
        const checkLangSystem = fs.readFileSync("/tmp/regataos-configs/config/user-dirs.locale", "utf8");

        return checkLangSystem
            .toLowerCase()
            .replace(/_/g, '-')
            .trim();
    }
}

const languageDetected = systemLang();

function selectTranslationFile() {
    const translationDir = "/opt/regataos-help/app/js/translations/languages";

    if (fs.existsSync(`${translationDir}/${languageDetected}.json`)) {
        return `${translationDir}/${languageDetected}.json`;
    } else {
        return `${translationDir}/en-us.json`;
    }
}

let isOnline = false;
const onlineListeners = [];

function onOnlineChange(callback) {
    onlineListeners.push(callback);
}

function checkInternetConnection() {
    fetch("https://www.google.com/generate_204", {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store"
    })
    .then(function () {
        if (!isOnline) {
            isOnline = true;
            onlineListeners.forEach(function (cb) { cb(isOnline); });
        }
    })
    .catch(function () {
        if (isOnline) {
            isOnline = false;
            onlineListeners.forEach(function (cb) { cb(isOnline); });
        }
    });
}

checkInternetConnection();
setInterval(checkInternetConnection, 10000);

window.addEventListener('online', function () {
    setTimeout(checkInternetConnection, 1000);
});
window.addEventListener('offline', function () {
    isOnline = false;
    onlineListeners.forEach(function (cb) { cb(isOnline); });
});

const homeDir = require('os').homedir();
const path = require('path');
const kdeConfigPath = path.join(homeDir, ".config", "kdeglobals");
const kdeDefaultsPath = path.join(homeDir, ".config", "kdedefaults", "kdeglobals");
const themeConfigPath = "/tmp/regataos-configs/config/kdeglobals";
let isDarkTheme = false;
const themeListeners = [];

function onThemeChange(callback) {
    themeListeners.push(callback);
}

function applyThemeClass(isDark) {
    document.documentElement.classList.toggle("dark-theme", isDark);
}

function readThemeIsDark() {
    if (fs.existsSync(kdeConfigPath)) {
        const data = fs.readFileSync(kdeConfigPath, "utf8");
        const colorScheme = getGeneralColorScheme(data);
        if (colorScheme !== null) {
            return colorScheme.includes("dark");
        }
    }

    if (fs.existsSync(themeConfigPath)) {
        const data = fs.readFileSync(themeConfigPath, "utf8");
        const colorScheme = getGeneralColorScheme(data);
        if (colorScheme !== null) {
            return colorScheme.includes("dark");
        }
    }

    if (fs.existsSync(kdeDefaultsPath)) {
        const data = fs.readFileSync(kdeDefaultsPath, "utf8");
        const colorScheme = getGeneralColorScheme(data);
        if (colorScheme !== null) {
            return colorScheme.includes("dark");
        }
    }

    return false;
}

function getGeneralColorScheme(data) {
    const lines = data.split('\n');
    let inGeneral = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line === '[General]') {
            inGeneral = true;
            continue;
        }

        if (line.startsWith('[') && line.endsWith(']')) {
            if (inGeneral) break;
            continue;
        }

        if (inGeneral && line.startsWith('ColorScheme=')) {
            return line.slice('ColorScheme='.length).toLowerCase().trim();
        }
    }

    const firstMatch = lines.find(l => l.trim().startsWith('ColorScheme='));
    if (firstMatch) {
        return firstMatch.trim().slice('ColorScheme='.length).toLowerCase().trim();
    }

    return null;
}

function detectThemeFromConfig() {
    const newIsDark = readThemeIsDark();

    if (newIsDark !== isDarkTheme) {
        isDarkTheme = newIsDark;
        applyThemeClass(isDarkTheme);
        themeListeners.forEach(function (cb) { cb(isDarkTheme); });
    }
}

detectThemeFromConfig();

function watchThemeConfig() {
    let watchTimeout = null;
    function debouncedDetect() {
        if (watchTimeout) clearTimeout(watchTimeout);
        watchTimeout = setTimeout(function () {
            detectThemeFromConfig();
        }, 200);
    }

    const configDir = path.join(homeDir, ".config");
    if (fs.existsSync(configDir)) {
        try {
            fs.watch(configDir, { persistent: false }, function (eventType, filename) {
                if (filename === "kdeglobals") {
                    debouncedDetect();
                }
            });
        } catch (e) {}
    }
}
watchThemeConfig();
