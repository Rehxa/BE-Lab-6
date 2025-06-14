import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// TODO
// Create the pool to connect to the database
// Use the database settings from the .env file

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  console.log("DB_USER:", process.env.DB_USER);
  console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "set" : "missing");
  console.log("DB_NAME:", process.env.DB_NAME);
  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("DB_PORT:", process.env.DB_PORT);

  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Database connection successful!");
    const [row] = await conn.query("SELECT * FROM articles");
    console.log("Sample data from articles table:", row);
    pool.releaseConnection(conn);
  } catch (err) {
    console.error("Error initializing database connection:", err);
  } finally {
    if (conn) conn.release();
    console.log("closing the database");
  }
}
export { pool };
