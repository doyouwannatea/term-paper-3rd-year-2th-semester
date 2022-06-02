import { Request, Response } from 'express';
import { connection } from '..';
import { insertStudentData } from '../database/inserts/insertStudentData';
import { insertStudentPassport } from '../database/inserts/insertStudentPassport';
import { insertStudentPhoto } from '../database/inserts/insertStudentPhoto';
import { selectStudentData } from '../database/selectors/selectStudentData';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, passport, photo } = req.body;
    // проверка email и пароля
    if (!email || !password)
      return res.send('Нет авторизационных данных').status(400);

    const studentList = await selectStudentData(
      connection,
      email,
      password
    );
    if (studentList.length > 0)
      return res.send('Студент уже зарегестрирован!').status(400);

    // проверка пасспорта и фотографии
    if (!passport)
      return res.send('Нет паспортных данных').status(400);
    if (!photo) return res.send('Нет фото 3х4').status(400);

    // занесение пользователя в БД
    const { insertId } = await insertStudentData(
      connection,
      false,
      0,
      email,
      password
    );

    await insertStudentPassport(connection, insertId, photo);
    await insertStudentPhoto(connection, insertId, photo);

    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
