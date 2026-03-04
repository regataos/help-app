setTimeout(function () { document.getElementById("loadscreen").style.display = "none"; }, 1000);

var cleanupHome = require('os').homedir();
var currentLayout = 'list'; // 'list' or 'grid'

// =============================================
// 10 Categories - NO SUDO
// =============================================
var CLEANUP_CATEGORIES = [
    { id: "snaps", iconClass: "icon-snaps", priority: "high",
      scanCmd: "snap list --all 2>/dev/null | awk '/disabled/{sum+=$5} END {print sum+0}' || echo 0",
      cleanCmd: "snap list --all 2>/dev/null | awk '/disabled/{print $1, $3}' | while read snapname revision; do snap remove \"$snapname\" --revision=\"$revision\" 2>/dev/null; done" },
    { id: "user-cache", iconClass: "icon-user-cache", priority: "low",
      scanCmd: "find " + cleanupHome + "/.cache -mindepth 1 -maxdepth 1 ! -name 'thumbnails' ! -name 'mesa_shader_cache' ! -name 'fontconfig' -exec du -sb {} + 2>/dev/null | awk '{s+=$1} END {print s+0}'",
      cleanCmd: "find " + cleanupHome + "/.cache -mindepth 1 -maxdepth 1 ! -name 'thumbnails' ! -name 'mesa_shader_cache' ! -name 'fontconfig' -exec rm -rf {} + 2>/dev/null" },
    { id: "temp-files", iconClass: "icon-temp-files", priority: "low",
      scanCmd: "find /tmp -mindepth 1 -maxdepth 1 -user $(whoami) ! -name 'regataos-*' -exec du -sb {} + 2>/dev/null | awk '{s+=$1} END {print s+0}'",
      cleanCmd: "find /tmp -mindepth 1 -maxdepth 1 -user $(whoami) ! -name 'regataos-*' -exec rm -rf {} + 2>/dev/null" },
    { id: "thumbnails", iconClass: "icon-thumbnails", priority: "low",
      scanCmd: "du -sb " + cleanupHome + "/.cache/thumbnails 2>/dev/null | awk '{print $1}' || echo 0",
      cleanCmd: "rm -rf " + cleanupHome + "/.cache/thumbnails/* 2>/dev/null" },
    { id: "package-cache", iconClass: "icon-package-cache", priority: "low",
      scanCmd: "du -sb /var/cache/zypp/packages 2>/dev/null | awk '{print $1}' || echo 0",
      cleanCmd: "rm -rf /var/cache/zypp/packages/* 2>/dev/null" },
    { id: "trash", iconClass: "icon-trash", priority: "low",
      scanCmd: "du -sb " + cleanupHome + "/.local/share/Trash/files " + cleanupHome + "/.local/share/Trash/info 2>/dev/null | awk '{s+=$1} END {print s+0}'",
      cleanCmd: "rm -rf " + cleanupHome + "/.local/share/Trash/files/* " + cleanupHome + "/.local/share/Trash/info/* 2>/dev/null" },
    { id: "baloo", iconClass: "icon-baloo", priority: "low",
      scanCmd: "du -sb " + cleanupHome + "/.local/share/baloo 2>/dev/null | awk '{print $1}' || echo 0",
      cleanCmd: "balooctl6 disable 2>/dev/null; rm -rf " + cleanupHome + "/.local/share/baloo/* 2>/dev/null; balooctl6 enable 2>/dev/null" },
    { id: "browser-cache", iconClass: "icon-browser-cache", priority: "low",
      scanCmd: "du -sb " + cleanupHome + "/.cache/mozilla " + cleanupHome + "/.cache/google-chrome " + cleanupHome + "/.cache/chromium " + cleanupHome + "/.cache/BraveSoftware " + cleanupHome + "/.cache/vivaldi " + cleanupHome + "/.cache/opera 2>/dev/null | awk '{s+=$1} END {print s+0}'",
      cleanCmd: "rm -rf " + cleanupHome + "/.cache/mozilla/firefox/*/cache2 " + cleanupHome + "/.cache/google-chrome/Default/Cache " + cleanupHome + "/.cache/chromium/Default/Cache 2>/dev/null" },
    { id: "journal-logs", iconClass: "icon-journal-logs", priority: "low",
      scanCmd: "journalctl --disk-usage 2>/dev/null | grep -oP '[0-9.]+ [KMGT]' | awk '{n=$1; u=$2; if(u==\"K\") n*=1024; else if(u==\"M\") n*=1048576; else if(u==\"G\") n*=1073741824; print int(n)}'",
      cleanCmd: "journalctl --vacuum-size=50M 2>/dev/null" },
    { id: "flatpak-cache", iconClass: "icon-flatpak-cache", priority: "low",
      scanCmd: "du -sb /var/tmp/flatpak-cache* " + cleanupHome + "/.local/share/flatpak/repo/tmp 2>/dev/null | awk '{s+=$1} END {print s+0}'",
      cleanCmd: "rm -rf /var/tmp/flatpak-cache* " + cleanupHome + "/.local/share/flatpak/repo/tmp/* 2>/dev/null; flatpak uninstall --unused -y 2>/dev/null" }
];

