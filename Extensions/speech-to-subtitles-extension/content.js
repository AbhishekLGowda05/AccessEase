chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startTranscription") {
      const audioElements = document.querySelectorAll('audio, video');
  
      audioElements.forEach((element) => {
        if (!element.paused) {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          let sourceNode = audioContext.createMediaElementSource(element);
          const analyser = audioContext.createAnalyser();
          sourceNode.connect(analyser);
          analyser.connect(audioContext.destination);
  
          // Capture audio data
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
  
          function captureAudio() {
            analyser.getByteFrequencyData(dataArray);
            
            chrome.runtime.sendMessage({
              action: "processAudioChunk",
              audioBuffer: dataArray
            });
  
            requestAnimationFrame(captureAudio);
          }
  
          captureAudio(); // Start capturing the audio
        }
      });
    }
  });
  
  
  
  
  