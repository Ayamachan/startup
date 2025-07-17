// models/Hospital.js
const connection = require('../db/connection');

const Hospital = {};

Hospital.getAll = (callback) => {
    connection.query('SELECT * FROM hospitals', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};

Hospital.findByCriteria = (criteria, callback) => {
    let query = 'SELECT * FROM hospitals WHERE 1=1';
    const values = [];

    if (criteria.country) {
        query += ' AND country = ?';
        values.push(criteria.country);
    }
    if (criteria.city) {
        query += ' AND city = ?';
        values.push(criteria.city);
    }
    if (criteria.specialty) {
        query += ' AND specialty = ?';
        values.push(criteria.specialty);
    }
    if (criteria.hospital) {
        query += ' AND name LIKE ?';
        values.push(`%${criteria.hospital}%`);
    }
    if (criteria.services && criteria.services.includes('translation')) {
        query += ' AND has_translation = TRUE';
    }
    if (criteria.services && criteria.services.includes('accessibility')) {
        query += ' AND (has_accessibility = TRUE OR has_disabled_facilities = TRUE)'; // استخدام كلا العمودين
    }

    connection.query(query, values, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};

Hospital.findById = (id, callback) => {
    connection.query('SELECT * FROM hospitals WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length > 0) {
            return callback(null, results[0]);
        } else {
            return callback(null, null);
        }
    });
};

module.exports = Hospital;