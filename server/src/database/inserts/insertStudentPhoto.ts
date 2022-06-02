import { Connection, OkPacket } from 'mysql2/promise';

export async function insertStudentPhoto(
  connection: Connection,
  studentId: number,
  photo: unknown
): Promise<OkPacket> {
  return (
    await connection.query(
      `INSERT INTO documents (student_id, doc_name, doc_image) VALUES (?, ?, ?)`,
      [studentId, 'photo3x4', photo]
    )
  )[0] as OkPacket;
}
