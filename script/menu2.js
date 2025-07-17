document.addEventListener('DOMContentLoaded', function() {
    // Menu icon click handler
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.addEventListener('click', function() {
        alert('Menu clicked');
    });

    // Notification icon click handler
    const notificationIcon = document.querySelector('.notification-icon');
    notificationIcon.addEventListener('click', function() {
        alert('Notifications clicked');
    });
    // Edit button click handler
    const editButton = document.querySelector('.edit-button');
    editButton.addEventListener('click', function() {
        alert('Modifier les informations personnelles');
    });
});
