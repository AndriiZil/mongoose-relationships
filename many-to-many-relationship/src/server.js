const express = require('express');
const logger = require('morgan');

const config = require('dotenv').config();

if (config.error) {
    throw new Error('.env file doesn\'t specified');
}
const connect = require('./db');
const db = require('./models');

const app = express();

app.use(express.json());
app.use(logger('dev'));

connect().catch(err => console.log(err));

app.post('/', async (req, res) => {
    try {
        const tut1 = await db.Tutorial.create({ title: 'Title1', author: 'Author1' });

        const tag1 = await db.Tag.create({ name: 'Tag1', slug: 'Slug1' });
        const tag2 = await db.Tag.create({ name: 'Tag2', slug: 'Slug2' });

        await db.Tutorial.addTagToTutorial(tut1._id, tag1._id);
        await db.Tag.addTutorialToTag(tag1._id, tut1._id);

        await db.Tutorial.addTagToTutorial(tut1._id, tag2._id);
        await db.Tag.addTutorialToTag(tag2._id, tut1._id);

        const tut2 = await db.Tutorial.create({ title: 'Title2', author: 'Author2' });

        await db.Tutorial.addTagToTutorial(tut2._id, tag2._id);
        await db.Tag.addTutorialToTag(tag2._id, tut2._id);

        res.send('success');

    } catch (err) {
        console.log(err);
    }
});

app.get('/tags/:id', async (req, res) => {
    try {
        const tags = await db.Tag.findById(req.params.id)
            .populate('tutorials', '-_id -__v -tags');

        return res.send(tags);
    } catch (err) {
        console.log(err);
    }
});

app.get('/tutorials/:id', async (req, res) => {
    try {
        const tutorials = await db.Tutorial.findById(req.params.id)
            .populate('tags', '-_id -__v -tutorials');

        return res.send(tutorials);
    } catch (err) {
        console.log(err);
    }
})

app.listen(process.env.PORT);