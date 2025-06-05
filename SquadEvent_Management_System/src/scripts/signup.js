// Toggle password visibility
export function togglePassword(field, setFieldType) {
  setFieldType(prev => prev === 'password' ? 'text' : 'password');
}

// Handle form submission
export function handleSignup(formData) {
  const { password, confirmPassword } = formData;
  
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return false;
  }
  
  alert('Registration successful! (This is a demo)');
  return true;
} 