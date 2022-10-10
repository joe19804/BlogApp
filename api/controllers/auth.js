import { db } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || username.length < 3) {
        return res.status(400).json('Must be at least 3 characters or more')
    }
    if (!email || !email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        return res.status(400).json('Your email message should be formatted like a typical business letter')
    }
    if (!password || password.length < 8 || !password.match(/^(?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z])).*$/)) {
        return res.status(400).json('Must be at least 8 characters or more, needs at least one number and one letter')
    }

    try {
        const findUser = 'SELECT * FROM users WHERE username = ? OR email = ?';
        const [rows, fields] = await db.promise().query(findUser, [username, email]);

        if (rows.length) {
            return res.status(409).json('User already exists!');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const createUser = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await db.promise().query(createUser, [username, email, hash]);

        return res.status(200).json('User has been created.');
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const findUser = 'SELECT * FROM users WHERE username = ?';
        const [rows, fields] = await db.promise().query(findUser, [req.body.username]);

        if (rows.length === 0) {
            return res.status(404).json('User not found!');
        }
        const { password, ...userInfo } = rows[0];
        const validPassword = bcrypt.compareSync(req.body.password, password);

        if (!validPassword) {
            return res.status(400).json('Wrong username or password!');
        }

        const token = jwt.sign({ id: rows[0].id }, 'jwtsecret');

        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json(userInfo);

    } catch (error) {
        next(error);
    }
}

export const logout = (req, res) => {
    res.clearCookie('access_token', {
        sameSite: 'none',
        secure: true
    }).status(200).json('User has been logged out.')
}
