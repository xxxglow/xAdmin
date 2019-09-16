const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// 引入user.js
const users = require("./routes/api/users");
// 引入profiles.js
const profiles = require("./routes/api/profiles");
// 引入text.js
const text = require("./routes/api/text");


//DB config
const db = require("./config/key").mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false})); // 解析文本格式
app.use(bodyParser.json()); //解析json格式

//Connect to mongdb
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/", (req, res) => {
    res.send("hello world!");
})

// 使用routers
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/text", text);


const port = process.env.PRORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
