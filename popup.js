document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('designModeToggle');

  // Get the current tab and check its design mode status
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs || !tabs[0]) {
      console.error('No active tab found');
      return;
    }

    // Query the content script for current state
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getState' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError);
        return;
      }
      toggle.checked = response && response.designMode === 'on';
    });
  });

  // Add click event listener to toggle design mode
  toggle.addEventListener('change', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (!tabs || !tabs[0]) {
        console.error('No active tab found');
        return;
      }

      // Send toggle message to content script
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleEditMode',
        enabled: toggle.checked
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
        }
      });
    });
  });
});