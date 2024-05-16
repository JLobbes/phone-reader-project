const toolbar = new ButtonPanel('toolbar');

toolbar.pasteZoneStatus = 'open';
toolbar.pasteButton = toolbar.panel.querySelector('#pasteText');
toolbar.pasteTextZone = toolbar.panel.querySelector('#textInput');
toolbar.textInputButtonContainer = toolbar.pasteButton.parentElement;

toolbar.openPasteZone = function() {
    if(this.pasteZoneStatus === 'closed') {
        this.addVisibleClass(this.pasteTextZone);
        this.textInputButtonContainer.style.display = 'flex';
        this.textInputButtonContainer.style.justifyContent = 'center';
        this.textInputButtonContainer.style.alignContent = 'center';
        this.textInputButtonContainer.style.width = '125px';
        this.pasteZoneStatus = 'open';
    }
    
    if(this.pasteTextZone.classList.contains('visible')) { 
        setTimeout(() => {
            this.pasteTextZone.focus();
            // To-Do: Incorporate longpress mimic for mobile
            //        Logic start is below
            //        Will requires mobile state check
        }, 50);
    }
}

toolbar.closePasteZone = function() {
    if(this.pasteZoneStatus === 'open') {
        this.removeVisibleClass(this.pasteTextZone);
        this.textInputButtonContainer.style.display = '';
        this.textInputButtonContainer.style.width = '';
        this.pasteZoneStatus = 'closed';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    toolbar.closePasteZone();

    const pasteButton = toolbar.panel.querySelector('#pasteText');
    pasteButton.addEventListener('click', () => toolbar.openPasteZone());
    
});

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

