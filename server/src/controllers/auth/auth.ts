import { Request, Response } from 'express';
import { connection } from '../..';
import { selectExamsByStudentId } from '../../database/exam/selectExamsByStudentId';
import { selectStudentData } from '../../database/student/selectStudentData';
import { selectStudentDocs } from '../../database/student/selectStudentDocs';

export const auth = async (req: Request, res: Response) => {
  try {
    const email = req.body.email || req.cookies.email;
    const password = req.body.password || req.cookies.password;
    if (!email || !password)
      return res.send('Нет авторизационных данных').status(400);

    const studentList = await selectStudentData(
      connection,
      email,
      password
    );
    const student = studentList[0];

    if (!student) return res.send('Студент не найден!').status(400);

    const exams = await selectExamsByStudentId(
      connection,
      student.student_id
    );
    const docs = await selectStudentDocs(
      connection,
      student.student_id
    );

    const { student_password, ...studentData } = student;
    res
      .cookie('password', password, {
        maxAge: 900000,
        httpOnly: true,
      })
      .cookie('email', email, {
        maxAge: 900000,
        httpOnly: true,
      })
      .json({ ...studentData, exams, docs });
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
