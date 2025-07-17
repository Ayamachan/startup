// controllers/patientController.js
const Patient = require('../models/Patient');
const Hospital = require('../models/Hospital'); // تحتاج إلى نموذج المستشفى

const patientController = {};

patientController.savePatientInfo = (req, res) => {
    const patientData = req.body;
    Patient.create(patientData, (err, result) => {
        if (err) {
            console.error('Error saving patient info:', err);
            return res.status(500).json({ success: false, message: 'Failed to save patient information.' });
        }
        console.log('Patient info saved successfully:', result);
        return res.status(200).json({ success: true, message: 'Patient information saved successfully.', patientId: result.insertId });
    });
};

patientController.getPatientDetails = async (req, res) => {
    const { patientId } = req.params;

    try {
        Patient.findById(patientId, async (err, patient) => {
            if (err || !patient) {
                return res.status(404).json({ success: false, message: 'لم يتم العثور على معلومات المريض.' });
            }

            const hospitalId = patient.hospitals_id; // استخدام اسم العمود الصحيح

            if (hospitalId) {
                Hospital.findById(hospitalId, (err, hospital) => {
                    if (err || !hospital) {
                        return res.status(404).json({ success: false, message: 'لم يتم العثور على معلومات المستشفى.' });
                    }
                    return res.status(200).json({ success: true, patient, hospital });
                });
            } else {
                return res.status(200).json({ success: true, patient, hospital: null });
            }
        });
    } catch (error) {
        console.error('Error fetching patient details:', error);
        res.status(500).json({ success: false, message: 'فشل في جلب التفاصيل.' });
    }
};

module.exports = patientController;