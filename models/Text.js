const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    author:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    // 内容
    content:{
        type: String
    },
})

module.exports = Text = mongoose.model("text", ProfileSchema);
