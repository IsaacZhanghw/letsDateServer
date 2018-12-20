// const mysql = require("mysql")
const mongoose = require("mongoose")

const Schema = mongoose.Schema

// 数据库验证
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
})

module.exports = User = mongoose.model("users", UserSchema)