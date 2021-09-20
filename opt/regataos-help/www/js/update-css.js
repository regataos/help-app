// Check internet connection
function status_network() {
if (navigator.onLine) {
	$("div.rede-icone-on").css("display", "block")
	$("div.rede-botao-on").css("display", "block")
	$("div.repo-icone-on").css("display", "block")
	$("div.repo-botao-on").css("display", "block")

	$("div.rede-icone-off").css("display", "none")
	$("div.repo-icone-off").css("display", "none")
	$("div.repo-botao-off").css("display", "none")

	var command_line = "echo $LANG";
	const exec = require('child_process').exec;
	exec(command_line, (error, stdout, stderr) => {
	if (stdout) {
		if ((stdout.indexOf("pt_BR") > -1) == "1") {
			$(".regataos-help").css("display", "block")
			$(".regataos-community").css("display", "block")

		} else if ((stdout.indexOf("pt_PT") > -1) == "1") {
			$(".regataos-help").css("display", "block")
			$(".regataos-community").css("display", "block")

		} else {
			$(".regataos-help").css("display", "none")
			$(".regataos-community").css("display", "none")
		}
	}
	});

} else {
	$("div.rede-icone-on").css("display", "none")
	$("div.rede-botao-on").css("display", "none")
	$("div.repo-icone-on").css("display", "none")
	$("div.repo-botao-on").css("display", "none")

	$("div.rede-icone-off").css("display", "block")
	$("div.repo-icone-off").css("display", "block")
	$("div.repo-botao-off").css("display", "block")

	$(".regataos-help").css("display", "none")
	$(".regataos-community").css("display", "none")
}
}
status_network();

setInterval(function () {
	status_network();
}, 1000);
