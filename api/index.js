import express from "express";
import postRouter from './routes/posts.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import cookieParser from "cookie-parser";

const app = express();
const port = 5000;

const errorResponder = (err, req, res, next) => {
    res.header('Content-Type', 'application/json')
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
}

const invalidPathHandler = (req, res) => {
    res.status(404).json({ error: 'invalid path' });
}

app.use(express.json());
app.use(cookieParser());
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use(errorResponder);
app.use(invalidPathHandler);



app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});