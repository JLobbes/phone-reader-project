class Word {
    constructor(text, width) {
        this.text = text;
        this.width = width;
    }
}

class TextScroller {
    constructor() {
        // Main DOM items
        this.scrollerBox = document.getElementsByClassName('text-wrapper')[0];
        this.scrollerText = document.getElementById('text');
        this.userTextInput;
        this.intialText;
        this.userTextInput;
        this.wordPositionMap_Array = [];

        // DOM item position variabless 
        this.scrollerBoxCenter;
        this.scrollerTextLeft;
        this.currentScrollPosition; // scrollerBoxLeft relative to center-line
        this.wordPostionMap_Object;
        this.visibleWords = {};

        // Widths are defined in %
        this.scrollerBoxWidthNarrowest = 45; 
        this.scrollerBoxWidthWider = 70; 
        this.scrollerBoxWidthWidest = 95; 

        // Heights are defined in px
        this.scrollerBoxHeightShortest = 100; 
        this.scrollerBoxHeightTaller = 250; 
        this.scrollerBoxHeightTallest = 400; 

        // Font Size variables
        this.fontSizePresetSmallest = 20;
        this.fontSizePresetSmaller = 30;
        this.fontSizePresetMedium = 40;
        this.fontSizePresetLarger = 50;
        this.fontSizePresetLargest = 60;
        
        // Drag control + movement variables
        this.translate = 0;
        this.isDown = false;
        this.cursorStartX = 0;
        this.offsetDuringDrag = 0;
        this.dragMultiplier = 3;
        this.dragPresetNone = 1;
        this.dragPresetDouble = 2;
        this.dragPresetTriple = 3;

        // Keyboard control variables
        this.keyboardStep = 100;
        this.stepPresetSmall = 60;
        this.stepPresetMedium = 100;
        this.stepPresetLarge = 160;
        this.keyLeft = 'ArrowLeft';
        this.keyRight = 'ArrowRight';

        // Animation variables
        this.autoScrollInterval = null;
        this.scrollSpeed = 1; // pixels per interval
        this.frameRate = 5; // milliseconds
        this.scrollerTextMovementStyle = 'transform 0s linear';
        this.autoScrollPaused = false; // used to pause autoscroll on user swipe action

        this.addEventListeners();
        this.applySmoothTransition();
    }

