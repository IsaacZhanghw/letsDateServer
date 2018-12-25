const express = require('express')
const mysql = require('mysql');
const bodyParse = require('body-parser');
const config = require('./config');
const passport = require('passport');
const app = express();
// 引入users路由
const date = require("./routers/api/date")
const isaac = require("./routers/api/isaac")
    // DB连接数据库
const db = mysql.createPool({ host: config.mysql_host, user: config.mysql_user, password: config.mysql_password, port: config.mysql_port, database: config.mysql_dbname });

//中间件
//普通POST数据
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// passport 初始化
app.use(passport.initialize());

require('./libs/common')(passport);

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use("/api/date", date)
app.use("/api/isaac", isaac)

app.listen(config.port, () => {
    console.log(`app is running on http://localhost:${config.port}`)
})