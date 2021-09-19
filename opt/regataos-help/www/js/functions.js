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

// Functions sidebar
//Icons only
function hide_sidebar() {
    $(".sidebar").css("width", "56px");
    $(".sidebar").css("transition", "all 0.3s ease-in-out");
    $(".sidebar .ul-sidebar li").css("width", "56px");
    $(".link-items p").css("visibility", "hidden");
    $(".hide-sidebar").css("display", "none");
    $(".show-sidebar").css("display", "flex");
    $(".div-iframe").css("padding-left", "56px");
    $(".iframe").css("width", "96%");

    hide_sidebar_shell();
}

function show_sidebar() {
    $(".sidebar").css("width", "230px");
    $(".sidebar").css("transition", "all 0.3s ease-in-out");
    $(".sidebar .ul-sidebar li").css("width", "231px");
    $(".hide-sidebar").css("display", "flex");
    $(".show-sidebar").css("display", "none");
    $(".div-iframe").css("padding-left", "231px");
    $(".iframe").css("width", "83%");

    show_sidebar_shell();

    setTimeout(function(){ 
        $(".link-items p").css("visibility", "visible");
    }, 300);
}

function hide_sidebar2() {
    $(".sidebar").css("width", "56px");
    $(".sidebar .ul-sidebar li").css("width", "56px");
    $(".link-items p").css("visibility", "hidden");
    $(".hide-sidebar").css("display", "none");
    $(".show-sidebar").css("display", "flex");
    $(".div-iframe").css("padding-left", "56px");
    $(".iframe").css("width", "96%");

    hide_sidebar_shell();
}

function show_sidebar2() {
    $(".sidebar").css("width", "230px");
    $(".sidebar .ul-sidebar li").css("width", "231px");
    $(".hide-sidebar").css("display", "flex");
    $(".show-sidebar").css("display", "none");
    $(".div-iframe").css("padding-left", "231px");
    $(".iframe").css("width", "83%");

    show_sidebar_shell();

    setTimeout(function(){ 
        $(".link-items p").css("visibility", "visible");
    }, 300);
}

function sidebar_start() {
    const fs = require('fs');

    fs.access('/tmp/regataos-help/config/regataos-help.conf', (err) => {
    if (!err) {
        var read_settings = fs.readFileSync("/tmp/regataos-help/config/regataos-help.conf", "utf8");

        if ((read_settings.indexOf("hide_sidebar=0") > -1) == "1") {
            show_sidebar2();

        } else if ((read_settings.indexOf("hide_sidebar=1") > -1) == "1") {
            hide_sidebar2();

        } else {
            show_sidebar2();
        }

        return;
    } else {
        show_sidebar2();
    }
    });
}
sidebar_start();

//Detect iframe url
function detect_iframe_url() {
    var iframe_url = document.getElementById("main-iframe").contentWindow.location.href

	if (iframe_url.indexOf("solutions.html")==-1) {
		console.error('not');
		$(".solutions a").css("border-left", "4px solid #e5e5e5")
	} else {
		$(".solutions a").css("border-left", "4px solid #0085e4")
        $(".return-sidebar2").css("display", "flex");
        $(".return-sidebar").css("display", "none");
	}

	if (iframe_url.indexOf("suporte.regataos.com.br")==-1) {
		console.error('not');
		$(".regataos-help a").css("border-left", "4px solid #e5e5e5")
	} else {
		$(".regataos-help a").css("border-left", "4px solid #0085e4")
        $(".return-sidebar2").css("display", "none");
        $(".return-sidebar").css("display", "flex");
	}

	if (iframe_url.indexOf("regataos.forumeiros.com")==-1) {
		console.error('not');
		$(".regataos-community a").css("border-left", "4px solid #e5e5e5")
	} else {
		$(".regataos-community a").css("border-left", "4px solid #0085e4")
        $(".return-sidebar2").css("display", "none");
        $(".return-sidebar").css("display", "flex");
	}
}

//Go to specific pages
function go_solutions() {
    var iframe_url = document.getElementById("main-iframe").contentWindow.location.href
    if ((iframe_url.indexOf("solutions.html") > -1) == "0") {
	    document.getElementById("main-iframe").contentWindow.document.location.href="pages/solutions.html";

	    // Take the page to the top
	    setTimeout(function() {
		    window.scrollTo(0,0);
	    }, 300);
    }
}

function go_regataoshelp() {
    var iframe_url = document.getElementById("main-iframe").contentWindow.location.href
    if ((iframe_url.indexOf("https://suporte.regataos.com.br/") > -1) == "0") {
	    document.getElementById("main-iframe").contentWindow.document.location.href="https://suporte.regataos.com.br/";

	    // Take the page to the top
	    setTimeout(function() {
		    window.scrollTo(0,0);
	    }, 300);
    }
}

function go_regataoscommunity() {
    var iframe_url = document.getElementById("main-iframe").contentWindow.location.href
    if ((iframe_url.indexOf("https://regataos.forumeiros.com/") > -1) == "0") {
	    document.getElementById("main-iframe").contentWindow.document.location.href="https://regataos.forumeiros.com/";

	    // Take the page to the top
	    setTimeout(function() {
		    window.scrollTo(0,0);
	    }, 300);
    }
}

//Back button
function back_button() {
    var iframe_url = document.getElementById("main-iframe").contentWindow.location.href
	if (iframe_url.indexOf("suporte.regataos.com.br/search?q=")==-1) {
        history.go(-1);
        // Take the page to the top
        setTimeout(function() {
            window.scrollTo(0,0);
        }, 100);

	} else {
        document.getElementById("main-iframe").contentWindow.document.location.href="https://suporte.regataos.com.br/";

	    // Take the page to the top
	    setTimeout(function() {
		    window.scrollTo(0,0);
	    }, 300);
	}
}

// Adjust the appearance of the Regatta OS Help
//Capture iframe and check the url of the app page
function for_regataos_help() {
    var capture_iframe = document.getElementById("main-iframe").contentWindow;
    capture_iframe.document.getElementById("top-bar").style.display = "none";
    capture_iframe.document.getElementById("top-bar2").style.display = "none";
    capture_iframe.document.getElementById("block1").style.paddingTop = "100px";
    capture_iframe.document.getElementById("content").style.marginTop = "0px";
    capture_iframe.document.getElementById("column-center-inner").style.paddingTop = "0px";
}

function apply_css_after() {
    setTimeout(function(){
        $(".sidebar .ul-sidebar li").css("transition", "all 0.3s ease-in-out");
    }, 2000);
}
apply_css_after();

setInterval(function() {
    detect_iframe_url();
    for_regataos_help();
}, 100);
