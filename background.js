// // Global variable to keep track of whether the extension is enabled
// let isExtensionOn = true;
//
// // Retrieve the extension state from storage on startup
// chrome.storage.sync.get('isExtensionOn', function(data) {
//   if (typeof data.isExtensionOn !== 'undefined') {
//     isExtensionOn = data.isExtensionOn;
//   }
// });
//
// // Listen for messages from the popup or content script
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log("Received message:", request);
//   if (request.action === "toggleExtension") {
//     isExtensionOn = !isExtensionOn;
//     console.log("Extension state:", isExtensionOn);
//
//     // Store the updated state in storage
//     chrome.storage.sync.set({isExtensionOn: isExtensionOn}, function() {
//       console.log('Extension state saved to storage');
//     });
//   } else if (request.action === "modifyPrice" && isExtensionOn) {
//     // Get the active tab
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       // Send a message to the content script of the active tab
//       chrome.tabs.sendMessage(tabs[0].id, { message: "modify_price" });
//       console.log("Sent message to content script");
//     });
//   }
// });

// Global variable to keep track of whether the extension is enabled
let isExtensionOn = true;

// Listen for messages from the popup or content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Received message:", request);
  if (request.action === "click") {
    isExtensionOn = !isExtensionOn;
    console.log("Extension state:", isExtensionOn);
  }
});

// Handle messages from the content script
function handleMessage(request, sender, sendResponse) {
  console.log("Received message from content script:", request);
  if (request.action === "modifyPrice" && isExtensionOn) {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Send a message to the content script of the active tab
      chrome.tabs.sendMessage(tabs[0].id, { message: "modify_price" });
      console.log("Sent message to content script");
    });
  }
}

chrome.runtime.onMessage.addListener(handleMessage);