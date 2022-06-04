import { Connection } from 'mysql2/promise';
import { Document } from '../../models/Document';

export async function selectStudentDocs(
  connection: Connection,
  studentId: number
): Promise<Document[]> {
  return (
    await connection.query(
      `SELECT doc_id, doc_name, doc_image FROM documents WHERE student_id=?`,
      [studentId]
    )
  )[0] as Document[];
}
