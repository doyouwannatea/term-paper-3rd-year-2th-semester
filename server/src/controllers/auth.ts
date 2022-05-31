import { Request, Response } from 'express';
import { connection } from '..';
import { Student } from '../models/Student';

export const auth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.send('Нет авторизационных данных').status(400);

    const dbResult = await connection.query(
      `SELECT * FROM students 
    WHERE student_email=? AND student_password=?`,
      [email, password]
    );

    const student = (dbResult[0] as Student[])[0];
    if (!student)
      return res.send('Студент уже зарегистрирован!').status(400);
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
