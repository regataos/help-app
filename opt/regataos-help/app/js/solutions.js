// Disable main hover effect after few seconds
setTimeout(function () {
    document.getElementById("loadscreen").style.display = "none";
}, 1000);

// Check internet connection
setInterval(checkOnline, 500);
function checkOnline() {
    const online = document.querySelectorAll(".online");
    const onlineImg = document.querySelectorAll(".online-img");
    const offline = document.querySelectorAll(".offline");
    const offlineImg = document.querySelectorAll(".offline-img");

    if (navigator.onLine) {
        for (let i = 0; i < online.length; i++) {
            online[i].style.display = "inline-block";
        }

        for (let i = 0; i < onlineImg.length; i++) {
            onlineImg[i].style.display = "block";
        }

        for (let i = 0; i < offline.length; i++) {
            offline[i].style.display = "none";
        }

        for (let i = 0; i < offlineImg.length; i++) {
            offlineImg[i].style.display = "none";
        }
    } else {
        for (let i = 0; i < online.length; i++) {
            online[i].style.display = "none";
        }

        for (let i = 0; i < onlineImg.length; i++) {
            onlineImg[i].style.display = "none";
        }

        for (let i = 0; i < offline.length; i++) {
            offline[i].style.display = "inline-block";
        }

        for (let i = 0; i < offlineImg.length; i++) {
            offlineImg[i].style.display = "block";
        }
    }
}

// Run Shell Script
function runShellScript(script) {
    const exec = require('child_process').exec;
    const command = `xhost +; sleep 1; ps -C ${script}.sh > /dev/null;
    if [ $? = 1 ]; then sudo /opt/regataos-help/scripts/${script}.sh; fi`;
    exec(command, function (error, call, errlog) {
    });
}
