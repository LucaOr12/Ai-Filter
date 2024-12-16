let extensionEnabled = true;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'disable') {
        extensionEnabled = false;
    } else if (message.action === 'enable') {
        extensionEnabled = true;
    }
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (!extensionEnabled) return;

    const url = new URL(details.url);

    if (url.hostname === "www.google.com" && url.searchParams.get("q")) {
        const query = url.searchParams.get("q");

        const staticFilters = "-ai -prompt before:2021";

        if (!query.includes("-ai") && !query.includes("-prompt") && !query.includes("before:2021")) {
            url.searchParams.set("q", `${query} ${staticFilters}`);
            chrome.tabs.update(details.tabId, { url: url.toString() });
        }
    }
}, { url: [{ hostEquals: "www.google.com" }] });