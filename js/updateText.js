document.addEventListener('DOMContentLoaded', function () {
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
    increaseButton.addEventListener('click', function () {
        changeFontSize(true);
    });

    decreaseButton.addEventListener('click', function () {
        changeFontSize(false);
    });
});

function updateText() {
    const textInput = document.getElementById('textInput');
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

function clearTextArea() {
    const textInput = document.getElementById('textInput');
    textInput.value = '';

    const textElement = document.getElementById('text');
    textElement.textContent = 'Paste your next section'; // Update the text inside the scroller
    
    resetPosition(); // Adjust the position each time the text updates
}