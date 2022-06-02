import { Connection, OkPacket } from 'mysql2/promise';

export async function deleteStudentApplication(
  connection: Connection,
  studentId: number,
  specCode: string
): Promise<OkPacket> {
  return (
    await connection.query(
      `DELETE FROM specialties_applications WHERE student_id=? AND specialty_code=?`,
      [studentId, specCode]
    )
  )[0] as OkPacket;
}
