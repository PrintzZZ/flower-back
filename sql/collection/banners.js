const mongoose = require('../db.js');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    bannerid: { type: String },
    type: { type: String },
    img: { type: String },
    href: { type: String }
})


module.exports = mongoose.model('Banner', bannerSchema);
