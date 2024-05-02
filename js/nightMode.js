function toggleNightMode() {
    const body = document.body;
    body.classList.toggle("night-mode");
    document.querySelectorAll('.text, .text-wrapper, .button-panel textarea, .button-panel button').forEach(element => {
        element.classList.toggle('night-mode');
    });
    
    toggleNightDayModeIcons();

    // Save the current mode to localStorage
    localStorage.setItem('nightMode', body.classList.contains("night-mode"));
}

function toggleNightDayModeIcons() {
    const nightIcon = document.getElementById('nightModeIcon');
    const daylightIcon = document.getElementById('daylightModeIcon');
    if (document.body.classList.contains('night-mode')) {
        nightIcon.style.display = 'none';
        daylightIcon.style.display = 'block';
    } else {
        nightIcon.style.display = 'block';
        daylightIcon.style.display = 'none';
    }
}

// Apply the saved theme on load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('nightMode') === "true") {
        document.getElementById("nightModeIcon").style.display = "none";
        document.body.classList.add("night-mode");
        document.querySelectorAll('.text, .text-wrapper, .button-panel textarea, .button-panel button').forEach(element => {
            element.classList.toggle('night-mode');
        }); // To-Do: refactor and make this a function
    } else {
        document.getElementById("daylightModeIcon").style.display = "none";
    }
    const toggleButton = document.getElementById('toggleNightMode');
    toggleButton.addEventListener('click', toggleNightMode);
});