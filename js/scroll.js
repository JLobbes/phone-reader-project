document.addEventListener('DOMContentLoaded', function() {
    resetPosition();
    
    const textElement = document.getElementById('text');
    let isDown = false;
    let startX;
    let initialTranslate = 0;

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

    const textDisplay = document.getElementsByClassName('text-wrapper')[0];
    textDisplay.addEventListener('mousedown', startDrag);
    textDisplay.addEventListener('touchstart', startDrag, { passive: true });

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




