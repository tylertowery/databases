var db = require('../db');

module.exports = {
  getAll: function () {},
  create: function (username, cb) {
    db.query('INSERT INTO users (NAME) VALUES (?)', [username], (err, results) => {
      cb(err, results);
    });
  }
};
