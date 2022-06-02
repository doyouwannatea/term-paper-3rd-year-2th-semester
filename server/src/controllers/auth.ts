import { Request, Response } from 'express';
import { connection } from '..';
import { selectExamsByStudentId } from '../database/selectors/selectExamsByStudentId';
import { selectStudentData } from '../database/selectors/selectStudentData';

export const auth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
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

    const { student_password, ...studentData } = student;
    res.cookie('password', password, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.cookie('email', email, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.json({ ...studentData, exams });
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
