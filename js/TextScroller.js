class TextScroller {
    constructor(initialText) {
        this.scrollerBox = document.getElementsByClassName('text-wrapper')[0];
        this.scrollerText = document.getElementById('text');
        this.scrollerText.textContent = initialText; 

        this.translate = 0;
        this.isDown = false;
        this.cursorStartX = 0;
        this.offsetDuringDrag = 0;

        this.autoScrollInterval = null;
        this.scrollSpeed = 2; // pixels per interval
        this.frameRate = 5; // milliseconds
        this.autoScrollAnimation = 'transfrom linear';
        this.autoScrollPaused = false; // used to pause autoscroll on user swipe action


        this.addEventListeners();
        this.applySmoothAnimation();
    }

    addEventListeners() {
        this.scrollerBox.addEventListener('mousedown', this.startDrag.bind(this));
        this.scrollerBox.addEventListener('touchstart', this.startDrag.bind(this), { passive: true });
        document.addEventListener('mousemove', this.doDrag.bind(this));
        document.addEventListener('touchmove', this.doDrag.bind(this), { passive: false });
        document.addEventListener('mouseup', this.endDrag.bind(this));
        document.addEventListener('touchend', this.endDrag.bind(this));

        document.addEventListener('keydown', this.keyboardControl.bind(this));
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
        this.cursorStartX = (e.pageX || e.touches[0].pageX) - this.scrollerText.offsetLeft;
        this.removeSmoothAnimation();
    }

    doDrag(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const cursorEndX = (e.pageX || e.touches[0].pageX) - this.scrollerText.offsetLeft;
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
        const step = 60;
        if (e.key === "ArrowRight") {
            this.translate -= step;
        } else if (e.key === "ArrowLeft") {
            this.translate += step;
        }
        this.updatePosition(this.translate);
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
    
    
    document.getElementById('goButton').addEventListener('click', function() {
        currentScroller.setText();
    }); 

    document.getElementById('playButton').addEventListener('click', function() {
        currentScroller.toggleAutoScroll();
    });
});
