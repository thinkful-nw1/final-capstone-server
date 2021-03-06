const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      email: 'testuser1@email.com',
      password: 'password'
    },
    {
      id: 2,
      username: 'test-user-2',
      email: 'testuser2@email.com',
      password: 'password'
    },
    {
      id: 3,
      username: 'test-user-3',
      email: 'testuser3@email.com',
      password: 'password'
    },
    {
      id: 4,
      username: 'test-user-4',
      email: 'testuser4@email.com',
      password: 'password'
    }
  ];
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users
      RESTART IDENTITY CASCADE`
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db
    .into('users')
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('users_id_seq', ?)`, [users[users.length - 1].id])
    );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256'
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  cleanTables,
  seedUsers,
  makeAuthHeader
};
