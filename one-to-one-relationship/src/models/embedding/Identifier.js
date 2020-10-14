const { Schema, model } = require('mongoose');
const { CustomerSchema } = require('./Customer');

const IdentifierSchema = new Schema({
    cardCode: String,
    customer: CustomerSchema
});

const Identifier = model('IdentifierE', IdentifierSchema);

module.exports = Identifier;