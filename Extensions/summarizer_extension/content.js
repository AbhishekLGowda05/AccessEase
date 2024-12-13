document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 't') {
      fetch(chrome.runtime.getURL('transcript.json'))
        .then(response => response.json())
        .then(data => {
          const videoId = 'OoGfRH-vq4w';
          const transcript = data[videoId];
  
          const transcriptBox = document.createElement('div');
          transcriptBox.style.position = 'fixed';
          transcriptBox.style.top = '10px';
          transcriptBox.style.right = '10px';
          transcriptBox.style.width = '400px';
          transcriptBox.style.height = '300px';
          transcriptBox.style.backgroundColor = 'white';
          transcriptBox.style.border = '1px solid #ccc';
          transcriptBox.style.padding = '10px';
          transcriptBox.style.overflowY = 'scroll';
          transcriptBox.style.zIndex = '9999';
          transcriptBox.innerText = transcript;
  
          const closeButton = document.createElement('button');
          closeButton.innerText = 'Close';
          closeButton.style.marginTop = '10px';
          closeButton.onclick = () => document.body.removeChild(transcriptBox);
  
          transcriptBox.appendChild(closeButton);
          document.body.appendChild(transcriptBox);
        })
        .catch(error => {
          console.error('Error loading transcript:', error);
        });
    }
  });