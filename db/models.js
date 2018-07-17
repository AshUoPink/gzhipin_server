/*连接数据库*/
// 引入mongoose
const mongoose = require('mongoose')
// 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/180315_gzhipin')
// 获取连接对象
const conn = mongoose.connection
// 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () {
  console.log('db connect success!')
})

// 定义Schema
const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  header: {type: String},
  post: {type: String},
  info: {type: String},
  company: {type: String},
  salary: {type: String}
})
// 定义Model
const UserModel = mongoose.model('users', userSchema)
// 暴露Model
exports.UserModel = UserModel

