const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

// Reaction Schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 200
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtTime) => dayjs(createdAtTime).format('MMMM D, YYYY h:mm A')
        },
    },
    {
        toJSON: {
            getter: true
        },
        id: false,
    }
);

module.exports = reactionSchema;