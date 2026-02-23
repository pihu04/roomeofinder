// script.js
// Delayed popup (8 seconds)
const popupOverlay = document.getElementById("popupOverlay");
const popupClose = document.getElementById("popupClose");
const popupLater = document.getElementById("popupLater");

function openPopup(){
  popupOverlay.classList.add("show");
  popupOverlay.setAttribute("aria-hidden", "false");
}

function closePopup(){
  popupOverlay.classList.remove("show");
  popupOverlay.setAttribute("aria-hidden", "true");
}

// Show after 8 seconds
setTimeout(openPopup, 8000);

// Close actions
popupClose.addEventListener("click", closePopup);
popupLater.addEventListener("click", closePopup);

// Close if user clicks outside the popup box
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) closePopup();
});

// Optional: ESC key closes it
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup();
});
// 1. Wait for page to load, then wait 8 seconds
window.addEventListener('load', () => {
    setTimeout(() => {
        const popup = document.getElementById('statusPopup');
        if (popup) {
            popup.style.display = 'flex'; // Triggers the popup
        }
    }, 8000); // 8000ms = 8 seconds
});

// 2. Function to close the popup
function closePopup() {
    document.getElementById('statusPopup').style.display = 'none';
}

// 3. Handle Form Submission
document.getElementById('claimForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Vibe Checked! You're on the elite waitlist.");
    closePopup();
});
