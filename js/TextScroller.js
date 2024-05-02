class TextScroller {
    constructor(initialText) {
        this.text = initialText;
        this.scrollerText = document.getElementById('text');
        this.scrollerBox = document.getElementsByClassName('text-wrapper')[0];
        this.scrollerText.textContent = this.text; // Set the initial text
        this.translate = 0;
        this.isDown = false;
        this.cursorStartX = 0;
        this.offsetDuringDrag = 0;
        // new code ***********
        this.autoScrollInterval = null;
        this.scrollSpeed = 2; // pixels per interval
        this.autoScrollPaused = false; // use when user scroll with autoScroll on
        // new code end ************

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

    keyboardControl(e) {
        const step = 60;
        if (e.key === "ArrowLeft") {
            this.translate -= step;
        } else if (e.key === "ArrowRight") {
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
        userTextBox.value = ''; // Clear the user-input textarea]

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
            this.translate -= this.scrollSpeed; // Modify this to adjust the scroll direction and speed
            this.updatePosition(this.translate);
        }, 10); // Update every 20 milliseconds
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
    const currentScroller = new TextScroller('This is a block of initial text.');
    currentScroller.centerText();
    
    
    document.getElementById('goButton').addEventListener('click', function() {
        currentScroller.setText();
    }); 

    document.getElementById('playButton').addEventListener('click', function() {
        currentScroller.toggleAutoScroll();
    });
});

