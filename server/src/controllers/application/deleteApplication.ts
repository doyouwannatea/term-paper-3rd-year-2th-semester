import { Request, Response } from 'express';
import { connection } from '../..';
import { deleteApplication as deleteStudentApplicationFromDb } from '../../database/application/deleteApplication';
import { selectStudentData } from '../../database/student/selectStudentData';

export const deleteApplication = async (
  req: Request,
  res: Response
) => {
  try {
    const { password, email } = req.cookies;
    const { specialty_code } = req.body;
    if (!password || !email)
      return res.send('Нет авторизационных данных!').status(400);

    if (!specialty_code)
      return res.send('Нет кода специальности!').status(400);

    const student = (
      await selectStudentData(connection, email, password)
    )[0];
    if (!student) return res.send('Студент не найден!').status(400);

    // удалить
    await deleteStudentApplicationFromDb(
      connection,
      student.student_id,
      specialty_code
    );

    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
