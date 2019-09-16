// login & register
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Text = require("../../models/Text");

// $route GET api/text/test
// @desc 返回的请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({msg: "text works"})
})

// $route POST api/text/add
// @desc 创建信息接口
// @access private
router.post("/add", passport.authenticate('jwt', {session: false}), (req, res) => {
    const profileFields = {};
    if (req.body.author) profileFields.author = req.body.author;
    if (req.body.title) profileFields.title = req.body.title;
    if (req.body.content) profileFields.content = req.body.content;

    new Text(profileFields).save().then(text => {
        res.json(text);
    })

});

// $route GET api/text
// @desc 获取所有信息
// @access private

router.get("/", passport.authenticate('jwt', {session: false}), (req, res) => {
    Text.find().then(text => {
        if (!text) {
            return res.status(404).json('没有任何内容');
        }
        res.json(text);
    })
        .catch(err => res.status(404).json(err))
});

// $route GET api/text/:id
// @desc 获取单个信息
// @access private
router.get(
    '/:id',
    passport.authenticate('jwt', {session: false}), (req, res) => {
        const id = req.params.id;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            Text.findById(id, function (err, notice) {
                if (err) {
                    res.json({no: 0, msg: '获取失败:' + err});
                } else {
                    const result = {no: 1};
                    result.obj = notice;
                    res.json(result);
                }
            });
        } else {
            res.json({no: 0, msg: id + '不存在'});
        }


    }
);
// $route POST api/text/edit
// @desc 编辑信息接口
// @access private
router.post(
    "/edit/:id",
    passport.authenticate('jwt', {session: false}), (req, res) => {
        const profileFields = {};
        if (req.body.author) profileFields.author = req.body.author;
        if (req.body.title) profileFields.title = req.body.title;
        if (req.body.content) profileFields.content = req.body.content;

        Text.findOneAndUpdate(
            {_id: req.params.id},
            {$set: profileFields},
            {new: true}
        ).then(text => res.json(text))

    });

// $route POST api/text/delete
// @desc 删除信息接口
// @access private
router.delete(
    "/delete/:id",
    passport.authenticate('jwt', {session: false}), (req, res) => {
        Text.findOneAndRemove({_id: req.params.id})
            .then(text => {
                text.save().then(text => res.json(text));
            })
            .catch(err => res.status(404).json('删除失败！'));
    });


module.exports = router;
