
         

//link
 document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // إلغاء إرسال النموذج
    window.location.href = 'demande1.html'; // الانتقال للصفحة التالية
  });
});
