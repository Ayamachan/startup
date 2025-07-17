// conex1.js
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('.form'); // النموذج الرئيسي
  const loginButton = loginForm.querySelector('.btn'); // زر الدخول

  loginButton.addEventListener('click', function(event) {
    event.preventDefault(); // منع إرسال النموذج التقليدي

    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      alert('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    fetch('http://127.0.0.1:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(async response => {
      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);

        // يمكنك حفظ التوكن أو بيانات المستخدم هنا إذا أردت
        // localStorage.setItem('token', data.token);

        window.location.href = 'home.html'; // التوجيه بعد النجاح
      } else {
        console.error('Login failed:', data);
        alert(data.message || 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      }
    })
    .catch(error => {
      console.error('There was an error during login:', error);
      alert('حدث خطأ أثناء محاولة تسجيل الدخول.');
    });
  });
});
