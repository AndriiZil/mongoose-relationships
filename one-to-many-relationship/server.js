const express = require('express');
const logger = require('morgan');

require('dotenv').config();
const connect = require('./db');
const db = require('./src/models');

const app = express();

app.use(express.json());
app.use(logger('dev'));

connect().catch(err => console.log(err));

// few
app.post('/create-tutorial-image', async (req, res) => {
    try {
        const { title, author, path, url, caption } = req.body;

        const tutorial = await db.Tutorial.createTutorial(title, author);

        await db.Tutorial.createImage(tutorial._id, url, caption, path);
        await db.Tutorial.createImage(tutorial._id, url, caption, path);
        await db.Tutorial.createImage(tutorial._id, url, caption, path);
        await db.Tutorial.createImage(tutorial._id, url, caption, path);
        await db.Tutorial.createImage(tutorial._id, url, caption, path);

        return res.send('OK');
    } catch (err) {
        console.log(err);
    }
});

// many
app.post('/create-tutorial-comment', async (req, res) => {
    try {
        const { title, author, userName, text } = req.body;

        const tutorial = await db.Tutorial.create({title, author});
        const comment = await db.Comment.create({ userName, text });

        await db.Tutorial.createComment(tutorial._id, comment._id);

        return res.send('Success');
    } catch (err) {
        console.log(err);
    }
});

// a lot
app.post('/create-tutorial', async (req, res) => {
    try {
        const { title, author, name, description } = req.body;

        const tutorial = await db.Tutorial.create({ title, author });
        const category = await db.Category.create({ name, description })

        await db.Tutorial.addTutorialToCategory(tutorial._id, category._id);

        return res.send({ message: 'success' });
    } catch (err) {
        console.log(err);
    }
});

app.get('/comments/:id', async (req, res) => {
    try {
        const tutorials = await db.Tutorial.getTutorialsWithPopulateComments(req.params.id);

        return res.send(tutorials);
    } catch (err) {
        console.log(err);
    }
});

app.get('/category/:id', async (req, res) => {
    try {
        const tutorials = await db.Tutorial.getTutorialsInCategory(req.params.id);

        return res.send(tutorials);
    } catch (err) {
        console.log(err);
    }
});

app.listen(process.env.PORT);
