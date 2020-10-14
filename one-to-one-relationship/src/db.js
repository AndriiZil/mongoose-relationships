const mongoose = require('mongoose');
require('dotenv').config();

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