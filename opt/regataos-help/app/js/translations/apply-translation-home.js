function applyTranslation() {
    let data = fs.readFileSync(selectTranslationFile(), "utf8");
    data = JSON.parse(data);

    document.querySelector(".h1").innerHTML = data.homePage.title;
    document.querySelector(".h2-description").innerHTML = data.homePage.description;
    document.getElementById("ask-community").innerHTML = data.homePage.communityText;

    document.querySelector(".network-problems").innerHTML = data.homePage.networkOption.title;
    document.querySelector(".network-problems-desc").innerHTML = data.homePage.networkOption.text;
    document.querySelector(".rede-botao-off").innerHTML = data.homePage.networkOption.button;

    document.querySelector(".update-repos").innerHTML = data.homePage.repoOption.title;
    document.querySelector(".update-repos-desc").innerHTML = data.homePage.repoOption.text;
    document.querySelector(".repo-botao-on").innerHTML = data.homePage.repoOption.button;

    document.querySelector(".restore-configs").innerHTML = data.homePage.restoreOption.title;
    document.querySelector(".restore-configs-desc").innerHTML = data.homePage.restoreOption.text;
    document.querySelector(".restore-botao").innerHTML = data.homePage.restoreOption.button;

    document.querySelector(".info-configs").innerHTML = data.homePage.infoOption.title;
    document.querySelector(".info-configs-desc").innerHTML = data.homePage.infoOption.text;
    document.querySelector(".info-botao").innerHTML = data.homePage.infoOption.button;
}
applyTranslation();
