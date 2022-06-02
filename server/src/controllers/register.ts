import { Request, Response } from 'express';
import { connection } from '..';
import { insertStudentData } from '../database/inserts/insertStudentData';
import { selectStudentData } from '../database/selectors/selectStudentData';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // проверка email и пароля
    if (!email || !password)
      return res.send('Нет авторизационных данных').status(400);

    const studentList = await selectStudentData(
      connection,
      email,
      password
    );
    if (studentList.length > 0)
      return res.send('Студент уже зарегистрирован!').status(400);

    // занесение пользователя в БД
    await insertStudentData(connection, false, 0, email, password);

    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
