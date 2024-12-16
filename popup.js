document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the extension state
    chrome.storage.local.get(['extensionEnabled'], function (result) {
        const isEnabled = result.extensionEnabled !== false;

        // Set the button text and status text based on the extension's state
        document.getElementById('toggleExtension').textContent = isEnabled
            ? 'Disable Extension'
            : 'Enable Extension';

        const statusText = document.getElementById('statusText');
        statusText.textContent = isEnabled ? 'Extension Active' : 'Extension Disabled';
        statusText.className = isEnabled ? 'status enabled' : 'status disabled';

        // Add a click listener to toggle the extension state
        document.getElementById('toggleExtension').addEventListener('click', function () {
            const newState = !isEnabled;

            // Save the new state
            chrome.storage.local.set({ extensionEnabled: newState }, function () {
                // Update the button text and status text based on the new state
                document.getElementById('toggleExtension').textContent = newState
                    ? 'Disable Extension'
                    : 'Enable Extension';
                statusText.textContent = newState ? 'Extension Active' : 'Extension Disabled';
                statusText.className = newState ? 'status enabled' : 'status disabled';

                // Enable or disable the filter globally
                chrome.runtime.sendMessage({ action: newState ? 'enable' : 'disable' });
            });
        });
    });
});