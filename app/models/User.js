// models/User.js
const connection = require('../db/connection');

const User = {};

User.create = (userData, callback) => {
  connection.query('INSERT INTO users SET ?', userData, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

User.findByEmail = (email, callback) => {
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
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

module.exports = User;