(function() {

    function changeCursor(cursorURL) {
        let newValueForCursor = "url("+cursorURL+"), auto";
        document.body.style.cursor = newValueForCursor;
        saveCursor(newValueForCursor);
    }

    function saveCursor(cursorValue) {
        let cursor = {
            "cursorValue": cursorValue
        };
        browser.storage.local.set({cursor});
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "modify-cursor") {
            changeCursor(message.cursorURL);
        }
    });
})();