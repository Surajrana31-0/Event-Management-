// Helper Function to Display Messages
export function showMessage(message, setMessageText, setMessageBoxVisible) {
  setMessageText(message);
  setMessageBoxVisible(true);
}

// Login Form Validation
export function handleLogin(username, password, setMessageText, setMessageBoxVisible) {
  // Perform basic validation: check if fields are empty
  if (username === '' || password === '') {
    showMessage('Please enter both username and password.', setMessageText, setMessageBoxVisible);
    return false;
  }

  // Client-side validation successful
  showMessage('Login successful! (This is a client-side validation demo)', setMessageText, setMessageBoxVisible);
  return true;
}

// Subscribe Form Validation
export function handleSubscribe(email, setMessageText, setMessageBoxVisible) {
  // Perform basic validation: check if email field is empty
  if (email === '') {
    showMessage('Please enter your email address to subscribe.', setMessageText, setMessageBoxVisible);
    return false;
  }

  // Perform simple email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage('Please enter a valid email address.', setMessageText, setMessageBoxVisible);
    return false;
  }

  showMessage('Subscription successful! Thank you for subscribing.', setMessageText, setMessageBoxVisible);
  return true;
} 