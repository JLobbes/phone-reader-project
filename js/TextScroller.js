class TextScroller {
    constructor(initialText) {
        this.scrollerBox = document.getElementsByClassName('text-wrapper')[0];
        this.scrollerText = document.getElementById('text');
        this.scrollerText.textContent = initialText; 

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
        this.scrollSpeed = 400; // pixels per interval
        this.frameRate = 1250; // milliseconds
        this.autoScrollTransition = 'transform 1.250s ease-in-out';
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
        document.getElementById('goButton').addEventListener('click', this.setText.bind(this));

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

    updatePosition(shift) {
        this.scrollerText.style.transform = `translateX(${shift}px)`;
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
        } else if (e.key === this.keyRight) {
            this.translate += this.keyboardStep;
        }
        this.updatePosition(this.translate);
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

    centerText() {
        const correctionMeasure = this.scrollerText.offsetWidth / 2;
        this.translate = correctionMeasure;
        this.updatePosition(this.translate);
    }

    setText() {
        const userTextBox = document.getElementById('textInput');
        const userTextInput = userTextBox.value;
        userTextBox.value = ''; // Clear the user-input textarea

        this.scrollerText.textContent = userTextInput;
        this.centerText();
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
    const currentScroller = new TextScroller(
        `
        In the heart of Ethiopia lies an extraordinary geological marvel—the 
        Danakil Depression, one of the hottest and most alien landscapes on Earth. 
        This cauldron-like depression is part of the Afar Triangle, a junction of 
        three tectonic plates, which are pulling apart from each other, creating 
        new land as magma surfaces. Here, temperatures can soar above 120°F, and 
        the air shimmers above vast salt flats and hydrothermal fields.

        The Danakil Depression offers a glimpse into Earth’s inner workings, 
        featuring dazzling formations like Dallol. Dallol holds the record for the
         highest average temperatures for an inhabited location on Earth and 
         showcases bright yellow sulfur fields, green acid pools, and iron-rich 
         red waters. These psychedelic landscapes are not just a draw for intrepid 
         tourists; they are invaluable to scientists studying extremophile microbes 
         thriving in such harsh conditions. These studies provide clues about life's 
         adaptability and even implications for extraterrestrial life, suggesting that 
         life could potentially exist in similar environments on other planets.

         Amidst this severe environment, the Afar people have adapted to extract 
         precious salt, continuing a centuries-old tradition. Caravans of camels 
         and donkeys, led by the Afar, trek across the desert, harvesting salt from 
         the ground, cut into slabs, and transported to markets across Ethiopia. 
         This blend of extreme natural phenomena and human endurance paints a vivid 
         picture of life's tenacity and the dynamic forces shaping our planet.    
        `
    );
    currentScroller.centerText();
    currentScroller.setScrollerBoxWidth(70);
    currentScroller.setScrollerBoxHeight(200);
    currentScroller.setFontSize(40);
});

