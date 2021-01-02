let express = require('express');
let countryRoute = express.Router();
let countryModel = require('../model/CountryModel');

// Get all category
countryRoute.route('/').get((req, res) => {
  countryModel.find().sort({id: 1}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
});

module.exports = countryRoute;

