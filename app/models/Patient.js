const connection = require('../db/connection');

const Patient = {};

Patient.create = (patientData, callback) => {
    const {
        fullName,
        nationality,
        birthDate,
        passportNumber,
        passportExpiry,
        phoneNumber,
        email,
        diagnosis,
        medicalHistory,
        hospitals_id // استلام hospitals_id من patientData
    } = patientData;

    const sql = `
        INSERT INTO document (
            fullName, nationality, birthDate, passportNumber,
            passportExpiry, phoneNumber, email, diagnosis, medicalHistory,
            hospitals_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        patientData.fullName,
        patientData.nationality,
        patientData.birthDate,
        patientData.passportNumber,
        patientData.passportExpiry,
        patientData.phoneNumber,
        patientData.email,
        patientData.diagnosis,
        patientData.medicalHistory,
        patientData.hospitals_id // إضافة hospitals_id إلى القيم
    ];

    connection.query(sql, values, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result);
    });
};

Patient.findById = (id, callback) => {
    connection.query('SELECT * FROM document WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results[0]);
    });
};

module.exports = Patient;