const { Schema, model, Types: { ObjectId } } = require('mongoose');

const identifierSchema = new Schema({
    cardCode: String,
    customerId: { type: ObjectId, ref: 'Customer' }
})

module.exports = model('Identifier', identifierSchema);