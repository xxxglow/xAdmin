const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    type:{
        type: String,
        required: true
    },
    describe:{
        type: String
    },
    // 收入
    income:{
        type: String,
        required: true
    },
    expend:{
        type: String
    },
    cash:{
        type: String,
        required: true
    },
    remark:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
