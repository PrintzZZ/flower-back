var express = require('express');
var router = express.Router();
var Headimg = require('./../sql/collection/headimg');
var sql = require('./../sql');
var uuid = require('node-uuid');

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('测试')
});

//图片上传接口
router.post('/upload',(req,res,next)=> {
  let { file, userid } = req.body;
  let type = 'img';
  sql.delete(Headimg,{userid: userid});
  sql.insert( Headimg, { file, type, userid } ).then(() => {
    res.send({
      code: 10017,
      message: '上传成功'
    })
  })
})

//查询图片接口
router.post('/getimg',(req,res,next) => {
  let { userid } = req.body;
  sql.find( Headimg, { userid: userid }, {_id:0}).then((data)=>{
    res.send({
      code:10018,
      message:'查询成功',
      data:data
    })
  })
})

module.exports = router;
