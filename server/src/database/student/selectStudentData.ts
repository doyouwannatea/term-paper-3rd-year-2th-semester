import { Connection } from 'mysql2/promise';
import { Student } from '../../models/Student';

export async function selectStudentData(
  connection: Connection,
  email: string,
  password: string
): Promise<Student[]> {
  return (
    await connection.query(
      `SELECT * FROM students 
          WHERE student_email=? AND student_password=?`,
      [email, password]
    )
  )[0] as Student[];
}
