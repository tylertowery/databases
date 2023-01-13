var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.messages.getAll(req, (err, results) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(results));
      }
    });
  }, // a function which handles a get request for all messages
  // a function which handles posting a message to the database
  post: function (req, res) {

    models.messages.create(req.body, (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        res.sendStatus(201);
      }
    });
  }
};
