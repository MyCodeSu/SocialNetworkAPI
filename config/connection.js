const { connect, connection} = require('mongoose');

connect('mongodb://localhost/socialNetwork', {
    useNewParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;