import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import { connect, disconnect } from './database/connection';
dotenv.config();

const app: Express = express();
const connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  })
  .promise();

interface User {
  id: number;
  name: string;
  age: number;
}

app.get('/', async (req: Request, res: Response) => {
  const dbResult = await connection.query('SELECT * FROM user');
  const users = dbResult[0] as User[];
  res.json(users);
});

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
