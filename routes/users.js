var express = require('express');
var router = express.Router();

/* 测试接口 */
router.get('/', function(req, res, next) {
  res.send('用户接口测试');
});

module.exports = router;
