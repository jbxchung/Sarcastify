chrome.contextMenus.create({
    id: "sarcastic-copy",
    title: "Sarcastic Copy '%s'", 
    contexts:["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "sarcastic-copy") {
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

        // create source element to copy to clipboard from
        var copyFrom = document.createElement("textarea");
        copyFrom.textContent = sarcasticText;
        document.body.appendChild(copyFrom);
        copyFrom.select();

        // copy to clipboard
        document.execCommand('copy');

        // remove copy source element
        document.body.removeChild(copyFrom);
    }
});