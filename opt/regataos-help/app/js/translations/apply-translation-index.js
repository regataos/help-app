function applyTranslation() {
    let data = fs.readFileSync(selectTranslationFile(), "utf8");
    data = JSON.parse(data);

    document.querySelector("title").innerHTML = data.index.windowTitle;

    document.querySelector("#return-on img").title = data.index.sideBar.backButton;

    document.querySelector(".show-sidebar img").title = data.index.sideBar.showMenu;
    document.querySelector(".hide-sidebar img").title = data.index.sideBar.hideMenu;

    document.querySelector("#option-solutions img").title = data.index.sideBar.toolsButton;
    document.querySelector("#option-solutions P").innerHTML = data.index.sideBar.toolsButton;

    document.querySelector("#option-regataoshelp img").title = data.index.sideBar.tipsTutorials;
    document.querySelector("#option-regataoshelp p").innerHTML = data.index.sideBar.tipsTutorials;

    document.querySelector("#option-forum img").title = data.index.sideBar.forum;
    document.querySelector("#option-forum p").innerHTML = data.index.sideBar.forum;
}
applyTranslation();
