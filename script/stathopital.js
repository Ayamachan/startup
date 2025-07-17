document.addEventListener('DOMContentLoaded', function() {
    // Handle tab switching
    const tabs = document.querySelectorAll('.tab');
    const progressIndicator = document.querySelector('.progress-indicator');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update progress indicator position
            const width = 25; // 25% for each tab
            progressIndicator.style.width = `${width}%`;
            progressIndicator.style.left = `${width * index}%`;
        });
    });
    
    // Handle feedback button
    const feedbackButton = document.querySelector('.feedback-btn');
    feedbackButton.addEventListener('click', function() {
        alert('Merci de nous aider à améliorer notre service !');
    });
    
    // Handle notification icon
    const notificationIcon = document.querySelector('.notification-icon');
    notificationIcon.addEventListener('click', function() {
        alert('Aucune nouvelle notification');
    });
    
    // Handle menu icon
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.addEventListener('click', function() {
        alert('Menu ouvert');
    });
});
