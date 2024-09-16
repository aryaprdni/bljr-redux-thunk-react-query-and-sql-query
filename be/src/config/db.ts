import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "",
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export const checkConnection = async () => {
    try {
      const connection = await pool.getConnection();
      console.log('MySQL connected successfully!');
      connection.release(); 
    } catch (error) {
      console.error('MySQL connection error:', error);
    }
};

export default pool