var scanResults = [];
var allSelected = false;

// =============================================
// Utilities
// =============================================
function runCmd(cmd, timeoutMs) {
    return new Promise(function (resolve) {
        try { exec(cmd, { timeout: timeoutMs || 15000 }, function (err, stdout) { resolve(err ? "" : (stdout || "")); }); }
        catch (e) { resolve(""); }
    });
}

function formatBytes(bytes) {
    if (!bytes || bytes === 0) return "0 KB";
    var units = ["B", "KB", "MB", "GB", "TB"];
    var i = 0, size = bytes;
    while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }
    if (i === 0) return size + " B";
    return size.toFixed(i >= 3 ? 2 : 1) + " " + units[i];
}

function getPriorityBadge(priority, bytes) {
    if (bytes === 0) return '<span class="cleanup-item-badge badge-none">\u2014</span>';
    if (priority === "high") return '<span class="cleanup-item-badge badge-high">HIGH</span>';
    if (bytes >= 500 * 1024 * 1024) return '<span class="cleanup-item-badge badge-medium">MED</span>';
    return '<span class="cleanup-item-badge badge-low">LOW</span>';
}

// =============================================
// Layout toggle
// =============================================
function setLayout(mode) {
    currentLayout = mode;
    var wrap = document.getElementById("cleanup-list-wrap");
    wrap.className = (mode === 'grid') ? 'layout-grid' : 'layout-list';
    document.getElementById("toggle-list").classList.toggle("active", mode === 'list');
    document.getElementById("toggle-grid").classList.toggle("active", mode === 'grid');
    renderResults();
}

// =============================================
// Tab switching
// =============================================
function switchTab(tabId) {
    document.querySelectorAll('.cleanup-tab').forEach(function (t) { t.classList.toggle('active', t.getAttribute('data-tab') === tabId); });
    document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.toggle('active', p.id === 'tab-' + tabId); });
}

// =============================================
// Disk usage
// =============================================
function updateDiskUsage() {
    runCmd("df -B1 --output=size,used,avail / | tail -1").then(function (stdout) {
        if (!stdout || !stdout.trim()) return;
        var p = stdout.trim().split(/\s+/);
        if (p.length < 3) return;
        var total = parseInt(p[0], 10), used = parseInt(p[1], 10);
        if (isNaN(total) || isNaN(used) || total === 0) return;
        var pct = Math.round((used / total) * 100);
        document.getElementById("disk-usage-text").textContent = formatBytes(used) + " / " + formatBytes(total) + " (" + pct + "%)";
        var f = document.getElementById("disk-usage-fill");
        f.style.width = pct + "%";
        f.classList.remove("warning", "critical");
        if (pct >= 90) f.classList.add("critical"); else if (pct >= 75) f.classList.add("warning");
    });
}

// =============================================
// Stats
// =============================================
function updateStats() {
    var tb = 0, sb = 0, fc = 0;
    scanResults.forEach(function (it) { if (it.bytes > 0) { tb += it.bytes; fc++; } if (it.selected) sb += it.bytes; });
    document.getElementById("stat-total-value").textContent = formatBytes(tb);
    document.getElementById("stat-selected-value").textContent = formatBytes(sb);
    document.getElementById("stat-found-value").textContent = fc + " / " + scanResults.length;
}

