// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Get DOM Elements ---
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const subscribeForm = document.getElementById('subscribeForm');
    const subscribeEmailInput = document.getElementById('subscribeEmail');

    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    const closeMessageBoxBtn = document.getElementById('closeMessageBox');

    // --- Helper Function to Display Messages ---
    /**
     * Displays a custom message box with the given message.
     * This function replaces the use of `alert()` for better user experience.
     * @param {string} message - The message string to be displayed in the message box.
     */
    function showMessage(message) {
        messageText.textContent = message; // Set the text content of the message
        messageBox.style.display = 'block'; // Make the message box visible
    }

    // --- Event Listener for Closing Message Box ---
    // Add a click event listener to the "OK" button in the message box
    closeMessageBoxBtn.addEventListener('click', () => {
        messageBox.style.display = 'none'; // Hide the message box when the button is clicked
    });

    // --- Login Form Validation ---
    // Check if the login form element exists on the page before adding an event listener
    if (loginForm) {
        // Add a submit event listener to the login form
        loginForm.addEventListener('submit', (event) => {
            // Prevent the default form submission behavior (which would reload the page)
            event.preventDefault();

            // Get the trimmed values from the username and password input fields
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Perform basic validation: check if fields are empty
            if (username === '' || password === '') {
                showMessage('Please enter both username and password.'); // Show error message
                return; // Stop the form submission process
            }

            // --- Client-side validation successful ---
            // In a real application, you would typically send this data to a server
            // for authentication using Fetch API or XMLHttpRequest.
            // For this demonstration, we'll just show a success message.
            showMessage('Login successful! (This is a client-side validation demo)');

            // If you want the form to actually submit after successful client-side validation,
            // you would uncomment the line below. However, for this demo, we keep it commented
            // to show the message box.
            // loginForm.submit();
        });
    }

    // --- Subscribe Form Validation ---
    // Check if the subscribe form element exists on the page before adding an event listener
    if (subscribeForm) {
        // Add a submit event listener to the subscribe form
        subscribeForm.addEventListener('submit', (event) => {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Get the trimmed value from the email input field
            const email = subscribeEmailInput.value.trim();

            // Perform basic validation: check if email field is empty
            if (email === '') {
                showMessage('Please enter your email address to subscribe.'); // Show error message
                return; // Stop the form submission process
            }

            // Perform simple email format validation using a regular expression
            // This regex checks for a pattern like "text@text.text"
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.'); // Show error message for invalid format
                return; // Stop the form submission process
            }

         
            showMessage('Subscription successful! Thank you for subscribing.');

          
        });
    }
});
