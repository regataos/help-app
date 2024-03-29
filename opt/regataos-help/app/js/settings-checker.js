// Check configuration files
function checkConfigFile(data, desiredString) {
    const searchString = new RegExp(`(?<=${desiredString}).*`, "g");

    let systemConfig = data.match(searchString)[0];
    systemConfig = systemConfig.toLowerCase();
    systemConfig = systemConfig.replace(/:.*/g, '');
    systemConfig = systemConfig.replace(/\.utf-8/g, "").replace(/\.utf8/g, "");
    systemConfig = systemConfig.replace(/_/g, '-');
    return systemConfig;
}

// Check system language
function systemLang() {
    const fs = require('fs');

    if (fs.existsSync("/tmp/regataos-configs/config/plasma-localerc")) {
        const checkLangSystem = fs.readFileSync("/tmp/regataos-configs/config/plasma-localerc", "utf8");

        if (checkLangSystem.includes("LANGUAGE")) {
            const configOption = "LANGUAGE=";
            const languageDetected = checkConfigFile(checkLangSystem, configOption);

            return languageDetected;

        } else if (checkLangSystem.includes("LANG")) {
            const configOption = "LANG=";
            const languageDetected = checkConfigFile(checkLangSystem, configOption);

            return languageDetected;
        }

    } else if (fs.existsSync("/tmp/regataos-configs/config/user-dirs.locale")) {
        const checkLangSystem = fs.readFileSync("/tmp/regataos-configs/config/user-dirs.locale", "utf8");

        let languageDetected = checkLangSystem;
        languageDetected = languageDetected.toLowerCase();
        languageDetected = languageDetected.replace(/_/g, '-');

        return languageDetected;
    }
}
const languageDetected = systemLang();

// Choose the JSON file with the language translation.
function selectTranslationFile() {
    const fs = require('fs');
    const translationDir = "/opt/regataos-help/app/js/translations/languages"

    if (fs.existsSync(`${translationDir}/${languageDetected}.json`)) {
        return `${translationDir}/${languageDetected}.json`;
    } else {
        return `${translationDir}/en-us.json`;
    }
}
