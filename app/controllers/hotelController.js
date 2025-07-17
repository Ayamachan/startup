const Hotel = require('../models/Hotel');

const hotelController = {};

hotelController.findHotels = (req, res) => {
    const criteria = {
        distance: req.body.distance,
        hospitalName: req.body.hospitalName,
        budget: req.body.budget,
        // يمكنك إضافة المزيد من المعايير من النموذج هنا
    };
    const numberOfGuests = req.body.number_of_guests;
    const checkInDate = req.body.check_in_date;
    const nomecomplet = req.body.nomcomplet;

    console.log('Received in findHotels - Guests:', numberOfGuests, 'Date:', checkInDate, 'Name:', nomecomplet, 'Name:');
    console.log('Search Criteria:', criteria);

    Hotel.findByCriteria(criteria, (err, hotels) => {
        if (err) {
            console.error('Error finding hotels:', err);
            return res.status(500).json({ message: 'Failed to find hotels.' });
        }
        console.log('Hotels found:', hotels);

        console.log('Checking save conditions - hotels:', hotels, 'guests:', numberOfGuests, 'date:', checkInDate, 'name:', nomecomplet,'Name:');

        if (hotels && hotels.length > 0 && numberOfGuests && checkInDate && nomecomplet) {
            hotels.forEach(hotel => {
                console.log('Attempting to save search info on find - Hotel ID:', hotel.id, 'Guests:', numberOfGuests, 'Date:', checkInDate, 'Name:', nomecomplet,'Name:');
                Hotel.saveSearchInfo(hotel.id, numberOfGuests, checkInDate, nomecomplet, (saveErr, saveResult) => {
                    if (saveErr) {
                        console.error('Error saving search info:', saveErr);
                    } else {
                        console.log('Search info saved on find:', saveResult);
                    }
                });
            });
        } else {
            console.log('Not saving search info - conditions not met.');
        }
        return res.status(200).json({ hotels });
    });
};

hotelController.getAllHotels = (req, res) => {
    Hotel.getAll((err, hotels) => {
        if (err) {
            console.error('Error fetching all hotels:', err);
            return res.status(500).json({ message: 'Failed to fetch hotels.' });
        }
        return res.status(200).json({ hotels });
    });
};

hotelController.getHotelById = (req, res) => {
    const hotelId = req.params.id;
    console.log('Received in getHotelById:', hotelId);
    Hotel.findById(hotelId, (err, hotel) => {
        if (err) {
            console.error('Error fetching hotel by ID:', err);
            return res.status(500).json({ message: 'Failed to fetch hotel.' });
        }
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found.' });
        }
        return res.status(200).json({ hotel });
    });
};

// دالة جديدة لجلب معلومات البحث بناءً على hotelId
hotelController.getHotelSearchInfo = (req, res) => {
    const hotelId = req.params.id;
    Hotel.getSearchInfoByHotelId(hotelId, (err, searchInfo) => {
        if (err) {
            console.error('Error fetching search info:', err);
            return res.status(500).json({ message: 'Failed to fetch search info.' });
        }
        return res.status(200).json({ searchInfo });
    });
};

module.exports = hotelController;