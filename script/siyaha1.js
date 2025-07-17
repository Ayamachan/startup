












//link
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".view-more-btn");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetUrl = btn.getAttribute("data-url");
        window.location.href = targetUrl; // فتح في نفس الصفحة
      });
    });
  });
  document.querySelector('.back-button').addEventListener('click', function() {
    window.location.href = 'home.html'; // Redirect to siyaha2.html
  });
