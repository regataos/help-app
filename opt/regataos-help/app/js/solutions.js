setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

const onlineEls = document.querySelectorAll(".online");
const onlineImgs = document.querySelectorAll(".online-img");
const offlineEls = document.querySelectorAll(".offline");
const offlineImgs = document.querySelectorAll(".offline-img");

function updateOnlineOffline() {
    onlineEls.forEach(el => { el.style.display = isOnline ? "inline-block" : "none"; });
    onlineImgs.forEach(el => { el.style.display = isOnline ? "block" : "none"; });
    offlineEls.forEach(el => { el.style.display = isOnline ? "none" : "inline-block"; });
    offlineImgs.forEach(el => { el.style.display = isOnline ? "none" : "block"; });
}

onOnlineChange(updateOnlineOffline);
updateOnlineOffline();

const ALLOWED_SCRIPTS = ['fix-network', 'fix-repos', 'restore-config', 'hardware-info'];

function runShellScript(script) {
    if (!ALLOWED_SCRIPTS.includes(script)) {
        return;
    }

    const scriptPath = `/opt/regataos-help/app/scripts/${script}.sh`;

    exec(`ps -C ${script}.sh`, function (err) {
        if (err) {
            exec(`sudo ${scriptPath}`);
        }
    });
}
