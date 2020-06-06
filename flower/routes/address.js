var express = require('express');
var router = express.Router();
var Address = require('./../sql/collection/address');
var sql = require('./../sql');
var uuid = require('node-uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('地址接口测试')
});

//添加地址
router.post('/add',(req,res,next) => {
  let { userid, name, tel, address, flag } = req.body;
  let addressid = 'address_' + uuid.v1();
  flag = flag*1 || 0; //默认为默认地址
  sql.insert(Address,{ userid, name , tel , flag ,addressid, address}).then(()=>{
    res.send({
      code:10010,
      message:'添加地址成功'
    })
  })
})

// 获取默认地址及获取地址接口
router.post('/getaddress',(req,res,next) => {
  let {  userid } = req.body;
  // flag = flag*1 || 0;
  sql.find(Address,{userid}, {_id: 0}).then((data)=>{
    if(data.length === 0){
      res.send({
        code:10011,
        message:'地址不存在'
      })
    } else {
      res.send({
        code:10012,
        message:'查询成功',
        data:data
      })
    }
  })
})


//修改地址接口
router.post('/upadd',(req,res,next) => {
  let {  name , tel , userid, flag ,addressid, address } = req.body;
  flag = flag*1 || 0;
  sql.find(Address,{userid,addressid}, {_id: 0}).then((data)=>{
    if(data.length === 0){
      res.send({
        code:10013,
        message:'地址不存在'
      })
    } else {
      sql.update(Address,{
        name:data[0].name,
        tel:data[0].tel,
        flag:data[0].flag,
        address:data[0].address
      },
      {$set:{
        name:name,
        tel:tel,
        flag:flag,
        address:address
      }}).then(()=>{
        res.send({
          code:10014,
          message:'修改成功',
          data:data
        })
      })
    }
  })
})

//删除地址接口
router.post('/deladd', (req, res, next) => {
  let { userid, addressid } = req.body
  sql.delete(Address, { userid, addressid }).then(() => {
    res.send({
      code:10015,
      message:'删除成功'
    })
  })
})


module.exports = router;
