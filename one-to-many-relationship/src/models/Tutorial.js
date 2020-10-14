const { Schema, model, Types: { ObjectId } } = require('mongoose');

const tutorialScheme = new Schema({
    title: String,
    author: String,
    images: [],
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
    category: {
        type: ObjectId,
        ref: 'Category'
    }
});

tutorialScheme.statics.createTutorial = createTutorial;
tutorialScheme.statics.createImage = createImage;
tutorialScheme.statics.createComment = createComment;
tutorialScheme.statics.getTutorialsWithPopulateComments = getTutorialsWithPopulateComments;
tutorialScheme.statics.addTutorialToCategory = addTutorialToCategory;
tutorialScheme.statics.getTutorialsInCategory = getTutorialsInCategory;

async function createTutorial(title, author) {
    return this.create({ title, author });
}

// Few
async function createImage(tutorialId, url, caption, path) {
    return this.findByIdAndUpdate(tutorialId, {
        $push: {
            images: { url, caption, path }
        }
    }, { new: true });
}

// Many
async function createComment(tutorialId, commentId) {
    return this.findByIdAndUpdate(tutorialId, {
        $push: { comments: commentId }
    }, { new: true });
}

async function getTutorialsWithPopulateComments(tutorialId) {
    return this.findById(tutorialId)
        .populate('comments', '-_id -__v');
}

// A lot
async function addTutorialToCategory(tutorialId, categoryId) {
    return this.findByIdAndUpdate(tutorialId, {
        category: categoryId
    }, { new: true });
}

async function getTutorialsInCategory(categoryId) {
    return this.find({ category: categoryId })
        .populate('category', 'name -_id')
        .select('-comments -images -__v');
}

module.exports = model('Tutorial', tutorialScheme);