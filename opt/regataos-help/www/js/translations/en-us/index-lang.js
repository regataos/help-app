// English language translation
$(document).ready(function() {
	// Window title
	$("title").text("Regata OS Support");
	// Title
	$(".h1").text("Do you need help with Regata OS?");
	// Description
	$(".h2").html("This is the Regata OS troubleshooting center.</br>"+
	"We have separated some options here that can help you solve some problems.</br>");

	// Side bar
	//Back button and more
	$(".return-sidebar img").attr({title:"Return"});
	$(".hide-sidebar img").attr({title:"Icons only"});
	$(".show-sidebar img").attr({title:"Icons and texts"});
	//Solutions
	$(".solutions p").text("Ready solutions");
	$(".solutions img").attr({title:"Ready solutions"});
	//Regata OS Help
	$(".regataos-help p").text("Tips and tutorials");
	$(".regataos-help img").attr({title:"Tips and tutorials"});
	//Community
	$(".regataos-community p").text("Community");
	$(".regataos-community img").attr({title:"Community"});

	// Button options
	//Network problems
	$(".network-problems").html("Troubleshoot network</br>problems");
	$(".network-problems-desc").text("If you are having problems with your internet connection, this option is recommended for you.");
	$(".rede-botao-off").text("Start now");
	//Update repos
	$(".update-repos").html("Update software repositories</br>manually");
	$(".update-repos-desc").text("Update software repositories manually. This can help troubleshoot problems.");
	$(".repo-botao-on").text("Update repositories");
	//Restore configs
	$(".restore-configs").html("Restore the default settings</br>of the graphical environment");
	$(".restore-configs-desc").text("Restore the default settings of the graphical environment. You will need to restart.");
	$(".restore-botao").text("Restore settings");
	//Hardware information
	$(".info-configs").html("Get detailed hardware information");
	$(".info-configs-desc").text("A text file will be created in your personal folder with important information about the hardware.");
	$(".info-botao").text("Hardware information");
});
