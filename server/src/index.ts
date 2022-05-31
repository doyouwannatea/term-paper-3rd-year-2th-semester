import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import { connect, disconnect } from './database/connection';
import { auth } from './controllers/auth';
import { register } from './controllers/register';
dotenv.config();

const app = express();
export const connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  })
  .promise();

app.use(express.json());
app.post('/auth', auth);
app.post('/register', register);

app
  .listen(process.env.PORT, () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
    );
    connect(connection);
  })
  .on('close', () => {
    disconnect(connection);
  });
