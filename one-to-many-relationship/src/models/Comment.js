const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    userName: String,
    text: String
});

module.exports = model('Comment', commentSchema);