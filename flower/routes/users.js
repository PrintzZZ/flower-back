var express = require('express');
var router = express.Router();
var User = require('./../sql/collection/users');
var sql = require('./../sql');
var uuid = require('node-uuid');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10); //加密级别
var jwt = require('jsonwebtoken'); //token模块 

//注册接口
router.post('/register',(req,res,next) => {
  let { username,password,tel } = req.body;
  sql.find(User, {tel}, {_id:0}).then(data =>{
    if(data.length == 0){
      let userid = 'userid_' + uuid.v1();
      password = bcrypt.hashSync(password, salt);  //加密
      sql.insert(User,{userid,username,password,tel}).then(()=>{
        res.send({
          code:10001,
          message:'注册成功',
          data:{
            userid: userid,
            username: username,
            password: password
          }
        })
      })
    } else {
      res.send({
        code:10002,
        message:'用户已存在,请直接登录'
      })
    }
  })
})
//登录接口
router.post('/login',(req,res,next) => {
  let {tel , password} = req.body;
  sql.find(User, {tel} , {_id: 0}).then(data => {
    if(data.length === 0){
      res.send({
        code:10003,
        message:'用户不存在'
      })
    }else {
      let pwd = data[0].password;
      var flag = bcrypt.compareSync(password, pwd);  //解密返回boolean
      if(flag){
        let userid = data[0].userid; // 生成token 秘钥为:flower
        let token = jwt.sign( { userid }, 'flower', {
          expiresIn: 60*60*12 // 授权12小时
        })
        res.send({
          code:10004,
          message:'登录成功',
          data:data,
          token: token
        })
      }else{
        res.send({
          code:10005,
          message:'密码错误'
        })
      }
    }
  })
})
//修改个人信息接口
router.post('/update',(req,res,next) => {
  let { newname, tel, sex, birth } = req.body;
  sql.find(User, {tel} , {_id: 0}).then(data => {
    if(data.length === 0){
      res.send({code:10006,message:'用户名不存在,修改失败'})
    } else {
      sql.update(User,{username:data[0].username,sex:data[0].sex,birth:data[0].birth},{$set:{username:newname,sex:sex,birth:birth}}).then(() => {
        res.send({code:10007,message:'修改用户名成功'})
      })
    }
  })
})

//查询个人信息接口
router.post('/findinfo',(req,res,next) => {
  let {tel} =req.body;
  sql.find(User, {tel}, {_id: 0}).then(data => {
    if(data.length === 0){
      res.send({code:10008,message:'用户不存在'})
    } else {
      res.send({code:10009,message:'查询成功',info:data})
    }
  })
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users测试');
});

module.exports = router;
