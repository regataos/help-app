// Apply in-app translation based on user's language settings.

// Apply text translations in the app
function applyTranslation() {
    const fs = require('fs');

    let data = fs.readFileSync(selectTranslationFile(), "utf8");
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
        // Home page
        //Title and descriptive texts
        const homeTitle = document.querySelector(".h1");
        homeTitle.innerHTML = data[i].homePage.title;

        const homeDescription = document.querySelector(".h2-description");
        homeDescription.innerHTML = data[i].homePage.description;

        const homeCommunityText = document.getElementById("ask-community");
        homeCommunityText.innerHTML = data[i].homePage.communityText;

        //Option fix network
        const networkTitle = document.querySelector(".network-problems");
        networkTitle.innerHTML = data[i].homePage.networkOption.title;

        const networkText = document.querySelector(".network-problems-desc");
        networkText.innerHTML = data[i].homePage.networkOption.text;

        const networkButton = document.querySelector(".rede-botao-off");
        networkButton.innerHTML = data[i].homePage.networkOption.button;

        //Option to update repo manually
        const repoTitle = document.querySelector(".update-repos");
        repoTitle.innerHTML = data[i].homePage.repoOption.title;

        const repoText = document.querySelector(".update-repos-desc");
        repoText.innerHTML = data[i].homePage.repoOption.text;

        const repoButton = document.querySelector(".repo-botao-on");
        repoButton.innerHTML = data[i].homePage.repoOption.button;

        //Option to restore default configuration
        const restoreTitle = document.querySelector(".restore-configs");
        restoreTitle.innerHTML = data[i].homePage.restoreOption.title;

        const restoreText = document.querySelector(".restore-configs-desc");
        restoreText.innerHTML = data[i].homePage.restoreOption.text;

        const restoreButton = document.querySelector(".restore-botao");
        restoreButton.innerHTML = data[i].homePage.restoreOption.button;

        //Option to get hardware information
        const infoTitle = document.querySelector(".info-configs");
        infoTitle.innerHTML = data[i].homePage.infoOption.title;

        const infoText = document.querySelector(".info-configs-desc");
        infoText.innerHTML = data[i].homePage.infoOption.text;

        const infoButton = document.querySelector(".info-botao");
        infoButton.innerHTML = data[i].homePage.infoOption.button;
    }
}
applyTranslation();
