document.addEventListener('DOMContentLoaded', function() {
    const searchResults = localStorage.getItem('hotelSearchResults');
    const hotelListContainer = document.querySelector('.hotel-list');

    if (searchResults) {
        const hotels = JSON.parse(searchResults);
        if (hotels && hotels.length > 0) {
            hotelListContainer.innerHTML = ''; // مسح أي محتوى سابق
            hotels.forEach(hotel => {
                const hotelCard = document.createElement('div');
                hotelCard.classList.add('hotel-card');
                hotelCard.innerHTML = `
                    <img src="${hotel.image_url || '../z/ht_default.png'}" alt="${hotel.name}">
                    <div class="hotel-details">
                        <h3>${hotel.name}</h3>
                        <p class="distance">المسافة إلى المستشفى: ${hotel.distance_to_hospital || 'غير متوفر'} كم</p>
                        <p class="price">${hotel.price || 'غير متوفر'}€ لليلة</p>
                        <div class="rating">
                            <i class="fas fa-star"></i> ${hotel.rating || 'غير متوفر'}
                        </div>
                        <div class="hotel-buttons">
                            <button class="details-btn">عرض التفاصيل</button>
                            <button class="choose-btn" data-hotel-id="${hotel.id}">اختر</button>
                        </div>
                    </div>
                `;
                hotelListContainer.appendChild(hotelCard);

                // إضافة مستمع حدث لزر "اختر"
                const chooseButton = hotelCard.querySelector('.choose-btn');
                chooseButton.addEventListener('click', function() {
                    const hotelId = this.dataset.hotelId;
                    localStorage.setItem('selectedHotelId', hotelId);
                    window.location.href = 'hotel3.html';
                });
            });
        } else {
            hotelListContainer.innerHTML = '<p>لم يتم العثور على أي فنادق تطابق معاييرك.</p>';
        }
        localStorage.removeItem('hotelSearchResults'); // قم بإزالة النتائج من localStorage بعد عرضها
    } else {
        hotelListContainer.innerHTML = '<p>لا توجد نتائج بحث متاحة.</p>';
    }
});