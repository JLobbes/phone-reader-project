const settingsPanel = new ButtonPanel('settings');

// document.addEventListener('DOMContentLoaded', () => {

//     const openSettingsButton = document.getElementById('openSettings');
//     openSettingsButton.addEventListener('click', function() {
//         // Toggle gear icon animation
//         addHiddenClass(openSettingsButton);
//         removeHiddenClass(closeSettingsButton);

//         openNestedSettings();
//     });
    
//     const closeSettingsButton = document.getElementById('closeSettings'); 
//     closeSettingsButton.addEventListener('click', function() {
//         handlePinnedSettings();
//         closeNestedSettings();
        
//         // Toggle gear icon animation
//         addHiddenClass(closeSettingsButton);
//         removeHiddenClass(openSettingsButton);
//     });
// });

// function openNestedSettings() {
//     // Show nestedSettings container
//     const nestedSettings = document.getElementsByClassName('nested-buttons')[0];
//     addVisibleClass(nestedSettings);

//     // Show nestedSettings & current button with
//     showButtonContainers();
// }

// function closeNestedSettings() {
//     // Show nestedSettings & current button with
//     hideButtonContainers();

//     // Hide nestedSettings container
//     const nestedSettings = document.getElementsByClassName('nested-buttons')[0];
//     removeVisibleClass(nestedSettings);
// }

// function showButtonContainers() {
//     // Show toggle-button-containers
//     const buttonContainers = document.querySelectorAll('.toggle-button-container');
//     buttonContainers.forEach(function(container) {
    
//         addVisibleClass(container); 

//         // Add state change event listeners to buttons within said toggle-button-container
//         const buttons = container.querySelectorAll('button');
//         buttons.forEach(function(button, index) {
//             button.addEventListener('click', function() {
//                 toggleNextButton(container, index);
//             });

//             // Show current button
//             if(button.classList.contains('current')) {
//                 removeHiddenClass(button);
//             }
//         });
//     });

//     // Add special inline style for internal divider
//     const internalDivider = document.getElementById('internalDivider');
//     internalDivider.style.width = '25px';

//     // remove special inline style for external divider
//     const externalDivider = document.getElementById('externalDivider');
//     addHiddenClass(externalDivider);
// }

// function hideButtonContainers() {
//     // Hide UNPINNED toggle-button-containers
//     const buttonContainers = document.querySelectorAll('.toggle-button-container.hidden-setting');
//     buttonContainers.forEach(function(container) {
    
        
//         // Hide current buttons for UNPINNED containers
//         const buttons = container.querySelectorAll('button');
//         buttons.forEach((button) => {
            
//             // Hide current button
//             if(button.classList.contains('current')) {
//                 setTimeout(() => {
//                     addHiddenClass(button);
//                 }, 400);
//             }
//         });
        
//         removeVisibleClass(container); 
//     });

//     // Remove special inline style for internal divider
//     const internalDivider = document.getElementById('internalDivider');
//     internalDivider.style.width = '0px';

    
// }

// function handlePinnedSettings() {
//     // To-Do: make the next line specific for settings and not 'tools'
//     // Currently is ambiguous
//     const toggleButtonContainers = document.querySelectorAll('.toggle-button-container');
    
//     // Handle pinned settings buttons
    
//     // Get index of #internalDivider
//     const divider = document.getElementById('internalDivider');
//     const dividerIndex = Array.from(toggleButtonContainers).indexOf(divider);
//     console.log(dividerIndex);

//     if(dividerIndex > 0) { // If divider is NOT first item
//         // Add special inline style for external divider
//         const externalDivider = document.getElementById('externalDivider');
//         removeHiddenClass(externalDivider);
//     }
    
//     // Add hidden-setting class to containers right of divider
//     toggleButtonContainers.forEach(function(buttonContainer) {
//     removeHiddenSettingClass(buttonContainer);
//     const containerIndex = Array.from(toggleButtonContainers).indexOf(buttonContainer);
//         if(containerIndex >= dividerIndex) {
//         addHiddenSettingClass(buttonContainer);
//         }   
//     });
// }

// function addVisibleClass(element) {
//     element.classList.add('visible');
// }

// function removeVisibleClass(element) {
//     element.classList.remove('visible');
// }

// function addHiddenClass(element) {
//     element.classList.add('hidden');
// }

// function removeHiddenClass(element) {
//     element.classList.remove('hidden');
// }

// function addHiddenSettingClass(element) {
//     element.classList.add('hidden-setting');
// }

// function removeHiddenSettingClass(element) {
//     element.classList.remove('hidden-setting');
// }

// function toggleNextButton(container, index) {
//     const buttons = container.querySelectorAll('button');

//     // Remove 'current' class from last button
//     buttons[index].classList.remove('current');
//     buttons[index].classList.add('hidden');

//     // Add 'current' class to the next button
//     const nextIndex = (index + 1) % buttons.length;
//     buttons[nextIndex].classList.add('current');
//     buttons[nextIndex].classList.remove('hidden');
// }

// // Drag logic
// document.addEventListener('DOMContentLoaded', function() {
//     const toggleButtonContainers = document.querySelectorAll('.toggle-button-container');

//     toggleButtonContainers.forEach(function(container) {
//         container.addEventListener('dragstart', handleDragStart);
//         container.addEventListener('dragover', handleDragOver);
//         container.addEventListener('drop', handleDrop);
//         container.addEventListener('dragend', handleDragEnd);
//     });

//     let draggedItem = null;

//     function handleDragStart(event) {
//         draggedItem = this;
//         this.style.opacity = '0.4'; // Reduce opacity of dragged item
//         event.dataTransfer.setData('text/plain', ''); // Needed for Firefox, only dragging divider works
//     }

//     function handleDragOver(event) {
//         event.preventDefault();
//     }

//     function handleDrop(event) {
//         event.preventDefault();
//         if (draggedItem !== this) {
//             const containerIndex = Array.from(toggleButtonContainers).indexOf(draggedItem);
//             const droppedIndex = Array.from(toggleButtonContainers).indexOf(this);
//             const parent = this.parentNode;
//             if (droppedIndex < containerIndex) {
//                 parent.insertBefore(draggedItem, this);
//             } else {
//                 parent.insertBefore(draggedItem, this.nextSibling);
//             }
//         }
//     }

//     function handleDragEnd(event) {
//         draggedItem.style.opacity = ''; // Restore opacity
//         draggedItem = null;
//     }
// });
