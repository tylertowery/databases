var db = require('../db');

module.exports = {
  // a function which produces all the messages
  getAll: function (req, cb) {
    db.query('Select * from messages', (err, results) => {
      cb(err, results);
    });
  },

  // a function which can be used to insert a message into the database
  create: function (messages, cb) {
    var text = messages.message;
    var user = messages.username;
    var room = messages.roomname;

    var queryString = 'INSERT INTO messages (TEXT, USER, ROOM) VALUES (?, (SELECT ID FROM USERS WHERE USERS.NAME=?), ?)';

    db.query(queryString, [text, user, room], (err, results) => {
      cb(err, results);
    });

    // db.query(queryString, (err, results) => {
    //   cb(err, results);
    // });

  }
};

// VALUES ('${text}', (SELECT ID FROM USERS WHERE NAME = '${user}'), '${room}')