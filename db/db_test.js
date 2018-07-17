/*连接数据库*/
// 引入mongoose
const mongoose = require('mongoose')
//  连接指定数据库
mongoose.connect('mongodb://localhost:27017/gzhipin_test3')
//  获取连接对象
const connection = mongoose.connection
// 绑定连接完成的监听
connection.on('connected', function () {
  console.log('连接数据库成功!')
})

// 定义Schema
const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String}
})
// 定义Model
const UserModel = mongoose.model('users', userSchema)

// 添加数据
function testSave() {
  const user = {username: 'Tom1', password: '321'}
  const userModel = new UserModel(user)
  userModel.save(function (error, user) {
    console.log(error, user)
  })
}
 // testSave()

// 查询多个或一个数据
function testFind() {
  UserModel.findOne({_id: '5b4d86fea412ec45b4d654d6'}, function (error, user) {
    console.log('findOne', error, user)
  })
  UserModel.find({_id: '5b4d86fea412ec45b4d654d6'}, function (error, users) {
    console.log('find', error, users)
  })
}
// testFind()

// 更新某个数据
function testUpdate() {
  UserModel.findByIdAndUpdate({_id:'5b4d902120070427d0bb1b6d'}, {username: 'Jack'},
    function (error, oldUser) {
      console.log('update', error, oldUser)
    })
}
// testUpdate()

// 删除数据
function testRemove() {
  UserModel.remove({_id:'5b4d9058b450752994243a61'}, function (error, doc) {
    console.log('remove', error, doc)
  })
}
// testRemove()
