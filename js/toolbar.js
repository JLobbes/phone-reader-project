// import { ButtonPanel } from '/ButtonPanel.js'

const toolbar = new ButtonPanel('toolbar');

toolbar.pasteZoneStatus = 'open';
toolbar.pasteButton = toolbar.panel.querySelector('#pasteText');
toolbar.pasteTextZone = toolbar.panel.querySelector('#textInput');
toolbar.textInputGoButton = toolbar.panel.querySelector('#goButton');
toolbar.textInputButtonContainer = toolbar.pasteButton.parentElement;

toolbar.openPasteZone = function() {
    if(this.pasteZoneStatus === 'closed') {
        // Make pasteZone visible
        this.addVisibleClass(this.pasteTextZone);

        // Add inline styles to override default styles
        this.textInputButtonContainer.style.display = 'flex';
        this.textInputButtonContainer.style.justifyContent = 'center';
        this.textInputButtonContainer.style.alignContent = 'center';
        this.textInputButtonContainer.style.width = '130px';
        this.textInputGoButton.style.width = '40px';

        this.pasteZoneStatus = 'open';
    }
    
    if(this.pasteTextZone.classList.contains('visible')) { 
        setTimeout(() => {
            this.pasteTextZone.focus();
        }, 50);
    }
}

toolbar.closePasteZone = function() {
    if(this.pasteZoneStatus === 'open') {
        // Remove visibility
        this.removeVisibleClass(this.pasteTextZone);

        // Remove inline styles so default animation and styling can occur
        this.textInputButtonContainer.style.display = '';
        this.textInputButtonContainer.style.width = '';
        this.textInputGoButton.style.width = '';

        // Ensure textInput module gets reset to proper status
        setTimeout(() => {
            this.textInputGoButton.classList.remove('current');
            this.addHiddenClass(this.textInputGoButton);

            this.pasteButton.classList.add('current');
            this.removeHiddenClass(this.pasteButton);
        }, 100);
        this.pasteZoneStatus = 'closed';
    }
}

// export { toolbar };

// To-Do incorportate longpress mimic for mobile!!
// const element = document.getElementById('myElement');
// const longPressDuration = 1000; // 1 second

// const simulateLongPress = () => {
//     const mousedownEvent = new MouseEvent('mousedown', {
//         bubbles: true,
//         cancelable: true,
//         view: window
//     });
//     element.dispatchEvent(mousedownEvent);

//     setTimeout(() => {
//         const mouseupEvent = new MouseEvent('mouseup', {
//             bubbles: true,
//             cancelable: true,
//             view: window
//         });
//         element.dispatchEvent(mouseupEvent);
//     }, longPressDuration);
// };

// simulateLongPress();

