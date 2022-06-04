import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connect, disconnect } from './database/connection';
import { auth } from './controllers/auth/auth';
import { register } from './controllers/auth/register';
import { getSpecialties } from './controllers/specialty/getSpecialties';
import { sendApplication } from './controllers/application/sendApplication';
import { deleteApplication } from './controllers/application/deleteApplication';
import { getStudentApplications } from './controllers/application/getStudentApplications';
import { logout } from './controllers/auth/logout';
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
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// auth
app.post('/auth', auth);
app.post('/register', register);
app.post('/logout', logout);

// specialties
app.get('/specialties', getSpecialties);

// student
app.get('/student/specialties', getStudentApplications);
app.post('/specialties', sendApplication);
app.delete('/specialties', deleteApplication);

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
