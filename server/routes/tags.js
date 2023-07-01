const express = require("express");

const tagsController = require("../controllers/tags");
const router = express.Router();

//TODO GET ALL TAG

router.get("/", tagsController.getAllTags);
//TODO GET A SINGLE TAG

router.get("/:tagId", tagsController.getSingleTag);

module.exports = router;
