import { Connection, OkPacket } from 'mysql2/promise';

export async function insertStudentApplication(
  connection: Connection,
  studentId: number,
  specCode: string,
  applicationPriority: number,
  applicationStatus: string,
  applicationTime: Date
): Promise<OkPacket> {
  return (
    await connection.query(
      `
            INSERT INTO specialties_applications (
              student_id,
              specialty_code,
              application_status,
              application_priority,
              application_time
            ) VALUES (?, ?, ?, ?, ?);`,
      [
        studentId,
        specCode,
        applicationStatus,
        applicationPriority,
        applicationTime,
      ]
    )
  )[0] as OkPacket;
}
