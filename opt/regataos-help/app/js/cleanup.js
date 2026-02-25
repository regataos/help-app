setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

const homeDir = require('os').homedir();
const user = require('os').userInfo().username;

// Cleanup categories definition
const CLEANUP_CATEGORIES = [
    {
        id: "package-cache",
        iconClass: "icon-package-cache",
        scanCmd: "du -sb /var/cache/zypp/packages 2>/dev/null | tail -1 | awk '{print $1}'",
        cleanCmd: "sudo rm -rf /var/cache/zypp/packages/*",
        requiresSudo: true
    },
    {
        id: "system-logs",
        iconClass: "icon-system-logs",
        scanCmd: "find /var/log -type f \\( -name '*.gz' -o -name '*.old' -o -name '*.1' -o -name '*.2' -o -name '*.3' -o -name '*.4' -o -name '*.xz' \\) -exec du -sb {} + 2>/dev/null | awk '{s+=$1} END {print s+0}'",
        cleanCmd: "sudo find /var/log -type f \\( -name '*.gz' -o -name '*.old' -o -name '*.1' -o -name '*.2' -o -name '*.3' -o -name '*.4' -o -name '*.xz' \\) -delete && sudo journalctl --vacuum-size=50M",
        requiresSudo: true
    },
    {
        id: "temp-files",
        iconClass: "icon-temp-files",
        scanCmd: "du -sb /tmp /var/tmp 2>/dev/null | awk '{s+=$1} END {print s+0}'",
        cleanCmd: "sudo find /tmp -mindepth 1 -maxdepth 1 ! -name 'regataos-*' -exec rm -rf {} + 2>/dev/null; sudo find /var/tmp -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null",
        requiresSudo: true
    },
    {
        id: "user-cache",
        iconClass: "icon-user-cache",
        scanCmd: "find " + homeDir + "/.cache -mindepth 1 -maxdepth 1 ! -name 'thumbnails' -exec du -sb {} + 2>/dev/null | awk '{s+=$1} END {print s+0}'",
        cleanCmd: "find " + homeDir + "/.cache -mindepth 1 -maxdepth 1 ! -name 'thumbnails' -exec rm -rf {} +",
        requiresSudo: false
    },
    {
        id: "thumbnails",
        iconClass: "icon-thumbnails",
        scanCmd: "du -sb " + homeDir + "/.cache/thumbnails 2>/dev/null | tail -1 | awk '{print $1}'",
        cleanCmd: "rm -rf " + homeDir + "/.cache/thumbnails/*",
        requiresSudo: false
    },
    {
        id: "trash",
        iconClass: "icon-trash",
        scanCmd: "du -sb " + homeDir + "/.local/share/Trash 2>/dev/null | tail -1 | awk '{print $1}'",
        cleanCmd: "rm -rf " + homeDir + "/.local/share/Trash/files/* " + homeDir + "/.local/share/Trash/info/*",
        requiresSudo: false
    }
];

let scanResults = [];
let allSelected = false;

// =============================================
// Utility: run shell command with timeout
// =============================================
function runCmd(cmd, timeoutMs) {
    return new Promise(function (resolve) {
        var timeout = timeoutMs || 10000;

        try {
            var child = exec(cmd, { timeout: timeout }, function (err, stdout, stderr) {
                if (err) {
                    console.log("Command failed: " + cmd);
                    console.log("Error: " + (err.message || err));
                    resolve("");
                    return;
                }
                resolve(stdout || "");
            });
        } catch (e) {
            console.log("Exec exception: " + e.message);
            resolve("");
        }
    });
}

// =============================================
// Utility: format bytes to human readable
// =============================================
function formatBytes(bytes) {
    if (bytes === 0) return "0 B";

    var units = ["B", "KB", "MB", "GB", "TB"];
    var i = 0;
    var size = bytes;

    while (size >= 1024 && i < units.length - 1) {
        size /= 1024;
        i++;
    }

    if (i === 0) return size + " B";
    return size.toFixed(1) + " " + units[i];
}

// =============================================
// Get disk usage
// =============================================
function updateDiskUsage() {
    runCmd("df -B1 --output=size,used,avail / | tail -1").then(function (stdout) {
        if (!stdout || !stdout.trim()) {
            document.getElementById("disk-usage-text").textContent = "—";
            return;
        }

        var parts = stdout.trim().split(/\s+/);
        if (parts.length < 3) return;

        var total = parseInt(parts[0], 10);
        var used = parseInt(parts[1], 10);

        if (isNaN(total) || isNaN(used) || total === 0) return;

        var pct = Math.round((used / total) * 100);

        document.getElementById("disk-usage-text").textContent =
            formatBytes(used) + " / " + formatBytes(total) + " (" + pct + "%)";

        var fillEl = document.getElementById("disk-usage-fill");
        fillEl.style.width = pct + "%";

        fillEl.classList.remove("warning", "critical");
        if (pct >= 90) {
            fillEl.classList.add("critical");
        } else if (pct >= 75) {
            fillEl.classList.add("warning");
        }
    });
}

// =============================================
// Show/hide states
// =============================================
function showState(stateId) {
    var states = ["scan-initial", "scan-loading", "scan-results", "clean-loading", "clean-done"];
    states.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.style.display = (id === stateId) ? "block" : "none";
    });
}

