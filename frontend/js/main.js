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
const downloadButtons = document.querySelectorAll('.download-btn');

downloadButtons.forEach((button) => {
  button.addEventListener('click', () => {
    alert('Your plugin is being downloaded. Thank you for using AccessibleWeb!');
  });
});


function showVideo(videoId) {
    const videoElement = document.getElementById(videoId);
    videoElement.style.display = videoElement.style.display === "block" ? "none" : "block";
  }


// Function to show the shortcut input field when 'Set Shortcut' button is clicked
function setShortcut(pluginId) {
    const inputField = document.getElementById(`shortcut-input-${pluginId}`);
    inputField.style.display = 'block'; // Show the input field
    inputField.querySelector('input').focus(); // Focus on the input field
  }
  
  // Function to store the shortcut when a key is pressed
  function storeShortcut(event, pluginId) {
    // Prevent the default action if it's a letter or number key
    event.preventDefault();
  
    // Store the shortcut key in localStorage
    const shortcut = event.key; // Get the pressed key
    if (shortcut) {
      localStorage.setItem(`${pluginId}-shortcut`, shortcut); // Save the shortcut in localStorage
  
      // Display a confirmation message
      alert(`Shortcut for ${pluginId} set to "${shortcut}".`);
  
      // Hide the input field after setting the shortcut
      document.getElementById(`shortcut-input-${pluginId}`).style.display = 'none';
    }
  }
  
  // Function to check for any saved shortcuts on page load
  function checkSavedShortcuts() {
    // Loop through each plugin and check if a shortcut is saved in localStorage
    ['plugin1', 'plugin2', 'plugin3', 'plugin4'].forEach(pluginId => {
      const savedShortcut = localStorage.getItem(`${pluginId}-shortcut`);
      if (savedShortcut) {
        console.log(`Shortcut for ${pluginId}: ${savedShortcut}`);
      }
    });
  }
  
  // Listen for keypress events to trigger plugin actions
  document.addEventListener('keydown', function(event) {
    // Check if any plugin has a shortcut assigned
    ['plugin1', 'plugin2', 'plugin3', 'plugin4'].forEach(pluginId => {
      const savedShortcut = localStorage.getItem(`${pluginId}-shortcut`);
      if (savedShortcut && event.key === savedShortcut) {
        console.log(`Activating ${pluginId} plugin due to shortcut "${event.key}"`);
  
        // Example action: You can replace this with the actual action you want for the plugin
        // In this case, let's just alert the plugin activation for demonstration
        alert(`Activating ${pluginId} plugin...`);
      }
    });
  });
  
  // Call the checkSavedShortcuts function when the page loads to initialize shortcuts
  document.addEventListener('DOMContentLoaded', checkSavedShortcuts);
