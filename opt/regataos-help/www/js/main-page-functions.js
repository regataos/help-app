// Open community in browser
function community() {
    const exec = require('child_process').exec;
    var command = "xdg-open https://regataos.forumeiros.com/";
    exec(command,function(error,call,errlog){
    });
}

// Fix network
function fixnetwork() {
    const exec = require('child_process').exec;
    var command = "sudo /opt/regataos-help/scripts/fix-network.sh";
    exec(command,function(error,call,errlog){
    });
}

// Fix software repos
function fixrepos() {
    const exec = require('child_process').exec;
    var command = "sudo /opt/regataos-help/scripts/fix-repos.sh";
    exec(command,function(error,call,errlog){
    });
}

// Hardware info
function hardware_info() {
    const exec = require('child_process').exec;
    var command = "sleep 1; sudo /opt/regataos-help/scripts/hardware-info.sh";
    exec(command,function(error,call,errlog){
    });
}

// Restore config
function restore() {
    const exec = require('child_process').exec;
    var command = "sudo /opt/regataos-help/scripts/restore-config.sh";
    exec(command,function(error,call,errlog){
    });
}

// Save the status of the application sidebar
function hide_sidebar_shell() {
    const exec = require('child_process').exec;
    var command = "/bin/bash /opt/regataos-help/scripts/regataos-help-configs -hide-sidebar";
    exec(command,function(error,call,errlog){
    });
}

function show_sidebar_shell() {
    const exec = require('child_process').exec;
    var command = "/bin/bash /opt/regataos-help/scripts/regataos-help-configs -show-sidebar";
    exec(command,function(error,call,errlog){
    });
}

// Check the theme that should be used
function check_theme() {
    const fs = require('fs');

    fs.access('/tmp/regataos-configs/config/kdeglobals', (err) => {
    if (!err) {
        var read_settings = fs.readFileSync("/tmp/regataos-configs/config/kdeglobals", "utf8");

        if ((read_settings.indexOf("ColorScheme=BreezeDark") > -1) == "1") {
            // To the main page
            $("#loadscreen").css("background-color", "#171a21");
            $("body").css("background-color", "#171a21");
            $(".div1").css("background-color", "#171a21");
            $(".div2").css("background-color", "#171a21");
            $(".div1").css("color", "#fff");
            $(".h2").css("color", "#fff");
            $(".h3").css("color", "#fff");
            $("p").css("color", "#fff");

            // For the main page buttons
            var network_button = document.getElementById("network-button");
            network_button.classList.remove("button");
            network_button.classList.add("button-dark");

            var repo_button = document.getElementById("repo-button");
            repo_button.classList.remove("button");
            repo_button.classList.add("button-dark");

            var restore_button = document.getElementById("restore-button");
            restore_button.classList.remove("button");
            restore_button.classList.add("button-dark");

            var info_button = document.getElementById("info-button");
            info_button.classList.remove("button");
            info_button.classList.add("button-dark");

        } else {
            // To the main page
            $("#loadscreen").css("background-color", "#fff");
            $("body").css("background-color", "#fff");
            $(".div1").css("background-color", "#fff");
            $(".div2").css("background-color", "#fff");
            $(".div1").css("color", "#000");
            $(".h2").css("color", "#333");
            $(".h3").css("color", "#575757");
            $("p").css("color", "#575757");

            // For the main page buttons
            var network_button = document.getElementById("network-button");
            network_button.classList.remove("button-dark");
            network_button.classList.add("button");

            var repo_button = document.getElementById("repo-button");
            repo_button.classList.remove("button-dark");
            repo_button.classList.add("button");

            var restore_button = document.getElementById("restore-button");
            restore_button.classList.remove("button-dark");
            restore_button.classList.add("button");

            var info_button = document.getElementById("info-button");
            info_button.classList.remove("button-dark");
            info_button.classList.add("button");
        }
        return;
    }
    });
}
check_theme();

setInterval(function() {
    check_theme();
}, 100);
