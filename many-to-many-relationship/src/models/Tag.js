const { Schema, model, Types: { ObjectId } } = require('mongoose');

const tagSchema = new Schema({
    name: String,
    slug: String,
    tutorials: [
        {
            type: ObjectId,
            ref: 'Tutorial'
        }
    ]
});

tagSchema.statics.addTutorialToTag = addTutorialToTag;

async function addTutorialToTag(tagId, tutorialId) {
    return this.findByIdAndUpdate(tagId, {
        $push: { tutorials: tutorialId }
    }, { new: true });
}

module.exports = model('Tag', tagSchema);