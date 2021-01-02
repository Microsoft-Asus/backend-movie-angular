let express = require('express');
let groupRoute = express.Router();
var groupModel = require('../model/GroupModel');

//get all chat
groupRoute.route('/').get((req, res) => {
  groupModel.find().sort({
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
groupRoute.route('/create').post((req, res, next) => {
  // console.log(req.body);
  groupModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

//update chat
groupRoute.route('/update/:id').put((req, res, next) => {
  $old = groupModel.find({
    id: req.params.id
  });
  groupModel.updateOne($old, {
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
});

//update chat
groupRoute.route('/leaveGroup/:id').put((req, res, next) => {
  // console.log(req.body);
  $old = groupModel.find({
    id: req.params.id
  });
  groupModel.updateOne($old, {
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
});


// Delete chat
groupRoute.route('/delete/:id').delete((req, res, next) => {
  groupModel.deleteOne({
    id: req.params.id
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.send(data)
      // console.log("success delete");
    }
  })
});

//get chat from id
groupRoute.route('/getGroup/:id').get((req, res) => {
  groupModel.find({
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
});

groupRoute.route('/name/:name').get((req, res) => {
  // console.log(req.params.name);
  groupModel.find({
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

groupRoute.route('/nameGroup/:name').get((req, res) => {
  // console.log(req.params.name);
  groupModel.find({
    group: req.params.name
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

module.exports = groupRoute;
