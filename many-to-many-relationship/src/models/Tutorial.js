const { Schema, model, Types: { ObjectId } } = require('mongoose');
const db = require('../db');

const tutorialSchema = new Schema({
    title: String,
    author: String,
    tags: [
        {
            type: ObjectId,
            ref: 'Tag'
        }
    ]
});

tutorialSchema.statics.addTagToTutorial = addTagToTutorial;

async function addTagToTutorial(tutorialId, tagId) {
    return this.findByIdAndUpdate(tutorialId, {
        $push: { tags: tagId }
    }, { new: true });
}

module.exports = model('Tutorial', tutorialSchema);