// =============================================
// Start scanning
// =============================================
function startScan() {
    showState("scan-loading");
    scanResults = [];
    allSelected = false;

    var promises = CLEANUP_CATEGORIES.map(function (cat) {
        return runCmd(cat.scanCmd, 15000).then(function (stdout) {
            var bytes = parseInt(stdout.trim(), 10);
            return {
                id: cat.id,
                iconClass: cat.iconClass,
                bytes: isNaN(bytes) ? 0 : bytes,
                cleanCmd: cat.cleanCmd,
                requiresSudo: cat.requiresSudo,
                selected: false
            };
        });
    });

    Promise.all(promises).then(function (results) {
        scanResults = results;
        renderResults();
        showState("scan-results");
        updateDiskUsage();
    }).catch(function (err) {
        console.log("Scan error: " + err);
        // Even on error, show results (all zeros)
        scanResults = CLEANUP_CATEGORIES.map(function (cat) {
            return {
                id: cat.id,
                iconClass: cat.iconClass,
                bytes: 0,
                cleanCmd: cat.cleanCmd,
                requiresSudo: cat.requiresSudo,
                selected: false
            };
        });
        renderResults();
        showState("scan-results");
    });
}

// =============================================
// Render results list
// =============================================
function renderResults() {
    var list = document.getElementById("cleanup-list");
    list.innerHTML = "";

    var totalSelected = 0;

    scanResults.forEach(function (item, index) {
        var li = document.createElement("li");
        li.className = "cleanup-item" + (item.selected ? " checked" : "") + (item.bytes === 0 ? " cleanup-item-empty" : "");
        li.setAttribute("data-index", index);
        li.onclick = function () { toggleItem(index); };

        li.innerHTML =
            '<div class="cleanup-item-checkbox">' +
            '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M2 7 L5.5 10.5 L12 3.5" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
            '</div>' +
            '<div class="cleanup-item-icon ' + item.iconClass + '"></div>' +
            '<div class="cleanup-item-info">' +
            '<div class="cleanup-item-title cleanup-cat-' + item.id + '-title">' + getCategoryTitle(item.id) + '</div>' +
            '<div class="cleanup-item-desc cleanup-cat-' + item.id + '-desc">' + getCategoryDesc(item.id) + '</div>' +
            '</div>' +
            '<div class="cleanup-item-size">' + (item.bytes > 0 ? formatBytes(item.bytes) : getEmptyText()) + '</div>';

        list.appendChild(li);

        if (item.selected) {
            totalSelected += item.bytes;
        }
    });

    document.getElementById("total-size").textContent = formatBytes(totalSelected);
    updateCleanButton();
}

// =============================================
// Toggle item selection
// =============================================
function toggleItem(index) {
    var item = scanResults[index];
    if (item.bytes === 0) return;

    item.selected = !item.selected;
    renderResults();
}

// =============================================
// Toggle select all
// =============================================
function toggleSelectAll() {
    allSelected = !allSelected;

    scanResults.forEach(function (item) {
        if (item.bytes > 0) {
            item.selected = allSelected;
        }
    });

    renderResults();
}

// =============================================
// Update clean button state
// =============================================
function updateCleanButton() {
    var hasSelected = scanResults.some(function (item) { return item.selected; });
    var btn = document.getElementById("btn-clean");

    if (hasSelected) {
        btn.classList.remove("disabled");
    } else {
        btn.classList.add("disabled");
    }
}

// =============================================
// Start cleaning
// =============================================
function startClean() {
    var selected = scanResults.filter(function (item) { return item.selected; });
    if (selected.length === 0) return;

    showState("clean-loading");

    var totalFreed = selected.reduce(function (acc, item) { return acc + item.bytes; }, 0);

    // Build combined command
    var commands = selected.map(function (item) { return item.cleanCmd; });
    var fullCmd = commands.join(" ; ");

    runCmd(fullCmd, 60000).then(function () {
        var doneText = document.getElementById("clean-done-text");
        doneText.textContent = getDoneText(formatBytes(totalFreed));

        showState("clean-done");
        updateDiskUsage();
    });
}

// =============================================
// Translation helpers — fallback to English
// =============================================
var translationData = null;

function loadTranslationData() {
    try {
        var raw = fs.readFileSync(selectTranslationFile(), "utf8");
        translationData = JSON.parse(raw);
    } catch (e) {
        console.log("Translation load error: " + e.message);
        translationData = null;
    }
}

function t(path) {
    if (!translationData) return null;

    var keys = path.split(".");
    var obj = translationData;
    for (var i = 0; i < keys.length; i++) {
        if (obj && typeof obj[keys[i]] !== "undefined") {
            obj = obj[keys[i]];
        } else {
            return null;
        }
    }
    return typeof obj === "string" ? obj : null;
}

function getCategoryTitle(id) {
    var key = "cleanupPage.categories." + id + ".title";
    return t(key) || getFallbackTitle(id);
}

function getCategoryDesc(id) {
    var key = "cleanupPage.categories." + id + ".desc";
    return t(key) || getFallbackDesc(id);
}

function getEmptyText() {
    return t("cleanupPage.emptyText") || "Nothing to clean";
}

function getDoneText(size) {
    var template = t("cleanupPage.doneDesc") || "{size} of disk space has been freed.";
    return template.replace("{size}", size);
}

// English fallbacks
function getFallbackTitle(id) {
    var titles = {
        "package-cache": "Package cache",
        "system-logs": "Old system logs",
        "temp-files": "Temporary files",
        "user-cache": "User cache",
        "thumbnails": "Thumbnail cache",
        "trash": "Trash"
    };
    return titles[id] || id;
}

function getFallbackDesc(id) {
    var descs = {
        "package-cache": "Cached packages downloaded by the package manager.",
        "system-logs": "Rotated and compressed log files in /var/log.",
        "temp-files": "Temporary files in /tmp and /var/tmp.",
        "user-cache": "Application cache files in your home directory.",
        "thumbnails": "Image thumbnails generated by the file manager.",
        "trash": "Files in your trash can."
    };
    return descs[id] || "";
}

// =============================================
// Initialize
// =============================================
loadTranslationData();
updateDiskUsage();