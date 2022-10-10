import express from 'express';
import postRouter from './routes/posts.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './client/public/upload');
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname
        cb(null, fileName);
    }
})
const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})

app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
app.use(errorResponder);
app.use(invalidPathHandler);



app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});