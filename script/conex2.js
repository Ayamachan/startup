document.addEventListener('DOMContentLoaded', function () {
  const userTypes = {
    'patient-card': 'Patient',
    'donateur-card': 'Donateur',
    'guide-card': 'GuideTouristique',
    'traducteur-card': 'Traducteur'
  };

  Object.keys(userTypes).forEach(cardId => {
    const card = document.getElementById(cardId);
    if (card) {
      card.addEventListener('click', function () {
        const selectedType = userTypes[cardId];

        // حفظ نوع المستخدم في localStorage
        localStorage.setItem('selectedUserType', selectedType);

        // الانتقال مباشرة إلى صفحة التسجيل
        window.location.href = 'conex3.html';
      });
    }
  });
});
