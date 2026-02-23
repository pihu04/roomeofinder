// script.js

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
