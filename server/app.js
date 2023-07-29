const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
const isAdmin = require("./middleware/is-admin");
const User = require("./models/user");
const fs = require("fs");

require("dotenv").config();

// const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const findOrCreate = require("mongoose-findorcreate");


const filesUpload = multer({ dest: "uploads/images" });
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.post( "/api/upload",
  isAdmin,
  filesUpload.array("photos", 40),
  (req, res) => {
    console.log(req.files);
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads", ""));
    }
    res.json(uploadedFiles);
  }
);

// passport.use(User.createStrategy());
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:8080/api/auth/auth/google/callback",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       User.findOrCreate(
//         { googleId: profile.id, username: profile.id },
//         function (err, user) {
//           return cb(err, user);
//         }
//       );
//     }
//   )
// );

// app.use(
//   session({
//     secret: "Our little secret.",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

//TODO ROUTES
//TESTED✅
app.use("/api/auth", require("./routes/auth"));
//TESTED✅
app.use("/api/category", require("./routes/categories"));
//TESTED✅only testing add product
app.use("/api/product", require("./routes/products"));
//TESTED✅
app.use("/api/tags", require("./routes/tags"));
//TODO ADMIN ROUTES

//TESTED ✅
app.use("/api/admin/auth", require("./routes/admin/auth"));
//TESTED
app.use("/api/admin/dashboard", require("./routes/admin/dashboard"));

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || "something went wrong";
  const data = error.data;
  console.log(error);
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGO_DB)
  .then((result) => {
    app.listen(8080, () => {
      console.log("server running on port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
