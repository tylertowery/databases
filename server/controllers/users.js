var models = require('../models');

module.exports = {
  get: function (req, res) {},
  post: function (req, res) {
    models.users.create(req.body.username, (err, results) => {
      if (err) {
        console.log('is it this one?', err);
        res.sendStatus(404);
      } else {
        res.sendStatus(201);
      }
    });
  }
};
