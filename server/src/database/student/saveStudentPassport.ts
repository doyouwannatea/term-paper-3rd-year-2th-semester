import { Connection, OkPacket } from 'mysql2/promise';

export async function saveStudentPassport(
  connection: Connection,
  studentId: number,
  photo: unknown
): Promise<OkPacket> {
  return (
    await connection.query(
      `INSERT INTO documents (student_id, doc_name, doc_image) VALUES (?, ?, ?)`,
      [studentId, 'passport', photo]
    )
  )[0] as OkPacket;
}
