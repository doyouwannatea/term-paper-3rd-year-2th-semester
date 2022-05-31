import { Request, Response } from 'express';
import { OkPacket } from 'mysql2/promise';
import { connection } from '..';
import { Student } from '../models/Student';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, passport, photo } = req.body;
    // проверка email и пароля
    if (!email || !password)
      return res.send('Нет авторизационных данных').status(400);

    const dbStudentRes = await connection.query(
      `SELECT * FROM students 
          WHERE student_email=? AND student_password=?`,
      [email, password]
    );

    const student = (dbStudentRes[0] as Student[])[0];
    if (student)
      return res.send('Студент уже зарегестрирован!').status(400);

    // проверка пасспорта и фотографии
    if (!passport)
      return res.send('Нет паспортных данных').status(400);
    if (!photo) return res.send('Нет фото 3х4').status(400);

    // занесение пользователя в БД
    const [registeredStudent] = await connection.query(
      `
        INSERT INTO students (
            students.entered,
            students.entry_year,
            students.student_email,
            students.student_password
        ) VALUES (?, ?, ?, ?);`,
      [false, 0, email, password]
    );

    const { insertId } = registeredStudent as OkPacket;
    await connection.query(
      `INSERT INTO documents (student_id, doc_name, doc_image) VALUES (?, ?, ?)`,
      [insertId, 'passport', passport]
    );
    await connection.query(
      `INSERT INTO documents (student_id, doc_name, doc_image) VALUES (?, ?, ?)`,
      [insertId, 'photo3x4', photo]
    );

    res.send('ok');
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
