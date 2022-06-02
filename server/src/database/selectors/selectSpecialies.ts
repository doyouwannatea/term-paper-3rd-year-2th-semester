import { Connection } from 'mysql2/promise';
import { Specialty } from '../../models/Specialty';

export async function selectSpecialies(
  connection: Connection
): Promise<Specialty[]> {
  return (
    await connection.query('SELECT * FROM specialties')
  )[0] as Specialty[];
}

export async function selectSpecialty(
  connection: Connection,
  speCode: string
): Promise<Specialty> {
  const specList = (
    await connection.query(
      'SELECT * FROM specialties WHERE specialty_code=?',
      [speCode]
    )
  )[0] as Specialty[];
  return specList[0];
}
