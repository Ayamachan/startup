document.addEventListener('DOMContentLoaded', function () {
  // Services data
  const services = [
    {
      title: 'Hôtel',
      description: 'Profitez des séjours agréables avec des hôtels confortables et bien situés.',
      imageSrc: '../z/htl.jpg',
      link: 'hotel1.html'
    },
    {
      title: 'Vol',
      description: 'Réservez votre vol rapidement et facilement pour bénéficier des meilleures offres pour votre voyage.',
      imageSrc: '../z/vol.jpg'
      
    },


     {
      title: 'Hôpitaux',
      description: 'Accédez à des services médicaux fiables et modernes dans les meilleurs hôpitaux partenaires.',
      imageSrc: '../z/pital.jpg',
      link: 'rsvhpital.html'
    },
    
    {
      title: 'Visa',
      description: 'Demandez votre visa facilement et suivez votre demande en ligne sans complications.',
      imageSrc: '../z/visa.jpg'
    },
    {
      title: 'Traducteur',
      description: "Entrez en contact en langue grâce à nos traducteurs professionnels disponibles sur place.",
      imageSrc: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },

{ title: 'Tourisme',
      description: 'Découvrez des lieux uniques et visitez des attractions touristiques populaires.',
      imageSrc: '../z/siyaha.jpg',
      link: 'siyaha1.html'
    },



    
    {
      title: 'Guide',
      description: 'Explorez chaque ville avec un guide local pour une meilleure expérience touristique.',
      imageSrc: '../z/guid.jpg'
    },

    { title: 'Dons',
      description: 'Aidez ceux qui en ont besoin en faisant des dons transparents et sûrs.',
      imageSrc: '../z/donnation.jpg',
      link: 'dons1.html'
    },
    
  ];

  const servicesContainer = document.getElementById('services-container');

  services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';

    serviceCard.innerHTML = `
      <div class="service-image-container">
        <img src="${service.imageSrc}" alt="${service.title}" class="service-image">
      </div>
      <div class="service-content">
        <h3 class="service-title">${service.title}</h3>
        <p class="service-description">${service.description}</p>
      </div>
    `;

    // ✅ ربط بالرابط إذا كان موجود
    if (service.link) {
      serviceCard.addEventListener('click', () => {
        window.location.href = service.link;
      });
    }

    servicesContainer.appendChild(serviceCard);
  });

  // باقي الأحداث الأخرى
  const menuIcon = document.querySelector('.menu-icon');
  if (menuIcon) {
    menuIcon.addEventListener('click', function () {
      alert('Menu clicked - This would open a navigation menu');
    });
  }

  const bellIcon = document.querySelector('.bell-icon');
  if (bellIcon) {
    bellIcon.addEventListener('click', function () {
      alert('Notifications clicked - This would show your notifications');
    });
  }

  const footerButtons = document.querySelectorAll('.footer-button');
  footerButtons.forEach(button => {
    button.addEventListener('click', function () {
      alert(`${button.textContent} - This would navigate to the appropriate page`);
    });
  });
});
