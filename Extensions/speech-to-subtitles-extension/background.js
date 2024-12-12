chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "startTranscription") {
        try {
            // Access the microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream); // Capture from microphone
            source.connect(analyser);
            analyser.connect(audioContext.destination);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            // Start capturing audio data
            function captureAudio() {
                analyser.getByteFrequencyData(dataArray);
                
                // Send audio data to background for processing
                chrome.runtime.sendMessage({
                    action: "processAudioChunk",
                    audioBuffer: dataArray
                });

                requestAnimationFrame(captureAudio);
            }

            captureAudio(); // Start capturing

        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    }

    if (message.action === "processAudioChunk") {
        try {
            const audioBuffer = message.audioBuffer;

            // Convert the audioBuffer to raw audio or PCM format (WAV, MP3, or other)
            // Here, we'll assume that audioBuffer is raw audio and send it directly.
            const audioBlob = new Blob([audioBuffer], { type: 'audio/wav' });

            // Send audio data to Hugging Face API
            const response = await fetch("https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h", {
                method: "POST",
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "audio/wav",
                },
                body: audioBlob,
            });

            const result = await response.json();
            if (result.text) {
                chrome.runtime.sendMessage({
                    action: "updateTranscription",
                    text: result.text,
                });
            } else {
                console.error("Error:", result);
            }
        } catch (error) {
            console.error("Error processing audio chunk:", error);
        }
    }
});
