const { Router } = require('express');
const CostumerService = require('../services/costumer');
const router = Router();

router.post('/referencing', async (req, res) => {
    try {
        const customer = await CostumerService.createCustomerReference(req.body);

        res.send(customer);
    } catch (err) {
        console.log(err);
    }
});

router.get('/referencing', async (req, res) => {
    try {
        const identifiers = await CostumerService.getIdentifierReference();

        res.send(identifiers);
    } catch (err) {
        console.log(err);
    }
});

router.post('/embedding', async (req, res) => {
    try {
        const customer = await CostumerService.createCustomerEmbedding(req.body);

        res.send(customer);
    } catch (err) {
        console.log(err);
    }
});

router.get('/embedding', async (req, res) => {
    try {
        const identifiers = await CostumerService.getIdentifierEmbedding();

        res.send(identifiers);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;