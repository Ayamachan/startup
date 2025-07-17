// جلب قائمة المستشفيات من Local Storage
const searchResults = localStorage.getItem('searchResults');
let hospitals = [];
try {
    hospitals = searchResults ? JSON.parse(searchResults) : [];
    const container = document.getElementById('hospitals-container');

if (hospitals.length > 0) {
    hospitals.forEach(hospital => {
        const card = document.createElement('div');
        card.classList.add('hospital-card');
        //const image_path = hospital.image_path || 'app/z/hst2.jpg'; // استخدم image_path هنا
    // صورة افتراضية في حال عدم وجود مس
        card.innerHTML = `
            <h3>${hospital.name}</h3>
            <p><strong>Spécialité:</strong> ${hospital.specialty || 'N/A'}</p>
            <p><strong>Ville:</strong> ${hospital.city || 'N/A'}</p>
            <p><strong>Pays:</strong> ${hospital.country || 'N/A'}</p>
            <p><strong>Services:</strong> ${hospital.services?.join(', ') || 'N/A'}</p>
              <img src="../z/hst1.jpg" alt="${hospital.name}" />
        `;

        container.appendChild(card);
    });
} else {
    container.innerHTML = '<p>Aucun hôpital trouvé.</p>';
}

} catch (e) {
    console.error('Erreur lors de l’analyse des résultats:', e);
}
// توليد نجوم التقييم
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += `<span class="star">★</span>`;
    }
    if (halfStar) {
        starsHTML += `<span class="star">★</span>`;
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += `<span class="star">☆</span>`;
    }
    return starsHTML;
}

// توليد بطاقة مستشفى
function createHospitalCard(hospital) {
     
    return `
        <div class="hospital-card" data-hospital-id="${hospital.id}">
            <p class="hospital-id"><strong>ID:</strong> ${hospital.id}</p>
         <img class="hospital-image"
         src="../z/hst1.jpg"
         alt="${hospital.name}" />
            <div class="hospital-content">
                <h2 class="hospital-name">${hospital.name}</h2>
                <p class="hospital-specialty"><strong>Spécialité:</strong> ${hospital.specialty}</p>
                <div class="hospital-location">
                    <p class="hospital-address">
                      ${hospital.city}, ${hospital.country}<br>
                      Adresse : ${hospital.address || 'Non spécifiée'}
                    </p>
                </div>
                <div class="hospital-rating">
                    <div class="stars">
                        ${generateStars(hospital.rating || 0)}
                    </div>
                    <span class="rating-value">
                      ${hospital.rating || 'N/A'} (${hospital.reviews || 0} avis)
                    </span>
                </div>
                <div class="hospital-details">
                    <span class="hospital-price">
                      ${hospital.price ? hospital.price + ' € /consultation' : 'Prix non disponible'}
                    </span>
                    <button class="hospital-cta" data-hospital-id="${hospital.id}">Choisir</button>
                </div>
            </div>
        </div>
    `;
}

// عرض جميع المستشفيات
function renderHospitals() {
    const container = document.getElementById('hospitals-container');
    if (!container) return;

    container.innerHTML = '';
    if (hospitals.length === 0) {
        container.innerHTML = '<p>Aucun hôpital trouvé avec ces critères.</p>';
        return;
    }

    hospitals.forEach(hospital => {
        container.innerHTML += createHospitalCard(hospital);
    });

    // ربط الحدث بأزرار الاختيار
    document.querySelectorAll('.hospital-cta').forEach(button => {
        button.addEventListener('click', () => {
            const hospitalId = button.getAttribute('data-hospital-id');
            window.location.href = `rsv2hopital.html?id=${hospitalId}`;
        });
    });
}

// بدء التنفيذ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', renderHospitals);
