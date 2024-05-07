function toggleNightMode() {
    const body = document.body;
    body.classList.toggle("night-mode");
    document.querySelectorAll('.text, .text-wrapper, .button-panel textarea, .button-panel button, .settings-divider').forEach(element => {
        element.classList.toggle('night-mode');
    });

    // Save the current mode to localStorage
    localStorage.setItem('nightMode', body.classList.contains("night-mode"));
}

// Apply the saved theme on load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('nightMode') === "true") {
        document.getElementById('')
        document.body.classList.add("night-mode");
        document.querySelectorAll('.text, .text-wrapper, .button-panel textarea, .button-panel button, .settings-divider').forEach(element => {
            element.classList.toggle('night-mode');
        }); // To-Do: refactor and make this a function
    } else {
        // Do nothing?
    }

    const nightModeButton = document.querySelectorAll('.toggle-night-mode');
    nightModeButton.forEach(element => {
        element.addEventListener('click', toggleNightMode);
    });
});