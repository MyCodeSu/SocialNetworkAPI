const { Schema, model } = require('mongoose');
const reactionSchema = require('..models/Reaction');
const dayjs = require('dayjs');
const { stringify } = require('querystring');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            trim: true, 
            minLength: 1,
            maxLength: 200
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtTime) => dayjs(createdAtTime).format('MMMM D, YYYY h:mm A')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return `reactions: ${this.reactions.length}`;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;