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

function showVideo(videoId) {
    const videoElement = document.getElementById(videoId);
    videoElement.style.display = videoElement.style.display === "block" ? "none" : "block";
}

// Function to handle shortcut input
function setupShortcutHandlers(pluginId, storageKey) {
  const setShortcutBtn = document.getElementById(`set-shortcut-btn-${pluginId}`);
  const shortcutInput = document.getElementById(`shortcut-input-${pluginId}`);
  const status = document.getElementById(`status-${pluginId}`);

  // Handle key combination input
  shortcutInput.addEventListener("keydown", (e) => {
    e.preventDefault();  // Prevent default behavior of the keys

    const keys = [];

    // Capture the modifier keys
    if (e.metaKey) {
      keys.push("Command");  // macOS Command key
    } else if (e.ctrlKey) {
      keys.push("Ctrl");  // Windows/Linux Ctrl key
    }

    if (e.shiftKey) keys.push("Shift");
    if (e.altKey) keys.push("Alt");

    // Capture the main key (excluding modifier keys)
    if (e.key && !["Control", "Shift", "Alt", "Meta"].includes(e.key)) {
      keys.push(e.key.toUpperCase());
    }

    // Update the input field with the captured keys
    shortcutInput.value = keys.join("+");
  });

  // Save the shortcut when the user clicks 'Set Shortcut'
  setShortcutBtn.addEventListener("click", () => {
    if (!shortcutInput.value) {
      alert("Please enter a valid shortcut.");
      return;
    }
    chrome.storage.sync.set({ [storageKey]: shortcutInput.value }, () => {
      status.textContent = `Shortcut set to: ${shortcutInput.value}`;
      status.style.color = "green";
    });
  });
}

// Setup handlers for each plugin (assuming plugin1 as an example)
setupShortcutHandlers("plugin1", "shortcut_plugin1");

// Register shortcut dynamically
chrome.storage.sync.get("shortcut_plugin1", (data) => {
  if (data.shortcut_plugin1) {
    chrome.commands.update({
      name: "activate_text_to_voice",
      shortcut: data.shortcut_plugin1,
    });
  }
});