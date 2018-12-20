const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const mysql=require('mysql');
const config = require("../config");
const db=mysql.createPool({host: config.mysql_host, user: config.mysql_user, password: config.mysql_password, port: config.mysql_port, database: config.mysql_dbname});


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    db.query(`SELECT * FROM admin_table WHERE id='${jwt_payload.id}'`, (err, data) => {
      if (err) {
        return done(null,false);
      } else if (data.length == 0) {
        return done(null,false);
      } else {
        return done(null,true);
      }
    });
  }));
}