var express = require('express');
var router = express.Router();
var sql = require('./../sql');
var Cart = require('./../sql/collection/carts');
var Pro = require('./../sql/collection/pros');
var uuid = require('node-uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  let { userid } = req.query;
  let cartarr = []
  sql.find(Cart,{ userid }, { _id: 0 }).then(data => {
    if(data.length === 0) {
      res.send({
        code: '11000',
        message: '购物车没有数据'
      })
    } else {
      cartarr = data
      let p1 = data.map(item => {
        return sql.find(Pro, { proid: item.proid }, { _id: 0 })
      })
      return Promise.all(p1)
    }
  }).then(list => {
    let arr = []
    list.map((item, index) => {
      console.log('cartarr',cartarr)
      arr.push({
        proid: item[0].proid,
        proname: item[0].proname,
        proimg: item[0].proimg,
        price: item[0].price,
        material: item[0].material,  //yad 添加商品材料 11.8
        cartid: cartarr[index].cartid,
        userid: cartarr[index].userid,
        num: cartarr[index].num,
      })
    })
    res.send({
      code: '200',
      data: arr
    })
  })
  
});



router.get('/add',(req, res, next) => {
  let {userid, proid , num } = req.query;
  num = num * 1 || 1
  //加入购物车
  sql.find(Cart, { userid, proid }, { _id: 0 }).then(data => {
    if (data.length === 0) {
      // 没有数据， ---插入数据库操作
      sql.insert(Cart, {
        cartid: 'cart_' + uuid.v1(),
        userid,
        proid,
        num
      }).then(() => {
        res.send({
          code: '200',
          message: '加入购物车成功'
        })
      })
    } else {
      sql.update(Cart, { userid, proid }, { $inc: { num: 1 } }).then(() => {
        res.send({
          code: '200',
          message: '加入购物车成功'
        })
      }) 
    }
  })
})

//删除购物车
router.get('/delete', (req, res, next) => {
  let { userid, proid } = req.query;
  sql.delete(Cart, { userid, proid }).then(() => {
    res.send({
      code: '11110',
      message: '删除成功'
    })
  })
})
//更新购物车
router.get('/update', (req, res, next) => {
  let { cartid, num } = req.query;
  sql.update(Cart, { cartid }, { $set: {num: num }}).then(() => {
    res.send({
      code: '11111',
      message: '更新成功'
    })
  })
})
module.exports = router;