// =============================================
// States
// =============================================
function showState(id) {
    ["scan-initial", "scan-loading", "scan-results", "clean-loading", "clean-done"].forEach(function (s) {
        var el = document.getElementById(s); if (el) el.style.display = (s === id) ? "block" : "none";
    });
}

// =============================================
// Scan
// =============================================
function startScan() {
    showState("scan-loading");
    scanResults = []; allSelected = false;
    Promise.all(CLEANUP_CATEGORIES.map(function (cat) {
        return runCmd(cat.scanCmd, 15000).then(function (out) {
            var b = parseInt(out.trim(), 10);
            return { id: cat.id, iconClass: cat.iconClass, priority: cat.priority, bytes: isNaN(b) ? 0 : b, cleanCmd: cat.cleanCmd, selected: false };
        });
    })).then(function (res) {
        scanResults = res;
        scanResults.forEach(function (it) { if (it.bytes > 0) it.selected = true; });
        allSelected = true;
        scanResults.sort(function (a, b) { return b.bytes - a.bytes; });
        renderResults(); showState("scan-results"); updateDiskUsage();
    }).catch(function () {
        scanResults = CLEANUP_CATEGORIES.map(function (c) { return { id: c.id, iconClass: c.iconClass, priority: c.priority, bytes: 0, cleanCmd: c.cleanCmd, selected: false }; });
        renderResults(); showState("scan-results");
    });
}

// =============================================
// Render
// =============================================
function renderResults() {
    var list = document.getElementById("cleanup-list");
    list.innerHTML = "";
    scanResults.forEach(function (item, idx) {
        var li = document.createElement("li");
        li.className = "cleanup-item" + (item.selected ? " checked" : "") + (item.bytes === 0 ? " cleanup-item-empty" : "");
        li.onclick = function () { toggleItem(idx); };

        var chkSvg = '<svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3.5" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>';

        if (currentLayout === 'grid') {
            li.innerHTML =
                '<div class="cleanup-item-checkbox">' + chkSvg + '</div>' +
                '<div class="cleanup-item-icon ' + item.iconClass + '"></div>' +
                '<div class="cleanup-item-info">' +
                    '<span class="cleanup-item-title">' + getCategoryShort(item.id) + ' ' + getPriorityBadge(item.priority, item.bytes) + '</span>' +
                '</div>' +
                '<div class="cleanup-item-size">' + formatBytes(item.bytes) + '</div>';
        } else {
            li.innerHTML =
                '<div class="cleanup-item-checkbox">' + chkSvg + '</div>' +
                '<div class="cleanup-item-icon ' + item.iconClass + '"></div>' +
                '<div class="cleanup-item-info">' +
                    '<div class="cleanup-item-title">' + getCategoryTitle(item.id) + ' ' + getPriorityBadge(item.priority, item.bytes) + '</div>' +
                    '<div class="cleanup-item-desc">' + getCategoryDesc(item.id) + '</div>' +
                '</div>' +
                '<div class="cleanup-item-size">' + formatBytes(item.bytes) + '</div>';
        }
        list.appendChild(li);
    });
    updateStats(); updateCleanButton();
}

// =============================================
// Toggle / Select
// =============================================
function toggleItem(i) { if (scanResults[i].bytes === 0) return; scanResults[i].selected = !scanResults[i].selected; renderResults(); }
function toggleSelectAll() { allSelected = !allSelected; scanResults.forEach(function (it) { if (it.bytes > 0) it.selected = allSelected; }); renderResults(); }
function updateCleanButton() {
    var h = scanResults.some(function (it) { return it.selected; });
    var b = document.getElementById("btn-clean"); if (h) b.classList.remove("disabled"); else b.classList.add("disabled");
}

// =============================================
// Confirm + Clean
// =============================================
function showConfirmDialog() {
    var sel = scanResults.filter(function (it) { return it.selected; }); if (!sel.length) return;
    document.getElementById("confirm-size").textContent = formatBytes(sel.reduce(function (a, it) { return a + it.bytes; }, 0));
    document.getElementById("confirm-count").textContent = sel.length;
    document.getElementById("confirm-overlay").classList.add("visible");
}
function hideConfirmDialog() { document.getElementById("confirm-overlay").classList.remove("visible"); }
function confirmClean() { hideConfirmDialog(); startClean(); }

