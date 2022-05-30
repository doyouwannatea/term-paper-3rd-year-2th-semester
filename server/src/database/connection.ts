import { Connection } from 'mysql2/promise';

export async function connect(connection: Connection) {
  try {
    await connection.connect();
    console.log('Подключение к серверу MySQL успешно установлено');
  } catch (error) {
    console.error('Ошибка: ' + error);
  }
}

export async function disconnect(connection: Connection) {
  try {
    await connection.end();
    console.log('Подключение закрыто');
  } catch (error) {
    console.error('Ошибка: ' + error);
  }
}
