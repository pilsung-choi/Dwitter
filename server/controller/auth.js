import {} from 'express-async-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const jwtSecretKey = '56SQtlwTi$d#4619ca#Q5l*YLbkRjf';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res, next) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    // userId = user.id
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res, next) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const isValidPassword = bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

export async function me(req, res, next) {
  const authorization = req.get('Authorization');
  console.log(authorization);
  return res.status(200).json('test');
  // return {token, username}
}

const createJwtToken = (id) => {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
};
