let express = require('express');
let chatRoute = express.Router();
var chatModel = require('../model/ChatModel');

//get all chat
chatRoute.route('/').get((req, res) => {
  chatModel.find().sort({
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
chatRoute.route('/create').post((req, res, next) => {
  // console.log(req.body);
  chatModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

//update chat
chatRoute.route('/update/:id').put((req, res, next) => {
  $old = chatModel.find({
    id: req.params.id
  });
  chatModel.updateOne($old, {
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
chatRoute.route('/delete/:id').delete((req, res, next) => {
  chatModel.deleteOne({
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
chatRoute.route('/getChat/:id').get((req, res) => {
  chatModel.find({
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

//get chat from id
chatRoute.route('/getChat/:nameGroup').get((req, res) => {
  chatModel.find({
    nameGrounp: req.params.nameGroup
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



module.exports = chatRoute;
