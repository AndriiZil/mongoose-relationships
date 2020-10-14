const { Schema, model } = require('mongoose');

const CustomerSchema = new Schema({
    name: String,
    age: Number,
    gender: String
})

const Customer = model('CustomerE', CustomerSchema);

module.exports = { Customer, CustomerSchema };