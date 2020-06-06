const mongoose = require('./../db.js');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    adminid: { type: String },
    adminname: { type: String },
    password: { type: String },
    roles: { type: Number }
})


module.exports = mongoose.model('Admin', adminSchema);
