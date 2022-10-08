const { Thought } = require('../models');
const User = require('../models/User');

// User methods export
module.exports = {

    // All users
    getUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    // single user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .populate("friends")
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404), json({ message: "ID does not exist, no user found." })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500), json(err));
    },

    // create new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch(err => res.status())
    },

    // update user by id
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { runValidators: true })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "ID does not exist, no user found." });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    //delete user by id
    deleteUserById({ params }, res_) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "ID does not exist, no user found." });
                    return;
                }
                User.updateMany({ _id: { $in: dbUserData.friends } },
                    { $pull: { friends: params.id } }
                )
                    .then(() => {
                        Thought.deleteMany({ username: dbUserData.username })
                            .then(() => {
                                res.json({ message: "Success - user and user's friend(s) and thought(s) deleted" });
                            })
                            .catch(err => res.status(500).json(err));
                    })
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    },

    //add friend by id
    addFriend(req, res) {

        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "ID does not exist, no user found." })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    //delete a friend by Id
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "ID does not exist, no user found." });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err))
    },
};