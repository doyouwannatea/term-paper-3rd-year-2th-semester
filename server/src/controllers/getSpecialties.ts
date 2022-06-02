import { Request, Response } from 'express';
import { connection } from '..';
import { selectExamsBySpecCode } from '../database/selectors/selectExamsBySpecCode';
import { selectSpecialies } from '../database/selectors/selectSpecialies';
import { SpecialtyResponce } from '../models/Specialty';

export const getSpecialties = async (req: Request, res: Response) => {
  try {
    const specialties = await selectSpecialies(connection);
    const specResponce: SpecialtyResponce[] = await Promise.all(
      specialties.map(async (spec) => {
        const exams = await selectExamsBySpecCode(
          connection,
          spec.specialty_code
        );
        return { ...spec, exams };
      })
    );

    res.json(specResponce);
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
