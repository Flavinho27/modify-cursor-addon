function changeCursor(c) {
    let children = c.childNodes;
    // on récupère la source du nouveau curseur
    let pathToNewCursor = children[1].src;
    let newValueForCursor = "url("+pathToNewCursor+"), auto";
    document.body.style.cursor = newValueForCursor;
}

function listenForClicks() {
    document.addEventListener("click", (e) => {
        let url;

        function modifyCursor(tabs) {
            tabs.forEach(tab => {
                browser.tabs.sendMessage(tab.id, {
                    command: "modify-cursor",
                    cursorURL: url
                });
            });
        };

        // si on clique sur la div
        if (e.target.classList.contains("box")) {
            let children = e.target.childNodes;
            url = children[1].src;
            browser.tabs.query({currentWindow: true})
                .then(modifyCursor)
                .catch(reportError);
        } // si on clique sur l'image du curseur
        else if (e.target.classList.contains("cursor")) {
            url = e.target.src;
            browser.tabs.query({currentWindow: true})
                .then(modifyCursor)
                .catch(reportError);
        }
    });
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
 browser.tabs.executeScript({file: "/content_scripts/modify-cursor.js", allFrames: true})
    .then(listenForClicks)
