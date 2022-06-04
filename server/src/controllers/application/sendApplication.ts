import { Request, Response } from 'express';
import { connection } from '../..';
import { saveApplication } from '../../database/application/saveApplication';
import { selectStudentData } from '../../database/student/selectStudentData';
import { selectStudentSpecialies } from '../../database/student/selectStudentSpecialies';

export const sendApplication = async (
  req: Request,
  res: Response
) => {
  try {
    const { password, email } = req.cookies;
    const { application_priority, specialty_code } = req.body;
    if (!password || !email)
      return res.send('Нет авторизационных данных!').status(400);

    if (!application_priority)
      return res.send('Нет приоритета заявки!').status(400);

    if (!specialty_code)
      return res.send('Нет кода специальности!').status(400);

    const student = (
      await selectStudentData(connection, email, password)
    )[0];
    if (!student) return res.send('Студент не найден!').status(400);

    const appList = await selectStudentSpecialies(
      connection,
      student.student_id
    );

    // Если заявление на эту специальность уже есть у студента
    const isSpecFind = Boolean(
      appList.find((app) => app.specialty_code === specialty_code)
    );
    if (isSpecFind)
      return res
        .send('Вы уже подавали заявление на эту специальность!')
        .status(400);

    // Если заявление с таким приоритетом уже есть у студента
    const isPriorityFind = Boolean(
      appList.find(
        (app) => app.application_priority === application_priority
      )
    );
    if (isPriorityFind)
      return res
        .send('Вы уже подавали заявление с таким приоритетом!')
        .status(400);

    await saveApplication(
      connection,
      student.student_id,
      specialty_code,
      application_priority,
      'в процессе',
      new Date(Date.now())
    );

    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
