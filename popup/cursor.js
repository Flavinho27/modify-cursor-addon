/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {
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
         * Log the error in the console
         * @param {Object} error the error
         */
        function reportQueryError(error) {
            console.error(`Could not modify-cursor: ${error}`);
        }

        /**
         * Get the active tab,
         * then call "modifyCursor()"
         */
        // if we click on the div
        if (e.target.classList.contains("box")) {
            let children = e.target.childNodes;
            url = children[1].src;
            browser.tabs.query({active: true, currentWindow: true})
                .then(modifyCursor)
                .catch(reportQueryError);
        } // if we click on the cursor image
        else if (e.target.classList.contains("cursor")) {
            url = e.target.src;
            browser.tabs.query({active: true, currentWindow: true})
                .then(modifyCursor)
                .catch(reportQueryError);
        }
    });
}

/**
 * There was an error executing the script.
 * Display the popup's error message.
 * @param {Object} error the error
 */
function reportExecuteScriptError(error) {
    console.error(`Failed to execute modify-cursor content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
 browser.tabs.executeScript({file: "/content_scripts/modify-cursor.js", allFrames: true})
    .then(listenForClicks)
    .catch(reportExecuteScriptError)
