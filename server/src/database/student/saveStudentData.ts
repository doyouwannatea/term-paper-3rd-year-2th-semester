import { Connection, OkPacket } from 'mysql2/promise';

export async function saveStudentData(
  connection: Connection,
  entered: boolean,
  entryYear: number,
  email: string,
  password: string
): Promise<OkPacket> {
  return (
    await connection.query(
      `
        INSERT INTO students (
            students.entered,
            students.entry_year,
            students.student_email,
            students.student_password
        ) VALUES (?, ?, ?, ?);`,
      [entered, entryYear, email, password]
    )
  )[0] as OkPacket;
}
