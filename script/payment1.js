document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour formater l'entrée du numéro de carte
    const cardNumberInput = document.getElementById('cardNumber');
    
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value;
        
        // Supprimer tous les caractères non numériques
        value = value.replace(/[^\d]/g, '');
        
        // Limiter à 16 chiffres
        if (value.length > 16) {
            value = value.slice(0, 16);
        }
        
        // Ajouter des espaces tous les 4 chiffres
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
    });
    
    // Fonction pour limiter l'entrée du CVV à 3 ou 4 chiffres
    const cvvInput = document.getElementById('cvvCode');
    
    cvvInput.addEventListener('input', function(e) {
        let value = e.target.value;
        
        // Supprimer tous les caractères non numériques
        value = value.replace(/[^\d]/g, '');
        
        // Limiter à 4 chiffres
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        
        e.target.value = value;
    });
    
    // Sélecteur de date d'expiration
    const expiryDateInput = document.getElementById('expiryDate');
    const datePicker = document.getElementById('datePicker');
    const monthSelector = document.getElementById('monthSelector');
    const yearSelector = document.getElementById('yearSelector');
    const confirmDateBtn = document.getElementById('confirmDate');
    
    // Populer le sélecteur d'année
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 15; i++) {
        const year = currentYear + i;
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelector.appendChild(option);
    }
    
    // Afficher/Masquer le sélecteur de date
    expiryDateInput.addEventListener('click', function() {
        datePicker.style.display = 'block';
    });
    
    // Fermer le sélecteur au clic à l'extérieur
    document.addEventListener('click', function(e) {
        if (!expiryDateInput.contains(e.target) && 
            !datePicker.contains(e.target)) {
            datePicker.style.display = 'none';
        }
    });
    
    // Confirmer la date sélectionnée
    confirmDateBtn.addEventListener('click', function() {
        const selectedMonth = monthSelector.value;
        const selectedYear = yearSelector.value;
        expiryDateInput.value = `${selectedMonth}/${selectedYear.slice(2)}`;
        datePicker.style.display = 'none';
    });
    
    // Gérer le bouton de retour
    const backButton = document.querySelector('.back-button');
    
    backButton.addEventListener('click', function() {
        // Ici, vous pouvez ajouter la logique de navigation vers la page précédente
        console.log('Retour à la page précédente');
        // Par exemple: window.history.back();
    });
    
    // Gérer le bouton de paiement
    const paymentButton = document.querySelector('.payment-button');
    
    paymentButton.addEventListener('click', function() {
        // Ici, vous pouvez ajouter la validation du formulaire et la logique de paiement
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        const expiryDate = expiryDateInput.value;
        const cardholderName = document.getElementById('cardholderName').value;
        const cvv = cvvInput.value;
        const saveCard = document.getElementById('saveCard').checked;
        
        if (!cardNumber || !expiryDate || !cardholderName || !cvv) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Validation simple du format de date
        const datePattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
        if (!datePattern.test(expiryDate)) {
            alert('Format de date invalide. Utilisez MM/AA.');
            return;
        }
        
        // Simuler le traitement du paiement
        alert('Paiement en cours de traitement...');
        console.log('Paiement avec les détails suivants :', {
            cardNumber,
            expiryDate,
            cardholderName,
            cvv,
            saveCard
        });
    });
});


//link 
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.payment-button').addEventListener('click', function () {
        window.location.href = 'payment2.html';
    });
});