    addEventListeners() {
        // Drag listeners
        this.scrollerBox.addEventListener('mousedown', this.startDrag.bind(this));
        this.scrollerBox.addEventListener('touchstart', this.startDrag.bind(this), { passive: true });
        document.addEventListener('mousemove', this.doDrag.bind(this));
        document.addEventListener('touchmove', this.doDrag.bind(this), { passive: false });
        document.addEventListener('mouseup', this.endDrag.bind(this));
        document.addEventListener('touchend', this.endDrag.bind(this));

        // Key listeners
        document.addEventListener('keydown', this.keyboardControl.bind(this));

        // Button listeners
        document.getElementById('playButton').addEventListener('click', this.toggleAutoScroll.bind(this));
        document.getElementById('goButton').addEventListener('click', this.handleUserTextInput.bind(this));
        document.getElementById('centerButton').addEventListener('click', this.centerText.bind(this));

        document.getElementById('makeScrollerBoxNarrow').addEventListener('click', this.setScrollerBoxWidth.bind(this, this.scrollerBoxWidthNarrowest));
        document.getElementById('makeScrollerBoxWider').addEventListener('click', this.setScrollerBoxWidth.bind(this, this.scrollerBoxWidthWider));
        document.getElementById('makeScrollerBoxWidest').addEventListener('click', this.setScrollerBoxWidth.bind(this, this.scrollerBoxWidthWidest));
        
        document.getElementById('makeScrollerBoxShort').addEventListener('click', this.setScrollerBoxHeight.bind(this, this.scrollerBoxHeightShortest));
        document.getElementById('makeScrollerBoxTaller').addEventListener('click', this.setScrollerBoxHeight.bind(this, this.scrollerBoxHeightTaller));
        document.getElementById('makeScrollerBoxTallest').addEventListener('click', this.setScrollerBoxHeight.bind(this, this.scrollerBoxHeightTallest));

        document.getElementById('makeTextSmallest').addEventListener('click', this.setFontSize.bind(this, this.fontSizePresetSmallest));
        document.getElementById('makeTextSmaller').addEventListener('click', this.setFontSize.bind(this, this.fontSizePresetSmaller));
        document.getElementById('makeTextMedium').addEventListener('click', this.setFontSize.bind(this, this.fontSizePresetMedium));
        document.getElementById('makeTextLarger').addEventListener('click', this.setFontSize.bind(this, this.fontSizePresetLarger));
        document.getElementById('makeTextLargest').addEventListener('click', this.setFontSize.bind(this, this.fontSizePresetLargest));

        document.getElementById('keypressSmall').addEventListener('click', this.setKeyBoardStep.bind(this, this.stepPresetSmall));
        document.getElementById('keypressMedium').addEventListener('click', this.setKeyBoardStep.bind(this, this.stepPresetMedium));
        document.getElementById('keypressLarge').addEventListener('click', this.setKeyBoardStep.bind(this, this.stepPresetLarge));

        document.getElementById('dragSpeedSlow').addEventListener('click', this.setDragMultiplier.bind(this, this.dragPresetNone));
        document.getElementById('dragSpeedFast').addEventListener('click', this.setDragMultiplier.bind(this, this.dragPresetDouble));
        document.getElementById('dragSpeedFastest').addEventListener('click', this.setDragMultiplier.bind(this, this.dragPresetTriple));

        document.getElementById('autoSwipeFastest').addEventListener('click', this.setAutoScrollConfiguration.bind(this, { scrollSpeed: 600, frameRate: 1500, autoScrollTransition: 'transform 1.5s ease-in-out' }));
        document.getElementById('autoSwipeFast').addEventListener('click', this.setAutoScrollConfiguration.bind(this, { scrollSpeed: 400, frameRate: 1250, autoScrollTransition: 'transform 1.5s ease-in-out' }));
        document.getElementById('autoSwipeSlow').addEventListener('click', this.setAutoScrollConfiguration.bind(this, { scrollSpeed: 200, frameRate: 1000, autoScrollTransition: 'transform 1.0s ease-in-out' }));
        document.getElementById('autoScrollSlow').addEventListener('click', this.setAutoScrollConfiguration.bind(this, { scrollSpeed: 0.5, frameRate: 5, autoScrollTransition: 'transform linear' }));
        document.getElementById('autoScrollFast').addEventListener('click', this.setAutoScrollConfiguration.bind(this, { scrollSpeed: 1, frameRate: 5, autoScrollTransition: 'transform linear' }));
        document.getElementById('autoScrollFastest').addEventListener('click', this.setAutoScrollConfiguration.bind(this, { scrollSpeed: 1.5, frameRate: 5, autoScrollTransition: 'transform linear' }));
    }

    setInitialText(text) {
        this.intialText = text;
    }


    handleUserTextInput() {
        this.centerText();
        toggleInputTextarea(); // Global function in pasteText.js

        const userInputTextarea = document.getElementById('textInput');
        const userTextInput = userInputTextarea.value ? userInputTextarea.value : this.intialText;
        if (userInputTextarea) userInputTextarea.value = ''; // Clear the user-input textarea

        this.userTextInput = userTextInput;
        this.wordPostionMap_Object = this.getWordMap(); // Measure the text in spans

        this.scrollerText.innerHTML = '' // Clear the newly measured spans as movement is resource 
        this.scrollerText.textContent = this.userTextInput;

        this.visibleWords = {...this.wordPostionMap_Object};
        this.assessBoundaries();
    }

    prepareTextInSpan(index) {
        // Get word from mapped words
        const wordData = this.wordPostionMap_Object[index];
        const wordElement = document.createElement('span');
        wordElement.textContent = wordData.text;
        wordElement.classList.add('word');
        wordElement.id = `${JSON.stringify(wordData)}`;
        if(wordData.text === " ") {
            wordElement.style.backgroundColor = 'red';
            wordElement.innerHTML = '&nbsp;';
        }    
        return wordElement;
    }

    assessBoundaries() {

        this.getCurrentScrollPosition();
        const halfScrollerBoxWidth = this.scrollerBox.getBoundingClientRect().width / 2;
        const scrollerTextWidth = this.scrollerText.getBoundingClientRect().width;

        const rightBoundary = halfScrollerBoxWidth - 50; 
        if(this.currentScrollPosition > rightBoundary) { 
            this.reboundPositionTo(0);
        };

        const leftBoundary = -scrollerTextWidth - halfScrollerBoxWidth + 50;
        if(this.currentScrollPosition < leftBoundary) {
            this.reboundPositionTo(-scrollerTextWidth);
        }

        // Ensure there are words visible
        if(Object.keys(this.visibleWords).length === 0) {
            this.visibleWords = {...this.wordPostionMap_Object};
        }
        this.assessRightBoundaryWords();
        this.assessLeftBoundaryWords();
        
        this.printVisibleWords();
    }  
    
