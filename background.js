const CONTEXT_MENU_ID = 'sarcastic-copy';

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: CONTEXT_MENU_ID,
        title: "Sarcastic Copy '%s'", 
        contexts:["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log(info);
    if (info.menuItemId === CONTEXT_MENU_ID) {
        // split highlighted text into char array for manipulation
        var selectedTextArray = info.selectionText.toLowerCase().split('');
        
        // capitalize every other letter
        for(var i = 1; i < selectedTextArray.length; i+=2) {
            // always have lowercase 'i'
            if(selectedTextArray[i] !== 'i') {
                selectedTextArray[i] = selectedTextArray[i].toUpperCase();
            }
        }
        // make it back into a string
        var sarcasticText = selectedTextArray.join('');

        chrome.tabs.query({ "active": true, "currentWindow": true}, function (tabs) {
            console.log(sarcasticText);
            chrome.tabs.sendMessage(tabs[0].id, { sarcasticText });
        });
    }
});