const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");

require("dotenv").config();
const filesUpload = multer({ dest: "uploads/images" });

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

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
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://SPECTER:KWoLlfbG07EzQM9F@cluster0.cyhx7wh.mongodb.net/"
  )
  .then((result) => {
    app.listen(5000, () => {
      console.log("server running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
