import { db } from '../db/database.js';

export async function findByUsername(username) {
  return null;
  //return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  return db
    .execute(
      'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
      [username, password, name, email, url]
    )
    .then((result) => {
      result[0].insertId;
    });
}

export async function findById(id) {
  return null;
  //return users.find((user) => user.id === id);
}
