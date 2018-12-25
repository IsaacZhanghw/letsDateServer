// 小程序
const express = require('express')
const router = express.Router()
    // const common=require('../../libs/common');
const uuid = require('uuid/v4');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const passport = require('passport');
const config = require('../../../config');

// $route POST api/register
// @desc  返回请求你的json数据
// @access public
router.post("/register", (req, res) => {
    let { openid, nickName, avatarUrl, gender } = req.body;
    // console.log('openid',openid)
    // console.log('nickName',nickName)
    // console.log('avatarUrl',avatarUrl)
    // console.log('gender',gender)
    // 查询数据库中是否存在用户
    req.db.query(`SELECT * FROM user_table WHERE openid='${openid}'`, (err, data) => {
        if (err) {
            res.json({
                errcode: 1,
                errmsg: "是否存在用户服务器异常"
            })
        } else if (data.length == 0) {
            let ID = uuid().replace(/\-/g, '');
            let oDate = new Date();
            oDate.setMinutes(oDate.getMinutes() + 20);
            let creatTime = Math.floor(oDate.getTime() / 1000);
            req.db.query(`INSERT INTO user_table (ID, openid, nickName, avatarUrl, gender, creatTime ) VALUES('${ID}', '${openid}', '${nickName}', '${avatarUrl}', '${gender}', '${creatTime}')`, err => {
                if (err) {
                    res.json({
                        errcode: 1,
                        errmsg: "注册服务器异常"
                    })
                } else {
                    res.json({
                        errcode: 0,
                        errmsg: "注册成功,请登录",
                    })
                }
            });
        } else {
            res.json({
                errcode: 1,
                errmsg: "用户已存在,请登录"
            })
        }
    });
})

// $route POST api/updeteUserInfo
// @desc  返回请求你的json数据
// @access public
router.post("/updeteUserInfo", (req, res) => {
    let { openid, nickName, avatarUrl, weichatid, roleMin, roleMax, dateMin, dateMax, sloganStr } = req.body;
    console.log('req.body', req.body)
        // 查询数据库中是否存在用户
    req.db.query(`SELECT * FROM user_table WHERE openid='${openid}'`, (err, data) => {
        if (err) {
            res.json({
                errcode: 1,
                errmsg: "是否存在用户服务器异常"
            })
        } else if (data.length == 0) {
            res.json({
                errcode: 1,
                errmsg: "用户不存在,请注册"
            })
        } else {
            req.db.query(`UPDATE user_table SET nickName = '${nickName}', avatarUrl = '${avatarUrl}', weichatid = '${weichatid}', roleMin = '${roleMin}', roleMax = '${roleMax}', dateMin = '${dateMin}', dateMax = '${dateMax}', sloganStr = '${sloganStr}' WHERE openid = '${openid}'`, err => {
                if (err) {
                    res.json({
                        errcode: 1,
                        errmsg: "更新用户服务器异常"
                    })
                } else {
                    res.json({
                        errcode: 0,
                        errmsg: "更新成功,请登录",
                    })
                }
            });
        }
    });
})

// $route POST api/login
// @desc  返回token passport jwt (jwt = json web token)
// @access public
router.get("/userLogin", (req, res) => {
    let { openid } = req.query;
    // 查询数据库中是否存在用户
    req.db.query(`SELECT * FROM user_table WHERE openid='${openid}'`, (err, data) => {
        if (err) {
            res.json({
                errcode: 1,
                errmsg: "是否存在用户服务器异常"
            })
        } else if (data.length == 0) {
            res.json({
                errcode: 1,
                errmsg: "用户不存在,请注册"
            })
        } else {
            // 签名  jwt.sign ("规则","加密名字", "过期时间", "箭头函数")
            const rule = {
                ID: data[0].ID,
                openid: data[0].openid,
            };
            jwt.sign(rule, config.secretOrKey, { expiresIn: 10 }, (err, token) => {
                if (err) throw err;
                res.json({
                    errcode: 0,
                    errmsg: "操作成功",
                    token: 'Bearer ' + token,
                    data: data
                });
            })
        }
    });
})

// $route POST api/login
// @desc  返回token passport jwt (jwt = json web token)
// @access public
router.post("/login", (req, res) => {
    let { weichatid, password } = req.body;
    // 查询数据库中是否存在用户
    req.db.query(`SELECT * FROM admin_table WHERE weichatid='${weichatid}'`, (err, data) => {
        // console.log('data', data)
        // console.log('err',err)
        if (err) {
            res.json({
                errcode: 1,
                errmsg: "是否存在用户服务器异常"
            })
        } else if (data.length == 0) {
            res.json({
                errcode: 1,
                errmsg: "用户不存在,请注册"
            })
        } else {
            // console.log('data', data[0] )
            // 密码匹配
            bcrypt.compare(password, data[0].password).then(isMatch => {
                if (isMatch) {
                    // 签名  jwt.sign ("规则","加密名字", "过期时间", "箭头函数")
                    const rule = {
                        ID: data[0].ID,
                        weichatid: data[0].weichatid,
                        identify: data[0].identify,
                    };
                    jwt.sign(rule, config.secretOrKey, { expiresIn: 10 }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            errcode: 0,
                            errmsg: "操作成功",
                            token: 'Bearer ' + token
                        });
                    })
                } else {
                    res.json({
                        errcode: 1,
                        errmsg: "密码错误,请重试!"
                    })
                }
            });
        }
    });
})
router.get("/getUsersList", (req, res) => {
    let { current_page, page_size } = req.query;
    current_page = parseInt(current_page);
    if (isNaN(current_page) || current_page < 1) {
        page = 1;
    }
    let page_start = (current_page - 1) * page_size;
    req.db.query(`SELECT ID,openid,nickName,avatarUrl,gender,creatTime FROM user_table LIMIT ${page_start}, ${page_size}`, (err, res1) => {
        if (err) {
            res.json({
                errcode: 1,
                errmsg: "获取分页服务器异常"
            })
        } else {
            req.db.query(`SELECT COUNT(*) AS c FROM user_table`, (err, res2) => {
                if (err) {
                    res.json({
                        errcode: 1,
                        errmsg: "获取总数服务器异常"
                    })
                } else {
                    res.json({
                        errcode: 0,
                        errmsg: "操作成功",
                        list: res1,
                        total: res2[0].c
                    })
                }
            });
        }
    });
})
module.exports = router