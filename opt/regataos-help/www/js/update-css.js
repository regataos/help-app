// Check internet connection
function status_network() {
const fs = require('fs');
	fs.readFile('/tmp/apps-scripts/network-status.txt', (err, data) => {
	if (err) throw err;

	var data = data
	var on = "online"
	var off = "offline"

	var online = data.indexOf(on) > -1;
	var offline = data.indexOf(off) > -1;

	if (online == '1') {
		$(document).ready(function() {
			$("div.rede-icone-on").css("display", "block")
			$("div.rede-botao-on").css("display", "block")

			$("div.repo-icone-on").css("display", "block")
			$("div.repo-botao-on").css("display", "block")

			$("div.rede-icone-off").css("display", "none")
			$("div.rede-botao-off").css("display", "none")

			$("div.repo-icone-off").css("display", "none")
			$("div.repo-botao-off").css("display", "none")

			fs.readFile('/tmp/regataos-configs/config/plasma-localerc', (err, locale) => {
				if (err) throw err;
	
				var locale = locale
				var pt_BR = "pt_BR"
				var language = locale.indexOf(pt_BR) > -1;

				if (language == '1') {
					$(document).ready(function() {
					$(".regataos-help").css("display", "block")
					$(".regataos-community").css("display", "block")
					});
				}
			});
		});
	} else if (offline == '1') {
		$(document).ready(function() {
			$("div.rede-icone-on").css("display", "none")
			$("div.rede-botao-on").css("display", "none")

			$("div.repo-icone-on").css("display", "none")
			$("div.repo-botao-on").css("display", "none")

			$("div.rede-icone-off").css("display", "block")
			$("div.rede-botao-off").css("display", "block")

			$("div.repo-icone-off").css("display", "block")
			$("div.repo-botao-off").css("display", "block")

			$(".regataos-help").css("display", "none")
			$(".regataos-community").css("display", "none")
		});
	}

	});
}

setInterval(function () {
	status_network();
}, 100);
