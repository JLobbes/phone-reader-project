- ✔ Add dark mode
- ~~Remove text input box, change to button only ~~
    - NOTE: permissions make juice not worth the squeeze.
- ~~Reduce sliding blurr, increase frame rate? (can't be done)~~
    - NOTE: blurr is impossible to avoid, combat with sweet 
            spot configuration combinations.
- ✔ Add automatic scroll
    - ✔ Add animation type options
    - ✔ Add presets b/c not robust enought to allow fine user control
        - ✔ Long swipes 
            - this.scrollSpeed = 500; // pixels per interval
            - this.frameRate = 1500; // milliseconds
            - this.autoScrollAnimation = 'transform 1.5s ease-in-out';

        - ✔ Med swipes
            - this.scrollSpeed = 400; // pixels per interval
            - this.frameRate = 1250; // milliseconds
            - this.autoScrollAnimation = 'transform 1.250s ease-in-out';

        - ✔ Short swipes
            - this.scrollSpeed = 300; // pixels per interval
            - this.frameRate = 1000; // milliseconds
            - this.autoScrollAnimation = 'transform 1.0s ease-in-out';

        -  ~~Turtle scroll~~
            - ~~this.scrollSpeed = 0.5; // pixels per interval~~
            - ~~this.frameRate = 10; // milliseconds~~
            - ~~this.autoScrollAnimation = '';~~

        - ✔ slow scroll
            - this.scrollSpeed = 1; // pixels per interval
            - this.frameRate = 5; // milliseconds
            - this.autoScrollAnimation = 'transfrom linear';

        - ✔ faster scroll
            - this.scrollSpeed = 1.0; // pixels per interval
            - this.frameRate = 5; // milliseconds
            - this.autoScrollAnimation = 'transfrom linear';

        - ✔ Fastest scroll
            - this.scrollSpeed = 1.5; // pixels per interval
            - this.frameRate = 5; // milliseconds
            - this.autoScrollAnimation = 'transfrom linear';

- ✔ Add adjustable display width
- Add picture to text
- Add broad navigation and/or tracking on page
- Add instructions
    - ~~Add informational bubbles~~
- Add setting saved option
    - ✔ Add options to made slide more powerful
    - ✔ Add button show options (customize display)
    - ✔ Add button to change scroll-box width 
    - ✔ Add button to change scroll-box height 
    - ✔ Add button to change scroll-box fontSize 
    - Add options to swap scroll direction for keyboards
- Add full screen mode for mobile
- ✔ Change buttons to collapsable panel
- Change to extension
- Add option for RSVP ?
- Add word search
- ✔ Add word/text tracker 
    - ✔ Solve text mapping issue for iphone
    - Optimize when visibleWords is updates
- ✔ Create boundaries for end + rebound
    - Solve late mouse up issue (current has patch only)
- Solve drag and drop compatibility for FireFox
- Make click and drag more predictable
- ✔ Ensure icons are not selectable 
- Implement cover paste-text textarea button (it's ugly)
- ✔ Enable mapping of text in text box
- ✔ Solve initial delayed centering issue.
- change scrollerText id of #text to #scrollerText
- Create a favicon
- ✔ Create a tools icon
    - ✔ Hide everything on top in tools
    - ✔ Make tools act like settings
- Make a notification scroller for settings and tools.
- Make a notifications buttons
- Make a search tools
- Make a copy current view tool
- Make a remove all but text and settings button