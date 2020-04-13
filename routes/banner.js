var express = require('express');
var router = express.Router();
var sql = require('./../sql');
var Banner = require('./../sql/collection/banners');

router.get('/', (req, res, next) => {
  let { type } = req.query
  type = type || 'home'
  sql.find(Banner, { type }, { _id: 0 }).then(data  => {
    res.send({
      code: '200',
      maessage: '获取banner成功',
      data: data
    })
  })
})


module.exports = router;