chrome.runtime.onMessage.addListener(function(message, sender, callback) {
    const { sarcasticText } = message;

    if (sarcasticText) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(sarcasticText);
        } else {
            // legacy support
            var copyFrom = document.createElement("textarea");
            copyFrom.textContent = sarcasticText;
            document.body.appendChild(copyFrom);
            copyFrom.select();

            document.execCommand('copy');

            document.body.removeChild(copyFrom);
        }
    }
});