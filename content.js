// Initialize the page editor
function initializePageEditor() {
  if (!document.body.hasAttribute('data-page-editor-initialized')) {
    document.body.setAttribute('data-page-editor-initialized', 'true');
    
    // Add the click event listener to prevent focus loss
    document.addEventListener('click', function(e) {
      if (document.designMode === 'on') {
        e.stopPropagation();
      }
    }, true);

    // Listen for messages from the popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'toggleEditMode') {
        document.designMode = request.enabled ? 'on' : 'off';
        document.body.setAttribute('data-page-editor-state', request.enabled ? 'on' : 'off');
        sendResponse({ success: true });
      } else if (request.action === 'getState') {
        sendResponse({ designMode: document.designMode });
      }
      return true; // Required for async response
    });
  }
}

// Run initialization
initializePageEditor();