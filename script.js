// Function to show the pop-up after a delay
window.onload = function() {
    setTimeout(function() {
        // This targets your elite-popup-overlay
        const popup = document.getElementById('statusPopup');
        if (popup) {
            popup.style.display = 'flex';
        }
    }, 8000); // 8000 milliseconds = 8 seconds
};

// Function to close the pop-up
function closePopup() {
    document.getElementById('statusPopup').style.display = 'none';
}
