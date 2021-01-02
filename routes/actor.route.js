let express = require('express');
let app = express();
let actorRoute = express.Router();
let actorModel = require('../model/ActorModel');

// Get all movie
actorRoute.route('/').get((req, res) => {
  actorModel.find().sort({id: -1}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
});
