const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
});

// By default, Mongoose adds an _id property to your schemas.
genreSchema.virtual("url").get(function () {
  return "/catalog/genre/" + this._id;
});

module.exports = mongoose.model("Genre", genreSchema);
