import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import cookieParser from 'cookie-parser';
import { connect, disconnect } from './database/connection';
import { auth } from './controllers/auth';
import { register } from './controllers/register';
import { getSpecialties } from './controllers/getSpecialties';
import { sendSpecialtyApplication } from './controllers/sendSpecialtyApplication';
import { deleteSpecialtyApplication } from './controllers/deleteSpecialtyApplication';
import { getStudentSpecialties } from './controllers/getStudentSpecialties';
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

// middleware
app.use(express.json());
app.use(cookieParser());

// auth | register
app.post('/auth', auth);
app.post('/register', register);

// specialties
app.get('/specialties', getSpecialties);
app.post('/specialties', sendSpecialtyApplication);
app.delete('/specialties', deleteSpecialtyApplication);

// student
app.get('/student/specialties', getStudentSpecialties);

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
