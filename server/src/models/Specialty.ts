import { ExamResponce } from './Exam';

export interface Specialty {
  specialty_code: string;
  max_students: number;
  specialty_name: string;
  institute_name: string;
}

export type SpecialtyResponce = Specialty & { exams: ExamResponce[] };
