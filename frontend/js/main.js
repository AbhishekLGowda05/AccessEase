console.log('Main script loaded.');

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    alert(`Login successful! `);
    // Redirect to the dashboard (placeholder)
    window.location.href = 'dashboard.html';
});

// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Attach event listener to the signup form
    document.getElementById('signupForm').addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission behavior

      // Retrieve form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const disability = document.getElementById('disability').value;
      const preferences = document.getElementById('preferences').value.trim();

      // Check if required fields are filled
      if (!name || !email || !disability) {
        alert('Please fill in all required fields.');
        return;
      }

      // Perform a basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Display success message
      alert(
        `Welcome, ${name}! Your account has been created.\nDisability: ${
          disability || 'None'
        }\nPreferences: ${preferences || 'None'}`
      );

      // Redirect to the login page after a short delay
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    });
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Form Submitted");

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    alert('Thank you for reaching out! We will get back to you soon.');
    e.target.reset();
});

// Filter Plugins Based on User Condition
document.getElementById('userCondition').addEventListener('change', function () {
    const selectedCondition = this.value;
    const plugins = document.querySelectorAll('.plugin-bubble');

    plugins.forEach((plugin) => {
      if (selectedCondition === 'all' || plugin.dataset.condition === selectedCondition) {
        plugin.style.display = 'block';
      } else {
        plugin.style.display = 'none';
      }
    });
});

// Handle plugin download
document.addEventListener('DOMContentLoaded', function() {
    // Select all download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');

    // Function to handle the download action
    function handleDownload(event) {
        // Prevent the default button click behavior
        event.preventDefault();

        // Get the closest parent with an ID, assuming this ID corresponds to the plugin name
        let pluginName = event.target.closest('.plugin-bubble').id;

        // Sanitize and format the plugin name to match your download route requirement
        pluginName = pluginName.replace('plugin', '').toLowerCase();

        // Redirect to the download route
        window.location.href = `/download/${pluginName}`;
    }

    // Attach the event listener to each download button
    downloadButtons.forEach(button => {
        button.addEventListener('click', handleDownload);
    });
});

// Function to handle shortcut input and saving
function setupShortcutHandler() {
  const setShortcutBtn = document.getElementById("set-shortcut-btn");
  const shortcutInput = document.getElementById("shortcut-input");
  const status = document.getElementById("status");

  // Default hardcoded shortcut (Ctrl+Shift+T or Command+Shift+T for macOS)
  const defaultShortcut = "Command+Option+Shift+R"; // Hardcoded default shortcut for text-to-speech

  // Set default shortcut in the input field (for user info)
  shortcutInput.value = defaultShortcut;

  // Handle saving the new shortcut
  setShortcutBtn.addEventListener("click", () => {
    const newShortcut = shortcutInput.value.trim();

    if (!newShortcut) {
      alert("Please enter a valid shortcut.");
      return;
    }

    // Save the new shortcut in storage
    chrome.storage.sync.set({ userShortcut: newShortcut }, () => {
      status.textContent = `Shortcut saved as: ${newShortcut}`;
      status.style.color = "green";

      // Update chrome commands with the new shortcut
      chrome.commands.update({
        name: "_execute_action",
        shortcut: newShortcut,
      });
      
      // Show confirmation popup
      alert("Shortcut saved successfully!");
    });
  });
}

// Initialize the shortcut handler when the popup loads
setupShortcutHandler();

// Check for browser support
if (!('webkitSpeechRecognition' in window)) {
  alert('Sorry, your browser does not support voice recognition.');
} else {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  // Start voice recognition
  document.getElementById('voiceCommandBtn').addEventListener('click', () => {
    recognition.start();
    alert('Voice recognition activated! Speak your command.');
  });

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

    // Command handling
    if (transcript.includes('home')) {
      window.location.href = 'index.html';
    } else if (transcript.includes('about')) {
      window.location.href = 'about.html';
    } else if (transcript.includes('contact')) {
      window.location.href = 'contact.html';
    } else if (transcript.includes('dashboard')) {
      window.location.href = 'dashboard.html';
    } else {
      alert(`Unrecognized command: "${transcript}"`);
    }
  };

  recognition.onerror = (event) => {
    alert(`Error occurred in recognition: ${event.error}`);
  };

  recognition.onend = () => {
    alert('Voice recognition stopped.');
  };
}
