let express = require('express');
let path = require('path');
const mongoose = require('mongoose');
let database = require('./database/db');
const session = require('express-session');
let cors = require('cors');
let bodyParser = require('body-parser');
let app = express();
let router = express.Router();
const multer = require('multer');
var cookieParser = require('cookie-parser');

const http = require('http');
const ngrok = require('ngrok');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const dotenv = require('dotenv');
dotenv.config();

// const {
//   ExpressPeerServer
// } = require('peer');
// const peerServer = ExpressPeerServer(server, {
//   debug: true
// });

// const {
//   v4: uuidV4
// } = require('uuid')

// app.use('/peerjs', peerServer);

app.use(cors({
  origin: [
    "http://localhost:4200"
  ],
  credentials: true
}));
app.use(bodyParser.json());

// database.connect();

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, `./`)
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`)
  }
})

const upload = multer({
  storage: storage
})

// let upload = multer({ dest: 'uploads/' })

// app.get("/", (req, res) => {
//   res.send(
//     `<h1 style='text-align: center'>
//               Wellcome to FunOfHeuristic
//               <br><br>
//               <b style="font-size: 182px;">😃👻</b>
//           </h1>`
//   );
// });

app.post('/api/file', upload.single('file'), (req, res, next) => {
  const file = req.file;
  // console.log(file.filename);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file);
})

app.post('/api/multipleFiles', upload.array('files'), (req, res, next) => {
  const files = req.files;
  // console.log(files);
  if (!files) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send({
    sttus: 'ok'
  });
})


// ==================================socket.io==================================
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8000, () => {

});

var userOnline = [];
var listFriend = [];
var listRoom = [];
var listUserId = [];

io.on("connection", function (socket) {

  // socket.on('all-group', (data) => {
  //   this.listRoom = data;
  // });
  console.log("somebody connecting: " + socket.id);

  socket.on('Client-send-group', (data) => {
    listRoom = data;
    for (var i = 0; i < data.length; i++) {
      socket.join(data[i]);
    }
    io.sockets.emit("Server-send-group", data)
  });

  socket.on('Client-send-friend', (data) => {
    listFriend = data;
    socket.emit("Server-send-friend", data)
  });


  socket.on("Client-send-userName", function (data) {
    if (userOnline.indexOf(data) >= 0) {
      io.sockets.emit("Server-send-userOnline", userOnline);
      socket.userName = data;
    } else {
      // req.session.user = req.body.userName;
      userOnline.push(data);
      listUserId.push({
        userName: data,
        userId: socket.id,
      });
      // console.log(listUserId);
      socket.userName = data;
      // console.log(userOnline)
      io.sockets.emit("Server-send-userOnline", userOnline);
    }
    console.log(userOnline);
    console.log(listUserId);
  });

  socket.on("send-message-to-group", function (data) {
    console.log(data);
    io.sockets.in(data.group).emit("group-send-data", data);
  })

  socket.on("send-message-to-friend", (data) => {
    console.log(data);
    // console.log(listUserId);
    for (var i = 0; i < listUserId.length; i++) {
      if (listUserId[i].userName == data.friend) {
        // console.log(listUserId[i].userName);
        io.to(listUserId[i].userId).emit("friend-send-data", data);
      }
    }
  })

  socket.on("tao-room", data => {
    // console.log(data);
    socket.join(data);
    socket.phong = data;
    if (listRoom[0] == undefined) {
      listRoom.push(data);
    } else {
      for (var i = 0; i < listRoom.length; i++) {
        if (listRoom[i] == data) {
          break;
        } else {
          if (i == listRoom.length - 1) {
            listRoom.push(data);
            break;
          }
          continue;
        }
      }
    }
    // console.log(listRoom);
    io.sockets.emit("server-send-rooms", listRoom);
  })

  socket.on("typingWithGroup", function (data) {
    socket.to(data).emit("someone-is-typing-in-group", socket.userName);
  });

  socket.on("stopTypingWithGroup", function (data) {
    socket.to(data).emit("someone-is-not-type", socket.userName);
  });

  // socket.on("friendIsTyping", function (data) {
  //   for (var i = 0; i < listUserId.length; i++) {
  //     if (listUserId[i].userName == data.friend) {
  //       // console.log(listUserId[i].userId);
  //       io.to(listUserId[i].userId).emit("friendIsTyping", data.me);
  //     }
  //   }
  // });

  // socket.on("friendIsNotType", function (data) {
  //   for (var i = 0; i < listUserId.length; i++) {
  //     if (listUserId[i].userName == data.friend) {
  //       // console.log(listUserId[i].userId);
  //       io.to(listUserId[i].userId).emit("friendIsNotType", data.me);
  //     }
  //   }
  // });

  socket.on("Log-out", function (data) {
    console.log(socket.id + " is disconnected data");
    // console.log(socket.userName); //co the do la ham logout o file header nen ko hieu
    userOnline.splice(userOnline.indexOf(data), 1);
    for (var i = 0; i < listUserId.length; i++) {
      if (listUserId[i].userName == socket.userName) {
        listUserId.splice(listUserId.indexOf(listUserId[i]), 1);
      }
    }
    // console.log(userOnline);
    socket.broadcast.emit("Server-send-userOnline", userOnline);
  });

  socket.on("disconnect", () => {
    userOnline.splice(userOnline.indexOf(socket.userName), 1);
    for (var i = 0; i < listUserId.length; i++) {
      if (listUserId[i].userName == socket.userName) {
        listUserId.splice(listUserId.indexOf(listUserId[i]), 1);
      }
    }
    socket.broadcast.emit("Server-send-userOnline", userOnline);
  });
});

