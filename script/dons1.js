document.addEventListener('DOMContentLoaded', function() {
    // قم بإضافة وظائف التحكم في الأزرار
    const donateButtons = document.querySelectorAll('.donate-btn');
    const docsButtons = document.querySelectorAll('.docs-btn');
    const helpButton = document.querySelector('.help-btn');
    
    
    // إضافة تأثيرات بصرية عند تمرير المؤشر فوق البطاقات
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
});


//link
 document.querySelectorAll('.donate-btn').forEach(function(button) {
    button.addEventListener('click', function() {
      window.location.href = 'don2.html'; // الانتقال إلى dons2.html
    });
  });
   document.querySelector('.help-btn').addEventListener('click', function() {
    window.location.href = 'demande2.html';
  });


