document.addEventListener('DOMContentLoaded', function() {
    // استخراج hospitalId من URL
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalId = urlParams.get('id');
    console.log('Hospital ID from URL:', hospitalId);

    // Form elements
    const medicalForm = document.getElementById('medicalForm');
    const uploadButton = document.getElementById('uploadButton');
    const fileUpload = document.getElementById('fileUpload');
    const backButton = document.getElementById('backButton');
    const confirmButton = document.getElementById('confirmButton');
    const dateInputs = document.querySelectorAll('#birthDate, #passportExpiry');
    const fileList = document.getElementById('fileList');

    // تهيئة حقل الهاتف الدولي
    const phoneInput = document.getElementById('phoneNumber');
    const iti = window.intlTelInput(phoneInput, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "dz",
        separateDialCode: true,
        autoPlaceholder: "off",
        customContainer: "phone-input-container", // تحديد الحاوية الخاصة
        allowDropdown: false // تعطيل القائمة المنسدلة للدول
    });

    // تمكين الكتابة مباشرة عند النقر في أي مكان على الحقل
    document.querySelector('.phone-input-container').addEventListener('click', function(e) {
        if (e.target !== phoneInput) {
            phoneInput.focus();
        }
    });

    // إدارة البلاسهولدر
    phoneInput.addEventListener('focus', function() {
        if (this.value === '') {
            this.placeholder = iti.getSelectedCountryData().dialCode;
        }
    });

    phoneInput.addEventListener('blur', function() {
        if (this.value === '') {
            this.placeholder = '🇩🇿 +213: 123 456 789';
        }
    });

    // التحقق من تاريخ الميلاد
    const birthDateInput = document.getElementById('birthDate');
    const birthDateError = document.getElementById('birthDateError');

    birthDateInput.addEventListener('change', function() {
        const today = new Date();
        const birthDate = new Date(this.value);

        if (birthDate > today) {
            birthDateError.textContent = "La date de naissance ne peut pas être dans le futur";
            this.setCustomValidity("Date invalide");
        } else {
            birthDateError.textContent = "";
            this.setCustomValidity("");
        }
    });

    // إظهار/إخفاء حقل "Autres" للتحسس
    document.querySelectorAll('input[name="allergies"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const otherInput = document.getElementById('otherAllergies');
            if (this.value === 'autres' && this.checked) {
                otherInput.style.display = 'block';
            } else if (this.value === 'autres' && !this.checked) {
                otherInput.style.display = 'none';
            }
        });
    });

    // Handle file upload button (نسخة محسنة من الكود القديم)
    uploadButton.addEventListener('click', function() {
        fileUpload.click();
    });

    // Show selected files (نسخة محسنة من الكود القديم)
    fileUpload.addEventListener('change', function() {
        fileList.innerHTML = '';
        if (this.files && this.files.length > 0) {
            Array.from(this.files).forEach(file => {
                const fileElement = document.createElement('div');
                fileElement.innerHTML = `
                    <i class="fas fa-file"></i>
                    <span>${file.name}</span>
                    <span class="file-size">(${(file.size / 1024).toFixed(2)} KB)</span>
                    <i class="fas fa-check" style="margin-left: 10px; color: green;"></i>
                `;
                fileList.appendChild(fileElement);
            });

            // إضافة أيقونة التأشير على الزر الرئيسي
            uploadButton.innerHTML = `<i class="fas fa-upload"></i> ${this.files.length} fichier(s) sélectionné(s) <i class="fas fa-check" style="margin-left: 10px; color: green;"></i>`;
        } else {
            uploadButton.innerHTML = '<i class="fas fa-upload"></i> Télécharger les rapports médicaux (PDF, JPG)';
        }
    });

    // Date inputs focus handler (محدثة)
    dateInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.type !== 'date') {
                try {
                    this.type = 'date';
                } catch(e) {
                    console.log('Date input not supported, keeping as text');
                }
            }
        });

        input.addEventListener('blur', function() {
            if (this.value === '' && this.type === 'date') {
                this.type = 'text';
                this.placeholder = 'YYYY-MM-DD';
            }
        });
    });


    // Form submission (محدثة مع دمج fetch وتضمين hospitalId)
    medicalForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic form validation
        const fullName = document.getElementById('fullName').value;
        const nationality = document.getElementById('nationality').value;
        const birthDate = document.getElementById('birthDate').value;
        const passportNumber = document.getElementById('passportNumber').value;
        const email = document.getElementById('email').value;
        const phone = phoneInput.value;

        if (!fullName || !nationality || !birthDate || !passportNumber || !email) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez saisir une adresse email valide');
            return;
        }
        if (phone && !iti.isValidNumber()) {
            alert('Veuillez saisir un numéro de téléphone valide');
            return;
        }
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        if (birthDateObj > today) {
            alert('La date de naissance ne peut pas être dans le futur');
            return;
        }

        // Collect form data (تم تضمين hospitals_id)
        const formData = {
            fullName,
            nationality,
            birthDate,
            passportNumber,
            passportExpiry: document.getElementById('passportExpiry').value,
            phoneNumber: iti.getNumber(),
            email,
            diagnosis: document.getElementById('diagnosis').value,
            medicalHistory: document.getElementById('medicalHistory').value,
            hospitals_id: hospitalId // تضمين hospitalId هنا
        };

        // إرسال البيانات باستخدام fetch
        fetch('http://127.0.0.1:3000/api/patients/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Réponse du serveur:', data);
            if (data.success) {
                localStorage.setItem('patientId', data.patientId);
                window.location.href = 'comhopital.html';
            } else {
                alert('حدث خطأ أثناء حفظ المعلومات.');
            }
        })
        .catch(error => {
            console.error('خطأ في إرسال البيانات:', error);
            alert('حدث خطأ في إرسال البيانات إلى الخادم.');
        });
    });

    // روابط الأزرار
    // document.getElementById("backButton").addEventListener("click", function () {
    //     window.location.href = "hopital.html";
    // });
    // const confirmButton = document.getElementById('confirmButton');
    // confirmButton.addEventListener('click', function(e) {
    //  e.preventDefault(); // منع الإرسال الفوري للنموذج
    //  // يمكنك تنفيذ التحقق أو إرسال البيانات هنا لو تحب
    //  window.location.href = 'comhopital.html'; // التوجيه إلى الصفحة المطلوبة
    // });
});