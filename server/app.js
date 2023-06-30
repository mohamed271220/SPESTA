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

app.use(express.json())
app.use(cors({
    credentials:true,
    origin: "http://localhost:3000"
}));


