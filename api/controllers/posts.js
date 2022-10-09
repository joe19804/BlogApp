import { db } from '../db.js'
import jwt from 'jsonwebtoken';

export const getPosts = async (req, res, next) => {
    const query = req.query.cat ? 'SELECT * FROM posts WHERE cat = ?' : 'SELECT * FROM posts';

    try {
        const [rows, fields] = await db.promise().query(query, [req.query.cat]);
        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}


export const getPost = async (req, res, next) => {
    const query = 'SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM posts p JOIN users u ON u.id = p.uid WHERE p.id = ?';

    try {
        const [rows, fields] = await db.promise().query(query, [req.params.id]);
        return res.status(200).json(rows[0]);
    } catch (error) {
        next(error);
    }
}


export const addPost = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not authenticated!');

    jwt.verify(token, 'jwtsecret', async (err, userInfo) => {
        if (err) res.status(403).json('Token is not valid!');
        try {
            const query = 'INSERT INTO posts (`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)';

            const value = [
                req.body.title,
                req.body.desc,
                req.body.img,
                req.body.cat,
                req.body.date,
                userInfo.id,
            ]
            await db.promise().query(query, [value]);
            return res.json('Post has been created!');
        } catch (error) {
            next(error);
        }
    });
}


export const deletePost = async (req, res,) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not authenticated!');

    jwt.verify(token, 'jwtsecret', async (err, userInfo) => {
        if (err) res.status(403).json('Token is not valid!');
        try {
            const query = 'DELETE FROM posts WHERE id = ? and uid = ?'

            let result = await db.promise().query(query, [req.params.id, userInfo.id]);

            if (!result.affectedRows) {
                return res.status(403).json('You can delete only your post!');
            }

            return res.json('Post has been deleted!');
        } catch (error) {
            next(error);
        }
    });
}


export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not authenticated!');

    jwt.verify(token, 'jwtsecret', async (err, userInfo) => {
        if (err) res.status(403).json('Token is not valid!');
        try {
            const query = 'UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `cat` = ? WHERE `id` = ? AND `uid` = ?';

            const value = [
                req.body.title,
                req.body.desc,
                req.body.img,
                req.body.cat,
            ]
            let result = await db.promise().query(query, [...value, req.params.id, userInfo.id]);

            if (!result.affectedRows) {
                return res.status(403).json('You can update only your post!');
            }

            return res.json('Post has been updated!');
        } catch (error) {
            next(error);
        }
    });
}