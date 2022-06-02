import { Exam } from './Exam';

export interface Specialty {
  specialty_code: string;
  max_students: number;
  specialty_name: string;
  institute_name: string;
  exams: Exam[];
}
