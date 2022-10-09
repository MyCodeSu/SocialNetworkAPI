const router = require('express').Router();

const {
    createThought,
    getThoughts, 
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts);

router.route('/:userId').post(createThought);

router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById);

router.route('/:thoughtId/users/:userIdno').delete(deleteThoughtById);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;