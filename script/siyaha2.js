// document.addEventListener('DOMContentLoaded', function() {
//     // Handle back button click
//     const backButton = document.querySelector('.back-button');
//     backButton.addEventListener('click', function() {
//         alert('Going back to the previous page');
//         // In a real app, you would navigate back to the previous page
//         // window.history.back();
//     });

//     // Handle continue button click
//     const continueBtn = document.querySelector('.continue-btn');
//     continueBtn.addEventListener('click', function() {
//         const guideRequested = document.querySelector('input[name="guide"]').checked;
        
//         if(guideRequested) {
//             alert('You requested a tourist guide. Proceeding to the next step.');
//         } else {
//             alert('Proceeding to the next step without a tourist guide.');
//         }
        
//         // In a real app, you would navigate to the next step or process the selection
//     });

//     // Handle notification icon click
//     const notificationIcon = document.querySelector('.notification-icon');
//     notificationIcon.addEventListener('click', function() {
//         alert('Notifications center');
//         // In a real app, you would show notifications panel
//     });

//     // Handle menu icon click
//     const menuIcon = document.querySelector('.menu-icon');
//     menuIcon.addEventListener('click', function() {
//         alert('Opening menu');
//         // In a real app, you would show the menu
//     });
    
//     // Initialize radio button state
//     document.querySelector('input[name="guide"]').checked = false;
// });


//link 


  




document.querySelector('.continue-btn').addEventListener('click', function() {
    window.location.href = 'siyaha3.html'; // Redirect to siyaha3.html
  });
  document.querySelector('.back-button').addEventListener('click', function() {
    window.location.href = 'siyaha1.html'; // Redirect to siyaha2.html
  });
