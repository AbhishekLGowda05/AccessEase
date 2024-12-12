let isNarrating = false;
let currentIndex = 0;
let utterance = null;

document.getElementById("narrationButton").addEventListener("click", () => {
  // Check if narration is already running
  if (!isNarrating) {
    // Start Narration
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          func: getMainContent, // Modified function to get main content
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            const mainText = results[0].result;
            startNarration(mainText);
          } else {
            alert("Unable to extract main content.");
          }
        }
      );
    });
  } else {
    // Stop Narration
    stopNarration();
  }
});

// Function to extract main content
function getMainContent() {
  // Target common elements for the main content
  const mainElement = document.querySelector("main") || // Look for <main> tag
    document.querySelector("article") || // Look for <article> tag
    document.querySelector("[role='main']") || // Look for aria-role main
    document.getElementById("main") || // Look for #main
    document.querySelector(".main-content"); // Look for .main-content class

  if (mainElement) {
    return mainElement.innerText.trim(); // Extract and return text from the main content
  }

  // Fallback: Return all text if main content cannot be found
  return document.body.innerText.trim();
}

function startNarration(text) {
  if (utterance) {
    speechSynthesis.cancel(); // Cancel any previous utterance
  }

  // Create a new utterance
  utterance = new SpeechSynthesisUtterance();
  utterance.text = text.slice(currentIndex);
  utterance.rate = 0.8; // Set slower narration speed
  utterance.voice = speechSynthesis.getVoices().find((voice) => voice.lang === "en-US"); // Optional: Set a voice

  // Save the current position when paused
  utterance.onboundary = (event) => {
    currentIndex += event.charIndex;
  };

  utterance.onend = () => {
    isNarrating = false;
    document.getElementById("narrationButton").textContent = "Start Narration";
  };

  // Start speaking
  speechSynthesis.speak(utterance);
  isNarrating = true;
  document.getElementById("narrationButton").textContent = "Stop Narration";
}

function stopNarration() {
  speechSynthesis.cancel(); // Stop the narration
  isNarrating = false;
  document.getElementById("narrationButton").textContent = "Resume Narration";
}
  
  
  


  
  

  