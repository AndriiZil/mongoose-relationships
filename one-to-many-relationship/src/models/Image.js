const { model, Schema } = require('mongoose');

const imageSchema = new Schema({
    path: String,
    url: String,
    caption: String
});

module.exports = model('Image', imageSchema);