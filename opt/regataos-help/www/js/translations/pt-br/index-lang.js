// Portuguese language translation
$(document).ready(function() {
	// Window title
	$("title").text("Suporte do Regata OS");
	// Title
	$(".h1").text("Você precisa de ajuda com o Regata OS?");
	// Description
	$(".h2").html("Este é o centro de solução de problemas do Regata OS.</br>"+
	"Separamos aqui algumas opções que podem lhe ajudar a resolver alguns problemas.</br>");

	// Side bar
	//Back button and more
	$(".return-sidebar img").attr({title:"Voltar"});
	$(".hide-sidebar img").attr({title:"Apenas ícones"});
	$(".show-sidebar img").attr({title:"Ícones e textos"});
	//Solutions
	$(".solutions p").text("Soluções prontas");
	$(".solutions img").attr({title:"Soluções prontas"});
	//Regata OS Help
	$(".regataos-help p").text("Dicas e tutoriais");
	$(".regataos-help img").attr({title:"Dicas e tutoriais"});
	//Community
	$(".regataos-community p").text("Comunidade");
	$(".regataos-community img").attr({title:"Comunidade"});

	// Button options
	//Network problems
	$(".network-problems").html("Solucionar problemas</br>com a rede");
	$(".network-problems-desc").text("Se você está tendo problemas com a conexão com a internet, esta opção é a recomendada para você.");
	$(".rede-botao-off").text("Iniciar agora");
	$(".rede-botao-off").css("width", "120px");
	//Update repos
	$(".update-repos").html("Atualizar os repositórios</br>de software manualmente");
	$(".update-repos-desc").text("Atualize os repositórios de software manualmente. Isso pode ajudar a solucionar problemas.");
	$(".repo-botao-on").text("Atualizar repositórios");
	$(".repo-botao-on").css("width", "190px");
	//Restore configs
	$(".restore-configs").html("Restaurar as configurações</br>padrão do ambiente gráfico");
	$(".restore-configs-desc").text("Restaure as configurações padrão do ambiente gráfico do Regata OS. Será necessário reiniciar.");
	$(".restore-botao").text("Restaurar configurações");
	$(".restore-botao").css("width", "210px");
	//Hardware information
	$(".info-configs").html("Obter informações detalhadas sobre o hardware");
	$(".info-configs-desc").text("Um arquivo de texto será criado na sua pasta pessoal com informações importantes sobre o hardware.");
	$(".info-botao").text("Informações do hardware");
	$(".info-botao").css("width", "220px");
});