    assessRightBoundaryWords() {
        let requiresModification;
        
        do {
            const currentWords = {...this.visibleWords};
            if (Object.keys(currentWords).length === 0) {break}; // Exit if no data to assess
    
            this.getCurrentScrollPosition();
            const halfScreenWidth = (this.scrollerBox.getBoundingClientRect().width / 2)
            const rightBoundary = -(this.currentScrollPosition) + halfScreenWidth;
            const rightMostWordKey = Object.keys(currentWords).at(-1);
            const rightMostWord = currentWords[rightMostWordKey];
            const { index, position, width } = rightMostWord;
            
            const isLastWord = index >= this.wordPositionMap_Array.length - 1;
            const isBeyondBoundary = position > rightBoundary;
            const isWithinAdditionZone = position + width < rightBoundary; 
            
            requiresModification = false;
    
            // Add text if within the addition zone and not at the last word
            if (isWithinAdditionZone && !isLastWord) {
                this.visibleWords[(index + 1)] = this.wordPostionMap_Object[(index + 1)];  // Adds one word to visible words
                requiresModification = true;
            }
            
            // Remove text if beyond the buffer zone
            if (isBeyondBoundary) {
                delete this.visibleWords[index];
                requiresModification = true;
            }
    
        } while (requiresModification);
    }    

    assessLeftBoundaryWords() {
        
        let requiresModification;
        
        do {
            const currentWords = {...this.visibleWords};
            if (Object.keys(currentWords).length === 0) break; // Exit if no data to assess
    
            this.getCurrentScrollPosition();
            const halfScreenWidth = (this.scrollerBox.getBoundingClientRect().width / 2)
            const leftBoundary = -(this.currentScrollPosition) - halfScreenWidth;
            const leftMostWordKey = Object.keys(currentWords).at(0); 
            const leftMostWord = currentWords[leftMostWordKey];
            const { index, position, width } = leftMostWord;
            
            const isFirstWord = index === 0;
            const isBeyondBoundary = position + width < leftBoundary;
            const isWithinAdditionZone = position > leftBoundary; 
            
            requiresModification = false;
    
            // Add text if within the addition zone and not at the last word
            if (isWithinAdditionZone && !isFirstWord) {
                this.visibleWords[(index - 1)] = this.wordPostionMap_Object[(index - 1)];  // Adds one word to visible words
                requiresModification = true;
            }
            
            // Remove text if beyond the buffer zone
            if (isBeyondBoundary) {
                delete this.visibleWords[index];
                requiresModification = true;
            }
    
        } while (requiresModification);
    }    

    getWordMap() {
        // Below logic is breaking text into span for measurment

        // Split the text into an array of words (including spaces)
        const textRaw = this.userTextInput;
        const textProcessed = textRaw.match(/\S+|\s+/g) || [];

        // Create the words array without calculating widths
        this.wordPositionMap_Array = textProcessed.map((word) => new Word(word, 0));

        // Wrap each word in a span element and add it to the scrollerText
        // Clear scrollerText and replace with words wrapped in spans
        this.scrollerText.textContent = '';
        this.scrollerText.innerHTML = this.wordPositionMap_Array
            .map((wordObj, index) => `<span class="word" id="word-${index}">${wordObj.text}</span>`)
            .join('');

        let position = 0;

        return this.wordPositionMap_Array.map((wordObj, index) => {
            // Get the word wrapped in a span from the DOM
            const wordElement = document.getElementById(`word-${index}`);

            // Measure the width of the word using getBoundingClientRect
            const wordRect = wordElement.getBoundingClientRect();
            const wordWidth = wordRect.width;

            // Update the width property in the word object
            wordObj.width = wordWidth;

            // Create word data object with position
            const wordData = {
                index: index,
                text: wordObj.text,
                width: wordObj.width,
                position
            };

            // Update the position for the next word
            position += wordWidth;

            return wordData;
        });
    };

    printVisibleWords() {
        let currentView = ''

        for (const key in this.visibleWords) {
            if (Object.hasOwnProperty.call(this.visibleWords, key)) {
                const word = this.visibleWords[key];
                currentView += `${word.text}`;
            }
        }
        console.log(currentView);   
        this.mobileDiagPrint('TEXT', currentView);
    }

    jumpPositionTo(targetScrollPosition) {
        this.removeSmoothTransition();
        
        this.getCurrentScrollPosition();
        const amountMoved = targetScrollPosition - this.currentScrollPosition; 
        this.translate += amountMoved; // this.translate is for original scrolling logic, hasn't been updated
        
        this.scrollerText.style.transform = `translateX(${targetScrollPosition}px)`;

        // console.log(`scollerText jumped to: ${this.getCurrentScrollPosition()}`);
    }

