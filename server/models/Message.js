import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Chatroom is required",
        ref: "Chatroom",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Chatroom is required",
        ref: "User",
    },
    message: {
        type: String,
        required: "Message is required",
    },
});

module.exports = mongoose.model("Message", messageSchema);