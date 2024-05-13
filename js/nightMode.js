function toggleNightMode(settingObject) {
    const body = document.body;
    body.classList.toggle("night-mode");

    document.querySelectorAll('.text, .text-wrapper, .button-panel textarea, .button-panel button, .settings-divider').forEach(element => {
        element.classList.toggle('night-mode');
    });

    // Using ternary operator to save the nightMode setting
    const nightModeState = settingObject.loadSetting('nightMode') === true;
    settingObject.saveSetting(nightModeState ? false : true);
}


// Apply the saved theme on load
document.addEventListener('DOMContentLoaded', () => {
    const nightModeSetting = new UserSetting('nightMode');

    if (nightModeSetting.loadSetting('nightMode') === true) {
        
        document.body.classList.toggle("night-mode");
        document.querySelectorAll('.text, .text-wrapper, .button-panel textarea, .button-panel button, .settings-divider').forEach(element => {
            element.classList.toggle('night-mode');
        }); // To-Do: refactor and make this a function
    } else {
        // Do nothing?
    }

    const nightModeButton = document.querySelectorAll('.toggle-night-mode');
    nightModeButton.forEach(element => {
        element.addEventListener('click', () => toggleNightMode(nightModeSetting));
    });
});