function startClean() {
    var sel = scanResults.filter(function (it) { return it.selected; }); if (!sel.length) return;
    showState("clean-loading");

    // Build step list
    var stepsEl = document.getElementById("cp-steps");
    stepsEl.innerHTML = sel.map(function (it, i) {
        return '<div class="cp-step pending" id="cp-s' + i + '">' +
            '<div class="cp-step-icon">○</div>' +
            '<span class="cp-step-name">' + getCategoryTitle(it.id) + '</span>' +
            '<span class="cp-step-size">' + formatBytes(it.bytes) + '</span></div>';
    }).join('');
    document.getElementById("cp-pct").textContent = "0%";
    document.getElementById("cp-bar-fill").style.width = "0%";
    document.getElementById("cp-freed").innerHTML = "";

    var totalBytes = sel.reduce(function (a, it) { return a + it.bytes; }, 0);
    var idx = 0;

    function runNext() {
        if (idx >= sel.length) {
            // All done
            document.getElementById("cp-pct").textContent = "100%";
            document.getElementById("cp-bar-fill").style.width = "100%";
            var titleEl = document.querySelector(".cp-title");
            if (titleEl) titleEl.textContent = t("cleanupPage.doneTitle") || "Cleanup complete!";
            document.getElementById("cp-freed").innerHTML =
                (t("cleanupPage.freedLabel") || "Freed:") + " <b>" + formatBytes(totalBytes) + "</b>";

            // After 2s, switch to done screen
            setTimeout(function () {
                document.getElementById("clean-done-text").textContent = getDoneText(formatBytes(totalBytes));
                showState("clean-done"); updateDiskUsage();
            }, 2000);
            return;
        }

        // Mark current as active
        var stepEl = document.getElementById("cp-s" + idx);
        stepEl.className = "cp-step active";
        stepEl.querySelector('.cp-step-icon').innerHTML = '<div class="cp-spin"></div>';

        // Update bar
        var pct = Math.round((idx / sel.length) * 100);
        document.getElementById("cp-pct").textContent = pct + "%";
        document.getElementById("cp-bar-fill").style.width = pct + "%";

        // Run the command
        runCmd(sel[idx].cleanCmd, 30000).then(function () {
            // Mark as done
            stepEl.className = "cp-step done";
            stepEl.querySelector('.cp-step-icon').textContent = '✓';

            idx++;
            var pct2 = Math.round((idx / sel.length) * 100);
            document.getElementById("cp-pct").textContent = pct2 + "%";
            document.getElementById("cp-bar-fill").style.width = pct2 + "%";

            // Small delay before next for visual feedback
            setTimeout(runNext, 150);
        });
    }

    runNext();
}

// =============================================
// Downloads (lazy)
// =============================================
var downloadsLoaded = false;
function loadDownloads() {
    if (downloadsLoaded) return;
    document.getElementById("downloads-loading").style.display = "block";
    document.getElementById("downloads-list").innerHTML = "";
    runCmd("find " + cleanupHome + "/Downloads -maxdepth 1 -type f -printf '%s %f\\n' 2>/dev/null | sort -rn | head -30", 20000).then(function (out) {
        document.getElementById("downloads-loading").style.display = "none";
        var list = document.getElementById("downloads-list");
        if (!out || !out.trim()) { list.innerHTML = '<li class="file-item"><span class="file-item-name" style="text-align:center;width:100%;color:#999;">No files</span></li>'; downloadsLoaded = true; return; }
        var lines = out.trim().split("\n"), total = 0;
        lines.forEach(function (line, i) {
            var si = line.indexOf(" "); if (si < 0) return;
            var b = parseInt(line.substring(0, si), 10), n = line.substring(si + 1); if (isNaN(b)) return;
            total += b;
            var li = document.createElement("li"); li.className = "file-item";
            li.innerHTML = '<span class="file-item-index">' + (i+1) + '</span><span class="file-item-name" title="' + n + '">' + n + '</span><span class="file-item-size">' + formatBytes(b) + '</span>';
            list.appendChild(li);
        });
        var tli = document.createElement("li"); tli.className = "file-item"; tli.style.cssText = "font-weight:700;border-top:2px solid #d5d7da;margin-top:4px;padding-top:8px;";
        tli.innerHTML = '<span class="file-item-index"></span><span class="file-item-name" style="font-family:inherit">Total: ' + lines.length + ' files</span><span class="file-item-size">' + formatBytes(total) + '</span>';
        list.appendChild(tli); downloadsLoaded = true;
    });
}

