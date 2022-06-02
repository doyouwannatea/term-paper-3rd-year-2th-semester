import { Exam } from './Exam';

export interface Specialty {
  specialty_code: string;
  max_students: number;
  specialty_name: string;
  institute_name: string;
  exams: Exam[];
}

export interface SpecialtyApplication {
  student_id: number;
  specialty_code: string;
  application_status: string;
  application_priority: number;
  application_time: Date;
}

export interface StudentSpecialty extends Specialty {
  application: SpecialtyApplication;
}