// =============================================================================

const port = 4000;
// const server = http.createServer((req, res) => {
//   res.end('Hello, World!');
// });
app.listen(process.env.PORT || port, (err) => {
  if (err) return console.log(`Something bad happened: ${err}`);
  console.log(`Node.js server listening on ${port}`);
});
// var server = require("http").Server(app);
// var io = require("socket.io")(server);
// server.listen(4000);

// io.on("connection", function(socket){
//   console.log("someone connected " + socket.id);
// });

// ==============================================

app.use(session({
  secret: "Shh, its a secret!",
  resave: false,
  saveUninitialized: true,
  // cookie: {
  //   expires: 100000000,
  // }
}));

app.get('/api', function (req, res) {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

const validatePayloadMiddleware = (req, res, next) => {
  if (req.body) {
    next();
  } else {
    res.status(403).send({
      errorMessage: 'You need a payload'
    });
  }
};

app.post('/api/login', validatePayloadMiddleware, (req, res) => {
  // console.log(req.body.email);
  req.session.user = req.body.email;
  // console.log(req.session);
  res.status(200).send({
    user: req.body.email
  });
  // console.log(req.session);
});

// app.put('/user/update/:id/avatar', (req, res) => {
//   // console.log(req.body.email);
//   req.session.newAvatar = req.body.avatar;
//   res.status(200).send({
//     newAvatar: req.body.avatar
//   });
//   // console.log(req.session);
// });

app.get('/api/login', (req, res) => {
  // console.log(req.session);
  // console.log(req.session);
  req.session.user ? res.status(200).send({
    loggedIn: true
  }) : res.status(200).send({
    loggedIn: false
  });
});


// app.get('/api/avatar', (req, res) => {
//   // console.log(req.session);
//   req.session.newAvatar ? res.status(200).send({
//     newAvatar: true
//   }) : res.status(200).send({
//     newAvatar: false
//   });
// });

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('Could not log out.');
    } else {
      res.status(200).send({});
    }
  });
});
// ===========================================================

mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
    console.log('Database sucessfully connected')
  },
  error => {
    console.log('Database could not connected: ' + error)
  }
)


app.use(express.json({
  extended: false
}));

let data = require('./data/data');
let movieModel = require('./model/MovieModel');
// movieModel.create(data);
let movieRoute = require('./routes/movie.route');
app.use('/movie', movieRoute);

let category = require('./data/category');
let categoryModel = require('./model/CategoryModel');
// categoryModel.create(category);
let categoryRoute = require('./routes/category.route');
app.use('/category', categoryRoute);

let country = require('./data/country');
let countryModel = require('./model/CountryModel');
// countryModel.create(country);
let countryRoute = require('./routes/country.route');
app.use('/country', countryRoute);

let user = require('./data/user');
let userModel = require('./model/UserModel');
// userModel.create(user);
let userRoute = require('./routes/user.route');
app.use('/user', userRoute);

let chatWithFriend = require('./data/chatWithFriend');
let chatWithFriendModel = require('./model/ChatWithFriendModel');
// chatWithFriendModel.create(chatWithFriend);
let chatWithFriendRoute = require('./routes/chatWithFriend.route');
app.use('/chatWithFriend', chatWithFriendRoute);

let group = require('./data/group');
let groupModel = require('./model/GroupModel');
// groupModel.create(group);
let groupRoute = require('./routes/group.route');
app.use('/group', groupRoute);

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});