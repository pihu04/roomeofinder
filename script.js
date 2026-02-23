window.addEventListener('load', () => {
    // 8-Second Delay Popup
    setTimeout(() => {
        const popup = document.getElementById('statusPopup');
        if (popup) popup.style.display = 'flex';
    }, 8000);

    // Initial Scroll Check
    revealOnScroll();
});

// Scroll Reveal Function
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 150) el.classList.add('active');
    });
};

window.addEventListener('scroll', revealOnScroll);

function closePopup() {
    document.getElementById('statusPopup').style.display = 'none';
}
