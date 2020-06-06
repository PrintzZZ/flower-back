const mongoose = require('../db.js');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentid: { type: String },
    userid: { type: String },
    proid: { type: String },
    note: { type: String },
    rating: { type: Number }
})

module.exports = mongoose.model('Comment', commentSchema);
