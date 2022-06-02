import { Exam } from './Exam';

export interface StudentData {
  student_id: number;
  entry_year: string;
  entered: boolean;
  student_email: string;
  exams: Exam[];
}
