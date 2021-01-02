let express = require('express');
let groupOfUserRoute = express.Router();
var groupOfUserModel = require('../model/GroupOfUserModel');

//get all chat
groupOfUserRoute.route('/').get((req, res) => {
  groupOfUserModel.find().sort({
    id: -1
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      // console.log(data);
      res.json(data)
    }
  })
});


// create chat
groupOfUserRoute.route('/create').post((req, res, next) => {
  // console.log(req.body);
  groupOfUserModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

//update chat
groupOfUserRoute.route('/update/:id').put((req, res, next) => {
  $old = groupOfUserModel.find({
    id: req.params.id
  });
  groupOfUserModel.updateOne($old, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      // console.log(error)
    } else {
      res.json(data)
      // console.log('Data updated successfully')
    }
  })
})

// Delete chat
groupOfUserRoute.route('/delete/:id').delete((req, res, next) => {
  groupOfUserModel.deleteOne({
    id: req.params.id
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.send(data)
      // console.log("success delete");
    }
  })
})

//get chat from id
groupOfUserRoute.route('/getGroupOfUser/:id').get((req, res) => {
  groupOfUserModel.find({
    id: req.params.id
  }).sort({
    id: -1
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      res.send(data)
    }
  })
})

groupOfUserRoute.route('/getGroupOfUser/name/:name').get((req, res) => {
  groupOfUserModel.find({
    user: req.params.name
  }).sort({
    id: -1
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      res.send(data)
    }
  })
})



module.exports = groupOfUserRoute;
