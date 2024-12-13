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

function setShortcut(pluginId) {
    const inputField = document.getElementById(`shortcut-input-${pluginId}`);
    inputField.style.display = 'block'; // Show the input field
    inputField.querySelector('input').focus(); // Focus on the input field
}

function storeShortcut(event, pluginId) {
    event.preventDefault();

    const shortcut = event.key;
    if (shortcut) {
      localStorage.setItem(`${pluginId}-shortcut`, shortcut);
      alert(`Shortcut for ${pluginId} set to "${shortcut}".`);
      document.getElementById(`shortcut-input-${pluginId}`).style.display = 'none';
    }
}

function checkSavedShortcuts() {
    ['plugin1', 'plugin2', 'plugin3', 'plugin4'].forEach(pluginId => {
      const savedShortcut = localStorage.getItem(`${pluginId}-shortcut`);
      if (savedShortcut) {
        console.log(`Shortcut for ${pluginId}: ${savedShortcut}`);
      }
    });
}

document.addEventListener('keydown', function(event) {
    ['plugin1', 'plugin2', 'plugin3', 'plugin4'].forEach(pluginId => {
      const savedShortcut = localStorage.getItem(`${pluginId}-shortcut`);
      if (savedShortcut && event.key === savedShortcut) {
        console.log(`Activating ${pluginId} plugin due to shortcut "${event.key}"`);
        alert(`Activating ${pluginId} plugin...`);
      }
    });
});

document.addEventListener('DOMContentLoaded', checkSavedShortcuts);
