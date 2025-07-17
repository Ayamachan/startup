document.addEventListener('DOMContentLoaded', function() {
    // Select form elements
    const donationForm = document.querySelector('.container');
    const donationAmounts = document.querySelectorAll('input[name="donation-amount"]');
    const customAmountInput = document.getElementById('custom-amount');
    const paymentMethodCheckbox = document.getElementById('payment-gold');
    const submitButton = document.querySelector('.submit-btn');
    
    // Handle custom amount input - clear radio selection
    customAmountInput.addEventListener('focus', function() {
        donationAmounts.forEach(radio => {
            radio.checked = false;
        });
    });
    
    // When radio button is selected, clear custom amount
    donationAmounts.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                customAmountInput.value = '';
            }
        });
    });
    
    // Handle form submission
    submitButton.addEventListener('click', function() {
        // Get selected amount
        let selectedAmount = 0;
        let isAmountSelected = false;
        
        donationAmounts.forEach(radio => {
            if (radio.checked) {
                selectedAmount = radio.value;
                isAmountSelected = true;
            }
        });
        
        if (!isAmountSelected && customAmountInput.value) {
            selectedAmount = customAmountInput.value;
            isAmountSelected = true;
        }
        
        // Check if payment method is selected
        let isPaymentSelected = paymentMethodCheckbox.checked;
        
        // Validate form
        if (!isAmountSelected) {
            alert('الرجاء اختيار مبلغ التبرع');
            return;
        }
        
        if (!isPaymentSelected) {
            alert('الرجاء اختيار طريقة الدفع');
            return;
        }
        
        // Form is valid, proceed to payment
        alert('جاري الانتقال إلى صفحة الدفع...');
        // In a real implementation, you would redirect to payment page or process payment
        // window.location.href = "payment.html?amount=" + selectedAmount;
        
        // For demo purposes, redirect to success page
        window.location.href = "success.html";
    });
});
