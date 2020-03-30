const mongoose = require("../db")
const Schema = mongoose.Schema;

const cartSuhema = new Schema({
  cartid: {type: String },
  userid: {type: String },
  proid: {type: String },
  num: {type: Number },
})

module.exports = mongoose.model('Cart',cartSuhema)

