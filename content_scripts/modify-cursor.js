(function() {

    /**
     * Change the cursor and save it
     * @param {String} cursorURL 
     */
    function changeCursor(cursorURL) {
        let newValueForCursor = "url("+cursorURL+"), auto";
        document.body.style.cursor = newValueForCursor;
        saveCursor(newValueForCursor);
    }

    /**
     * Save the cursor
     * @param {String} cursorValue 
     */
    function saveCursor(cursorValue) {
        let cursor = {
            "cursorValue": cursorValue
        };
        browser.storage.local.set({cursor});
    }

    /**
     * Wait a message of the cursor script
     */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "modify-cursor") {
            changeCursor(message.cursorURL);
        }
    });
})();