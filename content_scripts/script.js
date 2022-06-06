/**
 * Update the cursor of the page
 * @param {Object} item the item with the cursor key
 */
function onGot(item) {
    document.body.style.cursor = item.cursor.cursorValue;
}

/**
 * Handle the error
 * @param {Object} error the error
 */
function onError(error) {
    console.log(`Error: ${error}`);
}

/**
 * Get the last cursor to update the current cursor
 */
function getCurrentCursor() {
    let getCurrentCursor = browser.storage.local.get("cursor");
    getCurrentCursor.then(onGot, onError);
}

/**
 * When the local storage change (storage.local),
 * update the cursor
 * @param {Object} changes 
 * @param {String} areaName 
 */
function getCurrentCursorOnChanged(changes, areaName) {
    getCurrentCursor();
}

getCurrentCursor();
browser.storage.onChanged.addListener(getCurrentCursorOnChanged);
