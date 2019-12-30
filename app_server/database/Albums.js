const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumsSchema = new Schema(
  {
    id: Number,
    title: String,
    imgURL: String
  },
  {
    collection: "photos"
  }
);

const Albums = mongoose.model("Albums", AlbumsSchema);

module.exports = Albums;
