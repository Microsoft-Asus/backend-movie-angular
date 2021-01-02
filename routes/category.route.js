const express = require('express');
const app = express();
const categoryRoute = express.Router();
let categoryModel = require("./../model/CategoryModel");

// Get all category
categoryRoute.route('/').get((req, res) => {
  categoryModel.find().sort({id: 1}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
});

categoryRoute.route('/create').post((req, res, next) => {
  // console.log("hello world");
  // console.log(req.body);
  categoryModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

module.exports = categoryRoute;
