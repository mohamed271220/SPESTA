const Tags = require("../models/tag");
exports.getAllTags = async (req, res, next) => {
  try {
    const Tag = await Tags.find();
    res.status(200).json({ message: "success", data: Tag });
  } catch (err) {
    const error = new Error("Fetching Tags failed.");
    error.statusCode = 404;
    return next(error);
  }
};
exports.getSingleTag = async (req, res, next) => {
  const tagId = req.params.tagId;
  try {
    const tag = await Tags.findById(tagId).populate("products");
    res.status(200).json({ message: "success", data: tag });
  } catch (err) {
    const error = new Error("Something went wrong: could not find tag with id of "+tagId );
    error.statusCode = 404;
    return next(error);
  }
};
