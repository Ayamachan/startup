// routes/hospitals.js
const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

router.get('/all', hospitalController.getAllHospitals);
router.post('/search', hospitalController.findHospitals);
router.get('/:id', hospitalController.getHospitalById);
module.exports = router;