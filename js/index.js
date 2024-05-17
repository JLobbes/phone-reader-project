// NOTE: Serving modules locally causes CORS issue, all JS included in index.html
//       Will complete modularity if application becomes dynamic. 
//       Import statement below for that condition.

// import { loadUpText } from 'initalText.js';
// import { settingsPanel } from 'settingsPanel.js';
// import { toolbar } from 'toolbar.js';
// import { PasteZoneStyler } from 'PasteZoneStyler.js';
// import { NightModeStyler } from 'NightModeStyler.js';
// import { Application } from 'Application.js';
// import { TextScroller } from 'TextScroller.js;

const readerApp = new Application();

readerApp.prepareTextScroller = function() {
    this.textScroller = new TextScroller();
    this.textScroller.queryForIphone();
    this.textScroller.setInitialText(loadUpText);
    this.textScroller.handleUserTextInput();
}

readerApp.prepareSettingsPanel = function() {
    this.settingsPanel = settingsPanel;
    this.settingsPanel.loadButtonPanelHTML();
    this.settingsPanel.addEventListeners();

    // Stitch buttons from settingPanel to textScroller functions
    // Cycle toggle button until previously saved state is hit
    const nightModeStyler = new NightModeStyler();
    this.settingsPanel.buttonContainers['nightMode'].mainFunction = () => {
        const indexOfCurrentState = this.settingsPanel.buttonContainers['nightMode'].indexOfCurrentState;
        const newStateValue = this.settingsPanel.buttonContainers['nightMode'].states[indexOfCurrentState]['value']; 
        nightModeStyler.toggleNightMode(newStateValue);
    };
    this.settingsPanel.buttonContainers['nightMode'].cycleButton();


    this.settingsPanel.buttonContainers['adjustFontSize'].mainFunction = () => {
        const indexOfCurrentState = this.settingsPanel.buttonContainers['adjustFontSize'].indexOfCurrentState;
        const newStateValue = this.settingsPanel.buttonContainers['adjustFontSize'].states[indexOfCurrentState]['value']; 
        this.textScroller.setFontSize(newStateValue);
    };
    this.settingsPanel.buttonContainers['adjustFontSize'].cycleButton();

    
    this.settingsPanel.buttonContainers['scrollerBoxWidth'].mainFunction = () => {
        const indexOfCurrentState = this.settingsPanel.buttonContainers['scrollerBoxWidth'].indexOfCurrentState;
        const newStateValue = this.settingsPanel.buttonContainers['scrollerBoxWidth'].states[indexOfCurrentState]['value']; 
        this.textScroller.setScrollerBoxWidth(newStateValue);
    };
    this.settingsPanel.buttonContainers['scrollerBoxWidth'].cycleButton();


    this.settingsPanel.buttonContainers['scrollerBoxHeight'].mainFunction = () => {
        const indexOfCurrentState = this.settingsPanel.buttonContainers['scrollerBoxHeight'].indexOfCurrentState;
        const newStateValue = this.settingsPanel.buttonContainers['scrollerBoxHeight'].states[indexOfCurrentState]['value']; 
        this.textScroller.setScrollerBoxHeight(newStateValue);
    };
    this.settingsPanel.buttonContainers['scrollerBoxHeight'].cycleButton();


    this.settingsPanel.buttonContainers['keypressPower'].mainFunction = () => {
        const indexOfCurrentState = this.settingsPanel.buttonContainers['keypressPower'].indexOfCurrentState;
        const newStateValue = this.settingsPanel.buttonContainers['keypressPower'].states[indexOfCurrentState]['value']; 
        this.textScroller.setKeyboardStep(newStateValue);
    };
    this.settingsPanel.buttonContainers['keypressPower'].cycleButton();

    
    this.settingsPanel.buttonContainers['dragSpeed'].mainFunction = () => {
        const indexOfCurrentState = this.settingsPanel.buttonContainers['dragSpeed'].indexOfCurrentState;
        const newStateValue = this.settingsPanel.buttonContainers['dragSpeed'].states[indexOfCurrentState]['value']; 
        this.textScroller.setDragMultiplier(newStateValue);
    };
    this.settingsPanel.buttonContainers['dragSpeed'].cycleButton();


    this.settingsPanel.buttonContainers['autoScroll'].mainFunction = () => {
        const indexOfCurrentState = this.settingsPanel.buttonContainers['autoScroll'].indexOfCurrentState;
        const newStateValue = this.settingsPanel.buttonContainers['autoScroll'].states[indexOfCurrentState]['value']; 
        this.textScroller.setAutoScrollConfiguration(newStateValue);
    };
    this.settingsPanel.buttonContainers['autoScroll'].cycleButton();


    const fullScreenStyler = new FullScreenStyler();
    this.settingsPanel.buttonContainers['fullScreen'].mainFunction = () => {
        const indexOfCurrentState = this.settingsPanel.buttonContainers['fullScreen'].indexOfCurrentState;
        const newStateValue = this.settingsPanel.buttonContainers['fullScreen'].states[indexOfCurrentState]['value']; 
        fullScreenStyler.toggleFullScreen(newStateValue);
    };

}

readerApp.prepareToolbar = function() {
    this.toolbar = toolbar; 
    this.toolbar.loadButtonPanelHTML(); 
    this.toolbar.addEventListeners();

    const pasteZoneStyler = new PasteZoneStyler();
    this.toolbar.buttonContainers['userTextInput'].mainFunction = () => {
        const indexOfCurrentState = this.toolbar.buttonContainers['userTextInput'].indexOfCurrentState;
        const newStateValue = this.toolbar.buttonContainers['userTextInput'].states[indexOfCurrentState]['value']; 
        pasteZoneStyler.togglePasteZone(newStateValue);
        if(newStateValue) {
            this.textScroller.handleUserTextInput();
        }
    };
    this.toolbar.panel.querySelector('.close').addEventListener('click', () => {
        this.toolbar.buttonContainers['userTextInput'].indexOfCurrentState = 0;
        this.toolbar.buttonContainers['userTextInput'].updateButtonElem();
        pasteZoneStyler.closePasteZone();
    });
    
    this.toolbar.buttonContainers['read'].mainFunction = () => {
        this.textScroller.toggleAutoScroll();
    };

    this.toolbar.buttonContainers['centerText'].mainFunction = () => {
        this.textScroller.centerText();
    };
}

readerApp.startApplication = function() {
    this.prepareTextScroller();
    this.prepareSettingsPanel();
    this.prepareToolbar();
}

readerApp.startApplication();
