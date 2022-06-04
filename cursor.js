function changeCursor(c) {
    let children = c.childNodes;
    // on récupère la source du nouveau curseur
    let pathToNewCursor = children[1].src;
    let newValueForCursor = "url("+pathToNewCursor+"), auto";
    document.body.style.cursor = newValueForCursor;
}
