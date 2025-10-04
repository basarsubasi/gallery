import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const pool = mariadb.createPool({
  host: process.env.GALLERY_DB_HOST,
  user: process.env.GALLERY_DB_USER,
  password: process.env.GALLERY_DB_PASSWORD,
  database: process.env.GALLERY_DB_NAME,
});

export default pool;
