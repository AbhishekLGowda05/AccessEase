document.getElementById("start-conversion").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "startTranscription" });
    document.getElementById("stop-conversion").disabled = false;
    document.getElementById("start-conversion").disabled = true;
  });
  
  document.getElementById("stop-conversion").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "stopTranscription" });
    document.getElementById("stop-conversion").disabled = true;
    document.getElementById("start-conversion").disabled = false;
  });
  
  // Update transcription display
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "updateTranscription") {
      document.getElementById("transcription").innerText = message.text;
    }
  });
  
  
  
  
  