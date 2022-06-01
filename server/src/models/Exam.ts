export interface Exam {
  exam_id: number;
  student_id?: number;
  specialty_code?: string;
  exam_name: string;
  exam_points: number;
}

export type ExamResponce = Pick<Exam, 'exam_name' | 'exam_points'>;
