// controllers/hospitalController.js
const Hospital = require('../models/Hospital');

const hospitalController = {};

hospitalController.getAllHospitals = (req, res) => {
    Hospital.getAll((err, hospitals) => {
        if (err) {
            console.error('Error fetching hospitals:', err);
            return res.status(500).json({ message: 'Failed to fetch hospitals.' });
        }
        return res.status(200).json({ hospitals });
    });
};

hospitalController.findHospitals = (req, res) => {
    console.log('Request body received:', req.body); // تسجيل محتوى الطلب

    const criteria = {
        country: req.body.country,
        specialty: req.body.specialty,
        city: req.body.city,
        hospital: req.body.hospital,
        services: req.body.services
    };

    Hospital.findByCriteria(criteria, (err, hospitals) => {
        if (err) {
            console.error('Error finding hospitals:', err);
            return res.status(500).json({ message: 'Failed to find hospitals based on criteria.' });
        }

        console.log('Hospitals found:', hospitals); // تسجيل نتائج البحث
        return res.status(200).json({ hospitals });
    });
};

hospitalController.getHospitalById = (req, res) => {
    const hospitalId = req.params.id;
    Hospital.findById(hospitalId, (err, hospital) => {
        if (err) {
            console.error('Error fetching hospital:', err);
            return res.status(500).json({ message: 'Failed to fetch hospital.' });
        }
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found.' });
        }
        return res.status(200).json({ hospital });
    });
};

module.exports = hospitalController;