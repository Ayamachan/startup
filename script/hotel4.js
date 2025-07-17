document.addEventListener('DOMContentLoaded', function() {
    const infoRows = document.querySelectorAll('.info-row');
    const evaluateBtn = document.querySelector('.evaluate-btn');

    // استرداد البيانات من localStorage
    const patientName = localStorage.getItem('selectednom');
    const hotelName = localStorage.getItem('hotelNameForPayment');
    const checkInDate = localStorage.getItem('selectedDate');
    const paymentStatus = 'En attente';

    // تحديث معلومات الحجز
    if (infoRows.length > 0) {
        // Nom du patient
        const patientNameLabel = Array.from(infoRows[0].querySelectorAll('.label')).find(label => label.textContent.includes('Nom du patient'));
        if (patientNameLabel) {
            patientNameLabel.textContent = `Nom du patient : ${patientName || 'غير متوفر'}`;
        }

        // Numéro de réservation
        const reservationNumberLabel = Array.from(infoRows[1].querySelectorAll('.label')).find(label => label.textContent.includes('Numéro de réservation'));
        if (reservationNumberLabel) {
            const reservationNumber = 'RES-' + Date.now().toString().slice(-6);
            reservationNumberLabel.textContent = `Numéro de réservation : #${reservationNumber}`;
        }

        // Statut du paiement
        const paymentStatusLabel = Array.from(infoRows[2].querySelectorAll('.label')).find(label => label.textContent.includes('Statut du paiement'));
        if (paymentStatusLabel) {
            paymentStatusLabel.textContent = `Statut du paiement : ${paymentStatus}`;
        }
    }

    // تحديث معلومات الفندق
    if (infoRows.length > 3) {
        // Nom de l'hôte
        const hotelNameLabel = Array.from(infoRows[3].querySelectorAll('.label')).find(label => label.textContent.includes('Nom de l\'hôte'));
        if (hotelNameLabel) {
            hotelNameLabel.textContent = `Nom de l'hôte : ${hotelName || 'غير متوفر'}`;
        }

        // Départ (سنستخدم تاريخ الوصول)
        const departureDateLabel = Array.from(infoRows[5].querySelectorAll('.label')).find(label => label.textContent.includes('Départ'));
        if (departureDateLabel) {
            departureDateLabel.textContent = `Départ : ${checkInDate || 'غير متوفر'}`;
        }
    }

    if (evaluateBtn) {
        evaluateBtn.addEventListener('click', function() {
            window.location.href = 'avis.html';
        });
    }
});