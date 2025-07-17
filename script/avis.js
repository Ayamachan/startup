// document.addEventListener('DOMContentLoaded', function() {
//     // Handle star rating functionality
//     const starRating = document.getElementById('user-rating');
//     const stars = starRating.querySelectorAll('i');
    
//     stars.forEach((star, index) => {
//       star.addEventListener('click', () => {
//         // Reset all stars
//         stars.forEach(s => s.className = 'fa-regular fa-star');
        
//         // Fill stars up to and including the clicked star
//         for (let i = 0; i <= index; i++) {
//           stars[i].className = 'fa-solid fa-star';
//         }
//       });
      
//       // Hover effect
//       star.addEventListener('mouseover', () => {
//         for (let i = 0; i <= index; i++) {
//           stars[i].style.color = '#ffcc00';
//         }
//       });
      
//       star.addEventListener('mouseout', () => {
//         stars.forEach(s => s.style.color = '#ffc107');
//       });
//     });
    
//     // Submit button functionality
//     const submitButton = document.querySelector('.submit-button');
//     submitButton.addEventListener('click', function() {
//       const textarea = document.querySelector('textarea');
//       const rating = document.querySelectorAll('#user-rating .fa-solid.fa-star').length;
      
//       if (rating === 0) {
//         alert('Veuillez donner une évaluation en étoiles.');
//         return;
//       }
      
//       if (!textarea.value.trim()) {
//         alert('Veuillez laisser un commentaire.');
//         return;
//       }
      
//       // Here you would normally send this data to a server
//       alert(`Merci pour votre avis ! Évaluation: ${rating}/5 étoiles`);
//       textarea.value = '';
      
//       // Reset stars to default (4 stars in this case)
//       stars.forEach((s, i) => {
//         s.className = i < 4 ? 'fa-solid fa-star' : 'fa-regular fa-star';
//       });
//     });
    
//     // Back button functionality
//     const backButton = document.querySelector('.back-button');
//     backButton.addEventListener('click', function() {
//       alert('Retour à la page d\'accueil');
//       // In a real app, this would navigate to the home page
//       // window.location.href = 'home.html';
//     });
    
//     // Make the header icons interactive
//     const notificationIcon = document.querySelector('.notification-icon');
//     notificationIcon.addEventListener('click', function() {
//       alert('Notifications');
//     });
    
//     const menuIcon = document.querySelector('.menu-icon');
//     menuIcon.addEventListener('click', function() {
//       alert('Menu');
//     });
//   });




//
 document.querySelector('.back-button').addEventListener('click', function() {
    window.location.href = 'home.html';
  });
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.tracking-button').addEventListener('click', function () {
        window.location.href = 'avis.html';
    });
});
