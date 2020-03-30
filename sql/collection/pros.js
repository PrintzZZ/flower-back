const mongoose = require("../db")
const Schema = mongoose.Schema;



// 设计用户表的集合
const proSuhema = new Schema({//设计永辉集合的字段以及数据类型
    proid: {type:String},
    use: {type:String},
    breed:{type:String}, //种类
    type:{type:String}, 
    material: {type:String},
    proname: {type:String},
    price: {type:Number},
    proimg: {type:String},
    note: {type:String},
})


// 无则创建数据库集合并且链接，有则链接，并且暴露出去

module.exports = mongoose.model('Pro',proSuhema)  //默认在user后面加s，即Users

