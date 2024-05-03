class TextScroller {
    constructor(initialText) {
        this.scrollerBox = document.getElementsByClassName('text-wrapper')[0];
        this.scrollerText = document.getElementById('text');
        this.scrollerText.textContent = initialText; 

        this.scrollerBoxWidthNarrowest = 45; // %
        this.scrollerBoxWidthWider = 70; // %
        this.scrollerBoxWidthWidest = 95; // %
        
        this.translate = 0;
        this.isDown = false;
        this.cursorStartX = 0;
        this.offsetDuringDrag = 0;
        this.dragMultiplier = 3;

        this.keyboardStep = 100;
        this.keyLeft = 'ArrowLeft';
        this.keyRight = 'ArrowRight';

        this.autoScrollInterval = null;
        this.scrollSpeed = 400; // pixels per interval
        this.frameRate = 1250; // milliseconds
        this.autoScrollAnimation = 'transform 1.250s ease-in-out';
        this.autoScrollPaused = false; // used to pause autoscroll on user swipe action


        this.addEventListeners();
        this.applySmoothAnimation();
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

    }

    updatePosition(shift) {
        this.scrollerText.style.transform = `translateX(${shift}px)`;
    }

    startDrag(e) {
        if(this.autoScrollInterval != null) {
            this.autoScrollPaused = true;
            this.toggleAutoScrollIcons('pauseIcon');
            this.stopAutoScroll();
        }
        this.isDown = true;
        this.cursorStartX = ((e.pageX || e.touches[0].pageX) * this.dragMultiplier) - this.scrollerText.offsetLeft;
        this.removeSmoothAnimation();
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
        this.applySmoothAnimation();
    }

    applySmoothAnimation() {
        this.scrollerText.style.transition = 'transform 0.4s ease-out';
    }

    removeSmoothAnimation() {
        this.scrollerText.style.transition = '';
    }

    applyAutoScrollAnimation() {
        this.scrollerText.style.transition = this.autoScrollAnimation;
    }

    keyboardControl(e) {
        if (e.key === this.keyLeft) {
            this.translate -= this.keyboardStep;
        } else if (e.key === this.keyRight) {
            this.translate += this.keyboardStep;
        }
        this.updatePosition(this.translate);
    }

    setScrollerBoxWidth(width) {
        this.scrollerBox.style.width = `${width}%`;
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
            this.removeSmoothAnimation();
            this.applyAutoScrollAnimation();
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
});

