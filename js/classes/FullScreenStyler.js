// import { FullScreenChecker } from '/js/classes/FullScreenChecker.js'

class FullScreenStyler {
    // To-Do:
        // Assume F11 triggers full screen
        // Adjust FullScreenChecker accordingly to include that.
        // Write & incorporate MobileChecker
        // Write logic for full screen for mobile.
            // Add fixed width block on top of body or within 
            // Auto scroll to bottom of screen
            // Adjust height to medium setting
            // Adjust toolbar to bottom so play can be accessed on the bottom
            // Add listener so when user scrolls upwards, fullscreen mobile is exited.
    
    constructor() {
        this.screen = document.body;
        this.isButtonClickExit = false;
    }

    toggleFullScreen(fullScreen) {
        if(fullScreen) {
            this.goFullScreen();
        } else {
            this.exitFullScreen();
        }
    }

    goFullScreen() {
        if (this.screen.requestFullscreen) {
            this.screen.requestFullscreen();
        } else if (this.screen.mozRequestFullScreen) { // Firefox
            this.screen.mozRequestFullScreen();
        } else if (this.screen.webkitRequestFullscreen) { // Chrome, Safari and Opera
            this.screen.webkitRequestFullscreen();
        } else if (this.screen.msRequestFullscreen) { // IE/Edge
            this.screen.msRequestFullscreen();
        }

        // The is covers the case of user exiting from fullscreen via the "Escape" button
        // Unable to solve F11 button press + settings menu entry to fullscreen
        //      These two methods don't trigger browser events and fullscreen can't
        //      be check by reliable methods in that case.
        setTimeout(() => {
            document.addEventListener('fullscreenchange', (event) => {
                if(!this.isButtonClickExit) {
                    readerApp.settingsPanel.buttonContainers['fullScreen'].indexOfCurrentState = 0;
                    readerApp.settingsPanel.buttonContainers['fullScreen'].updateButtonElem();
                }
            }, { once: true });
        }, 25);
        this.isButtonClickExit = false;
    }

    exitFullScreen() {
        this.isButtonClickExit = true;

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}