// routes/patients.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/save', patientController.savePatientInfo);
router.get('/details/:patientId', patientController.getPatientDetails); 
module.exports = router;