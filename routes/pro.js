var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx');
var uuid = require('node-uuid');
var Pro = require('./../sql/collection/pros');
var sql = require('./../sql')
var filestr = 'D:/文档/visual studio/.vscode/vue/back/flowers.xlsx'
// var filestr = 'D:/全部资料/第三阶段/code/week2-4-vue/day06/myapp/shop.xlsx'

// 查询列表数据，分页
router.get('/', function(req, res, next) {
  let { pageCode, limitNum } = req.query
  pageCode = pageCode * 1 || 0;
  limitNum = limitNum * 1 || 10;
  sql.paging(Pro , {}, {_id: 0 }, limitNum, pageCode ).then(data => {
    res.send({
      code: '200',
      success: '查询数据成功',
      length: data.length,
      data: data
    })
  })
});

// 获取xlsx数据接口
router.get('/import', function(req, res, next) {
  let obj = xlsx.parse(filestr)[0].data
  let arr = []
  obj.map((item, index) => {
    if (index !== 0) {
      arr.push({
        proid: 'pro_' +uuid.v1(),
        use: item[0],
        breed:item[1],
        type: item[2],
        material: item[3],
        proname: item[4],
        price: item[5],
        proimg: item[6],
        note: item[7]
      })
    }
  })
  sql.insert(Pro,arr).then(() => {
    res.send(arr)
  })
});

//查询分类以及品牌的接口
router.get('/type', (req, res, next) => {
  let { type } = req.query
  sql.distinct(Pro, type ).then(data => {
    res.send({
      code: '200',
      cuccess: '获取类型成功',
      data: data
    })
  })
})

//查询分类以及品牌的接口
router.get('/breed', (req, res, next) => {
  let { breed } = req.query
  sql.find(Pro, {breed} ,{_id:0}).then(data => {
    res.send({
      code: '200',
      cuccess: '获取类型成功',
      data: data
    })
  })
})

// 获取产品详情
router.get('/detail',(req, res, next ) => {
  let { proid } = req.query
  sql.find(Pro, { proid }, { _id: 0 }).then(data => {
    res.send({
      code: '200',
      message: '查询成功',
      data: data[0]
    })
  })
})

//获取分类类型对应的品牌
router.get('/category', (req, res, next) => {
  let { type } = req.query
  sql.find(Pro, { type }, { _id: 0, breed: 1 }).then(data => {
    let obj = {}
    data = data.reduce((item, next) => {
      obj[next.breed] ? '' : obj[next.breed] = true && item.push(next)
      return item
    },[])
    res.send({
      code: '200',
      message: '获取分类类型列表',
      data: data
    })
  })
})

// 获取品牌类型对应的产品
router.get('/brandcategory', (req, res, next) => {
  let { type } = req.query
  sql.find(Pro, { type: type }, { _id: 0 }).then(data => {
    res.send({
      code: '200',
      message: '获取品牌分类列表',
      data: data
    })
  })
})

// 获取用途接口
router.get('/use', (req, res, next) => {
  let { use } = req.query
  sql.find(Pro, { use: use }, { _id: 0 }).then(data => {
    res.send({
      code: '200',
      message: '获取品牌用途列表',
      data: data
    })
  })
})

// 搜索接口
router.get('/search', (req, res, next) => {
  let { text } = req.query
  sql.find(Pro, { material: eval('/' + text + '/')}, { _id: 0}).then(data => {
    res.send({
      code: '200',
      message: '搜索列表',
      data: data
    })
  })
})
module.exports = router;
