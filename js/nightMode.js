// import { UserSetting } from 'UserSettings.js'

const nightMode = new UserSetting('nightMode');

nightMode.loadStyles = function(state) {

    const currentState = state ? state : this.loadSetting('nightMode'); 

    const nightModeSpecificSelectors = [    
        'body',    
        '.text', 
        '.text-wrapper', 
        '.button-panel textarea',
        ' .button-panel button'
    ];

    if(currentState === true) {
        nightModeSpecificSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((element) => {
               element.classList.add('night-mode'); 
            });
        });

        document.querySelectorAll('.button-divider img').forEach((divider) => {
            divider.src = 'images/divider-icon-night-mode.png'
        }); 

        document.getElementById('nightModeOn').classList.remove('current');
        document.getElementById('nightModeOff').classList.add('current');
    } else {
        nightModeSpecificSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((element) => {
               element.classList.remove('night-mode'); 
            });
        });

        document.querySelectorAll('.button-divider img').forEach((divider) => {
            divider.src = 'images/divider-icon.png'
        }); 

        document.getElementById('nightModeOn').classList.add('current');
        document.getElementById('nightModeOff').classList.remove('current');
    }
}

nightMode.toggleNightMode = function() {
    // Using ternary operator to save the nightMode setting
    const lastState = this.loadSetting('nightMode') === true;
    const currentState = this.saveSetting(lastState ? false : true);

    this.loadStyles(currentState);
}

document.addEventListener('DOMContentLoaded', () => {
    nightMode.loadStyles();

    const nightModeButton = document.querySelectorAll('.toggle-night-mode');
    nightModeButton.forEach(element => {
        element.addEventListener('click', () => nightMode.toggleNightMode());
    });
});

// export { nightMode }