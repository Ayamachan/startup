window.addEventListener('load', function () {
    function attemptToAddFormListener() {
        const form = document.getElementById('hotel-search-form');
        if (form) {
            console.log('Form element found. Attempting to add listener.');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const numberOfGuests = document.getElementById('number_of_guests').value;
                const checkInDate = document.getElementById('check_in_date').value;
                

                console.log('Form values - Guests:', numberOfGuests, 'Date:', checkInDate, 'Name:',);

                const formData = {
                    distance: document.getElementById('distance').value,
                    hospitalName: document.getElementById('hospitalName').value,
                    budget: document.getElementById('budget').value,
                    number_of_guests: numberOfGuests,
                    check_in_date: checkInDate,
                   
                };
                console.log('Sending search data:', formData);
                fetch('http://127.0.0.1:3000/api/hotels/find', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Hotels received:', data);
                    localStorage.setItem('hotelSearchResults', JSON.stringify(data.hotels));
                    localStorage.setItem('selectedGuests', numberOfGuests);
                    localStorage.setItem('selectedDate', checkInDate);
                    window.location.href = 'hotel2.html';
                })
                .catch(error => {
                    console.error('Error during hotel search:', error);
                    alert('حدث خطأ أثناء البحث عن الفنادق.');
                });
            });
        } else {
            console.log("Form 'hotel-search-form' not yet loaded. Trying again for form...");
            setTimeout(attemptToAddFormListener, 100);
        }
    }

    function initializeUIListeners() {
        const notifIcon = document.getElementById('notif-icon');
        const menuIcon = document.getElementById('menu-icon');
        const calendarBtn = document.getElementById('calendar-btn');
        const checkInDateInput = document.getElementById('check_in_date');

        if (notifIcon) {
            notifIcon.addEventListener('click', async function (event) {
                event.preventDefault();
                let isNotifOpen = notificationsContainer.style.display === 'block';
                isNotifOpen = await loadAndToggleContent('menu3.html', notificationsContainer, isNotifOpen);
                if (isMenuOpen) {
                    menuContainer.style.display = 'none';
                    isMenuOpen = false;
                }
            });
        } else {
            console.log("Notification icon not found.");
        }

        if (menuIcon) {
            menuIcon.addEventListener('click', async function (event) {
                event.preventDefault();
                let isMenuOpen = menuContainer.style.display === 'block';
                isMenuOpen = await loadAndToggleContent('menu.html', menuContainer, isMenuOpen);
                if (isNotifOpen) {
                    notificationsContainer.style.display = 'none';
                    isNotifOpen = false;
                }
            });
        } else {
            console.log("Menu icon not found.");
        }

        if (calendarBtn && checkInDateInput) {
            flatpickr(checkInDateInput);
            calendarBtn.addEventListener('click', function() {
                checkInDateInput._flatpickr.open();
            });
            const today = new Date();
            checkInDateInput.value = formatDate(today);
            function formatDate(date) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            }
        } else {
            console.log("Calendar elements not found.");
        }
    }

    let isNotifOpen = false;
    let isMenuOpen = false;
    const notificationsContainer = document.getElementById('notifications-container');
    const menuContainer = document.getElementById('menu-container');

    async function loadAndToggleContent(url, containerElement, isOpen) {
        if (!isOpen) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                containerElement.innerHTML = html;
                containerElement.style.display = 'block';
                return true;
            } catch (error) {
                console.error('Failed to fetch content:', error);
                return false;
            }
        } else {
            containerElement.style.display = 'none';
            containerElement.innerHTML = '';
            return false;
        }
    }

    attemptToAddFormListener();
    initializeUIListeners();
});