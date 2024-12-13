// Hardcoded subtitles data
const subtitles = [
  { start: 1.28, end: 2.13, text: "Trying." },
  { start: 2.15, end: 4.29, text: "Spray blush as I'm about to go out is risky." },
  { start: 5.01, end: 6.24, text: "I hope it doesn't ruin my makeup." },
  { start: 7.08, end: 11.11, text: "Oh, wait. Hold on." },
  { start: 11.24, end: 15.16, text: "It's really hard to control the placement of this." },
  { start: 17.24, end: 19.01, text: "We need to fix this." },
  { start: 19.15, end: 21.29, text: "We're just gonna blend this out. Okay, okay." },
  { start: 22.01, end: 24.23, text: "We have hope. Okay, let me try to do less on this side." },
  { start: 25.05, end: 27.04, text: "A little bit more." },
  { start: 28.12, end: 29.22, text: "Oh, that's much better." },
  { start: 29.24, end: 31.11, text: "Actually, kind of pretty. Last one." },
  { start: 31.13, end: 35.24, text: "Fingers crossed. You know, I like blush on my nose, so." },
  { start: 38.19, end: 40.06, text: "I'm gonna blend before we panic." },
  { start: 40.08, end: 42.16, text: "This did not turn out as bad as I thought it would." },
  { start: 42.26, end: 46.04, text: "This was fun, but I think I'm gonna stick to my regular blush." }
];

// Function to display subtitles based on time
function displaySubtitles() {
  const subtitleBox = document.getElementById("subtitle-box");
  subtitleBox.style.display = "block"; // Show subtitle box

  const startTime = Date.now(); // Track the time when subtitles start

  const interval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000; // Elapsed time in seconds

    // Find the current subtitle based on elapsed time
    const currentSubtitle = subtitles.find(
      (subtitle) => elapsed >= subtitle.start && elapsed <= subtitle.end
    );

    if (currentSubtitle) {
      subtitleBox.textContent = currentSubtitle.text; // Show subtitle
    } else {
      subtitleBox.textContent = ""; // Clear subtitle if no match
    }

    // Stop the interval when all subtitles have been shown
    if (elapsed > subtitles[subtitles.length - 1].end) {
      clearInterval(interval);
      subtitleBox.textContent = "Subtitles ended."; // End message
    }
  }, 500); // Check every 500ms
}

// Event listener for the "Start Subtitles" button
document.getElementById("start-btn").addEventListener("click", () => {
  displaySubtitles();
});
  
  
  
  
  