document.addEventListener("DOMContentLoaded", function () {
  // Make an element draggable
  function makeDraggable(el) {
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

  // Select the categories and events sections
  const categoriesSection = document.querySelector(".categories");
  const eventsSection = document.querySelector(".events");

  if (categoriesSection) makeDraggable(categoriesSection);
  if (eventsSection) makeDraggable(eventsSection);

  // Newsletter subscription functionality
  const subscribeButton = document.querySelector("footer button");
  const emailInput = document.querySelector("footer input[type='email']");

  subscribeButton.addEventListener("click", function () {
    const email = emailInput.value.trim();
    if (email && validateEmail(email)) {
      alert(`Thanks for subscribing, ${email}!`);
      emailInput.value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Book Now buttons functionality
  const bookButtons = document.querySelectorAll(".event-card button, .hero button");
  bookButtons.forEach((button) => {
    button.addEventListener("click", function () {
      alert("Redirecting to booking page...");
      // You can add redirect logic here if needed:
      // window.location.href = 'booking.html';
    });
  });
});