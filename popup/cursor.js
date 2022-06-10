const myCursors = document.querySelectorAll('.box');
const BtnReset = document.querySelector('.reset');

for (let i = 0; i < myCursors.length; i++) {
    const boxCursor = myCursors[i];
    boxCursor.addEventListener("click", () => {listenForClicks(boxCursor)});
}

BtnReset.addEventListener("click", () => {
    function resetCursor(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "reset"
        });
    };
    browser.tabs.query({active: true, currentWindow: true})
        .then(resetCursor)
});

let listenForClicks = (e) => {
    let url;

    /**
     * Send a "modify-cursor" message to the content script (modify-cursor.js)
     * in the active tab.
     * @param {Object} tabs tabs of the current window
     */
    function modifyCursor(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "modify-cursor",
            cursorURL: url
        });
    };

    /**
     * Get the active tab,
     * then call "modifyCursor()"
     */
    let children = e.childNodes;
    url = children[1].src;
    browser.tabs.query({active: true, currentWindow: true})
        .then(modifyCursor)
        .catch(reportQueryError);
};

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
 browser.tabs.executeScript({file: "/content_scripts/modify-cursor.js", allFrames: true})
