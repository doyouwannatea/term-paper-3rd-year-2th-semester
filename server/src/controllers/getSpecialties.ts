import { Request, Response } from 'express';
import { connection } from '..';
import { Exam } from '../models/Exam';
import { Specialty } from '../models/Specialty';

type ExamResponce = Pick<Exam, 'exam_name' | 'exam_points'>;
type SpecialtyResponce = Specialty & { exams: ExamResponce[] };

export const getSpecialties = async (req: Request, res: Response) => {
  try {
    const specialties = (
      await connection.query('SELECT * FROM specialties')
    )[0] as Specialty[];
    const specResponce: SpecialtyResponce[] = await Promise.all(
      specialties.map(async (spec) => {
        const exams = (
          await connection.query(
            'SELECT * FROM exams WHERE specialty_code=?',
            [spec.specialty_code]
          )
        )[0] as ExamResponce[];

        return { ...spec, exams };
      })
    );

    res.json(specResponce);
  } catch (error) {
    console.log(error);
    res.send('server error').status(500);
  }
};
