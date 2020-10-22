const mongoose = require('mongoose');

const { error } = require('dotenv').config({ path: './src/.env'});

if (error) {
    throw new Error('ENV file should be specified.');
}

mongoose.set('debug', true);

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB Connected');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect;