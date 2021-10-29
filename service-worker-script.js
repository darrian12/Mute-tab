function toggleMuteState(tabId)
{
    chrome.tabs.get(tabId, async(tab) => 
    {
        let muted = !tab.mutedInfo.muted;
        await chrome.tabs.update(tabId, { muted });
    });
}

function toggleIcon(tab)
{
    let isMuted = tab.mutedInfo.muted;
    chrome.action.setIcon(
        {
            "path":
            {
                "16": `/images/icons/${isMuted ? "sound" : "muted"}-16.png`,
                "48": `/images/icons/${isMuted ? "sound" : "muted"}-48.png`
            },
            "tabId": tab.id
        }
    );
    chrome.action.setTitle(
        {
            "title": `${isMuted ? "Mute" : "Unmute"} tab`,
            "tabId": tab.id
        }
    );
}

chrome.action.onClicked.addListener((tab) => 
{
    if (tab !== undefined)
    { 
        toggleMuteState(tab.id);
        toggleIcon(tab);
    }
});