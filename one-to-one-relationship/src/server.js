const express = require('express');
const connect = require('./db');
const costumerRouter = require('./routes/costumer');

const app = express();

app.use(express.json());

connect().catch(err => console.log(err));

app.use('/costumers', costumerRouter);

app.listen(process.env.PORT);

