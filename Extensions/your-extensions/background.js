chrome.runtime.onInstalled.addListener(() => {
  console.log("Text to Speech Narrator Extension Installed");

  // Get user-defined shortcut
  chrome.storage.sync.get("userShortcut", (data) => {
    const shortcut = data.userShortcut || "Ctrl+Shift+T"; // Default to Windows/Linux shortcut

    // Check if the user is on macOS and adjust shortcut if needed
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const finalShortcut = isMac ? shortcut.replace('Ctrl', 'Command') : shortcut;

    // Dynamically register the shortcut command for the user
    chrome.commands.update({
      name: "_execute_action",  // Name of the command (set by Chrome)
      shortcut: finalShortcut,
    });
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "_execute_action") {
    // Send message to content.js to get the page text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: getTextFromPage
      });
    });
  }
});

function getTextFromPage() {
  chrome.runtime.sendMessage({ action: "getText" }, (response) => {
    if (response.text) {
      // Start text-to-speech with the returned text
      const speech = new SpeechSynthesisUtterance(response.text);
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    }
  });
}
  
  
  

  