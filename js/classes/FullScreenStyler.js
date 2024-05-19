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
    
    constructor(fillerBlockID, fullScreenButton) {
        this.screen = document.body;
        this.mobilefillerBlock = this.screen.querySelector(`#${fillerBlockID}`);

        this.fullScreenButton = fullScreenButton;
        this.isButtonClickExit = false;
    }

    toggleFullScreen(fullScreen) {
        if(fullScreen) {
            this.goFullScreen();
        } else {
            this.exitFullScreen();
        }
    }

    toggleFullScreenMobile(fullScreen) {
        if(fullScreen) {
            this.goFullScreenMobile();
        } else {
            this.exitFullScreenMobile();
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
                    this.fullScreenButton.indexOfCurrentState = 0;
                    this.fullScreenButton.updateButtonElem();
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

    goFullScreenMobile() {
        document.documentElement.classList.add('fullScreenMobile');
        this.screen.classList.add('fullScreenMobile');
        this.mobilefillerBlock.classList.add('fullScreenMobile');
        setTimeout(() => {
            this.smoothScrollByPixels(400, 500);

            // Add listener to exitFullScreen if user swipes up
            this.addScollUpListener();
        }, 500);
    }
    
    exitFullScreenMobile() {
        document.documentElement.classList.remove('fullScreenMobile');
        this.screen.classList.remove('fullScreenMode');
        this.mobilefillerBlock.classList.remove('fullScreenMobile');
    }

    smoothScrollByPixels(pixels, duration) {
        const start = window.scrollY;
        // const end = start + pixels;
        const distance = pixels;
        const startTime = performance.now();
  
        const scroll = function() {
          const now = performance.now();
          const time = Math.min(1, (now - startTime) / duration);
          const timeFunction = time * (2 - time); // Ease-in-out function
  
          window.scrollTo(0, Math.ceil(timeFunction * distance + start));
  
          if (time < 1) {
            requestAnimationFrame(scroll);
          }
        }
  
        requestAnimationFrame(scroll);
    }

    addScollUpListener() {
        let lastScrollY = window.scrollY;
    
        window.addEventListener('scroll', () => {
          const currentScrollY = window.scrollY;
          if (lastScrollY - currentScrollY >= 100) {
            // User scrolled up by 100 pixels
            this.fullScreenButton.advanceState();
            lastScrollY = currentScrollY; // Update the last scroll position
          } else if (currentScrollY > lastScrollY) {
            // Update the last scroll position if user scrolls down
            lastScrollY = currentScrollY;
          }
        });
    }
}