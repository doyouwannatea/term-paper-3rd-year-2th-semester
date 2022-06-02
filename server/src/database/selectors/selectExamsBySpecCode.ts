import { Connection } from 'mysql2/promise';
import { ExamResponce } from '../../models/Exam';

export async function selectExamsBySpecCode(
  connection: Connection,
  specCode: string
): Promise<ExamResponce[]> {
  return (
    await connection.query(
      'SELECT exam_name, exam_points FROM exams WHERE specialty_code=?',
      [specCode]
    )
  )[0] as ExamResponce[];
}
