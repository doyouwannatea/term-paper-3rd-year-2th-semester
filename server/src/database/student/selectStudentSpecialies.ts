import { Connection } from 'mysql2/promise';
import { SpecialtyApplication } from '../../models/SpecialtyApplication';

export async function selectStudentSpecialies(
  connection: Connection,
  studentId: number
): Promise<SpecialtyApplication[]> {
  return (
    await connection.query(
      'SELECT * FROM specialties_applications WHERE student_id=?',
      [studentId]
    )
  )[0] as SpecialtyApplication[];
}
