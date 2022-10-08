const { Schema, model } = require('mongoose');

// User Schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,

            // validation approach from stackedoverflow
            validate: {
                validator: function (valEmail) {
                    let eRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return eRegex.test(valEmail);
                },
                message: "Please enter a valid email address."
            },
            required: [true, "Email required"]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

const User = model('User', userSchema);

module.exports = User;