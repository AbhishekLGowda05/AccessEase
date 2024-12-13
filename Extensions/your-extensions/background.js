chrome.runtime.onInstalled.addListener(() => {
  console.log("Text to Speech Narrator Extension Installed");

  // Set the default shortcut or use the saved one
  const defaultShortcut = "Command+Option+Shift+R"; // Hardcoded default
  chrome.storage.sync.get("userShortcut", (data) => {
    const shortcut = data.userShortcut || defaultShortcut; // Get saved shortcut or use default

    // Register the shortcut with chrome.commands
    chrome.commands.update({
      name: "_execute_action",
      shortcut: shortcut,
    });
  });
});

// Listen for the shortcut command
chrome.commands.onCommand.addListener((command) => {
  if (command === "_execute_action") {
    // Get the active tab and execute the script to get text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: getTextFromPage
      });
    });
  }
});

// Function to execute text-to-speech
function getTextFromPage() {
  chrome.runtime.sendMessage({ action: "getText" }, (response) => {
    if (response.text) {
      const speech = new SpeechSynthesisUtterance(response.text);
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    }
  });
}
  
  
  

  