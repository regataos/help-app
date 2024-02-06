// Apply in-app translation based on user's language settings.

// Apply text translations in the app
function applyTranslation() {
    const fs = require('fs');

    let data = fs.readFileSync(selectTranslationFile(), "utf8");
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
        // Window title
        const windowTitle = document.querySelector("title");
        windowTitle.innerHTML = data[i].index.windowTitle;

        // Side bar
        //Back button
        const backButton = document.querySelector("#return-on img");
        backButton.title = data[i].index.sideBar.backButton;

        //Show and hide the menu
        const showMenu = document.querySelector(".show-sidebar img");
        showMenu.title = data[i].index.sideBar.showMenu;

        const hideMenu = document.querySelector(".hide-sidebar img");
        hideMenu.title = data[i].index.sideBar.hideMenu;

        //Menu
        const toolsButton = document.querySelector("#option-solutions img");
        toolsButton.title = data[i].index.sideBar.toolsButton;

        const toolsButtonText = document.querySelector("#option-solutions P");
        toolsButtonText.innerHTML = data[i].index.sideBar.toolsButton;

        const tipsTutorials = document.querySelector("#option-regataoshelp img");
        tipsTutorials.title = data[i].index.sideBar.tipsTutorials;

        const tipsTutorialsText = document.querySelector("#option-regataoshelp p");
        tipsTutorialsText.innerHTML = data[i].index.sideBar.tipsTutorials;

        const forum = document.querySelector("#option-forum img");
        forum.title = data[i].index.sideBar.forum;

        const forumText = document.querySelector("#option-forum p");
        forumText.innerHTML = data[i].index.sideBar.forum;
    }
}
applyTranslation();
