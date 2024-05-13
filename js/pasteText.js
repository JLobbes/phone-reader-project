document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pasteText').addEventListener('click', () => toggleInputTextarea());
});

function toggleInputTextarea() {
    const pasteButton = document.getElementById('pasteText');
    const pasteTextArea = document.getElementById('textInput');

    pasteButton.classList.toggle('visible');
    pasteTextArea.classList.toggle('visible');

    if(pasteTextArea.classList.contains('visible')) { 
        console.log('pasteTextArea visible')
        setTimeout(() => {
            pasteTextArea.focus();
        }, 50);
    }
}