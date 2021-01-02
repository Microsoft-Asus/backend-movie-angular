let express = require('express');
let chatWithFriendRoute = express.Router();
var chatWithFriendModel = require('./../model/ChatWithFriendModel');

//get all chat
chatWithFriendRoute.route('/').get((req, res) => {
  chatWithFriendModel.find().sort({
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
chatWithFriendRoute.route('/create').post((req, res, next) => {
  console.log(req.body);
  chatWithFriendModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

//update chat
chatWithFriendRoute.route('/update/:id').put((req, res, next) => {
  $old = chatWithFriendModel.find({
    id: req.params.id
  });
  chatWithFriendModel.updateOne($old, {
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
chatWithFriendRoute.route('/delete/:id').delete((req, res, next) => {
  chatWithFriendModel.deleteOne({
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
chatWithFriendRoute.route('/getChatWithFriend/:userName').get((req, res) => {
  chatWithFriendModel.find({
    user: req.params.userName
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


module.exports = chatWithFriendRoute;
