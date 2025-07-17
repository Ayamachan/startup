// routes/hotels.js
const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.post('/find', hotelController.findHotels);
router.get('/', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);
 //لم نعد نحتاج هذا المسار بشكل منفصل
 router.get('/search-info/:id', hotelController.getHotelSearchInfo);

module.exports = router;