// =============================================
// Largest (lazy)
// =============================================
var largestLoaded = false;
function loadLargestFiles() {
    if (largestLoaded) return;
    document.getElementById("largest-loading").style.display = "block";
    document.getElementById("largest-list").innerHTML = "";
    runCmd("find " + cleanupHome + " -type f -not -path '*/\\.*' -printf '%s %p\\n' 2>/dev/null | sort -rn | head -20", 30000).then(function (out) {
        document.getElementById("largest-loading").style.display = "none";
        var list = document.getElementById("largest-list");
        if (!out || !out.trim()) { list.innerHTML = '<li class="file-item"><span class="file-item-name" style="text-align:center;width:100%;color:#999;">No files</span></li>'; largestLoaded = true; return; }
        out.trim().split("\n").forEach(function (line, i) {
            var si = line.indexOf(" "); if (si < 0) return;
            var b = parseInt(line.substring(0, si), 10), fp = line.substring(si + 1); if (isNaN(b)) return;
            var li = document.createElement("li"); li.className = "file-item";
            li.innerHTML = '<span class="file-item-index">' + (i+1) + '</span><span class="file-item-name" title="' + fp + '">' + fp.replace(cleanupHome, "~") + '</span><span class="file-item-size">' + formatBytes(b) + '</span>';
            list.appendChild(li);
        }); largestLoaded = true;
    });
}

// =============================================
// Translations
// =============================================
var translationData = null;
function loadTranslationData() { try { translationData = JSON.parse(fs.readFileSync(selectTranslationFile(), "utf8")); } catch (e) { translationData = null; } }
function t(k) { if (!translationData) return null; var ks = k.split("."), o = translationData; for (var i = 0; i < ks.length; i++) { if (o && typeof o[ks[i]] !== "undefined") o = o[ks[i]]; else return null; } return typeof o === "string" ? o : null; }

function getCategoryTitle(id) { return t("cleanupPage.categories." + id + ".title") || fallbackTitle(id); }
function getCategoryShort(id) { return t("cleanupPage.categories." + id + ".short") || t("cleanupPage.categories." + id + ".title") || fallbackShort(id); }
function getCategoryDesc(id) { return t("cleanupPage.categories." + id + ".desc") || fallbackDesc(id); }
function getDoneText(s) { return (t("cleanupPage.doneDesc") || "{size} of disk space has been freed.").replace("{size}", s); }

function fallbackTitle(id) {
    return { "snaps":"Disabled Snaps", "user-cache":"Dev Caches", "temp-files":"Temporary Files", "thumbnails":"Thumbnails",
      "package-cache":"Zypper Cache", "trash":"Trash (KDE)", "baloo":"Baloo (KDE Index)", "browser-cache":"Browser Caches",
      "journal-logs":"Journal Logs", "flatpak-cache":"Flatpak Caches" }[id] || id;
}
function fallbackShort(id) {
    return { "snaps":"Snaps", "user-cache":"Caches Dev", "temp-files":"Temporários", "thumbnails":"Thumbnails",
      "package-cache":"Zypper", "trash":"Lixeira", "baloo":"Baloo", "browser-cache":"Navegador",
      "journal-logs":"Journal", "flatpak-cache":"Flatpak" }[id] || id;
}
function fallbackDesc(id) {
    return { "snaps":"Old disabled snap revisions", "user-cache":"Application cache files in ~/.cache",
      "temp-files":"User temp files in /tmp", "thumbnails":"Image thumbnails from file manager",
      "package-cache":"Downloaded packages from Zypper", "trash":"Files in your trash can",
      "baloo":"KDE Baloo search index", "browser-cache":"Firefox, Chrome, Brave caches",
      "journal-logs":"Systemd journal logs", "flatpak-cache":"Flatpak cache and unused runtimes" }[id] || "";
}

loadTranslationData();
updateDiskUsage();
