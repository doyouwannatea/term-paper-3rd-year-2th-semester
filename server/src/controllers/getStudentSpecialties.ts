import { Request, Response } from 'express';
import { connection } from '..';
import { selectExamsBySpecCode } from '../database/selectors/selectExamsBySpecCode';
import { selectSpecialty } from '../database/selectors/selectSpecialies';
import { selectStudentData } from '../database/selectors/selectStudentData';
import { selectStudentSpecialies } from '../database/selectors/selectStudentSpecialies';
import { StudentSpecialtyResponce } from '../models/Specialty';

export const getStudentSpecialties = async (
  req: Request,
  res: Response
) => {
  try {
    const { password, email } = req.cookies;
    const studentList = await selectStudentData(
      connection,
      email,
      password
    );
    const student = studentList[0];

    if (!student) return res.send('Студент не найден!').status(400);

    const specialtiesApps = await selectStudentSpecialies(
      connection,
      student.student_id
    );
    const specResponce: StudentSpecialtyResponce[] =
      await Promise.all(
        specialtiesApps.map(async (specApp) => {
          const spec = await selectSpecialty(
            connection,
            specApp.specialty_code
          );
          const exams = await selectExamsBySpecCode(
            connection,
            specApp.specialty_code
          );
          return {
            ...spec,
            exams,
            application: specApp,
          };
        })
      );

    res.json(specResponce);
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
