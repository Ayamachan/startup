const connection = require('../db/connection');

const Hotel = {};

Hotel.findByCriteria = (criteria, callback) => {
    let sql = 'SELECT * FROM hotels WHERE 1=1';
    const values = [];

    if (criteria.distance) {
        sql += ' AND distance <= ?';
        values.push(criteria.distance);
    }
    if (criteria.hospitalName) {
        sql += ' AND hospitalName LIKE ?';
        values.push(`%${criteria.hospitalName}%`);
    }
    if (criteria.budget) {
        sql += ' AND price <= ?';
        values.push(parseInt(criteria.budget));
    }

    // **تم التأكد من عدم وجود أي استخدام لـ nomcomplet هنا**

    connection.query(sql, values, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};

Hotel.getAll = (callback) => {
    connection.query('SELECT * FROM hotels', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};

Hotel.findById = (id, callback) => {
    connection.query('SELECT * FROM hotels WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results[0]);
    });
};

Hotel.saveSearchInfo = (hotelId, numberOfGuests, checkInDate, nomecomplet, callback) => {
    const sql = 'INSERT INTO search_info (hotel_id, number_of_guests, check_in_date, nomcomplet) VALUES (?, ?, ?, ?)';
    connection.query(sql, [hotelId, numberOfGuests, checkInDate, nomecomplet], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result);
    });
};

Hotel.getSearchInfoByHotelId = (hotelId, callback) => {
    const sql = 'SELECT number_of_guests, check_in_date, nomcomplet FROM search_info WHERE hotel_id = ?';
    connection.query(sql, [hotelId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results[0]); // نتوقع نتيجة واحدة فقط
    });
};

module.exports = Hotel;