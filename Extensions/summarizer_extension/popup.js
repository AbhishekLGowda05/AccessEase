document.getElementById('showTranscript').addEventListener('click', () => {
    console.log('Show Transcript button clicked');
  
    fetch(chrome.runtime.getURL('transcript.json'))
      .then(response => {
        console.log('Fetching transcript.json...');
        return response.json();
      })
      .then(data => {
        console.log('Data fetched:', data);
  
        const videoId = 'OoGfRH-vq4w';
        if (data[videoId]) {
          document.getElementById('transcriptOutput').textContent = data[videoId];
        } else {
          document.getElementById('transcriptOutput').textContent = 'Transcript not found for this video.';
        }
      })
      .catch(error => {
        console.error('Error loading transcript:', error);
        document.getElementById('transcriptOutput').textContent = 'Error loading transcript.';
      });
  });
  
  document.getElementById('copyTranscript').addEventListener('click', () => {
    const transcript = document.getElementById('transcriptOutput').textContent;
    navigator.clipboard.writeText(transcript).then(() => {
      alert('Transcript copied to clipboard!');
});
  });