const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: Number,
    name: String,
    username: String,
    email: String,
    website: String
  },
  {
    collection: "jsonKullanici"
  }
);

const GelenVeri = mongoose.model("GelenVeri", UserSchema);

module.exports = GelenVeri;