    reboundPositionTo(targetScrollPosition) {
        this.endDrag();
        this.stopAutoScroll();
        this.applySmoothTransition();
        this.getCurrentScrollPosition();
        this.scrollerText.style.transform = `translateX(${targetScrollPosition}px)`;
        
        setTimeout(() => {
            
            this.endDrag();
            this.translate = targetScrollPosition;
            this.scrollerText.style.transform = `translateX(${targetScrollPosition}px)`;
        }, 1000); // To clean up after user mouseup event sets this.translate to positive number.
    }
    
    shiftPosition(shiftAmount) {
        this.scrollerText.style.transform = `translateX(${shiftAmount}px)`;
        this.getCurrentScrollPosition();
        this.assessBoundaries();
        
        // console.log(`scollerText shifted to: ${this.getCurrentScrollPosition()}`);
    }

    setDragMultiplier(multiplier) {
        this.dragMultiplier = multiplier;
    }

    startDrag(e) {
        if(this.autoScrollInterval != null) {
            this.autoScrollPaused = true;
            this.toggleAutoScrollIcons('pauseIcon');
            this.stopAutoScroll();
        }
        this.isDown = true;
        this.cursorStartX = ((e.pageX || e.touches[0].pageX) * this.dragMultiplier) - this.scrollerText.offsetLeft;
        this.removeSmoothTransition();
    }
    
    doDrag(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const cursorEndX = ((e.pageX || e.touches[0].pageX) * this.dragMultiplier) - this.scrollerText.offsetLeft;
        const walk = cursorEndX - this.cursorStartX;
        this.shiftPosition(this.translate + walk);
        this.offsetDuringDrag = walk;
    }
    
    endDrag() {
        if(this.autoScrollPaused) {
            this.autoScrollPaused = false;
            this.startAutoScroll();
        }
        this.isDown = false;
        this.translate += this.offsetDuringDrag;
        this.offsetDuringDrag = 0;
        this.applySmoothTransition();
    }

    applySmoothTransition() {
        this.scrollerText.style.transition = 'transform 0.4s ease-out';
    }

    removeSmoothTransition() {
        this.scrollerText.style.transition = '';
    }

    applyAutoScrollTransition() {
        this.scrollerText.style.transition = this.scrollerTextMovementStyle;
    }

    setAutoScrollConfiguration(autoScrollConfiguration) {
        this.scrollSpeed = autoScrollConfiguration.scrollSpeed;
        this.frameRate = autoScrollConfiguration.frameRate;
        this.scrollerTextMovementStyle = autoScrollConfiguration.autoScrollTransition;

        // To-Do: Encapsulate and move the following transition flush and reset 
        if(this.autoScrollInterval) {
            this.stopAutoScroll();
            this.applyAutoScrollTransition();
            this.startAutoScroll()
            
        } else {
            this.stopAutoScroll(); // In order to clear interval
            this.applyAutoScrollTransition();
        }
    }

    keyboardControl(e) {
        this.applySmoothTransition();
        if (e.key === this.keyLeft) {
            this.translate -= this.keyboardStep;
            this.shiftPosition(this.translate);
        } else if (e.key === this.keyRight) {
            this.translate += this.keyboardStep;
            this.shiftPosition(this.translate);
        }
    }

    setKeyBoardStep(stepSize) {
        this.keyboardStep = stepSize; // px
    }

    setScrollerBoxWidth(width) {
        this.scrollerBox.style.width = `${width}%`;
    }

    setScrollerBoxHeight(height) {
        this.scrollerBox.style.height = `${height}px`;
    }

