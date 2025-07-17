document.addEventListener('DOMContentLoaded', function() {
    const hotelImageElement = document.getElementById('hotel-image');
    const hotelNameElement = document.getElementById('hotel-name');
    const hotelRatingElement = document.getElementById('hotel-rating');
    const totalPriceElement = document.getElementById('total-price');
    const reservationNumberElement = document.getElementById('reservation-number');
    const numPersonsElement = document.getElementById('num-persons');
    const stayDatesElement = document.getElementById('stay-dates');
    const backButton = document.querySelector('.back-btn');
    const confirmReservationButton = document.querySelector('.confirm-btn');

    async function fetchSelectedHotelData() {
        try {
            const selectedHotelId = localStorage.getItem('selectedHotelId');
            const selectedGuests = localStorage.getItem('selectedGuests');
            const selectedDate = localStorage.getItem('selectedDate');
            const selectedNom = localStorage.getItem('selectednom'); // استرداد الاسم الكامل

            if (!selectedHotelId) {
                console.error('لم يتم العثور على معرف الفندق المحدد في localStorage.');
                return;
            }

            const hotelResponse = await fetch(`http://127.0.0.1:3000/api/hotels/${selectedHotelId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!hotelResponse.ok) {
                throw new Error(`HTTP error! status: ${hotelResponse.status}`);
            }
            const hotelData = await hotelResponse.json();
            const hotel = hotelData.hotel;

            if (hotel) {
                hotelImageElement.src = hotel.image_url || '../z/ht_default.png';
                hotelNameElement.textContent = hotel.name || 'اسم الفندق';
                hotelRatingElement.textContent = `${hotel.rating || 'غير متوفر'}/5`;
                totalPriceElement.textContent = hotel.price || 'غير متوفر';
                reservationNumberElement.textContent = 'في انتظار التأكيد';

                if (selectedGuests) {
                    numPersonsElement.textContent = selectedGuests;
                } else {
                    numPersonsElement.textContent = 'غير محدد';
                }

                if (selectedDate) {
                    stayDatesElement.textContent = selectedDate;
                } else {
                    stayDatesElement.textContent = 'غير محدد';
                }

                // تخزين اسم الفندق مؤقتًا لنقله إلى hotel4
                localStorage.setItem('hotelNameForPayment', hotel.name);
            } else {
                console.error('لم يتم العثور على بيانات الفندق.');
            }

        } catch (error) {
            console.error('خطأ في جلب بيانات الفندق:', error);
        }
    }

    fetchSelectedHotelData();

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'hotel2.html';
        });
    }

    // معالجة الضغط على زر تأكيد الحجز والدفع
    if (confirmReservationButton) {
        confirmReservationButton.addEventListener('click', () => {
            const selectedNom = localStorage.getItem('selectednom');
            // يمكنك هنا جلب أو إنشاء رقم الحجز وحالة الدفع وتاريخ المغادرة
            const reservationNumber = 'RES-2025-001'; // قيمة افتراضية
            const paymentStatus = 'قيد المعالجة'; // قيمة افتراضية
            const departureDate = '2025/05/25'; // قيمة افتراضية

            // تخزين البيانات في localStorage لنقلها إلى hotel4
            localStorage.setItem('nomCompletPayment', selectedNom);
            localStorage.setItem('reservationNumber', reservationNumber);
            localStorage.setItem('paymentStatus', paymentStatus);
            localStorage.setItem('departureDate', departureDate);
            localStorage.setItem('hotelNameForPayment', document.getElementById('hotel-name').textContent); // الحصول على اسم الفندق من الصفحة

            window.location.href = 'hotel4.html';
        });
    } else {
        console.warn('لم يتم العثور على زر ".confirm-btn".');
    }
});