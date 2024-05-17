class FullScreenStyler {
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