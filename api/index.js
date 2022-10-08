import express from "express";
import postRouter from './routes/posts.js'
import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'

const app = express();

const port = 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});