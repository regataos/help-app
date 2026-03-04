function applyTranslation() {
    try {
        let data = fs.readFileSync(selectTranslationFile(), "utf8");
        data = JSON.parse(data);
        if (!data.cleanupPage) return;
        var cp = data.cleanupPage;

        var setEl = function (sel, text) { var el = document.querySelector(sel); if (el && text) el.innerHTML = text; };
        var setAll = function (sel, text) { if (!text) return; document.querySelectorAll(sel).forEach(function (el) { el.innerHTML = text; }); };

        setEl(".cleanup-page-title", cp.pageTitle);
        setEl(".cleanup-page-desc", cp.pageDesc);
        setEl(".cleanup-disk-label", cp.diskLabel);
        setEl(".cleanup-scan-prompt-text", cp.scanPromptText);
        setEl(".cleanup-scan-button-text", cp.scanButton);
        setEl(".cleanup-scanning-text", cp.scanningText);
        setEl(".cleanup-cleaning-text", cp.cleaningText);
        setEl(".cleanup-done-title", cp.doneTitle);
        setEl(".cleanup-select-items-label", cp.selectItemsLabel);
        setEl(".cleanup-stat-total-label", cp.statTotalLabel);
        setEl(".cleanup-stat-selected-label", cp.statSelectedLabel);
        setEl(".cleanup-stat-found-label", cp.statFoundLabel);
        setEl(".cleanup-confirm-title", cp.confirmTitle);
        setEl(".cleanup-confirm-text", cp.confirmText);
        setEl(".cleanup-confirm-items-label", cp.confirmItemsLabel);
        setEl(".cleanup-confirm-cancel", cp.confirmCancel);
        setEl(".cleanup-confirm-yes", cp.confirmYes);
        setEl(".cleanup-tab-cleanup-label", cp.tabCleanupLabel);
        setEl(".cleanup-tab-downloads-label", cp.tabDownloadsLabel);
        setEl(".cleanup-tab-largest-label", cp.tabLargestLabel);
        setEl(".cleanup-downloads-title", cp.downloadsTitle);
        setEl(".cleanup-downloads-btn", cp.downloadsBtn);
        setEl(".cleanup-downloads-info", cp.downloadsInfo);
        setEl(".cleanup-largest-title", cp.largestTitle);
        setEl(".cleanup-largest-btn", cp.largestBtn);
        setEl(".cleanup-largest-info", cp.largestInfo);
        setAll(".cleanup-select-all-text", cp.selectAll);
        setAll(".cleanup-clean-button-text", cp.cleanButton);
        setAll(".cleanup-rescan-text", cp.rescanButton);
    } catch (e) {}
}
applyTranslation();
