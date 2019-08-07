const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    name: String,
    message: String
}, {
    collection: "chats"
})

const Chat = mongoose.model("Chat", ChatSchema)

module.exports = Chat