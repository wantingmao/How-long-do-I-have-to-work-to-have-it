// popup.js
window.onload = function () {
  // Add event listener to the input field
  document.getElementById('hourlyWage').addEventListener('input', function () {
    // Get the hourly wage from the input field
    let hourlyWage = parseFloat(this.value);

    // Save the hourly wage to storage
    chrome.storage.sync.set({ 'hourlyWage': hourlyWage });

    // Send a message to content.js to update the prices with the new hourly wage
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'updateWage', hourlyWage: hourlyWage });
    });
  });

  // Add event listener to the "Refresh" button
  document.getElementById('refreshButton').addEventListener('click', function () {
    // Refresh the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  });

  // Retrieve and display the saved hourly wage from storage when the popup is opened
  chrome.storage.sync.get(['hourlyWage'], function (result) {
    let savedHourlyWage = result.hourlyWage;
    if (!isNaN(savedHourlyWage)) {
      document.getElementById('hourlyWage').value = savedHourlyWage;
    }
  });
};
