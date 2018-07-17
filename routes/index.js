var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')

const {UserModel} = require('../db/models')
const filter = {password: 0, __v: 0}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册一个用户注册的路由接口
// 注册的路由
router.post('/register', function (req, res) {
  // 获取请求参数数据
  const {username, password, type} = req.body
  // 处理数据
  // 根据username查询users集合中对应的user
  UserModel.findOne({username}, function (error, user) {
    if(user) {
      // 返回响应(失败)
      res.send({
        "code": 1,
        "msg": "此用户已存在"
      })
    } else {
      // 如果没有, 保存到users中
      new UserModel({username, password: md5(password), type}).save(function (error, user) {
        // 向浏览器返回一个userid的cookie
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
        // 返回响应(成功)
        res.send({
          "code": 0,
          "data": {username, type, _id: user._id}
        })
      })
    }
  })
})

// 登录的路由
router.post('/login', function (req, res) {
  const {username, password} = req.body
  // 根据username/password查询users中对应的user
  UserModel.findOne({username, password: md5(password)}, filter, function (error, user) {
    if(user) {
      // 有，成功
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
      
      res.send({
        "code": 0,
        "data": user
      })
    } else { // 没有, 失败
      res.send({
        "code": 1,
        "msg": "用户名或密码错误"
      })
    }
  })
})

module.exports = router;
