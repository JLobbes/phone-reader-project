document.addEventListener('DOMContentLoaded', function() {

    const openSettingsButton = document.getElementById('openSettings');
    openSettingsButton.addEventListener('click', function() {
        toggleSettingsView();
    });

    const closeSettingsButton = document.getElementById('closeSettings'); 
    closeSettingsButton.addEventListener('click', function() {
        toggleSettingsView();

        const toggleButtonContainers = document.querySelectorAll('.toggle-button-container');

        // Get index of #settingsDividerContainer
        const divider = document.getElementById('settingsDividerContainer');
        const dividerIndex = Array.from(toggleButtonContainers).indexOf(divider);
        
        // Add hidden-setting class to containers left of divider
        toggleButtonContainers.forEach(function(buttonContainer) {
            removeHiddenSettingClass(buttonContainer);
            const containerIndex = Array.from(toggleButtonContainers).indexOf(buttonContainer);
            if(containerIndex >= dividerIndex) {
                reApplyHiddenSettingsClass(buttonContainer);
            }
        });

    });


    function toggleSettingsView() {
        // Toggle gear icon animation
        toggleHiddenClass(openSettingsButton);
        toggleHiddenClass(closeSettingsButton);

        // Add event listeners for toggle-button-containers
        // TO-DO: put in function
        const toggleButtonContainers = document.querySelectorAll('.toggle-button-container');
        toggleButtonContainers.forEach(function(container) {
            toggleHiddenSettingVisibility(container); 
            const buttons = container.querySelectorAll('button');
            buttons.forEach(function(button, index) {
                button.addEventListener('click', function() {
                    toggleNextButton(container, index);
                });
            });
        });
    }

    function reApplyHiddenSettingsClass(element) {
        element.classList.add('hidden-setting');
    }

    function removeHiddenSettingClass(element) {
        element.classList.remove('hidden-setting');
    }

    function toggleHiddenClass(element) {
        element.classList.toggle('hidden');
    }

    function toggleHiddenSettingVisibility(element) {
        element.classList.toggle('visible');
    }


    function toggleNextButton(container, index) {
        const buttons = container.querySelectorAll('button');
        // Hide all buttons in the container
        buttons.forEach(function(button) {
            button.classList.add('hidden');
        });

        const nextIndex = (index + 1) % buttons.length;
        buttons[nextIndex].classList.remove('hidden');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleButtonContainers = document.querySelectorAll('.toggle-button-container');

    toggleButtonContainers.forEach(function(container) {
        container.addEventListener('dragstart', handleDragStart);
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('drop', handleDrop);
        container.addEventListener('dragend', handleDragEnd);
    });

    let draggedItem = null;

    function handleDragStart(event) {
        draggedItem = this;
        this.style.opacity = '0.4'; // Reduce opacity of dragged item
        event.dataTransfer.setData('text/plain', ''); // Needed for Firefox
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        if (draggedItem !== this) {
            const containerIndex = Array.from(toggleButtonContainers).indexOf(draggedItem);
            const droppedIndex = Array.from(toggleButtonContainers).indexOf(this);
            const parent = this.parentNode;
            if (droppedIndex < containerIndex) {
                parent.insertBefore(draggedItem, this);
            } else {
                parent.insertBefore(draggedItem, this.nextSibling);
            }
        }
    }

    function handleDragEnd(event) {
        draggedItem.style.opacity = ''; // Restore opacity
        draggedItem = null;
    }
});
