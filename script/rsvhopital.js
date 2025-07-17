document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');

    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const country = document.getElementById('country').value;
        const specialty = document.getElementById('specialty').value;
        const city = document.getElementById('city').value;
        const hospital = document.getElementById('hospital').value;
        const services = Array.from(document.querySelectorAll('input[name="services"]:checked'))
                                .map(checkbox => checkbox.value);

        const formData = {
            country,
            specialty,
            city,
            hospital,
            services,


        };

        // إرسال البيانات إلى الواجهة الخلفية
        fetch('http://127.0.0.1:3000/api/hospitals/search', { // تأكد من أن هذا المسار صحيح في ملف app.js الخاص بك
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Réponse du serveur:', data);
            // هنا يمكنك توجيه المستخدم إلى صفحة hopital.html مع بيانات المستشفيات
            // أو تحديث صفحة hopital.html ديناميكيًا
            localStorage.setItem('searchResults', JSON.stringify(data.hospitals));
            if (data.hospitals && data.hospitals.length > 0) {
        localStorage.setItem('searchResults', JSON.stringify(data.hospitals));
        window.location.href = 'hopital.html';
    } else {
        alert('Aucun hôpital trouvé avec ces critères.');
    }
            window.location.href = 'hopital.html';
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi des données:', error);
            alert('Une erreur s\'est produite lors de la recherche des hôpitaux.');
        });
    });

    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');

    const citiesByCountry = {
       france: ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Nice'],
        belgique: ['Bruxelles', 'Anvers', 'Liège', 'Gand', 'Charleroi'],
        suisse: ['Genève', 'Zurich', 'Berne', 'Lausanne', 'Bâle'],
        allemagne: ['Berlin', 'Hambourg', 'Munich', 'Cologne', 'Francfort'],
        espagne: ['Madrid', 'Barcelone', 'Valence', 'Séville', 'Bilbao'],
        italie: ['Rome', 'Milan', 'Naples', 'Turin', 'Florence'],
        turke: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana'],
        algerie: ['Alger', 'Oran', 'Constantine', 'Annaba', 'Blida'],
        tunisie: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte'],
        egypte: ['Le Caire', 'Alexandrie', 'Gizeh', 'Port-Saïd', 'Suez'],
        jordanie: ['Amman', 'Irbid', 'Zarqa', 'Aqaba', 'Madaba'],
        'emirats-arabes-unis': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman'],
        canada: ['Montréal', 'Québec', 'Ottawa', 'Toronto', 'Vancouver'],
        usa: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
        australie: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
        japon: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya'],
        chine: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou']
    };

    countrySelect.addEventListener('change', function() {
        while (citySelect.options.length > 1) {
            citySelect.remove(1);
        }

        const selectedCountry = this.value;
        if (selectedCountry && citiesByCountry[selectedCountry]) {
            citiesByCountry[selectedCountry].forEach(city => {
                const option = document.createElement('option');
                option.value = city.toLowerCase();
                option.textContent = city;
                citySelect.appendChild(option);
            });
            citySelect.disabled = false;
        } else {
            citySelect.disabled = true;
        }
    });
});