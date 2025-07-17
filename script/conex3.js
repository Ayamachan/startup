document.addEventListener('DOMContentLoaded', function () {
    const userType = localStorage.getItem('selectedUserType');
    if (!userType) {
        alert('Veuillez sélectionner un type de compte avant de vous inscrire.');
        window.location.href = 'conex2.html';
        return;
    }
    const selectedType = localStorage.getItem('selectedUserType');

    // وضعه داخل الحقل المخفي
    const userTypeInput = document.getElementById('user_type');
    if (userTypeInput && selectedType) {
        userTypeInput.value = selectedType;
    }
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordField = document.getElementById('password');

    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', function () {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);

            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Handle dropdowns
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-btn');
        const selectedOption = dropdown.querySelector('.selected-option');
        const items = dropdown.querySelectorAll('.dropdown-item');
        const content = dropdown.querySelector('.dropdown-content');

        if (btn && selectedOption && content) {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.dropdown-content.active').forEach(openContent => {
                    if (openContent !== content) openContent.classList.remove('active');
                });
                content.classList.toggle('active');
            });

            items.forEach(item => {
                item.addEventListener('click', () => {
                    selectedOption.textContent = item.textContent;
                    content.classList.remove('active');

                    // Set hidden input value
                    const value = item.dataset.value;
                    const hiddenInput = dropdown.parentElement.querySelector('input[type="hidden"]');
                    if (hiddenInput) {
                        hiddenInput.value = value;
                    }
                });
            });
        }
    });

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.classList.remove('active');
            });
        }
    });

    // Form submission
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // جمع البيانات مع التحقق من القيم
        const formData = {
            fullname: form.querySelector('[name="fullname"]').value.trim(),
            email: form.querySelector('[name="email"]').value.trim(),
            password: form.querySelector('[name="password"]').value.trim(),
            phone: form.querySelector('[name="phone"]').value.trim(),
            gender: document.getElementById('selected-gender').value || '',
            country: document.getElementById('selected-country').value || '',
            wilaya: document.getElementById('selected-wilaya').value || '',
            user_type: localStorage.getItem('selectedUserType') || '',
        };

        console.log('Payload:', formData); // للتتبع

        try {
            const res = await fetch('http://127.0.0.1:3000/api/auth/register', {
                method: 'POST',
                mode: 'cors', // تأكيد استخدام CORS
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
                // credentials: 'include' // إذا كنت تستخدم cookies
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Request failed');
            }

            const data = await res.json();
            alert('تم التسجيل بنجاح!');
            localStorage.removeItem('selectedUserType');
            if (data.userId) {
                localStorage.setItem('userId', data.userId); // تخزين userId
            }
            window.location.href = 'home.html';
        } catch (error) {
            console.error('Error:', error);
            alert(`خطأ: ${error.message || 'حدث خطأ غير متوقع'}`);
        }
    });

    //إذا أردت فقط الانتقال إلى home.html عند الضغط على الزر دون إرسال النموذج
    // حذف تعليق الأسطر التالية:

    //const createAccountButton = document.querySelector('.submit-btn');
    //if (createAccountButton) {
    //createAccountButton.addEventListener('click', function (event) {
    // event.preventDefault();
    // window.location.href = "home.html";
    // });
    // }
    //link
    //document.querySelector(".submit-btn").addEventListener("click", function(event) {
    // event.preventDefault(); // يمنع الإرسال الفعلي للفورم إذا كان داخل <form>
    // window.location.href = "home.html"; // ينقل للصفحة
    //});
});

//link
//document.querySelector(".submit-btn").addEventListener("click", function(event) {
//event.preventDefault(); // يمنع الإرسال الفعلي للفورم إذا كان داخل <form>
//window.location.href = "home.html"; // ينقل للصفحة
// });