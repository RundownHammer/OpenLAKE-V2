import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config(); // Load the .env file

// Configure the PostgreSQL pool connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432 , // Default PostgreSQL port
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export default pool;
 