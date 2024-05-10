class Word {
    constructor(text, width) {
        this.text = text;
        this.width = width;
    }
}

class TextScroller {
    constructor() {
        this.scrollerBox = document.getElementsByClassName('text-wrapper')[0];
        this.scrollerText = document.getElementById('text');
        this.intialText;

        this.scrollerBoxCenter;
        this.scrollerTextLeft;
        this.lengthOffCenter;

        this.words = [];
        this.wordPositionalMap;
        this.visibleWords;

        // Widths are defined in %
        this.scrollerBoxWidthNarrowest = 45; 
        this.scrollerBoxWidthWider = 70; 
        this.scrollerBoxWidthWidest = 95; 
        // Heights are defined in px
        this.scrollerBoxHeightShortest = 100; 
        this.scrollerBoxHeightTaller = 250; 
        this.scrollerBoxHeightTallest = 400; 

        this.fontSizePresetSmallest = 20;
        this.fontSizePresetSmaller = 30;
        this.fontSizePresetMedium = 40;
        this.fontSizePresetLarger = 50;
        this.fontSizePresetLargest = 60;
        
        this.translate = 0;
        this.isDown = false;
        this.cursorStartX = 0;
        this.offsetDuringDrag = 0;
        this.dragMultiplier = 3;
        this.dragPresetNone = 1;
        this.dragPresetDouble = 2;
        this.dragPresetTriple = 3;

        this.keyboardStep = 100;
        this.stepPresetSmall = 60;
        this.stepPresetMedium = 100;
        this.stepPresetLarge = 160;
        this.keyLeft = 'ArrowLeft';
        this.keyRight = 'ArrowRight';

        this.autoScrollInterval = null;
        this.scrollSpeed = 1; // pixels per interval
        this.frameRate = 5; // milliseconds
        this.autoScrollTransition = 'transform 1.250s linear';
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
        // document.getElementById('goButton').addEventListener('click', this.setText.bind(this));
        document.getElementById('goButton').addEventListener('click', this.setScrollerText.bind(this));

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

    setScrollerText() {
        const userTextBox = document.getElementById('textInput');
        const userTextInput = userTextBox.value ? userTextBox.value : this.intialText;
        if (userTextBox) userTextBox.value = ''; // Clear the user-input textarea
        console.log('here')

        this.scrollerText.textContent = userTextInput;
        toggleInputTextarea(); // Global function        

        // Below logic is breaking text into span for measurment, increased number of empty spans causes lag.
            // // Split the text into an array of words (including spaces)
            // const rawWords = userTextInput.match(/\S+|\s+/g) || [];
        
            // // Create the words array without calculating widths
            // this.words = rawWords.map((word) => new Word(word, 0));

            // // Wrap each word in a span element and add it to the scrollerText
            // this.scrollerText.innerHTML = this.words
            //     .map((wordObj, index) => `<span class="word" id="word-${index}">${wordObj.text}</span>`)
            //     .join('');
    
            
        // Delay to ensure DOM is loaded on first iteration
        setTimeout(() => {
            this.centerText();
            this.wordPositionalMap = this.getWordPositionMap();
        }, 50); // 50 ms delay
    }
    
    // Measure the widths of the words and update the positions
    getWordPositionMap() {
        let position = 0;

        return this.words.map((wordObj, index) => {
            // Get the current span from the DOM
            const wordElement = document.getElementById(`word-${index}`);

            // Measure the width of the word using getBoundingClientRect
            const wordRect = wordElement.getBoundingClientRect();
            const wordWidth = wordRect.width;

            // Update the width property in the word object
            wordObj.width = wordWidth;

            // Create word data object with position
            const wordData = {
                text: wordObj.text,
                width: wordObj.width,
                position
            };

            // Update the position for the next word
            position += wordWidth;

            return wordData;
        });
    };
    
    setVisibleWords() {
        const visibleWords = [];
    
        const leftBoundary = Math.abs(this.lengthOffCenter) - 300; // The left boundary in the scrollerBox
        const rightBoundary = Math.abs(this.lengthOffCenter) + 300; // The right boundary
    
        const wordPositions = this.getWordPositionMap(); // Retrieve words with their positions
    
        for (const word of wordPositions) {
            if (word.position + word.width > leftBoundary && word.position < rightBoundary) {
                visibleWords.push(word.text.trim());
            }
        }
    
        this.visibleWords = visibleWords;

        return {
            visibleWords
        };
    }
    
    updatePosition(shift) {
        this.scrollerText.style.transform = `translateX(${shift}px)`;
        // this.setVisibleWords();
        // console.log(this.visibleWords);
        // this.printPositionalStats();
    }

    printPositionalStats() {
        // Delay center text to ensure dom is loaded on first iteration
        setTimeout(() => {
            this.getLengthOffCenter();
            // console.log("this.lengthOffCenter:", this.lengthOffCenter);
        }, 500); // 500 ms delay to allow animation to complete
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
        this.updatePosition(this.translate + walk);
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
        this.scrollerText.style.transition = this.autoScrollTransition;
    }

    setAutoScrollConfiguration(autoScrollConfiguration) {
        this.scrollSpeed = autoScrollConfiguration.scrollSpeed;
        this.frameRate = autoScrollConfiguration.frameRate;
        this.autoScrollTransition = autoScrollConfiguration.autoScrollTransition;

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
        if (e.key === this.keyLeft) {
            this.translate -= this.keyboardStep;
            this.updatePosition(this.translate);
        } else if (e.key === this.keyRight) {
            this.translate += this.keyboardStep;
            this.updatePosition(this.translate);
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
        this.scrollerText.style.fontSize = `${fontSize}px`;
    }

    getLengthOffCenter() {
        this.scrollerTextLeft = this.scrollerText.getBoundingClientRect().left;
        this.scrollerBoxCenter = this.scrollerBox.getBoundingClientRect().left + (this.scrollerBox.getBoundingClientRect().width / 2);
        
        this.lengthOffCenter = this.scrollerTextLeft - this.scrollerBoxCenter ;
        return this.lengthOffCenter;
    }

    centerText() {
        this.getLengthOffCenter(); // Update values of scrollerBoxCenter & scrollerTextLeft for accurate measurent.
        const centeringAdjustment = this.scrollerBoxCenter - this.scrollerTextLeft;
    
        // Update the translate property
        this.translate += centeringAdjustment;
        this.updatePosition(this.translate);
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
            this.updatePosition(this.translate);
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
}


// Usage
document.addEventListener('DOMContentLoaded', () => {
    const currentScroller = new TextScroller();
    currentScroller.setScrollerBoxWidth(95);
    currentScroller.setScrollerBoxHeight(250);
    currentScroller.setFontSize(40);
    currentScroller.setInitialText(
        `
        Hi, I'm made this tool to help me read. Maybe it will help you as well.
        
        Press the stop button above (↑↑↑↑) to stop auto-scroll or just tap the screen to pause.

        To paste your text here, press the paste icon above and paste into the box. 
        Then jam the curved arrow.

        Swipe left or right to scroll through the text. You can click with a mouse or punch 
        arrow keys on the keyboard as well. 
        
        Below, you can press the settings button to change scroll speed, fontSize and more.

        When you change settings, they are saved on your browser's local storage. 
        No data is transmitted or stored anywhere else on the web.
        If you clear your browser history, your settings will be cleared too. 

        Scroll back to back to the beginning or press refresh to read this again.
        
        If you have any feedback, please do reach out. Happy reading!
        `
    );
    currentScroller.setScrollerText();
    setTimeout(() => {
        currentScroller.startAutoScroll();
    }, 1000); // 1s delay
});

