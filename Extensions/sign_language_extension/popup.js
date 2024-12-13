const videoInput = document.getElementById('videoInput');
const videoPlayer = document.getElementById('videoPlayer');
const subtitlesDiv = document.getElementById('subtitles');

// Hardcoded subtitles for the video (timestamp in seconds)
const subtitles = [
  { time: 0.3, text: "Hello" },
  { time: 1.7, text: "" },
  { time: 2.2, text: "Hello" },
  { time: 4.2, text: "See you later!" },
  { time: 5.2, text: "" },
  { time: 5.9, text: "See you later!" }
];

// Load selected video
videoInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const videoURL = URL.createObjectURL(file);
    videoPlayer.src = videoURL;
    subtitlesDiv.textContent = ''; // Clear any previous subtitles
  }
});

// Display subtitles based on video time
videoPlayer.addEventListener('timeupdate', () => {
  const currentTime = videoPlayer.currentTime;

  // Find the subtitle that corresponds to the current time
  let currentSubtitle = '';
  for (let i = 0; i < subtitles.length; i++) {
    if (currentTime >= subtitles[i].time && (i === subtitles.length - 1 || currentTime < subtitles[i + 1].time)) {
      currentSubtitle = subtitles[i].text;
      break;
    }
  }

  // Update the subtitles display
  subtitlesDiv.textContent = currentSubtitle;
});
