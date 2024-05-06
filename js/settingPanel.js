document.addEventListener('DOMContentLoaded', function() {

    const openSettingsButton = document.getElementById('openSettings');
    openSettingsButton.addEventListener('click', function() {
        toggleSettingsList();
    });

    const closeSettingsButton = document.getElementById('closeSettings'); 
    closeSettingsButton.addEventListener('click', function() {
        toggleSettingsList();
    });


    function toggleSettingsList() {
        // Toggle gear icon animation
        toggleHiddenClass(openSettingsButton);
        toggleHiddenClass(closeSettingsButton);

        // Add event listeners for toggle-button-containers
        // TO-DO: put in function
        const toggleButtonContainers = document.querySelectorAll('.toggle-button-container');
        toggleButtonContainers.forEach(function(container) {
            toggleHiddenClass(container); 
            const buttons = container.querySelectorAll('button');
            buttons.forEach(function(button, index) {
                button.addEventListener('click', function() {
                    toggleNextButton(container, index);
                });
            });
        });
    }

    function toggleHiddenClass(element) {
        element.classList.toggle('hidden');
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