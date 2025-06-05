// Make an element draggable
export function makeDraggable(el) {
  let isDragging = false;
  let startX, startY;
  let origX = 0, origY = 0;

  // Ensure position is relative if static
  if (window.getComputedStyle(el).position === "static") {
    el.style.position = "relative";
  }

  el.style.cursor = "move";

  el.addEventListener("mousedown", function (e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    origX = parseInt(el.style.left) || 0;
    origY = parseInt(el.style.top) || 0;
    e.preventDefault(); // Prevent text selection while dragging
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    el.style.left = origX + dx + "px";
    el.style.top = origY + dy + "px";
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
}

// Email validation function
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Handle newsletter subscription
export function handleSubscribe(email) {
  if (email && validateEmail(email)) {
    alert(`Thanks for subscribing, ${email}!`);
    return true;
  } else {
    alert("Please enter a valid email address.");
    return false;
  }
}

// Handle booking
export function handleBooking() {
  alert("Redirecting to booking page...");
  // You can add redirect logic here if needed:
  // window.location.href = 'booking.html';
} 