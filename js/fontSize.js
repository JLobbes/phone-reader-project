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
