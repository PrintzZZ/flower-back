var express = require('express');
var router = express.Router();
const sql = require('../sql');
const Comment = require('../sql/collection/comments');
const User = require('../sql/collection/users');
const uuid = require('node-uuid');

/* GET home page. */
router.get('/', function (req, res, next) {
  let { proid } = req.query;
  sql.find(Comment, { proid }, { _id: 0 }).then(data => {
    let arr = [];
    new Promise(resolve => {
      data.map((item, index) => {
        sql.find(User, { userid: item.userid }, { _id: 0 }).then(data1 => {
          console.log(data1)
          arr.push({
            commentid: item.commentid,
            username: data1[0].username,
            note: item.note,
            rating: item.rating
          })
          if (index >= data.length - 1) {
            resolve()
          }
        })
      })
    }).then(() => {
      res.send({
        code: '200',
        message: '查询评论列表',
        data: arr
      })
    })
  })
});
router.post('/add', (req, res, next) => {
  let { userid, proid, rating, note } = req.body;
  rating = rating || 5
  sql.insert(Comment, {
    commentid: 'comment_' + uuid.v1(),
    userid,
    proid,
    rating,
    note
  }).then(() => {
    res.send({
      code: '10111',
      message: '评论发布成功'
    })
  })
})

module.exports = router;