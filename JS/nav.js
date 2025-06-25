document.addEventListener('DOMContentLoaded', function () {
    const hamToggle = document.getElementById('hamToggle');
    const hamIcon = document.querySelector('.hamIcon');
    const hamburger = document.querySelector('.hamburger');

    // Ensure hamToggle is unchecked on load
    hamToggle.checked = false;

    // Hamburger menu logic
    hamToggle.addEventListener('click', function () {
        hamIcon.classList.toggle('checked');
        hamburger.classList.toggle('show');
    });
});