const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
    name: String,
    age: Number,
    gender: String
})

module.exports = model('Customer', customerSchema);