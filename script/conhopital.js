document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {});

    const modifyButton = document.querySelector('.modify-btn');
    modifyButton.addEventListener('click', function() {
        console.log('Editing patient details');
        alert('Opening patient details editor');
    });

    const cancelButton = document.querySelector('.cancel-btn');
    cancelButton.addEventListener('click', function() {
        if (confirm('Êtes-vous sûr de vouloir annuler cette réservation?')) {
            console.log('Reservation cancelled');
            alert('Réservation annulée');
        }
    });

    const paymentButton = document.querySelector('.payment-btn');
    paymentButton.addEventListener('click', function() {});

    // جلب معرف المريض من localStorage (تأكد من حفظه عند الحفظ الناجح في rsv2hopital.js)
    const patientId = localStorage.getItem('patientId');

    if (patientId) {
        fetch(`http://127.0.0.1:3000/api/patients/details/${patientId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    displayPatientInfo(data.patient);
                    displayHospitalInfo(data.hospital);
                    // يمكنك إضافة المزيد لعرض التفاصيل الطبية إذا لزم الأمر
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching details:', error);
                alert('فشل في جلب التفاصيل.');
            });
    } else {
        alert('لم يتم العثور على معرف المريض.');
        // يمكنك توجيه المستخدم إلى صفحة أخرى هنا
    }

    function displayPatientInfo(patient) {
        document.querySelector('.info-content:nth-child(2) p:nth-child(1)').textContent = `Nom du patient : ${patient.fullName || 'N/A'}`;
        document.querySelector('.info-content:nth-child(2) p:nth-child(2)').textContent = `Numéro de passeport : ${patient.passportNumber || 'N/A'}`;
        document.querySelector('.info-content:nth-child(2) p:nth-child(3)').textContent = `Téléphone : ${patient.phoneNumber || 'N/A'}`;
        document.querySelector('.info-content:nth-child(2) p:nth-child(4)').textContent = `Email : ${patient.email || 'N/A'}`;
        // ... قم بتحديث المزيد من حقول معلومات المريض ...
    }

 function displayHospitalInfo(hospital) {
    const hospitalInfoContent = document.getElementById('hospitalInfoContent');
    if (hospital && hospitalInfoContent) {
        document.getElementById('hospitalName').textContent = hospital.name || 'N/A';
        document.getElementById('hospitalSpecialty').textContent = hospital.specialty || 'N/A';
        // يمكنك إضافة المزيد لعرض تفاصيل أخرى للمستشفى هنا
    } else if (hospitalInfoContent) {
        hospitalInfoContent.innerHTML = '<p><strong>Hôpital :</strong> لا يوجد مستشفى محدد.</p>';
    }
}
});

// روابط الأزرار
document.querySelector('.back-button').addEventListener('click', function() {
    window.location.href = 'rsv2hopital.html';
});
document.querySelector('.payment-btn').addEventListener('click', function() {
    window.location.href = 'payment1.html';
});
document.querySelector('.cancel-btn').addEventListener('click', function() {
    window.location.href = 'home.html';
});