    setFontSize(fontSize) {
            // Find reference word
            this.getCurrentScrollPosition();
            const currentWords = {...this.visibleWords};
            const referenceWord = { index: 0, distanceFromCenter: 1000};

            this.mobileDiagPrint('current Scroll Position:', this.currentScrollPosition);
            
            for (const index in currentWords) {
                if (Object.hasOwnProperty.call(currentWords, index)) {
                    const wordData = currentWords[index];
                    const position = wordData.position;
                    const distanceOffCenter = -this.currentScrollPosition - position;
                    if(Math.abs(distanceOffCenter) < Math.abs(referenceWord.distanceFromCenter)) {
                        referenceWord.text = wordData.text;
                        referenceWord.index = wordData.index;
                        referenceWord.distanceFromCenter = distanceOffCenter;
                    }
                }
            }        

            this.mobileDiagPrint('referenceWord:', referenceWord.text);
            this.mobileDiagPrint('distance:', referenceWord.distanceFromCenter);

            
            // Change text size
            this.scrollerText.style.fontSize = `${fontSize}px`;
    
            // Remap text at different size
            this.wordPostionMap_Object = {};
            this.wordPostionMap_Object = this.getWordMap(); // Measure the text in spans
            console.log('this.wordPositionMap:', this.wordPostionMap_Object);
            this.scrollerText.innerHTML = '' // Clear the newly measured spans as movement is resource 
            this.scrollerText.textContent = this.userTextInput;
    
            // Scroll until reference word is back in place
            const refWordNewData = this.wordPostionMap_Object[referenceWord.index];
            this.mobileDiagPrint('referenceWordNew:', refWordNewData.text);
            this.mobileDiagPrint('referenceWordNew:', refWordNewData.position);
            this.jumpPositionTo(-refWordNewData.position);
    
            // Readjust visible words
            this.visibleWords = {};
            this.visibleWords = {...this.wordPostionMap_Object};
            console.log('visible words:', this.visibleWords);
            
            this.assessBoundaries();
    }

    getCurrentScrollPosition() {
        this.scrollerTextLeft = this.scrollerText.getBoundingClientRect().left;
        this.scrollerBoxCenter = this.scrollerBox.getBoundingClientRect().left + (this.scrollerBox.getBoundingClientRect().width / 2);
        
        this.currentScrollPosition = this.scrollerTextLeft - this.scrollerBoxCenter ;
        // console.log('currentScrollPosition updated. Now is:', this.currentScrollPosition);
        return this.currentScrollPosition;
    }

    centerText() {
        this.getCurrentScrollPosition(); // Update values of scrollerBoxCenter & scrollerTextLeft for accurate measurent.
        const centeringAdjustment = this.scrollerBoxCenter - this.scrollerTextLeft;
    
        // Update the translate property
        this.translate += centeringAdjustment;
        this.shiftPosition(this.translate);
    }
    

    toggleAutoScroll() {
        if (this.autoScrollInterval) {
            this.stopAutoScroll();
        } else {
            this.startAutoScroll();
        }
    }

    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            this.translate -= this.scrollSpeed; 
            this.removeSmoothTransition();
            this.applyAutoScrollTransition();
            this.shiftPosition(this.translate);
        }, this.frameRate); // frameRate is not FPS, but ms between animation
        this.toggleAutoScrollIcons('stopIcon');
    }

    stopAutoScroll() {
        clearInterval(this.autoScrollInterval);
        this.autoScrollInterval = null;

        if(!this.autoScrollPaused) this.toggleAutoScrollIcons('playIcon');
    }    

    toggleAutoScrollIcons(iconToShow) {
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');
        const stopIcon = document.getElementById('stopIcon');

        playIcon.classList.add('hidden');
        pauseIcon.classList.add('hidden')
        stopIcon.classList.add('hidden')

        const targetIcon = document.getElementById(iconToShow);
        targetIcon.classList.remove('hidden');
    }

    mobileDiagPrint(text, item) {
        const miniConsole = document.getElementById('miniConsole');
        const toPush = document.createElement('p');
        toPush.textContent = `${text} ${item}`;
        toPush.style.marginLeft = '5px'
        miniConsole.appendChild(toPush);
        miniConsole.scrollTop = miniConsole.scrollHeight;
    }
}


// Usage
document.addEventListener('DOMContentLoaded', () => {
    const currentScroller = new TextScroller();
    currentScroller.setScrollerBoxWidth(95);
    currentScroller.setScrollerBoxHeight(250);
    currentScroller.setInitialText(
        `// Hi, I made this tool to help me read. Maybe it will help you as well.
        
        // Press the stop button above (↑↑↑↑) to stop auto-scroll or just tap the screen to pause.
        
        // To paste your text here, press the paste icon above and paste into the box. 
        // Then jam the curved arrow.
        
        // Swipe left or right to scroll through the text. You can click with a mouse or punch 
        // arrow keys on the keyboard as well. 
        
        // Below, you can press the settings button to change scroll speed, fontSize and more.
        
        // When you change settings, they are saved on your browser's local storage. 
        // No data is transmitted or stored anywhere else on the web.
        // If you clear your browser history, your settings will be cleared too. 
        
        // Scroll back to back to the beginning or press refresh to read this again.
        
        // If you have any feedback, please do reach out. Happy reading!
        `
    );
    setTimeout(() => {
        currentScroller.handleUserTextInput(); // Pulled from user-input textarea
        currentScroller.setFontSize(40);
    }, 25);
});

