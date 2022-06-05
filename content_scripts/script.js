function onGot(item) {
    document.body.style.cursor = item.cursor.cursorValue;
}
  
function onError(error) {
    console.log(`Error: ${error}`);
}

function getCurrentCursor() {
    let getCurrentCursor = browser.storage.local.get("cursor");
    getCurrentCursor.then(onGot, onError);
}

function getCurrentCursorOnChanged(changes, areaName) {
    getCurrentCursor();
}

getCurrentCursor();
browser.storage.onChanged.addListener(getCurrentCursorOnChanged);
