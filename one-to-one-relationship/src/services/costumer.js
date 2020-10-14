const CustomerReferencingModel = require('../models/referencing/Customer');
const IdentifierReferencingModel = require('../models/referencing/Identifier');
const { Customer: CustomerEmbeddingModel } = require('../models/embedding/Customer');
const IdentifierEmbeddingModel = require('../models/embedding/Identifier');

class CostumerService {

    async createCustomerReference(body) {
        const { name, age, gender } = body;

        const customer = new CustomerReferencingModel({ name, age, gender });
        await customer.save();

        const identifier = new IdentifierReferencingModel({
            cardCode: customer._id.toString().substring(0, 10).toLocaleUpperCase(),
            customerId: customer._id
        });

        await identifier.save();

        return 'success';
    }

    async getIdentifierReference() {
        return IdentifierReferencingModel
            .find()
            .populate('customerId', '-_id -__v');
    }

    async createCustomerEmbedding(body) {
        const { name, age, gender } = body;

        const customer = new CustomerEmbeddingModel({ name, age, gender });
        await customer.save();

        const identifier = new IdentifierEmbeddingModel({
            cardCode: customer._id.toString().substring(0, 10).toLocaleUpperCase(),
            customer: customer
        });
        await identifier.save();

        return 'success';
    }

    async getIdentifierEmbedding() {
        return IdentifierEmbeddingModel
            .find()
            .select('-__v -customer.__v -customer._id');
    }

}

module.exports = new CostumerService();