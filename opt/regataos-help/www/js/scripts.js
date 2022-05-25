// Adjust the appearance of the Regatta OS Help
//Capture iframe and check the url of the app page
const forSupportTimeout = setTimeout(forSupport, 100);

function forSupport() {
    const columnCenterInner = document.getElementById("column-center-inner")
    const columnCenterInnerExists = document.body.contains(columnCenterInner)

    if (columnCenterInnerExists) {
        columnCenterInner.style.paddingTop = "0px";
    }

    document.getElementById("top-bar").style.display = "none";
    document.getElementById("top-bar2").style.display = "none";
    document.getElementById("block1").style.paddingTop = "100px";
    document.getElementById("content").style.marginTop = "0px";
}
