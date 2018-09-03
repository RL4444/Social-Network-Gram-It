const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db/db");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const bc = require("./db/bcrypt");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const config = require("./config");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

app.use(cookieParser());

const cookieSessionMiddleware = cookieSession({
  secret: `Yolo Init Bruv`,
  maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
  cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// app.use(csurf());

// app.use(function(req, res, next) {
//     res.cookie("mytoken", req.csrfToken());
//     next();
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(compression());

if (process.env.NODE_ENV != "production") {
  app.use(
    "/bundle.js",
    require("http-proxy-middleware")({
      target: "http://localhost:8081/"
    })
  );
} else {
  app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/user", function(req, res) {
  db.getYourUserInfo(req.session.userId)
    .then(data =>
      res.json({
        ...data,
        profile_pic: data.profile_pic || "/images/default.png"
      })
    )
    .catch(error => {
      console.log(error);
    });
});

const diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

const uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});

app.post("/registration", (req, res) => {
  if (
    req.body.firstName == "" ||
    req.body.lastName == "" ||
    req.body.email == "" ||
    req.body.password == ""
  ) {
    return res.json({
      error: "Please, fill in all the fields"
    });
  } else {
    console.log("inside POST /registration", req.body);
    bc.hashPassword(req.body.password)
      .then(hashedPassword => {
        console.log("hashedPassword: ", hashedPassword);
        db.insertUser(
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          hashedPassword
        )
          .then(newUser => {
            req.session.userId = newUser.id;
            // console.log(req.session.userId);
            // console.log(newUser);
            // res.redirect('/profile');
            return res.json(newUser);
          })
          .catch(error => {
            console.log(error);
            return res.json({
              error: "Your Email is already taken, please try again"
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
});
app.get("/welcome", function(req, res) {
  if (req.session.userId) {
    res.redirect("/");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.post("/login", (req, res) => {
  db.getYourUser(req.body.email)
    .then(user => {
      if (user == undefined) {
        res.json({
          error: "This email doesn't match any user"
        });
      } else {
        bc.checkPassword(req.body.password, user.hashed_password)
          .then(doThePasswordsMatch => {
            console.log("doThePasswordsMatch: ", doThePasswordsMatch);
            if (doThePasswordsMatch) {
              req.session.userId = user.id;
              res.json(user);
            } else {
              res.json({
                error: "The password is wrong, please try again"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

const handleFile = uploader.single("file");

app.post("/upload", handleFile, s3.upload, (req, res) => {
  console.log("It's geting to the post route in upload on your server");
  db.addImage(req.session.userId, config.s3Url + req.file.filename)
    .then(userWithUpdatedImage => {
      console.log("server /upload post route: ", userWithUpdatedImage);
      res.json({
        success: true,
        image: userWithUpdatedImage.profile_pic
      });
    })
    .catch(() => res.sendStatus(500));
});

app.post("/uploadBio", (req, res) => {
  db.addBio(req.session.userId, req.body.bio)
    .then(userUpdatedBio => {
      // console.log(image);
      res.json({
        success: true,
        info: userUpdatedBio
      });
    })
    .catch(() => res.sendStatus(500));
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/welcome");
});

app.get("/user", requireUser, function(req, res) {
  db.getYourUserInfo(req.session.userId)
    .then(userInfo => {
      userInfo.loggedInUserId = req.session.userId;
      res.json(userInfo);
    })
    .catch(error => {
      console.log(error);
    });
});
app.get("/user/:id.json", function(req, res) {
  console.log("req.params.id in user:id server:", req.params.id);
  if (req.session.userId == req.params.id) {
    console.log("redirecting back to app ");
    res.json({
      redirect: "/"
    });
  } else {
    console.log("is it getting to the user/:id get route db function?");
    db.getYourUserInfo(req.params.id).then(data => {
      console.log(data);
      res.json({
        success: true,
        data: data
      });
    });
  }
});

////////////////////FRIENDSHIP SERVER REQS//////////////////////////

app.get("/friendship/:id.json", function(req, res) {
  db.checkFriendship(req.params.id, req.session.userId).then(friendInfo => {
    friendInfo.loggedInUserId = req.session.userId;
    console.log("friendInfo in friendship route", friendInfo);

    res.json(friendInfo);
  });
});
app.post("/endfriendship/:id.json", function(req, res) {
  db.endfriendship(req.params.id, req.session.userId).then(friendInfo => {
    console.log("friendInfo in friendship route", friendInfo);

    res.json(friendInfo);
  });
});
app.post("/acceptfriendship/:id.json", function(req, res) {
  console.log("is this getting to the accept server route");
  db.acceptfriendship(req.params.id, req.session.userId).then(friendInfo => {
    console.log("friendInfo in friendship route", friendInfo);

    res.json(friendInfo);
  });
});
app.post("/friendshippending/:id.json", function(req, res) {
  db.friendshippending(req.params.id, req.session.userId)
    .then(friendInfo => {
      // friendInfo.loggedInUserId = req.session.userId;
      console.log("friendInfo in friendship route", friendInfo);

      res.json(friendInfo);
    })
    .catch(error => console.log(error));
});

///////////////////FRIENDS AND WANNABES ROUTE FROM DB////////////////////////////

app.get("/friends-wannabes", function(req, res) {
  console.log("req.session", req.session);

  db.friendsAndWannabes(req.session.userId).then(results => {
    console.log("results from db: ", results);
    res.json({ results });
  });
});

///////////////////////////SPOTIFY AND YOUTUBE ROUTES/////////////////////

app.post("/insertspotifyurl", function(req, res) {
  console.log("it's getting to your insert route in spotify");
  db.insertMediaSpotify(req.session.userId, req.body.spotifyurl).then(media => {
    console.log("req.body in insertSpotifyUrl route", req.body.spotifyurl);
    res.json({
      success: true,
      spotifyurl: req.body.spotifyurl
    });
  });
});

app.get("/allmedia", function(req, res) {
  console.log("is it getting to my allmedia route");
  db.getMediaById(req.session.userId).then(res => {
    console.log("res", res);
    res.json({
      success: true,
      spotifyurl: res.data.spotifyurl,
      youtube: res.data.youtubeurl
    });
  });
});

// ***************REDUX EVENT EMITTERS FOR SORTING ONLINE AND OFFLINE USERS************
// //index - server.js event emitter
// socket.emit("onlineUsers", arrayofOnlineUsers);
//
// //in socket.js
// socket.on("onlineUsers", data => {
//     // here we add data to redux's global state through dispatch
//     store.dispatch(pushOnlineUsersToRedux(data));
// });

// // ********************CHAT MESSAGE REDUX LISTENERS***********************************
//
// socket.emit("chatMsg", singleChatMessage);
//
// socket.on("chatMsg", data => {
//     // do stuff
// });

// **************************************************************************************

app.get("*", requireUser, function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

function requireUser(req, res, next) {
  if (!req.session.userId) {
    res.redirect("/welcome");
  } else {
    next();
  }
}
app.listen(process.env.PORT || 8080);

let onlineUsers = {};
let chatMessages = [];

io.on("connection", function(socket) {
  onlineUsers[socket.id] = socket.request.session.userId;
  db.getAllUsers(Object.values(onlineUsers)).then(users => {
    console.log("online users are : ", users);
    socket.emit("onlineUsers", users);
  });

  socket.emit("chatMessages", chatMessages.slice(-10));

  if (
    Object.values(onlineUsers).filter(id => id == socket.request.session.userId)
      .length == 1
  ) {
    db.getYourUserInfo(socket.request.session.userId)
      .then(results => {
        socket.broadcast.emit("userJoined", results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  socket.on("disconnect", function() {
    if (
      Object.values(onlineUsers).filter(
        id => id == socket.request.session.userId
      ).length == 1
    ) {
      db.getYourUserInfo(socket.request.session.userId)
        .then(results => {
          socket.broadcast.emit("userLeft", results);
        })
        .catch(error => {
          console.log(error);
        });
    }
    delete onlineUsers[socket.id];
  });

  socket.on("newMessage", function(newMessage) {
    db.getYourUserInfo(socket.request.session.userId)
      .then(data => {
        let completNewMessage = {
          firstName: data.first_name,
          lastName: data.last_name,
          profilePic: data.profile_pic,
          userId: socket.request.session.userId,
          content: newMessage,
          date: new Date()
        };
        console.log("completNewMessage", completNewMessage);
        chatMessages = [...chatMessages, completNewMessage];
        io.sockets.emit("newMessageBack", completNewMessage);
      })
      .catch(error => {
        console.log(error);
      });
  });
});
