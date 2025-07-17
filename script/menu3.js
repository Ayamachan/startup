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
    // Download button click handler
    const downloadButton = document.querySelector('.download-button');
    downloadButton.addEventListener('click', function() {
        alert('Téléchargement du document');
    });
    
    // Details button click handler
    const detailsButton = document.querySelector('.details-button');
    detailsButton.addEventListener('click', function() {
        alert('Affichage des détails de la réservation');
    });
    
    // Confirm button click handler
    const confirmButton = document.querySelector('.confirm-button');
    confirmButton.addEventListener('click', function() {
        alert('Demande confirmée');
    });
    
    // Refuse button click handler
    const refuseButton = document.querySelector('.refuse-button');
    refuseButton.addEventListener('click', function() {
        alert('Demande refusée');
    });
});