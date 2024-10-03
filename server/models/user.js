import pool from '../db.js';
import bcrypt from 'bcryptjs';

// Add a user to the PostgreSQL database
export async function addUser(username, password, email, created_at, profilePhoto) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = `INSERT INTO users (username, email, password_hash, created_at, profile_photo) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const result = await pool.query(query, [username, email, hashedPassword, created_at, profilePhoto]);

        return result.rows[0]; // Return the new user object
    } catch (err) {
        throw new Error('Error adding user to database');
    }
}

// Find a user by username
export async function findUserByUsername(username) {
    try {
        const query = `SELECT * FROM users WHERE username = $1`;
        const result = await pool.query(query, [username]);

        return result.rows[0]; // Return the user if found
    } catch (err) {
        throw new Error('Error finding user by username');
    }
}

// Find a user by id
export async function findUserById(id) {
    try {
        const query = `SELECT * FROM users WHERE id = $1`;
        const result = await pool.query(query, [id]);

        return result.rows[0]; // Return the user if found
    } catch (err) {
        throw new Error('Error finding user by id');
    }
}
