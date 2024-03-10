/*
Parameterized Queries: When interacting with a database, use parameterized queries to prevent SQL injection attacks. Here’s an example using pg-promise
*/
const db = require('./db');

async function getUser(username) {
  const user = await db.one('SELECT * FROM users WHERE username = $1', [username]);
  return user;
}

module.exports = getUser;
