document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('text');
    let isDown = false;
    let startX;
    let initialTranslate = 0;
    resetPosition();

    textElement.style.transition = 'transform 0.3s ease-out';

    function startDrag(e) {
        isDown = true;
        startX = (e.pageX || e.touches[0].pageX) - textElement.offsetLeft;
        initialTranslate = parseInt(textElement.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
        textElement.style.transition = ''; // Remove transition for more responsive dragging
    }

    function endDrag() {
        isDown = false;
        textElement.style.transition = 'transform 0.3s ease-out'; // Reapply transition after dragging for smooth release
    }

    function doDrag(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - textElement.offsetLeft;
        const walk = (x - startX); // Adjust to simple difference, no multiplier
        textElement.style.transform = `translateX(${initialTranslate + walk}px)`;
    }

    textElement.addEventListener('mousedown', startDrag);
    textElement.addEventListener('touchstart', startDrag, { passive: true });

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('touchmove', doDrag, { passive: false });

    document.addEventListener('keydown', (e) => {
        const step = 60; // Adjust this value to change scroll speed
        if (e.key === "ArrowLeft") {
            initialTranslate -= step;
        } else if (e.key === "ArrowRight") {
            initialTranslate += step;
        }
        textElement.style.transform = `translateX(${initialTranslate}px)`;
    });
});

function updateText() {
    const textInput = document.getElementById('text-input');
    const textElement = document.getElementById('text');
    textElement.textContent = textInput.value; // Update the text inside the scroller
    resetPosition(); // Adjust the position each time the text updates
}

function resetPosition() {
    const textElement = document.getElementById('text');
    
    // Wait for the next frame to ensure the DOM has updated
    requestAnimationFrame(() => {
        const textWidth = textElement.offsetWidth;
        
        // Translate the text to start from the left, off-screen
        const initialTranslateX = +textWidth / 2; // or -textWidth if you want it completely off-screen
        textElement.style.transform = `translateX(${initialTranslateX}px)`;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('text');
    const increaseButton = document.getElementById('increaseSize');
    const decreaseButton = document.getElementById('decreaseSize');

    // Function to change the font size
    function changeFontSize(increase) {
        const currentSize = parseFloat(window.getComputedStyle(textElement, null).getPropertyValue('font-size'));
        if (increase) {
            textElement.style.fontSize = (currentSize + 2) + 'px';
        } else {
            textElement.style.fontSize = (currentSize - 2) + 'px';
        }
    }

    // Event listeners for buttons
    increaseButton.addEventListener('click', function() {
        changeFontSize(true);
    });

    decreaseButton.addEventListener('click', function() {
        changeFontSize(false);
    });
});

function toggleNightMode() {
    const body = document.body;
    body.classList.toggle("night-mode");
    document.querySelectorAll('.text, .text-wrapper, .input-form textarea, .input-form button').forEach(element => {
        element.classList.toggle('night-mode');
    });
    
    toggleNightDayModeIcons();

    // Save the current mode to localStorage
    localStorage.setItem('nightMode', body.classList.contains("night-mode"));
}

function toggleNightDayModeIcons() {
    const nightIcon = document.getElementById('nightModeIcon');
    const daylightIcon = document.getElementById('daylightModeIcon');
    if (document.body.classList.contains('night-mode')) {
        nightIcon.style.display = 'none';
        daylightIcon.style.display = 'block';
    } else {
        nightIcon.style.display = 'block';
        daylightIcon.style.display = 'none';
    }
}

// Apply the saved theme on load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('nightMode') === "true") {
        document.body.classList.add("night-mode");
        document.querySelectorAll('.text, .text-wrapper, .input-form textarea, .input-form button').forEach(element => {
            element.classList.toggle('night-mode');
        }); // To-Do: refactor and make this a functions 
    }
    const toggleButton = document.getElementById('toggleNightMode');
    toggleButton.addEventListener('click', toggleNightMode);
});


