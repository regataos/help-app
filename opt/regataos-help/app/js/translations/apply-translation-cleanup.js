function applyTranslation() {
    try {
        let data = fs.readFileSync(selectTranslationFile(), "utf8");
        data = JSON.parse(data);

        if (!data.cleanupPage) return;

        var cp = data.cleanupPage;

        document.querySelector(".cleanup-page-title").innerHTML = cp.pageTitle || "";
        document.querySelector(".cleanup-page-desc").innerHTML = cp.pageDesc || "";
        document.querySelector(".cleanup-disk-label").innerHTML = cp.diskLabel || "";
        document.querySelector(".cleanup-scan-prompt-text").innerHTML = cp.scanPromptText || "";
        document.querySelector(".cleanup-scan-button-text").innerHTML = cp.scanButton || "";
        document.querySelector(".cleanup-scanning-text").innerHTML = cp.scanningText || "";
        document.querySelector(".cleanup-total-label").innerHTML = cp.totalLabel || "";
        document.querySelector(".cleanup-cleaning-text").innerHTML = cp.cleaningText || "";
        document.querySelector(".cleanup-done-title").innerHTML = cp.doneTitle || "";

        // Multiple elements with same class
        var selectAllEls = document.querySelectorAll(".cleanup-select-all-text");
        selectAllEls.forEach(function (el) { el.innerHTML = cp.selectAll || ""; });

        var cleanBtnEls = document.querySelectorAll(".cleanup-clean-button-text");
        cleanBtnEls.forEach(function (el) { el.innerHTML = cp.cleanButton || ""; });

        var rescanEls = document.querySelectorAll(".cleanup-rescan-text");
        rescanEls.forEach(function (el) { el.innerHTML = cp.rescanButton || ""; });
    } catch (e) {
        // Fallback: keep default English text
    }
}
applyTranslation();
