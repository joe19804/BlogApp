import { db } from '../db.js';
import crypto from 'crypto';

export const register = async (req, res) => {
    const findUser = "SELECT * FROM users WHERE username = ? OR email = ?";
    try {
        const [rows, fields] = await db.promise().query(findUser, [req.body.email, req.body.username]);

        if (rows.length) {
            return res.status(409).json("User already exists!");
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
        const createUser = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

        await db.promise().query(createUser, [req.body.username, req.body.email, hash]);
        db.release();
        return res.status(200).json("User has been created.");
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const login = (req, res) => {
    res.json("login")
}

export const logout = (req, res) => {
    res.json("logout")
}
