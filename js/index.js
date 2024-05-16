// NOTE: Serving modules locally causes CORS issue, all JS included in index.html
//       Will complete modularity if application becomes dynamic. 
//       Import statement below for that condition.

// import { Application } from 'Application.js';
// import { TextScroller } from 'TextScroller.js;
// import { toolbar } from 'toolbar.js';
// import { settingsPanel } from 'settingsPanel.js';
// import { loadUpText } from 'initalText.js';

const readerApp = new Application();

readerApp.prepareTextScroller = function() {
    this.textScroller = new TextScroller();
    this.textScroller.queryForIphone();
    this.textScroller.setScrollerBoxWidth(95);
    this.textScroller.setScrollerBoxHeight(250);
    this.textScroller.setInitialText(loadUpText);
    setTimeout(() => {
        this.textScroller.handleUserTextInput(); // Pulled from user-input textarea
        this.textScroller.setFontSize(40);
    }, 25);
}

readerApp.prepareToolbar = function() {
    this.toolbar = toolbar;
    this.toolbar.closePasteZone();
    this.toolbar.pasteButton.addEventListener('click', () => this.toolbar.openPasteZone());
    this.toolbar.closePanelButton.addEventListener('click', () => this.toolbar.closePasteZone());
}

readerApp.prepareSettingsPanel = function() {
    this.settingsPanel = settingsPanel;
}

readerApp.startApplication = function() {
    this.prepareToolbar();
    this.prepareSettingsPanel();
    this.prepareTextScroller();
}

readerApp.startApplication();
