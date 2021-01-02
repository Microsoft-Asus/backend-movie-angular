let express = require('express');
let userRoute = express.Router();
var userModel = require('../model/UserModel');
let cors = require('cors');
userRoute.use(cors({
  origin: [
    "http://localhost:4200"
  ],
  credentials: true
}));
// Get all User
userRoute.route('/').get((req, res) => {
  userModel.find().sort({
    id: -1
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

userRoute.route('/detailUser/:id').get((req, res) => {
  userModel.find({
    id: req.params.id
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      res.send(data)
    }
  })
})

userRoute.route('/detailUser/name/:name').get((req, res) => {
  userModel.find({
    name: req.params.name
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      res.send(data)
    }
  })
})

userRoute.route('/favorite').get((req, res) => {
  // console.log("favorite: " + req.session.user);
  userModel.find({
    email: req.session.user
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      // console.log(data);
    }
  })
});

userRoute.route('/admin').get((req, res) => {
  // console.log("favorite: " + req.session.user);
  if(req.session.user == "lequyetanh@gmail.com"){
    res.send({admin:true})
  }else{
    res.send({admin:false})
  }
});

userRoute.route('/all').get((req, res) => {
  userModel.find().sort({
    id: 1
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      // console.log(data);
    }
  })
});

userRoute.route('/update/:id').put((req, res, next) => {

  $old = userModel.find({
    id: req.params.id
  });
  // console.log($old);
  // console.log(req.body);
  userModel.updateOne($old, {
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

userRoute.route('/addFriend/:id').put((req, res, next) => {
  $old = userModel.find({
    id: req.params.id
  });
  userModel.updateOne($old, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})


userRoute.route('/update/:id/avatar').put((req, res, next) => {
  req.session.newAvatar = req.body.avatar;
  $old = userModel.find({
    id: req.params.id
  });
  // console.log($old);
  // console.log(req.body);
  userModel.updateOne($old, {
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

userRoute.route('/create').post((req, res, next) => {
  // console.log(req.body);
  userModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

userRoute.route('/delete/:id').delete((req, res, next) => {
  // console.log("movie delete");
  userModel.deleteOne({
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

module.exports = userRoute;
