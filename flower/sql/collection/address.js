const mongoose = require('./../db.js'); // 引入数据库连接模块
const Schema = mongoose.Schema; // 拿到当前数据库相应的集合对象

// 设计地址的集合
const addressSchema = new Schema({ // 设计地址集合的字段以及数据类型
  addressid: { type: String},
  userid: { type: String },
  name: { type: String },
  tel: { type: String },
  address: { type: String },
  flag: { type: Number }
})

module.exports = mongoose.model('Address', addressSchema);
