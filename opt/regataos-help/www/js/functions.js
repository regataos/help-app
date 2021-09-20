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
    $(".sidebar .ul-sidebar li").css("width", "230px");
    $(".hide-sidebar").css("display", "flex");
    $(".show-sidebar").css("display", "none");
    $(".div-iframe").css("padding-left", "230px");
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
    $(".sidebar .ul-sidebar li").css("width", "230px");
    $(".hide-sidebar").css("display", "flex");
    $(".show-sidebar").css("display", "none");
    $(".div-iframe").css("padding-left", "230px");
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

// Check the theme that should be used
function check_theme() {
    const fs = require('fs');

    fs.access('/tmp/regataos-configs/config/kdeglobals', (err) => {
    if (!err) {
        var read_settings = fs.readFileSync("/tmp/regataos-configs/config/kdeglobals", "utf8");

        if ((read_settings.indexOf("ColorScheme=BreezeDark") > -1) == "1") {
            // Side bar
            $(".sidebar").css("background-color", "#2a2f35");
            $(".sidebar").css("box-shadow", "0px 0px 3px 0px rgb(8 13 18 / 34%)");
            $(".link-items").css("color", "#fff");
            $(".link-items p").css("color", "#fff");

            // Sidebar Images
            $("img.seta-off").attr("src","file:///opt/regataos-help/www/images/img-sidebar/seta-off-dark.png");
            $("img.seta").attr("src","file:///opt/regataos-help/www/images/img-sidebar/seta-dark.png");
            $("img.sidebar-icon").attr("src","file:///opt/regataos-help/www/images/img-sidebar/hide-sidebar-dark.png");
            $("img.solution").attr("src","file:///opt/regataos-help/www/images/img-sidebar/tools-dark.png");
            $("img.help").attr("src","file:///opt/regataos-help/www/images/img-sidebar/boia-dark.png");
            $("img.community").attr("src","file:///opt/regataos-help/www/images/img-sidebar/chat-dark.png");

            // To the main page
            $("#loadscreen").css("background-color", "#171a21");
            $("body").css("background-color", "#171a21");

            // For sidebar buttons
            var option_solutions = document.getElementById("option-solutions");
            option_solutions.classList.remove("sidebar-button");
            option_solutions.classList.add("sidebar-button-dark");

            var option_regataoshelp = document.getElementById("option-regataoshelp");
            option_regataoshelp.classList.remove("sidebar-button");
            option_regataoshelp.classList.add("sidebar-button-dark");

            var option_community = document.getElementById("option-community");
            option_community.classList.remove("sidebar-button");
            option_community.classList.add("sidebar-button-dark");

        } else {
            // Side bar
            $(".sidebar").css("background-color", "#e5e5e5");
            $(".sidebar").css("box-shadow", "0px 0px 3px 0px rgb(8 13 18 / 34%)");
            $(".link-items").css("color", "#333");
            $(".link-items p").css("color", "#333");

            // Sidebar Images
            $("img.seta-off").attr("src","file:///opt/regataos-help/www/images/img-sidebar/seta-off.png");
            $("img.seta").attr("src","file:///opt/regataos-help/www/images/img-sidebar/seta.png");
            $("img.sidebar-icon").attr("src","file:///opt/regataos-help/www/images/img-sidebar/hide-sidebar.png");
            $("img.solution").attr("src","file:///opt/regataos-help/www/images/img-sidebar/tools.png");
            $("img.help").attr("src","file:///opt/regataos-help/www/images/img-sidebar/boia.png");
            $("img.community").attr("src","file:///opt/regataos-help/www/images/img-sidebar/chat.png");

            // To the main page
            $("#loadscreen").css("background-color", "#fff");
            $("body").css("background-color", "#fff");

            // For sidebar buttons
            var option_solutions = document.getElementById("option-solutions");
            option_solutions.classList.remove("sidebar-button-dark");
            option_solutions.classList.add("sidebar-button");

            var option_regataoshelp = document.getElementById("option-regataoshelp");
            option_regataoshelp.classList.remove("sidebar-button-dark");
            option_regataoshelp.classList.add("sidebar-button");

            var option_community = document.getElementById("option-community");
            option_community.classList.remove("sidebar-button-dark");
            option_community.classList.add("sidebar-button");
        }
        return;
    }
    });
}
check_theme();

setInterval(function() {
    check_theme();
}, 100);

//Detect iframe url
function detect_iframe_url() {
    var iframe_url = document.getElementById("main-iframe").contentWindow.location.href
    const fs = require('fs');

    fs.access('/tmp/regataos-configs/config/kdeglobals', (err) => {
    if (!err) {
        var read_settings = fs.readFileSync("/tmp/regataos-configs/config/kdeglobals", "utf8");

        if ((read_settings.indexOf("ColorScheme=BreezeDark") > -1) == "1") {
            if ((iframe_url.indexOf("solutions.html") > -1) == "1") {
                $(".solutions a").css("border-left", "4px solid #0085e4")
                $(".return-sidebar2").css("display", "flex");
                $(".return-sidebar").css("display", "none");
            } else {
                $(".solutions a").css("border-left", "4px solid #2a2f35")
            }

            if ((iframe_url.indexOf("suporte.regataos.com.br") > -1) == "1") {
		        $(".regataos-help a").css("border-left", "4px solid #0085e4")
                $(".return-sidebar2").css("display", "none");
                $(".return-sidebar").css("display", "flex");
            } else {
                $(".regataos-help a").css("border-left", "4px solid #2a2f35")
            }

            if ((iframe_url.indexOf("regataos.forumeiros.com") > -1) == "1") {
		        $(".regataos-community a").css("border-left", "4px solid #0085e4")
                $(".return-sidebar2").css("display", "none");
                $(".return-sidebar").css("display", "flex");
            } else {
                $(".regataos-community a").css("border-left", "4px solid #2a2f35")
            }

        } else {
            if ((iframe_url.indexOf("solutions.html") > -1) == "1") {
                $(".solutions a").css("border-left", "4px solid #0085e4")
                $(".return-sidebar2").css("display", "flex");
                $(".return-sidebar").css("display", "none");
            } else {
                $(".solutions a").css("border-left", "4px solid #e5e5e5")
            }

            if ((iframe_url.indexOf("suporte.regataos.com.br") > -1) == "1") {
		        $(".regataos-help a").css("border-left", "4px solid #0085e4")
                $(".return-sidebar2").css("display", "none");
                $(".return-sidebar").css("display", "flex");
            } else {
                $(".regataos-help a").css("border-left", "4px solid #e5e5e5")
            }

            if ((iframe_url.indexOf("regataos.forumeiros.com") > -1) == "1") {
		        $(".regataos-community a").css("border-left", "4px solid #0085e4")
                $(".return-sidebar2").css("display", "none");
                $(".return-sidebar").css("display", "flex");
            } else {
                $(".regataos-community a").css("border-left", "4px solid #e5e5e5")
            }
        }
    return;
    }
    });
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
        check_theme();

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
