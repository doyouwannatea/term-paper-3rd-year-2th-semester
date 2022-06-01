import { Request, Response } from 'express';
import { connection } from '..';
import { ExamResponce } from '../models/Exam';
import { Student } from '../models/Student';

export const auth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.send('Нет авторизационных данных').status(400);

    const studentList = (
      await connection.query(
        `SELECT * FROM students 
    WHERE student_email=? AND student_password=?`,
        [email, password]
      )
    )[0] as Student[];
    const student = studentList[0];

    if (!student) return res.send('Студент не найден!').status(400);

    const exams = (
      await connection.query(
        'SELECT * FROM exams WHERE student_id=?',
        [student.student_id]
      )
    )[0] as ExamResponce[];

    const { student_password, ...studentData } = student;
    res.json({ ...studentData, exams });
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
