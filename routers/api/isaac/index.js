// 个站
const express = require('express')
const router = express.Router()
const uuid = require('uuid/v4');

// $route POST api/register
// @desc  返回请求你的json数据
// @access public
router.post("/addArticle", (req, res) => {
    let { title, content, tagsStr } = req.body;
    // 查询数据库中是否存在用户
    let ID = uuid().replace(/\-/g, '');
    let oDate = new Date();
    oDate.setMinutes(oDate.getMinutes() + 20);
    let creatTime = Math.floor(oDate.getTime() / 1000);
    let times = 1
    let tags = tagsStr ? tagsStr : ''
    req.db.query(`INSERT INTO article_table (ID, title, content, creatTime, times, tags ) VALUES('${ID}', '${title}', '${content}', '${creatTime}', '${times}', '${tags}')`, err => {
        if (err) {
            res.json({
                errcode: 1,
                errmsg: "添加文章服务器异常"
            })
        } else {
            res.json({
                errcode: 0,
                errmsg: "加文章成功,请登录",
            })
        }
    });
})

// $route POST api/users/getUsersList
// @desc  返回请求你的json数据
// @access public
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