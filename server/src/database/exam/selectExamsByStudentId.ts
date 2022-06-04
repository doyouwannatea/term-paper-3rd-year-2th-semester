import { Connection } from 'mysql2/promise';
import { ExamResponce } from '../../models/Exam';

export async function selectExamsByStudentId(
  connection: Connection,
  studentId: number
): Promise<ExamResponce[]> {
  return (
    await connection.query(
      'SELECT exam_name, exam_points FROM exams WHERE student_id=?',
      [studentId]
    )
  )[0] as ExamResponce[];
}
