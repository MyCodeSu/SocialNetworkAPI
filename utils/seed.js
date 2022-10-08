const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

      // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // user objects
  const users = [
    {
        username: "Mocha",
        email: "mocha@thebugg.com"
    },
    {
        username: "Cinnamon",
        email: "cinnamon@thepoodle.com"
    }
  ];

  // array of thoughts/username
  const thoughts = [
    {
        thoughtText: "What a lovely coat, don't see brindle too often!",
        username: "Morris"
    },
    {
        thoughtText: "Come here, tiny apricot! 😘",
        username: "Gene"
    }
  ];

  await User.collection.insertMany(users);


  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete');
  process.exit(0);
});